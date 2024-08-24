

/** == [ @imports ] 
 * == == == == == == == == == */
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text,
   ScrollView,
   TextInput,
   ImageBackground,
   Image,
   KeyboardAvoidingView,
   Pressable, 
} from "react-native";

import { ActivityIndicator, Button } from "react-native-paper";
import { Btn, BtnTxt, Input, Label, LabelText, Section } from "@/src/widgets/ui";


/** == [ properties ]
 * == == == == == == == == == */
const AuthView = () => {
   const 
      [ Name, setName ] = useState( "" )
      ,
      [ Email, setEmail ] = useState( "" )
      ,
      [ Password, setPassword ] = useState( "" )
      ,
      [ Loading, setLoading ] = useState( "" )

   ;

   return( <>
      <View style={[ { backgroundColor: "#212329", } ]}>
         <Text>SignInView</Text>
         
         <View style={ s.root } >
            <ImageBackground source={ require( "@/src/images/bgs/splash-login-720x1600.png" ) } resizeMode="cover" style={ s.bgImage }>
               <View behavior="padding" style={ [ s.root, { width: "100%", backgroundColor: "#fc0fc000", alignItems: "center", justifyContent: "flex-start", } ]}>
                  <View style={{ backgroundColor: "#27f7", height: "25%", aspectRatio: 1, alignItems: "center", justifyContent: "center", marginTop: 56, marginBottom: 56,
                     padding: 0,borderRadius: 1000, elevation: 15,
                   }}>
                     <Image source={ require( "@/src/images/EA/globo-de-plasma-700.png" ) } style={ { height: "100%", resizeMode: "contain", } }/>
                  </View>

               
                  <KeyboardAvoidingView behavior="position" 
                  style={[ { width: "80%", } ]}>

                     <Label>
                        <LabelText style={{ color: "#fff", textShadowColor: "#daa520", textShadowRadius: 5  }}>Nome</LabelText>
                        <Input 
                        placeholder="Nome"
                        value={ Name }
                        onChangeText={ ( text ) => setName( text ) }
                        keyboardType="default"
                        cursorColor={ "#00559C" }
                        />
                     </Label>
                     <Label>
                        <LabelText style={{ color: "#fff", textShadowColor: "#daa520", textShadowRadius: 5  }}>Email</LabelText>
                        <Input 
                        placeholder="Email"
                        value={ Email }
                        onChangeText={ ( text ) => setEmail( text ) }
                        keyboardType="email-address"
                        cursorColor={ "#00559C" }
                        />
                     </Label>
                     <Label>
                        <LabelText style={{ color: "#fff", textShadowColor: "#daa520", textShadowRadius: 5  }}>Password</LabelText>
                        <Input 
                        placeholder="Password"
                        secureTextEntry={ true }
                        value={ Password }
                        onChangeText={ ( text ) => setPassword( text ) }
                        keyboardType="default"
                        cursorColor={ "#00559C" }
                        />
                     </Label>
                  </KeyboardAvoidingView> 

                  <View style={ s.footer }>
                     {
                        Loading ? (
                           <ActivityIndicator 
                           size="large" color="#00559c"
                           /> )
                           : 
                           ( <Section style={{ gap: 16, width: "80%", }}>
                           
                              <Pressable style={{ elevation: 10, width: "100%", }} onPress={ () => {} }>
                                 <Btn style={{ backgroundColor: "#212329", }}>
                                    <BtnTxt style={{ color: "#eee", }}>
                                       Acessar sua conta
                                    </BtnTxt>
                                 </Btn> 
                              </Pressable>

                              <Pressable style={{ elevation: 10, width: "100%", }} onPress={ () => {} }>
                                 <Btn>
                                    <BtnTxt>
                                       Criar uma conta
                                    </BtnTxt>
                                 </Btn> 
                              </Pressable>

                           </Section> )
                     }
                  </View>
               </View>
            </ImageBackground>
         </View>

      </View>
   </> );
}

export default AuthView;

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
      bgImage: {
         flex: 1,
         alignItems: "center",
         justifyContent: "center",
         // backgroundColor: "#270"
         width: "100%",
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