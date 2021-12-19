import '../App.css';
import React, { useState, useEffect, useMemo } from "react";
import Styled from "styled-components"
import {useDispatch, useSelector} from "react-redux"

import MenuTitle from "../components/MenuTitle"
import CartItem from "../components/CartItem"
import Payment from "../components/Payment"
import * as Strings from "../resources/Strings"


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


/**
 * 장바구니 관리 페이지
 * @returns {*}
 * @constructor
 */
const Cart = () => {

    const cart = useSelector(store=> store.cartReducer);
    const [cartItemList, setCartItemList] = useState([]);
    const [validItems, setValidItems] = useState([]);
    const [allChecked, setAllChecked] = useState(true);


    const onCheckedAll =() => {
        setAllChecked(!allChecked);
    }

    const checkedItemHandler = (() => {
            let filteredItem = cart.filter(item => item.bChecked);
            setValidItems(filteredItem)
        }
    );

    useEffect(()=>{
         setCartItemList(cart.map((item) =>{
            return <CartItem allChecked = {allChecked} checkedItemHandler={checkedItemHandler} item={item}/>
        }))

    },[cart,allChecked]);

    return (
        <div className="layout">
            <section className="container">
                <StyledCart>
                    <MenuTitle text={Strings.TEXT_CART_TITLE}/>

                    {cartItemList.length > 0 ?
                        <div>
                            <StyledCartInfo>
                                <div id="check-box"> <input type="checkbox" checked={allChecked} onChange={onCheckedAll}/></div>
                                <div id="prod-info">{Strings.TEXT_PRODUCT_INFO}</div>
                                <div id="order-cnt">{Strings.TEXT_PRODUCT_COUNT}</div>
                                <div id="price">{Strings.TEXT_PRODUCT_PRICE}</div>

                            </StyledCartInfo>
                            <div>{cartItemList}</div>
                        </div>
                        : <div>{Strings.TEXT_EMPTY_SHOPPING_BAG}</div>
                        }
                </StyledCart>
            </section>

            <selection className="container">
                <div>
                    <MenuTitle text={Strings.TEXT_PAYMENT_TITLE}/>
                    <Payment products={validItems}/>
                </div>
            </selection>
        </div>
    )
}
export default Cart;