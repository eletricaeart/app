

/* == [ functions ] 
== == == == == == == == == */
const 
   resetForm = ( form ) => {
      form.querySelectorAll( "input" ).forEach(
         v => {
            v.value = "";
         }
      );
   }
   ,
   resolveData = ( db ) => {
      let 
         data = []
         ,
         objct = []
      ;
      
      if( localStorage.getItem( db ) ) {
         data = [ ...JSON.parse( localStorage.getItem( db ) ) ];
      }
   }
   ,
   validateForm = ( form, db, htmlTemplate, htmlTarget ) => {
      let 
         data = []
         ,
         validator = []
      ;

      form.querySelectorAll( "input" ).forEach( 
         v => {
            if( 
               v.hasAttribute( "required" )
               && 
               v.value == ""
            ) {
               v.style.background = "#f00";
               v.value = "informação nescessária";
               validator.push( false );
            } else {
               validator.push( true );
            }
         }
      );
      
      validator.reduce( ( a, b ) => {
         if( a == false || b == false ) {
            return false;
         } else {
            return true;
         }
      } ) ? 
         acceptData( form, db, htmlTemplate, htmlTarget )
         : 
         _( "validator fail" );

         
   }
   ,
   acceptData = ( form, db, htmlTemplate, htmlTarget ) => {
      let 
         clients = []
         ,
         data = {
            id: `C:${ Math.random() * 99999 }-${ Math.random() * 99999 }`,
            name: i_clientName.value,
            gender: i_clientGender.value,
            cpf: i_clientCPF.value,
            rg: i_clientRG.value,
            phone: i_clientPhone.value,
            email: i_clientEmail.value,
            address: {
               street: rua.value,
               number: i_clientAddressNumber.value,
               city: cidade.value,
               district: bairro.value,
               state: uf.value,
               cep: cep.value,
            },
            services: {

            }
         }
      ;
      
      if( localStorage.getItem( db ) ) {
         clients = [ ...JSON.parse( localStorage.getItem( db ) ) ];
         
      }
      
      clients.push( data );
      localStorage.setItem( db, JSON.stringify( clients ) );
      resetForm( form );
      _( "data: ", data );
      
      createData( db, htmlTemplate, htmlTarget );
   }
   ,
   createData = ( db, htmlTemplate, htmlTarget ) => {
      let 
         data = []
         ,
         clients = []
      ;
      
      if( localStorage.getItem( db ) ) {
         
         data = [ ...JSON.parse( localStorage.getItem( db ) ) ];
      }
      
      clients = [ ...data ];
      _( "createData: clients - ", clients );
      htmlTemplate( clientsTarget, clients );
   }
;

// resetForm( formInputs );
// addEventListener( "load", () => {
// } );

// _( [ true, true, true ].reduce( ( a, b ) => {
//    if( a == false || b == false ) {
//       return false;
//    } else {
//       return true;
//    }
// } ) );