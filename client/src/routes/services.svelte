<script lang="ts">
	import Header from '../components/Header.svelte';
	import AddList from '../components/Services/AddList.svelte';
	import { onMount } from 'svelte';
	import { api } from '../models/myFetch';

	let curUser: any = null;
	let services: string[] = [];
	onMount(async () => {
		curUser = localStorage.getItem('user');
		if (curUser != null) curUser = JSON.parse(curUser);
		let res = await api('availableServices/all', 'GET');
		console.log(res);

		if (!res.error) {
			res.forEach((element: { name: string }) => {
				services.push(element.name);
			});
		}
	});
</script>

<Header title="Services" />
<div class="row w-75 mx-auto">
	<div class="w-50 mx-auto">
		<h3 class="text-warning text-center">Services</h3>
		<AddList importElements={services} importType="Service" />
	</div>
</div>
