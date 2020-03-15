import React from 'react';
import { ReactElement } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { ListItem, Button } from 'react-native-elements'
import { User } from '../models/UserModel';
import { DialogAction } from '../models/CommonModel';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * @description holds user list item
 */

// User properties
type UserProps = {
  user: User,
  key: String
}

// Navigation properties
type NavigationProps = {
  navigation: any
}

// Callback properties / methods
type CallbackProps = {
  onCallback(user: User, action: DialogAction)
}

type Props = UserProps & CallbackProps & NavigationProps;

/**
 * User List Item Component
 * @param props properties
 */
const UserPage: (props: Props) => ReactElement = (props: Props) => {
  const { user, onCallback, navigation } = props;
  return (
      <ListItem
        key={user.id}
        title={user.name}
        subtitle={user.email}
        bottomDivider 
        rightElement={
          <>
            <Button
              icon={
                <Icon
                  name="edit" 
                  size={26} 
                  color="#FFF"
                />
              }
              onPress = {
                () =>  navigation.navigate('UserDialog', {user: user, action: DialogAction.Edit, onCallback: onCallback})
              } 
              buttonStyle={styles.editButton}
            />
            <Button
              icon={
                <Icon
                  name="trash"
                  size={26} 
                  color="#FFF" 
                />
              }
              onPress = {
                () => navigation.navigate('UserDialog', {user: user, action: DialogAction.Delete, onCallback: onCallback})
              } 
              buttonStyle={styles.deleteButton}
            />
            
          </>
        }
        />
  );
};

const styles = StyleSheet.create({
  editButton: {
    height: 40,
    width: 40,
    backgroundColor: '#0D47A1'
  },
  deleteButton: {
    marginLeft: 5,
    height: 40,
    width: 40,
    backgroundColor: '#b71c1c'
  }
});

export default UserPage;
