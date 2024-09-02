

import React, { useState, useEffect, useRef } from "react";

import {
   StyleSheet, ScrollView, FlatList, Modal, View,
   Text, Image, Pressable, TextInput, Keyboard,
   Button,
   KeyboardAvoidingView,
   ActivityIndicator,
} from "react-native";

import {
   Switch,
   FAB, Portal, PaperProvider,
} from "react-native-paper";

import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import styled from "styled-components/native";
import { MaskedTextInput, MaskedText, mask, } from "react-native-mask-text";

import {
   PageFooter, 
   Fab, Press,
   Touch,
   BudgetCardList, 
} from "@/src/widgets/clb-widgets";

import { ModalFullPage, ModalCardCenter, } from "@/src/widgets/ui/modal";

import {
   colors, elevation,
} from "@/src/widgets/clb-colors";

import * as c from "@/src/widgets/clb-html";
import * as ea from "@/src/widgets/clb-ea";
import * as Form from "@/src/widgets/clb-form";
import * as CStore from "@/src/widgets/clb-dbs";
import { Icon } from "@/src/widgets/clb-icons";
import { _ } from "@/src/widgets/clb";
import { Brl2Float, Brl2Str, FixBrl, Str2Brl } from "@/src/utils";

import { LinearGradient } from "expo-linear-gradient";

import { api_GetCEP } from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseDB, SaveDataOnFbRDB, GetDataFromFbRDB, FetchRtdbData } from "@/FirebaseConfig";
import { GetFBData, DeleteFBData, } from "@/src/widgets/clb-fb";

import uuid from "react-native-uuid";
import { ref, get, child, getDatabase, set } from "firebase/database";

import useCustomersFB from "@/src/hooks/useCustomersFB";
import { GetTotal } from "@/src/scripts/receipts";
import MaskInput, { formatWithMask, Masks } from "react-native-mask-input";
import useBudgetsFB from "@/src/hooks/useBudgetsFB";
import { css } from "styled-components";
import { Fmenu } from "@/src/widgets/ui";



/* == [ properties ]
== == == == == == == == == */

interface customer {
   name: string; 
   email?: string; 
   cellphone?: string;
   whatsapp?: string;
   phone?: string;
   phone2?: string;
   rg?: string;
   cpf?: string;
   cep?: string;
   uf?: string;
   logradouro?: string;
   number?: string;
   complemento?: string;
   district?: string;
   city?: string;
   note?: string;
}


/* == [ exports ]
== == == == == == == == == */
export default function BudgetsView( { ...props } ) {
   const 
      [ ModalVisibility, setModalVisibility ] = useState( false )
      ,
      [ ModalServicesVisibility, setModalServicesVisibility ] = useState( false )
      ,
      [ ModalCustomerVisibility, setModalCustomerVisibility ] = useState( false )
      ,
      [ Budgets, setBudgets ] = useState( [] )
      ,
      { BudgetsFB, Loading } = useBudgetsFB({})
      ,
      [ InputInterface, setInputInterface ] = useState( true )
   ;


   /** == [ Fabb properties ] 
    * 
    * == == == == == == == == == */
   const 
      [ state, setState ] = React.useState({ open: false })
      ,
      onStateChange = ({ open }) => setState({ open })
      ,
      { open } = state
   ;



   /* == [ Modal's properties ]
   == == == == == == == == == */
   const defaults = {
      dueDate: `${ 
         new Date().getDate() }/${ 
            new Date().getMonth() + 2 > 12 ? new Date().getMonth() + 2 - 12 : new Date().getMonth() + 2
         }/${ new Date().getMonth() + 2 > 12 ? new Date().getFullYear() + 1 : new Date().getFullYear() 
      }`,
      payday: `${ 
         new Date().getDate() }/${ 
            new Date().getMonth() + 1
         }/${ new Date().getFullYear() 
      }`,
      warranty: `${ 
         new Date().getDate() }/${ 
            new Date().getMonth() + 7 > 12 ? new Date().getMonth() + 7 - 12 : new Date().getMonth() + 7
         }/${ new Date().getMonth() + 7 > 12 ? new Date().getFullYear() + 1 : new Date().getFullYear() 
      }`,
   };
   const [ customersDB, setcustomersDB ] = useState( [] );
   const 
      [ BudgetName, setBudgetName ] = useState( "" )
      ,
      [ Paid, setPaid ] = useState( false )
      ,
      [ Payday, setPayday ] = useState( "" )
      ,
      [ Ref, setRef ] = useState( "" )
      ,
      [ Subtotal, setSubtotal ] = useState( Str2Brl( "0" ) )
      ,
      [ DueDate, setDueDate ] = useState( "" )
      ,
      [ Customer, setCustomer ] = useState( {} )
      ,
      [ Customers, setCustomers ] = useState( [] )
      ,
      [ Services, setServices ] = useState( [] )
      ,
      [ ServiceDescription, setServiceDescription ] = useState( "" )
      ,
      [ ServicesDescription, setServicesDescription ] = useState( "" )
      ,
      [ ServiceTotalValue, setServiceTotalValue ] = useState( "" )
      ,
      [ Notes, setNotes ] = useState( "" )
      ,
      [ Service, setService ] = useState( {
         description: ServiceDescription,
         services: Services,
         notes: Notes,
         total: ServiceTotalValue,
         customer: Customer,
      } )
      ,
      [ Discount, setDiscount ] = useState( 0 )
      ,
      [ DiscountValue, setDiscountValue ] = useState( 0 )
      ,
      [ Warranty, setWarranty ] = useState( () => {
         // pintura: 2 e 5 anos 
         // eletrica: 30 dias p/ não duráveis e 90 dias p/ duráveis
         // drywall: 6 meses ?
         return ""
      } )
      ,
      [ FormOfPayment, setFormOfPayment ] = useState( "..." )
      ,
      [ Attachment, setAttachment ] = useState( "" )

      ,
      [ ReceiptValue, setReceiptValue ] = useState( "0" )
   ;

   const 
      [ SwitchPaid_Enabled, setSwitchPaid_Enabled ] = useState( false )
      ,
      [ ModalFormOfPayment, setModalFormOfPayment ] = useState( false )
      ,
      [ ModalServices, setModalServices ] = useState( false )
      ,
      [ ModalCustomer, setModalCustomer ] = useState( false )
   ;

   // useEffect( () => {
   //    setSubtotal( 
         
   //    )
   // }, [ ReceiptValue ] );

   /**
    * budgets functions
    * 
    */
   async function FetchLocalCustomers() {
      try {
         const 
            getCustomers = await AsyncStorage.getItem( "customers" ).then( r => JSON.parse( r ) )
         ;
         console.log( "FetchLocalCustomers() => getCustomers: ", getCustomers );
         return getCustomers;
      } catch( err: any ) { console.log( "FetchLocalCustomers() err: ", err ); }
   }

   async function FetchLocalBudgets() {
      try {
         const 
            getBudgets = await AsyncStorage.getItem( "budgets" ).then( r => JSON.parse( r ) )
         ;
         console.log( "FetchLocalBudgets() => getBudgets: ", getBudgets );
         return getBudgets;
      } catch( err: any ) { console.log( "FetchLocalBudgets() err: ", err ); }
   }

   async function FetchFbBudgets() {
      // async function handle() {
      //    try {
      //       const 
      //          user = await CStore.GetObjData( "user" ),
      //          data = await get( child( 
      //             ref( FirebaseDB ), `users/${ user.uid }/budgets` 
      //          ) ).then( snapshot => snapshot?.val() );
      //       ;
      //       return await data;
      //    } catch( err: any ) {
      //       console.error( "FetchFbBudgets() err: \n\n\n", err );
      //    }
      // }
      // handle().then( r => {
      //    setBudgets( r );
      //    console.log("r: ", r );

      //    async function SaveLocal() {
      //       const json = JSON.stringify( r );
      //       await AsyncStorage.setItem( "budgets", json );
      //    }
      //    SaveLocal();
      // } );
      
      try {
         let
            budgets = BudgetsFB
            ,
            json = JSON.stringify( BudgetsFB )
         ;

         await AsyncStorage.setItem( "budgets", json );
         SetBudgets();

      } catch( err: any ) {
         console.error( "FetchFbBudgets() err: \n\n\n", err );
      }
   }

   async function SetCustomers() {
      // retrieve customers from storage and set on Customers
      FetchLocalCustomers().then( r => setCustomers( r ) )
   }

   async function SetBudgets() {
      // retrieve budgets from storage and set on Budgets
      await FetchLocalBudgets().then( r => setBudgets( r ) )
   }

   async function SetRef() {
      async function GetBudgets() {
         try {
            const 
               budgets = await AsyncStorage.getItem( "budgets" ).then( r => JSON.parse( r ) )
            ;
            return budgets;
         } catch( err: any ) {
            console.error( "GetBudgets() err: \n\n\n", err );
         }
      }
      GetBudgets().then( r => {
         return `rc-${ new Date().getFullYear() }-00${ new Date().getMonth() + 1 }-${ Math.round( Math.random() * 999 ) }-${ Math.round( Math.random() * 999 ) }`;       
      } ).then( r => setRef( r ) );
   }


   /**
    * load view
    * 
    */
   useEffect( () => {
      SetCustomers();
      SetBudgets();
      SetRef();
   }, [] ); 

   useEffect( () => {
      SetRef();
   }, [ Budgets ] ); 
   
   function ToggleSwitch_Paid() {
      setSwitchPaid_Enabled( !SwitchPaid_Enabled );
      if( SwitchPaid_Enabled ) {
         setPaid( true );
         return true;
      } else {
         setPaid( false );
         return false;
      }
   }

   function OnChangePayday( selectedDate ) {
      const currentDate = selectedDate;
      setPayday( currentDate );
   }
   
   
   async function RegisterNewBudget() {
      async function handle() {
         try {
            const 
               user = await AsyncStorage.getItem( "user" ).then( r => JSON.parse( r ) )
            ;
            const 
               obj = {
                  id: Ref,
                  owner: Customer.id,
                  // name: Service.description,
                  name: BudgetName || `Serviço ${ new Date().getDate() }-${ new Date().getMonth() + 1 }-${ new Date().getFullYear() }`,
                  // notes: Service.notes,
                  notes: Notes,
                  services: [ ...Service.services ],
                  subtotal: Subtotal,
                  discount: DiscountValue,
                  receiptValue: Brl2Float( Subtotal ) - DiscountValue,
                  warranty: Warranty ? Warranty : defaults.warranty,
                  formOfPayment: FormOfPayment,
                  isPaid: SwitchPaid_Enabled,
                  payday: !SwitchPaid_Enabled ? "" : Payday ? Payday :  defaults.payday,
                  dueDate: DueDate ? DueDate : defaults.dueDate,
                  dateOfIssue: `${ new Date().getDate() }/${ new Date().getMonth() + 1 }/${ new Date().getFullYear() }`,
               }
            ;

            await CStore.SaveAsList( "budgets", obj ).then( r => {
               SetBudgets();
            } );

            SaveDataOnFbRDB( { 
               ref: `users/${ user.uid }/budgets/${ obj.id }`,
               data: obj,
               okMsg: "Enviado pra nuvem!",
               errMsg: "Deu ruim no envio mano!"
            } );

            // reset all inputs
            setSubtotal( Str2Brl( "0" ) );
            setCustomer( {} );
            setServices( [] );
            setService( {
               description: "",
               services: [],
               notes: "",
               total: "0",
               customer: "",
            } );
            SetRef();
            setNotes( "" );
            setDiscount( 0 );
            setWarranty( defaults.warranty );
            setFormOfPayment( "..." );
            setSwitchPaid_Enabled( false );
            setPayday( defaults.payday );
            setDueDate( defaults.dueDate );
            
         } catch( err: any ) { console.log( "RegisterNewBudget() err: ", err ); }
      }

      !Customer.id ? (
         console.log( 
            "nenhum cliente foi adicionado no orçamento!",
            // "\nWarranty: ", Warranty,
            // "\nPayday: ", Payday,
            // "\nDueDate: ", DueDate,
            // "\nSwitchPaid_Enabled: ", SwitchPaid_Enabled,
            
            // "\n\n\nid: ", Ref,
            // "\nowner: ", Customer.id,
            // "\nname: ", Service.description,
            // "\nnotes: ", Service.notes,
            // "\nservices: ", [ ...Service.services ],
            // "\nreceiptValue: ", Service.total,
            // "\nsubtotal: ", Subtotal,
            // "\ndiscount: ", Discount,
            // "\nwarranty: ", Warranty ? Warranty : defaults.warranty,
            // "\nformOfPayment: ", FormOfPayment,
            // "\nisPaid: ", SwitchPaid_Enabled,
            // "\npayday: ", !SwitchPaid_Enabled ? "" : Payday ? Payday :  defaults.payday,
            // "\ndueDate: ", DueDate ? DueDate : defaults.dueDate
         )
      ) : Service.services.length == 0 ? (
         console.log( "nenhum serviço foi adicionado no orçamento!" )
      ) : handle();
   }


   const 
      inputs = [
         setPaid,
         setPayday,
         setRef,
         setSubtotal,
         setDueDate,
         setCustomer,
         setServices,
         setDiscount,
         setWarranty,
         setFormOfPayment,
         setAttachment,
         setNotes,
      ]
      ,
      id_form = useRef( null )
   ;
   

   /** == [ Modal Services ] 
    * 
    * == == == == == == == == == */
   const 
      [ Quantity, setQuantity ] = useState( 1 )
      ,
      [ Value, setValue ] = useState( "" )
      ,
      [ TempList, setTempList ] = useState( [] )
      ,
      [ TempTotal, setTempTotal ] = useState( "0" )
   ;
   
   

   return( <>
      <PaperProvider>
         <LinearGradient colors={[ "#f5f5f5", "#e5e5e5", ]} style={[ { flex: 1, } ]} >
            
            { Loading ? <ActivityIndicator color="#daa520"/> : Budgets != null ? 
               <ScrollView style={{ flex: 1, }}>
                  <HomePage style={{  }}>
                     <Header>
                        <Content>
                           <H2>Orçamentos</H2>
                        </Content>
                     </Header>
   
                     <Section  style={{ flex: 1, paddingBottom: 75, backgroundColor: "#e2f4fe00", }}>
                           
                        <Content style={{ gap: 16 }}>
   
                           {  
                              <FlatList 
                                 data={ Budgets }
                                 renderItem={ ( {item} ) => <>
                                    <BudgetCardList 
                                       budget={ item }
                                    />
                                 </> }
                                 keyExtractor={ item => item.id } 
                                 ItemSeparatorComponent={ 
                                    () => <View style={{ 
                                       height: 1, 
                                       backgroundColor: "#ccc" ,
                                       width: "90%",
                                       margin: "auto",
                                    }}/>
                                 }
                              />
                           }
                           
                        </Content>

                     </Section>
                  </HomePage> 
               </ScrollView>
               : 
               <View style={{ flex: 1, }}>
                  <Header>
                     <Content>
                        <H2>Orçamentos</H2>
                     </Content>
                  </Header>
                  <View style={{ width: "100%", aspectRatio: "12 / 9", marginTop: 16, }}>
                     <Image source={ require( "@/src/images/clipart/Receipts.png" ) }
                     style={{ width: "100%", height: "100%", }} resizeMode="contain"/>
                  </View>
                  <Center style={{ paddingTop: 16, }}>
                     <H3 style={{ color: "#777", }}>Nenhum orçamento ainda</H3>
                  </Center>
               </View>
            }

         </LinearGradient>


   
         {/*  == [ Modal ]
         == == == == == == == == ==  */}
         <ModalFullPage ModalVisibility={ ModalVisibility }
         overlay={
            <ModalCardCenter 
            setState={ setModalFormOfPayment } 
            useState={ ModalFormOfPayment }
            trigger={ ModalFormOfPayment }
            >
               <Centered style={{ paddingTop: 8, paddingBottom: 18, }}>
                  <H3>Qual a forma de pagamento?</H3>
               </Centered>

               <Content style={{ gap: 8, }}>
                  <Item>
                     <P style={{ color: "#555", }}
                     onPress={ () => {
                        setFormOfPayment( "Pix" );
                        setModalFormOfPayment( !ModalFormOfPayment );
                     } }
                     >
                        Pix
                     </P>
                  </Item>
                  <Div />
                  <Item>
                     <P style={{ color: "#555", }}
                     onPress={ () => {
                        setFormOfPayment( "Cartão de débito" );
                        setModalFormOfPayment( !ModalFormOfPayment );
                     } }
                     >
                        Cartão de débito
                     </P>
                  </Item>
                  <Div />
                  <Item>
                     <P style={{ color: "#555", }}
                     onPress={ () => {
                        setFormOfPayment( "Cartão de crédito" );
                        setModalFormOfPayment( !ModalFormOfPayment );
                     } }
                     >
                        Cartão de crédito
                     </P>
                  </Item>
                  <Div />
                  <Item>
                     <P style={{ color: "#555", }}
                     onPress={ () => {
                        setFormOfPayment( "Em dinheiro" );
                        setModalFormOfPayment( !ModalFormOfPayment );
                     } }
                     >
                        Em dinheiro
                     </P>
                  </Item>
               </Content>
            </ModalCardCenter>
         }>
            <ScrollView keyboardShouldPersistTaps="handled">
            <Section style={{ zIndex: 1, }}>
               <Header>
                  <View style={{ height: 80, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: 16, paddingRight: 16, }}>
                     {/* <H3 style={{ color: "#00559c99" }}>Novo orçamento</H3> */}
                     
                     <TextInput style={{ fontSize: 20, fontWeight: "bold", color: "#00559c99" }}
                        value={ BudgetName } 
                        onChangeText={ text => {
                           setBudgetName( text );
                        } }
                        placeholder="Novo orçamento"
                        placeholderTextColor="#00559c99"
                     />

                     <Pressable onPress={ () => { setModalVisibility( !ModalVisibility ) } }>
                        <View style={[ s.btnOverlay,  ]}>
                           <Icon i="f0" name="close" color={ colors.error } />
                        </View>
                     </Pressable>
                  </View>
                  <Content>

                     <Card style={{ backgroundColor: "#00559c", }}>
                        <Content style={{ flexDirection: "row", justifyContent: "space-between", gap: 18, height: 110, }}>
                           <Section style={{ justifyContent: "space-between" }}>
                              <H3 style={{ color: "#fff", }}>Valor do orçamento</H3>
                              <H1 style={{ color: "#fff", }}>{ Str2Brl( ReceiptValue ) }</H1>
                           </Section>
                           <Section>
                              <P style={{ color: "#fff", }}>{ Ref }</P>
                           </Section>
                        </Content>
                     </Card>

                  </Content>
               </Header>
               <Section style={[ s.form, elevation.elevation, { backgroundColor: "#fff", } ]}>
                  <c.Content gap={ 8 }>

                     <View style={ s.form } ref={ id_form }>

                        <Content style={{  }}>
                        </Content>

                        <Section >

                           <View style={ s.divider }>
                              <Text style={ s.dividerText }>Status do orçamento</Text>
                           </View>

                           <Section style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <P>Já está pago?</P>
                              <Switch
                                 style={{  }}
                                 trackColor={{ false: "#767577", true: "#00559c77" }}
                                 thumbColor={ SwitchPaid_Enabled ? "#0088ec" : "#f4f3f4" }
                                 ios_backgroundColor="#3e3e3e"
                                 onValueChange={ () => {
                                    ToggleSwitch_Paid();
                                    setPaid( SwitchPaid_Enabled );
                                 } }
                                 value={ SwitchPaid_Enabled }
                                 // value={ Paid }
                              />
                           </Section>

                           {
                              SwitchPaid_Enabled && <Section style={{ paddingTop: 16, paddingBottom: 16, }}>
                                 <Text style={ s.label }>Data do recebimento</Text>
                                 <MaskInput
                                    value={ Payday }
                                    onChangeText={ ( text, rawText ) => {
                                       const { masked, unmasked } = formatWithMask( {
                                          text: text, mask: Masks.DATE_DDMMYYYY,
                                       } );
                                       setPayday( masked );
                                       console.log( "masked: ", masked );
                                       console.log( "text: ", text );
                                       console.log( "rawText: ", rawText );
                                    } }
                                    style={ s.input }
                                    placeholderTextColor={ "#777" }
                                    placeholder={ defaults.payday }
                                    keyboardType="numeric"
                                 />
                              </Section>
                           }
                        </Section>

                        <Section>

                           <View style={ s.divider }>
                              <Text style={ s.dividerText }>Referência</Text>
                           </View>

                           <View style={ s.duo }>
                              <View style={ s.duoBox }>
                                 <Text style={ s.label }>Referência</Text>
                                 <TextInput style={ s.input }
                                    value={ Ref }
                                    // onChangeText={ setRef }
                                    keyboardType="number-pad"
                                    placeholderTextColor={ "#777" }
                                    editable={ false }
                                 />
                              </View>
                              
                              <View style={ s.duoBox }>
                                 <Text style={ s.label }>Vencimento</Text>
                                 <MaskInput
                                    value={ DueDate }
                                    onChangeText={ ( text, rawText ) => {
                                       const { masked, unmasked } = formatWithMask( {
                                          text: text, mask: Masks.DATE_DDMMYYYY,
                                       } );
                                       setDueDate( masked );
                                       console.log( "masked: ", masked );
                                       console.log( "text: ", text );
                                       console.log( "rawText: ", rawText );
                                    } }
                                    style={ s.input }
                                    placeholderTextColor={ "#777" }
                                    placeholder={ defaults.dueDate }
                                    keyboardType="numeric"
                                 />
                              </View>
                           </View>
                                                   
                           {/* cliente input */}
                           <Text style={ s.label }>Cliente</Text>
                           <Text style={ [ s.input, { paddingTop: 18,  } ] }
                           onPress={ () => {
                              setModalCustomerVisibility( !ModalCustomerVisibility );
                           } }>
                              { Customer.name }
                           </Text>
                           

                           <View style={ s.duo }>
                              <View style={ s.duoBox }>
                                 <Text style={ s.label }>Serviços</Text>
                                 <Text style={ [ s.input, { paddingTop: 18,  } ] }
                                 onPress={ () => {
                                    setModalServicesVisibility( !ModalServicesVisibility );
                                 } }>
                                    {/* { TempTotal && Str2Brl( TempTotal ) } */}
                                    { TempTotal && Service.description } 
                                 </Text>
                              </View>

                              <View style={ s.duoBox }>
                                 <Text style={ s.label }>Subtotal</Text>
                                 <TextInput
                                    type="currency"
                                    value={ Subtotal }
                                    editable={ false }
                                    placeholderTextColor={ "#777" }
                                    onChangeText={ ( text, rawText ) => {
                                       console.log( "Subtotal text: ", text );
                                       console.log( "Subtotal rawText: ", rawText );
                                    } }
                                    style={ s.input }
                                    keyboardType="numeric"
                                 />
                              </View>
                           </View>
                        </Section>

                        <Section>
                           <View style={ s.divider }>
                              <Text style={ s.dividerText }>Desconto</Text>
                           </View>
                           
                           <Text style={ s.label }>Desconto</Text>
                           <MaskedTextInput
                              type="currency" 
                              options={ {
                                 prefix: "R$ ",
                                 decimalSeparator: ",",
                                 groupSeparator: ".",
                                 precision: 2
                              } }
                              value={ Discount }
                              onChangeText={ ( text, rawText ) => {
                                 let 
                                    services = []
                                    ,
                                    total = 0
                                 ;

                                 if( TempList.length > 0 ) {
                                    services = [ ...TempList ]
                                 }

                                 services.forEach( item => {
                                    total = total + item.total
                                 } );

                                 const 
                                    n = ( total - Brl2Float( text ) ).toString()
                                 ;

                                 setDiscount( rawText );
                                 setDiscountValue( Brl2Float( text ) );
                                 setReceiptValue( n.toString() );
                                 console.log(
                                    "Subtotal onChangeText: ",
                                    typeof text,
                                    "TempTotal: ", TempTotal, 
                                    "Discount: ", Discount,
                                    "text: ", text,
                                    "rawText: ", rawText,
                                    "total: ", total,
                                    "n: ", n,
                                    "text Brl2Str: ", Brl2Str( text ),
                                    "text Brl2Float: ", Brl2Float( text ),
                                 );
                              } }
                              style={ s.input }
                              keyboardType="numeric"
                           />
                           
                           <Text style={ s.label }>Garantia</Text>
                           <MaskInput
                              value={ Warranty }
                              onChangeText={ ( text, rawText ) => {
                                 const { masked, unmasked } = formatWithMask( {
                                    text: text, mask: Masks.DATE_DDMMYYYY,
                                 } );
                                 setWarranty( masked );
                                 console.log( "masked: ", masked );
                                 console.log( "text: ", text );
                                 console.log( "rawText: ", rawText );
                              } }
                              style={ s.input }
                              placeholderTextColor={ "#777" }
                              placeholder={ defaults.warranty }
                              keyboardType="numeric"
                           />
                              
                           <Text style={ s.label }>Forma de pagamento</Text>
                           <Text style={ [ s.input, { paddingTop: 18,  } ] }
                           onPress={ () => {
                              setModalFormOfPayment( !ModalFormOfPayment );
                           } }>
                              { FormOfPayment }
                           </Text>
                           

                           <Text style={ s.label }>Anexo</Text>
                           <TextInput style={ s.input }
                              value={ Attachment }
                              onChangeText={ setAttachment }
                              placeholderTextColor={ "#777" }
                           />
                           
                        </Section>

                        <Section>
                           <View style={ s.divider }>
                              <Text style={ s.dividerText }>Informaçoes adicionais</Text>
                           </View>
                           <Text style={ s.label }>Anotações</Text>
                           <TextInput multiline={ true } style={{ backgroundColor: "#f5f5f5", borderRadius: 16, borderColor: "#7773", borderWidth: 1, height: 136, padding: 16, }}
                           value={ Notes } onChangeText={ text => {
                              setNotes( text );
                           } }
                           onBlur={ () => {
                              const bkp = { ...Service };
                              bkp.notes = Notes;
                              setService( bkp );
                              console.log( Service );
                           } }
                           textAlignVertical="top"/>
                        </Section>
                        <Section style={ {
                           gap: 16,
                           marginTop: 24,
                           marginBottom: 66,
                        } }>
                           
                           <Touch 
                              touchSty={{ backgroundColor: "#00559C", }}
                              txtSty={{ color: "#fff", }}
                              txt="cadastrar"
                              onPress={ () => { 
                                 console.log(
                                    "Budget: \n\n\n", 
                                    "\nService: ", Service,
                                    "\nCustomer.id: ", Customer.id,
                                    "\nRef: ", Ref,
                                 );
                                 RegisterNewBudget();
                                 // if( Service.services.length > 0 ) {
                                 //    RegisterNewBudget();
                                 // } else {
                                 //    console.log( "NewBudget not saved" );
                                 // }
                              } }
                           />

                        </Section>
                     </View>
                  </c.Content>
               </Section>
            </Section>
            </ScrollView>
         </ModalFullPage>

         { ModalServicesVisibility && 
            <ModalFullPage>
               <Header style={{ backgroundColor: "#e5e5e5", }}>
                  <Content>
                     <Duo style={{ flexDirection: "row", justifyContent: "space-between", 
                        alignItems: "center",
                     }}>
                        <Pressable onPress={ () => { setModalServicesVisibility( !ModalServicesVisibility ) } }
                        style={{
                           position: "absolute",
                           zIndex: 9, paddingLeft: 8,
                        }}>
                           <Icon i="mi" name="arrow-back-ios" color="#555"/>
                        </Pressable>
                        <H4 style={{ flex: 1, textAlign: "center", }}>
                           Serviços
                        </H4>
                     </Duo>
                  </Content>
               </Header>
               <Section style={{
                  flex: 1, height: "100%",
                  backgroundColor: "#e5e5e5",
               }}>
                  
                  <Section style={{ flex: 1, borderRadius: 24, overflow: "hidden", elevation: 3, }}>
                     <ScrollView style={{ padding: 16, backgroundColor: "#f5f5f5", }}>
                        <Section style={{  }}>
                           <Header>
                              <TextInput 
                              placeholder={
                                 `Serviço ${ new Date().getDate() }-${ new Date().getMonth() + 1 }-${ new Date().getFullYear() }`
                              }
                              value={ ServiceDescription } 
                              onChangeText={ setServiceDescription }
                              onBlur={ () => {
                                 const bkp = { ...Service };
                                 bkp.description = ServiceDescription;
                                 setService( bkp );
                              } }
                              style={{ fontSize: 24, fontWeight: "bold", color: "#00559c", paddingLeft: 8, }}/>
                           </Header>
                           <Section style={{
                              paddingTop: 24, paddingBottom: "100%",
                           }}>
                              
                              { 
                                 // Service.services.length > 0 
                                 TempList.length > 0 
                                 &&
                                 TempList.map( item => { return(
                                    <Section style={{ paddingTop: 16, paddingBottom: 16,
                                       paddingLeft: 8, paddingRight: 8, gap: 8, 
                                    }}>
                                       <T style={{ fontSize: 18 }}>{ item.description }</T>
                                       <Duo style={{ alignItems: "center", justifyContent: "space-between" }}>
                                          <T style={{ color: "#666", }}>{ item.quantity } x { Str2Brl( item.value ) }</T>
                                          <Duo style={{ alignItems: "center", gap: 0, }}>
                                             <T style={{ fontWeight: 700, color: "#777", }}>Total </T>
                                             <T style={{ color: "#666", }}>{ Str2Brl( item.total ) }</T>
                                          </Duo>
                                       </Duo>
                                    </Section>
                                 ) } )
                              }




                              <Section style={{ borderTopColor: "#7777", borderTopWidth: 1, paddingTop: 24, }}>
                                 <Duo style={{ paddingLeft: 8, paddingRight: 8, alignItems: "center", justifyContent: "space-between", }}>
                                    <H3>TOTAL</H3>
                                    <T style={{ color: "#666", fontSize: 22, fontWeight: 500, }}>
                                       { Str2Brl( TempTotal ) }
                                    </T>
                                 </Duo>                                 
                              </Section>
                           </Section>
                        </Section>
                     </ScrollView>
                  </Section>

                  <Section style={[ { position: "absolute", bottom: 0, width: "100%", 
                     borderTopEndRadius: 24, 
                     borderTopStartRadius: 24, 
                     backgroundColor: "#212329",
                     paddingLeft: 16, paddingRight: 16, paddingBottom: 16,
                     height: InputInterface ? "auto" : 33,
                  },
                  ]}>
                     <Header>
                        <Pressable onPress={ () => {
                           setInputInterface( !InputInterface );
                        } }>
                           <Section style={{ height: 30,
                              alignItems: "center", justifyContent: "center",
                           }}>
                              <View style={{
                                 backgroundColor: "#7777", borderRadius: 24,
                                 width: "20%", height: 5,
                              }}></View>
                           </Section>
                        </Pressable>
                     </Header>

                     <Label>
                        <LabelText style={{ color: "#daa520", fontSize: 16, fontWeight: 700, }}>Descrição</LabelText>
                        <TextInput style={[ s.input, { backgroundColor: "#1b1d22", color: "#eee", } ]}
                        placeholder={ 
                           `Serviço ${ new Date().getDate() }-${ new Date().getMonth() + 1 }-${ new Date().getFullYear() }` 
                        }
                        placeholderTextColor={ "#777" }
                        value={ ServicesDescription }
                        onChangeText={ text => {
                           setServicesDescription( text ) 
                        } }
                        />
                     </Label>

                     <Duo style={{ gap: 16, }}>
                        <Label style={{ flex: 1, }}>
                           <LabelText style={{ color: "#daa520",fontSize: 16, fontWeight: 700, }}>Quantidade</LabelText>
                           <TextInput style={[ s.input, { backgroundColor: "#1b1d22", color: "#eee", } ]}
                           inputMode="decimal"
                           placeholder="1"
                           placeholderTextColor={ "#777" }
                           value={ Quantity }
                           onChangeText={ text => {
                              setQuantity( text );
                           } }
                           onBlur={ () => {
                              let 
                                 handledText = Quantity == 0 ? 1 : Quantity
                              ;
                              switch( Quantity ) {
                                 case 0 : setQuantity( 1 );
                                 break;

                                 case "" : setQuantity( 1 );
                                 break;

                                 case null : setQuantity( 1 );
                                 break;
                                 
                              }
                              setQuantity( handledText );
                           } }
                           />
                        </Label>
                        <Label style={{
                           flex: 1,
                        }}>
                           <LabelText style={{ color: "#daa520",fontSize: 16, fontWeight: 700, }}>
                              Valor
                           </LabelText>
                           <MaskInput
                              inputMode="numeric"
                              style={[ s.input, { backgroundColor: "#1b1d22", color: "#fff", } ]}
                              placeholder="0.00"
                              placeholderTextColor={ "#777" }
                              value={ Value }
                              mask={ Masks.BRL_CURRENCY }
                              onChangeText={ ( masked, unmasked ) => {
                              setValue( unmasked ); // you can use the masked value as well

                              console.log( masked ); // "R$ 1.234,56"
                              console.log( unmasked ); // "123456"
                              } }
                           />
                        </Label>
                     </Duo>

                     <Duo style={{ gap: 16, }}>
                        <Btn style={{ flex: 1, elevation: 1, backgroundColor: "#0075bd", }}
                        onPress={ () => {  
                           async function HandleData() {
                              try {
                                 let 
                                    data = {
                                       description: ServicesDescription,
                                       value: FixBrl( Value ),
                                       quantity: Quantity,
                                       // total: parseFloat( Value ) * parseFloat( Quantity ),
                                       // total: FixBrl( Value ) * parseInt( Quantity ),
                                       total: parseInt( Quantity ) * FixBrl( Value ),
                                    },
                                    services = []
                                    ,
                                    total = 0
                                 ;

                                 console.log(
                                    "parseInt( Quantity ): ", parseInt( Quantity ),
                                    "\nValue: ", Value,
                                    "\nFixBrl( Value ): ", FixBrl( Value ),
                                    "\nparseInt( Quantity ) * FixBrl( Value ): ",
                                    parseInt( Quantity ) * FixBrl( Value )
                                 );

                                 if( TempList.length > 0 ) {
                                    services = [ ...TempList ]
                                 }

                                 services.push( data );

                                 services.forEach( item => {
                                    total = total + item.total
                                 } );

                                 setTempList( services );

                                 setTempTotal( ( total ).toString() );
                                 setSubtotal( Str2Brl( ( total ).toString() ) );
                                 setReceiptValue( total.toString() );

                                 return services;
                                 
                              } catch( err: any ) { console.error( err ); }
                           }

                           async function HandleInputs() {
                              try {
                                 if( Quantity == 0 ) {
                                    setQuantity( 1 );
                                 }                
                                 if( Value != "" && ServicesDescription != "" ) {
                                    await HandleData(); 
                                 } else if( Value == "" ) {
                                    alert( "Value = null" );
                                 } else if( ServicesDescription == "" ) {
                                    alert( "ServicesDescription = null" );
                                 } else if( typeof Quantity == string ) {
                                    setQuantity( Quantity.toString() );
                                 }
                              } catch( err: any ) {
                                 console.error( err );
                              }
                           }

                           HandleInputs().then( () => {
                              setServicesDescription( "" );
                              setValue( "" );
                              setQuantity( 1 );
                           } );

                        } }
                        >
                           <Text style={{ 
                              color:"#eee",
                              fontSize: 18, 
                              textTransform: "uppercase",
                              fontWeight: "bold", textAlign: "center",
                           }}>
                              Adicionar
                           </Text>
                        </Btn>
                        <Btn style={{
                           flex: 1, elevation: 1, backgroundColor: "#00559C",
                        }}
                        onPress={ () => {
                           async function SaveData() {
                              try {
                                 const 
                                    bkp = { ...Service }
                                    ,
                                    d = Discount.toString().split( "" )
                                    ,
                                    nt = d.pop()
                                    ,
                                    ou = d.pop()
                                 ;

                                 let discount = "";
                                 
                                 d.push( "." );
                                 d.push( ou );
                                 d.push( nt );
                                 discount = d.join( "" );

                                 bkp.services = [ ...TempList ];
                                 bkp.notes = Notes;
                                 bkp.total = TempTotal;
                                 if( bkp.description == "" ) {
                                    bkp.description = `Serviço ${ new Date().getDate() }-${ new Date().getMonth() + 1 }-${ new Date().getFullYear() }`;
                                 }

                                 console.log( 
                                    "TempTotal: ", TempTotal,
                                    "\n100.50: ", Str2Brl( "100.50" ),
                                    "\nDiscount: ", Discount,
                                    "\nDiscounte: ", discount
                                 );
                                 console.log( "Service.total: ", Service.total );
                                 setService( bkp );

                                 return {
                                    discount
                                 }
                              } catch( err: any ) { console.error( err ) }

                           } SaveData().then( returned => {
                              setReceiptValue( (
                                 parseFloat( TempTotal ) - parseFloat( returned?.discount )
                              ).toString() );
                              setServicesDescription( "" );
                              setQuantity( 1 ),
                              setValue( "" );
                              setModalServicesVisibility( !ModalServicesVisibility );
                              console.log( Service.total );
                           } );
                        } }>
                           <Text style={{ color:"#fffe",
                              fontSize: 18, 
                              textTransform: "uppercase",
                              fontWeight: "bold", textAlign: "center",
                           }}>
                              Salvar
                           </Text>
                        </Btn>
                     </Duo>

                  </Section>
               </Section>
            </ModalFullPage> 
         }

         { ModalCustomerVisibility && 
            <ModalFullPage>
               <Header style={{ backgroundColor: "#e5e5e5", }}>
                  <Content>
                     <Duo style={{ flexDirection: "row", justifyContent: "space-between", 
                        alignItems: "center",
                     }}>
                        <Pressable onPress={ () => { setModalCustomerVisibility( !ModalCustomerVisibility ) } }
                        style={{
                           position: "absolute",
                           zIndex: 9, paddingLeft: 8,
                        }}>
                           <Icon i="mi" name="arrow-back-ios" color="#555"/>
                        </Pressable>
                        <H4 style={{ flex: 1, textAlign: "center", }}>Catálogo de clientes</H4>
                     </Duo>
                  </Content>
               </Header> 
               <Section style={{
                  flex: 1, height: "100%",
                  backgroundColor: "#e5e5e5",
               }}>
                  
                  <Section style={{ flex: 1, borderRadius: 24, overflow: "hidden", elevation: 3, }}>
                     <ScrollView style={{ padding: 16, backgroundColor: "#f5f5f5", }}>
                        <Section style={{  }}>
                           <Header>
                              <H2 style={{ fontSize: 24, fontWeight: "bold", color: "#00559c", alignSelf: "center", }}>
                                 Clientes
                              </H2>
                           </Header>
                           <Section style={{
                              paddingTop: 24, paddingBottom: "100%",
                           }}>
                              {/* cliente modal */
                                 // body 
                                 Customers && 
                                 <FlatList 
                                    data={ Customers }
                                    renderItem={ ({item}) => <>
                                       <Pressable
                                          onPress={ () => {
                                             setCustomer( {
                                                name: item.name,
                                                id: item.id,
                                             } );
                                             setModalCustomerVisibility( !ModalCustomerVisibility );
                                          } }
                                       >
                                          <ea.CustomersCard
                                             key={ item.id }
                                             name={ item.name }
                                          />
                                       </Pressable>
                                    </> }
                                    
                                    keyExtractor={ item => item.id } 
                                    ItemSeparatorComponent={ 
                                       () => <View style={{ height: 2, }}/>
                                    }
                                    style={{ width: "100%", }} 
                                    contentContainerStyle={{ padding: 16, paddingBottom: 38, paddingLeft: 0, paddingRight: 0, }}
                                 />
                              }
                           </Section>
                        </Section>
                     </ScrollView>
                  </Section>
               </Section>
            </ModalFullPage> 
         }

         <Portal>
            <FAB.Group
            open={open}
            visible
            backdropColor="#fffb"

            fabStyle={{ backgroundColor: "#00559c", }}
            icon={ open ? 'atom' : 'plus' }
            actions={[
               //  { icon: 'plus', onPress: () => console.log('Pressed add') },
               {
                  icon: "apple-icloud", /* 'account-reactivate', */
                  label: 'Buscar orçamentos da nuvem',
                  labelTextColor: "#333",
                  labelStyle: { fontWeight: "bold" },
                  onPress: () => { 
                     FetchFbBudgets().then( r => {
                        setBudgets( r );
                        console.log( "FetchFbBudgets() => r: ", r );
                     } ); 
                  },
               },
               {
                  icon: 'receipt',
                  label: 'Criar novo orçamento',
                  labelTextColor: "#333",
                  labelStyle: { fontWeight: "bold", },
                  onPress: () => setModalVisibility( true ),
               },
            ]}
            onStateChange={onStateChange}
            onPress={ () => {
               if( open ) {
                  // do something if the speed dial is open
               }
            } }
            />
         </Portal>
     </PaperProvider>
   </> );
}


const s = StyleSheet.create( {
   root: {
      // paddingTop: StatusBar.currentHeight,
   },
   modal_root: {
      backgroundColor: "#00559c",
      flex: 1,
   },
   backSheet: {
      backgroundColor: "#959595",
      borderTopStartRadius: 24,
      borderTopEndRadius: 24,
      width: "90%",
      height: 15,
      marginTop: 10,
      alignSelf: "center",
   },
   frontSheet: {
      backgroundColor: "#f5f5f5",
      borderTopStartRadius: 24,
      borderTopEndRadius: 24,
      width: "100%",
      flex: 1,
      alignSelf: "center",
      overflow: "hidden",
   },
   modal_body: {
      backgroundColor: "#f5f5f5",
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      padding: 8,
      backgroundColor: '#0e101c',
   },
   form: {
      borderRadius: 24,
   },
   header: {
      marginTop: 16,
      marginBottom: 24,
   },
   btnOverlay: { backgroundColor: "#0001", 
      padding: 8,
      borderRadius: 100,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   divider: {
      borderBottomColor: "#009ee6",
      borderBottomWidth: 2,
      borderStyle: "dashed",
      marginTop: 16,
      marginBottom: 16,  
   },
   dividerText: {
      fontWeight: "bold",
      marginBottom: 8,
      color: "#00559c",
   },
   duo: {
      flexDirection: "row",
      gap: 8,
   },
   duoBox: {
      flex: .5,
   },
   label: {
      color: "#777",
      fontWeight: "500",
      marginBottom: 8,
      marginLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 16,
      paddingRight: 16,
   },
   input: {
      backgroundColor: "#f3f3f3",
      height: 56,
      marginBottom: 16,
      padding: 16,
      borderRadius: 16,
      borderColor: "#fff2",
      borderWidth: 1,
      borderStyle: "solid",
      // color: "#eee",
   },
   button: {
      marginTop: 40,
      color: 'white',
      height: 40,
      backgroundColor: '#ec5990',
      borderRadius: 4,
   },
   fab: { position: "absolute", bottom: 16, right: 16, width: "auto" },
} );


const 
   HomePage = styled.View`
      flex: 1px;
      width: 100%;
   `
   ,
   Header = styled.View`

   `,
   Section = styled.View``,
   Content = styled.View`
      padding: 16px;
   `,
   Center = styled.View`
      align-items: center;
      justify-content: center;
   `,
   Centered = styled.View`
      align-items: center;
      justify-content: center;
      text-align: center;
   `,
   Duo = styled.View`
      flex-direction: row;
      gap: 8px;
   `
   ,
   Item = styled.View`
      flex-direction: row;
      padding: 8px;
      gap: 8px;
   `
   ,
   Div = styled.View`
      border-color: #9997;
      border-width: 1px;
      border-style: dashed;
   `
   ,
   BackSheet = styled.View`
      background-color: #959595;
      border-top-right-radius: 24px;
      border-top-left-radius: 24px;
      width: 90%;
      height: 15px;
      margin-top: 10px;
      align-self: center;
   `
   ,

   /** == [ form ] 
    * 
    * == == == == == == == == == */
   Label = styled.View`
      color: #777;
      font-weight: 500;
      margin-bottom: 8px;
      margin-left: 0;
      padding-top: 0px;
      padding-bottom: 0;
   `,
   LabelText = styled.Text`
      color: #777;
      font-weight: 500;
      margin-bottom: 8px;
      margin-left: 0;
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 8px;
   `,
   Input = styled.TextInput`
      background-color: #f3f3f3;
      height: 56px;
      margin-bottom: 16px;
      padding: 16px;
      border-radius: 16px;
      border-color: #fff2;
      border-width: 1px;
      border-style: solid;
   `,
   Btn = styled.Pressable`
      background-color: #cbdcf7;
      height: 56px;
      margin-bottom: 16px;
      padding: 16px;
      border-radius: 16px;
      border-color: #fff2;
      border-width: 1px;
      border-style: solid;
   `,

   /** == == == [ text ] 
    * 
    * == == == == == == == == == */
   TT = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 32px;
      font-weight: bold;
      color: #333;
   `,
   H1 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 32px;
      font-weight: bold;
      color: #333;
   `,
   H2 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 24px;
      font-weight: bold;
      color: #333;
   `,
   H3 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 20px;
      font-weight: bold;
      color: #333;
   `,
   H4 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 18px;
      font-weight: bold;
      color: #333;
   `,
   H5 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-weight: bold;
      color: #333;
   `,
   H6 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 12px;
      font-weight: bold;
      color: #333;
   `,

   T = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 16px;
      color: #333;
   `,
   P = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 16px;
      color: #333;
   `,
   PP = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 12px;
      color: #333;
   `,


   /** == [ card ] 
    * 
    * == == == == == == == == == */
   Card = styled.View`
      border-radius: 24px;
      overflow: hidden;
   `
;
