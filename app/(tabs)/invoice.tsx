

import { EACard } from "@/src/widgets/clb-ea";
import { H1, H3, H4, H5, H6, P } from "@/src/widgets/ui";
import React, { useRef, useState } from "react";
import { ScrollView, View, Button, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import Budgets from "./budgets";
import { Brl2Float, CutRS, FixBrl, Str2Brl } from "@/src/utils";
// import ViewShot from "react-native-view-shot";
// import PDF from "react-native-pdf";


interface budget {
   qtd: number; desc: string; unit: number; 
};

class BudgetModel {
   qtd: number;
   desc: string;
   unit: number;
   tot: number;

   constructor( budget: budget ) {
      this.qtd = budget.qtd;
      this.desc = budget.desc;
      this.unit = budget.unit;
      this.tot = this.qtd * this.unit;   
   }
}

export default function InvoiceView() {
   const 
      [ Budgets, setBudgets ] = useState( [] )
      ,
      budgets = []
   ;

   [
      { qtd: 1, desc: "Pintura", unit: 3800, },
      { qtd: 1, desc: "Elétrica", unit: 2000, },
      { qtd: 1, desc: "Forro de DryWall", unit: 600, },
      { qtd: 1, desc: "Divisória", unit: 500, },
      { qtd: 3, desc: "Pintura", unit: 1200, },
   ].forEach( item => {
      const data = new BudgetModel( { qtd: item.qtd, desc: item.desc, unit: item.unit } );
      budgets.push( data );
   } );

   // setBudgets( budgets );
   return( <View style={[ s.root ]}>
      <ScrollView>
         <EACard></EACard>
         <View>
            <View style={[ s.row ]}>
               <H5 style={[ s.TT ]}>Orçamento</H5>
               <H5 style={[ s.TT ]}>Emissão</H5>
               <H5 style={[ s.TT ]}>Validade</H5>
            </View>
            <View style={[ s.row, { backgroundColor: "#f5f5f5", padding: 0 } ]}>
               <P style={[ s.tt ]}>Orçamento</P>
               <P style={[ s.tt ]}>Emissão</P>
               <P style={[ s.tt ]}>Validade</P>
            </View>
         </View>
            <View style={[ s.topFlag ]}>
               <H4 style={[ s.topFlagTT ]}>Cliente</H4>
            </View>
         <View>
            <TrCustomer>
               <TTitle style={{  }}>Nome</TTitle>
               <TText style={{ flex: 1, paddingLeft: 8, }}>Nome</TText>
            </TrCustomer>
            <TrCustomer style={[ { backgroundColor: "#e5e5e5bf" } ]}>
               <TTitle style={[  ]}>Telefone</TTitle>
               <View style={{ flex: 2, paddingLeft: 8, }}>
                  <TText>Telefone</TText>
               </View>
               <TTitle style={[  ]}>Email</TTitle>
               <View style={{ flex: 2, paddingLeft: 8, }}>
                  <TText style={[  { flex: 2 } ]}>Email</TText>
               </View>
            </TrCustomer>
            <TrCustomer>
               <TTitle style={[  ]}>CPF/CNPF</TTitle>
               <View style={{ flex: 2, paddingLeft: 8, }}>
                  <TText style={[  ]}>CPF</TText>
               </View>
               <TTitle style={[  ]}>RG/IE</TTitle>
               <View style={{ flex: 2, paddingLeft: 8, }}>
                  <TText style={[  ]}>RG</TText>
               </View>
            </TrCustomer>
            <TrCustomer style={[ { backgroundColor: "#e5e5e5bf" } ]}>
               <TTitle style={[  ]}>Endereço</TTitle>
               <View style={{ flex: 2, paddingLeft: 8, }}>
                  <TText style={[  ]}>Endereço</TText>
               </View>
               <TTitle style={{  }}>N°</TTitle>
               <View style={{ flex: .5, paddingLeft: 8, }}>
                  <TText style={{ paddingLeft: 2, }}>N</TText>
               </View>
               <TTitle style={{ paddingLeft: 8 }}>Cidade</TTitle>
               <View style={{ flex: 2, paddingLeft: 8, }}>
                  <TText style={[  ]}>Cidade</TText>
               </View>
            </TrCustomer>
            <TrCustomer>
               <TTitle style={[  ]}>Bairro</TTitle>
               <View style={{ flex: 2, paddingLeft: 8, }}>
                  <TText style={[  ]}>Bairro</TText>
               </View>
               <TTitle style={[  ]}>UF</TTitle>
               <View style={{ flex: .5, paddingLeft: 8, }}>
                  <TText style={[  ]}>UF</TText>
               </View>
               <TTitle style={[  ]}>CEP</TTitle>
               <View style={{ flex: 2, paddingLeft: 8, }}>
                  <TText style={[  ]}>CEP</TText>
               </View>
            </TrCustomer>
         </View>
            <View style={[ s.topFlag ]}>
               <H4 style={[ s.topFlagTT ]}>Orçamento</H4>
            </View>
         <View>
            <View style={[ s.rowInput, { backgroundColor: "#19497b77" } ]}>
               <PpView>
                  <H6>Qtd.</H6>
               </PpView>
               <PpView2>
                  <H6>Descrição</H6>
               </PpView2>
               <PpView3>
                  <H6>Unidade</H6>
               </PpView3>
               <PpView4>
                  <H6>Total</H6>
               </PpView4>
            </View>
            <View>
               {  budgets &&
                  budgets.map( ( item, position ) => {
                     if( position % 2 == 0 ) {
                        return(
                           <View style={[ s.rowInput ]}>
                              <PpView>
                                 <Pp >{ item.qtd }</Pp>
                              </PpView>
                              <PpView2>
                                 <Pp >{ item.desc }</Pp>
                              </PpView2>
                              <PpView3>
                                 <Ppr >{ CutRS( Str2Brl( item.unit.toString() ) ) }</Ppr>
                              </PpView3>
                              <PpView4>
                                 <Ppr >{ CutRS( Str2Brl( item.tot.toString() ) ) }</Ppr>
                              </PpView4>
                           </View>
                        );
                     } else {
                        return(
                           <View style={[ s.rowInput, { backgroundColor: "#e5e5e5bf" } ]}>
                              <PpView>
                                 <Pp >{ item.qtd }</Pp>
                              </PpView>
                              <PpView2>
                                 <Pp >{ item.desc }</Pp>
                              </PpView2>
                              <PpView3>
                                 <Ppr >{ CutRS( Str2Brl( item.unit.toString() ) ) }</Ppr>
                              </PpView3>
                              <PpView4>
                                 <Ppr >{ CutRS( Str2Brl( item.tot.toString() ) ) }</Ppr>
                              </PpView4>
                           </View>
                        );
                     }
                  } )
               }
            </View>
            <View>
               <View style={[ s.bRow, { backgroundColor: "#f5f5f5" } ]}>
                  <View style={[ s.bRow, {  } ]}>
                     <H5 style={[ s.TTbRow ]}>Subtotal</H5>
                     <Pp style={[ s.TT, { color: "#333" } ]}>Subtotal</Pp>
                  </View>
                  <View style={[ s.bRow, {  } ]}>
                     <H5 style={[ s.TTbRow ]}>Desconto</H5>
                     <Pp style={[ s.TT, { color: "#333" } ]}>Desconto</Pp>
                  </View>
                  <View style={[ s.bRow, {  } ]}>
                     <H5 style={[ s.TTbRow ]}>Valor Total</H5>
                     <Pp style={[ s.TT, { color: "#333" } ]}>Valor Total</Pp>
                  </View>
               </View>
            </View>
         </View>
            <View style={[ s.topFlag, { backgroundColor: "#fff" } ]}>
               <H4 style={[ s.topFlagTT, { color: "#00559C" } ]}>Observações</H4>
            </View>
         <BottomView>
            <Center>
               <OBS>
                  <Text>oi</Text>
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
   </View> );
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
         justifyContent: "space-around",
         padding: 4,
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
      padding: 4px;
   `,
   TTitle = styled.Text`
      font-size: 12px;
      text-transform: uppercase;
      font-weight: bold;
      color: #333;
   `,
   TText = styled.Text`
      font-size: 11px;
   `,
   PpView = styled.View`
      border-right-color: #ebee;
      border-right-width: 1px;
      border-right-style: dashed;
      /* background: #27f; */
      flex: 0 1 20%;
      padding: 4px;
      align-items: center;
      justify-content: center;
   `,
   PpView2 = styled.View`
      border-right-color: #ebee;
      border-right-width: 1px;
      border-right-style: dashed;
      /* background: #27f; */
      flex: 0 1 100%;
      padding: 4px;
      align-items: center;
      justify-content: center;
   `,
   PpView3 = styled.View`
      border-right-color: #ebee;
      border-right-width: 1px;
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
      padding: 36px 0 16px 0;
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