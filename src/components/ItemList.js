import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux"
import {addCart, deleteCart} from "../store/actions/index";
import * as Strings from "../resources/Strings";

const ItemList = styled.div`
  display: flex;
  flex-direction: row;
  
  & > div {
   position: relative;
   width: 300px;
   display:flex;
   flex-direction: column;
   margin-right: 20px;
  }
   
  .item-info {
    position: relative;
  }
  
  .item-info > * {
     display: flex;
     margin-bottom: 5px;
  }
  
  .item-info > img {
     margin-bottom: 10px;
     width: 300px;
     height: 300px;
  }
  
  .item-info{
    font-size: 16px;
    text-align: left;
    font-weight: 600;
  }
  #item-name {
    min-height: 40px;
  }
  
  #item-price {
    color: rgb(255,72,0);
  }
  
  #item-score {
    font-size: 14px;
    color: rgb(80,80,80)
  }
  #item-score img{
    width: 20px;
    height: 20px;
  }
  
  .coupon-info {
    position: absolute;
    top: 0px;
    right: 0px;
    background: black;
    color: white;
  }
  button {
     max-width: 300px;
     padding: 0.375rem 0.75rem;
     border-radius: 0.25rem;
     font-size: 1rem;
     font-weight: 600;
     line-height: 1.5;
     border: 1px solid grey;
     color: black;
     background: white;
  }
  button:hover {
    color: white;
    background: black;
    cursor: pointer
  }
  
`


const ItemInfo = ({item}) => {

    return (
        <div>
            <div className="item-info">
                <img src={item.detail_image_url}/>
                <div id="item-name">
                    <span>{item.item_name}</span>
                </div>
                <div id="item-price">
                    <span>{(item.price).toLocaleString()}원</span>
                </div>
                <div id="item-score">
                    <img/>
                    <span>{item.score}</span>
                </div>
            </div>

            <div className="coupon-info">
                <div>{item.availableCoupon !== false ? Strings.TEXT_DISCOUNT_PRODUCT : ""}</div>
            </div>
        </div>

    )

};


//가격/사진/상품 제목
const ItemListComponent = ({itemList}) => {

    const cart = useSelector(store=> store.cartReducer);
    const dispatch = useDispatch();

    const hasInCart = useCallback((item)=>{
        let hasItem = false;

        let i =0;
        for(i; i < cart.length; i++) {
            if(item.item_no === cart[i].item_no) {
                hasItem = true;
                break;
            }
        }
        return hasItem;
    },[cart]);

    const onClickBtn = (e, item) => {
        if(hasInCart(item)) {
            dispatch(deleteCart(item));
            e.target.innerText = Strings.TEXT_ADD_CART
        }else {
            if(cart.length > 2) {
                alert(Strings.TEXT_LIMIT_CART_ALERT);
                return ;
            }
            dispatch(addCart(item));
            e.target.innerText = Strings.TEXT_REMOVE_CART
        }

    };

    return (
         itemList ? <ItemList className="items component">
            {
                itemList.map((item) => {
                    return (
                        <div>
                            <ItemInfo item={item}/>
                            <button onClick={(e)=>{onClickBtn(e,item)}}>
                                {hasInCart(item) ? Strings.TEXT_REMOVE_CART : Strings.TEXT_ADD_CART}
                            </button>

                        </div>
                    )
                })
            }
        </ItemList> : <div>no data</div>
    )
};
export default ItemListComponent
