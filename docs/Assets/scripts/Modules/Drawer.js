

function Drawer( props ) {
   let 
      template = ""
      ,
      profile = {
         user: "Rafael Ângelo Sammarco",
         phone: "(13) 9 9148 - 6078",
         pic: "./ea.jpg"
      }
      ,
      items = [
         {
            name: "Home",
            icon: "../Assets/imgs/icons/contacts.svg",
            link: "./home.html",
         },
         {
            name: "Clientes",
            icon: "../Assets/imgs/icons/contacts.svg",
            link: "./customers.html",
         },
         {
            name: "Orçamentos",
            icon: "../Assets/imgs/icons/contacts.svg",
            link: "./budgets.html",
         },
         {
            name: "Recibos",
            icon: "../Assets/imgs/icons/contacts.svg",
            link: "./receipts.html",
         },
         {
            name: "Serviços",
            icon: "../Assets/imgs/icons/contacts.svg",
            link: "./services.html",
         },
         {
            name: "Criar Orçamento",
            icon: "../Assets/imgs/icons/invoice.svg",
            link: "./print-page.html",
         },
         {
            name: "Suporte",
            icon: "../Assets/imgs/icons/contacts.svg",
            link: "./support.html",
         },
      ]
   ;

   template = `
      <drawer id="drawer" closed>
         <drawer-inside>
            <header>
               <user-profile>
                  <user-pic content>
                     <picture>
                        <img src="${ profile.pic }" alt="user pic">
                     </picture>
                  </user-pic>
                  <user-info>
                     <content>
                        <user-name>${ profile.user }</user-name>
                        <user-phone>${ profile.phone }</user-phone>
                     </content>
                  </user-info>
               </user-profile>
            </header>
            <content>
               <main-menu section>`
   ;
   items.forEach( item => { template += `
         <menu-item>
            <icon>
               <img src="${ item.icon }" alt="">
            </icon>
            <t>
               <a href="${ item.link }">${ item.name }</a>
            </t>
         </menu-item>
   ` } );
   template += `         
               </main-menu>
            </content>
            <footer>
               <p>Logout</p>
            </footer>
         </drawer-inside>
         <drawer-outside id="drawerOutside"></drawer-outside>
      </drawer>
   `;

   if( $( "drawer" ) ) {
      return( $( "drawer" ).outerHTML = template );
   }
   // return( $( "drawer" ).outerHTML = template );
}

// Drawer();
/* 
addEventListener( "load", () => {
   openDrawer.addEventListener( "click", () => {
      if( drawer.getAttribute( "opened" ) ) {
         drawer.setAttribute( "closed", "" );
         drawer.removeAttribute( "opened" );
      } else {
         drawer.setAttribute( "opened", "" );
         drawer.removeAttribute( "closed" );
      }
   } );
   drawerOutside.addEventListener( "click", () => {
      drawer.removeAttribute( "opened" );
      drawer.setAttribute( "closed", "" );
   } );

   backBtn.addEventListener( "click", () => {
      history.back();
      
   } );
   
} ); */

addEventListener( "load", () => {
   if( $( "#openDrawer" ) ) {
      openDrawer.addEventListener( "click", () => {
         if( drawer.getAttribute( "opened" ) ) {
            drawer.setAttribute( "closed", "" );
            drawer.removeAttribute( "opened" );
         } else {
            drawer.setAttribute( "opened", "" );
            drawer.removeAttribute( "closed" );
         }
      } );
      drawerOutside.addEventListener( "click", () => {
         drawer.removeAttribute( "opened" );
         drawer.setAttribute( "closed", "" );
      } );

      backBtn.addEventListener( "click", () => {
         history.back();
      } );
   }
} );