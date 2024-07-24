

function Modal( props  ) {
   const 
      tagStyle = `
         <style>
            modal-display[display] {
               display: grid;
            }
            modal-display {
               display: none;
               place-items: end;
               width: 100%;
               height: 100%;
               position: fixed;
               top: 0;
               left: 0;
               background: #0005;
            }

            modal-display[display] > modal[display] {
               top: 0;
            }

            modal {
               background: var( --bg );
               box-shadow: #0005 0 6px 35px;
               border-radius: 1.2em 1.2em 0 0;
               width: calc( 100% - 1.2em );
               min-height: 40%;
               transition: .5s ease-in all;
               position: relative;
               top: 100%;
            }

            modal-option { cursor: pointer; }
         </style>
      `
      ,
      extractedItems = []
   ;
   let readyStringItems = "";
   
   $$( `modal[ ${ props.tag } ]` ).forEach( item => {
      props.items.forEach( i => {
         extractedItems.push( `
            <modal-option>
               <content>
                  ${ i }
               </content>
            </modal-option>
         ` );
      } );
   } );
   readyStringItems = extractedItems.join( "," );
   readyStringItems = readyStringItems.split( "," ).join( " " );

   $$( `modal[ ${ props.tag } ]` ).forEach( item => {
      /* return(  */item.outerHTML = (`
         <modal-display ${ props.tag } >
            ${ tagStyle }
            <modal section id="">
               <header content>
                  ${ item.querySelector( "header" ) ? item.querySelector( "header" ).innerHTML : "" }  
               </header>
               <content gap>
                  <lista>
                     ${ readyStringItems }  
                  </lista>
               </content>   
            </modal>
         </modal-display>
      `) /* ) */;
   } );
   $$( `modal-display[${ props.tag }] modal-option` ).forEach( option => {
      option.addEventListener( "click", () => {
         // _( "modal-option click" );
         $( `${ props.input }` ).value = option.innerText;
         $( `modal-display[${ props.tag }] modal` ).removeAttribute( "display" );
         setTimeout( () => {
            $( `modal-display[${ props.tag }]` ).removeAttribute( "display" );
         }, 500 );
      } );
   } );
   $( props.input ).addEventListener( "click", () => {
      $( props.input ).setAttribute( "readonly", "" );
      if( !$( `modal-display[${ props.tag }]` ).getAttribute( "display" ) ) {
         $( `modal-display[${ props.tag }]` ).setAttribute( "display", "" );
         setTimeout( () => {
            $( `modal-display[${ props.tag }] modal` ).setAttribute( "display", "" );
         }, 5 );
      }
   } );
}


/* == [ usage ] == == == == == == 
example without header
   <modal name-of-html-tag-property></modal>

example with header
   <modal name-of-html-tag-property>
      <header>
         <content>
            <h2>Título</h2>
         </content>
      </header>
   </modal>

script example
   Modal( {
      tag: "name-of-html-tag-property"
      ,
      items: [
         "pix", 
         "cartão de crédito", 
         "cartão de débito", 
         "dinheiro",
      ]
      ,
      input: "#input_id_that_will_trigger_modal"
   } );
== == == == == == == == == */