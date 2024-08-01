

import React, { useEffect, useState} from "react";

import {
   StatusBar, StyleSheet, ScrollView, View, Text,
   Image, Modal, Pressable, Button, ActivityIndicator,
   Alert, TextInput, } from "react-native";

import { FirebaseApp, FirebaseDB, } from "@/FirebaseConfig";
import { getDatabase, get, child, ref, } from "firebase/database";

import {
   Header, PageFooter, BottomNavigationBar,
   Press, Drawer, } from "@/assets/modules/clb-modules";

import * as c from "@/assets/modules/clb-html";

import { BtnSquare01, } from "@/assets/modules/clb-svg";

import { Icon, } from "@/assets/modules/clb-icons";
import Svg, { Polygon } from "react-native-svg";

// FirebaseApp;

export default function Dev( { ...props } ) {
   const 
      [ ModalVisibility, setModalVisibility ] = useState( false )
      ,
      [ CEP, setCEP ] = useState( "" )
      ,
      [ LoginFormActivated, setLoginFormActivated ] = useState( true )
      ,
      [ InputRef, setInputRef ] = useState( "" )
      ,
      [ OutputRef, setOutputRef ] = useState( "" )
      ,
      [ InputData, setInputData ] = useState( "" )
   ;

   async function InsertRefInDB( props ) {
      try {
      } catch( err: any ) {
         console.log( "InsertInDB() err:\n\n\n", err );
      }
   }

   async function GetData() {
      try {
         const rs = await get( child( 
            ref( getDatabase() ),
            "Subtitle" 
         ) );

         return rs;
      } catch( err: any ) {
         console.log( err );
      }
   }

   useEffect( () => {
   }, [] );

   function HandleBtn() {

   }
   
   {/* modal */}
   return( <>
      <c.Section bg="#2450" style={{ flex: 1, }}>
         <c.Header>
            <c.Content>
            <c.H2 >Modal: RN</c.H2>
            </c.Content>
         </c.Header>
         <c.Content>
            <Pressable 
               onPress={ () => { setModalVisibility( !ModalVisibility ) } }
            >
               <View style={{
                  borderRadius: 24,
                  backgroundColor: "#29f",
                  padding: 16,
               }}>
                  <Text style={{
                     color: "#fff",
                     textAlign: "center",
                     fontWeight: "bold",
                     textTransform: "uppercase",
                     fontFamily: "GodOfThunder",
                  }}>
                     open modal
                     </Text>
               </View>
            </Pressable>

            <Pressable 
               style={{ elevation: 10, width: "100%", }} 
               // onPress={ () => { InsertRefInDB( {
               //    ref: "produtos", data: "name"
               // } ).then( () => { console.log( "produtos enviados ao db" ) } );  } }
               onPress={ () => { GetData().then( v => setOutputRef( v ) ) } }
            >
               <BtnSquare01 fill="#00559c" bg="#fff0"
               >
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff", }}>
                     mfionsoin
                  </Text>
               </BtnSquare01> 
            </Pressable>

         </c.Content>

         <c.Content bg="#16181c">
            <c.Section>
               <c.T color="#fff">Ref</c.T>
               <TextInput placeholder="ref" value={ InputRef } onChangeText={ setInputRef }
               style={{ color: "#777", backgroundColor: "#212329", height: 56, borderRadius: 18, marginTop: 8, marginBottom: 16, padding: 16, }}/>
            </c.Section>
            <c.Section>
               <c.T color="#fff">Data</c.T>
               <TextInput placeholder="data" value={ InputData } onChangeText={ setInputData }
               style={{ color: "#777", backgroundColor: "#212329", height: 56, borderRadius: 18, marginTop: 8, marginBottom: 16, padding: 16, }}/>
            </c.Section>
            <c.H4 color="#27f">ref: { OutputRef }</c.H4>
         </c.Content>

         <View style={{ width: "100%", backgroundColor: "#00559c",  }}>
            <Svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ }}> 
               <Polygon points="0 14, 14 0, 100 0, 100 86, 86 100, 0 100" fill={ "#0055c9" } 
               fillOpacity={ 1 }
               /> 
            </Svg> 
         </View>

      </c.Section>


      {/*  == [ Modal ]
      == == == == == == == == ==  */}
      <Modal visible={ ModalVisibility } 
         onRequestClose={ () => { setModalVisibility( false ) } }
         animationType="slide"
         presentationStyle="formSheet"
         style={ s.modal }
      >
         <View style={ s.modalHead }>
            <Text style={ s.modalHeadTT }>Modal Screen</Text>
         </View>
         <View>
            <c.Content>
               <Pressable 
                  onPress={ () => { setModalVisibility( !ModalVisibility ) } }
               >
                  <View style={ s.btn }>
                     <Text style={ s.btnTxt}>
                        close modal
                     </Text>
                  </View>
               </Pressable>
            </c.Content>

            <c.Content style={ s.modalContent }>
               {/* npx expo install axios */}

               <c.Section style={ s.form }>
                  <c.H4 color="#fc0">cep</c.H4>
                  <TextInput style={ s.input }
                  placeholder="11.702-600"
                  value=""
                  onChangeText={ text => setCEP( text ) }
                  keyboardType="name-phone-pad"
                  />

                  <c.Section style={ s.formFooter }>


                     <Press text="oi"
                     bg="#fc05" color="#fffc"
                     onPress={ () => {
                        setLoginFormActivated( !LoginFormActivated );
                     } }
                     />

                     <Press text="oi"
                     style={ s.press }
                     bg="#f27" color="#fffc"
                     onPress={ () => {} }
                     />

                  </c.Section>
               </c.Section>
               <c.H3>
                  { LoginFormActivated ? "Login here" : "Sign up here" }
               </c.H3>
            </c.Content>
            

         </View>
      </Modal>
   </> );
}

const 
   s = StyleSheet.create( {
      modal: {
         backgroundColor: "#212329",
         width: "80%",
      },
      modalHead: { backgroundColor: "#f5f5f5", padding: 18, 
         borderRadius: 24,
      },
      modalHeadTT: { color: "#27f", },
      btn: {
         borderRadius: 24,
         backgroundColor: "#29f",
         padding: 16,
      },
      btnTxt: {
         color: "#fff",
         textAlign: "center",
         fontWeight: "bold",
         textTransform: "uppercase",
      },
      modalContent: { backgroundColor: "#fff5" },
      form: {
         backgroundColor: "#f5f5f5",
         borderRadius: 24,
         padding: 18,
         gap: 8,
      },
      input: {
         borderRadius: 22,
         backgroundColor: "#fff",
         height: 56,
         padding: 16,
      },
      formFooter: {
         flexDirection: "row",
         justifyContent: "center",
         gap: 8,
      },
      press: {
         backgroundColor: "#fc0fc0",
      }
   } )
;