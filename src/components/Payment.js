import React, { useState, useEffect, useCallback,useMemo } from "react";
import Styled from "styled-components"

import DataManager from "../managers/DataManager"
import * as Strings from "../resources/Strings"

const COUPON_TYPE = {
    AMOUNT : "amount",
    RATE : "rate",
    NONE: "none"
}

const StyledPayment = Styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    
    box-sizing: border-box;
    display: table;
    
    & > div {
        display: table-cell;
        width: 25%;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
    }
    & > div  span {
        font-size: 22px;
        font-weight: 700;
    } 
    
    #discountPrice span {
        color: rgb(255,72,0);
    }
    
    #paymentPrice span {
        color: blue;
    }

`

const PaymentDesc = ()=>{
    return (
        <StyledPayment>
            <div>
                <span>{Strings.TEXT_TOTAL_PRICE}</span>
            </div>
            <div>
                <span>{Strings.TEXT_SELECT_COUPON}</span>
            </div>
            <div>
                <span>{Strings.TEXT_DISCOUNT_PRICE}</span>
                <div>
                </div>
            </div>
            <div>
                <span>{Strings.TEXT_PAYMENT_PRICE}</span>
            </div>
        </StyledPayment>
    )
};


const CouponSelectBox = ({isAvailableCoupon,changedCouponHandler}) => {

    const [couponElm,setCouponElm] = useState([]);
    const [coupons,setCoupons] = useState([]);
    useEffect(()=> {
        let coupons = DataManager.getCoupons();
        setCouponElm(coupons.map((coupon)=>{
            return <option value={coupon.type}>{coupon.title}</option>
        }));

        setCoupons(coupons);
    },[]);

    const onChangeCoupon=(e)=>{
         let selectedCoupon = coupons.filter((coupon)=>{
             return coupon.type === e.target.value
         });

        changedCouponHandler(selectedCoupon[0]);

    }

    return (
        <div>
            <select onChange = {onChangeCoupon}>
                <option value="none">{Strings.TEXT_SELECT_COUPON}</option>
                {
                    (isAvailableCoupon && couponElm.length > 0 )?
                        couponElm
                        : ""
                }
            </select>
        </div>

    )
}

const PriceBox = ({id, price}) => {
    return (
        <div id={id}>
            <span>{price > 0 ? price.toLocaleString() : 0}???</span>
        </div>
    )
}

const PaymentDetail = ({products}) => {

    //?????? ?????? ??????
    const [currentCoupon, setCurrentCoupon] = useState(null);
    const totalPrice = useMemo(() => {
        console.log("calculateTotalPrice");
        let totalPrice = 0;

        products.forEach((product)=>{
            totalPrice += (product.price * product.cnt)
        });

        return totalPrice

    },[products]);


    const isAvailableCoupon = useMemo(() =>{
        console.log("isAvailableCoupon");
        let validProduct = products.filter(product=> product.availableCoupon !== false);
        let result = false;
        if(validProduct.length > 0) {
            result = true;
        }
        if(!result) {
            setCurrentCoupon(null);
        }
        return result;
    },[products]);


    const discountPrice = useMemo(() => {
        console.log("calculateDiscountPrice");
        let amount = 0;
        if(isAvailableCoupon && currentCoupon && currentCoupon.type !== COUPON_TYPE.NONE) {
            //?????? ?????? ??????
            const targetProduct = products.filter(product=> product.availableCoupon !== false);

            switch (currentCoupon.type){
                case COUPON_TYPE.AMOUNT:
                    amount = currentCoupon.discountAmount;
                    break;
                case COUPON_TYPE.RATE:
                    let sum = 0;

                    targetProduct.forEach((product)=>{
                        sum += (product.price * product.cnt);
                    });
                    amount = sum/currentCoupon.discountRate;

                    break;
                default:
                    break;
            }
        }

        return Math.floor(amount);
    },[products,currentCoupon]);

    const paymentPrice = useMemo(()=>{
        console.log("paymentPrice");return totalPrice - discountPrice},[totalPrice,discountPrice]);


    const onChangeCoupon = useCallback((c)=>{
        console.log("onChangeCoupon");
        setCurrentCoupon(c);
    },[]);
    return (
        <StyledPayment>
            <PriceBox price = {totalPrice}/>
            <CouponSelectBox
                isAvailableCoupon={isAvailableCoupon}
                changedCouponHandler={onChangeCoupon}/>
            <PriceBox id ="discountPrice" price ={discountPrice}/>
            <PriceBox id ="paymentPrice" price ={paymentPrice}/>
        </StyledPayment>
    )

}


const Payment = ({products,cart}) => {

    return(
        <div>
            <PaymentDesc/>
            <PaymentDetail products= {products}/>
        </div>

    )
};

export default Payment;