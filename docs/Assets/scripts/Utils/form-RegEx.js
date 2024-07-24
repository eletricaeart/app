
function phoneRE( input ) {
   input.value = input.value.replace( /^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3" );
   // input.value = input.value.replace( /\D/g, "" );
   // input.value = input.value.replace( /^(\d{2})(\d)/g, "($1) $2" );
   // input.value = input.value.replace( /(\d)(\d{4})$/, "$1-$2" );
}
function phoneRegEx( input ) {
   var 
      validatePhone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
      ,
      isValid = validatePhone.test( input.value )
   ;

   let res = input.value;
   
   res = res.replace( /\D/g, "" );             //Remove tudo o que não é dígito
   res = res.replace( /^(\d{2})(\d)/g, "($1) $2" ); //Coloca parênteses em volta dos dois primeiros dígitos
   res = res.replace( /(\d)(\d{4})$/, "$1-$2" );    //Coloca hífen entre o quarto e o quinto dígitos
   
   input.value = res;
}

function rgRegEx( input ) {
   let 
      res = input.value
   ;

   res = res.replace( /\D/g, "" );
   res = res.replace( /^(\d{1,2})(\d{3})(\d{3})([\dX])$/, "$1.$2.$3-$4" );

   input.value = res;
}

function cpfRegEx( input ) {
   let 
      res = input.value
   ;

   res = res.replace( /\D/g, "" );
   res = res.replace( /^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4" );

   input.value = res;
}