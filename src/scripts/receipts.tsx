

export async function GetTotal( tempList: any[] ) {
   try {
      const 
         data = 0
      ;

      tempList.forEach( item => {
         data = data + item.total
      } );

      return data;
   } catch( err: any ) {
      console.error( "GetTotal() err: \n\n\n", err );
   }
}