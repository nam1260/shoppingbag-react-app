import "../App.css"
import React from 'react';
import { useHistory } from 'react-router';
import {useSelector} from "react-redux"
import Styled from "styled-components"
import * as Strings from "../resources/Strings"

const MyCart = Styled.div`

   & > #shoppingCart-count {
     position: absolute;
    left: 14px;
    top: 14px;
    color: red;
    font-size: 14px;
   }
`

/**
 * 컴포넌트 헤더
 * @returns {*}
 * @constructor
 */
function Header() {
    const history = useHistory();
    const cart = useSelector(store=> store.cartReducer);
    return (
        <header>
            <section>
                <div>
                    <img id='logo'  onClick={() => history.push('/')}/>
                </div>
            </section>

            <section>
                <div className="quickMenu">
                    <div onClick={()=>{history.push('/products')}}>
                    <span>{Strings.TEXT_PRODUCT_LIST}</span>
                    </div>

                    <MyCart>
                        <span id='shoppingCart-count'>{cart.length}</span>
                        <img id="shoppingCart" onClick={(e)=>{history.push('/cart')}} />
                    </MyCart>
                </div>
            </section>

        </header>
    )
}


export default Header

