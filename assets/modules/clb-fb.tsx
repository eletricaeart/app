

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, get, child, ref, } from "firebase/database";


// const fbConfig = { ... };
// const fbApp = initializeApp( fbApp );

/**
 * == == == == == Register User
 * 
 * import { getDatabase, get, child, ref, } from "firebase/database";
 */
async function RegisterUser( { ...props } ) {
   try {
      createUserWithEmailAndPassword( getAuth(), props.email, props.password )
      .
      then( userCredential => {
         const user = userCredential.user;
      } )
   } catch( err: any ) {
      console.log( err.code, err.message );
   }
}








/**
 * == == == == == Read data once
 * 
 * import { getDatabase, ref, child, get } from "firebase/database";
 * 
 * props.ref: users/${userId}`,
 * props.putValue: setValue,
 * props.errMsg: "",
 */
export async function GetFBData( { ...props } ) {
   async function GetData() {
      try {
         await get( 
            child( 
               ref( getDatabase() ), 
               props.ref // `users/${userId}` 
            ) 
         ).then( snapshot => {
            if( snapshot.exists() ) {
               console.log( ": ", snapshot.val() );
               props.putValue( snapshot.val() )
            } else {
               console.log( "oi err: ", props.errMsg || "No data available" );
            }
         } )
      } catch( err ) {
         console.error( "GetFBData() err:\n\n\n", err );
      }
   }
   GetData()
}