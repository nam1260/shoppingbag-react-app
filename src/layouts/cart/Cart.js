import React, { useState, useEffect, useCallback } from "react";
import DataManager from "../../managers/DataManager"
import {useDispatch, useSelector} from "react-redux"

import "./Cart.css";

const Cart = () => {

    const coupons = DataManager.getCoupons();

    const cart = useSelector(store=> store.cartReducer);
    console.log(cart);
    const cartItem = cart && cart.length > 0 ?
        cart.map((item, idx) => {
            return <div>
                <img src={item.detail_img_url}/>
                <span>{item.item_name}</span>
                <span id="price">{item.price}</span>
                <span>{item.score}</span>
            </div>
        })
        :<div>장바구니 제품이 없습니다. </div>

    return (
        <div className="layout">
            <section className="container">

                {
                cartItem

                }

            </section>
        </div>
    )
}
export default Cart;