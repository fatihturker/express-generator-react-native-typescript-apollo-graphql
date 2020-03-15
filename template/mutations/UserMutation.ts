import { gql } from 'apollo-boost';

/**
 * @description holds user graphql mutations
 */

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id,
      name,
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id,
      name,
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: String!) {
    deleteUser(id: $input) {
      id,
      name,
      email
    }
  }
`;