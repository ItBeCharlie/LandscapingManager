<script lang="ts">
	import Header from '../components/Header.svelte';
	import CustomerList from '../components/CustomerList.svelte';

	const services: string[] = ['My Service', '2nd Service'];
</script>

<Header title="Customers" />
<div class="row w-75 mx-auto">
	<div class="w-50 mx-auto">
		<h3 class="text-warning text-center">Customers</h3>
		<CustomerList importServices={services} />
	</div>
</div>
