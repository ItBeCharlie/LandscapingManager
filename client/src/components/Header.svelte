<script lang="ts">
	export let title = 'Main Menu';
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
		<h1 class="text-info">{title}</h1>

		<!-- right -->
		<div class="flex justify-start md:flex-1">
			<a
				href="login"
				type="button"
				class="btn btn-outline-info border-0 btn-info text-primary"
				style="font-size: 1.2rem; margin: 0.5rem">Login</a
			>
		</div>
	</div>
</header>
