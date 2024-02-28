

const 
   _ = ( ...v ) => console.log( ...v )
   ,
   $ = v => document.querySelector( v )
   ,
   $$ = v => document.querySelectorAll( v )
;



/* == [ events ] 
== == == == == == == == == */
window.addEventListener( "load", ev => {
   let NavLinks = $$( "navlink" );



   NavLinks.forEach( link => link.addEventListener( "click", ev => {
      window.open( link.getAttribute( "to" ), "_blank" );
   } ) );

} );