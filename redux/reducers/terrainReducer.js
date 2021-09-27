import { act } from "react-test-renderer";

let defaultState = {
    categories:[]
}

let terrainReducer = (state = defaultState,action) =>{
    switch (action.type){
        case "SET_LIST":{
            let newState = {...state};
            newState.categories =action.payload;
            return newState;
        }
        
        default: 
            return state;

    }
};

export default terrainReducer;