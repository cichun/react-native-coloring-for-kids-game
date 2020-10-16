import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
    reducer as network,
    createNetworkMiddleware,
} from 'react-native-offline';
import SvgModuleReducer from '@target-corp/react-native-svg-parser/src/reducers/SvgModuleReducer';

import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer, createTransform } from 'redux-persist';

const configureStore = () => {
    const rootReducer = combineReducers({
        network,
        SvgModuleReducer,
    });

    const networkMiddleware = createNetworkMiddleware({
        queueReleaseThrottle: 200,
        actionTypes: []
    });

    const myActionsList = {
    };

    // Transform how the persistor reads the network state
    const networkTransform = createTransform(
        (inboundState, key) => {
            const actionQueue = [];

            inboundState.actionQueue.forEach(action => {
                if (typeof action === 'function') {
                    actionQueue.push({
                        function: action.meta.name,
                        args: action.meta.args
                    });
                } else if (typeof action === 'object') {
                    actionQueue.push(action);
                }
            });

            return {
                ...inboundState,
                actionQueue
            };
        },
        (outboundState, key) => {
            const actionQueue = [];

            outboundState.actionQueue.forEach(action => {
                if (action.function) {
                    const actionFunction = myActionsList[action.function];
                    if (actionFunction) {
                        actionQueue.push(actionFunction(...action.args));
                    } else {
                        console.log('W store.js w mapie myActionsList brak referencji do ', action.function);
                    }
                } else {
                    actionQueue.push(action);
                }
            });

            return { ...outboundState, actionQueue };
        },
        // The 'network' key may change depending on what you
        // named your network reducer.
        { whitelist: ['network'] }
    );

    const persistConfig = {
        key: 'root',
        blacklist: ['SvgModuleReducer', 'ShopReducer'],
        storage: AsyncStorage,
        transforms: [networkTransform]
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const middlewares = [networkMiddleware, thunk];
    let store = createStore(persistedReducer, applyMiddleware(...middlewares));
    let persistor = persistStore(store, {}, () => {
        // After rehydration completes, we detect initial connection
    });

    return { store, persistor };
};

export default configureStore;
