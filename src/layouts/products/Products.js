
import React, { useState, useEffect, useCallback } from "react";
import DataManager from "../../managers/DataManager"
import ItemList from "./component/ItemList"
import Paginator from "./component/Paginator"

const ITEMS_PER_PAGE = 5;

const Products = () => {

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = ITEMS_PER_PAGE;
    const items = DataManager.getProductItemList();

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
        <div>
            <section>
                <ItemList itemList={currentItems}/>
            </section>
            <selction>
                <Paginator pageCount = {pageCount} onPageChange ={handlePageClick}/>
            </selction>
        </div>
    )
}

export default Products;