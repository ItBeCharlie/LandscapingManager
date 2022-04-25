<script lang="ts">
	import Header from '../components/Header.svelte';
	import AddList from '../components/AddList.svelte';

	const routes: string[] = ['My Service', '2nd Service'];
</script>

<Header title="Routes" />
<div class="d-flex justify-content-around">
	<div class="w-50 mx-2">
		<h3 class="text-warning text-center">Available Routes</h3>
		<AddList importElements={routes} importType="Route" />
	</div>
	<div class="w-50 mx-2">
		<h3 class="text-warning text-center">Routes</h3>
		<AddList importElements={routes} importType="Route" />
	</div>
	<div class="w-50 mx-2">
		<h3 class="text-warning text-center">Customers</h3>
		<AddList importElements={routes} importType="Customer" />
	</div>
	<div class="w-50 mx-2">
		<h3 class="text-warning text-center">Locations</h3>
		<AddList importElements={routes} importType="Location" />
	</div>
</div>
