import '../App.css';
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from 'react-router';
import DataManager from "../managers/DataManager"
import ItemListComponent from "../components/ItemList"
import Paginator from "../components/Paginator"
import styled from 'styled-components'

const ITEMS_PER_PAGE = 5;

/**
 * 상품 관리 페이지
 * @returns {*}
 * @constructor
 */
const Products = () => {
    const [productList, setProductList] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = ITEMS_PER_PAGE;

    useEffect(()=>{
        setProductList(DataManager.getProductItemList().sort((a,b)=>{return b.score-a.score}));
    },[]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentProducts(productList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(productList.length / itemsPerPage));
    }, [itemOffset,productList]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % productList.length;
        setItemOffset(newOffset);
    };


    return (
        <div className="layout">
            <section className="container">
                <ItemListComponent itemList={currentProducts}/>
            </section>
            <section className="container">
                <Paginator pageCount = {pageCount} onPageChange ={handlePageClick}/>
            </section>
        </div>
    )
}

export default Products;