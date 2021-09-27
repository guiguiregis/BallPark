let defaultState = {
    selectedItems:{items:[],reservationName:""}
}

let cartReducer = (state = defaultState,action) =>{
    switch (action.type){
        case "ADD_TO_CART":{
            let newState = {...state};
            newState.selectedItems ={
                items:[...newState.selectedItems.items,action.payload],
                
            };
            console.log(newState.selectedItems);
            return newState;
        }

        case "REMOVE_FROM_CART":{
            let newState = {...state};
            newState.selectedItems ={
                items:[...newState.selectedItems.items.filter(
                    (item) => item.item !== action.payload.item
                ),],
                
            };
            return newState;
        }

        default: 
            return state;

    }
};

export default cartReducer;