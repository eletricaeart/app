

import React from "react";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   Button,

} from "react-native";


/* == [ texts ]
== == == == == == == == == */
export function H1( { ...props } ) {
   return( <>
     <Text style={ [ props.style, {
         marginLeft: 0,
         marginRight: 0,
         paddingLeft: 0,
         paddingRight: 0,
         fontSize: 2*16,
         fontWeight: "bold",
         color: props.color || "#333",
      } ] }> { props.children } </Text>
   </> );
}

export function H2( { ...props } ) {
   return( <>
     <Text style={ [ props.style, {
         marginLeft: 0,
         marginRight: 0,
         paddingLeft: 0,
         paddingRight: 0,
         fontSize: 1.5*16,
         fontWeight: "bold",
         color: props.color || "#333",
         textAlign: "start",
      } ] }> { props.children } </Text>
   </> );
}

export function H3( { ...props } ) {
   return( <>
     <Text style={ [ props.style, {
         marginLeft: 0,
         marginRight: 0,
         paddingLeft: 0,
         paddingRight: 0,
         fontSize: 1.3*16,
         fontWeight: "bold",
         color: props.color || "#333",
      } ] }> { props.children } </Text>
   </> );
}

export function H4( { ...props } ) {
   return( <>
     <Text style={ [ props.style, {
         marginLeft: 0,
         marginRight: 0,
         paddingLeft: 0,
         paddingRight: 0,
         fontSize: 18,
         fontWeight: "bold",
         color: props.color || "#333",
      } ] }> { props.children } </Text>
   </> );
}

export function H5( { ...props } ) {
   return( <>
     <Text style={ [ props.style, {
         marginLeft: 0,
         marginRight: 0,
         paddingLeft: 0,
         paddingRight: 0,
         fontSize: .9*16,
         fontWeight: "bold",
         color: props.color || "#333",
      } ] }> { props.children } </Text>
   </> );
}

export function H6( { ...props } ) {
   return( <>
     <Text style={ [ props.style, {
         marginLeft: 0,
         marginRight: 0,
         paddingLeft: 0,
         paddingRight: 0,
         fontSize: .8*16,
         fontWeight: "bold",
         color: props.color || "#333",
      } ] }> { props.children } </Text>
   </> );
}

export function P( { ...props } ) {
   return( <>
     <Text style={ [ props.style, {
         marginLeft: 0,
         marginRight: 0,
         paddingLeft: 0,
         paddingRight: 0,
         fontSize: 1*16,
         fontWeight: "regular",
         color: props.color || "#333",
      } ] }> { props.children } </Text>
   </> );
}

export function T( { ...props } ) {
   return( <>
     <Text style={ [ props.style, {
         marginLeft: 0,
         marginRight: 0,
         paddingLeft: 0,
         paddingRight: 0,
         fontSize: 1*16, 
         fontWeight: "normal",
         color: props.color || "#333",
         textAlign: "start",
      } ] }> { props.children } </Text>
   </> );
}


/* == [ box ]
== == == == == == == == == */
export const Header = ( { ...props } ) => {
   const 
      s = StyleSheet.create( {
         view: {
            paddingTop: 24,
            paddingBottom: 24,
         }
      } )
   ;

   return( <>
      <View style={ 
         [ 
            s.view
            ,
            {
               backgroundColor: props.bg || "transparent"
               ,
            },
            props.style,
         ]
      }>
         { props.children }
      </View>
   </> );
}

export const Section = ( { ...props } ) => {
   const 
      s = StyleSheet.create( {
         view: {}
      } )
   ;

   return( <>
      <View style={ 
         [ 
            s.view
            ,
            {
               backgroundColor: props.bg || "transparent"
            },
            props.style,
         ]
      }>
         { props.children }
      </View>
   </> );
}

export const Content = ( { ...props } ) => {
   const 
      s = StyleSheet.create( {
         view: {
            padding: 16,
         }
      } )
   ;

   return( <>
      <View style={ [ 
         s.view, 
         {
            backgroundColor: props.bg || "transparent",
            gap: props.gap || 0,
         },
         props.style,
      ] }>
         { props.children }
      </View>
   </> );
}





export const Card = ( { ...props } ) => {
   const 
      s = StyleSheet.create( {
         view: {}
      } )
   ;

   return( <>
      <View style={ 
         [ 
            s.view
            ,
            {
               backgroundColor: props.bg || "transparent"
            }
         ]
      }>
         { props.children }
      </View>
   </> );
}

export const Tiles = ( { ...props } ) => {
   const 
      s = StyleSheet.create( {
         view: {
            flexDirection: "row",
            flexWrap: "wrap",
            backgroundColor: "#fff0",
            rowGap: 24,
            justifyContent: "space-between",
         }
      } )
   ;

   return( <>
      <View style={ 
         [ 
            s.view
            ,
            {
               backgroundColor: props.bg || "transparent"
            }
         ]
      }>
         { props.children }
      </View>
   </> );
}

export const Tile = ( { ...props } ) => {
   const 
      s = StyleSheet.create( {
         view: {
            flexBasis: "47%",
            // flex: .47,
            backgroundColor: "#fff0",
            borderRadius: 12,
            borderColor: "#777",
            elevation: 5,
            overflow: "hidden",
         }
      } )
   ;

   return( <>
      <View style={ 
         [ 
            s.view
            ,
            {
               backgroundColor: props.bg || "transparent"
            }
         ]
      }>
         { props.children }
      </View>
   </> );
}