import Reducer from './reducer';
import {combineReducers} from 'redux';

const RootReducer = combineReducers({
    reducer : Reducer
})

export default RootReducer;