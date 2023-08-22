

"use strict";
/* ==[ properties ]=============================== */
const 
   $ = v => document.querySelector( v ),
   $$ = v => document.querySelectorAll( v ),

   log = v => console.log( v ),
   table = v => console.table( v ),
   error = v => console.error( v ),
   warn = v => console.warn( v ),
   group = v => console.group( v ),
   time = v => console.time( v ),
   timeEnd = v => console.timeEnd( v );
/* ----------------------------------------------- */



/* ==[ events ]=================================== */
window.addEventListener( "load", ev => {
   let links = $$( "[link]" );



   links.forEach( link => link.addEventListener( "click", ev => {
      window.open( link.getAttribute( "link" ), "_blank" );
   } ) );

} );

