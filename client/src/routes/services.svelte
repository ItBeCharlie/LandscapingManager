<script lang="ts">
	import Header from '../components/Header.svelte';
	import AddList from '../components/AddList.svelte';

	const services: string[] = ['My Service', '2nd Service'];
</script>

<Header title="Services" />
<div class="row w-75 mx-auto">
	<div class="w-50 mx-auto">
		<h3 class="text-warning text-center">Services</h3>
		<AddList importElements={services} importType="Service" />
	</div>
</div>
