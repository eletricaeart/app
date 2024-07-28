

import React, { useState} from "react";

import {
   StatusBar,
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   Modal,
   Pressable,
   Button,
   ActivityIndicator,
   Alert,
   TextInput,
} from "react-native";

import { FirebaseApp, FirebaseDB, } from "@/FirebaseConfig";
import database from '@react-native-firebase/database';

import {
   Header,
   PageFooter,
   BottomNavigationBar,
   Press,
   Drawer,
} from "@/assets/modules/clb-modules";

import * as c from "@/assets/modules/clb-html";

import {
   BtnSquare01,
} from "@/assets/modules/clb-svg";

import {
   Icon,
} from "@/assets/modules/clb-icons";


FirebaseApp;

export default function Dev( { ...props } ) {
   const 
      [ ModalVisibility, setModalVisibility ] = useState( false )
      ,
      [ CEP, setCEP ] = useState( "" )
      ,
      [ LoginFormActivated, setLoginFormActivated ] = useState( true )
   ;

   async function InsertRefInDB( props ) {
      try {
         // database().ref( props.ref ).child( props.data );
         // FirebaseDB()
      } catch( err: any ) {
         console.log( "InsertInDB() err:\n\n\n", err );
      }
      
   }
   
   {/* modal */}
   return( <>
      <c.Section bg="#2450" style={{
         flex: 1,
         // minHeight: 750,
      }}>
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

            <Pressable style={{ elevation: 10, width: "100%", }} onPress={ () => { InsertRefInDB( {
               ref: "produtos", data: "name"
            } ).then( () => { console.log( "produtos enviados ao db" ) } );  } }>
               <BtnSquare01 fill="#00559c" bg="#fff0">
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff", }}>
                     mfionsoin
                  </Text>
               </BtnSquare01> 
            </Pressable>

         </c.Content>
      </c.Section>
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