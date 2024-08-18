

import React, {
   useState, useEffect,
} from "react";

import {
   StyleSheet,
   View, Text,
   TextInput,
   Pressable,
   KeyboardAvoidingView,
   ImageBackground,
   Image,
} from "react-native";

import {
   Btn,
   Content,
   Input,
   Label, LabelText,
   Section,
   T2,
} from "@/src/widgets/ui";

import { BlurView } from 'expo-blur';


import { ActivityIndicator, Button } from "react-native-paper";

import { router } from "expo-router";
import TabLayout from "@/app/(tabs)/_layout";
import Index0 from "./(tabs)";

import * as CStore from "@/src/widgets/clb-dbs";
import { colors } from "@/src/widgets/clb-colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseApp, FirebaseAuth, SaveDataOnFbRDB,  } from "@/FirebaseConfig";
import { 
   signInWithEmailAndPassword, 
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   User,
   getAuth, 
   signOut,
} from "firebase/auth";
import { firebase } from "@react-native-firebase/database";

import {
   BtnSquare01,
} from "@/src/widgets/clb-svg";
import { get, child, ref, getDatabase } from "firebase/database";


export default function Index() {
   const 
      // bgImage = require( "@/src/images/bgs/bg_09.jpeg" )
      // ,
      [ User, setUser ] = useState<User | null>( null )
      ,
      [ Name, setName ] = useState( "" )
      ,
      [ Email, setEmail ] = useState( "" )
      ,
      [ Password, setPassword ] = useState( "" )
      ,
      [ Loading, setLoading ] = useState( false )
      ,
      [ IsLogin, setIsLogin ] = useState( true )
      ,
      auth = FirebaseAuth
      ,
      SignIn = async () => {
         let userCredential = {};
         const userInfo = {};

         setLoading( true );
         async function Handle() {
            try {
               const 
                  response = await signInWithEmailAndPassword( auth, Email, Password )
                  ,
                  userUid = response.user.uid
               ;

               console.log( "SigIn() response: \n\n\n", response );
               userCredential = { ...response };

               return response;
            }
            catch( err: any ) {
               console.log( "SignIn() catch err: \n\n\n", err );
               alert(
                  `Não consegui fazer seu login!\naconteceu esse erro aqui: \n${ err.message }`
               );
            }
            finally {
               console.log( `finally UserCredential: \n\n\n`, userCredential );

               if( User ) {
                  const json = JSON.stringify( User );
                  await AsyncStorage.setItem( "User", json );   
                  
               } else {
                  console.log( "{ empty }" );
               }

               setLoading( false );
            }
         }
         Handle().then( value => {
            async function CreateUserSpace() {
               const 
                  userData = {
                     name: await get( child( ref( getDatabase() ), `users/${ value?.user.uid }/name` ) ),
                     uid: value?.user.uid,
                  }
                  ,
                  userReady = JSON.stringify( userData )
               ;
               await CStore.StoreData( userReady, "user" );
            }
            CreateUserSpace();
         } );
      }
      ,
      SignUp = async () => {
         setLoading( true );
         async function Handle() {
            try {
               const 
                  response = await createUserWithEmailAndPassword( auth, Email, Password )
                  ,
                  userUid = response.user.uid
               ;

               console.log( "SigUp() response: \n\n\n", response );
               
               return response;
            }
            catch( err: any ) {
               console.log( "SignUp() err: \n\n\n", err );
               alert( `Deu ruim no cadastro!\n\ncódigo do erro: ${ err.code }\n${ err.message }` );
            }
            finally {
               setLoading( false );
            }
         }
         Handle().then( value => {
            async function CreateUserSpace() {
               const 
                  userData = {
                     name: Name,
                     uid: value?.user.uid,
                  }
                  ,
                  userReady = JSON.stringify( userData )
               ;
               SaveDataOnFbRDB( {
                  ref: `users/${ value.user.uid }/name`,
                  data: Name,
               } );
               SaveDataOnFbRDB( {
                  ref: `users/${ value.user.uid }/uid`,
                  data: value?.user.uid,
               } );
               await CStore.StoreData( userReady, "user" );
            }
            CreateUserSpace();
         } );
      }
      ,
      SaveUser2DBs = async () => {
         try {
            const 
               data = JSON.stringify( User )
            ;
            await AsyncStorage.setItem( "User", data );
            
            console.log( "SaveUser2DBs() User: \n\n\n", User );
            alert( `SaveUser2DBs() User: \n\n\n ${ User }` );
            
            alert( "Bem Vindo" );
            
         } catch( err ) {
            console.log( "\n\n== == == == == ==\nSaveUser2DBs() saving error: \n", err );
         }
      }
   ;



   async function FetchData( userUid: string ) {
      try {
         const 
            userInfo = {}
         ;
         await get( child( ref( getDatabase() ), `users/${ userUid }/name` ) )
         .then(
            name => { 
               // userInfo.name = name
               // setCustomersFB( list );
               // setLoading( false );
               return name;
            }
         );
      } catch( err: any ) {
         alert( `Deu ruim no FetchData() err: \ncode: ${err.code} \nmsg: ${err.message}` );
      }
   }




   useEffect( () => {
      onAuthStateChanged( FirebaseAuth, User => {
         console.log( "aqui[]: ", User );
         setUser( User ); 
      } );
   }, [] );

   useEffect( () => {
      async function load() {
         if( User ) {
            const jsn = JSON.stringify( User );
            await AsyncStorage.setItem( "User", jsn );
         }
      }
      load();
   }, [ User ] );

   // firebase.database().ref( "users" ).child( value.user.uid ).set( { name: name } );


   return( <>
      { !User ? 
      (
         <View style={ s.root } >
            <ImageBackground source={ require( "@/src/images/bgs/splash-login-720x1600.png" ) } resizeMode="cover" style={ s.bgImage }>
               <View behavior="padding" style={ [ s.root, { width: "100%", backgroundColor: "#fc0fc000", alignItems: "center", justifyContent: "flex-start", } ]}>
                  <View style={{ backgroundColor: "#27f7", width: "100%", height: "25%", alignItems: "center", justifyContent: "center", marginTop: 56, marginBottom: 56,
                     padding: 0,borderRadius: 1000, aspectRatio: 1, elevation: 15,
                   }}>
                     <Image source={ require( "@/src/images/EA/globo-de-plasma-700.png" ) } style={ { height: "100%", resizeMode: "contain", } }/>
                  </View>

               
                  {/* <Text style={ s.tt }>
                     { IsLogin ? "Entre" : "Cadastre-se" }
                  </Text> */}

               {/* <BlurView intensity={ 30 } style={ s.formBlur }> */}
                  <KeyboardAvoidingView behavior="position" 
                  style={[ 
                     // s.form, 
                     { width: "80%",
                        // backgroundColor: "#fff5", borderColor: "#fff", borderWidth: 2, 
                     } 
                  ]}>

                     <Label>
                        <LabelText>Nome</LabelText>
                        <Input 
                        placeholder="Nome"
                        value={ Name }
                        onChangeText={ ( text ) => setName( text ) }
                        keyboardType="default"
                        cursorColor={ "#00559C" }
                        />
                     </Label>
                     <Label>
                        <LabelText>Email</LabelText>
                        <Input 
                        placeholder="Email"
                        value={ Email }
                        onChangeText={ ( text ) => setEmail( text ) }
                        keyboardType="email-address"
                        cursorColor={ "#00559C" }
                        />
                     </Label>
                     <Label>
                        <LabelText>Password</LabelText>
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

               {/* </BlurView> */}
                  <View style={ s.footer }>
                     {
                        Loading ? (
                           <ActivityIndicator 
                           size="large" color="#00559c"
                           /> )
                           : 
                           ( <Section style={{ gap: 16, width: "80%", }}>
                           
                              <Pressable style={{ elevation: 10, width: "100%", }} onPress={ SignIn }>
                                 <Btn style={{ backgroundColor: "#00559c", }}>
                                    <T2 style={{ color: "#eee", }}>
                                       Acessar sua conta
                                    </T2>
                                 </Btn> 
                              </Pressable>

                              <Pressable style={{ elevation: 10, width: "100%", }} onPress={ SignUp }>
                                 <Btn>
                                    <T2 style={{ color: "#00559C", }}>
                                       Criar uma conta
                                    </T2>
                                 </Btn> 
                              </Pressable>

                           </Section> )
                     }
                  </View>
               </View>
            </ImageBackground>
         </View>
      )
      : 
      (
         <TabLayout />
         // <Index0 />
         /* <BottomNavigationBar /> */
      ) }
   </> );
}

const 
   s = StyleSheet.create( {
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