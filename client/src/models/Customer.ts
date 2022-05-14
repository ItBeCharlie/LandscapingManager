import type Location from './Location';
export default class Customer {
    id?: string;
    locations: Location[];
    customerName: string;
    customerAddress: string;
    customerBalance: number;

    constructor(customerName: string, customerAddress: string, customerBalance: number, locations: Location[]) {
        // this.id = Math.floor(Math.random() * 65536).toString(); // only for testing
        this.customerName = customerName;
        this.customerAddress = customerAddress;
        this.customerBalance = customerBalance;
        this.locations = []

        locations.map((value) => {
            this.addLocation(value)
        })
    }

    addLocation(location: Location) {
        this.locations.push(location)
        this.locations[this.locations.length-1].customer = this;
    }
}

