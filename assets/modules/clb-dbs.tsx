

// https://react-native-async-storage.github.io/async-storage/docs/install/
// npx expo install @react-native-async-storage/async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// "working getDBs_n_setDBs"
// useEffect( () => {
//    const fetchData = async () => {
//       const data = await AsyncStorage.getItem( "customer_dbs" );
//       const json = await JSON.parse( data );
//          console.log( "json: \n\n\n", json );
//       setCustomers( json );
//    }

//    fetchData()
//       .catch( console.error );
// }, [] );


/* == [ global functions as CStore ]
== == == == == == == == == */
export async function Save( dbs_name, object ) {
   let list = [];
   // let data = {
   //    Name: Name,
   //    Cellphone: Cellphone,
   //    Whatsapp: Whatsapp,
   //    Phone: Phone,
   //    Phone2: Phone2,
   //    Email: Email,
   //    Rg: Rg,
   //    Cpf: Cpf,
   //    Cep: Cep,
   //    Estate: Estate,
   //    Street: Street,
   //    Number: Number,
   //    Complemento: Complemento,
   //    District: District,
   //    City: City,
   //    Note: Note 
   // };

   try {
      if( await AsyncStorage.getItem( dbs_name ) ) {
         const 
            listDBs = await AsyncStorage.getItem( dbs_name )
         ;
         list = [ ...await JSON.parse( listDBs ) ]
      }

      list.push( object );

      const jsonValue = JSON.stringify( list );
      await AsyncStorage.setItem( dbs_name, jsonValue );

      return( jsonValue );
   } catch( err ) {
     console.log( "\n\n== == == == == ==\nsaving error: \n", err );
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


