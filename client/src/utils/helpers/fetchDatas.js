

import { useEffect, useState } from "react";

export default App = () => {
   const 
      [ data, setData ] = useState( [] ),
      url = "https://gorest.co.in/public/v2/users";

   useEffect( () => {
      fetch( url ).then(
         response => response.json()
      ).then(
         json => setData( json )
      );
   }, [] );

   return( <>
      <ul>
         { data.map( user => (
            <li key={ user.id }>{ user.name }</li>
         ) ) }
      </ul>
   </> );
};

