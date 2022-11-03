import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";

const GlobalStyles = createGlobalStyle`
 
    *{
        box-sizing: border-box;
        padding: 0;
        margin:0;
        font-family: SUIT Variable, sans-serif;
    }

    body {
        transition: background 0.3s;
        background: ${({ theme }: { theme: Theme }) => theme.bg};
        color: ${({ theme }: { theme: Theme }) => theme.text};
    }

    a{
        text-decoration:none;
        color:inherit;
    }

`;

export default GlobalStyles;
