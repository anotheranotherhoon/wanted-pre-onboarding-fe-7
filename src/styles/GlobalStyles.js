import { createGlobalStyle } from 'styled-components';
import { reset } from './css';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    color: rgb(51, 51, 51);
  }
  
  body {
  }
`;
