
import React, {useState} from "react";
import Pagination from "react-js-pagination";



const Paginator = ({page,count,setPage}) => {



    return (
        <div>
            <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={15}
                pageRangeDisplayed={5}
                onChange={setPage}
            />
        </div>
    )
}

export default Paginator;