

import React, { useState, useEffect, } from "react";
import {
   useWindowDimensions,
} from "react-native";


export default function useWindow() {
   const 
      { width, height, scale, fontScale } = useWindowDimensions()
   ;

   return {
      width, height, scale, fontScale,
   };
}