

function NavBar( 
   props = { 
      item1: { 
         name: "A" 
      }
      ,
      item2: { 
         name: "B" 
      }
      ,
      item3: { 
         name: "C" 
      }
      ,
      item4: { 
         name: "D" 
      }
      ,
   } 
) {
   $$( "navbar" ).forEach( tag => {
      return( tag.outerHTML = `
         <navbar>
            <style>
            </style>
            <nav-item>
               <ico>
                  <i class="fa-solid fa-users"></i>
                  <t>Item</t>
               </ico>
            </nav-item>
            <nav-item>
               <ico>
                  <i class="fa-solid fa-users"></i>
                  <t>Item</t>
               </ico>
            </nav-item>
            <nav-item>
               <ico>
                  <i class="fa-solid fa-users"></i>
                  <t>Item</t>
               </ico>
            </nav-item>
            <nav-item>
               <ico>
                  <i class="fa-solid fa-users"></i>
                  <t>Item</t>
               </ico>
            </nav-item>
            <nav-item>
               <ico>
                  <i class="fa-solid fa-users"></i>
                  <t>Item</t>
               </ico>
            </nav-item>
         </navbar>
      ` );
   } );
}

NavBar();

/*

<nav-item>${ props.item1.name }</nav-item>
<nav-item>${ props.item2.name }</nav-item>
<nav-item>${ props.item3.name }</nav-item>
<nav-item>${ props.item4.name }</nav-item>
*/