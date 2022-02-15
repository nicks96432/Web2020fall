import { gql } from "@apollo/client";

export const deleteMessages = gql`
	mutation($name: String!) {
		deleteMessages(data: { name: $name }) {
			to
			body
		}
	}
`;
