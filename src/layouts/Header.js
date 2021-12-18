import React from 'react';
import { useHistory } from 'react-router';
import {useSelector} from "react-redux"
import "./Header.css"

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
                    <div onClick={()=>{history.push('/product')}}>
                    <span>상품 목록</span>
                    </div>

                    <div>
                        <span id='shoppingCart-count'>{cart.length}</span>
                        <img id="shoppingCart" onClick={(e)=>{history.push('/cart')}} />
                    </div>
                </div>
            </section>

        </header>
    )
}


export default Header

