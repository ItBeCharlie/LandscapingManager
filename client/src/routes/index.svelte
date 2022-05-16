<script lang="ts">
	import Header from '../components/Header.svelte';
</script>

<Header title="Main Menu" />
<div class="d-flex justify-content-around flex-wrap">
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
</div>
