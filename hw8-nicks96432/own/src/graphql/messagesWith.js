import { gql } from "@apollo/client";

export const messagesWith = gql`
	query($name: String!) {
		messagesWith(name: $name) {
			from
			to
			body
		}
	}
`;
