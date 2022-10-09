import type { PageLoad } from './$types';
import { browser } from '$app/environment';

import { sdk } from '$lib/requests/client';
import { gql } from 'graphql-request';

//

export const load: PageLoad = async ({ params }) => {
	if (browser) {
		return await sdk.GetInvoice({ id: params.id });
	}
	return {};
};

//

export const getInvoice = gql`
	query GetInvoice($id: ID) {
		invoice(id: $id) {
			data {
				id
				attributes {
					amount
					date
					dueDays
					dueStart
					subject
					type
					taxation {
						data {
							attributes {
								coefficient
								amount
								contributions
							}
						}
					}
					provisions {
						data {
							attributes {
								text
							}
						}
					}
					owner {
						data {
							id
							attributes {
								info {
									data {
										id
										attributes {
											name
											surname
											iban
											idCodes {
												type
												value
											}
											address {
												city
												zip
												street
												number
												region
											}
										}
									}
								}
							}
						}
					}
					client {
						data {
							attributes {
								name
								fullName
								idCodes {
									type
									value
								}
								address {
									city
									zip
									street
									number
									region
								}
							}
						}
					}
				}
			}
		}
	}
`;
