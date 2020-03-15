import React, { useState } from 'react';
import { ReactElement } from 'react';
import {
  StyleSheet, ScrollView,
} from 'react-native';
import { GET_USERS, UsersData } from '../queries/UserQuery';
import { useQuery } from '@apollo/react-hooks';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserPage from './UserPage';
import { FloatingAction } from "react-native-floating-action";
import { DialogAction } from '../models/CommonModel';
import { User } from '../models/UserModel';

/**
 * @description holds user list
 */

// create user button declarations like icon, actions
const createUserIcon = <Icon name="user" color="#FFF" />
const createUserAction = "bt_create_user"
const actions = [
  {
    text: "Create User",
    icon: createUserIcon,
    name: createUserAction,
    position: 1
  }
];

/**
 * User List Component
 * @param navigation navigation 
 */
const UsersPage: ({navigation}) => ReactElement = ({navigation}) => {
  // Queries all users
  const { loading, data, error } = useQuery<UsersData, {}>(
    GET_USERS
  );

  // List last updated state
  const [lastUpdated, setLastUpdated] = useState(new Date());

  /**
   * updates user list with updated / created / deleted user
   * @param user user instance
   * @param action dialog action
   */
  const updateState = (user: User, action: DialogAction) => {
    if (data && data.users) {
      if (action === DialogAction.Edit || action === DialogAction.Delete) {
        let oldUserIndex = data.users.map(u => {
          return u.id;
        }).indexOf(user.id);
        if (oldUserIndex != null && oldUserIndex >= 0) {
          if (action === DialogAction.Edit) {
            data.users[oldUserIndex] = user;
          } else if (action === DialogAction.Delete) {
            data.users.splice(oldUserIndex, 1);
          }
        }
      } else if(action === DialogAction.New) {
        data.users.push(user);
      }
    }
    setLastUpdated(new Date());
  }

  return (
    <>
      {
        loading ? (
          <Text>Loading ...</Text>
        ) : 
        error ? (
          <Text>{error.message}</Text>
        ) : (
          <>
          <ScrollView>
            {data && data.users.map(user => (
              <UserPage user={user} key={user.id} onCallback={updateState} navigation={navigation}/>
            ))}
          </ScrollView>
          <FloatingAction
            actions={actions}
            onPressItem={name => {
              if (name === createUserAction) {
                navigation.navigate('UserDialog', {user: {} as User, action: DialogAction.New, onCallback: updateState})
              }
            }}
          />
          </>
        )
      }
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default UsersPage;
