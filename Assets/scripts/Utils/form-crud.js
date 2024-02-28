

/* == [ functions ] 
== == == == == == == == == */
const 
   resetForm = () => {
      formInputs.querySelectorAll( "input" ).forEach(
         v => {
            v.value = "";
         }
      );
   }
   ,
   resolveData = () => {
      let 
         data = []
         ,
         objct = []
      ;
      
      if( localStorage.getItem( "Clients" ) ) {
         data = [ ...JSON.parse( localStorage.getItem( "Clients" ) ) ];
      }
   }
   ,
   validateForm = () => {
      let 
         data = []
         ,
         validator = []
      ;

      formInputs.querySelectorAll( "input" ).forEach( 
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
         acceptData()
         : 
         _( "validator fail" );

         
   }
   ,
   acceptData = () => {
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
            }
         }
      ;
      
      if( localStorage.getItem( "Clients" ) ) {
         clients = [ ...JSON.parse( localStorage.getItem( "Clients" ) ) ];
         
      }
      
      clients.push( data );
      localStorage.setItem( "Clients", JSON.stringify( clients ) );
      resetForm();
      _( "data: ", data );
      
      createData();
   }
   ,
   createData = () => {
      let 
         data = []
         ,
         clients = []
      ;
      
      if( localStorage.getItem( "Clients" ) ) {
         
         data = [ ...JSON.parse( localStorage.getItem( "Clients" ) ) ];
      }
      
      clients = [ ...data ];
      _( "createData: clients - ", clients );
      clientsTemplate( clientsTarget, clients );
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