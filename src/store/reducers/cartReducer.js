const cartReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return [...state, action.payload];
        case "DELETE_ITEM":
            return  state.filter((item)=> item.item_no !== action.payload.item_no);
        case "CLEAR_ITEM":
            return [];
        default:
            return state;
    }
}

export default cartReducer;

