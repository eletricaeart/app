

/** == [ @imports ] 
 * == == == == == == == == == */
import { CalculateDryWallRoof } from "@/src/services/calculators";
import { Header } from "@/src/widgets/clb-widgets";
import { AppbarStick, BackButton, Duo, H2, H3, H4, H5, Input, Label, LabelText, P } from "@/src/widgets/ui";
import { AniButton } from "@/src/widgets/ui/animated";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text,
   ScrollView, 
} from "react-native";
import { parse } from "react-native-svg";


/** == [ properties ]
 * == == == == == == == == == */
interface inputTextValue_i {
   text: string;
   value: number;
}

/** == [ exports ]
 * == == == == == == == == == */
export default function DryWallRoofCalculatorView( { ...props } ) {
   const 
      [ Length, setLength ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Width, setWidth ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Rebaixo, setRebaixo ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Area, setArea ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Perimetro, setPerimetro ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ PanelsNeeded, setPanelsNeeded ] = useState<string | undefined>(),
      [ Tabicas, setTabicas ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Perfis, setPerfis ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Tirantes, setTirantes ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Reguladores, setReguladores ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Uniões, setUniões ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ GN25, setGN25 ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Lfix, setLfix ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Pregos, setPregos ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ MetalMetal, setMetalMetal ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ FitaTelada, setFitaTelada ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } ),
      [ Massa, setMassa ] = useState<inputTextValue_i | undefined>( { text: "", value: 0 } )
   ;

   async function Calculate( Length: number, Width: number, Rebaixo: number ) {
      try {
         const data = CalculateDryWallRoof( Length, Width, Rebaixo ).then( r => { 
            setArea( { text: r.roofArea.toString(), value: parseFloat( r.roofArea ) } );
            setPerimetro( { text: r.roofPerimetro.toString(), value: parseFloat( r.roofPerimetro ) } );
            setPanelsNeeded( r.panelsNeeded.toString() );
            setTabicas( { text: r.tabicasNeeded.toString(), value: parseFloat( r.tabicasNeeded ) } );
            setPerfis( { text: r.perfisNeeded.toString(), value: parseFloat( r.perfisNeeded ) } );
            setTirantes( { text: r.tirantesNeeded.toString(), value: parseFloat( r.tirantesNeeded ) } );
            setReguladores( { text: r.reguladoresNeeded.toString(), value: parseFloat( r.reguladoresNeeded ) } );
            setUniões( { text: r.uniõesNeeded.toString(), value: parseFloat( r.uniõesNeeded  ) } );
            setGN25( { text: r.gn25Needed.toString(), value: parseFloat( r.gn25Needed ) } );
            setLfix( { text: r.lfixNeeded.toString(), value: parseFloat( r.lfixNeeded ) } );
            setPregos( { text: r.pregosNeeded.toString(), value: parseFloat( r.pregosNeeded ) } );
            setMetalMetal( { text: r.screwMMNeeded.toString(), value: parseFloat( r.screwMMNeeded ) } );
            setFitaTelada( { text: r.tapeNeeded.toString(), value: parseFloat( r.tapeNeeded  ) } );
            setMassa( { text: r.massaNeeded.toString(), value: parseFloat( r.massaNeeded ) } );
            console.log( "PanelsNeeded: ", parseFloat( r.panelsNeeded ) );
         } );
      } catch( err: any ) {
         console.error( "Calculate() err: \n\n\n", err );
      }
   }

   return( <>
      <Stack.Screen options={{ headerShown: true, title: "Cliente", statusBarColor: "#16181c",
         header: ({}) => ( <>
            <AppbarStick bg="#16181c">
               <BackButton bg="#21232933" color="#daa520" />
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
         <ScrollView keyboardShouldPersistTaps="handled" style={[ s.scrollview ]}>
            <View style={{ padding: 18, }}>
               <H2 style={{ color: "#f5f5f5" }}>Calculadora</H2>
            </View>
            <Duo style={[ s.duo ]}>
               <Label style={[ s.label ]}>
                  <LabelText style={[ s.labelText ]}>Comprimento</LabelText>
                  <Input value={ Length?.text } 
                     onChangeText={ text => {
                        const t2n = parseFloat( text );
                        setLength( { text: text, value: t2n } ); 
                     } } 
                     inputMode="numeric" style={[ s.input, ]}
                  />
               </Label>
               <Label style={[ s.label ]}>
                  <LabelText style={[ s.labelText ]}>Largura</LabelText>
                  <Input value={ Width?.text } 
                     onChangeText={ text => {
                        const t2n = parseFloat( text );
                        setWidth( { text: text, value: t2n } ); 
                     } } 
                     inputMode="numeric" style={[ s.input, ]}
                  />
               </Label>
            </Duo>
               <Label>
                  <LabelText style={[ s.labelText ]}>Rebaixo</LabelText>
                  <Input value={ Rebaixo?.text } 
                     onChangeText={ text => {
                        const t2n = parseFloat( text );
                        setRebaixo( { text: text, value: t2n } ); 
                     } } 
                     inputMode="numeric" style={[ s.input, ]}
                  />
               </Label>
            <Duo style={[ s.duo ]}>
               <Label style={[ s.label ]}>
                  <LabelText style={[ s.labelText ]}>Área ( metro quadrado )</LabelText>
                  <Input value={ Area?.text } 
                     onChangeText={ text => {
                        const t2n = parseFloat( text );
                        setArea( { text: text, value: t2n } ); 
                     } } 
                     inputMode="numeric" style={[ s.input, ]}
                  />
               </Label>
               <Label style={[ s.label ]}>
                  <LabelText style={[ s.labelText ]}>Perímetro ( metro linear )</LabelText>
                  <Input value={ Perimetro?.text } 
                     onChangeText={ text => {
                        const t2n = parseFloat( text );
                        setPerimetro( { text: text, value: t2n } ); 
                     } } 
                     inputMode="numeric" style={[ s.input, ]}
                  />
               </Label>
            </Duo>

            <View style={[ {  padding: 18, } ]}>
               <AniButton text="Calcular"
                  onPress={ () => {
                     const value = Calculate( Length!.value, Width!.value, Rebaixo!.value );

                     console.log( "calculate() value: ", value );
                  } }
               />
            </View>

            <View style={{ paddingTop: 36, paddingBottom: 66, }}>
               <View style={[ s.table ]}>
                  <View style={[ s.tableHeader ]}>
                     <H5 style={[ s.tableHeaderText ]}>QTD</H5>
                     <H5 style={[ s.tableHeaderText, { flex: 1, textAlign: "center" }]}>Descrição</H5>
                     <H5 style={[ s.tableHeaderText ]}>R$ Unit.</H5>
                     <H5 style={[ s.tableHeaderText ]}>R$ Tot.</H5>
                  </View>

                  {/* table body */}
                  <View style={[]}>
                     <View style={[ s.tableRowEven ]}>
                        <P style={[ s.tableText ]}>
                           { PanelsNeeded }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Chapas de gesso ST.
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowOdd ]}>
                        <P style={[ s.tableText ]}>
                           { Tabicas?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Tabica branca 3m
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowEven ]}>
                        <P style={[ s.tableText ]}>
                           { Perfis?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Perfil F-530
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowOdd ]}>
                        <P style={[ s.tableText ]}>
                           { Tirantes?.text } kg
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Tirantes ( Arame 10 )
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View  style={[ s.tableRowEven ]}>
                        <P style={[ s.tableText ]}>
                           { Reguladores?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Regulador
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowOdd ]}>
                        <P style={[ s.tableText ]}>
                           { Uniões?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           união
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowEven ]}>
                        <P style={[ s.tableText ]}>
                           { GN25?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Parafusos GN 25
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowOdd ]}>
                        <P style={[ s.tableText ]}>
                           { Lfix?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Lfix
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowEven ]}>
                        <P style={[ s.tableText ]}>
                           { MetalMetal?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Parafusos metal metal
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowOdd ]}>
                        <P style={[ s.tableText ]}>
                           { FitaTelada?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Fita telada
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowEven ]}>
                        <P style={[ s.tableText ]}>
                           { Massa?.text } kg
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Massa para DryWall
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowOdd ]}>
                        <P style={[ s.tableText ]}>
                           { Pregos?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Pregos
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                  </View>
               </View>
            </View>
            <View style={{  }}></View>
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
         backgroundColor: "#212329",
      },
      scrollview: {
         flex: 1,
         width: "100%",
         backgroundColor: "#212329",
         paddingTop: 60,
      },
      duo: { flexDirection: "row", justifyContent: "space-between", },
      label: { flex: 1 },
      labelText: { color: "#eee7" },
      input: { backgroundColor: "#1b1d22", color: "#eee", height: 56 },

      table: {
         // backgroundColor: "#515359",
         borderRadius: 24,
         width: "95%",
         marginLeft: "auto",
         marginRight: "auto",
         overflow: "hidden",
         borderColor: "#daa52070",
         borderWidth: 1,
      },
      tableHeader: {
         backgroundColor: "#16181c",
         height: 46,
         flexDirection: "row",
         alignItems: "center"
      },
      tableHeaderText: {
         color: "#27f",
         width: "15%", textAlign: "center",
      },
      tableRowOdd: {
         // backgroundColor: "#515359",
         backgroundColor: "#ffffff15",
         height: 36,
         flexDirection: "row",
         alignItems: "center"
      },
      tableRowEven: {
         backgroundColor: "#ffffff05",
         height: 36,
         flexDirection: "row",
         alignItems: "center"
      },
      tableText: { color: "#fff", width: "15%", textAlign: "center" },
      tableTextDescription: { color: "#fff", flex: 1, textAlign: "left" },
   } )
;