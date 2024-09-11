

/** == [ @imports ] 
 * == == == == == == == == == */
import { CalculateDryWall, CalculateDryWallRoof } from "@/src/services/calculators";
import { Icon } from "@/src/widgets/clb-icons";
import { Header } from "@/src/widgets/clb-widgets";
import { AppbarStick, BackButton, Duo, H2, H3, H4, H5, Input, Label, LabelText, P, T1 } from "@/src/widgets/ui";
import { AniButton } from "@/src/widgets/ui/animated";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text,
   ScrollView,
   Pressable,
   FlatList,
   Switch, 
} from "react-native";
import uuid from "react-native-uuid";
import {Picker} from '@react-native-picker/picker';

/** == [ properties ]
 * == == == == == == == == == */
interface inputTextValue_i {
   text: string | undefined;
   value: number | undefined;
}

interface area_i {
   id: string | number[];

   width: number | undefined;
   height: number | undefined;
   area: number | undefined;
   perimetro: number | undefined;

   displayWidth: string | undefined;
   displayHeight: string | undefined;
   displayArea: string;
   displayPerimetro: string;
}

interface materials_i {
   width: number;
   height: number;
   area: number;
   perimetro: number;
   chapas: number;
   guias: number;
   montantes: number;
   gn25: number;
   lfix: number;
   parafusoMM: number;
   fitaTelada: number;
   massa: number;
   bandaAcústica: number;
   lãDeVidro: number;

   displayWidth: string;
   displayHeight: string;
   displayArea: string;
   displayPerimetro: string;
   displayChapas: string;
   displayGuias: string;
   displayMontantes: string;
   displayGn25: string;
   displayLfix: string;
   displayParafusoMM: string;
   displayFitaTelada: string;
   displayMassa: string;
   displayBandaAcústica: string;
   displayLãDeVidro: string;
   
}

/** == [ exports ]
 * == == == == == == == == == */
export default function DryWallCalculatorView( { ...props } ) {
   const [ SelectedMontante, setSelectedMontante ] = useState<string>( "Montantes de 70" );
   const [ MoreOptionsEnabled, setMoreOptionsEnabled ] = useState<boolean>( false );


   // switch banda acústica
   const 
      [ IsBandaAcústicaEnabled, setIsBandaAcústicaEnabled ] = useState<boolean>( false )
      ,
      toggleSwitch_bandaAcústica = () => setIsBandaAcústicaEnabled( prevState => !prevState )
   ;
   // switch lã de vidro
   const 
      [ IsLãDeVidroEnabled, setIsLãDeVidroEnabled ] = useState<boolean>( false )
      ,
      toggleSwitch_lãDeVidro = () => setIsLãDeVidroEnabled( prevState => !prevState )
   ;

   const 
      [ Areas, setAreas ] = useState<area_i []>( [] )
      ,
      [ MaterialsNeeded, setMaterialsNeeded ] = useState<materials_i[]>( [] )
      ,
      [ Width, setWidth ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Height, setHeight ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Area, setArea ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Perimetro, setPerimetro ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ PanelsNeeded, setPanelsNeeded ] = useState<string>()
      ,
      [ PanelsAreaNeeded, setPanelsAreaNeeded ] = useState<string>()
      ,
      [ Guias, setGuias ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Montantes, setMontantes ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ GN25, setGN25 ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Lfix, setLfix ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ MetalMetal, setMetalMetal ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Massa, setMassa ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ FitaTelada, setFitaTelada ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ BandaAcústica, setBandaAcústica ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
      ,
      [ LãDeVidro, setLãDeVidro ] = useState<inputTextValue_i>( 
         { text: "", value: 0 }
      )
   ;

   async function DisplayMaterialsNeeded( materials ) {  
      try {
         const materialsNeeded = {
            width: 0,
            height: 0,
            area: 0,
            perimetro: 0,
            chapas: 0,
            guias: 0,
            montantes: 0,
            gn25: 0,
            lfix: 0,
            parafusoMM: 0,
            fitaTelada: 0,
            massa: 0,
            bandaAcústica: 0,
            lãDeVidro: 0,
         };

         materials.forEach( material => {
               materialsNeeded.width += material.width;
               materialsNeeded.height += material.height;
               materialsNeeded.area += material.area;
               materialsNeeded.perimetro += material.perimetro;
               materialsNeeded.chapas += material.chapas;
               materialsNeeded.guias += material.guias;
               materialsNeeded.montantes += material.montantes;
               materialsNeeded.gn25 += material.gn25;
               materialsNeeded.lfix += material.lfix;
               materialsNeeded.parafusoMM += material.parafusoMM;
               materialsNeeded.fitaTelada += material.fitaTelada;
               materialsNeeded.massa += material.massa;
               materialsNeeded.bandaAcústica += material.bandaAcústica;
               materialsNeeded.lãDeVidro += material.lãDeVidro;
         } );

         setMaterialsNeeded( materials );
         
         setArea(
            { 
               text: materialsNeeded?.area.toString(), 
               value: materialsNeeded?.area 
            } 
         );
         setPerimetro(
            { 
               text: materialsNeeded?.perimetro.toString(), 
               value: materialsNeeded?.perimetro 
            } 
         );
         setPanelsNeeded( materialsNeeded.chapas.toString() );
         setGuias(
            { 
               text: materialsNeeded?.guias.toString(), 
               value: materialsNeeded?.guias 
            } 
         );
         setMontantes(
            { 
               text: materialsNeeded?.montantes.toString(), 
               value: materialsNeeded?.montantes 
            } 
         );
         setGN25(
            { 
               text: materialsNeeded?.gn25.toString(), 
               value: materialsNeeded?.gn25
            } 
         );
         setLfix(
            { 
               text: materialsNeeded?.lfix.toString(), 
               value: materialsNeeded?.lfix
            } 
         );
         setMetalMetal(
            { 
               text: materialsNeeded?.parafusoMM.toString(), 
               value: materialsNeeded?.parafusoMM
            } 
         );
         setMassa(
            { 
               text: materialsNeeded?.massa.toString(), 
               value: materialsNeeded?.massa
            } 
         );
         setFitaTelada(
            { 
               text: materialsNeeded?.fitaTelada.toString(), 
               value: materialsNeeded?.fitaTelada
            } 
         );
         setBandaAcústica(
            { 
               text: materialsNeeded?.bandaAcústica.toString(), 
               value: materialsNeeded?.bandaAcústica
            } 
         );
         setLãDeVidro(
            { 
               text: materialsNeeded?.lãDeVidro.toString(), 
               value: materialsNeeded?.lãDeVidro
            } 
         );

         console.log( "chapas: ", materialsNeeded?.chapas );

         console.log( "DisplayMaterialsNeeded( materials ) materials: ", materials );
      } catch( err: any ) {
         console.error( "DisplayMaterialsNeeded() err: \n\n\n", err );
      }
   }

   async function CreateAreaList() {
      try {
         const 
            item: area_i = {
               id: uuid.v4(),

               width: Width!.value,
               height: Height!.value,
               area: parseFloat( ( Width!.value! * Height!.value! ).toFixed( 2 ) ),
               perimetro: Width!.value!,
               
               displayWidth: Width!.text,
               displayHeight: Height!.text,
               displayArea: ( ( Width!.value! * Height!.value! ) ).toFixed( 2 ).toString(),
               displayPerimetro: Width!.value!.toString(),
            }
         ;
         Areas.push( item );
         setWidth( { text: "", value: 0 } );
         setHeight( { text: "", value: 0 } );

         console.log( "Areas[]: ", Areas );
      } catch( err: any ) {
         console.error( "CreateAreaList() err: \n\n\n", err );
      }
   }

   async function CreateMaterialsNeeded() {
      try {
         const 
            datas = [ ...Areas ]
            ,
            materials: materials_i[] = []
         ;

         datas.forEach( data => {
            CalculateDryWall( data.width!, data.height! ).then( returned => {
               const material: materials_i = {
                  width: data.width!,
                  height: data.width!,
                  area: data.width! * data.height!,
                  perimetro: data.width!,
                  chapas: returned!.panelsNeeded!,
                  guias: returned!.guiasNeeded!,
                  montantes: returned!.montantesNeeded!,
                  gn25: returned!.gn25Needed!,
                  lfix: returned!.lfixNeeded!,
                  parafusoMM: returned!.screwMMNeeded!,
                  fitaTelada: returned!.tapeNeeded!,
                  massa: returned!.massaNeeded!,
                  bandaAcústica: returned!.bandaAcústicaNeeded!,
                  lãDeVidro: returned!.lãDeVidroNeeded!,

                  displayWidth: ( data.width! ).toString(),
                  displayHeight: ( data.width! ).toString(),
                  displayArea: ( data.width! * data.height! ).toString(),
                  displayPerimetro: data.width!.toString(),
                  displayChapas: ( returned?.panelsNeeded! ).toString(),
                  displayGuias: ( returned?.guiasNeeded! ).toString(),
                  displayMontantes: ( returned?.montantesNeeded! ).toString(),
                  displayGn25: ( returned?.gn25Needed! ).toString(),
                  displayLfix: ( returned?.lfixNeeded! ).toString(),
                  displayParafusoMM: ( returned?.screwMMNeeded! ).toString(),
                  displayFitaTelada: ( returned?.tapeNeeded! ).toString(),
                  displayMassa: ( returned?.massaNeeded! ).toString(),
                  displayBandaAcústica: ( returned?.bandaAcústicaNeeded! ).toString(),
                  displayLãDeVidro: ( returned?.lãDeVidroNeeded! ).toString(),
               }

               materials.push( material );
               console.log( "CreateMaterialsNeeded() materials: ", materials );
               
            } );
         } );
         return materials;
      } catch( err: any ) { console.log( "CreateMaterialsNeeded() err: ", err ); }
   }

   useEffect( () => {
      let data = { area: 0, perimetro: 0 };

      Areas.forEach( item => {
         data.area += item.area;
         data.perimetro += item.perimetro;
      } );

      setArea( { text: data.area.toString(), value: data.area } );
      setPerimetro( { text: data.perimetro.toString(), value: data.perimetro } );

      console.log( "data.area:: ", data.area, "data.perimetro:: ", data.perimetro );
   }, [Areas.length] );

   return( <>
      <Stack.Screen options={{ headerShown: true, title: "Calculadora de DryWall", statusBarColor: "#16181c",
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
                  <H4 style={{ color: "#27f" }}>Divisória de DryWall</H4>
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
                  <LabelText style={[ s.labelText ]}>Largura</LabelText>
                  <Input value={ Width?.text } 
                     onChangeText={ text => {
                        const t2n = parseFloat( text );
                        setWidth( { text: text, value: t2n } ); 
                     } } 
                     inputMode="numeric" style={[ s.input, ]}
                  />
               </Label>
               <Label style={[ s.label ]}>
                  <LabelText style={[ s.labelText ]}>Altura</LabelText>
                  <Input value={ Height?.text } 
                     onChangeText={ text => {
                        const t2n = parseFloat( text );
                        setHeight( { text: text, value: t2n } ); 
                     } } 
                     inputMode="numeric" style={[ s.input, ]}
                  />
               </Label>
            </Duo>
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

            <View
               style={{

               }}
            >
               <H5 style={{ color: "#aaa", paddingLeft: 16, paddingTop: 16, paddingBottom: 16, }}
                  onPress={ () => setMoreOptionsEnabled( !MoreOptionsEnabled ) }
               >
                  Mais opções
               </H5>
               {  
                  MoreOptionsEnabled && <>
                     <View style={ s.pickerCapsule }>
                        <Picker
                           selectedValue={ SelectedMontante }
                           onValueChange={( itemValue, itemIndex ) =>
                              setSelectedMontante( itemValue )
                           }
                           style={ s.picker }
                        >
                           <Picker.Item label="Montantes de 90" value="Montantes de 90" />
                           <Picker.Item label="Montantes de 70" value="Montantes de 70" />
                           <Picker.Item label="Montantes de 48" value="Montantes de 48" />
                        </Picker>
                     </View>

                     <View style={{ flexDirection: "row", paddingTop: 8, alignItems: "center", justifyContent: "space-between", gap: 16, width: "90%", margin: "auto", paddingLeft: 8, paddingRight: 8, }}>
                        <P style={{ color: "#aaa" }}>Incluir banda acústica</P>
                        <Switch 
                           trackColor={{ false: '#767577', true: '#81b0ff' }}
                           thumbColor={ IsBandaAcústicaEnabled ? '#00559C' : '#f4f3f4' }
                           ios_backgroundColor="#3e3e3e"
                           onValueChange={ toggleSwitch_bandaAcústica }
                           value={ IsBandaAcústicaEnabled }
                        />
                     </View>

                     <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 16, width: "90%", margin: "auto", paddingLeft: 8, paddingRight: 8, }}>
                        <P style={{ color: "#aaa" }}>Incluir lã de vidro</P>
                        <Switch 
                           trackColor={{ false: '#767577', true: '#81b0ff' }}
                           thumbColor={ IsLãDeVidroEnabled ? '#00559C' : '#f4f3f4' }
                           ios_backgroundColor="#3e3e3e"
                           onValueChange={ toggleSwitch_lãDeVidro }
                           value={ IsLãDeVidroEnabled }
                        />
                     </View>
                  </> 
               }  
               <View style={ s.divisor }/>
            </View>

            <View style={[ {  padding: 18, gap: 24, } ]}>
               <AniButton text="Adicionar" bg={ Width?.text && Height?.text ? "#339" : "#555" }
                  onPress={ () => {
                     if( Width?.value && Height?.value ) {
                        CreateAreaList();
                     }
                  } }
               />
               <AniButton text="Calcular"
                  onPress={ () => {
                     CreateMaterialsNeeded().then( materials => {
                        DisplayMaterialsNeeded( materials );
                        console.log( "Calcular().then( DisplayMaterialsNeeded() materials: " );
                        console.table( materials );
                     } );
                  } }
               />
            </View>

            <View>
               {
                  Areas && 
                  <FlatList 
                     ListHeaderComponent={ <>
                        <Header bg="#1b1d22">
                           <T1 style={{ color: "#e5e5e5", }}>Medidas das paredes</T1>
                        </Header>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 16, paddingTop: 8, paddingBottom: 8, paddingLeft: 8 }}>
                           <P style={{ flex: 1, color: "#999", paddingTop: 8, paddingBottom: 8, paddingLeft: 14, }}>largura </P>
                           <P style={{ flex: 1, color: "#999", paddingTop: 8, paddingBottom: 8, paddingLeft: 14, }}>altura </P>
                           <P style={{ flex: 1, color: "#999", paddingTop: 8, paddingBottom: 8, paddingLeft: 14, }}>área </P>
                           <P style={{ flex: 1, color: "#999", paddingTop: 8, paddingBottom: 8, paddingLeft: 14, }}>linear </P>
                           <P style={{ flex: 1, color: "#999", paddingTop: 8, paddingBottom: 8, paddingLeft: 14, }}> </P>
                        </View>
                     </> }
                     data={ Areas }
                     renderItem={ ({item}) => <>
                        {/* <View
                           key={ item.id }
                           name={ item.name }
                           data={ item }
                        /> */}
                        <Label style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, }} key={ `Label-${ item.id }` }>
                           <Input value={ item.displayWidth } style={{ flex: 1, backgroundColor: "#16181c", color: "#eee" }} key={ `Item-width:${ item.id }` }/>
                           <Input value={ item.displayHeight } style={{ flex: 1, backgroundColor: "#16181c", color: "#eee" }} key={ `Item-height:${ item.id }` }/>
                           <Input value={ item.displayArea } style={{ flex: 1, backgroundColor: "#16181c", color: "#eee" }} key={ `Item-area:${ item.id }` }/>
                           <Input value={ item.displayPerimetro } style={{ flex: 1, backgroundColor: "#16181c", color: "#eee" }} key={ `Item-perimetro:${ item.id }` }/>
                           <Pressable
                              onPress={ () => {
                                 // console.log( "Areas.findIndex: ", Areas.findIndex( predicate => predicate.id == item.id ) );
                                 const bkp = Areas;
                                 bkp.splice( Areas.findIndex( predicate => predicate.id == item.id ), 1 );
                                 setAreas( bkp );
                                 setWidth( { text: "", value: 0 } );
                                 // console.log( "Areas.length: ", Areas.length, "item.id: ", item.id );
                              } }
                           >
                              <Icon name="trash" i="entypo" color="#f33"/>
                           </Pressable>
                        </Label>
                     </> }
                     keyExtractor={ item => item.id } 
                     ItemSeparatorComponent={ 
                        () => <View style={{ height: 2, }}/>
                     }
                     contentContainerStyle={{ 
                        width: "100%", 
                        marginTop: 24,
                        padding: 0, paddingBottom: 38, 
                     }}
                  />
               }
            </View>

            {/* table with materials needed */}
            <View style={{ paddingTop: 36, paddingBottom: 66, }}>
               {/* table head */}
               <View style={[ s.table ]}>
                  <View style={[ s.tableHeader ]}>
                     <H5 style={[ s.tableHeaderQtdText ]}>QTD</H5>
                     <H5 style={[ s.tableHeaderCenterText, ]}>Descrição</H5>
                     <H5 style={[ s.tableHeaderText ]}>R$ Unit.</H5>
                     <H5 style={[ s.tableHeaderText ]}>R$ Tot.</H5>
                  </View>

                  {/* table body */}
                  <View style={[]}>
                     <View style={[ s.tableRowEven ]}>
                        <P style={[ s.tableQtdText ]}>
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
                        <P style={[ s.tableQtdText ]}>
                           { Guias?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Guias
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowEven ]}>
                        <P style={[ s.tableQtdText ]}>
                           { Montantes?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           { SelectedMontante }
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                        <P style={[ s.tableText ]}>
                           {}
                        </P>
                     </View>
                     <View style={[ s.tableRowOdd ]}>
                        <P style={[ s.tableQtdText ]}>
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
                     <View style={[ s.tableRowEven ]}>
                        <P style={[ s.tableQtdText ]}>
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
                     <View style={[ s.tableRowOdd ]}>
                        <P style={[ s.tableQtdText ]}>
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
                     <View style={[ s.tableRowEven ]}>
                        <P style={[ s.tableQtdText ]}>
                           { FitaTelada?.text } m
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
                     <View style={[ s.tableRowOdd ]}>
                        <P style={[ s.tableQtdText ]}>
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
                     { IsBandaAcústicaEnabled && 
                        <View style={[ s.tableRowEven ]}>
                           <P style={[ s.tableQtdText ]}>
                              { BandaAcústica?.text } m
                           </P>
                           <P style={[ s.tableTextDescription ]}>
                              Banda Acústica
                           </P>
                           <P style={[ s.tableText ]}>
                              {}
                           </P>
                           <P style={[ s.tableText ]}>
                              {}
                           </P>
                        </View>
                     }
                     { IsLãDeVidroEnabled && 
                        <View style={[ IsBandaAcústicaEnabled ? s.tableRowOdd : s.tableRowEven ]}>
                           <P style={[ s.tableQtdText ]}>
                              { LãDeVidro?.text } m
                           </P>
                           <P style={[ s.tableTextDescription ]}>
                              Lã de vidro
                           </P>
                           <P style={[ s.tableText ]}>
                              {}
                           </P>
                           <P style={[ s.tableText ]}>
                              {}
                           </P>
                        </View>
                     }

                     {/* table footer */}
                     <View style={[ s.tableFooter ]}>
                        <H5 style={[ s.tableFooterText ]}>Área Total</H5>
                        <H5 style={[ s.tableFooterText, ]}>Linear Total</H5>
                        <H5 style={[ s.tableFooterTotalText ]}>Valor total R$</H5>
                     </View>
                     <View style={ s.tableFooterRow }>
                        <P style={[ s.tableFooterRowText ]}>
                           { Area.text }
                        </P>
                        <P style={[ s.tableFooterRowText ]}>
                           { Perimetro.text }
                        </P>
                        <P style={[ s.tableFooterRowTotalText ]}>
                           {  }
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
      tableHeaderQtdText: {
         color: "#27f",
         // width: "15%", 
         flex: .8,
         textAlign: "right",
      },
      tableHeaderCenterText: {
         color: "#27f",
         // width: "15%", 
         flex: 2,
         paddingLeft: 16,
         textAlign: "left",
      },
      tableHeaderText: {
         color: "#27f",
         // width: "15%", 
         flex: .8,
         textAlign: "center",
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
      tableQtdText: { fontSize: 15, color: "#fff", /* width: "15%" */ flex: .8, textAlign: "right", fontWeight: 300, },
      tableText: { fontSize: 15, color: "#fff", /* width: "15%" */ flex: .8, textAlign: "center", fontWeight: 300, },
      tableTextDescription: { fontSize: 15, color: "#ccc", flex: 2, textAlign: "left", fontWeight: 500, paddingLeft: 16, },
      
      tableFooter: {
         backgroundColor: "#16181c",
         height: 46,
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-around"
      },
      tableFooterText: {
         color: "#bbf",
      },
      tableFooterTotalText: {
         color: "#fb0",
      },
      tableFooterLinearText: {
         color: "#27f",
      },
      tableFooterRow: {
         backgroundColor: "#1b1d22",
         height: 46,
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-around"
      },
      tableFooterRowText: {
         color: "#fff",
         width: "100%",
         textAlign: "center",
      },
      tableFooterRowTotalText: {
         color: "#fff",
         fontWeight: "bold",
         width: "100%",
         textAlign: "center",
      },

      pickerCapsule: {
         width: "90%",
         height: 56,
         margin: "auto",
         borderRadius: 14, 
         overflow: "hidden", 
         backgroundColor: "#244", 
      },
      picker: {
         backgroundColor: "#1b1d22",
         width: "100%",
         // margin: "auto",
         borderRadius: 13,
         // height: 36,
         height: "100%",
         paddingLeft: 8,
         color: "#eee",
         borderColor: "#9995",
         overflow: "hidden",
      },
      pickerItem: {
         overflow: "hidden",
         backgroundColor: "#1b1d22",
         width: "90%",
         margin: "auto",
         borderRadius: 13,
         height: 36,
         paddingLeft: 8,
         color: "#eee",
         borderColor: "#9995",
      },
      divisor: { backgroundColor: "#eee3", width: "90%", height: 1, margin: "auto", marginTop: 16, marginBottom: 16, },

   } )
;