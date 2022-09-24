/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import Store, { persistor } from './src/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react'
const provider = () => {
    return (
        <Provider store={Store} >
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => provider);
