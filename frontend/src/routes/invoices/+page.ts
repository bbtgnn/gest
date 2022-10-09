import type { PageLoad } from './$types';
import { browser } from '$app/environment';

import { sdk } from '$lib/requests/client';
import { gql } from 'graphql-request';

//

export const load: PageLoad = async () => {
	if (browser) {
		return await sdk.GetInvoices();
	}
	return {};
};

//

export const getInvoices = gql`
	query GetInvoices {
		invoices {
			meta {
				pagination {
					total
					page
					pageSize
					pageCount
				}
			}
			data {
				id
				attributes {
					date
					amount
					client {
						data {
							attributes {
								name
							}
						}
					}
				}
			}
		}
	}
`;
