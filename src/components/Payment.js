import React, { useState, useEffect, useCallback } from "react";
import Styled from "styled-components"

import DataManager from "../managers/DataManager"

const StyledPayment = Styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    
    box-sizing: border-box;
    display: table;
    
    & > div {
        display: table-cell;
        width: 35%;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        
    }
    & > div > span {
        font-size: 22px;
        font-weight: 700;
    } 

`

const PaymentTitle = ()=>{
    return (
        <StyledPayment>
            <div>
                <span>총 주문금액</span>
            </div>
            <div>
                <span>총 할인금액</span>
                <div>
                </div>
            </div>
            <div>
                <span>총 결제금액</span>
            </div>
        </StyledPayment>
    )
};

const getCoupons = () => {
    return (
        <select>

        </select>
    )

}

const PaymentDetail = ({products}) => {

    //결제 필요 금액
    const [totalPrice,setTotalPrice] = useState(0);
    const [coupons,setCoupon] = useState([])
    const calculateTotalPrice = () => {

        let totalPrice = 0;
        for (let i = 0; i < products.length; i++) {
            totalPrice += products[i].price * products[i].cnt;
        }
        setTotalPrice(totalPrice);
    }


    useEffect(()=> {
        setCoupon(DataManager.getCoupons());
    },[]);

    useEffect(() => {
        calculateTotalPrice();
    },[products]);

    return (
        <StyledPayment>
          <div>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
            <div>
                    c
            </div>

        </StyledPayment>
    )

}


const Payment = ({products}) => {

    return(
        <div>
            <PaymentTitle/>
            <PaymentDetail products= {products}/>
        </div>

    )
};

export default Payment;