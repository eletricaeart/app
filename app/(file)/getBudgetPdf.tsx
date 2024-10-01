

import React, { useEffect, useRef, useState } from "react";
import { printToFileAsync, printAsync } from "expo-print";
import { shareAsync, } from "expo-sharing";
import { EACard } from "@/src/widgets/clb-ea";
import { AppbarStick, BackButton, H1, H3, H4, H5, H6, P } from "@/src/widgets/ui";
import { ScrollView, View, Button, Text, StyleSheet, Pressable } from "react-native";
import styled from "styled-components/native";
// import Budgets from "./budgets";
import { invoiceHtml, invoiceFile } from "@/src/services/invoicePDF";
import { Brl2Float, CutRS, FixBrl, Float2Brl, Str2Brl } from "@/src/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import budgets from "../(drawer)/(tabs)/budgets";
import { router, Stack } from "expo-router";
import { AniButton } from "@/src/widgets/ui/animated";



interface owner {
   id: string;
   name: string;
   phone: string;
   email: string;
   rg: string;
   cpf: string;
   logradouro: string;
   cep: string;
   number: string;
   district: string;
   city: string;
   uf: string;
};

interface budget {
   key: string;
   id: string;
   formOfPayment: string;
   isPaid: boolean;
   name: string;
   notes: string;
   owner: string;
   payday: string;
   receiptValue: string;
   subtotal: string;
   warranty: string;
   services: any[];
   dateOfIssue: string;
   discount: string;
   dueDate: string;
};

// class BudgetModel {
//    qtd: number;
//    desc: string;
//    unit: number;
//    tot: number;

//    constructor( budget: budget ) {
//       this.qtd = budget.qtd;
//       this.desc = budget.desc;
//       this.unit = budget.unit;
//       this.tot = this.qtd * this.unit;   
//    }
// }

export default function GetBudgetPdfView() {
   const GeneratePDF = async () => {
      const 
         htmlData = invoiceHtml( 
            await handle()
         )
         ,
         file = await printToFileAsync({
         // file = await printAsync({
            // html: htmlData,
            html: invoiceHtml( 
               await handle()
            ),
            // base64: false,
            // margins: { 
            //    top: 16,
            //    right: 16,
            //    bottom: 16,
            //    left: 16,
            // },
            
         });
      ;
         
      async function handle() {
         try {
            const 
               data = await AsyncStorage.getItem( "budgetData" ).then( 
                  // r => JSON.parse( r ) 
                  r => (
                     r != null ? JSON.parse( r ) : null
                  )
               )
            ;
            console.log( "handle budgetData: ", await data );
            return data;
         } catch( err: any ) {
            console.error( "handle() err: \n\n\n", err );
         }
      }
      
      await shareAsync( file.uri );
   };

   const 
      [ Budget, setBudget ] = useState<budget>( {
         key: "",
         id: "",
         formOfPayment: "",
         isPaid: false,
         name: "",
         notes: "",
         owner: "",
         payday: "",
         receiptValue: "",
         subtotal: "",
         warranty: "",
         services: [],
         dateOfIssue: "",
         discount: "",
         dueDate: "",
      } )
      ,
      [ Owner, setOwner ] = useState<owner>( {
         id: "",
         name: "",
         phone: "",
         email: "",
         rg: "",
         cpf: "",
         logradouro: "",
         cep: "",
         number: "",
         district: "",
         city: "",
         uf: "",
      } )
      ,
      [ BgList, setBgList ] = useState( [] )
   ;


   useEffect( () => {
      async function LoadBudgetIntoView() {
         async function handle() {
            try {
               let x = {
                  budget: {},
                  owner: {},
               };
               const 
                  budgetData = await AsyncStorage.getItem( "budgetHook" ).then( r => JSON.parse( r ) )
               ;
               await AsyncStorage.getItem( "budgets" ).then( r => {
                  const 
                     budgets: any[] = JSON.parse( r )
                     ,
                     dataBudget = budgets.filter( item => item.id == budgetData.budgetId )
                  ;
                  return dataBudget;
               } ).then( r => {
                  x.budget = r[0];
                  console.log( "LoadBudgetIntoView() dataBudget: ", r[0] );
               } );
               await AsyncStorage.getItem( "customers" ).then( r => {
                  const 
                     customers: any[] = JSON.parse( r )
                     ,
                     dataCustomer = customers.filter( item => item.id == budgetData.ownerId )
                  ;
                  return dataCustomer;
               } ).then( r => {
                  x.owner = r[0];
                  console.log( "LoadBudgetIntoView() dataOwner: ", r[0] );
               } );

               return x;
            } catch( err: any ) {
               console.error( "LoadBudgetIntoView() err: \n\n\n", err );
            }
         }
         handle().then( r => { 
            console.log( "budgetData<>: ", r );
            const 
               data = {
                  budget: r?.budget,
                  owner: r?.owner,
               }
            ;

            setBudget( data.budget );
            setOwner( data.owner );

            if( data.budget.services.length <= 15 ) {
               // console.log( "length: ", 15 - data.budget.services.length );
               let list = [ ...Array(
                  15 - data.budget.services.length
               ) ].fill(0);
               setBgList( [ ...list ] );
            }

            AsyncStorage.setItem( "budgetData", JSON.stringify( { owner: data.owner, budget: data.budget } ) );
         } );
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
            <View>
               <View style={[ s.row ]}>
                  <H5 style={[ s.rowTitle ]}>Orçamento</H5>
                  <H5 style={[ s.rowTitle ]}>Emissão</H5>
                  <H5 style={[ s.rowTitle ]}>Validade</H5>
               </View>
               <View style={[ s.row, { backgroundColor: "#f5f5f5", } ]}>
                  <P style={[ s.rowText ]}>{ Budget.id }</P>
                  <P style={[ s.rowText ]}>{ Budget.dateOfIssue }</P>
                  <P style={[ s.rowText ]}>{ Budget.dueDate }</P>
               </View>
            </View>
               <View style={[ s.topFlag ]}>
                  <H4 style={[ s.topFlagTT ]}>Cliente</H4>
               </View>
            <View>
               <TrCustomer>
                  <Th>
                     <TTitle>Nome</TTitle>
                  </Th>
                  <Td style={{ flex: 1, }}>
                     <TText>{ Owner.name }</TText>
                  </Td>
               </TrCustomer>
               <TrCustomer style={[ { backgroundColor: "#e5e5e5bf" } ]}>
                  <Th>
                     <TTitle>Telefone</TTitle>
                  </Th>
                  <Td style={{ flex: 2, }}>
                     <TText>{ Owner.phone }</TText>
                  </Td>
                  <Th>
                     <TTitle>Email</TTitle>
                  </Th>
                  <Td style={{ flex: 2, }}>
                     <TText style={[  { flex: 2 } ]}>{ Owner.email }</TText>
                  </Td>
               </TrCustomer>
               <TrCustomer>
                  <Th>
                     <TTitle>RG/IE</TTitle>
                  </Th>
                  <Td style={{ flex: 2, }}>
                     <TText>{ Owner.rg }</TText>
                  </Td>
                  <Th>
                     <TTitle>CPF/CNPF</TTitle>
                  </Th>
                  <Td style={{ flex: 2, }}>
                     <TText>{ Owner.cpf }</TText>
                  </Td>
               </TrCustomer>
               <TrCustomer style={[ { backgroundColor: "#e5e5e5bf" } ]}>
                  <Th>
                     <TTitle>Endereço</TTitle>
                  </Th>
                  <Td style={{ flex: 2, }}>
                     <TText>{ Owner.logradouro }</TText>
                  </Td>

                  <Th>
                     <TTitle style={{  }}>N°</TTitle>
                  </Th>
                  <Td style={{ flex: .5 }}>
                     <TText>{ Owner.number }</TText>
                  </Td>
                  
                  <Th>
                     <TTitle style={{  }}>Bairro</TTitle>
                  </Th>
                  <Td style={{ flex: 2, }}>
                     <TText>{ Owner.district }</TText>
                  </Td>
               </TrCustomer>
               <TrCustomer>
                  <Th>
                     <TTitle>Cidade</TTitle>
                  </Th>
                  <Td style={{ flex: 2, }}>
                     <TText>{ Owner.city }</TText>
                  </Td>
                  <Th>
                     <TTitle>UF</TTitle>
                  </Th>
                  <Td style={{ flex: .5, }}>
                     <TText>{ Owner.uf }</TText>
                  </Td>

                  <Th>
                     <TTitle>CEP</TTitle>
                  </Th>
                  <Td style={{ flex: 2, }}>
                     <TText>{ Owner.cep }</TText>
                  </Td>
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
                     <H6>R$ Unit.</H6>
                  </PpView3>
                  <PpView4>
                     <H6>R$ Tot.</H6>
                  </PpView4>
               </View>
               <View>
                  {  Budget ?                  
                        Budget.services.map( ( item, position ) => {
                           if( position % 2 == 0 ) {
                              return(
                                 <View style={[ s.rowInput ]}>
                                    {/* 
                                       quantity: str
                                       total: float
                                       value: str
                                    */}
                                    <PpView>
                                       <Pp >{ item.quantity }</Pp>
                                    </PpView>
                                    <PpView2>
                                       <Pp >{ item.description }</Pp>
                                    </PpView2>
                                    <PpView3>
                                       <Ppr style={ s.ttt }>{ CutRS( Str2Brl( item.value ) ) }</Ppr>
                                    </PpView3>
                                    <PpView4>
                                       <Ppr style={ s.ttt }>{ CutRS( Float2Brl( item.total ) ) }</Ppr>
                                    </PpView4>
                                 </View>
                              );
                           } else {
                              return(
                                 <View style={[ s.rowInput, { backgroundColor: "#e5e5e5bf" } ]}>
                                    <PpView>
                                       <Pp >{ item.quantity }</Pp>
                                    </PpView>
                                    <PpView2>
                                       <Pp >{ item.description }</Pp>
                                    </PpView2>
                                    <PpView3>
                                       <Ppr style={ s.ttt }>{ CutRS( Str2Brl( item.value ) ) }</Ppr>
                                    </PpView3>
                                    <PpView4>
                                       <Ppr style={ s.ttt }>{ CutRS( Float2Brl( item.total ) ) }</Ppr>
                                    </PpView4>
                                 </View>
                              );
                           }
                        } )
                        :
                        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,].map( ( item, position ) => {
                           if( position % 2 == 0 ) {
                              return(
                                 <View style={[ s.rowInput ]}>
                                    <PpView style={{ paddingTop: 4, }}>
                                       <Pp>{" "}</Pp>
                                    </PpView>
                                    <PpView2>
                                       <Pp>{" "}</Pp>
                                    </PpView2>
                                    <PpView3>
                                       <Ppr>{" "}</Ppr>
                                    </PpView3>
                                    <PpView4>
                                       <Ppr>{" "}</Ppr>
                                    </PpView4>
                                 </View>
                              );
                           } else {
                              return(
                                 <View style={[ s.rowInput, { backgroundColor: "#e5e5e5bf" } ]}>
                                    <PpView style={{ paddingTop: 4, }}>
                                       <Pp></Pp>
                                    </PpView>
                                    <PpView2>
                                       <Pp></Pp>
                                    </PpView2>
                                    <PpView3>
                                       <Ppr></Ppr>
                                    </PpView3>
                                    <PpView4>
                                       <Ppr></Ppr>
                                    </PpView4>
                                 </View>
                              );
                           }
                        } )
                  }
                  {
                     Budget.services.length <= 15 &&
                     Budget.services.length % 2 == 0 ? (
                        BgList.map( ( item, position ) => {
                           if( position % 2 == 0 ) {
                              return(
                                 <View style={[ s.rowInput ]}>
                                    <PpView style={{ paddingTop: 4, }}>
                                       <Pp>{" "}</Pp>
                                    </PpView>
                                    <PpView2>
                                       <Pp>{" "}</Pp>
                                    </PpView2>
                                    <PpView3>
                                       <Ppr>{" "}</Ppr>
                                    </PpView3>
                                    <PpView4>
                                       <Ppr>{" "}</Ppr>
                                    </PpView4>
                                 </View>
                              );
                           } else {
                              return(
                                 <View style={[ s.rowInput, { backgroundColor: "#e5e5e5bf" } ]}>
                                    <PpView style={{ paddingTop: 4, }}>
                                       <Pp></Pp>
                                    </PpView>
                                    <PpView2>
                                       <Pp></Pp>
                                    </PpView2>
                                    <PpView3>
                                       <Ppr></Ppr>
                                    </PpView3>
                                    <PpView4>
                                       <Ppr></Ppr>
                                    </PpView4>
                                 </View>
                              );
                           }
                        } )
                     ) : (
                        BgList.map( ( item, position ) => {
                           if( position % 2 == 0 ) {
                              return(
                                 <View style={[ s.rowInput, { backgroundColor: "#e5e5e5bf" } ]}>
                                    <PpView style={{ paddingTop: 4, }}>
                                       <Pp></Pp>
                                    </PpView>
                                    <PpView2>
                                       <Pp></Pp>
                                    </PpView2>
                                    <PpView3>
                                       <Ppr></Ppr>
                                    </PpView3>
                                    <PpView4>
                                       <Ppr></Ppr>
                                    </PpView4>
                                 </View>
                              );
                           } else {
                              return(
                                 <View style={[ s.rowInput ]}>
                                    <PpView style={{ paddingTop: 4, }}>
                                       <Pp>{" "}</Pp>
                                    </PpView>
                                    <PpView2>
                                       <Pp>{" "}</Pp>
                                    </PpView2>
                                    <PpView3>
                                       <Ppr>{" "}</Ppr>
                                    </PpView3>
                                    <PpView4>
                                       <Ppr>{" "}</Ppr>
                                    </PpView4>
                                 </View>
                              );
                           }
                        } )
                     )
                        
                  }
               </View>
               <View>
                  <View style={[ { backgroundColor: "#f5f5f5" } ]}>
               <View style={[ s.row ]}>
                  <H5 style={[ s.rowTitle ]}>Subtotal</H5>
                  <H5 style={[ s.rowTitle ]}>Desconto</H5>
                  <H5 style={[ s.rowTitle ]}>Valor Total</H5>
               </View>
               <View style={[ s.row, { backgroundColor: "#f5f5f5", } ]}>
                  <P style={[ s.rowText ]}>{ Budget.subtotal }</P>
                  <P style={[ s.rowText ]}>{ Str2Brl( Budget.discount ) }</P>
                  <P style={[ s.rowText ]}>{ Str2Brl( Budget.receiptValue ) }</P>
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
                     <Text>{ Budget.notes }</Text>
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