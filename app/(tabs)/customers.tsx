

import React, { useState, useEffect, useRef } from "react";

import {
   StyleSheet, ScrollView, FlatList, Modal, View,
   Text, Image, Pressable, TextInput, Keyboard,
} from "react-native";

import {
   PageFooter, BottomNavigationBar, Fab, Press,
   Touch, 
} from "@/assets/modules/clb-modules";

import {
   colors, elevation,
} from "@/assets/modules/clb-colors";

import * as c from "@/assets/modules/clb-html";
import * as ea from "@/assets/modules/clb-ea";
import * as Form from "@/assets/modules/clb-form";
import * as CStore from "@/assets/modules/clb-dbs";
import { Icon } from "@/assets/modules/clb-icons";
import { _ } from "@/assets/modules/clb";

import { LinearGradient } from "expo-linear-gradient";

import { api_GetCEP } from "@/assets/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseDB, SaveDataOnFbRDB, GetDataFromFbRDB } from "@/FirebaseConfig";
import { GetFBData } from "@/assets/modules/clb-fb";

import uuid from "react-native-uuid";
import { ref, get, child, getDatabase } from "firebase/database";



/* == [ properties ]
== == == == == == == == == */
async function InsertDBs() {
   await AsyncStorage.setItem( "customer_dbs", JSON.stringify( [
      {
         name: "Débora", gender: "feminino"
      },
      {
         name: "Noely", gender: "feminino"
      },
      {
         name: "Bernardo", gender: "masculino"
      },
      {
         name: "Anselmo", gender: "masculino"
      },
   ] ) );
}
// InsertDBs();

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
export default function CustomersView( { ...props } ) {
   const 
      [ Customers, setCustomers ] = useState( [] )
      ,
      [ Clientes, setClientes ] = useState( "" )
      ,
      [ ModalVisibility, setModalVisibility ] = useState( false )
   ;

   async function fetchData() {
      try {
         const data = await AsyncStorage.getItem( "customer_dbs" );
         const json = await JSON.parse( data );
         console.log( "json: \n\n\n", json );
         setCustomers( json );
      } catch( err ) {
         console.log( "fetchData err: \n\n\n\n\n", err );
      }
   }

   useEffect( () => {
      fetchData();

      GetFBData( { 
         // ref: "customers/c8ee2bdd-850f-47d2-8ee3-c672ab9b57b2/Name",
         ref: "customers/c:32-904/Name",
         putValue: setClientes
      } );
   }, [] ); 
   




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
         Name: Name,
         Cellphone: Cellphone,
         Whatsapp: Whatsapp,
         Phone: Phone,
         Phone2: Phone2,
         Email: Email,
         Rg: Rg,
         Cpf: Cpf,
         Cep: Cep,
         Estate: Estate,
         Logradouro: Logradouro,
         Number: Number,
         Complemento: Complemento,
         District: District,
         City: City,
         Note: Note 
      }
      ,
      id_Name = useRef( null )
      ,
      id_form = useRef( null )
   ;
   
   
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
   
   
   async function SaveDBs( props ) {
      id_form.current.focus() && 
      Keyboard.dismiss();
      if( Name != "" ) {

         // Insert data to AsyncStorage
         await CStore.Save( 
            props.dbs_name, props.object 
         ).then( r => {
            inputs.forEach( i => i( "" ) );
            setModalVisibility( false );
            fetchData();
         } );

         SaveDataOnFbRDB( {
            ref: `customers/${ props.object.id }`,
            data: props.object,
            okMsg: "Enviado pra nuvem!",
            errMsg: "Deu ruim no envio mano!"
         } );
         
      } else {
         alert( "Digite o nome do seu cliente" );
      }
      // SaveDBs( { dbs_name: "customer_dbs", object: customersList } )
   }
   
   
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
               // output_value = snapshot.val().name;
               setCustomerName( snapshot.val().name );
            } else { console.log( props.PathsRef ); }
         } );
      } catch( err ) {
         console.log( "GetData() err: ", err );
      }
   }
   

   return( <>
      <LinearGradient
         colors={[ "#f5f5f5", "#e5e5e5", ]}
         style={[ { flex: 1, } ]}
      >
         <ScrollView style={{ flex: 1, backgroundColor: "transparent", }}>
            <c.Section bg="#e2f4fe00" style={{ flex: 1, paddingBottom: 75, }}>
               <c.Header>
                  <c.Content>
                     <Pressable onPress={ () => { GetFBCustomerName( { PathsRef: "customers/c:32-904/Name" } ) } }>
                        {/* <c.H2 >Clientes { CustomerName }</c.H2> */}
                        <c.H2 >Clientes { Clientes }</c.H2>
                     </Pressable>
                  </c.Content>
               </c.Header>
               <c.Section>
                  <c.Content gap={ 16 }>

                     { Customers != null ? 
                        Customers.map( customer => {
                           return( <>
                              <ea.UsersCard 
                                 key={ customer.id }
                                 name={ customer.Name }
                              />
                           </> );
                        } )
                        : 
                        console.log( "" )
                     }
                  </c.Content>
               </c.Section>
            </c.Section>
         </ScrollView>
      </LinearGradient>


      {/**
       * Fab btn
       * 
       */}
      <Press text="Cadastrar novo" 
      pressedText="Cadastrar agora" 
      style={[ s.fab, elevation.elevation ]}
      onPress={ () => {
         setModalVisibility( true );
      } }/>

   
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
                                    onPress={ async () => { await AsyncStorage.removeItem( "customer_dbs" ) } }
                                 />
                                 <Touch 
                                    touchSty={{
                                       backgroundColor: "#00559C",
                                    }}
                                    txtSty={{
                                       color: "#fff",
                                    }}
                                    txt="cadastrar"
                                    onPress={ () => { SaveDBs( { dbs_name: "customer_dbs", object: customersList } ) } }
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



   
