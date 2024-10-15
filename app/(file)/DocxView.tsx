

import React, { useEffect, useRef, useState } from "react";
import { printToFileAsync, printAsync } from "expo-print";
import { shareAsync, } from "expo-sharing";
import { EACard } from "@/src/widgets/clb-ea";
import { AppbarStick, BackButton, H1, H3, H4, H5, H6, P } from "@/src/widgets/ui";
import { ScrollView, View, Button, Text, StyleSheet, Pressable } from "react-native";
import styled from "styled-components/native";
// import Budgets from "./budgets";
import { Brl2Float, CutRS, FixBrl, Float2Brl, Str2Brl } from "@/src/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import budgets from "../(drawer)/(tabs)/budgets";
import { router, Stack } from "expo-router";
import { AniButton } from "@/src/widgets/ui/animated";
import EADocxTemplate, { GenerateHTML } from "@/src/services/EADocxTemplate";


export default function DocxView() {
   const GeneratePDF = async () => {
      const 
         htmlData = GenerateHTML( 
         )
         ,
         file = await printToFileAsync({
         // file = await printAsync({
            // html: htmlData,
            html: GenerateHTML, 
            // base64: false,
            // margins: { 
            //    top: 16,
            //    right: 16,
            //    bottom: 16,
            //    left: 16,
            // },
            
         });
      ;
      
      await shareAsync( file.uri );
   };



   useEffect( () => {
      async function LoadBudgetIntoView() {
      }
      LoadBudgetIntoView();
      
   }, [] );

   return( <>
      <Stack.Screen options={{ headerShown: true, title: "Orçamento", statusBarColor: "#19497b",
         header: ({}) => ( <>
            <AppbarStick>
               <BackButton />
            </AppbarStick>
         </> )
      }} />

      <View style={[ s.root ]}>
         <ScrollView>
            <EACard />

            <BottomView>
               <Center>
                  <OBS>
                     <Text>{ /* Budget.notes */ }</Text>
                  </OBS>
               </Center>
               <Signatures>
                  <Signature>
                     <Sig>
                        Rafael - Elétrica & ART
                     </Sig>
                  </Signature>
                  <Signature>
                     <Sig>
                        Cliente
                     </Sig>
                  </Signature>
               </Signatures>
            </BottomView>
         </ScrollView>
      </View>
      
      {/* page-footer */}
      <View
         style={{
            // position: "absolute", bottom: 0, left: 0,
            borderTopColor: "#ddd", borderTopWidth: 1,
            width: "100%",
            backgroundColor: "#f5f5f5", height: 80,
            alignItems: "center", justifyContent: "center",
            zIndex: 9,
         }}
      >
         <AniButton title="baixar em pdf"
            animation="bounceIn"
            w="80%"
            bg="#00559C"
            onPress={ () => {
               GeneratePDF();
            } }
         />
      </View>
   </>);
};

const 
   s = StyleSheet.create( {
      root: {
         flex: 1,
      },
      topFlag: {
         backgroundColor: "#19497b",
         padding: 4,
         alignItems: "center"
      },
      topFlagTT: {
         color: "#fff",
         textAlign: "center"
      },
      row: {
         backgroundColor: "#19497b77",
         flexDirection: "row",
         alignItems: "center",
         paddingTop: 4,
         paddingBottom: 4,
      }
      ,
      rowTitle: {
         color: "#19497b",
         textAlign: "center",
         flexBasis: "33%",
      }
      ,
      rowText: {
         color: "#333",
         fontSize: 10,
         textAlign: "center",
         flexBasis: "33%",
      }
      ,
      bRow: {
         backgroundColor: "#0000",
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-around",
         padding: 4,
         borderColor: "#e5e5e5", borderTopWidth: .5,
      }
      ,
      rowInput: {
         backgroundColor: "#f5f5f5",
         flexDirection: "row",
         alignItems: "center",
         // justifyContent: "center",
      }
      ,
      TT: {
         color: "#19497b"
      }
      ,
      TTbRow: {
         color: "#333",
         paddingLeft: 8,
         paddingRight: 8,
      }
      ,
      tt: {
         color: "#333",
         fontSize: 11
      },
      ttt: { 
         textAlign: "left" 
      },
      customerInput: {
         flexDirection: "row",
         padding: 2,
      },
      customerInputTT: {
         textTransform: "uppercase"
      },
      customerOutput: {
         
      },
   } )
;

const 
   TrCustomer = styled.View`
      flex-direction: row;
   `,
   Th = styled.View`
      padding: 4px;
      background: #0001;
   `,
   Td = styled.View`
      padding: 4px 0 4px 4px;
   `,
   TTitle = styled.Text`
      font-size: 11px;
      text-transform: uppercase;
      font-weight: bold;
      color: #333;
      `,
   TText = styled.Text`
      font-size: 11px;
      color: #555;
   `,
   PpView = styled.View`
      border-right-color: #ebee;
      border-right-width: .5px;
      border-right-style: dashed;
      /* background: #27f; */
      flex: 0 1 20%;
      padding: 4px;
      align-items: center;
      justify-content: center;
   `,
   PpView2 = styled.View`
      border-right-color: #ebee;
      border-right-width: .5px;
      border-right-style: dashed;
      /* background: #27f; */
      flex: 0 1 100%;
      padding: 4px;
      align-items: center;
      justify-content: center;
   `,
   PpView3 = styled.View`
      border-right-color: #ebee;
      border-right-width: .5px;
      border-right-style: dashed;
      /* background: #27f; */
      flex: 0 1 20%;
      padding: 4px;
      align-items: center;
      justify-content: center;
   `,
   PpView4 = styled.View`
      /* background: #27f; */
      flex: 0 1 20%;
      padding: 4px;
      align-items: center;
      justify-content: center;
   `,
   Pp = styled.Text`
      font-size: 12px;
      color: #555;
   `,
   Ppr = styled.Text`
      font-size: 12px;
      color: #555;
   `,
   OBS = styled.View`
      background: #e5e5e5;
      border-radius: 13px;
      width: 90%;
      height: 10ch;
      padding: 16px;
      border: #7775 2px solid;
   `,
   Center = styled.View`
      align-items: center;
      justify-content: center;
      padding: 0px 0px 24px 0;
      border-bottom-left-radius: 24px;
      border-bottom-right-radius: 24px;
      background: #fff;
   `,
   BottomView = styled.View`
      background: #e5e5e5;
      flex: 1;
      width: 100%;
      height: 100%;
   `,
   Signatures = styled.View`
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      padding: 36px 0 48px 0;
   `,
   Signature = styled.View`
      border-top-color: #000;
      border-top-width: 1px;
      border-top-style: solid;
      width: 40%;
   `,
   Sig = styled.Text`
      text-align: center;
   `
;