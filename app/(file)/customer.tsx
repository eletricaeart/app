

/** == [ @imports ] 
 * == == == == == == == == == */
import { AppbarStick, BackButton, Card, H1, H2, H3, P, } from "@/src/widgets/ui";
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
               <ImageBackground source={ require( "@/src/images/Avatar/default_avatar_masc_720p.webp" ) } 
                  // resizeMode="stretch" 
                  // resizeMode="center" 
                  // resizeMode="contain" 
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
                  <H2 style={{ color: "#555" }}>{ props.name || "Débora Maria Cruz Sammarco Nunes" }</H2>
               
                  <P style={{ color: "#777" }}>Rua Henrique Dias, 125 - Aviação Praia Grande - SP, 11702-600</P>
               </View>

               <Card style={{ padding: 22, backgroundColor: "#fff", gap: 20, }}>
                  <H3 style={{ color: "#27f" }}>Dados Pessoais</H3>
                  <FlatList data={ [ { rg: "41.445.792-4", cpf: "346.372.258-50", gender: "Ferminino" } ] }
                     renderItem={ ({item}) => <>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                           <H3 style={{ color: "#555" }}>RG </H3>
                           <P style={{ color: "#777" }}>{ item.rg }</P>
                        </View>

                        <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                        
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                           <H3 style={{ color: "#555" }}>CPF </H3>
                           <P style={{ color: "#777" }}>{ item.cpf }</P>
                        </View>

                        <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                        
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                           <H3 style={{ color: "#555" }}>Gênero </H3>
                           <P style={{ color: "#777" }}>{ item.gender }</P>
                        </View>
                     </> }
                  />
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