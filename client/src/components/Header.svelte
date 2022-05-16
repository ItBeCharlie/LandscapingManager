<script lang="ts">
	import { onMount } from 'svelte';

	export let title = 'Main Menu';

	let curUser: any = null;
	onMount(() => {
		curUser = localStorage.getItem('user');
		if (curUser != null) curUser = JSON.parse(curUser);
	});

	const logout = () => {
		localStorage.removeItem('user');
		curUser = null;
	};
</script>

<header class="border rounded border-3 border-success bg-warning" style="margin: 0.5rem">
	<div class="d-flex justify-content-between">
		<!-- left -->
		<div class="flex justify-start md:flex-1">
			<a
				href="/"
				type="button"
				class="btn btn-outline-info border-0 btn-info text-primary"
				style="font-size: 1.2rem; margin: 0.5rem">Back</a
			>
		</div>

		<!-- middle -->

		{#if curUser == null}
			<h1 class="text-info">{title}</h1>
		{:else}
			<div class="d-flex flex-wrap">
				<h1 class="text-info w-100 text-center">{title}</h1>
				<h3 class="text-info w-100 text-center">Welcome {curUser.username}</h3>
			</div>
		{/if}

		<!-- right -->
		{#if curUser == null}
			<div class="flex justify-start md:flex-1">
				<a
					href="login"
					type="button"
					class="btn btn-outline-info border-0 btn-info text-primary"
					style="font-size: 1.2rem; margin: 0.5rem">Login</a
				>
			</div>
		{:else}
			<div class="flex justify-start md:flex-1">
				<a
					href="/"
					on:click={logout}
					type="button"
					class="btn btn-outline-info border-0 btn-info text-primary"
					style="font-size: 1.2rem; margin: 0.5rem">Logout</a
				>
			</div>
		{/if}
	</div>
</header>
