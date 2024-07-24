

"use strict";
/* [ properties ]
=================================== */
const 
   app = `
   <style>
      appbar {
         background: var( --card-lv1 );
         box-shadow: var(--appbar-shadow);
         height: 72px;
      }
      app-ea > content, 
      appbar > content {
         flex-direction: row;
         align-items: center;
         height: 100%;
         padding: 0 16px;
      }

      appbar-menu-left,
      appbar-menu-right {
         display: flex;
         height: clamp( 20px, 35%, 48px );
         aspect-ratio: 1;
      }
      content:has( > trigram ) {
         padding: 2px;
         width: 100%;
         height: 100%;
         aspect-ratio: 1;
      }
      trigram {
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         width: 100%;
         height: 100%;
         aspect-ratio: 1;
         cursor: pointer;
      }
      trigram > bar {
         display: flex;
         width: 100%;
         aspect-ratio: 7 / 1;
         border-radius: 9px;
         background: #fff;
      }

      appbar-logo {
         display: flex;
         height: 72px;
         flex: 1;
         align-items: center;
         justify-content: center;
      }

      app-logo {
         display: flex;
         height: 72px;
         flex: 1;
         align-items: center;
         justify-content: center;
      }
      ea-logo {
         display: flex;
         align-items: center;
         justify-content: space-between;
         height: 72px;
         aspect-ratio: 2.6 / 1;
      }
      logo-icon {
         display: flex;
      } logo-icon > img {
         border-radius: 100vw;
         box-shadow: var(--appbar-logo-shadow);
         max-width: calc( 60px - 6px );
         max-height: calc( 60px - 6px );
         aspect-ratio: 1;
      }
      ea-logo logo-title {
         display: flex;
         align-items: center;
         justify-content: center;
         flex: 1;
      } 
      logo-title > content {
         padding: 0;
         line-height: .9em;
      }
      logo-title > content tt {
         font-family: holic;
         font-family: Comtec;
         font-family: thunder;
         color: var(--appbar-title);
         font-size: 1.5em;
         align-items: center;
         justify-content: center;
         width: 100%;
         display: flex;
         text-shadow: var(--appbar-title-shadow);   
      }
      logo-title > content tt:nth-child( even ) {
         color: var(--appbar-title-divider);
      }


      appbar app-options {
         flex: .2;
         max-height: calc( 68px - 4px );
         max-width: calc( 68px - 4px );
      }
      
      drawer {
         display: none;
         flex-direction: row;
         width: 100%;
         height: 100dvh;
         position: fixed;
         top: 0;
         left: 0;
         z-index: 9;
         background: #0005;
      }
      drawer[opened] { display: flex; }
      drawer[closed] { display: none; }
      drawer-inside {
         display: flex;
         flex-direction: column;
         height: 100dvh;
         /* flex: 7.5; */
         /* opacity: 0; */
         background: var( --card-lv3, #fff );
         box-shadow: #0005 0 0 5px;
         transition: all 5s cubic-bezier(0.68, -0.55, 0, 1.31);
      }
      drawer[opened] > drawer-inside {
         /* animation: openingDrawer .5s .5s ease-in; */
         width: clamp( 100px, 75%, 350px );
      }
      drawer[closed] > drawer-inside {
         /* transition: all 5s cubic-bezier(0.68, -0.55, 0, 1.31); */
         /* flex: 0.5; */
         width: 0;
         /* opacity: 0; */
      }
      drawer-outside {
         display: flex;
         flex: 2.5;
      }


      drawer-inside > header {
         display: flex;
         width: 100%;
         height: 100px;
         background: var( --card-lv1 );
      }
      drawer-inside > content {
         background-color: var( --bg );
         height: 100%;
      }


      drawer main-menu {
         gap: 1rem;
      }
      menu-item {  
         display: flex;
         background: var( --bg2 );
         padding: 4px;
         border-radius: 9px;
         align-items: center;
         justify-content: flex-start;
         gap: 1rem;
         color: var(--card-lv1);
      }

      icon {
         display: grid;
         place-items: center;
         width: 36px;
         height: 36px;
         aspect-ratio: 1;
      }
   </style>
      <!--appbar-->
         <!-- <content>
            <app-logo>
               <img src="./ea.jpg" alt="ea" />
            </app-logo>
            <app-title>
               <content>
                  <tt>ELETRICA</tt>
                  <tt>&</tt>
                  <tt>ART</tt>
               </content>
            </app-title>
            <app-options></app-options>
         </content> -->
         <content>
            <appbar-menu-left>
               <content>
                  <trigram id="openDrawer">
                     <bar id="topBar_left"></bar>
                     <bar id="centerBar_left"></bar>
                     <bar id="bottomBar_left"></bar>
                  </trigram>
               </content>
            </appbar-menu-left>
            <appbar-logo>
               <ea-logo>
                  <logo-icon>
                     <img src="./ea.jpg" alt="ea" />
                  </logo-icon>
                  <logo-title>
                     <content>
                        <tt>ELETRICA</tt>
                        <tt>&</tt>
                        <tt>ART</tt>
                     </content>
                  </logo-title>
               </ea-logo>
            </appbar-logo>
            <appbar-menu-right>
               <content id="">
                  <trigram id="trigram_right">
                     <bar id="topBar_right"></bar>
                     <bar id="centerBar_right"></bar>
                     <bar id="bottomBar_right"></bar>
                  </trigram>
               </content>
            </appbar-menu-right>
         </content>
      </!--appbar-->
      <drawer id="drawer">
            <drawer-inside>
            <header>
               <content>
                  <app-logo>
                     <ea-logo>
                        <logo-icon>
                           <img src="./ea.jpg" alt="ea" />
                        </logo-icon>
                        <logo-title>
                           <content>
                              <tt>ELETRICA</tt>
                              <tt>&</tt>
                              <tt>ART</tt>
                           </content>
                        </lo-title>
                     </ea-logo>
                  </app-logo>
               </content>
            </header>
            <content>
               <main-menu section>
                  <menu-item>
                     <icon>
                        <img src="./Assets/imgs/icons/contacts.svg" alt="">
                     </icon>
                     <t>Contatos</t>
                  </menu-item>
                  <menu-item>
                     <icon>
                        <img src="./Assets/imgs/icons/contacts.svg" alt="">
                     </icon>
                     <t>Cadastrar Usuário</t>
                  </menu-item>
                  <menu-item>
                     <icon>
                        <img src="./Assets/imgs/icons/invoice.svg" alt="">
                     </icon>
                     <t>Criar Orçamento</t>
                  </menu-item>
               </main-menu>
            </content>
         </drawer-inside>
         <drawer-outside id="drawerOutside"></drawer-outside>
      </drawer>
      <script>
      </script>
   `
;
/* -------------------------------- */

window.addEventListener( "load", ev => {
   // $( "app" ).outerHTML = App;
} );

/* == [ drawer links template ] == == == == == == == == == */
class App extends HTMLElement {
   constructor() {
      super();
      let 
         appTagTemplate = document.createElement( "template" )
      ;
      appTagTemplate.innerHTML = app;
      this.attachShadow( { mode: "open" } );
      this.shadowRoot.append( 
         appTagTemplate.content.cloneNode( true ) 
      );
   } 
   connectedCallback() {
      this.render();
   }
   render() {
      window.addEventListener( 'load', () => {
         $( "#openDrawer" ).addEventListener( "click", () => {
            if( $( "#drawer" ).getAttribute( "opened" ) ) {
               $( "#drawer" ).setAttribute( "closed", "" );
               $( "#drawer" ).removeAttribute( "opened" );
            } else {
               $( "#drawer" ).setAttribute( "opened", "" );
               $( "#drawer" ).removeAttribute( "closed" );
            }
         } );
         $( "#drawerOutside" ).addEventListener( "click", () => {
            $( "#drawer" ).removeAttribute( "opened" );
            $( "#drawer" ).setAttribute( "closed", "" );
         } );
      } );
   }
}
window.customElements.define( 
   "app-ea", App 
);
