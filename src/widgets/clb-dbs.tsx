

// https://docs.expo.dev/guides/using-firebase/
// https://react-native-async-storage.github.io/async-storage/docs/install/
// npx expo install @react-native-async-storage/async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";


/* == [ global functions as CStore ]
== == == == == == == == == */
export async function Save( dbs_name, object ) {
   let list = [];

   try {
      if( await AsyncStorage.getItem( dbs_name ) ) {
         const 
            listDBs = await AsyncStorage.getItem( dbs_name )
         ;
         list = [ ...await JSON.parse( listDBs ) ];
         console.log( "Save() list: \n\n\n", list );
      }

      list.push( object );

      const jsonValue = JSON.stringify( list );
      await AsyncStorage.setItem( dbs_name, jsonValue );

      console.log( "Save() jsonValue: \n\n\n", jsonValue );

      return( jsonValue );
   } catch( err ) {
     console.log( "\n\n== == == == == ==\nSave() saving error: \n", err );
   }
}

/**
 * Save on localStprage as [ {}, {}, ]
 */
export async function SaveAsList( ls_name: string, object ) {
   let list = [];

   try {
      if( await AsyncStorage.getItem( ls_name ) ) {
         const 
            listDBs = await AsyncStorage.getItem( ls_name )
            ,
            parsedList = await JSON.parse( listDBs )
         ;
         list = [ ...parsedList ];
         console.log( "SaveAsList() list: \n\n\n", list );
      }

      list.push( object );

      const jsonValue = JSON.stringify( list );
      await AsyncStorage.setItem( ls_name, jsonValue );

      console.log( "SaveAsList() jsonValue: \n\n\n", jsonValue );

      return( jsonValue );
   } catch( err ) {
     console.log( "\n\n== == == == == ==\nSaveAsList() saving error: \n", err );
   }
}








/* == [ examples ]
== == == == == == == == == */
/* Storing string value
 */
export async function StoreData( value: string, dbs_name: string ) {
   try {
      await AsyncStorage.setItem( dbs_name, value );
   } catch( err ) {
     // saving error
   }
}


 /* Storing object value
  */
export async function StoreObjData( dbs_name: string, value: string ) {
   try {
      const jsonValue = JSON.stringify( value );
      await AsyncStorage.setItem( dbs_name, jsonValue );
   } catch( err ) {
     // saving error
   }
};


 /* Reading string value
  */
 export async function GetData( dbs_name: string ) {
   try {
      const value = await AsyncStorage.getItem( dbs_name );
      if( value !== null ) {
         // value previously stored
      }
   } catch( err ) {
   // error reading value
   }
};


 /* Reading object value
  */
export async function GetObjData( dbs_name: string ) {
   try {
      const jsonValue = await AsyncStorage.getItem( dbs_name );
      return jsonValue != null ? JSON.parse( jsonValue ) : null;
   } catch( err ) {
   // error reading value
   }
};


 /* Delete value
  */
export async function DeleteData( dbs_name: string ) {
   try {
      AsyncStorage.removeItem( dbs_name );
   } catch( err ) {
   // error reading value
   }
};


