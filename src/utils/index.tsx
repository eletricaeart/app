

export function Str2Brl( v: string ) {
   return parseFloat( v ).toLocaleString( 
      "pt-BR", { style: "currency", currency: "BRL" } 
   );
   // try {

   // } catch( err: any ) {
   //    console.log( "Str2Brl() err: ", err );
   // }
}

export function Brl2Str( v: string ) {
   const str = v.split( "R$" ).join( "" ).split( "." ).join( "" ).split( " " ).join( "" ).split( "," ).join( "." );
   return str;
}

export function Brl2Float( v: string ) {
   const float = parseFloat(
      v.split( "R$" ).join( "" ).split( "." ).join( "" ).split( " " ).join( "" ).split( "," ).join( "." )
   );
   return float;
}