import type Location from './Location';
export default class Service {
    id?: string;
    location?: Location;
    serviceName: string;
    serviceRate: number;

    constructor(serviceName: string, serviceRate: number) {
        // this.id = Math.floor(Math.random() * 65536).toString(); // only for testing
        this.serviceName = serviceName;
        this.serviceRate = serviceRate;
    }
}