

import React from "react";
import { Pressable, View } from "react-native";
import styled from "styled-components/native";



export default function ModalCenter( { ...props } ) {


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

const 
   Section = styled.View``
;