import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import terrainReducer from './terrainReducer'

let reducers = combineReducers({
    cartReducer: cartReducer,
    terrainReducer:terrainReducer,
})

const rootReducers = (state,action) =>{
    return reducers(state,action)
}

export default rootReducers;