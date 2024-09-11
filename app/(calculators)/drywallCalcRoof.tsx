

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
interface inputDataType_i {
   text: string | undefined;
   value: number | undefined;
}

interface ceilingSupport_i {
   type: string;
   qtd: number;
   displayQtd: string;
}

interface area_i {
   id: string | number[];

   length: number | undefined;
   width: number | undefined;
   area: number | undefined;
   perimetro: number | undefined;

   displayLength: string | undefined;
   displayWidth: string | undefined;
   displayArea: string;
   displayPerimetro: string;
}

interface materials_i {
   length: number;
   width: number;
   area: number;
   perimetro: number;
   chapas: number;
   tabicas: number;
   cantoneiras: number;
   perfis: number;
   reguladores: number;
   união: number;
   tirantes: number;
   pregos: number;
   gn25: number;
   lfix: number;
   parafusoMM: number;
   fitaTelada: number;
   massa: number;
   bandaAcústica: number;
   lãDeVidro: number;

   displayLength: string;
   displayWidth: string;
   displayArea: string;
   displayPerimetro: string;
   displayChapas: string;
   displayTabicas: string;
   displayCantoneiras: string;
   displayPerfis: string;
   displayTirantes: string;
   displayReguladores: string;
   displayUnião: string;
   displayPregos: string;
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
   const 
      [ SelectedCeilingSupportType, setSelectedCeilingSupportType ] = useState<string>( "Tabica" )
   ;
   const 
      [ MoreOptionsEnabled, setMoreOptionsEnabled ] = useState<boolean>( false )
   ;


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
      [ Length, setLength ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Width, setWidth ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Rebaixo, setRebaixo ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Area, setArea ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Perimetro, setPerimetro ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ PanelsNeeded, setPanelsNeeded ] = useState<string>()
      ,
      [ PanelsAreaNeeded, setPanelsAreaNeeded ] = useState<string>()
      ,
      [ GN25, setGN25 ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Tabicas, setTabicas ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Cantoneiras, setCantoneiras ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Tirantes, setTirantes ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Reguladores, setReguladores ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Perfis, setPerfis ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ União, setUnião ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Pregos, setPregos ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Lfix, setLfix ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ MetalMetal, setMetalMetal ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ Massa, setMassa ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ FitaTelada, setFitaTelada ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ BandaAcústica, setBandaAcústica ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ LãDeVidro, setLãDeVidro ] = useState<inputDataType_i>( 
         { text: "", value: 0 }
      )
      ,
      [ CeilingSupport, setCeilingSupport ] = useState<ceilingSupport_i>(
         { type: "Tabica", qtd: 0, displayQtd: "" }
      )
   ;

   async function DisplayMaterialsNeeded( materials ) {  
      try {
         const materialsNeeded = {
            length: 0,
            width: 0,
            area: 0,
            perimetro: 0,
            chapas: 0,
            tabicas: 0,
            cantoneiras: 0,
            perfis: 0,
            tirantes: 0,
            reguladores: 0,
            união: 0,
            gn25: 0,
            lfix: 0,
            parafusoMM: 0,
            pregos: 0,
            fitaTelada: 0,
            massa: 0,
            bandaAcústica: 0,
            lãDeVidro: 0,
         };

         materials.forEach( material => {
               materialsNeeded.length += material.length;
               materialsNeeded.width += material.width;
               materialsNeeded.area += material.area;
               materialsNeeded.perimetro += material.perimetro;
               materialsNeeded.chapas += material.chapas;
               materialsNeeded.tabicas += material.tabicas;
               materialsNeeded.cantoneiras += material.cantoneiras;
               materialsNeeded.perfis += material.perfis;
               materialsNeeded.tirantes += material.tirantes;
               materialsNeeded.reguladores += material.reguladores;
               materialsNeeded.união += material.união;
               materialsNeeded.gn25 += material.gn25;
               materialsNeeded.lfix += material.lfix;
               materialsNeeded.parafusoMM += material.parafusoMM;
               materialsNeeded.pregos += material.pregos;
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
         setGN25(
            { 
               text: materialsNeeded?.gn25.toString(), 
               value: materialsNeeded?.gn25
            } 
         );
         setTabicas(
            { 
               text: materialsNeeded?.tabicas.toString(), 
               value: materialsNeeded?.tabicas
            } 
         );
         setCantoneiras(
            { 
               text: materialsNeeded?.cantoneiras.toString(), 
               value: materialsNeeded?.cantoneiras
            } 
         );
         setPerfis(
            { 
               text: materialsNeeded?.perfis.toString(), 
               value: materialsNeeded?.perfis
            } 
         );
         setTirantes(
            { 
               text: materialsNeeded?.tirantes.toString(), 
               value: materialsNeeded?.tirantes
            } 
         );
         setReguladores(
            { 
               text: materialsNeeded?.reguladores.toString(), 
               value: materialsNeeded?.reguladores
            } 
         );
         setUnião(
            { 
               text: materialsNeeded?.união.toString(), 
               value: materialsNeeded?.união
            } 
         );
         setPregos(
            { 
               text: materialsNeeded?.pregos.toString(), 
               value: materialsNeeded?.pregos
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

               length: Length!.value,
               width: Width!.value,
               area: parseFloat( ( Width!.value! * Length!.value! ).toFixed( 2 ) ),
               perimetro: ( Length!.value! * 2 ) + ( Width!.value! * 2 ),
               
               displayLength: Length!.text,
               displayWidth: Width!.text,
               displayArea: ( ( Width!.value! * Length!.value! ) ).toFixed( 2 ).toString(),
               displayPerimetro: (( Length!.value! * 2 ) + ( Width!.value! * 2 )).toString(),
            }
         ;
         Areas.push( item );
         setWidth( { text: "", value: 0 } );
         setLength( { text: "", value: 0 } );

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
            CalculateDryWallRoof( data.length!, data.width! ).then( returned => {
               const material: materials_i = {
                  length: data.width!,
                  width: data.width!,
                  area: data.width! * data.length!,
                  perimetro: ( data.length! * 2 ) + ( data.width! * 2 ),
                  chapas: returned!.panelsNeeded!,
                  gn25: returned!.gn25Needed!,

                  tabicas: returned!.tabicasNeeded!,
                  cantoneiras: returned!.cantoneirasNeeded!,
                  perfis: returned!.perfisNeeded!,
                  tirantes: returned!.tirantesNeeded!,
                  reguladores: returned!.reguladoresNeeded!,
                  união: returned!.uniãoNeeded!,
                  pregos: returned!.pregosNeeded!,

                  lfix: returned!.lfixNeeded!,
                  parafusoMM: returned!.screwMMNeeded!,
                  fitaTelada: returned!.tapeNeeded!,
                  massa: returned!.massaNeeded!,
                  bandaAcústica: returned!.bandaAcústicaNeeded!,
                  lãDeVidro: returned!.lãDeVidroNeeded!,

                  displayLength: ( data.width! ).toString(),
                  displayWidth: ( data.width! ).toString(),
                  displayArea: ( data.width! * data.length! ).toString(),
                  displayPerimetro: ( ( data.length! * 2 ) + ( data.width! * 2 ) ).toString(),
                  displayChapas: ( returned?.panelsNeeded! ).toString(),
                  displayGn25: ( returned?.gn25Needed! ).toString(),

                  displayTabicas: ( returned?.tabicasNeeded! ).toString(),
                  displayCantoneiras: ( returned?.cantoneirasNeeded! ).toString(),
                  displayPerfis: ( returned?.perfisNeeded! ).toString(),
                  displayTirantes: ( returned?.tirantesNeeded! ).toString(),
                  displayReguladores: ( returned?.reguladoresNeeded! ).toString(),
                  displayUnião: ( returned?.uniãoNeeded! ).toString(),
                  displayPregos: ( returned?.pregosNeeded! ).toString(),
                  
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
                  <Input value={ Length?.text } 
                     onChangeText={ text => {
                        const t2n = parseFloat( text );
                        setLength( { text: text, value: t2n } ); 
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
                           selectedValue={ SelectedCeilingSupportType }
                           onValueChange={( itemValue, itemIndex ) =>
                              setSelectedCeilingSupportType( itemValue )
                           }
                           style={ s.picker }
                        >
                           <Picker.Item label="Tabica" value="Tabica" />
                           <Picker.Item label="Cantoneira 25.30" value="Cantoneira 25.30" />
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
               <AniButton text="Adicionar" bg={ Width?.text && Length?.text ? "#339" : "#555" }
                  onPress={ () => {
                     if( Width?.value && Length?.value ) {
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
                           <T1 style={{ color: "#e5e5e5", }}>Medidas dos </T1>
                        </Header>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 16, paddingTop: 8, paddingBottom: 8, paddingLeft: 8 }}>
                           <P style={{ flex: 1, color: "#999", paddingTop: 8, paddingBottom: 8, paddingLeft: 14, }}>comprimento </P>
                           <P style={{ flex: 1, color: "#999", paddingTop: 8, paddingBottom: 8, paddingLeft: 14, }}>largura </P>
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
                           <Input value={ item.displayLength } style={{ flex: 1, backgroundColor: "#16181c", color: "#eee" }} key={ `Item-length:${ item.id }` }/>
                           <Input value={ item.displayWidth } style={{ flex: 1, backgroundColor: "#16181c", color: "#eee" }} key={ `Item-width:${ item.id }` }/>
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
                           { CeilingSupport.displayQtd }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           { SelectedCeilingSupportType }
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
                           {  }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Perfil F530
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
                           Tirantes ( Arame 10 )
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
                           { GN25?.text }
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
                        <P style={[ s.tableQtdText ]}>
                           { GN25?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           União
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

                     <View style={[ s.tableRowEven ]}>
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

                     <View style={[ s.tableRowOdd ]}>
                        <P style={[ s.tableQtdText ]}>
                           { MetalMetal?.text }
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Prego
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