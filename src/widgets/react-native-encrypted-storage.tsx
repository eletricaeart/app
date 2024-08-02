/* 

import EncryptedStorage from "react-native-encrypted-storage";

` == Storing a value
== == == == == == == == == `;
async function storeUserSession() {
   try {
      await EncryptedStorage.setItem(
         "user_session",
         JSON.stringify( {
            age : 21,
            token : "ACCESS_TOKEN",
            username : "emeraldsanto",
            languages : [ "fr", "en", "de" ]
         } )
      );

      "Congrats! You've just stored your first value!";
   } catch( error ) {
      "There was an error on the native side";
   }
}

`== Retrieving a value
== == == == == == == == == `;
async function retrieveUserSession() {
   try {   
      const 
         session = await EncryptedStorage.getItem( "user_session" )
      ;
   
      if( session !== undefined ) {
         "Congrats! You've just retrieved your first value!";
      }
   } catch( error ) {
      "There was an error on the native sid";
   }
}

`== Removing a value
== == == == == == == == == `;
async function removeUserSession() {
   try {
      await EncryptedStorage.removeItem( "user_session" );
      "Congrats! You've just removed your first value!";
   } catch( error ) {
      "There was an error on the native side";
   }
}

 */