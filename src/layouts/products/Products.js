
import React, { useState, useEffect, useCallback } from "react";
import DataManager from "../../managers/DataManager"
import ItemList from "./component/ItemList"
import Paginator from "./component/Paginator"

const Products = () => {

    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = itemList.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(()=>{
        const itemList = DataManager.getProductItemList();
        setItemList(itemList);
    },[]);


    return (
        <div>
            <section>
                <ItemList itemList={itemList}/>
            </section>
            <selction>
                {/*<Paginator page={currentPosts} count={itemList.length} setPage={setCurrentPage} />*/}

            </selction>
        </div>
    )
}

export default Products;