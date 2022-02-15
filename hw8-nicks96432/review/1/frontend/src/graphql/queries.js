import { gql } from 'apollo-boost'

export const USER_QUERY = gql`
  query messages (
      $user: String!
    ) {
    messages(user: $user) {
      from
      body
      to
    }
  }
`;
