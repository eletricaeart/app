

/** == [ @imports ] 
 * == == == == == == == == == */
import { AppbarStick, BackButton, Card, H1, H2, H3, P, } from "@/src/widgets/ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text,
   ScrollView,
   Image,
   ImageBackground,
   FlatList, 
} from "react-native";


/** == [ properties ]
 * == == == == == == == == == */

   

/** == [ exports ]
 * == == == == == == == == == */
export default function CustomerView( { ...props } ) {
   const 
      [ Customer, setCustomer ] = useState( {} )
      ,
      defaultPic = {
         fem: require( "@/src/images/Avatar/default_avatar_fem_720p.webp" ),
         masc: require( "@/src/images/Avatar/default_avatar_masc_720p.webp" )
      }
      
   ;

   async function GetCustomer() {
      try {
         const 
            json = await AsyncStorage.getItem( "customer" )
            ,
            customer = await JSON.parse( json )
         ;
         return customer;
      } catch( err: any ) {
         console.error( "GetCustomer() err: \n\n\n", err );
      }
   }

   async function SetCustomer() {
      try {
         await GetCustomer().then(
            returned => setCustomer( returned )
         );
      } catch( err: any ) {
         console.error( "SetCustomer() err: \n\n\n", err );
      }
   }
   
   useEffect( () => {
      SetCustomer();
   }, [] );


   return( <>
      <Stack.Screen options={{ headerShown: true, title: "Cliente", statusBarColor: "#19497b",
         header: ({}) => ( <>
            <AppbarStick>
               <BackButton bg="#fff2" color="#daa520" />
            </AppbarStick>
         </> )
      }} />
      <View style={ s.sheet }>
         <ScrollView 
            style={{
               width: "100%",
            }}
         >

            <View 
               style={{
                  // backgroundColor: "#d5d5d5",
                  width: "100%",
                  height: 250,
                  alignItems: "center",
                  justifyContent: "center",
               }}
            >
               <ImageBackground 
                  source={ 
                     Customer.profilePic || Customer.gender == "Masculino" ?
                     defaultPic.masc : defaultPic.fem
                  } 
                  resizeMode="cover" 
                  style={{
                     width: "100%",
                     height: "100%",
                  }} 
               />
            </View>

            <View 
               style={{
                  padding: 18,
                  gap: 36,
               }}
            >
               <View style={{ gap: 16 }}>
                  <H2 style={{ color: "#555" }}>{ Customer.name || "Débora Maria Cruz Sammarco Nunes" }</H2>
               
                  <P style={{ color: "#777" }}>Rua Henrique Dias, 125 - Aviação Praia Grande - SP, 11702-600</P>
               </View>

               <Card style={{ padding: 22, backgroundColor: "#fff", gap: 20, }}>
                  <H3 style={{ color: "#27f" }}>Dados Pessoais</H3>
                  {
                     Customer &&
                     <View>
                        <View key={ Customer.cpf }>
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>RG </H3>
                              <P style={{ color: "#777" }}>{ Customer.rg }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>CPF </H3>
                              <P style={{ color: "#777" }}>{ Customer.cpf }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Gênero </H3>
                              <P style={{ color: "#777" }}>{ Customer.gender }</P>
                           </View>
                        </View>
                     </View>
                  }
               </Card>

               <Card style={{ padding: 22, backgroundColor: "#fff", gap: 20, }}>
                  <H3 style={{ color: "#27f" }}>Contato</H3>
                  {
                     Customer &&
                     <View>
                        <View key={ Customer.cpf }>
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Celular </H3>
                              <P style={{ color: "#777" }}>{ Customer.cellphone }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>WhatsApp </H3>
                              <P style={{ color: "#777" }}>{ Customer.whatsapp }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Telefone </H3>
                              <P style={{ color: "#777" }}>{ Customer.phone }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Telefone secundário </H3>
                              <P style={{ color: "#777" }}>{ Customer.phone2 }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Email </H3>
                              <P style={{ color: "#777" }}>{ Customer.email }</P>
                           </View>
                        </View>
                     </View>
                  }
               </Card>

               <Card style={{ padding: 22, backgroundColor: "#fff", gap: 20, }}>
                  <H3 style={{ color: "#27f" }}>Endereço</H3>
                  {
                     Customer &&
                     <View>
                        <View key={ Customer.cep }>
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>CEP </H3>
                              <P style={{ color: "#777" }}>{ Customer.cep }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Rua </H3>
                              <P style={{ color: "#777" }}>{ Customer.logradouro }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Número </H3>
                              <P style={{ color: "#777" }}>{ Customer.number }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Complemento </H3>
                              <P style={{ color: "#777" }}>{ Customer.complemento }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Bairro </H3>
                              <P style={{ color: "#777" }}>{ Customer.district }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Cidade </H3>
                              <P style={{ color: "#777" }}>{ Customer.city }</P>
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Estado </H3>
                              <P style={{ color: "#777" }}>{ Customer.uf }</P>
                           </View>
                        </View>
                     </View>
                  }
               </Card>

               <H3 style={{ color: "#daa520" }}>Informações adicionais</H3>

               <Card style={{ padding: 22, backgroundColor: "#fff", gap: 20, }}>
                  <H3 style={{ color: "#27f" }}>Anotações</H3>
                  {
                     Customer &&
                     <View>
                        <View key={ Customer.cep }>
                           { Customer && Customer.notes }
                        </View>
                     </View>
                  }
               </Card>

               <H3 style={{ color: "#daa520" }}>Serviços</H3>

               <Card style={{ padding: 22, backgroundColor: "#fff", gap: 20, }}>
                  <H3 style={{ color: "#27f" }}>Orçamentos</H3>
                  {
                     Customer &&
                     <View>
                        <View key={ Customer.cep }>
                           {/* { Customer && Customer. } */}
                        </View>
                     </View>
                  }
               </Card>

               <Card style={{ padding: 22, backgroundColor: "#fff", gap: 20, }}>
                  <H3 style={{ color: "#27f" }}>Recibos</H3>
                  {
                     Customer &&
                     <View>
                        <View key={ Customer.cep }>
                           {/* { Customer && Customer. } */}
                        </View>
                     </View>
                  }
               </Card>
            </View>

         </ScrollView>
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
   } )
;