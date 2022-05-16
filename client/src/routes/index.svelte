<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '../components/Header.svelte';

	let curUser: any = null;
	onMount(() => {
		curUser = localStorage.getItem('user');
		if (curUser != null) curUser = JSON.parse(curUser);
	});
</script>

<Header title="Main Menu" />
<div class="d-flex justify-content-around flex-wrap">
	{#if curUser != null}
		<a
			href="customers"
			type="button"
			class="btn btn-outline-success border-3 btn-info text-center text-warning fw-bold my-2 fs-5 mx-2"
			>Customers</a
		>
		<a
			href="routes"
			type="button"
			class="btn btn-outline-success border-3 btn-info text-center text-warning fw-bold my-2 fs-5 mx-2"
			>Routes</a
		>
		<a
			href="services"
			type="button"
			class="btn btn-outline-success border-3 btn-info text-center text-warning fw-bold my-2 fs-5 mx-2"
			>Services</a
		>
	{/if}
</div>
