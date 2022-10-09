<script lang="ts">
	import type { ComponentSpaceAddress } from '$utils';

	export let data: import('./$types').PageData;

	const invoice = data.invoice?.data?.attributes;
	const owner = invoice?.owner?.data?.attributes?.info?.data?.attributes;
	const client = invoice?.client?.data?.attributes;

	function formatAddress(a: Partial<ComponentSpaceAddress> | undefined | null): string {
		if (a) {
			return `${a.street}, ${a.number} – ${a.zip} ${a.city} (${a.region})`;
		} else {
			return '';
		}
	}
</script>

<div class="flex justify-center bg-gray-200 p-12">
	<div class="sheet space-y-4 bg-white p-12">
		<div class="flex flex-row justify-between">
			<p>{invoice?.type}</p>
			<p>{invoice?.date}</p>
		</div>

		<hr />

		<!-- Me -->
		<div>
			<p>{owner?.name} {owner?.surname}</p>
			<p>{formatAddress(owner?.address)}</p>
			{#if owner?.idCodes}
				<table>
					{#each owner?.idCodes as id}
						<tr><td class="w-12 font-bold">{id?.type}</td><td>{id?.value}</td></tr>
					{/each}
				</table>
			{/if}
		</div>

		<hr />

		<!-- Client -->
		<div class="flex flex-col items-end">
			<p>{client?.fullName ? client.fullName : client?.name}</p>
			<p>{formatAddress(client?.address)}</p>
			{#if client?.idCodes}
				<table>
					{#each client?.idCodes as id}
						<tr><td class="w-12 font-bold">{id?.type}</td><td>{id?.value}</td></tr>
					{/each}
				</table>
			{/if}
		</div>

		<hr />

		<div>
			<p class="font-bold">Oggetto</p>
			<p>{invoice?.subject}</p>
		</div>

		<hr />

		<div>
			<p class="font-bold">Compenso</p>
			<p>{invoice?.amount}</p>
		</div>

		<hr />

		{#if invoice?.provisions?.data}
			{#each invoice?.provisions?.data as provision}
				<p>{provision.attributes?.text}</p>
			{/each}
		{/if}
	</div>
</div>

<style>
	.sheet {
		width: 210mm;
		height: 297mm;
	}
</style>
