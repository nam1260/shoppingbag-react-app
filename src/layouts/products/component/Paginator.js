
import React, {useState} from "react";
import ReactPagenate from 'react-paginate'
import "./Paginator.css";



//TODO style 재정의 필요
const Paginator = ({pageCount,onPageChange}) => {

    return (
        <div>
            <ReactPagenate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={onPageChange}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    )
}

export default Paginator;