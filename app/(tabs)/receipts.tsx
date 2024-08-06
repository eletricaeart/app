

import React, { useState, useEffect, useRef } from "react";

import {
   StyleSheet, ScrollView, FlatList, Modal, View,
   Text, Image, Pressable, TextInput, Keyboard,
   Button,
} from "react-native";

import {
   Switch,
   FAB, Portal, PaperProvider,
} from "react-native-paper";

import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import styled from "styled-components/native";
import {
   PageFooter, BottomNavigationBar, Fab, Press,
   Touch, 
} from "@/src/widgets/clb-widgets";

import { ModalFullPage, ModalCardCenter, } from "@/src/widgets/ui/modal";

import {
   colors, elevation,
} from "@/src/widgets/clb-colors";

import * as c from "@/src/widgets/clb-html";
import * as ea from "@/src/widgets/clb-ea";
import * as Form from "@/src/widgets/clb-form";
import * as CStore from "@/src/widgets/clb-dbs";
import { Icon } from "@/src/widgets/clb-icons";
import { _ } from "@/src/widgets/clb";

import { LinearGradient } from "expo-linear-gradient";

import { api_GetCEP } from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseDB, SaveDataOnFbRDB, GetDataFromFbRDB } from "@/FirebaseConfig";
import { GetFBData, DeleteFBData, } from "@/src/widgets/clb-fb";

import uuid from "react-native-uuid";
import { ref, get, child, getDatabase } from "firebase/database";

import useCustomersFB from "@/src/hooks/useCustomersFB";



/* == [ properties ]
== == == == == == == == == */

interface customer {
   name: string; 
   email?: string; 
   cellphone?: string;
   whatsapp?: string;
   phone?: string;
   phone2?: string;
   rg?: string;
   cpf?: string;
   cep?: string;
   estate?: string;
   logradouro?: string;
   number?: string;
   complemento?: string;
   district?: string;
   city?: string;
   note?: string;
}


/* == [ exports ]
== == == == == == == == == */
export default function ReceiptsView( { ...props } ) {
   const 
      [ ModalVisibility, setModalVisibility ] = useState( false )
      ,
      [ ModalServicesVisibility, setModalServicesVisibility ] = useState( false )
      ,
      [ ModalCustomerVisibility, setModalCustomerVisibility ] = useState( false )
      ,
      [ Receipts, setReceipts ] = useState( null )
   ;



   useEffect( () => {
   }, [] ); 
   

   /** == [ Fabb properties ] 
    * 
    * == == == == == == == == == */
   const 
      [ state, setState ] = React.useState({ open: false })
      ,
      onStateChange = ({ open }) => setState({ open })
      ,
      { open } = state
   ;



   /* == [ Modal's properties ]
   == == == == == == == == == */
   const [ customersDB, setcustomersDB ] = useState( [] );
   const 
      [ Paid, setPaid ] = useState( false )
      ,
      [ Payday, setPayday ] = useState( "" )
      ,
      [ Ref, setRef ] = useState( "rc-155-2024-0" )
      ,
      [ Subtotal, setSubtotal ] = useState( "" )
      ,
      [ DueDate, setDueDate ] = useState( "" )
      ,
      [ Customer, setCustomer ] = useState( "" )
      ,
      [ Services, setServices ] = useState( [] )
      ,
      [ ServiceDescription, setServiceDescription ] = useState( "" )
      ,
      [ ServiceTotalValue, setServiceTotalValue ] = useState( "" )
      ,
      [ Service, setService ] = useState( {
         description: ServiceDescription,
         services: Services,
         total: ServiceTotalValue,
      } )
      ,
      [ Discount, setDiscount ] = useState( null )
      ,
      [ Warranty, setWarranty ] = useState( "" )
      ,
      [ FormOfPayment, setFormOfPayment ] = useState( "..." )
      ,
      [ Attachment, setAttachment ] = useState( "" )
      ,
      [ Notes, setNotes ] = useState( "" )

      ,
      [ ReceiptValue, setReceiptValue ] = useState( null )
   ;

   const 
      [ SwitchPaid_Enabled, setSwitchPaid_Enabled ] = useState( false )
      ,
      [ ModalFormOfPayment, setModalFormOfPayment ] = useState( false )
      ,
      [ ModalServices, setModalServices ] = useState( false )
      ,
      [ ModalCustomer, setModalCustomer ] = useState( false )
   ;

   useEffect( () => {
      setSubtotal( ReceiptValue - Discount )
   }, [ ReceiptValue ] );
   
   function ToggleSwitch_Paid() {
      setSwitchPaid_Enabled( !SwitchPaid_Enabled );
      if( SwitchPaid_Enabled ) {
         setPaid( true );
      } else {
         setPaid( false );
      }
   }

   function OnChangePayday( selectedDate ) {
      const currentDate = selectedDate;
      setPayday( currentDate );
   }

   const PaydayShowMode = (currentMode) => {
      DateTimePickerAndroid.open({
        value: Payday,
        OnChangePayday,
        mode: currentMode,
        is24Hour: true,
      });
   };

   const showDatepicker = () => {
      PaydayShowMode('date');
    };
  
    const showTimepicker = () => {
      PaydayShowMode('time');
    };

   const 
      inputs = [
         setPaid,
         setPayday,
         setRef,
         setSubtotal,
         setDueDate,
         setCustomer,
         setServices,
         setDiscount,
         setWarranty,
         setFormOfPayment,
         setAttachment,
         setNotes,
      ]
      ,
      id_form = useRef( null )
   ;
   

   /** == [ Modal Services ] 
    * 
    * == == == == == == == == == */
   const 
      [ Quantity, setQuantity ] = useState( "" )
      ,
      [ Value, setValue ] = useState( "" )
      
   ;
   


   

   return( <>
      <PaperProvider>
         <LinearGradient colors={[ "#f5f5f5", "#e5e5e5", ]} style={[ { flex: 1, } ]} >
            
            { Receipts != null ? 
               <ScrollView style={{ flex: 1,  }}>
                  <HomePage style={{  }}>
                     <Header>
                        <Content>
                           <H2>Recibos</H2>
                        </Content>
                     </Header>
   
                     <Section  style={{ flex: 1, paddingBottom: 75, backgroundColor: "#e2f4fe00", }}>
                        <Content style={{ gap: 16 }}>
   
                           {  
                              <FlatList 
                                 data={ Receipts }
                                 renderItem={ ({item}) => <>
                                    <ea.UsersCard
                                       key={ item.id }
                                       name={ item.name }
                                    />
                                 </> }
                                 keyExtractor={ item => item.id } 
                                 ItemSeparatorComponent={ 
                                    () => <View style={{ height: 16, }}/>
                                 }
                              />
                           }
                           
                        </Content>
                     </Section>
                  </HomePage> 
               </ScrollView>
               : 
               <View style={{ flex: 1, }}>
                  <Header>
                     <Content>
                        <H2>Recibos</H2>
                     </Content>
                  </Header>
                  <View style={{ width: "100%", aspectRatio: "12 / 9", marginTop: 16, }}>
                     <Image source={ require( "@/src/images/clipart/Receipts.png" ) }
                     style={{ width: "100%", height: "100%", }} resizeMode="contain"/>
                  </View>
                  <Center style={{ paddingTop: 16, }}>
                     <H3 style={{ color: "#777", }}>Nenhum recibo ainda</H3>
                  </Center>
               </View>
            }

         </LinearGradient>


   
         {/*  == [ Modal ]
         == == == == == == == == ==  */}
         <ModalFullPage ModalVisibility={ ModalVisibility }
         overlay={
            <ModalCardCenter 
            setState={ setModalFormOfPayment } 
            useState={ ModalFormOfPayment }
            trigger={ ModalFormOfPayment }
            >
               <Centered style={{ paddingTop: 8, paddingBottom: 18, }}>
                  <H3>Qual a forma de pagamento?</H3>
               </Centered>

               <Content style={{ gap: 8, }}>
                  <Item>
                     <P style={{ color: "#555", }}
                     onPress={ () => {
                        setFormOfPayment( "Pix" );
                        setModalFormOfPayment( !ModalFormOfPayment );
                     } }
                     >
                        Pix
                     </P>
                  </Item>
                  <Div />
                  <Item>
                     <P style={{ color: "#555", }}
                     onPress={ () => {
                        setFormOfPayment( "Cartão de débito" );
                        setModalFormOfPayment( !ModalFormOfPayment );
                     } }
                     >
                        Cartão de débito
                     </P>
                  </Item>
                  <Div />
                  <Item>
                     <P style={{ color: "#555", }}
                     onPress={ () => {
                        setFormOfPayment( "Cartão de crédito" );
                        setModalFormOfPayment( !ModalFormOfPayment );
                     } }
                     >
                        Cartão de crédito
                     </P>
                  </Item>
                  <Div />
                  <Item>
                     <P style={{ color: "#555", }}
                     onPress={ () => {
                        setFormOfPayment( "Em dinheiro" );
                        setModalFormOfPayment( !ModalFormOfPayment );
                     } }
                     >
                        Em dinheiro
                     </P>
                  </Item>
               </Content>
            </ModalCardCenter>
         }>
            <ScrollView keyboardShouldPersistTaps="handled">
            <Section style={{ zIndex: 1, }}>
               <c.Header>
                  <c.Content>
                     <View style={{ height: 80, flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                        <c.H3 color="#00559c99">Novo recibo</c.H3>
                        <Pressable onPress={ () => { setModalVisibility( !ModalVisibility ) } }>
                           <View style={[ s.btnOverlay,  ]}>
                              <Icon i="f0" name="close" color={ colors.error } />
                           </View>
                        </Pressable>
                     </View>

                     <Card style={{ backgroundColor: "#00559c", }}>
                        <Content style={{ flexDirection: "row", justifyContent: "space-between", gap: 18, height: 110, }}>
                           <Section style={{ justifyContent: "space-between" }}>
                              <H3 style={{ color: "#fff", }}>Valor do recibo</H3>
                              <H1 style={{ color: "#fff", }}>R$ { ReceiptValue }</H1>
                           </Section>
                           <Section>
                              <P style={{ color: "#fff", }}>{ Ref }</P>
                           </Section>
                        </Content>
                     </Card>

                  </c.Content>
               </c.Header>
               <Section style={[ s.form, elevation.elevation, { backgroundColor: "#fff", } ]}>
                  <c.Content gap={ 8 }>

                     <View style={ s.form } ref={ id_form }>

                        <Content style={{  }}>
                        </Content>

                        <Section >

                           <View style={ s.divider }>
                              <Text style={ s.dividerText }>Status do recibo</Text>
                           </View>

                           <Section style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                              <P>Já está pago?</P>
                              <Switch
                                 style={{  }}
                                 trackColor={{ false: "#767577", true: "#00559c77" }}
                                 thumbColor={ SwitchPaid_Enabled ? "#0088ec" : "#f4f3f4" }
                                 ios_backgroundColor="#3e3e3e"
                                 onValueChange={ ToggleSwitch_Paid }
                                 value={ SwitchPaid_Enabled }
                              />
                           </Section>

                           {
                              SwitchPaid_Enabled && <Section style={{ paddingTop: 16, paddingBottom: 16, }}>
                                 <Text style={ s.label }>Data do recebimento</Text>
                                 <TextInput style={ s.input }
                                    value={ Payday }
                                    onChangeText={ setPayday } 
                                    placeholderTextColor={ "#777" }
                                    // ref={ id_Payday }
                                 />
                                 {/* <Button onPress={showDatepicker} title="Show date picker!" />
                                 <Text>selected: {Payday.toLocaleString()}</Text> */}
                              </Section>
                           }
                        </Section>

                        <Section>

                           <View style={ s.divider }>
                              <Text style={ s.dividerText }>Referência</Text>
                           </View>

                           <View style={ s.duo }>
                              <View style={ s.duoBox }>
                                 <Text style={ s.label }>Referência</Text>
                                 <TextInput style={ s.input }
                                    value={ Ref }
                                    onChangeText={ setRef }
                                    keyboardType="number-pad"
                                    placeholderTextColor={ "#777" }
                                 />
                              </View>
                              
                              <View style={ s.duoBox }>
                                 <Text style={ s.label }>Subtotal</Text>
                                 <TextInput style={ s.input }
                                    value={ Subtotal }
                                    // onChangeText={ () => {
                                    //    setSubtotal( ReceiptValue - Discount )
                                    // } }
                                    editable={ false }
                                    keyboardType="number-pad"
                                    placeholderTextColor={ "#777" }
                                 />
                              </View>
                           </View>
                           
                           
                           
                           <Text style={ s.label }>Vencimento</Text>
                           <TextInput style={ s.input }
                              value={ DueDate }
                              onChangeText={ setDueDate }
                              keyboardType="number-pad"
                              placeholderTextColor={ "#777" }
                           />
                           
                           <View style={ s.duoBox }>
                              <Text style={ s.label }>Cliente</Text>
                              <Text style={ [ s.input, { paddingTop: 18,  } ] }
                              onPress={ () => {
                                 setModalCustomerVisibility( !ModalCustomerVisibility );
                              } }>
                                 { Customer }
                              </Text>
                           </View>
                           
                           <View style={ s.duoBox }>
                              <Text style={ s.label }>Serviços</Text>
                              <Text style={ [ s.input, { paddingTop: 18,  } ] }
                              onPress={ () => {
                                 setModalServicesVisibility( !ModalServicesVisibility );
                              } }>
                                 { Services }
                              </Text>
                           </View>
                        </Section>

                        <Section>
                           <View style={ s.divider }>
                              <Text style={ s.dividerText }>Desconto</Text>
                           </View>
                           
                           <Text style={ s.label }>Desconto</Text>
                           <TextInput style={ s.input }
                              inputMode="decimal"
                              value={ Discount }
                              onChangeText={ text => {
                                 const 
                                    t = text.toString()
                                 ;   
                                 setDiscount( parseFloat( text ) )
                              } }
                              placeholderTextColor={ "#777" }
                           />
                           
                           <Text style={ s.label }>Garantia</Text>
                           <TextInput style={ s.input }
                              keyboardType="number-pad"
                              value={ Warranty }
                              onChangeText={ setWarranty }
                              placeholderTextColor={ "#777" }
                           />
                              
                           <Text style={ s.label }>Forma de pagamento</Text>
                           <Text style={ [ s.input, { paddingTop: 18,  } ] }
                           onPress={ () => {
                              setModalFormOfPayment( !ModalFormOfPayment );
                           } }>
                              { FormOfPayment }
                           </Text>
                           

                           <Text style={ s.label }>Anexo</Text>
                           <TextInput style={ s.input }
                              value={ Attachment }
                              onChangeText={ setAttachment }
                              placeholderTextColor={ "#777" }
                           />
                           
                        </Section>

                        <Section>
                           <View style={ s.divider }>
                              <Text style={ s.dividerText }>Informaçoes adicionais</Text>
                           </View>
                           <Text style={ s.label }>Informaçoes adicionais</Text>
                           <TextInput style={ s.input }
                              value={ Notes }
                              onChangeText={ setNotes }
                              placeholder="Anotações"
                              placeholderTextColor={ "#777" }
                           />
                        </Section>
                        <Section style={ {
                           gap: 16,
                           marginTop: 24,
                           marginBottom: 66,
                        } }>

                           <Touch 
                              txt="apagar tudo"
                              onPressIn={ () => { Keyboard.dismiss() } }
                              onPressOut={ () => { 
                                 Form.ClearInputs( inputs ); 
                                 // id_Name.current.focus(); 
                              } }
                           />
                           <Touch 
                              touchSty={{
                                 backgroundColor: "#9c5500",
                              }}
                              txtSty={{
                                 color: "#fff",
                              }}
                              txt="erase DBs"
                              onPress={ async () => { await AsyncStorage.removeItem( "customers" ) } }
                           />
                           <Touch 
                              touchSty={{
                                 backgroundColor: "#00559C",
                              }}
                              txtSty={{
                                 color: "#fff",
                              }}
                              txt="cadastrar"
                              onPress={ () => { 
                                 // RegisterCustomerOnBase( { dbs_name: "customers", object: customersList } ) 
                              } }
                           />

                        </Section>
                     </View>
                  </c.Content>
               </Section>
            </Section>
            </ScrollView>
         </ModalFullPage>

         { ModalServicesVisibility && 
            <ModalFullPage>
               <Header style={{ backgroundColor: "#e5e5e5", }}>
                  <Content>
                     <Duo style={{ flexDirection: "row", justifyContent: "space-between", 
                        alignItems: "center",
                     }}>
                        <Pressable onPress={ () => { setModalServicesVisibility( !ModalServicesVisibility ) } }
                        style={{
                           position: "absolute",
                           zIndex: 9, paddingLeft: 8,
                        }}>
                           <Icon i="mi" name="arrow-back-ios" color="#555"/>
                        </Pressable>
                        <H4 style={{ flex: 1, textAlign: "center", }}>
                           Serviços
                        </H4>
                     </Duo>
                  </Content>
               </Header>
               <Section style={{
                  flex: 1, height: "100%",
                  backgroundColor: "#e5e5e5",
               }}>
                  
                  <Section style={{ flex: 1, borderRadius: 24, overflow: "hidden", elevation: 3, }}>
                     <ScrollView style={{ padding: 16, backgroundColor: "#f5f5f5", }}>
                        <Section style={{  }}>
                           <Header>
                              <H2> { ServiceDescription || "Novo serviço" } </H2>
                           </Header>
                           <Section style={{
                              paddingTop: 24, paddingBottom: "100%",
                           }}>
                              
                              <Section style={{ paddingTop: 16, paddingBottom: 16,
                                 paddingLeft: 8, paddingRight: 8, gap: 8, 
                              }}>
                                 <T style={{ fontSize: 18 }}>Forro de DryWall</T>
                                 <Duo style={{ alignItems: "center", justifyContent: "space-between" }}>
                                    <T style={{ color: "#666", }}>1 x R$ 3.550,00</T>
                                    <Duo style={{ alignItems: "center", gap: 0, }}>
                                       <T style={{ fontWeight: 700, color: "#777", }}>Total </T>
                                       <T style={{ color: "#666", }}>R$ 3.550,00</T>
                                    </Duo>
                                 </Duo>
                              </Section>




                              <Section style={{ borderTopColor: "#7777", borderTopWidth: 1, paddingTop: 24, }}>
                                 <Duo style={{ paddingLeft: 8, paddingRight: 8, alignItems: "center", justifyContent: "space-between", }}>
                                    <H3>TOTAL</H3>
                                    <T style={{ color: "#666", fontSize: 22, fontWeight: 500, }}>R$ 3.550,00</T>
                                 </Duo>
                              </Section>
                           </Section>
                        </Section>
                     </ScrollView>
                  </Section>

                  <Section style={ { position: "absolute", bottom: 0, width: "100%", 
                     borderRadius: 24, backgroundColor: "#fff",
                     padding: 16,
                  } }>

                     <Label>
                        <LabelText>Descrição</LabelText>
                        <TextInput style={ s.input }
                           placeholder="Nome do serviço"
                        value={ ServiceDescription }
                        onChangeText={ text => {
                           setServiceDescription( text ) 
                        } }
                        />
                     </Label>

                     <Duo style={{
                        gap: 16, 
                     }}>
                        <Label style={{
                           flex: 1,
                        }}>
                           <LabelText>Quantidade</LabelText>
                           <TextInput style={[ s.input, {} ]}
                           inputMode="decimal"
                           placeholder="0.00"
                           value={ Quantity }
                           onChangeText={ text => {
                              setQuantity( text );
                           } }
                           onBlur={ () => {
                              let
                                 handledText = Quantity == "0" ? "1" : Quantity
                              ;
                              switch( Quantity ) {
                                 case "0" : setQuantity( "1" );
                                 break;

                                 case "" : setQuantity( "1" );
                                 break;

                                 case null : setQuantity( "1" );
                                 break;
                                 
                              }
                              setQuantity( handledText );
                           } }
                           />
                        </Label>
                        <Label style={{
                           flex: 1,
                        }}>
                           <LabelText>Valor</LabelText>
                           <TextInput style={ s.input }
                           inputMode="decimal"
                           placeholder="0.00"
                           value={ Value }
                           onChangeText={ text => setValue( text ) }
                           />
                        </Label>
                     </Duo>

                     <Duo style={{
                        gap: 16, 
                     }}>
                        <Btn style={{ flex: 1, elevation: 1, }}
                        onPress={ () => {           
                           if( Quantity == "" ) {
                              setQuantity( "1" );
                           }                
                           if( Value != "" && ServiceDescription != "" ) {
                              alert( "congrats!" );
                           } else if( Value == "" ) {
                              alert( "Value = null" );
                           } else if( ServiceDescription == "" ) {
                              alert( "ServiceDescription = null" );
                           }
                        } }
                        >
                           <Text style={{ color:"#0075bd",
                              fontSize: 18, 
                              textTransform: "uppercase",
                              fontWeight: "bold", textAlign: "center",
                           }}>
                              Adicionar
                           </Text>
                        </Btn>
                        <Btn style={{
                           flex: 1, elevation: 1, backgroundColor: "#00559C",
                        }}>
                           <Text style={{ color:"#fffe",
                              fontSize: 18, 
                              textTransform: "uppercase",
                              fontWeight: "bold", textAlign: "center",
                           }}>
                              Salvar
                           </Text>
                        </Btn>
                     </Duo>

                  </Section>
               </Section>
            </ModalFullPage> 
         }

         { ModalCustomerVisibility && 
            <ModalFullPage>
               <Header style={{ backgroundColor: "#f5f5f5", elevation: 10, }}>
                  <Content>
                     <Duo style={{ flexDirection: "row", justifyContent: "space-between", 
                        alignItems: "center",
                     }}>
                        <Pressable onPress={ () => { setModalCustomerVisibility( !ModalCustomerVisibility ) } }
                        style={{
                           position: "absolute",
                           zIndex: 9, paddingLeft: 8,
                        }}>
                           <Icon i="mi" name="arrow-back-ios" color="#555"/>
                        </Pressable>
                        <H4 style={{ flex: 1, textAlign: "center", }}>Catálogo de clientes</H4>
                     </Duo>
                  </Content>
               </Header>
               <Section style={{
                  flex: 1, height: "100%",
                  padding: 16,
               }}>
                  <Text>Customer Modal</Text>
               </Section>
            </ModalFullPage> 
         }

         <Portal>
            <FAB.Group
            open={open}
            visible
            backdropColor="#fffb"

            fabStyle={{ backgroundColor: "#00559c", }}
            icon={open ? 'atom' : 'plus'}
            actions={[
               //  { icon: 'plus', onPress: () => console.log('Pressed add') },
               {
                  icon: "apple-icloud", /* 'account-reactivate', */
                  label: 'Buscar recibos da nuvem',
                  labelTextColor: "#333",
                  labelStyle: { fontWeight: "bold" },
                  onPress: () => {
                     // UpdateCustomersBase();
                  },
               },
               {
                  icon: 'receipt',
                  label: 'Criar novo recibo',
                  labelTextColor: "#333",
                  labelStyle: { fontWeight: "bold", },
                  onPress: () => setModalVisibility( true ),
               },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
               if (open) {
                  // do something if the speed dial is open
               }
            }}
            />
         </Portal>
     </PaperProvider>
   </> );
}


const s = StyleSheet.create( {
   root: {
      // paddingTop: StatusBar.currentHeight,
   },
   modal_root: {
      backgroundColor: "#00559c",
      flex: 1,
   },
   backSheet: {
      backgroundColor: "#959595",
      borderTopStartRadius: 24,
      borderTopEndRadius: 24,
      width: "90%",
      height: 15,
      marginTop: 10,
      alignSelf: "center",
   },
   frontSheet: {
      backgroundColor: "#f5f5f5",
      borderTopStartRadius: 24,
      borderTopEndRadius: 24,
      width: "100%",
      flex: 1,
      alignSelf: "center",
      overflow: "hidden",
   },
   modal_body: {
      backgroundColor: "#f5f5f5",
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      padding: 8,
      backgroundColor: '#0e101c',
   },
   form: {
      borderRadius: 24,
   },
   header: {
      marginTop: 16,
      marginBottom: 24,
   },
   btnOverlay: { backgroundColor: "#0001", 
      padding: 8,
      borderRadius: 100,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   divider: {
      borderBottomColor: "#009ee6",
      borderBottomWidth: 2,
      borderStyle: "dashed",
      marginTop: 16,
      marginBottom: 16,  
   },
   dividerText: {
      fontWeight: "bold",
      marginBottom: 8,
      color: "#00559c",
   },
   duo: {
      flexDirection: "row",
      gap: 8,
   },
   duoBox: {
      flex: .5,
   },
   label: {
      color: "#777",
      fontWeight: "500",
      marginBottom: 8,
      marginLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 16,
      paddingRight: 16,
   },
   input: {
      backgroundColor: "#f3f3f3",
      height: 56,
      marginBottom: 16,
      padding: 16,
      borderRadius: 16,
      borderColor: "#fff2",
      borderWidth: 1,
      borderStyle: "solid",
   },
   button: {
      marginTop: 40,
      color: 'white',
      height: 40,
      backgroundColor: '#ec5990',
      borderRadius: 4,
   },
   fab: { position: "absolute", bottom: 16, right: 16, width: "auto" },
} );


const 
   HomePage = styled.View`
      flex: 1px;
      width: 100%;
   `
   ,
   Header = styled.View`

   `,
   Section = styled.View``,
   Content = styled.View`
      padding: 16px;
   `,
   Center = styled.View`
      align-items: center;
      justify-content: center;
   `,
   Centered = styled.View`
      align-items: center;
      justify-content: center;
      text-align: center;
   `,
   Duo = styled.View`
      flex-direction: row;
      gap: 8px;
   `
   ,
   Item = styled.View`
      flex-direction: row;
      padding: 8px;
      gap: 8px;
   `
   ,
   Div = styled.View`
      border-color: #9997;
      border-width: 1px;
      border-style: dashed;
   `
   ,
   BackSheet = styled.View`
      background-color: #959595;
      border-top-right-radius: 24px;
      border-top-left-radius: 24px;
      width: 90%;
      height: 15px;
      margin-top: 10px;
      align-self: center;
   `
   ,

   /** == [ form ] 
    * 
    * == == == == == == == == == */
   Label = styled.View`
      color: #777;
      font-weight: 500;
      margin-bottom: 8px;
      margin-left: 0;
      padding-top: 0px;
      padding-bottom: 0;
   `,
   LabelText = styled.Text`
      color: #777;
      font-weight: 500;
      margin-bottom: 8px;
      margin-left: 0;
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 16px;
      padding-right: 16px;
   `,
   Input = styled.TextInput`
      background-color: #f3f3f3;
      height: 56px;
      margin-bottom: 16px;
      padding: 16px;
      border-radius: 16px;
      border-color: #fff2;
      border-width: 1px;
      border-style: solid;
   `,
   Btn = styled.Pressable`
      background-color: #cbdcf7;
      height: 56px;
      margin-bottom: 16px;
      padding: 16px;
      border-radius: 16px;
      border-color: #fff2;
      border-width: 1px;
      border-style: solid;
   `,

   /** == == == [ text ] 
    * 
    * == == == == == == == == == */
   TT = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 32px;
      font-weight: bold;
      color: #333;
   `,
   H1 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 32px;
      font-weight: bold;
      color: #333;
   `,
   H2 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 24px;
      font-weight: bold;
      color: #333;
   `,
   H3 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 20px;
      font-weight: bold;
      color: #333;
   `,
   H4 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 18px;
      font-weight: bold;
      color: #333;
   `,
   H5 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-weight: bold;
      color: #333;
   `,
   H6 = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 12px;
      font-weight: bold;
      color: #333;
   `,

   T = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 16px;
      color: #333;
   `,
   P = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 16px;
      color: #333;
   `,
   PP = styled.Text`
      margin: 0;
      padding: 0;
      font-size: 12px;
      color: #333;
   `,


   /** == [ card ] 
    * 
    * == == == == == == == == == */
   Card = styled.View`
      border-radius: 24px;
      overflow: hidden;
   `
;
