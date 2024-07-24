

function Button( props  ) {
   const 
      buttonStyle = `
         <style>
            button[ btn="${ props.tag }" ] {
               margin: ${ props.margin || "0" };
               padding: ${ props.tagpadding || "0" };
               background: ${ props.bg || "#27f" };
               border: ${ props.border || "transparent" };
               border-radius: ${ props.radius || ".55em" };
               color: ${ props.color || "#fff" };
               text-transform: uppercase;
               font-weight: bold;
               font-size: ${ props.size || "1em" };
            }
            button[ btn="${ props.tag }" ] > content {
               padding: ${ props.padding || "1.125em 2em" };
            }
         </style>
      `
   ;
   
   $$( `button[btn="${ props.tag }"` ).forEach( item => {
      /* item.addEventListener( "click", () => {
         _( "btn clicked" );
      } ); */
      /* return( item.outerHTML = `
         <button btn="${ props.tag }">
            ${ buttonStyle }
            <content>
               ${ item.innerText || "send" }
            </content>   
         </button>   
      ` ); */
      return( 
         ( item.outerHTML = `
            <button btn="${ props.tag }">
               ${ buttonStyle }
               <content>
                  ${ item.innerText || "send" }
               </content>   
            </button>   
         ` ) 
         + 
         (
            $( `button[btn="${ props.tag }"` ).setAttribute( 
               "id"
               , 
               !item.getAttribute( "id" ) ? 
                  `btn_${ props.tag }` 
                  : 
                  item.getAttribute( "id" )
            )
         )
         +
         (
            $( `button[btn="${ props.tag }"` ).addEventListener(
               "click", () => {
                  !props.callback ?
                     _( `callback for \n<button btn="${ item.getAttribute( 'btn' ) }"> \nisn'n defined` )
                     : 
                     props.callback();
               }
            )
         )
      );
   } );
}