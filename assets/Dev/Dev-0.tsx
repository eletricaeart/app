

import React, { useState } from "react";

import {
   Header,
   PageFooter,
   BottomNavigationBar,
   Press,
   Drawer,
} from "@/assets/modules/clb-modules";

// import {
//    H1,
//    Section,
//    Content,
// } from "@/assets/modules/clb-html";
import * as c from "@/assets/modules/clb-html";
// import * as א from "@/assets/modules/clb-html";
/*
https://symbc.cc/en/unicode-table/#arabic
 * as 
µ
˯
ː
Ξ
Ͱ
·
א

*/

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   Modal,
   Pressable,
} from "react-native";

import {
   Icon,
} from "@/assets/modules/clb-icons";



export default function Dev_0( { ...props } ) {
   const 
      [ ModalVisibility, setModalVisibility ] = useState( false )
   ;

   /* return( <>
      <Header title="Dev"/>
      <View style={ s.root }>
         <Text style={ { flex: 1, color: "#fc0", } }>Dev</Text>
         <H1 color="#fff">React Native Paper: icon list</H1>
      </View>
      <Section >
         <Content >
            <H1>oi</H1>
         </Content>
      </Section>
   </> ); */
   return( <>
      <View style={ s.root }>
         <Text style={ { flex: 1, color: "#fc0", } }>Dev</Text>
         <c.H1 color="#fff">React Native Paper: icon list</c.H1>
      </View>

      <c.Section bg="#e5e5e5">
         <c.Header>
            <c.Content>
               <c.H3 color="#fc0fc0">Press</c.H3>
            </c.Content>
         </c.Header>
         <c.Content>
            <Press 
               f={ () => console.log( "oi" ) }
               text="Open Drawer"
               pressedText="ok"
            />
         </c.Content>
      </c.Section>

      <Drawer />

      <c.Section bg="#212329">
         <c.Section FontAwesome6>
            <c.Content>
               <c.H2 color="#27f">FontAwesome6: f</c.H2>
               <c.Section>
                  <c.Content >
                     <Icon i="f" name="people-group" size={24} color="white" />
                     <c.T color="#fff">people-group</c.T>
                  </c.Content>
                  <c.Content >
                     <Icon i="f" name="people-group" size={24} color="white" />
                     <c.T color="#fff">people-group</c.T>
                  </c.Content>
                  <c.Content >
                     <Icon i="f" name="file-invoice-dollar" size={24} color="white" />
                     <c.T color="#fff">file-invoice-dollar</c.T>
                  </c.Content>
                  <c.Content >
                     <Icon i="f" name="receipt" size={24} color="white" />
                     <c.T color="#fff">receipt</c.T>
                  </c.Content>
               </c.Section>
            </c.Content>
         </c.Section>

         <c.Section MaterialCommunityIcons>
            <c.Content>
               <c.H2 color="#27f">MaterialCommunityIcons: mc</c.H2>
               <c.Section>
                  <c.Content >
                     <Icon i="mc" name="receipt" size={24} color="white" />
                     <c.T color="#fff">receipt</c.T>
                  </c.Content>
                  <c.Content >
                     <Icon i="mc" name="electron-framework" size={24} color="white" />
                     <c.T color="#fff">electron-framework</c.T>
                  </c.Content>
               </c.Section>
            </c.Content>
         </c.Section>

         <c.Section MaterialIcons>
            <c.Content>
               <c.H2 color="#27f">MaterialIcons: mi</c.H2>
               <c.Section>
                  <c.Content >
                     <Icon i="mi" name="electric-bolt" size={24} color="white" />
                     <c.T color="#fff">electric-bolt</c.T>
                  </c.Content>
                  <c.Content >
                     <Icon i="mi" name="electrical-services" size={24} color="white" />
                     <c.T color="#fff">electrical-services</c.T>
                  </c.Content>
               </c.Section>
            </c.Content>
         </c.Section>

         <c.Section AntDesign>
            <c.Content>
               <c.H2 color="#27f">AntDesign</c.H2>
            </c.Content>
         </c.Section>

         <c.Section Ionicons>
            <c.Content>
               <c.H2 color="#27f">Ionicons</c.H2>
            </c.Content>
         </c.Section>

      </c.Section>


      {/* modal */}
      <c.Section bg="#245">
         <c.Header>
            <c.H2 color="#fff">Modal: RN</c.H2>
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

            <Modal visible={ ModalVisibility } 
               onRequestClose={ () => { setModalVisibility( false ) } }
               animationType="slide"
               presentationStyle="formSheet"
               style={{
                  backgroundColor: "#212329",
                  width: "80%",
               }}
            >
               <View style={{ backgroundColor: "#f5f5f5", padding: 18, 
                  borderRadius: 24,
               }}>
                  <Text style={{ color: "#27f", }}>Modal Screen</Text>
               </View>
               <View>
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
                              close modal
                              </Text>
                        </View>
                     </Pressable>
                  </c.Content>
               </View>
            </Modal>

         </c.Content>
      </c.Section>
   </> );
}

const 
   s = StyleSheet.create( {
      root: {
         backgroundColor: "#1b1d22",
         padding: 16,

      }
   } )
;