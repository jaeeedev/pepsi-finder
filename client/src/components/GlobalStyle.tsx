import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
 
    *{
        box-sizing: border-box;
        padding: 0;
        margin:0;
        
        font-family: SUIT Variable, sans-serif;
    }

    body {
        background: #222;
        color: white;
    }

    a{
        text-decoration:none;
        color:inherit;
    }

`;

export default GlobalStyles;
