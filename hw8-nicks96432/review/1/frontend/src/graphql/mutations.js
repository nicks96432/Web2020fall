import { gql } from 'apollo-boost'

export const CREATE_MESSAGE_MUTATION = gql`
  mutation (
    $from: String!
    $body: String!
    $to: String!
  ) {
    createMessage(
      data: { 
        from: $from
        body: $body
        to: $to 
      }
    ) {
      from
      body
      to
    }
  }
`;
