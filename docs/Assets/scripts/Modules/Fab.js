

function Fab( props = { text: "+" } ) {
   let 
      data = {}
   ;
 
   return( $( "fab" ).outerHTML = `
      <fab>
         <content>
            <t>
               <a href="${ 
                  props.to 
                  || 
                  props.href 
                  || 
                  props.url 
                  || 
                  props.src 
                  || 
                  "#" }" "_self">
                  ${ props.text ? props.text : "+" }
               </a>
            </t>
         </content>
      </fab>
   ` );  
}