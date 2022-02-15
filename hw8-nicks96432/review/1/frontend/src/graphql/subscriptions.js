import { gql } from 'apollo-boost'

export const USER_SUBSCRIPTION = gql`
  subscription message (
    $user: String!
  ) {
    message(user: $user) {
      mutation
      data {
        from
        body
        to
      }
    }
  }
`;
