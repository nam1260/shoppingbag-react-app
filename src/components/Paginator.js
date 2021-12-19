
import React from "react";
import ReactPaginate from 'react-paginate'
import Styled from "styled-components"


const StyledPaginator = Styled.div`

.pagination > li {
    display: inline-block;
    padding-left: 0;
}
.pagination > li {
    list-style: none;
}
.pagination > li > a,
.pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    line-height: 1.42857143;
    text-decoration: none;
    color: #000000;

}

.pagination>li.active>a {
    color: #000000;
    font-size: 1.5rem;
    font-weight: 600;
}

/* Style the active class (and buttons on mouse-over) */
.pagination > li > a:hover {
    background-color:  #000000;
    color: white;
}
.pagination > li:first-child > a,
.pagination > li:first-child > span {
    margin-left: 0;
    padding: 0px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    display: none!important;
}
.pagination > li:last-child > a,
.pagination > li:last-child > span {
    border-bottom-right-radius: 4px;
    margin-right: 0;
    padding: 0px!important;
    border-top-right-radius: 4px;
    display: none!important;
}

`



//TODO style 재정의 필요
const Paginator = ({pageCount,onPageChange}) => {

    return (
        <StyledPaginator>
            <ReactPaginate
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
        </StyledPaginator>
    )
}

export default Paginator;