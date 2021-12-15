import React, { useState, useEffect, useCallback } from "react";
import styled from 'styled-components'


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
  
  & > div > button {
     max-width: 300px;
  }
  
  & > div > .couponInfo {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  & > div > .itemInfo {
    position: relative;
  }
  
  .itemInfo > * {
     display: flex;
     margin-bottom: 5px;
  }
  
  .itemInfo > img {
     margin-bottom: 10px;
     width: 300px;
     height: 300px;
  }
  
  #item_name {
    min-height: 40px;
  }
  
`


//가격/사진/상품 제목
const ItemListComponent = (props) => {
    return (
        props && props.itemList ? <ItemList className="items component">
            {
                props.itemList.map((item, idx) => {
                    return (
                        <div id={"item_" + idx}>
                            <div className="itemInfo">
                                <img src={item.detail_image_url}/>
                                <div id ="item_name">
                                    <span>{item.item_name}</span>
                                </div>
                                <div id="price">
                                    <span id="price">{item.price}</span>
                                </div>
                                <div id="score">
                                    <div>하트</div>
                                    <span>{item.score}</span>
                                </div>
                            </div>

                            <div className="couponInfo">
                                <span>{item.availableCoupon !==false ? "쿠폰 사용 가능" :""}</span>
                            </div>

                            <button onClick={}>{item.price > 100500 ? "장바구니 담기" : "장바구니 빼기"}</button>
                        </div>
                    )
                })
            }
        </ItemList> : <div>no data</div>
    )
};
export default ItemListComponent