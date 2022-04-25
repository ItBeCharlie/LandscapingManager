<script lang="ts">
	import Header from '../components/Header.svelte';
	import ServiceList from '../components/ServiceList.svelte';
</script>

<Header title="Services" />
<div class="row w-75 mx-auto">
	<div class="w-50 mx-auto">
		<h3 class="text-warning text-center">Services</h3>
		<ServiceList />
	</div>
</div>
