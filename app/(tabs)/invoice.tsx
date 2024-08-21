

import { EACard } from "@/src/widgets/clb-ea";
import { H1, H3, H4, H5, P } from "@/src/widgets/ui";
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
            <View style={[ s.row, { backgroundColor: "#f5f5f5" } ]}>
               <P style={[ s.tt ]}>Orçamento</P>
               <P style={[ s.tt ]}>Emissão</P>
               <P style={[ s.tt ]}>Validade</P>
            </View>
         </View>
            <View style={[ s.topFlag ]}>
               <H4 style={[ s.topFlagTT ]}>Cliente</H4>
            </View>
         <View>
            <View style={[ s.customerInput ]}>
               <H5 style={[ s.customerInputTT, { flex: 1 } ]}>Nome</H5>
               <P style={[ s.customerOutput, { flex: 5.3 } ]}>Nome</P>
            </View>
            <View style={[ s.customerInput, { backgroundColor: "#e5e5e5bf" } ]}>
               <H5 style={[ s.customerInputTT, { flex: 2 } ]}>Telefone</H5>
               <P style={[ s.customerOutput, { flex: 2 } ]}>Telefone</P>
               <H5 style={[ s.customerInputTT ]}>Email</H5>
               <P style={[ s.customerOutput, { flex: 2 } ]}>Email</P>
            </View>
            <View style={[ s.customerInput ]}>
               <H5 style={[ s.customerInputTT ]}>CPF/CNPF</H5>
               <P style={[ s.customerOutput ]}>CPF</P>
               <H5 style={[ s.customerInputTT ]}>RG/IE</H5>
               <P style={[ s.customerOutput ]}>RG</P>
            </View>
            <View style={[ s.customerInput, { backgroundColor: "#e5e5e5bf" } ]}>
               <H5 style={[ s.customerInputTT ]}>Endereço</H5>
               <P style={[ s.customerOutput ]}>Endereço</P>
               <H5 style={[ s.customerInputTT ]}>N°</H5>
               <P style={[ s.customerOutput ]}>N</P>
            </View>
            <View style={[ s.customerInput ]}>
               <H5 style={[ s.customerInputTT ]}>Cidade</H5>
               <P style={[ s.customerOutput ]}>Cidade</P>
               <H5 style={[ s.customerInputTT ]}>Bairro</H5>
               <P style={[ s.customerOutput ]}>Bairro</P>
               <H5 style={[ s.customerInputTT ]}>UF</H5>
               <P style={[ s.customerOutput ]}>UF</P>
               <H5 style={[ s.customerInputTT ]}>CEP</H5>
               <P style={[ s.customerOutput ]}>CEP</P>
            </View>
         </View>
            <View style={[ s.topFlag ]}>
               <H4 style={[ s.topFlagTT ]}>Orçamento</H4>
            </View>
         <View>
            <View style={[ s.rowInput, { backgroundColor: "#19497b77" } ]}>
               <PpView>
                  <H5 >QT</H5>
               </PpView>
               <PpView2>
                  <H5 >Descrição</H5>
               </PpView2>
               <PpView3>
                  <H5 >Uni</H5>
               </PpView3>
               <PpView4>
                  <H5 >Tot</H5>
               </PpView4>
            </View>
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
      tt: {
         color: "#19497b",
         fontSize: 14
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
      font-size: 14px;
      border-right: #fc0 1px dashed;
   `,
   Ppr = styled.Text`
      font-size: 12px;
      border-right: #fc0 1px dashed;
   `
;