
import React from "react";
import Styled from "styled-components"


const Title = Styled.div`
        
    width: 100%;
    height: 30px;
    margin-top: 20px;
    border-bottom: 3px solid black;
    text-align: left;
    & > span {
        font-size: 25px;
        font-weight: 700;
    }

`

const MenuTitle = ({text})=> {
    return (
        <Title>
            <span>{text}</span>
        </Title>
    )
}; export default MenuTitle