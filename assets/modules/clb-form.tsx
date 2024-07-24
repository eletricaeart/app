

import React from "react";


export function ClearInputs( inputs: any[] ) {
   inputs.forEach( input => {
      input( "" );
   } );
   console.log( "inputs cleared" );
}