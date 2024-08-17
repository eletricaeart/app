

import styled from "styled-components/native";


export const Homepage = styled.View`

`;

export const Tiles = styled.View`
   /* background: #FFF; */
   width: 100%;
   padding: 16px;
   flex-direction: row;
   align-items: flex-start;
   justify-content: space-between;
   flex-wrap: wrap;
   gap: 16px;
   /* background: #fafafa; */
`;

export const Tile = styled.View`
   background: #FFF;
   border-radius: 13px;
   box-shadow: #7777 2px 5px 15px;
   padding: 8px;
   /* flex-basis: calc( 50% - 8px ); */
   flex-basis: 45%;
   aspect-ratio: 1 !important;
   elevation: 10;
`;