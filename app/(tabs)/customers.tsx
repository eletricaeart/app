

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
import { 
   Header, VSplit, 
   Section, Content,
   Center, Centered, 
   Card, BackSheet, 
   Duo, H1, H2, H3, H4, H5, H6,
   TT, T, T1, T2, Homepage, P, PP, 
} from "@/src/widgets/ui";



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


/** == [ fab ] 
 * 
 * == == == == == == == == == */
export function Fabb() {
   const 
      [ state, setState ] = React.useState({ open: false })
      ,
      onStateChange = ({ open }) => setState({ open })
      ,
      { open } = state
   ;
 
   return (
     <PaperProvider>
       <Portal>
         <FAB.Group
           open={open}
           visible
           icon={open ? 'calendar-today' : 'plus'}
           actions={[
             { icon: 'plus', onPress: () => console.log( 'Pressed add' ) },
             {
               icon: 'star',
               label: 'Star',
               onPress: () => console.log( 'Pressed star' ),
             },
             {
               icon: 'email',
               label: 'Email',
               onPress: () => console.log( 'Pressed email' ),
             },
             {
               icon: 'bell',
               label: 'Remind',
               onPress: () => console.log( 'Pressed notifications' ),
             },
           ]}
           onStateChange={ onStateChange }
           onPress={() => {
               if( open ) {
                  // do something if the speed dial is open
               }
           }}
         />
       </Portal>
     </PaperProvider>
   );
}


/* == [ exports ]
== == == == == == == == == */
export default function CustomersView( { ...props } ) {
   const 
      user = CStore.GetObjData( "user" )
      ,
      { CustomersFB, Loading } = useCustomersFB({})
      ,
      [ Customers, setCustomers ] = useState( [] )
      ,
      [ Clientes, setClientes ] = useState( "" )
      ,
      [ ModalVisibility, setModalVisibility ] = useState( false )
      ,
      [ ModalMenuVisibility, setModalMenuVisibility ] = useState( false )
   ;

   async function FetchLocalCustomers() {
      try {
         const 
            data = await AsyncStorage.getItem( "customers" )
            ,
            jsonData = await JSON.parse( data )
         ;
         return jsonData;
      } catch( err: any ) {
         console.error( "FetchLocalCustomers() err: \n\n\n", err );
      }
   }

   async function SetCustomers() {
      try {
         await FetchLocalCustomers().then(
            returned => setCustomers( returned )
         );
      } catch( err: any ) {
         console.error( "SetCustomers() err: \n\n\n", err );
      }
   }


   async function UpdateCustomersBase() {
      try {
         let // here
            tempCustomersFB = CustomersFB
            ,
            tempCustomersFBJson = JSON.stringify( CustomersFB )
            ,
            tempLocalCustomersString = await AsyncStorage.getItem( "customers" )
            ,
            tempLocalCustomers = await JSON.parse( tempLocalCustomersString )
         ;

         await AsyncStorage.setItem( "customers", tempCustomersFBJson );
         SetCustomers();

      } catch( err: any ) {
         console.error( "UpdateCustomersBase() err: \n\n\n", err );
      }
   }

   
   async function GetData( dbs_name ) {
      try {
         const data = await AsyncStorage.getItem( dbs_name );
   
      if( data !== undefined ) {
         console.log( "Congrats! here is your prize: ", data );
         setDBS( data );
      }
   
         return data != null ? JSON.parse( data ) : null;
      } catch( err ) {
         console.log( "GetData err: ", err );
      }
   }
   
   
   async function RegisterCustomerOnBase( props ) {
      const 
         userInfo = await CStore.GetObjData( "user" )
      ;
      id_form.current.focus() && 
      Keyboard.dismiss();
      if( Name != "" ) {

         // Insert data to AsyncStorage
         await CStore.Save( 
            props.dbs_name, props.object 
         ).then( r => {
            // reset inputs
            inputs.forEach( i => i( "" ) );
            // close modal
            setModalVisibility( false );
            // fetch local customers
            // FetchLocalCustomers();
            SetCustomers();
         } );

         SaveDataOnFbRDB( { 
            ref: `users/${ userInfo.uid }/customers/${ props.object.id }`,
            data: props.object,
            okMsg: "Enviado pra nuvem!",
            errMsg: "Deu ruim no envio mano!"
         } );
         
      } else {
         alert( "Digite o nome do seu cliente" );
      }
      // RegisterCustomerOnBase( { dbs_name: "customers", object: customersList } )
   }


   useEffect( () => {
      SetCustomers();

      // GetFBData( { 
      //    ref: "customers/c:32-904/name",
      //    putValueOn: setClientes
      // } );
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
      [ Name, setName ] = useState( "" )
      ,
      [ Cellphone, setCellphone ] = useState( "" )
      ,
      [ Whatsapp, setWhatsapp ] = useState( "" )
      ,
      [ Phone, setPhone ] = useState( "" )
      ,
      [ Phone2, setPhone2 ] = useState( "" )
      ,
      [ Email, setEmail ] = useState( "" )
      ,
      [ Rg, setRg ] = useState( "" )
      ,
      [ Cpf, setCpf ] = useState( "" )
      ,
      [ Cep, setCep ] = useState( "" )
      ,
      [ Estate, setEstate ] = useState( "" )
      ,
      [ Logradouro, setLogradouro ] = useState( "" )
      ,
      [ Number, setNumber ] = useState( "" )
      ,
      [ Complemento, setComplemento ] = useState( "" )
      ,
      [ District, setDistrict ] = useState( "" )
      ,
      [ City, setCity ] = useState( "" )
      ,
      [ Note, setNote ] = useState( "" )
      ,
      [ DBS, setDBS ] = useState( [] )
      ,
      [ CustomerName, setCustomerName ] = useState( "" )
   ;
   
   const 
      inputs = [
         setName,
         setCellphone,
         setWhatsapp,
         setPhone,
         setPhone2,
         setEmail,
         setRg,
         setCpf,
         setCep,
         setEstate,
         setLogradouro,
         setNumber,
         setComplemento,
         setDistrict,
         setCity,
         setNote
      ]
      ,
      customersList = {
         // id: `c:${ Math.round( Math.random() * 999 ) }-${ Math.round( Math.random() * 999 ) }`,
         id: uuid.v4(),
         name: Name,
         cellphone: Cellphone,
         whatsapp: Whatsapp,
         phone: Phone,
         phone2: Phone2,
         email: Email,
         rg: Rg,
         cpf: Cpf,
         cep: Cep,
         estate: Estate,
         logradouro: Logradouro,
         number: Number,
         complemento: Complemento,
         district: District,
         city: City,
         note: Note 
      }
      ,
      id_Name = useRef( null )
      ,
      id_form = useRef( null )
   ;
   
   
   
   async function GetCEP() {
      if( Cep == "" ) {
         alert( "o cep digitado não existe" );
         setCep( "" );
         return;
      }
   
      try {
         const 
            response = await api_GetCEP.get( `/${ Cep }/json` )
         ;
         
         _( response.data );
   
         setCep( response.data.cep );
         setEstate( response.data.uf );
         setLogradouro( response.data.logradouro );
         setDistrict( response.data.bairro );
         setCity( response.data.localidade );
   
      } catch( err ) {
         console.log( "api_GetCEP err: \n", err );
      }
   } 





   async function GetFBCustomerName( { ...props } ) {
      const output_value = ";"
      try {
         const 
            dbRef = ref( getDatabase() )
         ;

         await get( child( 
            dbRef, 
            props.PathsRef 
         ) )
         . 
         then( snapshot => {
            if( snapshot.exists() ) {
               setCustomerName( snapshot.val().name );
            } else { console.log( props.PathsRef ); }
         } );
      } catch( err ) {
         console.log( "GetData() err: ", err );
      }
   }
   

   return( <>
      <PaperProvider>
         {/* <LinearGradient colors={[ "#f5f5f5", "#e5e5e5", ]} style={[ { flex: 1, } ]} > */}
         <LinearGradient colors={[ "#fafafa", "#faf", ]} style={[ { flex: 1, } ]} >
            
            { Customers != null ? 
               <ScrollView style={{ flex: 1,  }}>
                  <Homepage style={{  }}>
                     <Header>
                        <T1 style={{ color: "#daa520", }}>Clientes</T1>
                     </Header>
   
                     <Section bg="#e2f4fe00" style={{ flex: 1, paddingBottom: 75, }}>
                        <Section style={{ gap: 16, padding: 0, }}>
   
                           { 
                              // Customers.map( customer => {
                              //    return( 
                              //       <ea.UsersCard 
                              //          key={ customer.id }
                              //          name={ customer.name }
                              //       />
                              //    );
                              // } ) 
                              <FlatList 
                                 data={ Customers }
                                 renderItem={ ({item}) => <>
                                    <ea.UsersCard
                                       key={ item.id }
                                       name={ item.name }
                                    />
                                 </> }
                                 keyExtractor={ item => item.id } 
                                 ItemSeparatorComponent={ 
                                    () => <View style={{ height: 16, }}/>
                                 }
                                 style={{ width: "100%",  }} 
                                 contentContainerStyle={{ padding: 16, paddingBottom: 38, }}
                              />
                           }
                           
                        </Section>
                     </Section>
                  </Homepage> 
               </ScrollView>
               : 
               <View style={{ flex: 1, }}>
                  <Header>
                     <Content>
                        <H2>Clientes</H2>
                     </Content>
                  </Header>
                  <View style={{ width: "100%", aspectRatio: "12 / 9", marginTop: 16, }}>
                     <Image source={ require( "@/src/images/clipart/saying-no-to-customers.png" ) }
                     style={{ width: "100%", height: "100%", }} resizeMode="contain"/>
                  </View>
                  <Center style={{ paddingTop: 16, }}>
                     <H3 style={{ color: "#777", }}>Nenhum cliente aqui</H3>
                  </Center>
               </View>
            }

         </LinearGradient>


   
      {/*  == [ Modal ]
      == == == == == == == == ==  */}
      <Modal visible={ ModalVisibility } 
         onRequestClose={ () => { setModalVisibility( false ) } }
         animationType="slide"
         presentationStyle="formSheet"
      >

         <c.Section style={[ s.modal_root ]}>
            <ScrollView keyboardShouldPersistTaps="handled">
               <View style={[ s.backSheet, elevation.elevation ]} />
               <View style={[ s.frontSheet, elevation.elevation ]} >
                  <c.Section bg="#f3f3f3" style={{ backgroundColor: "gradient-" }}>
                     <c.Header>
                        <c.Content>
                           <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <c.H3 color="#00559c99">Cadastrar cliente</c.H3>
                              <Pressable onPress={ () => { setModalVisibility( !ModalVisibility ) } }>
                                 <View style={[ s.btnOverlay,  ]}>
                                    <Icon i="f0" name="close" color={ colors.error } />
                                 </View>
                              </Pressable>
                           </View>
                        </c.Content>
                     </c.Header>
                     <c.Section bg="#fff" style={[ s.form, elevation.elevation ]}>
                        <c.Content gap={ 8 }>

                           <View style={ s.form } ref={ id_form }>
                              <c.Section style={ s.header }>
                                 <c.H4>Cliente { Name }</c.H4>
                              </c.Section>

                              <c.Section cliente section>
                                 <Text style={ s.label }>Nome do Cliente</Text>
                                 <TextInput style={ s.input }
                                 value={ Name }
                                 ref={ id_Name }
                                 onChangeText={ setName }
                                 />
                              </c.Section>

                              <c.Section contato section>
                                 <View style={ s.divider }>
                                    <Text style={ s.dividerText }>CONTATO</Text>
                                 </View>
                                 <View style={ s.duo }>
                                    <View style={ s.duoBox }>
                                       <Text style={ s.label }>Celular</Text>
                                       <TextInput style={ s.input }
                                          value={ Cellphone }
                                          onChangeText={ setCellphone }
                                          keyboardType="number-pad"
                                       />
                                    </View>
                                    
                                    <View style={ s.duoBox }>
                                       <Text style={ s.label }>WhatsApp</Text>
                                       <TextInput style={ s.input }
                                          value={ Whatsapp }
                                          onChangeText={ setWhatsapp }
                                          keyboardType="number-pad"
                                       />
                                    </View>
                                 </View>
                                 
                                 <View style={ [ s.duo, {  } ] }>
                                    <View style={ s.duoBox }>
                                       <Text style={ s.label }>Telefone</Text>
                                       <TextInput style={ s.input }
                                          value={ Phone }
                                          onChangeText={ setPhone }
                                          keyboardType="number-pad"
                                       />
                                    </View>
                                    
                                    <View style={ s.duoBox }>
                                       <Text style={ s.label }>Telefone 2</Text>
                                       <TextInput style={ s.input }
                                          value={ Phone2 }
                                          onChangeText={ setPhone2 }
                                          keyboardType="number-pad"
                                       />
                                    </View>
                                 </View>
                                 
                                 <Text style={ s.label }>Email</Text>
                                 <TextInput style={ s.input }
                                    value={ Email }
                                    onChangeText={ setEmail }
                                    keyboardType="email-address"
                                 />
                                 
                                 <View style={ [ s.duo, {  } ] }>
                                    <View style={ s.duoBox }>
                                       <Text style={ s.label }>RG/IE</Text>
                                       <TextInput style={ s.input }
                                          value={ Rg }
                                          onChangeText={ setRg }
                                          keyboardType="number-pad"
                                       />
                                    </View>
                                    
                                    <View style={ s.duoBox }>
                                       <Text style={ s.label }>CPF</Text>
                                       <TextInput style={ s.input }
                                          value={ Cpf }
                                          onChangeText={ setCpf }
                                          keyboardType="number-pad"
                                       />
                                    </View>
                                 </View>
                              </c.Section>

                              <c.Section endereço section>
                                 <View style={ s.divider }>
                                    <Text style={ s.dividerText }>ENDEREÇO</Text>
                                 </View>
                                 
                                 <View style={ [ s.duo, {  } ] }>
                                    <View style={ s.duoBox }>
                                       <Text style={ s.label }>CEP</Text>
                                       <TextInput style={ s.input }
                                       keyboardType="number-pad"
                                       value={  Cep }
                                       placeholder="00.000-00"
                                       onChangeText={ text => { 
                                          setCep( text )
                                       } }
                                       onBlur={ () => { GetCEP() } }
                                       />
                                    </View>
                                    
                                    <View style={ s.duoBox }>
                                       <Text style={ s.label }>UF</Text>
                                       <TextInput style={ s.input }
                                    value={ Estate }
                                    onChangeText={ setEstate }
                                 />
                                    </View>
                                 </View>
                                 
                                 <Text style={ s.label }>Rua</Text>
                                 <TextInput style={ s.input }
                                    value={ Logradouro }
                                    onChangeText={ setLogradouro }
                                 />
                                 
                                 <View style={ [ s.duo, {  } ] }>
                                    <View style={ s.duoBox }>
                                       <Text style={ s.label }>Número</Text>
                                       <TextInput style={ s.input }
                                          keyboardType="number-pad"
                                          value={ Number }
                                          onChangeText={ setNumber }
                                       />
                                    </View>
                                    
                                    <View style={ s.duoBox }>
                                       <Text style={ s.label }>Complemento</Text>
                                       <TextInput style={ s.input }
                                          value={ Complemento }
                                          onChangeText={ setComplemento }
                                       />
                                    </View>
                                 </View>
                                 
                                 <Text style={ s.label }>Bairro</Text>
                                 <TextInput style={ s.input }
                                    value={ District }
                                    onChangeText={ setDistrict }
                                 />
                                 
                                 <Text style={ s.label }>Cidade</Text>
                                 <TextInput style={ s.input }
                                    value={ City }
                                    onChangeText={ setCity }
                                 />
                              </c.Section>

                              <c.Section observações section>
                                 <View style={ s.divider }>
                                    <Text style={ s.dividerText }>OBSERVAÇÕES</Text>
                                 </View>
                                 <Text style={ s.label }>Observação</Text>
                                 <TextInput style={ s.input }
                                    value={ Note }
                                    onChangeText={ setNote }
                                 />
                              </c.Section>
                              <c.Section style={ {
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

                              </c.Section>
                              
                           </View>
                        </c.Content>
                     </c.Section>
                  </c.Section>
               </View>
            </ScrollView>
         </c.Section>
      </Modal>


      {/* /** == [ ModalMenu ] 
       * 
       * == == == == == == == == == */}
      <Modal visible={ ModalMenuVisibility } 
         onRequestClose={ () => { setModalMenuVisibility( false ) } }
         animationType="slide"
         presentationStyle="formSheet"
      >
         <Text>Modal Menu</Text>
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
               label: 'Atualizar os dados nuvem',
               labelTextColor: "#333",
               labelStyle: { fontWeight: "bold" },
               onPress: () => {
                  UpdateCustomersBase();
               },
            },
            {
               icon: 'account-plus',
               label: 'Cadastrar novo cliente',
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


