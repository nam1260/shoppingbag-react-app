import React, { useState, useEffect, useCallback } from "react";
import Styled from "styled-components"

import DataManager from "../managers/DataManager"


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

const PaymentTitle = ()=>{
    return (
        <StyledPayment>
            <div>
                <span>총 주문금액</span>
            </div>
            <div>
                <span>쿠폰 선택</span>
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
         })

        changedCouponHandler(selectedCoupon[0]);

    }

    return (
        <div>
            <select onChange = {onChangeCoupon}>
                <option value="none">====쿠폰 선택====</option>
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
            <span>{price > 0 ? price.toLocaleString() : 0}원</span>
        </div>
    )
}

const PaymentDetail = ({products}) => {

    //결제 필요 금액
    const [totalPrice,setTotalPrice] = useState(0);
    const [isAvailableCoupon, setIsAvailableCoupon] = useState(false);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [paymentPrice, setPaymentPrice] = useState(0);
    const [currentCoupon, setCurrentCoupon] = useState(null);

    const calculateTotalPrice = () => {

        let totalPrice = 0;

        products.forEach((product)=>{
            totalPrice += (product.price * product.cnt)
        });

        setTotalPrice(totalPrice);
    }

    const calculateDiscountPrice = (selectedCoupon) => {
        let amount = 0;
        if(isAvailableCoupon && selectedCoupon && selectedCoupon.type !== COUPON_TYPE.NONE) {
            //쿠폰 할인 적용
            const targetProduct = products.filter(product=> product.availableCoupon !== false);

            switch (selectedCoupon.type){
                case COUPON_TYPE.AMOUNT:
                    amount = selectedCoupon.discountAmount;
                    break;
                case COUPON_TYPE.RATE:
                    let sum = 0;

                    targetProduct.forEach((product)=>{
                        sum += (product.price * product.cnt);
                    });
                    amount = sum/selectedCoupon.discountRate;

                    break;
                default:
                    break;
            }
        }else {
            selectedCoupon = null;
        }
        setCurrentCoupon(selectedCoupon);
        setDiscountPrice(Math.floor(amount))
    }

    const checkCouponValidation = () =>{
        let validProduct = products.filter(product=> product.availableCoupon !== false);
        let result = false;
        if(validProduct.length > 0) {
            result = true;
        }
        setIsAvailableCoupon(result);
        if(!result) {
          setCurrentCoupon(null);
        }
    }

    const calculatePaymentPrice = () =>{
        setPaymentPrice(totalPrice - discountPrice);
    }

    useEffect(() => {
        calculateTotalPrice();
        checkCouponValidation();
    },[products]);

    useEffect(() => {
        calculateDiscountPrice(currentCoupon)
    },[products,currentCoupon]);

    useEffect(() =>{
        calculatePaymentPrice();
    },[totalPrice,discountPrice]);

    return (
        <StyledPayment>
            <PriceBox price = {totalPrice}/>
            <CouponSelectBox
                isAvailableCoupon={isAvailableCoupon}
                changedCouponHandler={calculateDiscountPrice}/>
            <PriceBox id ="discountPrice" price ={discountPrice}/>
            <PriceBox id ="paymentPrice" price ={paymentPrice}/>
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