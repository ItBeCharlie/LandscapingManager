<script lang="ts">
	interface Service {
		text: string;
		focused: boolean;
		editing: boolean;
	}

	let oldName = '';

	export let importServices: string[] = [];

	let availableServices: Service[] = [];

	importServices.map((serviceName, i) => {
		availableServices.push({ text: serviceName, focused: false, editing: false });
	});

	// for (let i = 0; i <= 5; i++)
	// 	availableServices.push({ text: 'New Service', focused: false, editing: false });

	const addService = () => {
		availableServices = [
			...availableServices,
			{ text: 'New Service', focused: false, editing: false }
		];
	};

	const serviceClicked = (index: number) => {
		let saveFocus = availableServices[index].focused;
		availableServices.map((service) => {
			service.focused = false;
			service.editing = false;
		});

		availableServices[index].editing = false;
		availableServices[index].focused = !saveFocus;
	};

	const editService = (index: number) => {
		availableServices.map((service) => (service.editing = false));
		oldName = availableServices[index].text;

		availableServices[index].editing = true;
		availableServices[index].focused = false;
	};

	const saveService = (index: number) => {
		availableServices.map((service) => (service.editing = false));

		availableServices[index].text = oldName;
		availableServices[index].focused = true;
	};

	const deleteService = (index: number) => {
		availableServices.map((service) => {
			service.focused = false;
			service.editing = false;
		});
		availableServices[index] = availableServices[index];
		availableServices.splice(index, 1);
	};
</script>

<div
	class="border border-3 border-warning rounded col"
	style="overflow-y: auto; overflow-x: hidden; max-height: 70vh"
>
	<div class="row d-flex justify-content-center">
		<button
			type="button"
			on:click={addService}
			class="btn btn-outline-success border-3 btn-info text-center text-warning fw-bold w-50 my-2 fs-5 mx-auto"
			>Add Customer</button
		>
	</div>

	{#each availableServices as service, i}
		<div class="row text-left">
			{#if service.focused}
				<div class="container ms-4 d-flex justify-content-center" style="width: 90%">
					<textarea
						class="border border-outline-success border-3 border-success rounded my-2 py-auto fw-bold w-75 bg-info"
						cols="20"
						rows="1"
						value={service.text}
						style="resize: none; width: 100vw; max-width: 80%; cursor: pointer"
						readonly
						on:click={() => serviceClicked(i)}
					/>
					<button
						type="button"
						on:click={() => editService(i)}
						class=" btn btn-outline-success border-3 btn-info text-center text-warning fw-bold my-2 ms-1 w-25"
						>Edit</button
					>
				</div>
			{:else if service.editing}
				<div class="container ms-4 d-flex justify-content-center" style="width: 90%">
					<textarea
						class="border border-outline-success border-3 border-success rounded my-2 py-auto w-75"
						style="resize: none; width: 100vw; max-width: 80%"
						bind:value={oldName}
						cols="20"
						rows="1"
						id="edittext"
					/>
					<button
						type="button"
						on:click={() => saveService(i)}
						class="btn btn-outline-success border-3 btn-info text-center text-warning fw-bold my-2 mx-1"
						>Save</button
					>
					<button
						type="button"
						on:click={() => deleteService(i)}
						class=" btn btn-outline-success border-3 btn-info text-center text-warning fw-bold my-2"
						>Delete</button
					>
				</div>
			{:else}
				<h6 on:click={() => serviceClicked(i)} class="ms-4 w-75" style="cursor: pointer">
					{service.text}
				</h6>
			{/if}
		</div>
	{/each}
</div>
