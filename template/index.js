/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './graphql';

const RNApp = () => (
  <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => RNApp);
