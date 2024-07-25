

import React, { useState} from "react";

import {
   Header,
   PageFooter,
   BottomNavigationBar,
   Press,
   Drawer,
} from "@/assets/modules/clb-modules";

import api from "@/assets/services/api";

import * as c from "@/assets/modules/clb-html";

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

import {
   Icon,
} from "@/assets/modules/clb-icons";


export default function Dev( { ...props } ) {
   const 
      [ ModalVisibility, setModalVisibility ] = useState( false )
      ,
      [ CEP, setCEP ] = useState( "" )
   ;

   {/* modal */}
   return( <>
      <c.Section bg="#245" style={{
         flex: 1,
         // minHeight: 750,
      }}>
         <c.Header>
            <c.Content>
            <c.H2 color="#fff">Modal: RN</c.H2>
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
                           onPress={ () => {} }
                           />

                           <Press text="oi"
                           style={ s.press }
                           bg="#f27" color="#fffc"
                           onPress={ () => {} }
                           />

                        </c.Section>
                     </c.Section>
                     
                  </c.Content>

               </View>
            </Modal>

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