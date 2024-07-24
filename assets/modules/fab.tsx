import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  SafeAreaView,
} from "react-native";
import { AnimatedFAB } from "react-native-paper";

export function Fab( { ...props } ) {
   const 
      [ isExtended, setIsExtended ] = React.useState( true )
      ,
      isIOS = Platform.OS === "ios"
      ,
      onScroll = ({ nativeEvent }) => {
         const currentScrollPosition =
            Math.floor( nativeEvent?.contentOffset?.y ) ?? 0
         ;

         setIsExtended(currentScrollPosition <= 0);
      }
      ,
      styles = StyleSheet.create({
         container: {
            flexGrow: 1,
         },
         fabStyle: {
            bottom: 16,
            right: 16,
            position: "absolute",
         },
      })
      ,
      fabStyle = { [ props.animateFrom ]: 16 }
   ;

   return (
      <SafeAreaView style={ styles.container }>
         <ScrollView onScroll={ onScroll }>
         { [...new Array( 100 ).keys() ].map( ( _, i ) => (
            <Text>{ i }</Text>
         ) ) }
         </ScrollView>
         <AnimatedFAB
            icon={ props.icon || "plus" }
            label={ props.label }
            extended={ isExtended }
            onPress={ () => console.log( "Pressed" ) }
            visible={ props.visible || "visible" }
            animateFrom={ props.animateFrom || "right" }
            iconMode={ props.iconMode || "static" }
            style={ [ styles.fabStyle, props.style, fabStyle ] }
         />
      </SafeAreaView>
   );
}
