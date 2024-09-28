

import React from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { elevation } from "../clb-colors";


/** == [ Modal Card Center ] 
 * 
 * == == == == == == == == == */
export function ModalCardCenter( { ...props } ) {


   return(
      <Pressable style={{ 
         display: props.trigger ? "flex" : "none",
         backgroundColor: "#21232955",  
         position: "absolute", zIndex: 9,  width: "100%", height: "100%",
         alignSelf: "center", 
      }}
         
         onPress={ () => { props.setState( !props.useState ); } }
      >
         <Section style={{
            backgroundColor: "#27f0", flex: 1,
            alignItems: "center", justifyContent: "center",
         }}>
            <View style={{ 
               backgroundColor: "#e5e5e5" || props.bg, padding: 16, borderRadius: 24, 
               position: "absolute", zIndex: 9,  width: "90%",
               alignSelf: "center", elevation: 10,
            }}>
               { props.children }
            </View>
         </Section>
      </Pressable>
   );
}


/** == [ Modal Full Page ] 
 * 
 * == == == == == == == == == */
export function ModalFullPage( { ...props } ) {

   return(
      // <Modal visible={ props.ModalVisibility }  
      // onRequestClose={ () => { props.setModalVisibility( false ) } }
      <Modal visible={ props.ModalVisibility }  
         onRequestClose={ () => props.onRequestClose() }
         animationType="slide"
         presentationStyle="formSheet"
      >

      <Root style={[  ]}>
         {/* <ModalBody>
            <ScrollView keyboardShouldPersistTaps="handled">
               <BackSheet style={[ elevation.elevation ]} />
               <FrontSheet style={[ elevation.elevation, { backgroundColor: "#f5f5f5", flex: 1, } ]} >
                  { props.children }
               </FrontSheet>
            </ScrollView>  
               { props.overlay }    
         </ModalBody> */}
         <BackSheet style={[ elevation.elevation ]} />
         <FrontSheet style={[ elevation.elevation, { backgroundColor: "#f5f5f5", flex: 1, overflow: "hidden" } ]} >
            {/* <ScrollView keyboardShouldPersistTaps="handled"></ScrollView>   */}
               { props.children }
         </FrontSheet>
            { props.overlay }    
      </Root>
   </Modal>
   );
}


const 
   Section = styled.View``,
   BackSheet = styled.View`
      background-color: #959595;
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
      width: 90%;
      align-self: center;
      height: 15;
      margin-top: 10;
   `,
   FrontSheet = styled.View`
      background-color: #f5f5f5;
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
      width: 100%;
      align-self: center;

      flex: 1;
      overflow: hidden;
   `,
   Root = styled.View`
      background-color: #00559c;
      flex: 1;
      `,
   ModalBody = styled.View`
      flex: 1;
      width: 100%;
      height: 100%;
      background-color: #fff;
   `
;