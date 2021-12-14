import React, { useState, useEffect } from "react";

//가격/사진/상품 제목
const ItemList = (props) => {
    return (
        props && props.itemList ? <div className="items">
            {
                props.itemList.map((item, idx) => {
                    return (
                        <div id={"item_" + idx}>
                            <img src={item.detail_image_url}/>
                            <span id="item_no">{item.item_no}</span>
                            <span id="item_name">{item.item_name}</span>
                            <span id="price">{item.price}</span>
                            <span id="score">{item.score}</span>
                            <button >{item.price > 100500 ? "장바구니 담기" : "장바구니 빼기"}</button>
                        </div>
                    )
                })
            }
        </div> : <div>no data</div>
    )
};
export default ItemList