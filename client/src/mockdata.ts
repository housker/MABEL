import { Alert, Buyer, Report, Supplier, Weather, Event, Difference } from './app/types';
import { resolveNgModuleDep } from '@angular/core/src/view/ng_module';

export const BUYERS: Buyer[] = [
    { "id": 1, "name": "Bob", "amount": 4770, date: new Date() },
    { "id": 2, "name": "Max", "amount": 3950, date: new Date() },
    { "id": 3, "name": "Pete", "amount": 5925, date: new Date() },
    { "id": 4, "name": "Ford", "amount": 3825, date: new Date() },
    { "id": 5, "name": "Will", "amount": 5567, date: new Date() },
    { "id": 6, "name": "Joy", "amount": 92425, date: new Date() },
    { "id": 7, "name": "Sam", "amount": 5557, date: new Date() },
    { "id": 8, "name": "Lisa", "amount": 9025, date: new Date() },
    { "id": 9, "name": "Peter", "amount": 8680, date: new Date() },
    { "id": 10, "name": "Greg", "amount": 577700, date: new Date() },
    { "id": 11, "name": "Henry", "amount": 45608, date: new Date() },
    { "id": 12, "name": "Sara", "amount": 3280, date: new Date() },
    { "id": 13, "name": "Blake", "amount": 50000, date: new Date() }
];

// Would calculate distance from user in the backend
export const SUPPLIERS: Supplier[] = [
    { "id": 1, "name": "Common Thread CSA", "address": "Madison, NY", "lat": 42.876362, "lng": -75.505829, "distance": 0 },
    { "id": 2, "name": "Hearty Roots Community Farm", "address": "Germantown, NY", "lat": 42.0884405, "lng": -73.8254912, "distance": 0 },
    { "id": 3, "name": "Melicks' Town Farm", "address": "Oldwick, NJ", "lat": 40.6324348, "lng": -74.7421034, "distance": 0 },
    { "id": 4, "name": "Roxbury Farm", "address": "Kinderhook, NY", "lat": 42.3769686, "lng": -73.6947757, "distance": 0 },
    { "id": 5, "name": "Hesperides Organica", "address": "Florida, NY", "lat": 41.2991729, "lng": -74.464396, "distance": 0 },
    { "id": 6, "name": "Golden Earthworm Organic Farm, LLC", "address": "Riverhead, NY", "lat": 40.935299, "lng": -72.595778, "distance": 0 },
    { "id": 7, "name": "WindSwept Grass Fed Angus Beef - Elmira", "address": "Elmira, NY", "lat": 41.818577, "lng": -76.588157, "distance": 0 },
    { "id": 8, "name": "Honey Brook Organic Farm", "address": "Pennington, NJ", "lat": 40.3559304, "lng": -74.7667586, "distance": 0 },
    { "id": 9, "name": "Katchkie Farm", "address": "Kinderhook, NY", "lat": 42.3770743, "lng": -73.6915362, "distance": 0 },
    { "id": 10, "name": "Sang Lee Farms, Inc.", "address": "Peconic, NY", "lat": 41.0364283, "lng": -72.4836672, "distance": 0 }
];

export const ALERTS: Alert[] = [
    { "id": 1, "category": "crop pest", "name": "Weevil", "effective": 1550677394, "description": "Lots of weevils abound!" },
    { "id": 1, "category": "severe weather", "name": "Hail", "effective": 1550677394, "description": "Hail will destory everything!" }
];

export const DIFFERENCE: Difference[] = [
    { "id": 1, "name": "Corn", "predicted": 5000, "actual": 4500, "difference": -0.1 },
    { "id": 2, "name": "Squash", "predicted": 5000, "actual": 6000, "difference": 0.2 },
    { "id": 3, "name": "Pumpkin", "predicted": 4000, "actual": 4500, "difference": 0.125 }
];

export const PREDICTIONS: Report[] = [
    { "id": 1, "name": "Corn", "yield": 50000, "revenue": 3000 },
    { "id": 2, "name": "Squash", "yield": 50000, "revenue": 3000 },
    { "id": 3, "name": "Pumpkin", "yield": 50000, "revenue": 3000 }
];

export const ACTUAL: Report[] = [
    { "id": 13, "name": "Blake", "yield": 50000, "revenue": 2500 },
    { "id": 13, "name": "Blake", "yield": 50000, "revenue": 2500 },
    { "id": 13, "name": "Blake", "yield": 50000, "revenue": 2500 }
];

export const SCHEDULE: Event[] = [
    { "id": 1, "category": "planting", "start_hr": 7, "end_hr": 13, "distance": 3.7 },
    { "id": 2, "category": "plowing", "start_hr": 5, "end_hr": 12, "distance": 32.7 },
    { "id": 3, "category": "spraying", "start_hr": 6.5, "end_hr": 8, "distance": 3.9 },
    { "id": 4, "category": "plowing", "start_hr": 9, "end_hr": 17, "distance": 1.7 },
    { "id": 5, "category": "plowing", "start_hr": 10, "end_hr": 16, "distance": 22.7 },
    { "id": 6, "category": "leisure", "start_hr": 17, "end_hr": 21, "distance": 14.5 },
    { "id": 7, "category": "planting", "start_hr": 7, "end_hr": 10, "distance": 3.2 },
    { "id": 8, "category": "planting", "start_hr": 6, "end_hr": 9, "distance": 3.8 },
    { "id": 9, "category": "planting", "start_hr": 6, "end_hr": 10, "distance": 5.7 },
    { "id": 10, "category": "planting", "start_hr": 14, "end_hr": 16, "distance": 13.7 },
    { "id": 11, "category": "veterinary", "start_hr": 15, "end_hr": 16, "distance": 18.7 },
    { "id": 12, "category": "planting", "start_hr": 6.5, "end_hr": 18, "distance": 30.2 },
    { "id": 13, "category": "spraying", "start_hr": 18, "end_hr": 19, "distance": 27.1 },
    { "id": 14, "category": "planting", "start_hr": 7, "end_hr": 13, "distance": 19.5 },
    { "id": 15, "category": "business", "start_hr": 9, "end_hr": 12, "distance": 45.1 },
    { "id": 16, "category": "plowing", "start_hr": 15, "end_hr": 19, "distance": 6.0 },
    { "id": 17, "category": "planting", "start_hr": 7, "end_hr": 18, "distance": 17.9 },
    { "id": 18, "category": "planting", "start_hr": 6.5, "end_hr": 13, "distance": 2.7 },
    { "id": 19, "category": "plowing", "start_hr": 6, "end_hr": 14, "distance": 3.7 },
    { "id": 20, "category": "equipment", "start_hr": 12, "end_hr": 14, "distance": 8.3 }
];

// function makeSchedule() {
//     const activities = ['free', 'plowing', 'planting', 'vet', 'equipment'];
//     const charges = ['bovine', 'poultry', 'fruit', 'corn', 'alfalfa', 'potatoes', 'carrots', 'beans']
//     const n = activities.length;
//     let grid = [];
//     for(let row = 0; row < n; row++) {
//       let rowArr = [];
//       for(let column = 0; column < 24; column++) {
//         let element = charges[Math.floor(Math.random() * charges.length)]
//         rowArr.push(element)
//       }
//       grid.push(rowArr);
//     }
//     return grid;
// }

// export const SCHEDULE: string[][] = makeSchedule();

// function makeWeather() {
//     const types = ['sunny', 'cloudy', 'precipitating'];
//     const n = types.length;
//     let grid = [];
//       for(let column = 0; column < 24; column++) {
//         let element = types[Math.floor(Math.random() * types.length)]
//         grid.push(element);
//       }
//     return grid;
// }

// for days that are not current, okay to get overall weather (one color per day), if hourly not available
// ideally would get morning and night version for each of the weather types
// constraints: (1) first weather condition must start before sunrise, (2) last weather condition must end after sunset
export const WEATHER_DATA: Weather[] = [
    { type: 'clear', start: 5, end: 15 },
    { type: 'precip', start: 15, end: 20 }
];

export const ALLCOMMODITIES = ["ANIMAL TOTALS","ASPARAGUS","AMARANTH","ANIMAL PRODUCTS, OTHER","ALPACAS","BEANS","BERRY TOTALS","BAITFISH","APRICOTS","ARTICHOKES","ALCOHOL COPRODUCTS","APPLES","BANANAS","BEESWAX","AQUATIC PLANTS","ALMONDS","ANIMALS, OTHER","AQUACULTURE TOTALS","RAPESEED","FLORICULTURE TOTALS","PUMPKINS","SPECIALTY ANIMALS, OTHER","SOIL","NON-CITRUS TOTALS","SOD","FLAXSEED","SPORT FISH","SOYBEANS","POULTRY, OTHER","SNOW","SHERBET","SORGHUM","RHUBARB","RABBITS","PROPAGATIVE MATERIAL","SAFFLOWER","SPECIALTY ANIMAL TOTALS","SHEEP & GOATS TOTALS","RADISHES","QUAIL","POULTRY BY-PRODUCT MEALS","TEMPLES","SMALL GRAINS","POULTRY FATS","SHORT TERM WOODY CROPS","RYE","SHEEP","SESAME","SWEET POTATOES","PRUNES","SWITCHGRASS","SUNFLOWER","TANGERINES","SWEET RICE","STRAWBERRIES","RASPBERRIES","RICE","RHEAS","RED MEAT","TANGELOS","TARO","TALLOW","SWEET CORN","BEDDING PLANTS, ANNUAL","BARLEY","BERRIES, OTHER","BLACKBERRIES","BISON","AQUACULTURE, OTHER","MEAL","AVOCADOS","CHESTNUTS","CHERRIES","MUSTARD","BAREROOT HERBACEOUS PERENNIALS","MILLFEED","CHUKARS","MACADAMIAS","MOHAIR","CHICKENS","MINT","CARROTS","CELERY","MINK","BEDDING PLANT TOTALS","EQUINE","BEETS","BOYSENBERRIES","GINGER ROOT","CANEBERRIES","DUCKS","BEEF","CABBAGE","CATTLE","FEED","BLUEBERRIES","CANOLA","BUCKWHEAT","EVERGREENS, CONIFEROUS","GRASSES & LEGUMES, OTHER","FIELD CROP TOTALS","GINSENG","FLOWER SEEDS","GOATS","FOLIAGE PLANTS","GRAIN STORAGE CAPACITY","COFFEE","BUTTER","BEDDING PLANTS, HERBACEOUS PERENNIAL","BUTTERMILK","CAMELINA","BROCCOLI","FEED GRAINS & HAY","FIELD CROPS, OTHER","FEED GRAINS","FLOWERING PLANTS, POTTED","CITRUS TOTALS","FRUIT, OTHER","GARLIC","EGGS","GRAPEFRUIT","DATES","DILL","DAIKON","GOOSEBERRIES","FRUIT TOTALS","DECIDUOUS SHADE TREES","DECIDUOUS FLOWERING TREES","CUT CULTIVATED GREENS","BRUSSELS SPROUTS","EGGPLANT","DAIRY PRODUCT TOTALS","GUAVAS","CRANBERRIES","HAY","CORN","GUAR","FOOD GRAINS","DAIRY PRODUCTS, OTHER","CRAMBE","GEESE","CUT CHRISTMAS TREES & SHORT TERM WOODY CROPS","DECIDUOUS SHRUBS","CUT FLOWERS","EVERGREENS, BROADLEAF","GREENS","CROP TOTALS","CITRUS, OTHER","FLOUR","GREASE","FOOD CROP, OTHER","GUINEAS","FOOD FISH","CROPS, OTHER","ELK","HOGS","EMUS","HAZELNUTS","COTTON","CUCUMBERS","CUT FLOWERS & CUT CULTIVATED GREENS","GRASSES","FIELDWORK","CUT CHRISTMAS TREES","FLORICULTURE, OTHER","ICE CREAM","DEER","FOOD CROP TOTALS","CHEESE","HERBS","LEMONS","GRAPES","CRUSTACEANS","GRAIN","CHICORY","CRUDE PINE GUM","LOGANBERRIES","CURRANTS","HORTICULTURE, OTHER","FIGS","CAULIFLOWER","CREAM","KUMQUATS","HORSERADISH","JOJOBA","HORTICULTURE TOTALS","K-EARLY CITRUS","HAYLAGE","HOPS","MISCANTHUS","LEGUMES","HONEY","GRASSES & LEGUMES TOTALS","MELONS","HAY & HAYLAGE","MILLET","LLAMAS","LOTUS ROOT","MILK","MELLORINE","LARD","KIWIFRUIT","MUSHROOM SPAWN","LIMES","MANGOES","NURSERY TOTALS","MAPLE SYRUP","MUSHROOMS","NON-CITRUS, OTHER","LIVESTOCK TOTALS","LETTUCE","NURSERY, OTHER","LENTILS","OATS","ORCHARDS","ONIONS","OKRA","PARTRIDGES","ORANGES","MOLLUSKS","PASSION FRUIT","NECTARINES","OLIVES","ORNAMENTAL FISH","OIL","PEACHES","PLUMS","PEANUTS","PEACHES & NECTARINES","ORNAMENTAL GRASSES","PACKING FACILITY","PEAS","PAPAYAS","PASTURELAND","PLUMS & PRUNES","PEARS","PEAFOWL","PIMIENTOS","PINEAPPLES","PEPPERS","PICKLES","POTATOES","PEAS & CARROTS","PERSIMMONS","PHEASANTS","OIL-BEARING CROPS","PECANS","PLUM-APRICOT HYBRIDS","OSTRICHES","PISTACHIOS","PARSLEY","POMEGRANATES","POTATOES & DRY BEANS","PEAS & LENTILS","PALMS","TRANSPLANTS","PORK","POPCORN","PRACTICES","WHEY","VEGETABLES, MIXED","TOBACCO","VEGETABLES, OTHER","TURNIPS","WILD RICE","TREE NUT TOTALS","WATER ICES","POULTRY TOTALS","WATERCRESS","TOMATOES","TURKEYS","WHEAT","TREE NUTS, OTHER","SQUASH","VEGETABLE SEEDS","SUGARBEETS","WATER","TRITICALE","WALNUTS","VEAL","WOOL","YOGURT","VEGETABLE TOTALS","SUGARCANE","SPINACH"];

export const COLORMAP = {"ALCOHOL COPRODUCTS":"#03FC90","APPLES":"#FC4903","ARTICHOKES":"#0307FC","AMARANTH":"#4EFC03","AQUATIC PLANTS":"#FC0398","BERRIES, OTHER":"#03DFFC","BANANAS":"#FCCF03","BAREROOT HERBACEOUS PERENNIALS":"#8803FC","BLACKBERRIES":"#03FC3D","CATTLE":"#FC030F","BUTTER":"#035AFC","BOYSENBERRIES":"#A1FC03","BROCCOLI":"#FC03EC","BLUEBERRIES":"#03FCC6","ANIMALS, OTHER":"#FC7B03","BEETS":"#3503FC","BAITFISH":"#1CFC03","CUT CHRISTMAS TREES":"#FC0362","ALMONDS":"#03ADFC","DAIRY PRODUCTS, OTHER":"#F4FC03","DAIRY PRODUCT TOTALS":"#BA03FC","DECIDUOUS FLOWERING TREES":"#03FC73","DAIKON":"#FC2803","CORN":"#0324FC","MANGOES":"#6FFC03","COFFEE":"#FC03B6","DUCKS":"#03FCF8","CRUSTACEANS":"#FCB103","FOOD CROP, OTHER":"#6603FC","LOGANBERRIES":"#03FC20","LEGUMES":"#FC0330","ELK":"#0377FC","LIVESTOCK TOTALS":"#C2FC03","FRUIT TOTALS":"#F003FC","NECTARINES":"#03FCA5","FOOD GRAINS":"#FC5E03","JOJOBA":"#1303FC","CREAM":"#39FC03","MISCANTHUS":"#FC0384","MUSTARD":"#03CAFC","NON-CITRUS TOTALS":"#FCE303","PEAS & CARROTS":"#9D03FC","DECIDUOUS SHRUBS":"#03FC52","FOOD FISH":"#FC0B03","KIWIFRUIT":"#0345FC","PEACHES & NECTARINES":"#90FC03","CROPS, OTHER":"#FC03D7","PEAS":"#03FCD7","NURSERY, OTHER":"#FC9003","NON-CITRUS, OTHER":"#4503FC","PEPPERS":"#07FC03","PHEASANTS":"#FC0352","PINEAPPLES":"#0398FC","OIL":"#E3FC03","OSTRICHES":"#CF03FC","OKRA":"#03FC84","PUMPKINS":"#FC3D03","RHEAS":"#0313FC","PARTRIDGES":"#5AFC03","PRUNES":"#FC03A5","PEARS":"#03ECFC","MUSHROOMS":"#FCC203","PARSLEY":"#7B03FC","POPCORN":"#03FC30","SPORT FISH":"#FC031C","RHUBARB":"#0366FC","POULTRY, OTHER":"#ADFC03","SHEEP & GOATS TOTALS":"#FC03F8","RADISHES":"#03FCBA","SOIL":"#FC6F03","PICKLES":"#2803FC","SMALL GRAINS":"#28FC03","TRITICALE":"#FC036F","PLUMS & PRUNES":"#03BAFC","SOYBEANS":"#FCF803","SPINACH":"#AD03FC","SOD":"#03FC66","QUAIL":"#FC1C03","RYE":"#0330FC","SAFFLOWER":"#7BFC03","ANIMAL TOTALS":"#FC03C2","WOOL":"#03FCEC","SNOW":"#FCA503","SHORT TERM WOODY CROPS":"#5A03FC","BEEF":"#03FC13","BEANS":"#FC033D","BUTTERMILK":"#0384FC","SHERBET":"#CFFC03","ASPARAGUS":"#E303FC","CAMELINA":"#03FC98","SHEEP":"#FC5203","CANOLA":"#0703FC","RICE":"#45FC03","VEGETABLE SEEDS":"#FC0390","CITRUS, OTHER":"#03D7FC","AQUACULTURE TOTALS":"#FCD703","BERRY TOTALS":"#9003FC","AQUACULTURE, OTHER":"#03FC45","BEDDING PLANTS, HERBACEOUS PERENNIAL":"#FC0307","CUCUMBERS":"#0352FC","BEDDING PLANTS, ANNUAL":"#98FC03","BEESWAX":"#FC03E3","BISON":"#03FCCF","ANIMAL PRODUCTS, OTHER":"#FC8403","APRICOTS":"#3D03FC","BEDDING PLANT TOTALS":"#13FC03","CHEESE":"#FC035A","CRAMBE":"#03A5FC","CARROTS":"#ECFC03","COTTON":"#C203FC","ALPACAS":"#03FC77","CHESTNUTS":"#FC3003","CROP TOTALS":"#0320FC","CHERRIES":"#66FC03","CUT CHRISTMAS TREES & SHORT TERM WOODY CROPS":"#FC03B1","BUCKWHEAT":"#03F8FC","BRUSSELS SPROUTS":"#FCB603","CHUKARS":"#6F03FC","CANEBERRIES":"#03FC24","CITRUS TOTALS":"#FC0328","CRANBERRIES":"#0373FC","CAULIFLOWER":"#BAFC03","EGGS":"#F403FC","CHICKENS":"#03FCAD","CUT FLOWERS & CUT CULTIVATED GREENS":"#FC6203","EMUS":"#1C03FC","CHICORY":"#35FC03","CABBAGE":"#FC037B","CELERY":"#03C6FC","EQUINE":"#FCEC03","FEED":"#A103FC","CURRANTS":"#03FC5A","CRUDE PINE GUM":"#FC0F03","CUT FLOWERS":"#033DFC","DATES":"#88FC03","DILL":"#FC03CF","CUT CULTIVATED GREENS":"#03FCDF","FEED GRAINS & HAY":"#FC9803","FLOUR":"#4E03FC","FLORICULTURE TOTALS":"#03FC07","FIELDWORK":"#FC0349","FIGS":"#0390FC","EGGPLANT":"#DBFC03","AVOCADOS":"#D703FC","BARLEY":"#03FC8C","EVERGREENS, CONIFEROUS":"#FC4503","MUSHROOM SPAWN":"#030BFC","FIELD CROPS, OTHER":"#52FC03","EVERGREENS, BROADLEAF":"#FC039D","MILLFEED":"#03E3FC","MELONS":"#FCCA03","FLOWERING PLANTS, POTTED":"#8403FC","ORNAMENTAL GRASSES":"#03FC39","ORCHARDS":"#FC0313","MAPLE SYRUP":"#035EFC","DEER":"#A5FC03","FEED GRAINS":"#FC03F0","DECIDUOUS SHADE TREES":"#03FCC2","LOTUS ROOT":"#FC7703","PALMS":"#3003FC","FOLIAGE PLANTS":"#20FC03","FLAXSEED":"#FC0366","MOHAIR":"#03B1FC","FIELD CROP TOTALS":"#F8FC03","FLORICULTURE, OTHER":"#B603FC","K-EARLY CITRUS":"#03FC6F","LEMONS":"#FC2403","MINT":"#0328FC","LETTUCE":"#73FC03","PEAFOWL":"#FC03BA","FOOD CROP TOTALS":"#03FCF4","FLOWER SEEDS":"#FCAD03","PORK":"#6203FC","MACADAMIAS":"#03FC17","MINK":"#FC0335","MILLET":"#037FFC","MELLORINE":"#C6FC03","LLAMAS":"#E803FC","PASSION FRUIT":"#03FCA1","LIMES":"#FC5603","MEAL":"#0F03FC","WATER ICES":"#41FC03","WHEY":"#FC0388","RABBITS":"#03D3FC","LARD":"#FCDF03","WATER":"#9403FC","WALNUTS":"#03FC4E","OATS":"#FC0303","PEANUTS":"#0349FC","NURSERY TOTALS":"#94FC03","VEGETABLE TOTALS":"#FC03DB","PEACHES":"#03FCD3","VEAL":"#FC8C03","POMEGRANATES":"#4103FC","POTATOES & DRY BEANS":"#0BFC03","FRUIT, OTHER":"#FC0356","PLUM-APRICOT HYBRIDS":"#039DFC","MILK":"#E8FC03","GREASE":"#CA03FC","GRAPEFRUIT":"#03FC7F","GRAIN":"#FC3903","PISTACHIOS":"#0317FC","RAPESEED":"#5EFC03","MOLLUSKS":"#FC03A9","POULTRY TOTALS":"#03F0FC","GOATS":"#FCBE03","TURKEYS":"#7703FC","WATERCRESS":"#03FC2C","PROPAGATIVE MATERIAL":"#FC0320","GRASSES & LEGUMES, OTHER":"#036BFC","ICE CREAM":"#B1FC03","VEGETABLES, OTHER":"#FC03FC","GEESE":"#03FCB6","HOGS":"#FC6B03","WHEAT":"#2403FC","KUMQUATS":"#2CFC03","VEGETABLES, MIXED":"#FC0373","SORGHUM":"#03BEFC","SESAME":"#FCF403","POTATOES":"#A903FC","GREENS":"#03FC62","PIMIENTOS":"#FC1703","POULTRY FATS":"#0335FC","HORSERADISH":"#7FFC03","GINSENG":"#FC03C6","HAY":"#03FCE8","GRAIN STORAGE CAPACITY":"#FCA103","GINGER ROOT":"#5603FC","GARLIC":"#03FC0F","SUGARCANE":"#FC0341","TREE NUTS, OTHER":"#0388FC","HORTICULTURE TOTALS":"#D3FC03","OLIVES":"#DF03FC","GRAPES":"#03FC94","GOOSEBERRIES":"#FC4E03","TOBACCO":"#0303FC","TANGELOS":"#49FC03","SWEET CORN":"#FC0394","GRASSES & LEGUMES TOTALS":"#03DFFC","HAZELNUTS":"#FCD303","SWEET RICE":"#8803FC","HAYLAGE":"#03FC41","HOPS":"#FC030F","TOMATOES":"#0356FC","HAY & HAYLAGE":"#A1FC03","GUAR":"#FC03E8","SWEET POTATOES":"#03FCC6","TRANSPLANTS":"#FC7F03","PACKING FACILITY":"#3503FC","LENTILS":"#17FC03","SPECIALTY ANIMAL TOTALS":"#FC0362","GUINEAS":"#03A9FC","GRASSES":"#F4FC03","HORTICULTURE, OTHER":"#BE03FC","SUNFLOWER":"#03FC73","HONEY":"#FC2C03","ONIONS":"#0324FC","HERBS":"#6BFC03","TARO":"#FC03B6","STRAWBERRIES":"#03FCFC","ORANGES":"#FCB103","GUAVAS":"#6B03FC","PAPAYAS":"#03FC20","PECANS":"#FC032C","TALLOW":"#0377FC","SWITCHGRASS":"#BEFC03","TANGERINES":"#F003FC","PEAS & LENTILS":"#03FCA9","TREE NUT TOTALS":"#FC5E03","TURNIPS":"#1703FC","SQUASH":"#39FC03","TEMPLES":"#FC037F","RED MEAT":"#03CAFC","ORNAMENTAL FISH":"#FCE803","OIL-BEARING CROPS":"#9D03FC","SUGARBEETS":"#03FC56","PERSIMMONS":"#FC0B03","PLUMS":"#0341FC","PASTURELAND":"#8CFC03","POULTRY BY-PRODUCT MEALS":"#FC03D3","PRACTICES":"#03FCDB","YOGURT":"#FC9403","WILD RICE":"#4903FC","SPECIALTY ANIMALS, OTHER":"#03FC03","RASPBERRIES":"#FC034E"}