import type Service from './Service';
import type Customer from './Customer';
export default class Location {
    id?: string;
    services: Service[];
    customer?: Customer;
    locationAddress: string;

    constructor(locationAddress: string, services: Service[]) {
        // this.id = Math.floor(Math.random() * 65536).toString(); // only for testing
        this.locationAddress = locationAddress;
        this.services = [];

        services.map((value) => {
            this.addService(value)
        })
    }

    addService(service: Service) {
        this.services.push(service)
        this.services[this.services.length-1].location = this;
    }
}
