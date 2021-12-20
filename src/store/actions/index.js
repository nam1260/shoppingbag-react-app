
//action.. 들을 담는다 ?

export const addCart = (item) => {
    return {
        type: "ADD_ITEM",
        payload: item
    }
}

export const deleteCart = (item) => {
    return {
        type: "DELETE_ITEM",
        payload: item
    }
}


export const clearCart = () => {
    return {
        type: "CLEAR_ITEM"
    }

}



