import React, { useState, useEffect, useCallback } from "react";
import DataManager from "../../managers/DataManager"
import {useDispatch, useSelector} from "react-redux"

import MenuTitle from "./components/MenuTItle"
import "./Cart.css";


const CART_TITLE_TEXT = "나의 장바구니 목록";

const Cart = () => {

    const coupons = DataManager.getCoupons();
    const cart = useSelector(store=> store.cartReducer);
    const [cartItemList, setCartItemList] = useState([]);

    useEffect(()=>{

         setCartItemList(cart && cart.length > 0 ? cart.map((item) =>{
            return <div>
                <img src={item.detail_img_url}/>
                <span>{item.item_name}</span>
                <span id="price">{item.price}</span>
                <span>{item.score}</span>
            </div>
        }) :  <div>장바구니 제품이 없습니다</div>)

    },[cart]);

    return (
        <div className="layout">
            <section className="container">
                <div>
                    <MenuTitle text={CART_TITLE_TEXT}/>
                </div>
                {cartItemList}
            </section>
        </div>
    )
}
export default Cart;