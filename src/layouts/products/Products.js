
import React, { useEffect } from "react";
import DataManager from "../../managers/DataManager"

//가격/사진/상품 제목
const ItemList = (props) => {
    return (
        <div className="items">
            {
                props.itemList.map((item, idx) => {
                    return (
                        <div id={"item_" + idx}>
                            <span id="item_no">{item.item_no}</span>
                            <span id="item_name">{item.item_name}</span>
                            <span id="price">{item.price}</span>
                            <span id="score">{item.score}</span>
                            <img src={item.detail_image_url}/>
                            <button >{item.price > 100500 ? "장바구니 담기" : "장바구니 빼기"}</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

const Products = () => {

    //TODO useEffect로 item 받아서 그리도록 처리
  //  let ProductItems = DataManager.getProductItemList();

    useEffect(()=>{
      //  ProductItems = productItems;
    },[]);

    return (
        <selction>
            <ItemList itemList= {DataManager.getProductItemList()}/>
        </selction>
    )
}

export default Products;