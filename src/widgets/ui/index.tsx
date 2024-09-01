

import styled from "styled-components/native";


export const 
   // texts == == == 
   TT= styled.Text`
      margin: 0;
      padding: 0;
      font-size: 32;
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
   H1 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 32;
      font-weight: bold;
      color: #333;
   `
   ,
   H2 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 24;
      font-weight: bold;
      color: #333;
   `
   ,
   H3 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 20px;
      font-weight: bold;
      color: #333;
   `
   ,
   H4 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 18;
      font-weight: bold;
      color: #333;
   `
   ,
   H5 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 14;
      font-weight: bold;
      color: #333;
   `
   ,
   H6 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 12;
      font-weight: bold;
      color: #333;
   `
   ,
   P = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-weight: 500;
   `
   ,
   T = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-weight: 500;
   `
   ,
   PP = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 12;
      font-weight: bold;
      color: #333;
   `
   ,

   // Views == == == 
   Homepage = styled.View`
      flex: 1;
      width: 100%;
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
   Section = styled.View``
   ,
   Content = styled.View`
      width: 100%;
      padding: 16px;
   `
   ,
   Center = styled.View`
      align-items: center;
      justify-content: center;
   `
   ,
   Centered = styled.View`
      align-items: center;
      justify-content: center;
      text-align: center;
   `
   ,
   Duo = styled.View`
      flex-direction: "row";
      gap: 8;
   `
   ,
   BackSheet = styled.View`
      background-color: #959595;
      border-top-right-radius: 24;
      border-top-left-radius: 24;
      width: 90%;
      height: 15;
      margin-top: 10;
      align-self: center;
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
      border-radius: 22px;
      box-shadow: #7777 2px 5px 15px;
      padding: 16px;
      flex: 0 0 47.5%;
      aspect-ratio: 1 / .8 !important;
      elevation: 15;
      box-shadow: #0009 2px 3px 15px;
      /* shadow-offset: { width: 2, height: 5 };
      shadow-opacity: .5;
      shadow-radius: 15;
      shadow-color: "#0009"; */
      
   `
   ,
   Card = styled.View`
      border-radius: 24px;
      overflow: hidden;
   `
   ,
   Fmenu = styled.View`
      /* background: #fff; */
      background: #e5e5e5;
      position: absolute;
      top: 0;
      right: 5px;
      z-index: 9;
      min-width: 100px;
      padding: 16px;
      gap: 13px;
      border-radius: 9px;
      align-items: center;
      elevation: 5;
      box-shadow: #000 2px 1px 5px;
   `,


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
   ,


   // Form == == == 
   Label = styled.View`
      padding: 8px 16px 8px 16px;
      gap: 6px;
   `
   ,
   LabelText = styled.Text`
      font-size: 16px;
      color: #212329;
      font-weight: bold;
      padding-left: 6px;
   `
   ,
   Input = styled.TextInput`
      border-radius: 13px;
      background: #f5f5f5;
      border-color: #7777;
      border-width: 1px;
      padding: 8px 14px;
      color: #000;
   `
   ,
   Btn = styled.View`
      align-items: center;
      justify-content: center;
      text-align: center;
      /* border-radius: 13px; */
      /* border-radius: 9px; */
      border-radius: 13px;
      background: #becfea;
      border-color: #7777;
      border-width: 1px;
      /* padding: 8px 14px; */
      padding: 14px;
      color: #0075BD;
      elevation: 3;
   `
   ,
   BtnTxt = styled.Text`
      /* font-size: 20px; */
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      color: #0075BD;
   `,


   // Buttons
   BackBtn = styled.Pressable`
      position: absolute;
      top: 0;
      left: 0;
      background: #fff0;
      height: 46px;
      width: 46px;
      align-items: center;
      justify-content: center;
      z-index: 3;
   `,
   BackBtnTxt = styled.Text`
      text-transform: uppercase;
      font-weight: bold;
      font-size: 28px;
      color: #fff;
   `
   
;