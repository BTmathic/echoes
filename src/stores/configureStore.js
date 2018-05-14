import { createStore, combineReducers } from 'redux';
import charReducer from '../reducers/char';
import mapReducer from '../reducers/map';

export default () => {
    const store = createStore(
        combineReducers({
            map: mapReducer,
            char: charReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}