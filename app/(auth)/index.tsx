

/** == [ @imports ] 
 * == == == == == == == == == */
import { Btn, BtnTxt, Input, Label, LabelText, Section } from "@/src/widgets/ui";
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text,
   ImageBackground,
   Image,
   KeyboardAvoidingView,
   Pressable, 
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {
   Link,
} from "@react-navigation/native";


/** == [ properties ]
 * == == == == == == == == == */


/** == [ exports ]
 * == == == == == == == == == */
export default function index( { ...props } ) {
   const 
      [ Name, setName ] = useState( "" )
      ,
      [ Email, setEmail ] = useState( "" )
      ,
      [ Password, setPassword ] = useState( "" )
      ,
      [ Loading, setLoading ] = useState( false )

   ;


   return( <>
      <View style={ s.root }>
         <ImageBackground source={ require( "@/src/images/bgs/splash-login-720x1600.png" ) } resizeMode="cover" style={ s.bgImage }>
            <View behavior="padding" style={ [ s.rootB ]}>
               <View style={[ s.vv ]}>
                  <Image source={ require( "@/src/images/EA/globo-de-plasma-700.png" ) } style={ { height: "100%", resizeMode: "contain", } }/>
               </View>

            
               <KeyboardAvoidingView behavior="position" style={[ { width: "80%", } ]}>

                  
                  
               </KeyboardAvoidingView> 

               <View style={ s.footer }>
                  {
                     Loading ? (
                        <ActivityIndicator size="large" color="#00559c"/> 
                     ) : ( 
                        <Section style={{ gap: 16, width: "80%", }}>
                        
                           <Pressable style={{ elevation: 10, width: "100%", }} onPress={ () => {} }>
                              <Btn style={{ backgroundColor: "#212329", }}>
                                 <Link to="/sign-in">
                                    <BtnTxt style={{ color: "#eee", }}>
                                       Acessar sua conta 
                                    </BtnTxt>
                                 </Link>
                              </Btn> 
                           </Pressable>

                           <Pressable style={{ elevation: 10, width: "100%", }} onPress={ () => {} }>
                              <Btn>
                                 <Link to="/sign-up">
                                    <BtnTxt>
                                       Criar uma conta
                                    </BtnTxt>
                                 </Link>
                              </Btn> 
                           </Pressable>

                        </Section> 
                     )
                  }
               </View>
            </View>
         </ImageBackground>
      </View>
   </> );
}


/** == [ StyleSheet ]
 * == == == == == == == == == */
const 
s = StyleSheet.create( {
   sheet: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "#270"
   },
   rootB: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%", backgroundColor: "#fc0fc000", 
   },
   bgImage: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "#270"
      width: "100%",
   },
   vv: { 
      backgroundColor: "#27f7", height: "25%", aspectRatio: 1, alignItems: "center", justifyContent: "center", marginTop: 56, marginBottom: 56,
      padding: 0,borderRadius: 1000, elevation: 15,
   },
   tt: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 24,
   },
   form: {
      backgroundColor: "#e5e5e5",
      width: "90%",
      borderRadius: 13,
      paddingBottom: 18,
   },
   formBlur: {
      // backgroundColor: "#e5e5e5",
      width: "90%",
      borderRadius: 13,
      paddingBottom: 18,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
   },
   label: {
      fontSize: 16,
      // color: "#160767",
      color: "#fff",
      fontWeight: "bold",
      // paddingLeft: 14,
      paddingLeft: 6,
   },
   input: {
      borderRadius: 13,
      backgroundColor: "#fff9",
      borderColor: "#7777",
      borderWidth: 1,
      paddingLeft: 14,
      paddingRight: 14,
      paddingTop: 8,
      paddingBottom: 8,
      color: "#000",
   },
   Label: {
      padding: 16, 
      gap: 7, 
   },
   footer: {
      // backgroundColor: "#fc0",
      width: "100%",
      margin: 16,
      padding: 16,
      gap: 16,
      alignItems: "center",
   },
   btn: {
      // width: "50%",
      elevation: 1,
   },
} )
;