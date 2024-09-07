

/** == [ @imports ] 
 * == == == == == == == == == */
import { Header } from "@/src/widgets/clb-widgets";
import { AppbarStick, BackButton, Duo, H2, H3, H4, H5, Input, Label, LabelText, P } from "@/src/widgets/ui";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text,
   ScrollView, 
} from "react-native";


/** == [ properties ]
 * == == == == == == == == == */


/** == [ exports ]
 * == == == == == == == == == */
export default function DryWallCalculatorView( { ...props } ) {
   const 
      [ Length, setLength ] = useState<number | null>( 0 ),
      [ Width, setWidth ] = useState<number | null>( 0 ),
      [ Rebaixo, setRebaixo ] = useState<number | null>( 0 ),
      [ Area, setArea ] = useState<number | null>( 0 ),
      [ Perimetro, setPerimetro ] = useState<number | null>( 0 ),
      [ Chapas, setChapas ] = useState<number | null>( 0 ),
      [ Tabicas, setTabicas ] = useState<number | null>( 0 ),
      [ Perfis, setPerfis ] = useState<number | null>( 0 ),
      [ Tirantes, setTirantes ] = useState<number | null>( 0 ),
      [ Reguladores, setReguladores ] = useState<number | null>( 0 ),
      [ Uniões, setUniões ] = useState<number | null>( 0 ),
      [ GN25, setGN25 ] = useState<number | null>( 0 ),
      [ Lfix, setLfix ] = useState<number | null>( 0 ),
      [ MetalMetal, setMetalMetal ] = useState<number | null>( 0 ),
      [ FitaTelada, setFitaTelada ] = useState<number | null>( 0 ),
      [ Massa, setMassa ] = useState<number | null>( 0 )
   ;

   return( <>
      <Stack.Screen options={{ headerShown: true, title: "Cliente", statusBarColor: "#19497b",
         header: ({}) => ( <>
            <AppbarStick bg="#16181c">
               <BackButton bg="#fff2" color="#daa520" />
               <View
                  style={{
                     width: "100%",
                     height: "100%",
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  <H4 style={{ color: "#27f" }}>Forro de DryWall</H4>
               </View>
            </AppbarStick>
         </> )
      }} />
      <View style={ s.sheet }>
         <ScrollView 
            style={{
               flex: 1,
               width: "100%",
               // backgroundColor: "#f5f5f5"
               paddingTop: 60,
            }}
         >
            <View
               style={{
                  padding: 18,
               }}
            >
               <H2 style={{ color: "#f5f5f5" }}>Calculadora</H2>
            </View>
            <Duo style={{ flexDirection: "row", justifyContent: "space-between", }}>
               <Label style={{ width: "49%" }}>
                  <LabelText style={{ color: "#eee7" }}>Comprimento</LabelText>
                  <Input value={ Length } inputMode="numeric" style={{ height: 56 }}/>
               </Label>
               <Label style={{ width: "49%" }}>
                  <LabelText style={{ color: "#eee7" }}>Largura</LabelText>
                  <Input value={ Width } inputMode="numeric" style={{ height: 56 }}/>
               </Label>
            </Duo>
               <Label>
                  <LabelText style={{ color: "#eee7" }}>Rebaixo</LabelText>
                  <Input value={ Rebaixo } inputMode="numeric" style={{ height: 56 }}/>
               </Label>
            <Duo style={{ flexDirection: "row", justifyContent: "space-between", }}>
               <Label style={{ width: "49%" }}>
                  <LabelText style={{ color: "#eee7" }}>Área ( metro quadrado )</LabelText>
                  <Input value={ Area } inputMode="numeric" style={{ height: 56 }}/>
               </Label>
               <Label style={{ width: "49%" }}>
                  <LabelText style={{ color: "#eee7" }}>Perímetro ( metro linear )</LabelText>
                  <Input value={ Perimetro } inputMode="numeric" style={{ height: 56 }}/>
               </Label>
            </Duo>

            <View
               style={{
                  backgroundColor: "#515359",
                  borderRadius: 24,
                  overflow: "hidden",
                  marginTop: 36,
               }}
            >
               <View
                  style={{
                     backgroundColor: "#da0",
                     height: 46,
                     flexDirection: "row",
                     alignItems: "center"
                  }}
               >
                  <H5 style={{ width: "15%", textAlign: "center" }}>QTD</H5>
                  <H5 style={{ flex: 1, textAlign: "center" }}>Descrição</H5>
                  <H5 style={{ width: "15%", textAlign: "center" }}>R$ Unit.</H5>
                  <H5 style={{ width: "15%", textAlign: "center" }}>R$ Tot.</H5>
               </View>

               {/* body */}
               <View
                  style={{

                  }}
               >
                  <View
                     style={{
                        backgroundColor: "#515359",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        Chapas de gesso ST.
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
                  <View
                     style={{
                        backgroundColor: "#313339",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        Tabica branca 3m
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
                  <View
                     style={{
                        backgroundColor: "#515359",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        Perfil F-530
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
                  <View
                     style={{
                        backgroundColor: "#313339",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        Tirantes ( Arame 10 )
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
                  <View
                     style={{
                        backgroundColor: "#515359",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        Regulador
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
                  <View
                     style={{
                        backgroundColor: "#313339",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        união
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
                  <View
                     style={{
                        backgroundColor: "#515359",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        Parafusos GN 25
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
                  <View
                     style={{
                        backgroundColor: "#313339",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        Lfix
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
                  <View
                     style={{
                        backgroundColor: "#515359",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        Parafusos metal metal
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
                  <View
                     style={{
                        backgroundColor: "#313339",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        Fita telada
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
                  <View
                     style={{
                        backgroundColor: "#515359",
                        height: 36,
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", flex: 1, textAlign: "left" }}>
                        Massa para DryWall
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                     <P style={{ color: "#fff", width: "15%", textAlign: "center" }}>
                        {}
                     </P>
                  </View>
               </View>
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
         backgroundColor: "#1b1d22",
      },
   } )
;