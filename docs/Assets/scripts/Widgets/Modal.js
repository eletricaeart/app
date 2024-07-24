

function Modal( props  ) {
   const 
      tagStyle = `
         <style>
         modal-display[display] {
            display: grid;
         }
         modal-display {
            display: none;
            place-items: center;
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background: #fff9;
         }

         modal {
            background: var( --bg );
            box-shadow: #0005 0 6px 35px;
            border-radius: 1.2em;
            width: calc( 100% - 1.2em );
         }
         modal[section="formOfPayment"] {
            min-height: 50vh  ;
         }
         modal[section="formOfPayment"] > content {
            align-items: center;
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
         extractedItems.push( `<modal-option><label><t>${ i }</t></label></modal-option>` );
      } );
   } );
   readyStringItems = extractedItems.join( "," );
   readyStringItems = readyStringItems.split( "," ).join( " " );

   $$( `modal[ ${ props.tag } ]` ).forEach( item => {
      /* return(  */item.outerHTML = (`
         <modal-display ${ props.tag } >
            ${ tagStyle }
            <content>
               <modal section id="">
                  <header content>
                     <tt>" title "</tt>   
                  </header>
                  <content gap>
                     ${ readyStringItems }  
                  </content>   
               </modal>
            <content>
         </modal-display>
      `) /* ) */;
   } );
   $$( `modal-display[${ props.tag }] modal-option` ).forEach( option => {
      option.addEventListener( "click", () => {
         // _( "modal-option click" );
         $( `${ props.input }` ).value = option.innerText;
         $( `modal-display[${ props.tag }]` ).removeAttribute( "display" );
      } );
   } );
   $( props.input ).addEventListener( "click", () => {
      if( !$( `modal-display[${ props.tag }]` ).getAttribute( "display" ) ) {
         $( `modal-display[${ props.tag }]` ).setAttribute( "display", "" );
      }
   } );
}


/* 

input_formOfPayment.addEventListener( "click", () => {
   $( "modal-display" ).setAttribute( "display", "" );
   
   $$( "modal-option" ).forEach( option => {
      option.addEventListener( "click", () => {
         input_formOfPayment.value = option.innerText;
         $( "modal-display" ).removeAttribute( "display" );
      } );
   } );
} );


Mod( {
   items: [
      "pix", "cartão de crédito", "cartão de débito", "dinheiro",
   ]
} );
*/