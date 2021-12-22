import '../App.css';
import React, { useState, useEffect, useCallback,useMemo } from "react";
import Styled from "styled-components"
import {useSelector, useDispatch} from "react-redux"
import {clearCart,deleteCart} from "../store/actions";
import {Link} from "react-router-dom";
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
    
    & > #empty-item {
        text-align: center;
        vertical-align: middle;
        line-height: 80px;
        height: 80px;
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

const StyledDeleteBtn = Styled.button`
  & {
     padding: 0.375rem 0.75rem;
     border-radius: 0.25rem;
     font-size: 14px;
     font-weight: 600;
     border: 1px solid grey;
     color: black;
     background: white;
  }
  &:hover {
    color: white;
    background: black;
    cursor: pointer
  }
`

const DELETE_BUTTON_TYPE = {
    ALL: "all",
    SELECTIVE: "selective"
}

const DeleteButton=({type,handler})=> {

    const onClickBtn = (e) => {
        handler(type);
    }


    return (
        <StyledDeleteBtn onClick={onClickBtn}>
            {type === DELETE_BUTTON_TYPE.ALL ? Strings.TEXT_DELETE_ALL : Strings.TEXT_DELETE_SELECTIVE}
        </StyledDeleteBtn>
    )
}

/**
 * 장바구니 관리 페이지
 * @returns {*}
 * @constructor
 */
const Cart = () => {

    const cart = useSelector(store=> store.cartReducer);
    const dispatch = useDispatch();
    const [validItems, setValidItems] = useState([]);
    const [allChecked, setAllChecked] = useState(true);


    const onCheckedAll =useCallback(() => {
        setAllChecked(!allChecked);
    },[allChecked])

    const checkedItemHandler = (() => {
            let filteredItem = cart.filter(item => item.bChecked);
            setValidItems(filteredItem)
        }
    );

    //TODO 선택 삭제 로직 구현 필요
    const deleteSelective = useCallback((selectedItem)=>{
        dispatch(deleteCart(selectedItem));
    },[]);

    const deleteAll = useCallback(() => {
        dispatch(clearCart());
    }, []);

    const deleteBtnHandler=((type)=>{
            switch (type) {
                case DELETE_BUTTON_TYPE.ALL:
                    deleteAll();
                    break;
                default:
                    break;
            }
    });


    const cartItemList = useMemo(()=>{
        return cart.map((item) =>{
            return <CartItem allChecked = {allChecked} deleteItem={deleteSelective} checkedItemHandler={checkedItemHandler} item={item}/>
        })
    },[cart,allChecked]);


    useEffect(()=>{
        checkedItemHandler();
    },[cart])

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
                            <DeleteButton type="all" handler={deleteBtnHandler}/>
                            {/*<DeleteButton type="selective" handler={deleteBtnHandler}/>*/}
                        </div>
                        :
                        <div id="empty-item">
                            <span>{Strings.TEXT_EMPTY_SHOPPING_BAG}</span>
                            <Link to="/products">{Strings.TEXT_GOTO_SHOPPING}</Link>
                        </div>
                        }
                </StyledCart>
            </section>

            <selection className="container">
                <div>
                    <MenuTitle text={Strings.TEXT_PAYMENT_TITLE}/>
                    <Payment products={validItems} cart ={cart}/>
                </div>
            </selection>
        </div>
    )
}
export default Cart;