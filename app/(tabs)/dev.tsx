

import React, { useEffect, useState} from "react";

import {
   StatusBar, StyleSheet, ScrollView, View, Text,
   Image, Modal, Pressable, Button, ActivityIndicator,
   Alert, TextInput, } from "react-native";

// import { FirebaseApp, FirebaseDB, } from "@/FirebaseConfig";
import { FirebaseApp, FirebaseDB, } from "@/FirebaseConfig";
import { getDatabase, get, child, ref, } from "firebase/database";

import useCustomersFB from "@/src/hooks/useCustomersFB";

import {
   Header, PageFooter, BottomNavigationBar,
   Press, Drawer, } from "@/src/widgets/clb-widgets";

import * as c from "@/src/widgets/clb-html";

import { BtnSquare01, } from "@/src/widgets/clb-svg";

import { Icon, } from "@/src/widgets/clb-icons";
import Svg, { Polygon } from "react-native-svg";

// FirebaseApp;

export default function Dev( { ...props } ) {
   const 
      { CustomersFB, Loading } = useCustomersFB( {} )
      ,
      [ ModalVisibility, setModalVisibility ] = useState( false )
      ,
      [ LoginFormActivated, setLoginFormActivated ] = useState( true )
      ,
      [ InputRef, setInputRef ] = useState( "" )
      ,
      [ OutputRef, setOutputRef ] = useState( "" )
      ,
      [ InputData, setInputData ] = useState( "" )
   ;
   // ;


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
               // onPress={  }
            >
               <BtnSquare01 fill="#00559c" bg="#fff0"
               >
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff", }}>
                     mfionsoin
                  </Text>
               </BtnSquare01> 
            </Pressable>

         </c.Content>

         <c.Content bg="#16181c" gap={ 16 }>
            { 
               CustomersFB && 
               CustomersFB.map( customer => {
                  return( 
                     <View key={ customer.key } style={{ backgroundColor: "#e5e5e5",
                        padding: 16, borderRadius: 22, gap: 14,
                      }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", }}>{ customer.name }</Text>
                        <Text style={{ fontSize: 16, }}>{ customer.email }</Text>
                        <Text style={{ fontSize: 16, }}>{ customer.id }</Text>
                     </View>
                  );
               } )
            }
            
         </c.Content>

         

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