import React, { useState, useEffect, useCallback } from "react";
import Styled from "styled-components"


const Item = Styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    border-bottom: solid 1px grey;
    box-sizing: border-box;
    & > img {
        width: 130px;
        height: 100px;
    }

`

const CartItem = ({item}) =>{

    return(
        <Item>
            <img src={item.detail_image_url}/>
            <span>{item.item_name}</span>
        </Item>
    )
};
export default CartItem;