

import { useState, useEffect } from "react";

export default function useFetch( url ) {
   const 
      [ Data, setData ] = useState( null )
      ,
      [ Loading, setLoading ] = useState( true )
      ,
      [ Error, setError ] = useState( null )
   ;

   useEffect( () => {
      const fetchData = async () => {
         try {
            const response = await fetch( url );
            if( !response.ok ) throw new Error( "Network response was not ok" );
            const result = await response.json();
            setData( result );
         } catch( err ) {
            setError( err );
         } finally {
            setLoading( false );
         }
      };

      fetchData();
   }, [ url ] );

   return { Data, Loading, Error };
}


/** 
 * usage useFetch 
 * 
 * import useFetch from './useFetch';
 * 
 * const { data, loading, error } = useFetch('https://api.example.com/data');
 * 
 * if( loading ) return <div>Loading...</div>;
 * if( error ) return <div>Error: {error.message}</div>;
 * <pre>{ JSON.stringify( data, null, 2 ) }</pre>
 */