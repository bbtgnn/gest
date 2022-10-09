<script lang="ts">
	import { goto } from '$app/navigation';

	export let data: import('./$types').PageData;

	const invoices = data.invoices?.data;

	function goToInvoice(id: string) {
		goto(`/invoices/${id}`);
	}
</script>

{#if invoices}
	<table class="table w-full">
		<!-- Table header -->
		<tr>
			<th>ID</th>
			<th>Cliente</th>
			<th>Importo</th>
			<th>Data</th>
		</tr>
		<!-- Table rows -->
		{#each invoices as i}
			<tr
				class="hover:bg-gray-300 hover:cursor-pointer"
				on:click={() => {
					if (i.id) goToInvoice(i.id);
				}}
			>
				<td>
					{i.id}
				</td>
				<td>
					{i.attributes?.client?.data?.attributes?.name}
				</td>
				<td>
					{i.attributes?.amount}
				</td>
				<td>
					{i.attributes?.date}
				</td>
			</tr>
		{/each}
	</table>
{/if}
