import { gql } from "@apollo/client";

export const subscription = gql`
	subscription($name: String!) {
		messagesWith(name: $name) {
			mutation
			data {
				from
				to
				body
			}
		}
	}
`;
