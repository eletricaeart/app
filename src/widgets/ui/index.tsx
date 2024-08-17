

import styled from "styled-components/native";


export const 
   // texts == == == 
   TT= styled.Text`
      font-size: 24px;
      font-weight: bold;
   `
   ,
   T1 = styled.Text`
      font-size: 24px;
      font-weight: bold;
   `
   ,
   T2 = styled.Text`
      font-size: 20px;
      font-weight: bold;
   `
   ,
   P = styled.Text`
      font-size: 16px;
      font-weight: 500;
   `
   ,
   T = styled.Text`
      font-size: 16px;
      font-weight: 500;
   `
   ,

   // Views == == == 
   Homepage = styled.View`

   `
   ,
   Header = styled.View`
      width: 100%;
      background: #fafafa00;
      padding: 32px 16px;
   `
   ,
   HeaderBanner = styled.View`
      width: 100%;
      /* background-color: #00559C; */
      aspect-ratio: 16 / 6;
      /* border-bottom-left-radius: 100px; */
      /* border-bottom-right-radius: 10dvh; */
   `
   ,
   Tiles = styled.View`
      /* background: #FFF; */
      width: 100%;
      padding: 16px;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      /* background: #fafafa; */
   `
   ,
   Tile = styled.View`
      background: #FFF;
      border-radius: 13px;
      box-shadow: #7777 2px 5px 15px;
      padding: 8px;
      flex: 0 0 47.5%;
      aspect-ratio: 1 !important;
      elevation: 10;
   `
   ,


   // Separator == == == 
   VSplit = styled.View`
      background: #FFF0;
      background: #9995;
      margin: 24px auto;
      padding: .5px;
      width: 90%;
   `
   ,
   HSplit = styled.View`
      background: #FFF0;
      background: #9995;
      margin: 24px auto;
      padding: .5px;
      width: 90%;
   `
;