

import React, { useState, useEffect, useRef } from "react";

import {
   StyleSheet, ScrollView, FlatList, Modal, View,
   Text, Image, Pressable, TextInput, Keyboard,
} from "react-native";

import {
   FAB, Portal, PaperProvider,
} from "react-native-paper";

import styled from "styled-components/native";
import {
   PageFooter, BottomNavigationBar, Fab, Press,
   Touch, 
} from "@/src/widgets/clb-widgets";

import {
   colors, elevation,
} from "@/src/widgets/clb-colors";

import * as c from "@/src/widgets/clb-html";
import * as ea from "@/src/widgets/clb-ea";
import * as Form from "@/src/widgets/clb-form";
import * as CStore from "@/src/widgets/clb-dbs";
import { Icon } from "@/src/widgets/clb-icons";
import { _ } from "@/src/widgets/clb";

import { LinearGradient } from "expo-linear-gradient";

import { api_GetCEP } from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseDB, SaveDataOnFbRDB, GetDataFromFbRDB } from "@/FirebaseConfig";
import { GetFBData, DeleteFBData, } from "@/src/widgets/clb-fb";

import uuid from "react-native-uuid";
import { ref, get, child, getDatabase } from "firebase/database";

import useCustomersFB from "@/src/hooks/useCustomersFB";



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
   estate?: string;
   logradouro?: string;
   number?: string;
   complemento?: string;
   district?: string;
   city?: string;
   note?: string;
}


/* == [ exports ]
== == == == == == == == == */
export default function ReceiptsView( { ...props } ) {
   const 
      [ ModalVisibility, setModalVisibility ] = useState( false )
      ,
      [ Receipts, setReceipts ] = useState( [] )
   ;



   useEffect( () => {
   }, [] ); 
   

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
   const [ customersDB, setcustomersDB ] = useState( [] );
   const 
      [ Paid, setPaid ] = useState( "" )
      ,
      [ Payday, setPayday ] = useState( "" )
      ,
      [ Ref, setRef ] = useState( "" )
      ,
      [ Subtotal, setSubtotal ] = useState( "" )
      ,
      [ DueDate, setDueDate ] = useState( "" )
      ,
      [ Customer, setCustomer ] = useState( "" )
      ,
      [ Services, setServices ] = useState( "" )
      ,
      [ Discount, setDiscount ] = useState( "" )
      ,
      [ Warranty, setWarranty ] = useState( "" )
      ,
      [ FormOfPayment, setFormOfPayment ] = useState( "" )
      ,
      [ Attachment, setAttachment ] = useState( "" )
      ,
      [ Notes, setNotes ] = useState( "" )
   ;
   
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
      // ,
      // receiptsList = {
      //    id: uuid.v4(),
      //    name: Name,
      //    cellphone: Cellphone,
      //    whatsapp: Whatsapp,
      //    phone: Phone,
      //    phone2: Phone2,
      //    email: Email,
      //    rg: Rg,
      //    cpf: Cpf,
      //    cep: Cep,
      //    estate: Estate,
      //    logradouro: Logradouro,
      //    number: Number,
      //    complemento: Complemento,
      //    district: District,
      //    city: City,
      //    note: Note 
      // }
   ;
   
   


   

   return( <>
      <PaperProvider>
         <LinearGradient colors={[ "#f5f5f5", "#e5e5e5", ]} style={[ { flex: 1, } ]} >
            <ScrollView style={{ flex: 1,  }}>
               <HomePage style={{  }}>
                  <Header>
                     <Content>
                        <c.H2 >Recibos</c.H2>
                     </Content>
                  </Header>

                  <Section bg="#e2f4fe00" style={{ flex: 1, paddingBottom: 75, }}>
                     <Content style={{ gap: 16 }}>

                        { Receipts != null ? 
                           Receipts.map( receipt => {
                              return( 
                                 <ea.UsersCard 
                                    key={ receipt.id }
                                    name={ receipt.name }
                                 />
                              );
                           } )
                           : 
                           <View style={{ flex: 1, }}>
                              <Text>Nenhum recibo ainda</Text>
                           </View>
                        }
                        
                     </Content>
                  </Section>
               </HomePage> 

            </ScrollView>
         </LinearGradient>


   
         {/*  == [ Modal ]
         == == == == == == == == ==  */}
         <Modal visible={ ModalVisibility } 
            onRequestClose={ () => { setModalVisibility( false ) } }
            animationType="slide"
            presentationStyle="formSheet"
         >

            <Section style={[ s.modal_root ]}>
               <ScrollView keyboardShouldPersistTaps="handled">
                  <View style={[ s.backSheet, elevation.elevation ]} />
                  <View style={[ s.frontSheet, elevation.elevation ]} >
                     <Section bg="#f3f3f3" style={{ backgroundColor: "gradient-" }}>
                        <c.Header>
                           <c.Content>
                              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                                 <c.H3 color="#00559c99">Novo recibo</c.H3>
                                 <Pressable onPress={ () => { setModalVisibility( !ModalVisibility ) } }>
                                    <View style={[ s.btnOverlay,  ]}>
                                       <Icon i="f0" name="close" color={ colors.error } />
                                    </View>
                                 </Pressable>
                              </View>
                           </c.Content>
                        </c.Header>
                        <Section style={[ s.form, elevation.elevation, { backgroundColor: "#fff", } ]}>
                           <c.Content gap={ 8 }>

                              <View style={ s.form } ref={ id_form }>

                                 <Content style={{  }}>
                                    <c.H4>Valor do recibo</c.H4>

                                 </Content>

                                 <Section >
                                    <Text style={ s.label }>Data do recebimento</Text>
                                    <TextInput style={ s.input }
                                    value={ Payday }
                                    // ref={ id_Payday }
                                    onChangeText={ setPayday }
                                    />
                                 </Section>

                                 <Section contato section>
                                    <View style={ s.divider }>
                                       <Text style={ s.dividerText }>Referência</Text>
                                    </View>
                                    <View style={ s.duo }>
                                       <View style={ s.duoBox }>
                                          <Text style={ s.label }>Referência</Text>
                                          <TextInput style={ s.input }
                                             value={ Ref }
                                             onChangeText={ setRef }
                                             keyboardType="number-pad"
                                          />
                                       </View>
                                       
                                       <View style={ s.duoBox }>
                                          <Text style={ s.label }>Subtotal</Text>
                                          <TextInput style={ s.input }
                                             value={ Subtotal }
                                             onChangeText={ setSubtotal }
                                             keyboardType="number-pad"
                                          />
                                       </View>
                                    </View>
                                    
                                    
                                    
                                    <Text style={ s.label }>Vencimento</Text>
                                    <TextInput style={ s.input }
                                       value={ DueDate }
                                       onChangeText={ setDueDate }
                                       keyboardType="email-address"
                                    />
                                    
                                    <View style={ [ s.duo, {  } ] }>
                                       <View style={ s.duoBox }>
                                          <Text style={ s.label }>Cliente</Text>
                                          <TextInput style={ s.input }
                                             value={ Customer }
                                             onChangeText={ setCustomer }
                                             keyboardType="number-pad"
                                          />
                                       </View>
                                       
                                       <View style={ s.duoBox }>
                                          <Text style={ s.label }>Serviços</Text>
                                          <TextInput style={ s.input }
                                             value={ Services }
                                             onChangeText={ setServices }
                                             keyboardType="number-pad"
                                          />
                                       </View>
                                    </View>
                                 </Section>

                                 <Section endereço section>
                                    <View style={ s.divider }>
                                       <Text style={ s.dividerText }>Desconto</Text>
                                    </View>
                                    
                                    <Text style={ s.label }>Desconto</Text>
                                    <TextInput style={ s.input }
                                       value={ Discount }
                                       onChangeText={ setDiscount }
                                    />
                                    
                                    <Text style={ s.label }>Garantia</Text>
                                    <TextInput style={ s.input }
                                       keyboardType="number-pad"
                                       value={ Warranty }
                                       onChangeText={ setWarranty }
                                    />
                                       
                                    <Text style={ s.label }>Forma de pagamento</Text>
                                    <TextInput style={ s.input }
                                       value={ FormOfPayment }
                                       onChangeText={ setFormOfPayment }
                                    />
                                    
                                    <Text style={ s.label }>Anexo</Text>
                                    <TextInput style={ s.input }
                                       value={ Attachment }
                                       onChangeText={ setAttachment }
                                    />
                                    
                                 </Section>

                                 <Section observações section>
                                    <View style={ s.divider }>
                                       <Text style={ s.dividerText }>Informaçoes adicionais</Text>
                                    </View>
                                    <Text style={ s.label }>Informaçoes adicionais</Text>
                                    <TextInput style={ s.input }
                                       value={ Notes }
                                       onChangeText={ setNotes }
                                    />
                                 </Section>
                                 <Section style={ {
                                    gap: 16,
                                    marginTop: 24,
                                    marginBottom: 66,
                                 } }>

                                    <Touch 
                                       txt="apagar tudo"
                                       onPressIn={ () => { Keyboard.dismiss() } }
                                       onPressOut={ () => { 
                                          Form.ClearInputs( inputs ); 
                                          id_Name.current.focus(); 
                                       } }
                                    />
                                    <Touch 
                                       touchSty={{
                                          backgroundColor: "#9c5500",
                                       }}
                                       txtSty={{
                                          color: "#fff",
                                       }}
                                       txt="erase DBs"
                                       onPress={ async () => { await AsyncStorage.removeItem( "customers" ) } }
                                    />
                                    <Touch 
                                       touchSty={{
                                          backgroundColor: "#00559C",
                                       }}
                                       txtSty={{
                                          color: "#fff",
                                       }}
                                       txt="cadastrar"
                                       onPress={ () => { RegisterCustomerOnBase( { dbs_name: "customers", object: customersList } ) } }
                                    />

                                 </Section>
                                 
                              </View>
                           </c.Content>
                        </Section>
                     </Section>
                  </View>
               </ScrollView>
            </Section>
         </Modal>



         <Portal>
            <FAB.Group
            open={open}
            visible
            backdropColor="#fffb"

            fabStyle={{ backgroundColor: "#00559c", }}
            icon={open ? 'atom' : 'plus'}
            actions={[
               //  { icon: 'plus', onPress: () => console.log('Pressed add') },
               {
                  icon: "apple-icloud", /* 'account-reactivate', */
                  label: 'Buscar recibos da nuvem',
                  labelTextColor: "#333",
                  labelStyle: { fontWeight: "bold" },
                  onPress: () => {
                     UpdateCustomersBase();
                  },
               },
               {
                  icon: 'receipt',
                  label: 'Criar novo recibo',
                  labelTextColor: "#333",
                  labelStyle: { fontWeight: "bold", },
                  onPress: () => setModalVisibility( true ),
               },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
               if (open) {
                  // do something if the speed dial is open
               }
            }}
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
      flex: 1;
      width: 100%;
   `
   ,
   Header = styled.View`

   `,
   Section = styled.View``,
   Content = styled.View`
      padding: 16px;
   `,
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
;
