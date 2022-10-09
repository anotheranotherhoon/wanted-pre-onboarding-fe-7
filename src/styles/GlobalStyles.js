import { createGlobalStyle } from 'styled-components';
import { reset } from './css';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
  }
  :root{
    --color-blue :#0050FF;
    --color-yellow:#FEDD89;
    --color-mauve: #dee3f9;
    --color-orange: #FF6C02;
    --color-black : #000000;
    --color-white :#ffffff;
    
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    color: rgb(51, 51, 51);
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
