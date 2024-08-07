

export function Str2Brl( v: string ) {
   return parseFloat( v ).toLocaleString( "pt-BR", { style: "currency", currency: "BRL" } );
}