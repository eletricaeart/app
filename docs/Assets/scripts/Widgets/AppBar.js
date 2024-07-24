

"use strict";
/* [ properties ]
=================================== */
const 
   appbar = `
      <style>
         appbar-content {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 100%;
            padding: 0 16px;
         }
         appbar {
            background: var( --card-lv1 );
            box-shadow: var(--appbar-shadow);
            height: 72px;
         }
         app-bar > content, 
         appbar > content, content {
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
      </style>
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
   `
;
/* -------------------------------- */

window.addEventListener( "load", ev => {
   // $( "appbar" ).outerHTML = appbarTemplate;
   _( "root" );
} );

/* == [ drawer links template ] == == == == == == == == == */
class AppBar extends HTMLElement {
   constructor() {
      super();
      let 
         appbarTagTemplate = document.createElement( "template" )
      ;
      appbarTagTemplate.innerHTML = appbar;
      // this.attachShadow( { mode: "open" } );
      // this.shadowRoot.append( 
      //    appbarTagTemplate.content.cloneNode( true ) 
      // );
      this.append( 
         appbarTagTemplate.content.cloneNode( true ) 
      );
      // _( "constructor" );
   } 
   connectedCallback() {
      this.render();
      addEventListener( 'load', () => {
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
      } );
   }
   render() {
   }
}
window.customElements.define( 
   "app-bar", AppBar 
);
