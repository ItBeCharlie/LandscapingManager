<script lang="ts">
	interface Element {
		text: string;
		focused: boolean;
		editing: boolean;
	}

	let oldName = '';

	export let importType: string = 'Default';

	export let importElements: string[] = [];

	let availableElements: Element[] = [];

	importElements.map((elementName, i) => {
		availableElements.push({ text: elementName, focused: false, editing: false });
	});

	// for (let i = 0; i <= 5; i++)
	// 	availableElements.push({ text: 'New Element', focused: false, editing: false });

	const addElement = () => {
		availableElements = [
			...availableElements,
			{ text: 'New ' + importType, focused: false, editing: false }
		];
	};

	const elementClicked = (index: number) => {
		let saveFocus = availableElements[index].focused;
		availableElements.map((element) => {
			element.focused = false;
			element.editing = false;
		});

		availableElements[index].editing = false;
		availableElements[index].focused = !saveFocus;
	};

	const editElement = (index: number) => {
		availableElements.map((element) => (element.editing = false));
		oldName = availableElements[index].text;

		availableElements[index].editing = true;
		availableElements[index].focused = false;
	};

	const saveElement = (index: number) => {
		availableElements.map((element) => (element.editing = false));

		availableElements[index].text = oldName;
		availableElements[index].focused = true;
	};

	const deleteElement = (index: number) => {
		availableElements.map((element) => {
			element.focused = false;
			element.editing = false;
		});
		availableElements[index] = availableElements[index];
		availableElements.splice(index, 1);
	};
</script>

<div
	class="border border-3 border-warning rounded col"
	style="overflow-y: auto; overflow-x: hidden; max-height: 70vh"
>
	<div class="row d-flex justify-content-center">
		<button
			type="button"
			on:click={addElement}
			class="btn btn-outline-success border-3 btn-info text-center text-warning fw-bold w-50 my-2 fs-5 mx-auto"
			>Add {importType}</button
		>
	</div>

	{#each availableElements as element, i}
		<div class="row text-left">
			{#if element.focused}
				<div class="container ms-4 d-flex justify-content-center" style="width: 90%">
					<textarea
						class="border border-outline-success border-3 border-success rounded my-2 py-auto fw-bold w-75 bg-info"
						cols="20"
						rows="1"
						value={element.text}
						style="resize: none; width: 100vw; max-width: 80%; cursor: pointer"
						readonly
						on:click={() => elementClicked(i)}
					/>
					<button
						type="button"
						on:click={() => editElement(i)}
						class=" btn btn-outline-success border-3 btn-info text-center text-warning fw-bold my-2 ms-1 w-25"
						>Edit</button
					>
				</div>
			{:else if element.editing}
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
						on:click={() => saveElement(i)}
						class="btn btn-outline-success border-3 btn-info text-center text-warning fw-bold my-2 mx-1"
						>Save</button
					>
					<button
						type="button"
						on:click={() => deleteElement(i)}
						class=" btn btn-outline-success border-3 btn-info text-center text-warning fw-bold my-2"
						>Delete</button
					>
				</div>
			{:else}
				<h6 on:click={() => elementClicked(i)} class="ms-4 w-75" style="cursor: pointer">
					{element.text}
				</h6>
			{/if}
		</div>
	{/each}
</div>
