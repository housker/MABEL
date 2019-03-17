export class Bubble {
    x: number; 
    y: number; 
    r: number;
    category: string;
}

export class Alert {
    id: number;
    category: string;
    name: string;
    effective: number;
    description: string;
}

export class Buyer {
    id: number;
    name: string;
    amount: number;
    date: Date;
}

// in schema, distance would be calculated, not stored (?)
export class Supplier {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    distance: number;
}

// in schema consider tracking: id, name, type, description, supplier_id (foreign key to be joined suppliers to calculate distance)
// also track start and end timestamps that will then be converted to star_hr and end_hr
// for multiday events there will be duplication of events. start_hr before today will be 0, end_hr after today will be 24
// schedule should be provided with JOIN: for all suppliers within given radius (calculated from lat, lng), return schedule where end >= today
// activity is discrete category to correspond to point's color
export class Event {
    id: number;
    category: string;
    start_hr: number;
    end_hr: number; 
    distance: number;
}

// export class Schedule {
//     date: Date;
// }

// export class Schedule {
//     activity: string;
//     start: number;
//     end: number;
// }

export class Weather {
    type: string;
    start: number;
    end: number;
}

export class Today {
    day: number;
    monthI: number;
    month: string;
    year: number;
}

export class Report {
    id: number;
    name: string;
    yield: number;
    revenue: number;
}

export class Difference {
    id: number;
    name: string;
    predicted: number;
    actual: number;
    difference: number;
}

export class Weekday {
    fullDate: Date;
    dayOfYear: number;
    wkdayI: number;
    wkday: string;
    day: number;
    month: number;
    year: number;
    sunrise: number;
    sunset: number;
    weather: Weather[];
    schedule: Event[];
}












// VALIDATION FOR SOIL TYPES MAPPED TO PRODUCT
