
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from 'react-router';
import DataManager from "../../managers/DataManager"
import ItemListComponent from "./component/ItemList"
import Paginator from "./component/Paginator"
import styled from 'styled-components'
import "./Product.css"

const ITEMS_PER_PAGE = 5;


const Products = () => {
    const history = useHistory();
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = ITEMS_PER_PAGE;
    const items = DataManager.getProductItemList();

    useEffect(()=>{
        console.log("최초 랜더링 시에만 호출");
    },[]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));

    }, [itemOffset, itemsPerPage]);


    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };


    return (
        <div className="layout">
            <section className="container">
                <ItemListComponent itemList={currentItems}/>
            </section>
            <section className="container">
                <Paginator pageCount = {pageCount} onPageChange ={handlePageClick}/>
            </section>
            <button onClick={()=>{history.push('/cart')}}></button>
        </div>
    )
}

export default Products;