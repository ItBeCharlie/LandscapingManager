import Customer from './Customer';
import Location from './Location';
import Service from './Service';
export default class User {
	id?: string;
	username: string;
	password?: string;
	email?: string;
	birthday?: string;
	customers?: Customer[];

	constructor(name: string, password?: string, customers?: Customer[]) {
		// this.id = Math.floor(Math.random() * 65536).toString(); // only for testing
		this.username = name;
		this.password = password;
		this.customers = customers;
	}

	// static signIn(user: User) {
	//     const res = async (): Promise<User> => {
	//         const res = await fetch(`http://localhost:5000/user/signin`, {
	//             method: 'POST',
	//             body: JSON.stringify(user),
	//         });
	//         if (res.ok) {
	//             return await res.json();
	//         } else {
	//             throw await res.json();
	//         }
	//     };
	//     res()
	//         .then((u) => {
	//             localStorage.setItem('user', JSON.stringify(u));
	//             window.location.href = '/';
	//         })
	//         .catch((err) => {
	//             console.log('Incorrect username or password');
	//         });
	// }

	// static signOut() {
	//     localStorage.removeItem('user');
	// }

	// static register(user: User): string {
	//     const res = async (): Promise<User> => {
	//         const res = await fetch(`http://localhost:5000/user/register`, {
	//             method: 'POST',
	//             body: JSON.stringify(user),
	//         });
	//         if (res.ok) {
	//             return await res.json();
	//         } else {
	//             throw await res.json();
	//         }
	//     };
	//     res()
	//         .then((u) => this.signIn(u))
	//         .catch((err) => console.error("Couldn't register"));
	//     return '';
	// }

	// static delete(user: User) {
	//     const res = async () => {
	//         const res = await fetch(`http://localhost:5000/user/delete`, {
	//             method: 'POST',
	//             body: JSON.stringify(user),
	//         });
	//         if (res.ok) {
	//             this.signOut();
	//             return await res.json();
	//         } else throw await res.json();
	//     };
	//     res().catch((err) => console.error("couldn't delete"));
	// }
}

export let dummyUser = {
	customers: [
		new Customer('Charlie', '123 Main Street', 100, [
			new Location('123 Main Street', [
				new Service('Lawncare', 50),
				new Service('Hedge Trimming', 25)
			]),
			new Location('456 Penny Lane', [new Service('Lawncare', 100)])
		]),
		new Customer('Andrew', '21 Jump Street', 200, [
			new Location('21 Jump Street', [new Service('Lawncare', 20)])
		])
	],
	username: 'ItBeCharlie'
};
