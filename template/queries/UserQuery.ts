import { gql } from 'apollo-boost';
import { User } from '../models/UserModel';

/**
 * @description holds user graphql queries
 */

export interface GetUserVars {
  id: string;
}

export interface UsersData {
  users: User[];
}

export const GET_USER = gql`
  query {
    user(id: $id) {
      id,
      name,
      email
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id,
      name,
      email
    }
  }
`;