

/** == [ @imports ] 
 * == == == == == == == == == */
import { CalculateDryWall, CalculateDryWallRoof } from "@/src/services/calculators";
import { Icon } from "@/src/widgets/clb-icons";
import { Header } from "@/src/widgets/clb-widgets";
import { AppbarStick, BackButton, Duo, H2, H3, H4, H5, Input, Label, LabelText, P, PP, T1 } from "@/src/widgets/ui";
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
type Strumber = {
   text: string;
   value: number;
}

type drywall_type = {
   cantoneiras: Strumber;
   tabicas: Strumber;
}

interface inputDataType_i {
   text: string | undefined;
   value: number | undefined;
}

interface ceilingSupport_i {
   type: string;
   qtd: Strumber;
}

interface area_i {
   id: string | number[];

   length: Strumber;
   width: Strumber;
   area: Strumber;
   perimetro: Strumber;
}

interface materials_i {
   length: Strumber;
   width: Strumber;
   area: Strumber;
   perimetro: Strumber;
   chapas: Strumber;
   tabicas: Strumber;
   cantoneiras: Strumber;
   perfis: drywall_type;
   reguladores: drywall_type;
   união: drywall_type;
   tirantes: {
      qtd: drywall_type;
      metros: drywall_type;
   };
   pregos: Strumber;
   gn25: Strumber;
   lfix: drywall_type;
   parafusoMM: drywall_type;
   fitaTelada: Strumber;
   massa: Strumber;
   bandaAcústica: Strumber;
   lãDeVidro: Strumber;
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
      [ Length, setLength ] = useState<inputDataType_i>()
      ,
      [ Width, setWidth ] = useState<inputDataType_i>()
      ,
      [ Rebaixo, setRebaixo ] = useState<inputDataType_i>()
      ,
      [ Area, setArea ] = useState<inputDataType_i>()
      ,
      [ Perimetro, setPerimetro ] = useState<inputDataType_i>()
      ,
      [ PanelsNeeded, setPanelsNeeded ] = useState<string>()
      ,
      [ GN25, setGN25 ] = useState<inputDataType_i>()
      ,
      [ Tabicas, setTabicas ] = useState<inputDataType_i>()
      ,
      [ Cantoneiras, setCantoneiras ] = useState<inputDataType_i>()
      ,
      // [ Tirantes, setTirantes ] = useState<inputDataType_i>( 
      //    { text: "", value: 0 }
      // )
      [ Tirantes, setTirantes ] = useState<
         { qtd: drywall_type; metros: drywall_type }
      >()
      ,
      [ Reguladores, setReguladores ] = useState<drywall_type>()
      ,
      [ Perfis, setPerfis ] = useState<drywall_type>()
      ,
      [ União, setUnião ] = useState<drywall_type>()
      ,
      [ Pregos, setPregos ] = useState<inputDataType_i>()
      ,
      [ Lfix, setLfix ] = useState<drywall_type>()
      ,
      [ MetalMetal, setMetalMetal ] = useState<drywall_type>()
      ,
      [ Massa, setMassa ] = useState<inputDataType_i>()
      ,
      [ FitaTelada, setFitaTelada ] = useState<Strumber>()
      ,
      [ BandaAcústica, setBandaAcústica ] = useState<inputDataType_i>()
      ,
      [ LãDeVidro, setLãDeVidro ] = useState<inputDataType_i>()
      ,
      [ CeilingSupport, setCeilingSupport ] = useState<ceilingSupport_i>()
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
            perfis_cantoneiras: 0,
            perfis_tabicas: 0,
            tirantes_cantoneiras_qtd: 0,
            tirantes_cantoneiras_metros: 0,
            tirantes_tabicas_qtd: 0,
            tirantes_tabicas_metros: 0,
            reguladores_cantoneiras: 0,
            reguladores_tabicas: 0,
            união_cantoneiras: 0,
            união_tabicas: 0,
            gn25: 0,
            lfix_cantoneiras: 0,
            lfix_tabicas: 0,
            parafusoMM_cantoneiras: 0,
            parafusoMM_tabicas: 0,
            pregos: 0,
            fitaTelada: 0,
            massa: 0,
            bandaAcústica: 0,
            lãDeVidro: 0,
         };

         materials.forEach( material => {
            console.log( "oi material: \n\n\n", material );
            console.log( "oi materialsNeeded: \n\n\n", materialsNeeded );
               materialsNeeded.length += material.length.value;
               materialsNeeded.width += material.width.value;
               materialsNeeded.area += material.area.value;
               materialsNeeded.perimetro += material.perimetro.value;
               materialsNeeded.chapas += material.chapas.value;
               materialsNeeded.tabicas += material.tabicas.value;
               materialsNeeded.cantoneiras += material.cantoneiras.value;
               materialsNeeded.pregos += material.pregos.value;
               materialsNeeded.fitaTelada += material.fitaTelada.value;
               materialsNeeded.massa += material.massa.value;
               materialsNeeded.bandaAcústica += material.bandaAcústica.value;
               materialsNeeded.gn25 += material.gn25.value;
               materialsNeeded.lãDeVidro += material.lãDeVidro.value;

               materialsNeeded.perfis_cantoneiras += material.perfis.cantoneiras.value;
               materialsNeeded.perfis_tabicas += material.perfis.tabicas.value;
               materialsNeeded.tirantes_cantoneiras_qtd += material.tirantes.qtd.cantoneiras.value;
               materialsNeeded.tirantes_cantoneiras_metros += material.tirantes.metros.cantoneiras.value;
               materialsNeeded.tirantes_tabicas_qtd += material.tirantes.qtd.tabicas.value;
               materialsNeeded.tirantes_tabicas_metros += material.tirantes.metros.tabicas.value;
               materialsNeeded.reguladores_cantoneiras += material.reguladores.cantoneiras.value;
               materialsNeeded.reguladores_tabicas += material.reguladores.tabicas.value;
               materialsNeeded.união_cantoneiras += material.união.cantoneiras.value;
               materialsNeeded.união_tabicas += material.união.tabicas.value;
               materialsNeeded.lfix_cantoneiras += material.lfix.cantoneiras.value;
               materialsNeeded.lfix_tabicas += material.lfix.tabicas.value;
               materialsNeeded.parafusoMM_cantoneiras += material.parafusoMM.cantoneiras.value;
               materialsNeeded.parafusoMM_tabicas += material.parafusoMM.tabicas.value;
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
         setPregos(
            { 
               text: materialsNeeded?.pregos.toString(), 
               value: materialsNeeded?.pregos
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


         setPerfis(
            { 
               cantoneiras: {
                  text: materialsNeeded?.perfis_cantoneiras.toString(),
                  value: materialsNeeded?.perfis_cantoneiras
               },
               tabicas: {
                  text: materialsNeeded?.perfis_tabicas.toString(),
                  value: materialsNeeded?.perfis_tabicas
               }
            } 
         );
         setReguladores(
            { 
               cantoneiras: {
                  text: materialsNeeded?.reguladores_cantoneiras.toString(),
                  value: materialsNeeded?.reguladores_cantoneiras
               },
               tabicas: {
                  text: materialsNeeded?.reguladores_tabicas.toString(),
                  value: materialsNeeded?.reguladores_tabicas
               }
            } 
         );
         setUnião(
            { 
               cantoneiras: {
                  text: materialsNeeded?.união_cantoneiras.toString(),
                  value: materialsNeeded?.união_cantoneiras
               },
               tabicas: {
                  text: materialsNeeded?.união_tabicas.toString(),
                  value: materialsNeeded?.união_tabicas
               }
            } 
         );
         setLfix(
            { 
               cantoneiras: {
                  text: materialsNeeded?.lfix_cantoneiras.toString(),
                  value: materialsNeeded?.lfix_cantoneiras
               },
               tabicas: {
                  text: materialsNeeded?.lfix_tabicas.toString(),
                  value: materialsNeeded?.lfix_tabicas
               }
            } 
         );
         setMetalMetal(
            { 
               cantoneiras: {
                  text: materialsNeeded?.parafusoMM_cantoneiras.toString(),
                  value: materialsNeeded?.parafusoMM_cantoneiras
               },
               tabicas: {
                  text: materialsNeeded?.parafusoMM_tabicas.toString(),
                  value: materialsNeeded?.parafusoMM_tabicas
               }
            } 
         );
         setTirantes(
            { 
               qtd: {
                  cantoneiras: {
                     text: (materialsNeeded?.tirantes_cantoneiras_qtd).toString(),
                     value: materialsNeeded?.tirantes_cantoneiras_qtd
                  },
                  tabicas: {
                     text: (materialsNeeded?.tirantes_tabicas_qtd).toString(),
                     value: materialsNeeded?.tirantes_tabicas_qtd
                  }
               },
               metros: {
                  cantoneiras: {
                     text: (materialsNeeded?.tirantes_cantoneiras_metros).toString(),
                     value: materialsNeeded?.tirantes_cantoneiras_metros
                  },
                  tabicas: {
                     text: (materialsNeeded?.tirantes_tabicas_metros).toString(),
                     value: materialsNeeded?.tirantes_tabicas_metros
                  }
               }
            } 
         );
         

         console.log( "chapas: ", materialsNeeded?.chapas );
         console.log( "materialsNeeded: ", materialsNeeded );
         console.log( "materials: ", materials );

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

               length: { text: Length!.text, value: Length!.value, },
               width: { text: Width!.text, value: Width!.value, },
               area: {
                  text: ( Width!.value! * Length!.value! ).toFixed( 2 ),
                  value: parseFloat( ( Width!.value! * Length!.value! ).toFixed( 2 ) )
               },
               perimetro: {
                  text: ( ( Length!.value! * 2 ) + ( Width!.value! * 2 ) ).toString(),
                  value: ( Length!.value! * 2 ) + ( Width!.value! * 2 ),
               },
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
            CalculateDryWallRoof( data.length.value!, data.width.value! ).then( returned => {
               const material: materials_i = {
                  length: { 
                     text: data.width.value!.toString(), 
                     value: data.width.value! 
                  },
                  width: { 
                     text: data.width.value!.toString(), 
                     value: data.width.value! 
                  },
                  area: { 
                     text: ( data.width.value! * data.length.value! ).toString(), 
                     value: data.width.value! * data.length.value! 
                  },
                  perimetro: {
                     text: ( ( data.length.value! * 2 ) + ( data.width.value! * 2 ) ).toString(),
                     value: ( data.length.value! * 2 ) + ( data.width.value! * 2 ),
                  },
                  chapas: {
                     text: returned!.panelsNeeded!.toString(),
                     value: returned!.panelsNeeded!
                  },
                  gn25: {
                     text: returned!.gn25Needed!.toString(),
                     value: returned!.gn25Needed!
                  },

                  tabicas: {
                     text: returned!.tabicasNeeded!.toString(),
                     value: returned!.tabicasNeeded!,
                  },
                  cantoneiras: {
                     text: returned!.cantoneirasNeeded!.toString(),
                     value: returned!.cantoneirasNeeded!,
                  },
                  pregos: {
                     text: returned!.pregosNeeded!.toString(),
                     value: returned!.pregosNeeded!,
                  },
                  fitaTelada: {
                     text: returned!.tapeNeeded!.toString(),
                     value: returned!.tapeNeeded!,
                  },
                  massa: {
                     text: returned!.massaNeeded!.toString(),
                     value: returned!.massaNeeded!,
                  },
                  bandaAcústica: {
                     text: returned!.bandaAcústicaNeeded!.toString(),
                     value: returned!.bandaAcústicaNeeded!,
                  },
                  lãDeVidro: {
                     text: returned!.lãDeVidroNeeded!.toString(),
                     value: returned!.lãDeVidroNeeded!,
                  },
                  
                  perfis: {
                     cantoneiras: {
                        text: returned!.perfis_cantoneirasNeeded!.toString(),
                        value: returned!.perfis_cantoneirasNeeded!,
                     },
                     tabicas: {
                        text: returned!.perfis_tabicasNeeded.toString(), 
                        value: returned!.perfis_tabicasNeeded, 
                     },
                  },
                  tirantes: {
                     qtd: {
                        cantoneiras: {
                           text: returned!.tirantesNeeded.qtd.cantoneiras.toString(),
                           value: returned!.tirantesNeeded.qtd.cantoneiras,
                        },
                        tabicas: {
                           text: returned!.tirantesNeeded.qtd.tabicas.toString(),
                           value: returned!.tirantesNeeded.qtd.tabicas,
                        },
                     },
                     metros: {
                        cantoneiras: {
                           text: returned!.tirantesNeeded.metros.cantoneiras.toString(),
                           value: returned!.tirantesNeeded.metros.cantoneiras,
                        },
                        tabicas: {
                           text: returned!.tirantesNeeded.metros.tabicas.toString(),
                           value: returned!.tirantesNeeded.metros.tabicas,
                        },
                     },
                  },
                  reguladores: {
                     cantoneiras: {
                        text: returned!.reguladoresForCantoneirasNeeded.toString(),
                        value: returned!.reguladoresForCantoneirasNeeded,
                     },
                     tabicas: {
                        text: returned!.reguladoresForTabicasNeeded.toString(),
                        value: returned!.reguladoresForTabicasNeeded,
                     },
                  },
                  união: {
                     cantoneiras: {
                        text: returned!.uniãoNeeded.cantoneiras.toString(),
                        value: returned!.uniãoNeeded.cantoneiras,
                     },
                     tabicas: {
                        text: returned!.uniãoNeeded.tabicas.toString(),
                        value: returned!.uniãoNeeded.tabicas,
                     },
                  },
                  lfix: {
                     cantoneiras: {
                        text: returned!.lfixNeeded.cantoneiras.toString(),
                        value: returned!.lfixNeeded.cantoneiras,
                     },
                     tabicas: {
                        text: returned!.lfixNeeded.tabicas.toString(),
                        value: returned!.lfixNeeded.tabicas,
                     },
                  },
                  parafusoMM: {
                     cantoneiras: {
                        text: returned!.screwMMNeeded.cantoneiras.toString(),
                        value: returned!.screwMMNeeded.cantoneiras,
                     },
                     tabicas: {
                        text: returned!.screwMMNeeded.tabicas.toString(),
                        value: returned!.screwMMNeeded.tabicas,
                     },
                  },
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
         data.area += item.area.value;
         data.perimetro += item.perimetro.value;
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
                           <Input value={ item.length.text } style={{ flex: 1, backgroundColor: "#16181c", color: "#eee" }} key={ `Item-length:${ item.id }` }/>
                           <Input value={ item.width.text } style={{ flex: 1, backgroundColor: "#16181c", color: "#eee" }} key={ `Item-width:${ item.id }` }/>
                           <Input value={ item.area.text } style={{ flex: 1, backgroundColor: "#16181c", color: "#eee" }} key={ `Item-area:${ item.id }` }/>
                           <Input value={ item.perimetro.text } style={{ flex: 1, backgroundColor: "#16181c", color: "#eee" }} key={ `Item-perimetro:${ item.id }` }/>
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
                           <PP style={{ color: "#060", }}> un.</PP>
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
                           { 
                              SelectedCeilingSupportType == "Tabica" ? (
                                 Tabicas?.text
                              ) : (
                                 Cantoneiras?.text
                              )
                           } 
                           <PP style={{ color: "#060", }}> un.</PP>
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
                           { 
                              SelectedCeilingSupportType == "Tabica" ? (
                                 Perfis?.tabicas.text
                              ) : (
                                 Perfis?.cantoneiras.text
                              )
                           } 
                           <PP style={{ color: "#060", }}> un.</PP>
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
                           {/* { 
                              SelectedCeilingSupportType == "Tabica" ? (
                                 Tirantes?.metros.tabicas.text
                              ) : (
                                 Tirantes?.metros.cantoneiras.text
                              )
                           } */}
                           { 
                              SelectedCeilingSupportType == "Tabica" ? (
                                 Tirantes?.qtd.tabicas.text
                              ) : (
                                 Tirantes?.qtd.cantoneiras.text
                              )
                           }
                           <PP style={{ color: "#060", }}> un.</PP>
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
                           { 
                              SelectedCeilingSupportType == "Tabica" ? (
                                 Reguladores?.tabicas.text
                              ) : (
                                 Reguladores?.cantoneiras.text
                              )
                           } 
                           <PP style={{ color: "#060", }}> un.</PP>
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
                           { 
                              SelectedCeilingSupportType == "Tabica" ? (
                                 União?.tabicas.text
                              ) : (
                                 União?.cantoneiras.text
                              )
                           } 
                           <PP style={{ color: "#060", }}> un.</PP>
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
                           <PP style={{ color: "#060", }}> un.</PP>
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
                           { 
                              SelectedCeilingSupportType == "Tabica" ? (
                                 Lfix?.tabicas.text
                              ) : (
                                 Lfix?.cantoneiras.text
                              )
                           } 
                           <PP style={{ color: "#060", }}> un.</PP>
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
                           { 
                              SelectedCeilingSupportType == "Tabica" ? (
                                 MetalMetal?.tabicas.text
                              ) : (
                                 MetalMetal?.cantoneiras.text
                              )
                           } 
                           <PP style={{ color: "#060", }}> un.</PP>
                        </P>
                        <P style={[ s.tableTextDescription ]}>
                           Parafusos metal metal
                           <PP style={{ color: "#27f" }}> LA 13</PP>
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
                           { 
                              SelectedCeilingSupportType == "Tabica" ? (
                                 Pregos?.text
                              ) : (
                                 Pregos?.text
                              )
                           } 
                           <PP style={{ color: "#060", }}> un.</PP>
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
                           { FitaTelada?.text } 
                           <PP style={{ color: "#060", }}> m.</PP>
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
                           { Massa?.text } 
                           <PP style={{ color: "#060", }}> kg.</PP>
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
                              { LãDeVidro?.text } 
                              <PP>m</PP>
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
                           { Area?.text }
                        </P>
                        <P style={[ s.tableFooterRowText ]}>
                           { Perimetro?.text }
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