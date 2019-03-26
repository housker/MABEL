-- DROP DATABASE IF EXISTS mabel;
-- CREATE DATABASE mabel;
-- DROP SCHEMA IF EXISTS public CASCADE;
-- CREATE SCHEMA public;

-- change ids from autoincrement to uuid, more secure https://www.postgresql.org/docs/9.1/datatype-uuid.html

CREATE EXTENSION pgcrypto;
CREATE EXTENSION postgis;
CREATE EXTENSION address_standardizer;
CREATE EXTENSION address_standardizer_data_us;
CREATE EXTENSION fuzzystrmatch;
CREATE EXTENSION postgis_tiger_geocoder;

-- CREATE EXTENSION postgis_sfcgal;
-- CREATE EXTENSION postgis_topology;

CREATE TYPE ordertype AS ENUM ('ask', 'bid');

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  businessname VARCHAR(50) NOT NULL,
  businessaddress VARCHAR(50) NOT NULL,
  businesscity VARCHAR(50) NOT NULL,
  lat NUMERIC(8, 5),
  lng NUMERIC(8, 5),
  email VARCHAR(50) UNIQUE NOT NULL,
  pwdhash VARCHAR(80) NOT NULL,
  UNIQUE (businessaddress, businesscity)
);

-- a range of soil, 
-- model the soil relationships in tables, then join to the tables
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  color 
  type VARCHAR(50) -- VALIDATE THIS: "crop", "crop derivative", "livestock", "livestock derivative"
  -- land_id INTEGER REFERENCES land(id),
  category VARCHAR(50),
  org BOOLEAN,
  variety VARCHAR(50),
  region INTEGER, -- Temperature, Minimum (°F)
  drought_tolerant BOOLEAN, -- mosture use; precipitation, minimum; precipitation, maximum
  frost_tolerant BOOLEAN,  -- frost free days
  soil VARCHAR(50)[],  -- [Adapted to Coarse Textured Soils, Adapted to Fine Textured Soils, Adapted to Medium Textured Soils]
  nitrogen_fixing BOOLEAN -- true/false (nitrogen fixation: [none, low, medium, high])
);

-- Anaerobic Tolerance (flood tolerance)
-- pH, Minimum
-- pH, Maximum
-- Salinity Tolerance
-- Shade Tolerance
--Active Growth Period
--After Harvest Regrowth Rate
-- CaCO3 Tolerance



-- DROP TABLE IF EXISTS land;
-- CREATE TABLE land (
--   id SERIAL PRIMARY KEY,
--   category VARCHAR(50),
--   org BOOLEAN,
--   variety VARCHAR(50),
--   region INTEGER,
--   drought_tolerant BOOLEAN,
--   frost_tolerant BOOLEAN,
--   soil VARCHAR(50)[],
--   nitrogen_fixing BOOLEAN
-- );

DROP TABLE IF EXISTS season;
CREATE TABLE season (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  supplier_id INTEGER REFERENCES users(id),
  season_start INTEGER CHECK (season_start > 0 AND season_start < 367),
  season_end INTEGER CHECK (season_start > 0 AND season_start < 367)
);

-- CREATE OR REPLACE FUNCTION rec_insert()
--   RETURNS trigger AS
-- $$
-- BEGIN
--          INSERT INTO emp_log(emp_id,salary,edittime)
--          VALUES(NEW.employee_id,NEW.salary,current_date);
 
--     RETURN NEW;
-- END;
-- $$
-- LANGUAGE 'plpgsql';



-- CREATE TRIGGER dont_pull_it
--   AFTER INSERT ON "bids"
--   FOR EACH ROW EXECUTE PROCEDURE gandalf();


-- most someone is willing to buy for
-- DROP TABLE IF EXISTS bids;
-- CREATE TABLE bids (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id),
--   product_id INTEGER REFERENCES products(id),
--   price MONEY,
--   unit VARCHAR(50),
--   quantity INTEGER,
--   date DATE
-- );

-- CHECK (product_id NOT EXISTS
--         (
--         SELECT  id
--         FROM    asks
--         WHERE   bids.user_id = asks.user_id AND bids.product_id = asks.product_id
--         ))


-- least someone is willing to sell for
-- DROP TABLE IF EXISTS asks;
-- CREATE TABLE asks ( 
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id),
--   product_id INTEGER REFERENCES products(id),
--   price MONEY,
--   unit VARCHAR(50),
--   quantity INTEGER,
--   date DATE
-- );

DROP TABLE IF EXISTS orderbook;
CREATE TABLE orderbook ( 
  id SERIAL PRIMARY KEY,
  kind ordertype,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  price MONEY,
  unit VARCHAR(50),
  quantity INTEGER,
  date DATE,
  UNIQUE (user_id, product_id)
);

CREATE VIEW asks AS
    SELECT *
    FROM orderbook
    WHERE kind = 'ask';

CREATE VIEW bids AS
    SELECT *
    FROM orderbook
    WHERE kind = 'bid';

-- CREATE OR REPLACE FUNCTION gandalfa() RETURNS trigger LANGUAGE 'plpgsql' AS $$
--   BEGIN
--     IF EXISTS (SELECT * FROM bids WHERE NEW.user_id = bids.user_id AND NEW.product_id = bids.product_id)
--       THEN RAISE EXCEPTION 'You may not sell an item you are purchasing';
--       RETURN NULL;
--     ELSIF EXISTS (SELECT * FROM asks WHERE NEW.user_id = asks.user_id AND NEW.product_id = asks.product_id)
--       THEN UPDATE asks SET (price, unit, quantity, date) = (NEW.price, NEW.unit, NEW.quantity, NEW.date)
--       WHERE user_id=NEW.user_id;
--       RETURN NULL;
--     END IF;
--     RETURN NEW;
--   END $$;

-- CREATE OR REPLACE FUNCTION gandalfb() RETURNS trigger LANGUAGE 'plpgsql' AS $$
--   BEGIN
--     IF EXISTS (SELECT * FROM asks WHERE NEW.user_id = asks.user_id AND NEW.product_id = asks.product_id)
--       THEN RAISE EXCEPTION 'You may not purchase an item you are selling';
--       RETURN NULL;
--     ELSIF EXISTS (SELECT * FROM bids WHERE NEW.user_id = bids.user_id AND NEW.product_id = bids.product_id)
--       THEN UPDATE bids SET (price, unit, quantity, date) = (NEW.price, NEW.unit, NEW.quantity, NEW.date)
--       WHERE user_id=NEW.user_id;
--       RETURN NULL;
--     END IF;
--     RETURN NEW;
--   END $$;

-- CREATE TRIGGER dont_pull_it BEFORE INSERT OR UPDATE ON asks
--   FOR EACH ROW 
--   WHEN (pg_trigger_depth() < 1) EXECUTE PROCEDURE gandalfa();

-- CREATE TRIGGER dont_pull_it BEFORE INSERT OR UPDATE ON bids
--   FOR EACH ROW 
--   WHEN (pg_trigger_depth() < 1) EXECUTE PROCEDURE gandalfb();

-- bids and asks correspond, but money and goods have not been exchanged
DROP TABLE IF EXISTS contracts;
CREATE TABLE contracts ( 
  id SERIAL PRIMARY KEY,
  buyer_id INTEGER REFERENCES users(id),
  seller_id INTEGER REFERENCES users(id) CHECK(buyer_id != seller_id),
  product_id INTEGER REFERENCES products(id),
  price MONEY,
  unit VARCHAR(50),
  quantity INTEGER,
  date DATE,
  pending BOOLEAN
);

-- money and goods were exchanged on this date for this price
DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  contract_id INTEGER REFERENCES contracts(id),
  buyer_id INTEGER REFERENCES users(id),
  seller_id INTEGER REFERENCES users(id) CHECK(buyer_id != seller_id),
  product_id INTEGER REFERENCES products(id),
  price MONEY,
  unit VARCHAR(50),
  quantity INTEGER,
  date DATE
);



      -- SELECT  id
      -- FROM    "asks" a
      -- WHERE   bids.user_id = a.user_id AND bids.product_id = a.product_id





-- CREATE OR REPLACE FUNCTION insertSupplier(name varchar(50), address varchar(50), lat numeric(8, 5), lng numeric(8, 5)) RETURNS VOID AS
-- $$
-- BEGIN
--     INSERT INTO suppliers (name, address, lat, lng) VALUES (name, address, lat, lng);
-- END
-- $$
--   LANGUAGE 'plpgsql';   





-- DROP TABLE IF EXISTS practice;
-- CREATE TABLE practice (
--   id SERIAL PRIMARY KEY,   
--   word VARCHAR(50),
--   number INTEGER
-- );

-- CREATE OR REPLACE FUNCTION insertWord(word varchar(50), number integer) RETURNS VOID AS
-- $$
-- BEGIN
--     INSERT INTO practice (word, number) VALUES ($1, $2);
-- END
-- $$
--   LANGUAGE 'plpgsql';  













--     -- Enable PostGIS (includes raster)
-- CREATE EXTENSION postgis;
--     -- Enable Topology
-- -- CREATE EXTENSION postgis_topology;
--     -- Enable PostGIS Advanced 3D
--     -- and other geoprocessing algorithms
--     -- sfcgal not available with all distributions
-- -- CREATE EXTENSION postgis_sfcgal;
--     -- fuzzy matching needed for Tiger
-- -- CREATE EXTENSION fuzzystrmatch;
--     -- rule based standardizer
-- -- CREATE EXTENSION address_standardizer;
--     -- example rule data set
-- CREATE EXTENSION address_standardizer_data_us;
--     -- Enable US Tiger Geocoder
-- -- CREATE EXTENSION postgis_tiger_geocoder;