

/** == [ @imports ] 
 * == == == == == == == == == */
import { AppbarStick, BackButton, Card, H1, H2, H3, InputText, P, } from "@/src/widgets/ui";
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
   TextInput, 
} from "react-native";
import customer from "./customer";


/** == [ properties ]
 * == == == == == == == == == */

   

/** == [ exports ]
 * == == == == == == == == == */
export default function EditCustomerView() {
   const 
      [ Customer, setCustomer ] = useState( { ...SetCustomer() } )
      ,
      defaultPic = {
         fem: require( "@/src/images/Avatar/default_avatar_fem_720p.webp" ),
         masc: require( "@/src/images/Avatar/default_avatar_masc_720p.webp" )
      }
      ,
      [ CellPhone, setCellPhone ] = useState( Customer.name ),
      [ Cep, setCep ] = useState( "" ),
      [ Complemento, setComplemento ] = useState( "" ),
      [ Cpf, setCpf ] = useState( "" ),
      [ City, setCity ] = useState( "" ),
      [ District, setDistrict ] = useState( "" ),
      [ Email, setEmail ] = useState( "" ),
      [ Gender, setGender ] = useState( "" ),
      [ Logradouro, setLogradouro ] = useState( "" ),
      [ Name, setName ] = useState( "" ),
      [ Notes, setNotes ] = useState( "" ),
      [ Number, setNumber ] = useState( "" ),
      [ Phone, setPhone ] = useState( "" ),
      [ Phone2, setPhone2 ] = useState( "" ),
      [ RG, setRG ] = useState( "" ),
      [ UF, setUF ] = useState( "" ),
      [ WhatsApp, setWhatsApp ] = useState( "" )
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
         const customer = await GetCustomer().then(
            returned => setCustomer( returned )
         );
         return customer;
      } catch( err: any ) {
         console.error( "SetCustomer() err: \n\n\n", err );
      }
   }
   
   useEffect( () => {
      SetCustomer().then( () => {

      // setCellPhone( Customer.cellphone );
      // setCep( Customer.cep );
      // setComplemento( Customer.complemento );
      // setCpf( Customer.cpf );
      // setDistrict( Customer.district );
      // setCity( Customer.city );
      // setEmail( Customer.email );
      // setGender( Customer.gender );
      // setLogradouro( Customer.logradouro );
      // setName( Customer.name );
      // setNotes( Customer.Notes );
      // setNumber( Customer.number );
      // setPhone( Customer.phone );
      // setPhone2( Customer.phone2 );
      // setRG( Customer.rg );
      // setUF( Customer.uf );
      // setWhatsApp( Customer.whatsapp ); 
      } );
      // setCellPhone( Customer.cellphone );
      // setCep( Customer.cep );
      // setComplemento( Customer.complemento );
      // setCpf( Customer.cpf );
      // setDistrict( Customer.district );
      // setCity( Customer.city );
      // setEmail( Customer.email );
      // setGender( Customer.gender );
      // setLogradouro( Customer.logradouro );
      // setName( Customer.name );
      // setNotes( Customer.Notes );
      // setNumber( Customer.number );
      // setPhone( Customer.phone );
      // setPhone2( Customer.phone2 );
      // setRG( Customer.rg );
      // setUF( Customer.uf );
      // setWhatsApp( Customer.whatsapp ); 
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
                  <H2 style={{ color: "#555" }}>{ Name }
                     <TextInput 
                        onChangeText={ text => setName( text ) }
                     />
                  </H2>
               
                  <P style={{ color: "#777" }}>Rua Henrique Dias, 125 - Aviação Praia Grande - SP, 11702-600</P>
               </View>

               <Card style={{ padding: 22, backgroundColor: "#fff", gap: 20, }}>
                  <H3 style={{ color: "#27f" }}>Dados Pessoais</H3>
                  {
                     Customer &&
                     <View>
                        <View key={ Customer.cpf }>
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Name </H3>
                              <InputText style={ s.InputText }
                                 value={ Name } 
                                 onChangeText={ text => setName( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>RG </H3>
                              <InputText style={ s.InputText }
                                 value={ RG } 
                                 onChangeText={ text => setRG( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>CPF </H3>
                              <InputText style={ s.InputText }
                                 value={ Cpf } 
                                 onChangeText={ text => setCpf( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Gênero </H3>
                              <InputText style={ s.InputText }
                                 value={ Gender } 
                                 onChangeText={ text => setGender( text ) }
                              />
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
                              <InputText style={ s.InputText }
                                 value={ CellPhone } 
                                 onChangeText={ text => setCellPhone( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>WhatsApp </H3>
                              <InputText style={ s.InputText }
                                 value={ WhatsApp } 
                                 onChangeText={ text => setWhatsApp( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Telefone </H3>
                              <InputText style={ s.InputText }
                                 value={ Phone } 
                                 onChangeText={ text => setPhone( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Telefone secundário </H3>
                              <InputText style={ s.InputText }
                                 value={ Phone2 } 
                                 onChangeText={ text => setPhone2( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Email </H3>
                              <InputText style={ s.InputText }
                                 value={ Email } 
                                 onChangeText={ text => setEmail( text ) }
                              />
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
                              <InputText style={ s.InputText }
                                 value={ Cep } 
                                 onChangeText={ text => setCep( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Rua </H3>
                              <InputText style={ s.InputText }
                                 value={ Logradouro } 
                                 onChangeText={ text => setLogradouro( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Número </H3>
                              <InputText style={ s.InputText }
                                 value={ Number } 
                                 onChangeText={ text => setNumber( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Complemento </H3>
                              <InputText style={ s.InputText }
                                 value={ Complemento }
                                 onChangeText={ text => setComplemento( text ) } 
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Bairro </H3>
                              <InputText style={ s.InputText }
                                 value={ District } 
                                 onChangeText={ text => setDistrict( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Cidade </H3>
                              <InputText style={ s.InputText }
                                 value={ City } 
                                 onChangeText={ text => setCity( text ) }
                              />
                           </View>

                           <View style={{ backgroundColor: "#9995", height: 1, marginTop: 16, marginBottom: 16, }}/>
                           
                           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <H3 style={{ color: "#555" }}>Estado </H3>
                              <InputText style={ s.InputText }
                                 value={ UF } 
                                 onChangeText={ text => setUF( text ) }
                              />
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
                           <InputText style={ s.InputText }
                              value={ Notes } 
                              onChangeText={ text => setNotes( text ) }
                           />
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
      InputText: { 
         color: "#777", 
         textAlign: "right",
         borderColor: "#fff0",
         borderWidth: 0,
         // backgroundColor: "#27f",
         // width: "100%",
         flex: 1,
         // height: "100%"
      }
      ,

   } )
;