import { gql } from "@apollo/client";

export const createMessage = gql`
	mutation($from: String!, $to: String!, $body: String!) {
		createMessage(data: { from: $from, to: $to, body: $body }) {
			from
			to
			body
		}
	}
`;
