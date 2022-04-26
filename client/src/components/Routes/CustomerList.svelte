<script lang="ts">
	interface Element {
		text: string;
		focused: boolean;
	}

	export let importType: string = 'Default';

	export let importElements: string[] = [];

	export let importCurCustomer: string = '';

	let availableElements: Element[] = [];

	importElements.map((elementName, i) => {
		availableElements.push({ text: elementName, focused: false });
	});

	// for (let i = 0; i <= 5; i++)
	// 	availableElements.push({ text: 'New Element', focused: false, editing: false });

	const addElement = () => {
		availableElements = [...availableElements, { text: 'New ' + importType, focused: false }];
	};

	const elementClicked = (index: number) => {
		let saveFocus = availableElements[index].focused;
		availableElements.map((element) => (element.focused = false));

		availableElements[index].focused = !saveFocus;

		if (availableElements[index].focused) {
			importCurCustomer = availableElements[index].text;
		} else importCurCustomer = '';
	};
</script>

<div
	class="border border-3 border-warning rounded col"
	style="overflow-y: auto; overflow-x: hidden; max-height: 70vh; min-height: 10vh"
>
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
				</div>
			{:else}
				<h6 on:click={() => elementClicked(i)} class="ms-4 w-75" style="cursor: pointer">
					{element.text}
				</h6>
			{/if}
		</div>
	{/each}
</div>
