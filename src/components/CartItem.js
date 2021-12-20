import React, { useState, useEffect, useCallback } from "react";
import Styled from "styled-components"
import * as Strings from "../resources/Strings";


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
    
     .prod-info-detail #item-delete {
    
         padding: 0.375rem 0.75rem;
         border-radius: 0.25rem;
         font-size: 12px;
         font-weight: 600;
         border: 1px solid grey;
         box-sizing: border-box
         color: black;
         background: white;
         
           &:hover {
            color: white;
            background: black;
            cursor: pointer
            }
     }
    
    .price span {
    
        font-size: 26px;
        font-weight: 800;
    }
    
    
    
    
`

const CheckBox = ({bChecked, onCheckedBox}) => {
    return (
        <div className="check-box">
            <input type="checkbox" checked={bChecked} onChange={onCheckedBox}/>
        </div>
    )
}

const ProductInfo = ({item,deleteItem}) => {
    return (
        <div className="prod-info">
            <div>
                <img src={item.detail_image_url}/>
                <div className='prod-info-detail'>
                    <div id='item-name'>{item.item_name}</div>
                    <div id='item-coupon'>{item.availableCoupon === false ? Strings.TEXT_NO_DISCOUNT:""}</div>
                    <div id='item-price' >{item.price ? item.price.toLocaleString() : 0}원</div>
                    <button id='item-delete' onClick={()=>{deleteItem(item)}}>
                        {Strings.TEXT_DELETE}
                    </button>
                </div>
            </div>
        </div>
    )
};

const ProductCnt = ({onClick, value}) => {
    return (
        <div className="prod-cnt">
            <div>
                <button onClick={onClick}>-</button>
                <input type="text" value={value}/>
                <button onClick={onClick}>+</button>
            </div>
        </div>
    )
}

const Price = ({price}) => {
    return (
        <div className="price">
            <div>
                <span>{price.toLocaleString()}원</span>
            </div>
        </div>
    )
}


const CartItem = ({item,checkedItemHandler,allChecked,deleteItem}) =>{
    const [bChecked, setChecked] = useState(true);
    const [count, setCount] = useState(1);
    const [price, setPrice] = useState(item.price);

    const onCheckedBox =() => {
        setChecked(!bChecked);

    }
    const onClickCnt = useCallback((e) => {
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

    },[count,item.price]);

    const setItem = useCallback(()=>{
         item.cnt = count;
         item.bChecked = bChecked;
        checkedItemHandler();
    },[count,bChecked]);

    //목록 삭제 후 재생성 되는 경우 itemCnt 초기화
    useEffect(()=>{
        let currentItemCnt = item.cnt || 1;
        setCount(currentItemCnt);
        setPrice(currentItemCnt * item.price);
        setChecked(item.bChecked);
    },[item]);

    useEffect(()=>{
        setItem();
    },[count,bChecked]);

    useEffect(() =>{
        setChecked(allChecked)
    },[allChecked]);

    useEffect(() =>{
        setCount(count);
        setPrice(price);
    },[]);

    return(
        <StyledItem>
            <CheckBox bChecked={bChecked} onCheckedBox={onCheckedBox}/>
            <ProductInfo item={item} deleteItem={deleteItem}/>
            <ProductCnt onClick={onClickCnt} value={count}/>
            <Price price={price}/>
        </StyledItem>
    )
};
export default CartItem;