

// https://app.svgator.com/editor#/96c7c11262aa48dca85ee88d66ad0219
// https://react-svgr.com/playground/?native=true&typescript=true
import React, { useState} from "react";
import Svg, { Path, Polygon, ClipPath, SvgProps, } from "react-native-svg";
import {
   StyleSheet,
   View, 
   Text,
   Pressable,
} from "react-native";


export const SvgSquare01 = ( { ...props } ) => {
   const 
      fill = props.fill || "#00559c"
   ;
   return( <>
      <Svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 400 100"
      {...props}
      //   width={ "100%" }
      //   width={ "100%" }
      //   height={ 100 }
      >
      <Path
         fill={ fill }
         stroke="#3f5787"
         strokeWidth={ 0 }
         d="M0 24.499 18.075 0H400v77.151L378.782 100H0V24.499Z"
         />
      </Svg>
   </> );
};

export const SvgSquare02 = ( { ...props } ) => {
   const 
      fill = props.fill || "#00559c"
   ;
   return( <>
      <Svg
         xmlns="http://www.w3.org/2000/svg"
         shapeRendering="geometricPrecision"
         textRendering="geometricPrecision"
         viewBox="0 0 400 60"
         {...props}
      >
         <Path
            fill={ fill }
            stroke="#3f5787"
            strokeWidth={0}
            d="M0 16.287 14.931 0H400v40.648L382.711 60H0V16.287Z"
         />
      </Svg>
   </> );
};

export const BtnSquare01 = ( { ...props } ) => {
   const 
      bg = props.bg || "#27f",
      fill = props.fill || "#f00",
      color = props.color || "#fff",
      text = props.text,
      svgSty = props.svgSty,
      IsPressed = props.IsPressed,
      ratio = props.ratio || "4 / .6"
   ;
   const 
      [ Pressed, setPressed ] = useState( IsPressed )
   ;

   return( <>
      <View style={{
         backgroundColor: bg,
         width: "100%",
         // height: 50,
         // aspectRatio: "4 / .6",
         aspectRatio: ratio,
         position: "relative",
         
      }}>
         <SvgSquare02 style={ [ { padding: Pressed ? 8 : 0 }, svgSty, ]} fill={ fill } />
         <View style={{ position: "absolute", backgroundColor: "#fc00", 
            width: "100%", height: "100%", 
            alignItems: "center", justifyContent: "center",
         }}>
            { text ? 
               <Text style={{ fontSize: 18, fontWeight: "bold", color: color, }}>{ text }</Text>
               : 
               props.children }
         </View>
      </View>
   </> );
};

