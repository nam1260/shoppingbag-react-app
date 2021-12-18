import '../App.css';
import React, { useState, useEffect, useMemo } from "react";
import Styled from "styled-components"
import {useDispatch, useSelector} from "react-redux"

import MenuTitle from "../components/MenuTitle"
import CartItem from "../components/CartItem"
import Payment from "../components/Payment"

const CART_TITLE_TEXT = "MY SHOPPING BAG";
const PAYMENT_TITLE_TEXT = "PAYMENT";

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
    const [validItems, setValidItems] = useState([]);


    const checkedItemHandler = (() => {
            console.log("asf;ajsasfasf");
            let filteredItem = cart.filter(item => item.bChecked);
            setValidItems(filteredItem)
        }
    );

    useEffect(()=>{
        console.log("setCartItemList");
         setCartItemList(cart.map((item) =>{
            return <CartItem checkedItemHandler={checkedItemHandler} item={item}/>
        }))

    },[cart]);

    return (
        <div className="layout">
            <section className="container">
                <StyledCart>
                    <MenuTitle text={CART_TITLE_TEXT}/>

                    {cartItemList.length > 0 ?
                        <div>
                            <StyledCartInfo>
                                <div id="check-box"> <input type="checkbox" value="전체선택" name="전체선택"/></div>
                                <div id="prod-info">상품 정보</div>
                                <div id="order-cnt">수량</div>
                                <div id="price">주문금액</div>

                            </StyledCartInfo>
                            <div>{cartItemList}</div>
                        </div>
                         : <div>내 쇼핑백이 비어있습니다. 쇼핑바로가기</div>
                        }
                </StyledCart>
            </section>

            <selection className="container">
                <div>
                    <MenuTitle text={PAYMENT_TITLE_TEXT}/>
                    <Payment products={validItems}/>
                </div>
            </selection>
        </div>
    )
}
export default Cart;