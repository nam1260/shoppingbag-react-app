import React, { useState, useEffect, useCallback } from "react";
import Styled from "styled-components"
import DataManager from "../../managers/DataManager"
import {useDispatch, useSelector} from "react-redux"

import MenuTitle from "./components/MenuTitle"
import CartItem from "./components/CartItem"
import "./Cart.css";
import ItemListComponent from "../product/component/ItemList";


const CART_TITLE_TEXT = "MY SHOPPING BAG";

const CartWrapper = Styled.div`
    position: relative;
    width: 1200px;
    
    & > div {
        position: relative;
        text-align: left;
    }
`


const Cart = () => {

    const coupons = DataManager.getCoupons();
    const cart = useSelector(store=> store.cartReducer);
    const [cartItemList, setCartItemList] = useState([]);

    useEffect(()=>{

         setCartItemList(cart && cart.length > 0 ? cart.map((item) =>{
            return <CartItem item={item}/>
        }) :  <div>장바구니 제품이 없습니다</div>)

    },[cart]);

    return (
        <div className="layout">
            <section className="container">
                <CartWrapper>
                    <div className="title-wrapper"><MenuTitle text={CART_TITLE_TEXT}/></div>
                    <div>{cartItemList}</div>
                </CartWrapper>

            </section>
        </div>
    )
}
export default Cart;