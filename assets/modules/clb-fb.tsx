

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, get, child, ref, remove, } from "firebase/database";


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
 * props.ref: users/${userId}`,  // path
 * props.putValueOn: setValue( snapshot.val() ),     // place to receive the data
 * props.errMsg: "",
 * 
 * ex: -- -- -- -- --
 * GetFBData( { 
 *    ref: "customers/f1ds1fs-12fs13/name", 
 *    putValueOn: setCustomerName, 
 * } );
 * 
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
               // console.log( ": ", snapshot.val() );
               props.putValueOn( snapshot.val() )
            }
         } )
      } catch( err ) {
         console.error( "GetFBData() err:\n\n\n", err );
      }
   }
   GetData()
}





/**
 * == == == == == Delete Data 
 * 
 * import { getDatabase, ref, remove, } from "firebase/database";
 * 
 * props.ref: "customers/1233f-132sd",
 * props.msg: "Message to display when succeed",
 * props.errMsg: "Message to display when unsucceed",
 * 
 * ex: -- -- -- -- --
 * DeleteFBData( {
 *    ref: `customers/${ Cst2Delete }`,
 *    msg: "O cliente foi removido da nuvem.",
 *    errMsg: "Não foi encontrado esse cliente na nuvem",
 * } );
 * 
 */
export async function DeleteFBData( { ...props } ) {
   try {
      await remove( ref( getDatabase(), props.ref ) );
      
      alert( props.msg || "Data has been Deleted on the cloud!" );
   } catch( err ) {
      alert( props.errMsg || "Unsuccessful" );
      console.log( "DeleteData() err: ", err );
   };
}