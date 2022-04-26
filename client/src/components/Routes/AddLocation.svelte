<script lang="ts">
	interface Element {
		text: string;
		focused: boolean;
	}

	let oldName = '';

	export let importType: string = 'Default';

	export let importElements: string[] = [];

	export let handleLocation: any = { type: '', location: '' };

	// $: console.log(importElements);

	let availableElements: Element[] = [];

	let focusedElement = '';

	$: updateElementList(importElements);

	const updateElementList = (importElements: string[]) => {
		handleLocation = { type: '', location: '' };
		availableElements = [];
		importElements.map((elementName, i) => {
			availableElements = [...availableElements, { text: elementName, focused: false }];
		});
	};

	// for (let i = 0; i <= 5; i++)
	// 	availableElements.push({ text: 'New Element', focused: false, editing: false });

	const addElement = () => {
		if (focusedElement != '') handleLocation = { type: 'add', location: focusedElement };
		else handleLocation = { type: '', location: '' };
	};

	const removeElement = () => {
		if (focusedElement != '') handleLocation = { type: 'remove', location: focusedElement };
		else handleLocation = { type: '', location: '' };
	};

	const elementClicked = (index: number) => {
		let saveFocus = availableElements[index].focused;
		availableElements.map((element) => {
			element.focused = false;
		});

		availableElements[index].focused = !saveFocus;

		if (availableElements[index].focused) focusedElement = availableElements[index].text;
		else focusedElement = '';
	};
</script>

<div
	class="border border-3 border-warning rounded col"
	style="overflow-y: auto; overflow-x: hidden; max-height: 70vh; min-height: 10vh"
>
	<div class="d-flex justify-content-center">
		<button
			type="button"
			on:click={addElement}
			class="btn btn-outline-success border-3 btn-info text-center text-warning fw-bold w-50 my-2 fs-5 mx-2"
			>Add {importType}</button
		>
		<button
			type="button"
			on:click={removeElement}
			class="btn btn-outline-success border-3 btn-info text-center text-warning fw-bold w-50 my-2 fs-5 mx-2"
			>Remove {importType}</button
		>
	</div>
	{#each availableElements as element, i}
		<div class="my-2 align-middle">
			{#if element.focused}
				<div class="container ms-4" style="width: 90%">
					<h6
						class="border border-outline-success border-3 border-success rounded my-2 py-1 ps-1 fw-bold w-75 bg-info align-middle"
						style="resize: none; width: 100vw; max-width: 80%; cursor: pointer"
						on:click={() => elementClicked(i)}
					>
						{element.text}
					</h6>
				</div>
			{:else}
				<div
					on:click={() => elementClicked(i)}
					class="ms-4 w-75 align-middle"
					style="cursor: pointer"
				>
					{element.text}
				</div>
			{/if}
		</div>
	{/each}
</div>
