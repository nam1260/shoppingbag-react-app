import React, { useState, useEffect, useCallback } from "react";
import Styled from "styled-components"
import {useDispatch, useSelector} from "react-redux"

import MenuTitle from "../components/MenuTitle"
import CartItem from "../components/CartItem"
import "./Cart.css";


const CART_TITLE_TEXT = "MY SHOPPING BAG";

const StyledCart = Styled.div`
    position: relative;
    width: 1000px;
    
    & > div {
        position: relative;
        text-align: left;
    }
`

const StyledCartInfo = Styled.div`
    position: relative;
    text-align: center;
    height: 30px;
    display: table;
    border-bottom: 2px solid black;
    box-sizing: border-box;
    & > *{
     display: table-cell;
     vertical-align: middle;
     text-align: center;
     font-size: 18px;
     font-weight: 600;
    }
    
    & > div {
        width: 35%;
    }
    
    #check-box{
        width: 5%;
    }
    #price {
        width: 400px;
    }
 
`


const Cart = () => {

    const cart = useSelector(store=> store.cartReducer);
    const [cartItemList, setCartItemList] = useState([]);

    const checkedItemHandler = () => {
        let a = cart.filter((item)=> item.bChecked);
    };


    useEffect(()=>{
         setCartItemList(cart && cart.length > 0 ? cart.map((item) =>{
            return <CartItem
                checkedItemHandler = {checkedItemHandler}
                item={item}/>
        }) :  <div>장바구니 제품이 없습니다</div>)

    },[cart]);

    return (
        <div className="layout">
            <section className="container">
                <StyledCart>
                    <div><MenuTitle text={CART_TITLE_TEXT}/></div>
                    <div>
                        <StyledCartInfo>
                            <div id="check-box"> <input type="checkbox" value="전체선택" name="전체선택"/></div>
                            <div id="prod-info">상품 정보</div>
                            <div id="order-cnt">수량</div>
                            <div id="price">주문금액</div>
                        </StyledCartInfo>
                    </div>
                    <div>{cartItemList}</div>
                </StyledCart>

            </section>
        </div>
    )
}
export default Cart;