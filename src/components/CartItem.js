import React, { useState, useEffect, useCallback } from "react";
import Styled from "styled-components"


const StyledItem = Styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: solid 1px grey;
    box-sizing: border-box;
    display: table;
    
    & > *{
     display: table-cell;
     width 35%;
     vertical-align: middle;
     text-align: center;
    }
   
    .check-box {
        width: 5%;
    }
    
    .prod-cnt input {
      text-align: center;   
      width: 40px;
    }
    
    .prod-info > div {
        display: flex;
    }
    
    .prod-info >div > img {
        width: 130px;
        height: 100px;
    }
    
    .prod-info-detail {
        padding-left: 10px;
        text-align: left;
        width: 170px;
    }
    
    .prod-info-detail #item-name {
        font-size: 16px;
        font-weight: 600    
    }
    
     .prod-info-detail #item-price {
        margin-top: 4px;
        font-size: 16px;
        color: rgb(255,72,0);
    }
     .prod-info-detail #item-coupon {
        font-weight: 600;
        color: blue;
     }
    
    .price span {
    
        font-size: 26px;
        font-weight: 800;
    }
    
`

const CartItem = ({item,checkedItemHandler,allChecked}) =>{

    const [bChecked, setChecked] = useState(true);
    const [count, setCount] = useState(1);
    const [price, setPrice] = useState(item.price);


    const onCheckedBox =() => {
        setChecked(!bChecked);

    }
    const onClickCnt = (e) => {
        let currentCnt = count;
        let value = e.target.innerText;

        if(value === "+") {
            currentCnt++
        }
        else {
            if(currentCnt < 2) return;
            currentCnt--;
        }
        setCount(currentCnt);
        setPrice(currentCnt * item.price);

    }

    const setItem =()=>{
        item.cnt = count;
        item.bChecked = bChecked;
        checkedItemHandler();
    }

    //수량 초기화
    useEffect(()=>{
        setItem();
    },[count,bChecked]);

    useEffect(() =>{
        setChecked(allChecked)
    },[allChecked]);

    return(
        <StyledItem>
            <div className="check-box">
                <input type="checkbox" checked={bChecked} onChange={onCheckedBox}/>
            </div>
            <div className="prod-info">
                <div>
                    <img src={item.detail_image_url}/>
                    <div className='prod-info-detail'>
                        <div id='item-name'>{item.item_name}</div>
                        <div id='item-coupon'>{item.availableCoupon === false ? "[할인 제외 상품]":""}</div>
                        <div id='item-price' >{item.price.toLocaleString()}원</div>
                    </div>
                </div>
            </div>

            <div className="prod-cnt">
                <div>
                    <button onClick = {onClickCnt} >-</button>
                    <input type="text" value={count}/>
                    <button onClick = {onClickCnt} >+</button>
                </div>
            </div>

            <div className="price">
                <div>
                    <span>{price.toLocaleString()}원</span>
                </div>
            </div>

        </StyledItem>
    )
};
export default CartItem;