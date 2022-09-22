import { gql } from '@apollo/client';
export const GET_SHOP = gql`
	query GET_SHOP {
		shops {
			data {
				id
				attributes {
					title
					slug
					price
					img {
						data {
							attributes {
								formats
							}
						}
					}
				}
			}
			meta {
				pagination {
					page
					total
					pageSize
					pageCount
				}
			}
		}
	}
`;

export const GET_ITEM = gql`
	query GET_ITEM($slug: String!) {
		shops(filters: { slug: { eq: $slug } }) {
			data {
				attributes {
					title
					description
					price
					slug
					img {
						data {
							attributes {
								formats
							}
						}
					}
				}
			}
		}
	}
`;
