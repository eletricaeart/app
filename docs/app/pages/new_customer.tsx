

import React , { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
   PageFooter,
   BottomNavigationBar,
   Fab,
   Press,
} from "../../assets/modules/clb-modules";

import * as c from "../../assets/modules/clb-html";
import * as ea from "../../assets/modules/clb-ea";

import { Icon } from "@/assets/modules/clb-icons";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   TextInput, 
   Button, 
   SafeAreaView,
   Pressable,
} from "react-native";


export default function NewCustomer( { ...props } ) {
   // const 
   //    {  control, 
   //       handleSubmit, 
   //       formState: { errors } } = useForm()
   //    ,
   //    [ submittedData, setSubmittedData ] = useState( null )
   //    ,
   //    onSubmit = data => { 
   //       console.log( "Submitted Data:", data );
   //       setSubmittedData( data );
   //     } 
   // ;

   const 
      { 
         register, 
         setValue, 
         handleSubmit, 
         control, 
         reset, 
         formState: { errors } } = useForm( {
         defaultValues: {
            firstName: "",
            lastName: "",
         }
      } )
   ;

   function onSubmit( data ) {
      console.log( data );
   };

   function onChange( arg ) {
      return( {
         value: arg.nativeEvent.text,
      } );
   };

   function Erase() {
      reset( { firstName: 'Bill', lastName: 'Luo' } );
   }

   console.log( "errors", errors );

   return( <>
      {/* <SafeAreaView> */}
         <c.Section bg="#e5e5e5">
            <c.Header>
               <c.Content>
                  <c.H4>Cadastrar um novo cliente</c.H4>
               </c.Content>
            </c.Header>
            <c.Section bg="#fff" style={{ borderRadius: 24 }}>
               <c.Content gap={ 8 }>
                  

                  <Text style={ styles.label }>First name</Text>
                  <Controller
                  control={ control }
                     render={ ( { field: { onChange, onBlur, value } } ) => (
                        <TextInput
                           style={ styles.input }
                           onBlur={ onBlur }
                           onChangeText={ value => onChange( value ) }
                           value={ value }
                        />
                     )}
                     name="firstName"
                     rules={ { required: true } }
                  />
                  <Text style={ styles.label }>Last name</Text>
                  <Controller
                     control={ control }
                     render={ ( { field: { onChange, onBlur, value } } ) => (
                        <TextInput
                           style={ styles.input }
                           onBlur={ onBlur }
                           onChangeText={ value => onChange( value ) }
                           value={ value }
                        />
                     ) }
                     name="lastName"
                     rules={ { required: true } }
                  />

                  <c.Section gap={ 24 } style={ { marginTop: 24, } }>
                     <Press text="Reset" onPress={ () => reset( { firstName: "Céo", lastName: "Sammarco" } ) }/>
                     <Press text="Submit" onPress={ handleSubmit( onSubmit ) } />
                  </c.Section>
                  
               </c.Content>
            </c.Section>
         </c.Section>
      {/* </SafeAreaView> */}
   </> );
}


const styles = StyleSheet.create({
   label: {
     color: 'white',
     margin: 20,
     marginLeft: 0,
   },
   button: {
     marginTop: 40,
     color: 'white',
     height: 40,
     backgroundColor: '#ec5990',
     borderRadius: 4,
   },
   container: {
     flex: 1,
     justifyContent: 'center',
     padding: 8,
     backgroundColor: '#0e101c',
   },
   input: {
     backgroundColor: "#e5e5e5",
     borderColor: "#fff2",
     height: 56,
     padding: 16,
     borderRadius: 16,
   },
 });



   
