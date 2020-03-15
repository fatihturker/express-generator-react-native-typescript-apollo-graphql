import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import {
  StyleSheet, View,
} from 'react-native';
import { Button , Input, Text } from 'react-native-elements'
import { User } from '../models/UserModel';
import { DialogAction } from '../models/CommonModel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CREATE_USER, DELETE_USER, UPDATE_USER } from '../mutations/UserMutation';

/**
 * @description holds user dialog
 */

// Navigation properties
type NavigationProps = {
  route: any,
  navigation: any
}

// Callback properties / methods
type CallbackProps = {
  onCallback(user: User, action: DialogAction)
}

// User state
type UserState = {
  user: User,
  email: String,
  password: String,
  name: String
}

// Dialog specific state
type DialogState = {
  error: String,
  loading: boolean
}

type Props = NavigationProps & CallbackProps;
type State = UserState & DialogState;

/**
 * User Dialog Component
 */
class UserDialog extends Component<Props, State> {
  /**
   * sets initial state and attaches user dialog to global state
   * @param {Props} props component properties
   */
  constructor(props: Props) {
    super(props);
    const user: User = {} as User;
    this.state = {
      user: user,
      email: "",
      password: "",
      name: "",
      error: "",
      loading: false
    }
  }
  /***
   * client side validations
   * @param {DialogAction} action dialog action type
   */
  validateFields = (action: DialogAction) => {
    const { name, password, email } = this.state;
    if(name != null && name != null 
      && name != undefined && name.length > 0
      && (
        action === DialogAction.Edit || 
        (
          password != null
            && password != undefined && password.length > 0
        )
      )
      && email != null
      && email != undefined && email.length > 0) 
      {
        this.setState({error: ""})
        return true
      } else {
        this.setState({error: "Please fill the required fields."})
        return false
      }
  }

  /**
   * renders the user dialog component
   */
  render = () => {
    const { navigation } = this.props;
    const { user, action, onCallback } = this.props.route.params;
    const { error, loading, name, email } = this.state;
    if (action === DialogAction.Edit && email === "" && name === "") {
      this.setState({email: user.email, name: user.name});
    }
    /**
     * sets email state
     * @param {String} email user email
     */
    const handleEmailChanged = (email: string) => {
      user.email = email;
      this.setState({email: email, user: user});
    };

    /**
     * sets name state
     * @param {String} name user name
     */
    const handleNameChanged = (name: string) => {
      user.name = name;
      this.setState({name: name, user: user});
    };

    /**
     * sets password state
     * @param {String} password user password
     */
    const handlePasswordChanged = (password: string) => {
      user.password = password;
      this.setState({password: password, user: user});
    };

    return (
      <View style={styles.container}>
        <Input
          label='Username *'
          autoCapitalize="none"
          leftIcon={
            <Icon
              name='user'
              size={16}
              color='grey'
            />
          }
          value={user.name}
          inputStyle={styles.input}
          labelStyle={styles.label}
          onChange={(e) => handleNameChanged(e.nativeEvent.text)}
          disabled={loading || action === DialogAction.Delete}
        />
        <Input
          label='Email *'
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={
            <Icon
              name='envelope'
              size={16}
              color='grey'
            />
          }
          value={user.email}
          inputStyle={styles.input}
          labelStyle={styles.label}
          onChange={(e) => handleEmailChanged(e.nativeEvent.text)}
          disabled={loading || action === DialogAction.Delete}
        />
        {
          action === DialogAction.New ?
            <Input
              label='Password *'
              secureTextEntry
              autoCapitalize="none"
              leftIcon={
                <Icon
                  name='lock'
                  size={16}
                  color='grey'
                />
              }
              value={user.password}
              inputStyle={styles.input}
              labelStyle={styles.label}
              onChange={(e) => handlePasswordChanged(e.nativeEvent.text)}
              disabled={loading} 
            />
          : null
        }
        
        {
              action === DialogAction.New ? 
              <Mutation mutation={CREATE_USER}
                onCompleted = { 
                  data => {
                    // on mutation completed, call onCallback method with user data and closes the dialog
                    onCallback(data.createUser, action);
                    navigation.goBack()
                  }
                }
              >
                {
                  createUser => 
                  (
                    <Button onPress={
                      () => {
                        this.setState({loading: true})
                        if (this.validateFields(action)) {
                          createUser({ variables: { input: user } });
                        } else {
                          this.setState({loading: false})
                        }
                      } 
                    }
                    buttonStyle={styles.button}
                    title="Create"
                    loading={loading} 
                    disabled={loading} />
                  )
                }
              </Mutation>
              : action === DialogAction.Edit ? 
              <Mutation mutation={UPDATE_USER} 
                onCompleted = { 
                  data => {
                    // on mutation completed, call onCallback method with user data and closes the dialog
                    onCallback(data.updateUser, action);
                    navigation.goBack()
                  }
                }
              >
                {
                  updateUser => 
                  (
                    <Button onPress={
                      () => {
                        this.setState({loading: true})
                        if (this.validateFields(action)) {
                          updateUser({ variables: { input: user } });
                        }  else {
                          this.setState({loading: false})
                        }
                      } 
                    }
                    buttonStyle={styles.button}
                    title="Edit"
                    loading={loading}
                    disabled={loading} />
                  )
                }
              </Mutation>
              : action === DialogAction.Delete ? 
              <Mutation mutation={DELETE_USER}
                onCompleted = { 
                  data => {
                    // on mutation completed, call onCallback method with user data and closes the dialog
                    onCallback(data.deleteUser, action);
                    navigation.goBack()
                  }
                }
              >
                {
                  deleteUser => 
                  (
                    <Button onPress={
                      () => {
                        this.setState({loading: true})
                        // sends delete user mutation to graphql server
                        deleteUser({ variables: { input: user.id } });
                      } 
                    }
                    title="Delete"
                    loading={loading}
                    disabled={loading}
                    buttonStyle={styles.deleteButton} />
                  )
                }
              </Mutation>
              : <Button title="No Action" />
            }
        {
          error !== ""?
          <View style={styles.errorContainer}>
            <Icon name="exclamation" color="#b71c1c">
              <Text style={styles.errorText}> {error}</Text>
            </Icon>
          </View>
          : null
        }
        
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  input: {
    marginLeft: 10,
    color: '#616161'
  },
  label: {
    fontSize: 12,
    color: 'grey',
    marginTop: 5,
    marginBottom: -5,
    marginLeft: 12
  },
  button: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#0D47A1'
  },
  deleteButton: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#b71c1c'
  },
  container: {
    width: '98%',
    alignSelf: 'center',
    marginTop: 10
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 15
  },
  errorText: {
    color: '#616161'
  }
});

export default UserDialog;
