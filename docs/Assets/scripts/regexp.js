

'use strict';
/* [ properties ]
=================================== */
const 
   mask = {
      tel: ( input, Value ) => {
         Value = Value.replace( /\D/g, "" );
         Value = Value.replace( /^(\d{2})(\d)/g, "($1) $2" );
         Value = Value.replace( /(\d)(\d{4})$/, "$1-$2" );
         /* telefone */input.value = Value;
      }
      ,
   }
   ,
   rgx = {
      tel: /^(\d{2})(\d{5})(\d{4})/
      ,
   }
   ,
   sbst = {
      tel: "($1) $2-$3"
      ,
   }
;


/* -------------------------------- */

/* == [ global functions ]
== == == == == == == == == */



/* _( "rgx: \n",
   "13991486078".replace( rgx.tel, sbst.tel ),
   "13991486078".replace( /^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3" )
); */

/* == [ events ] 
== == == == == == == == == */
window.addEventListener( "load", () => {  

   /* input tel == == == == == == == == == */
   $$( "input[type='tel'" ).forEach( input => {
      input.addEventListener( "keypress", el => {
         mask.tel( input, el.target.value );
         // _( "el.target keypress: \n", el );
      } );
      input.addEventListener( "change", el => {
         mask.tel( input, el.target.value );
         // _( "el.target change: \n", el );
      } );
      input.addEventListener( "blur", () => {
         input.value = input.value.replace( rgx.tel, sbst.tel );
      } );
   } );

} );

/* pattern 
   ^ inicio
   $ fim
   \d{4,4} só 4 digitos
   [0,9]{3} 3 digits
   [a-z]{4,8} 4 to 8 lowercase
   \(\d{2}\)\s*\d{5}-\d{4} pattern (13) 99148-6078
   pattern="\(\d{2}\)\s*\d{5}-\d{4}" maxlength="15"
*/