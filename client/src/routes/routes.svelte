<script lang="ts">
	import Header from '../components/Header.svelte';
	import AddList from '../components/AddList.svelte';
	import DisplayList from '../components/DisplayList.svelte';
	import AddLocation from '../components/Routes/AddLocation.svelte';
	import CustomerList from '../components/Routes/CustomerList.svelte';

	interface Customer {
		customerName: string;
		locations: string[];
	}

	const customers: Customer[] = [
		{
			customerName: 'Charlie',
			locations: ['123 Main Street', '456 Penny Lane', '789 Doctor Dr']
		},
		{ customerName: 'andrw', locations: ['123 Main Street', 'Hempstead'] },
		{ customerName: 'Andrew', locations: ['Hyde Park'] }
	];
	interface Assignment {
		customer: string;
		location: string;
	}

	const formatLocation = (customer: Customer, index: number) => {
		return { customer: customer.customerName, location: customer.locations[index] };
	};
	interface Route {
		routeName: string;
		locations: Assignment[];
	}

	const parseLocations = (curCustomerName: string) => {
		curCustomer = { customerName: '', locations: [] };
		customers.forEach((element) => {
			if (element.customerName == curCustomerName) curCustomer = element;
		});

		curLocations = curCustomer.locations;

		// console.log(curLocations);
	};

	let curCustomer: Customer = { customerName: '', locations: [] };

	let curCustomerName: string = '';

	let curRoute: Route = { routeName: '', locations: [] };

	let routes: Route[] = [];

	let curLocations: string[] = [];

	$: parseLocations(curCustomerName);

	// $: console.log(curCustomerName);
</script>

<Header title="Routes" />
<div class="d-flex justify-content-around">
	<div class="w-50 mx-2">
		<h3 class="text-warning text-center">Available Routes</h3>
		<AddList importElements={[]} importType="Route" />
	</div>
	<div class="w-50 mx-2">
		<h3 class="text-warning text-center">Route Locations</h3>
		<DisplayList importElements={[]} importType="Route" />
	</div>
	<div class="w-50 mx-2">
		<h3 class="text-warning text-center">Customers</h3>
		<CustomerList
			importElements={customers.map(({ customerName }) => customerName)}
			importType="Customer"
			bind:importCurCustomer={curCustomerName}
		/>
	</div>
	<div class="w-50 mx-2">
		<h3 class="text-warning text-center">Locations</h3>
		<AddLocation importElements={curLocations} importType="Location" />
	</div>
</div>
