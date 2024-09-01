

export function Str2Brl( v: string ): string {
   // "576.46".toLocaleString( "pt-BR", { style: "currency", currency: "BRL" } );
   return parseFloat( v ).toLocaleString( 
      "pt-BR", { style: "currency", currency: "BRL" } 
   );
   // try {

   // } catch( err: any ) {
   //    console.log( "Str2Brl() err: ", err );
   // }
}

export function Float2Brl( v: number ): string {
   // 576.46.toLocaleString( "pt-BR", { style: "currency", currency: "BRL" } );
   return v.toLocaleString( 
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

export function FixBrl( n ) {
   // fix number from <MaskInput
   const 
      comple = n.toString().split( "" )
      ,
      o = comple.pop()
      ,
      t = comple.pop()
   ;
   let completo = "";
   
   comple.push( "." );
   comple.push( t );
   comple.push( o );
   completo = comple.join( "" );

   return completo;
}

export function CutRS( s ) {
   const data = s.split( "R$" ).join( "" );
   return data;
}