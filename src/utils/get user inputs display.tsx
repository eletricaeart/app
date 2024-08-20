

/* Here is an example code to get user inputs 
and display a card with the saved inputs in 
React Native using TypeScript:

```typescript */
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

function CardComponent( { name, email } ) {
  return(
    <View style={styles.card}>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
};

export default function App() {
  const 
      [ name, setName ] = useState( "" )
      ,
      [ email, setEmail ] = useState( "" )
   ;
   
   function handleSave() {
      // Save user inputs here
   }

   return(
      <View style={styles.container}>
         <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
         />
         <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
         />
         <Button title="Save" onPress={handleSave} />
         <CardComponent name={name} email={email} />
      </View>
   );
};

const styles = StyleSheet.create( {
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
   },
   input: {
      height: 40,
      width: '80%',
      margin: 10,
      padding: 10,
      borderWidth: 1,
   },
   card: {
      marginTop: 20,
      padding: 10,
      borderWidth: 1,
   },
} );


/*
In this code, we have a simple form with two input fields for name and email. When the user enters their name and email and clicks on the "Save" button, the inputs are saved and displayed on a card component below the form. The `CardComponent` takes the name and email props and displays them in a card-like format.
*/