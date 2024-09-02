

import { CutRS, Float2Brl, Str2Brl } from "../utils";


const 
   logo = {
      original: "https://raw.githubusercontent.com/Ceo-js/ea/2e6fdd74866a50968095c8c6942156d1e93e1c34/ea.jpg",
      cdn: "https://rawcdn.githack.com/eletricaeart/app/6e75f2fa11d56872a7e284e03c20bd865925ff2c/src/images/EA/globo-de-plasma-300.png?raw=true",
      dev: "https://raw.githack.com/eletricaeart/app/root/src/images/EA/globo-de-plasma-300.png?raw=true",
   }
;   

interface service_i {
   quantity: number;
   description: string;
   value: string;
   total: number;
}

export const invoiceHtml = ( { ...props } ) => {
   const 
      services = [ ...props.budget.services ]
   ;

   const 
      interfaces = {
         budgetBodyItem: ( service: service_i ) => ( `
            <tr>
               <td>
                  <input id="input_qtd_01" type="text" value="${ service.quantity }"/>
               </td>
               <td>
                  <input id="input_description_01" type="text" value="${ service.description }"/>
               </td>
               <td>
                  <input id="input_unit_01" type="text" value="${ CutRS( Str2Brl( service.value ) ) }"/>
               </td>
               <td>
                  <input id="input_tot_01" type="text" value="${ CutRS( Float2Brl( service.total ) ) }"/>
               </td>
            </tr>
         ` )
      }
   ;

   let 
      budgetBody = ``
   ;

   services.forEach( service => {
      budgetBody += interfaces.budgetBodyItem( service );
   } );

   if( services.length <= 15 ) {
      // console.log( "length: ", 15 - services.length );
      let list = [ ...Array(
         15 - services.length
      ) ].fill( `
         <tr>
            <td>
               <input id="input_qtd_01" type="text" value=""/>
            </td>
            <td>
               <input id="input_description_01" type="text" value=""/>
            </td>
            <td>
               <input id="input_unit_01" type="text" value=""/>
            </td>
            <td>
               <input id="input_tot_01" type="text" value=""/>
            </td>
         </tr>
      ` );
      // setBgList( [ ...list ] );
      list.forEach( service => {
         budgetBody += service;
      } );
   }
   
   return `
      <!DOCTYPE html>
      <html lang="pt-br">
         <head>
            <title>Elétrica & Art</title>
         
            <link rel="icon" href="src/pix/logo.svg" type="svg+xml">
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- == [ fontawesome ]
            == == == == == == == == == -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
            <script src="https://esm.sh/@fortawesome/fontawesome-free"></script>
            <!-- == [ StyleSheets ] 
            == == == == == == == == == -->
            <link rel="stylesheet" href="../src/styles/clb.css">
            <style>


            /* montserrat */
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
            /* inter */
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
            /* poppins */
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            /* roboto */
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
            
            /* == [ defaults ]
            == == == == == == == == == */
            @import url( "./globals/defalts.css" );
            *,
            *::before,
            *::after {
               margin:0; 
               padding:0; 
               box-sizing:border-box;
            }
            
            @page {
               margin: 20px;
            }

            
            :root {
               font: 1em "inter";
               font-weight: 400;
            
               --appbar-shadow: rgba( 0 0 0 .25 ) 0 4px 8px;
            
               font-synthesis: none;
               text-rendering: optimizeLegibility;
               -webkit-font-smoothing: antialiased;
               -moz-osx-font-smoothing: grayscale;
            
            
            }
            
            ::-webkit-scrollbar {
               width: 10px;
            }
            ::-webkit-scrollbar-track {
               background: var( --pink );
               border-radius: 5px;
            }
            ::-webkit-scrollbar-thumb {
               background: var( --scrollbar-thumb, #27f );
               border-radius: 5px;
            }
            
            html {
               flex-direction: column;
               min-height: 100vh;
               line-height: 1.15;
               -webkit-text-size-adjust: 100%;
               background: #1b1d22;
            
               background-color: #1b1d22;
               background-image: 
                  linear-gradient(
                     0deg, 
                     #00000000 24px, 
                     #313339 25px
                  ),
                  linear-gradient(
                     90deg, 
                     #00000000 24px, 
                     #313339 25px
                  )
               ;
               background-size: 25px 25px;
               scroll-behavior: smooth;
            }
            
            body {
               display: flex;
               flex-direction: column;
               justify-content: space-between;
               flex: 1;
               background-color: #29f !important;
            }
            
            /* == [ defaults ] 
            == == == == == == == == == */
            h1, h2, h3, h4, h5, h6, 
            t1, t2, t3, t4, t5, t6,
            tt, 
            st, st6,  
            ct1, ct2, ct3, ct4, ct5, ct6 {
               display: block;
               font-family: "Montserrat", sans-serif;
               font-weight: bold;
               font-optical-sizing: auto;
               font-style: normal;
            }
            
            txt {
               display: flex;
               flex-direction: row;
            }
            
            p, t, txt, li {
               font-family: "inter", "Roboto", sans-serif;
               font-weight: normal;
            }
            
            h1, h2, h3, h4, h5, h6,
            p, t, txt, tt, st {
               overflow-wrap: break-word;
            }
            
            t { 
               display: block; 
               font-size: 1em;
            }
            
            st, st6 {
               color: var( --st, #777 );
            }
            
            ct1, ct2, ct3, ct4, ct5, ct6 {
               text-align: center;
            }
            
            p { margin: 1em 0; }
            
            
            h1 {
               font-size: 2em; margin: 0.67em 0; 
            }
            
            h2 {
               font-size: 1.5em; margin: 0.83em 0;
            }
            
            h3 {
               font-size: 1.4em; margin: 1em 0;
            }
            
            h4 {
               font-size: 1.25em; margin: 1.33em 0;
            }
            
            h5 {
               font-size: 1.15em; margin: 1.67em 0;
            }
            
            h6 {
               font-size: 1em; margin: 2.33em 0;
            }
            
            t1, t2, t3, t4, t5, t6, 
            tt, 
            st, st6,  
            ct1, ct2, ct3, ct4, ct5, ct6 { margin: 0; }
            
            tt, t1, ct1 { font-size: 2em; }
            t2, ct2 { font-size: 1.5em; }
            st, t3, ct3 { font-size: 1.4em; }
            t4, ct4 { font-size: 1.25em; }
            t5, ct5 { font-size: 1.15em; }
            t6, ct6, st6 { font-size: 1em; }
            
            ul, ol {
               margin: 1em 0;
               padding-left: 2.2em;
            }
            
            dl {
               display: flex;
               flex-direction: column;
               gap: 1em;
            }
            dt, dt > * {   
               font-weight: bold;
            }
            
            dd {
               padding-left: 2em;
            }
            
            emphasis {
               display: flex;
               padding: 1.5em;
               box-shadow: #9995 -6px 0 0 -1px;
               line-height: 1.75em;
            }
            
            form {
               display: flex;
               flex-direction: column;
            }
            
            content:has( label ), 
            [content]:has( label ) {
               gap: 1.5rem;
            }
            
            label {
               display: flex;
               flex-direction: column;
               gap: 8px;
            }
            
            label > t, lt {
               font: 14px sans-serif;
               padding: 0 1rem;
            }
            
            input, [input], textarea {
               height: 56px;
               width: 100%;
               flex: 1;
               border-radius: 9px;
               border: #fff2 1px solid;
               outline: transparent;
               padding: 1rem;
               font-size: 1rem;
               background: var( --bg );
               color: var( --text-color );
               accent-color: var( --accent, #daa520 );
            }
            
            :is( td, td, th ):has( input[type="text"], input[type="number"] ) {
            }
            
            :is( td, td, th ) :where( input[type="text"], input[type="number"], input[type="tel"], input[type="email"], input[type="date"] ) {
               padding: 0 !important;
               background: transparent !important;
               font-size: inherit !important;
               width: 100% !important;
               height: 100% !important;
               font-family: inherit !important;
            }
            
            /* input type switch */
            label[switch] {
               cursor: default;
               flex-direction: row;
               align-items: center;
            }
            label[switch] input {
               width: 0;
               height: 0;
               opacity: 0;
            }
            slider {
               cursor: pointer;
               background-color: var( --input-slider, #ccc );
               border-radius: 34px;
               -webkit-transition: .4s;
               transition: .4s;
            
               width: 3.5em;
               padding: 2px;
            }
            slider > ball {
               content: "";
               display: block;
               width: 26px;
               height: 26px;
               background-color: var( --input-slider-before, white );
               border-radius: 50%;
               -webkit-transition: .4s;
               transition: .4s;
            
               top: 1em;
            }
            input:checked + slider {
               background-color: var( --input-switch, #2196F3 );
               background-color: var( --input-switch, #fc0 );
            }
            input:focus + slider {
               box-shadow: 0 0 1px var( --input-switch, #2196F3 );
            }
            input:checked + slider > ball {
               -webkit-transform: translateX( 26px );
               -ms-transform: translateX( 26px );
               transform: translateX( 26px) ;
            }
            
            input[type="submit"],
            input[type="button"],
            btn, button {
               background-color: var( --btn-simp, #27f3 );
               background-image: linear-gradient( to bottom, #fff #fff );
               text-transform: uppercase;
               font-weight: bold;
               color: var( --card-lv2 );
            }
            
            label msg {
               display: flex;
               align-items: center;
               height: 0;
            }
            label msg content {
               display: flex;
               flex-direction: row;
               height: 16px;
               margin-top: 8px;
               gap: 4px;
            }
            label msg content icon {
               display: flex;
               align-items: center;
               width: 16px;
               height: 16px;
               aspect-ratio: 1;
               padding: 0;
            }
            label msg content t {
               display: flex;
               align-items: center;
               font-size: 10px;
            }
            label msg content[error] t {
               color: var( --error, #f55 );
            }
            label msg content[error] t::before {
               content: "🚫";
               display: grid;
               place-items: center;
               width: 16px;
               height: 16px;
               aspect-ratio: 1;
               margin-right: 4px;
               padding: 0;
               font-size: 16px;
            } 
            form > footer,
            form > content > footer {
               display: flex;
               flex-direction: column;
            }
            
            
            
            body {
               min-height: 100vh;
               margin: 0;
            }
            
            
            
            main, [main] {
               display: flex;
               flex-direction: column;
            }
            
            video {
               width: clamp( 100px, 100%, 759.98px );
               aspect-ratio: 16 / 9;
            }
            
            table {
               border-collapse: collapse;
               width: 95%;
               margin: 0 auto;
            }
            td {
               text-align: center;
            }
            th, td {
               padding: 0.5rem;
            }
            
            table[flex] {
               display: flex;
               flex-direction: column;
            }
            
            table[flex] thead,
            table[flex] tbody,
            table[flex] tfoot {
               display: flex;
               flex-direction: column;
            }
            table[flex] tr {
               display: flex;
            }
            table[flex] th,
            table[flex] td {
               display: flex;
               padding: 0;
               flex: 1;
            }
            
            
            
            
            
            @media ( prefers-color-scheme: light ) {
            }
            
            @media ( prefers-color-scheme: dark ) {
            }
            
            
            
            
            /* == [ clb ] 
            == == == == == == == == == */
            appbar, app-bar,
            sidebar, side-bar, 
            drawer, main, 
            homepage, home-page,  
            child, [child], 
            section, [section], 
            article, [article], 
            content, [content], 
            page, [page], 
            sheet, [sheet], 
            box, [box], 
            card, [card],
            appfooter, app-footer, 
            placeholder {
               display: flex;
               flex-direction: column;
               width: 100%;
               margin: 0;
               padding: 0;
            }
            
            view, [view] {
               display: flex;
               flex-direction: column;
               width: 100%;
               height: 100%;
               flex: 1;
               margin: 0;
               padding: 0;
            }
            
            appbar {
               position: sticky;
               top: 0;
               left: 0;
            }
            
            homepage, home-page {
               margin: 0 auto;
               flex: 1;
            }
            
            view, [view] {
               margin: auto;
               flex: 1;
            }
            
            section, [section] {
            }
            section[horizontal],
            [section][horizontal] {
               flex-direction: row !important;
            }
            
            [section="dual"] {
               display: flex;
               flex-direction: row;
            }
            
            card, [card] {
               border-radius: 1.1em;
            }
            
            content, [content] {
               padding: 1em;
            }
            [content="mobile"], [mobile] {
               width: clamp( 100px, 95%, 696px );
               margin: 0 auto;
               padding: 3rem !important;
            }
            
            tiles {
               display: flex;
            }
            tiles > content {
               display: grid !important;
               grid-template-columns: repeat( 2, 1fr );
               gap: 1em;
            }
            tiles > content > tile {
               flex-shrink: 1;
               flex-grow: 0;
               flex-basis: calc( 50vw - 1.5em );
               aspect-ratio: 1;
            }
            
            tile > content {
               height: 100%;
            }
               
            
            gap, [gap] {
               gap: 1em;
            }
            em, [em] {
               padding: 0.5em;
            }
            
            child, [child] {
            }
            
            
            page, [page] {
               width: clamp( 100px, 100%, 1092px );
               margin: 0 auto;
            }
            
            sheet, [sheet] {
               width: clamp( 100px, 100%, 759.98px );
               margin: 0 auto;
               padding: 1.5em 0;
            }
            
            box, [box] {
               border-radius: 9px;
               border: #9995 1px solid;
               margin: 1em;
               padding: 0 1em;
            }
            
            block, [block] { display: block; }
            flex, [flex], column, [column] {
               display: flex;
               flex-direction: column;
               width: 100%;
            }
            row, [row] {
               display: flex !important;
               flex-direction: row !important;
            }
            
            duo, [duo] {
               display: flex !important;
               flex-direction: row !important;
               align-items: center !important;
               justify-content: space-between !important;
            }
            
            center, [center] {
            }
            
            placeholder img {
               display: block;
               width: 100%;
            }
            
            
            
            /* == [ modal ]
            == == == == == == == == == */
            modal::-webkit-scrollbar {
               width: 0px;
            }
            
            
            
            
            /* == [ clb properties ]
            == == == == == == == == == */
            [hidden] { display: none; }
            
            [center] {
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               text-align: center;
            }
            
            [pd="2em"] { padding: 2em; }
            [np] { padding: 0 !important; }
            
            [w-s] { width: clamp( 100px, 100%, 750px ); margin: auto; }
            [w-m] { width: clamp( 100px, 100%, 950px ); margin: auto; }
            [w-l] { width: clamp( 100px, 100%, 1250px ); margin: auto; }
            
            
            
            /* == [ clb colors ]
            == == == == == == == == == */
            [red]    { color: crimson; }
            [blue]   { color: #29f;    }
            [pinklyh]{ color: #fc0fc0; }
            [roselyh]{ color: #905;    }
            [amber]  { color: #fc0;    }
            
            
            /* == [ [link ]
            == == == == == == == == == */
            [link] {
               cursor: pointer;
            }
            
            /* == [ mídias ]
            == == == == == == == == == */
            pix {
               display: flex;
            } pix > img {
               width: clamp( 100px, 55dvw, 550px );
               margin: auto;
            } pix > img[vertical] {
               height: clamp( 100px, 55dvw, 550px );
               width: auto;
               margin: auto;
            }
            vid {
               display: flex;
               width: clamp( 100px, 100%, 550px );
               aspect-ratio: 16 / 9;
               margin: auto;
            } vid > * {
               width: 100%;
               height: 100%;
               border: transparent;
            }
            
            /* == [ icons ]
            == == == == == == == == == */
            i {
               display: grid !important;
               place-items: center;
               width: 48px;
               height: 48px;
               aspect-ratio: 1;
            }
            
            i[xs] { width: 24px; height: 24px; }
            i[s] { width: 36px; height: 36px; }
            i[m] { width: 48px; height: 48px; }
            i[g] { width: 72px; height: 72px; }
            i[xg] { width: 96px; height: 96px; }
            
            
            </style>
            <link rel="stylesheet" href="../src/styles/globals.css">
            <style>
            

      :root {
      --bg: #e5e5e5;
      --bg2: #f5f5f5;
      --ground: #fff;
      --card-lv1: #00559C;
      --card-lv2: #0075BD;
      --card-lv3: #009ee6;

      --appbar-shadow: #0005 0 0 10px;
      --appbar-logo-shadow: #ffab00 0 0 0 2px;
      --appbar-title: #fff;
      --appbar-title-divider: #daa520;
      --appbar-title-shadow: #0005 3px 0 3px;
      --card: #f5f5f5;

      --text-color: #333;
      --a-hover: #747bff;
      --btn-bg: #27f;
      --btn-bg: var( --card-lv1 );
      --error: #f55;

      --homepage: var( --bg );

      --form-bg: var( --bg2 );

      --customer: #fff;
      --customer-name: #333;
      --customer-address: #777;

      font: 1em "inter";
      font-weight: 400;
      color: var( --text-color );

      --class-title: var( --card-lv2 );
      }

      ::-webkit-scrollbar {
      width: 10px;
      }
      ::-webkit-scrollbar-track {
      background: var( --scrollbar-track, #d5d5d500 );
      border-radius: 5px;
      }
      ::-webkit-scrollbar-thumb {
      background: var( --scrollbar-thumb, #1b1d2200 );
      border-radius: 5px;
      }

      a {
      text-decoration: transparent;
      }

      html {
      }

      body {
      background: var( --bg );
      }

      /* == [ app-fix ]
      == == == == == == == == == */
      body {
      min-height: 100vh !important;
      max-height: 100vh !important;
      }

      homepage, home-page {
      overflow: scroll !important;
      height: 100vh !important;
      }
      homepage::-webkit-scrollbar,
      home-page::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
      }
      /* == == == == == == == == == */

      homepage, home-page {
      background-color: var( --homepage, #fff9 );
      }

      content, [content] {
      height: 100%;
      }

      card, [card] {
      background: var( --card, #f5f5f5 );
      }
      card-content {
      padding: 1em;
      }

      appbar {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0;
      padding: 0;
      position: sticky;
      top: 0;
      left: 0;
      z-index: 9;
      box-shadow: #0005 0 0px 6px 2px !important;
      }
      app-bar,
      appbar {
      background: var( --card-lv1 );
      background-blend-mode: overlay;
      box-shadow: var(--appbar-shadow);
      height: 72px;
      }

      app-bar > content,
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
      }
      trigram {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      aspect-ratio: 1.2 / 1;
      cursor: pointer;
      }
      trigram > bar {
      display: flex;
      width: 100%;
      aspect-ratio: 7 / 1;
      border-radius: 9px;
      background: #fff;
      }

      content:has( > back-btn ) {
      padding: 2px;
      width: 100%;
      height: 100%;
      }
      back-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      aspect-ratio: 1.2 / 1;
      cursor: pointer;
      }
      back-btn > bar {
      display: flex;
      width: 100%;
      aspect-ratio: 7 / 1;
      border-radius: 9px;
      background: #fff;
      }
      back-btn > bar#backBtn_topBar {
      transform: rotate(-45deg);
      transform: rotate(-45deg) translate(-5px, 2px);
      width: 70%;
      aspect-ratio: 7 / 1.3;
      }
      bar#backBtn_centerBar {
      background: transparent;
      }
      back-btn > bar#backBtn_bottomBar {
      transform: rotate(45deg) translate(-5px, -2px);
      width: 70%;
      aspect-ratio: 7 / 1.3;
      } 

      fab {
      display: grid;
      place-items: center;
      border: transparent;
      border-radius: 100%;
      background: var( --card-lv1 );
      width: 66px;
      height: 66px;
      aspect-ratio: 1;
      position: fixed;
      bottom: 24px;
      right: 1em;
      filter: drop-shadow( 2px 4px 6px #0005 );
      cursor: pointer;
      z-index: 10;
      }

      fab > content {
      color: var( --appbar-title, #fff );
      width: calc( 100% - 2em );
      height: calc( 100% - 2em );
      padding: 0;
      align-items: center;
      justify-content: center;
      }
      fab > content > * {
      font-size: 2.5em;
      font-weight: bold;
      }
      fab a {
      color: var( --appbar-title );
      text-decoration: transparent;
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

      cadastro > header {
      }


      tt {
      color: var(--text-color);
      }

      a:hover {
      color: var( --a-hover );
      }

      button, input[type="submit"] {
      background-color: var(--btn-bg);
      border: transparent;
      } 
      button a, input[type="submit"] {
      color: var(--ground);
      }


      form {
      background: var( --form-bg );
      border-radius: 1.5rem;
      padding-bottom: 1rem;
      }

      form .divider {
      display: flex;
      align-items: center;
      border-bottom: var( --card-lv3 ) 2px dashed;
      }
      form .divider content {
      padding: 4px 0;
      font-weight: bold;
      }

      whats-copy {
      display: flex;
      align-items: flex-end;
      width: 24px;
      height: 56px;
      }
      whats-copy > img {
      width: 24px;
      height: 24px;
      aspect-ratio: 1;
      }

      .multi {
      flex-direction: row !important;
      gap: 1rem;
      }





      /* == [ drawer ] 
      == == == == == == == == == */
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
      drawer-inside::-webkit-scrollbar {
      width: 0px;
      }
      drawer-inside::-webkit-scrollbar-track {
      background: #f5f5f5;
      border-radius: 5px;
      }
      drawer-inside::-webkit-scrollbar-thumb {
      background: #f5f5f5;
      border-radius: 5px;
      }
      drawer[opened] { display: flex; }
      drawer[closed] { display: none; }
      drawer-inside {
      display: flex;
      flex-direction: column;
      height: 100dvh;
      overflow-y: scroll;
      background: var( --card-lv5, #fff );
      background-image: url( ../../src/imgs/bgs/2c7.jpg );
      box-shadow: #0005 0 0 5px;
      }
      drawer[opened] > drawer-inside {
      width: clamp( 100px, 95%, 350px );
      }
      drawer[closed] > drawer-inside {
      /* transition: all 5s cubic-bezier(0.68, -0.55, 0, 1.31); */
      width: 0;
      }
      drawer-outside {
      display: flex;
      flex: 2.5;
      }


      drawer-inside > header {
      display: flex;
      width: 100%;
      background: var( --drawer-header, #21232910 );
      background: var( --drawer-header, #225 );
      background-image: url( ../../src/imgs/bgs/8fb-h.jpg );
      background-image: url( ../../src/imgs/bgs/8fb2-h.jpeg );
      background-size: cover;
      backdrop-filter: blur( 13px );
      aspect-ratio: 16 / 9;
      }
      drawer-inside > content {
      background-color: var( --bg2 );
      background-color: var( --drawer-inside, #e5e5e500 );
      }


      drawer main-menu {
      gap: .8em;
      }
      drawer menu-item {  
      display: flex;
      background: var( --drawer-item, #fff1 );
      backdrop-filter: blur( 13px );
      filter: drop-shadow( #0005 5px 6px 10px );
      box-shadow: #0003 0 5px 10px;
      padding: 1em;
      border-radius: 9px;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
      font-size: .9em;
      }
      drawer menu-item a {
      text-decoration: none;
      color: var( --menu-item-link, #555 );
      }

      drawer icon {
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      aspect-ratio: 1;
      }

      user-profile {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 100%;
      height: 100%;
      aspect-ratio: 16 / 9;
      }
      user-profile > user-pic > picture {
      display: flex;
      width: 60px;
      height: 60px;
      aspect-ratio: 1;
      }
      user-profile > user-pic > picture > img {
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
      border-radius: 100vw;
      box-shadow: var(--appbar-logo-shadow);
      }

      user-info {
      display: flex;
      flex-direction: column;
      gap: .2em;
      background-image: linear-gradient(
      to bottom, transparent, #0009, #0009
      );
      }
      user-name {
      display: flex;
      color: var( --user-name, #fff );
      font-weight: bold;
      }   
      user-phone {
      display: flex;
      font-size: .9em;
      color: var( --user-phone, #fc0 );
      }   

      drawer > drawer-inside > footer {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var( --bg );
      font-size: .9em;
      }

      @keyframes openingDrawer {
      0% {
      display: none;
      opacity: 0;
      width: 0;
      }
      10% {
      display: flex;
      opacity: .1;
      width: 0;
      }
      100% {
      opacity: 1;
      width: 100%;
      }
      }


      /* == [ customers ]
      == == == == == == == == == */
      customers {
      gap: 1em;
      }
      customer {
      display: flex;
      justify-content: center;
      background-color: var( --customer, #21232940 );
      background-color: var( --customer, #bdbebf );
      border: transparent;
      border-radius: 1.25em;
      width: 100%;
      aspect-ratio: 10/2.86; /*452 x 129*/
      }
      customer > header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: .3;
      }
      customer > contents {
      display: flex;
      justify-content: center;
      gap: 1em;
      flex: .7;
      }

      customer > header > content {
      height: calc( 100% - 0px );
      }
      customer > contents > content {
      height: calc( 100% - 5px );
      }
      customer > header > picture {
      display: flex;
      width: 90%;
      border-radius: 100%;
      }
      customer picture > img {
      border-radius: 100%;
      width: 100%;
      }

      customer name {
      font-size: 1.3em;
      font-weight: bold;
      }
      customer phone {
      font-size: 1em;
      }


      /* == [ customer ]
      == == == == == == == == == */
      #customer_pic {
      position: relative;
      display: flex;
      align-items: flex-end;
      width: 100%;
      aspect-ratio: 16 / 9;
      flex-direction: column;
      background-size: cover;
      background-repeat: no-repeat;
      }
      #customer_pic picture {
      display: flex;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      }
      img#customer_pic_uri {
      width: 100%;
      }

      content[name] {
      width: 100%;
      justify-content: center;
      background-image: linear-gradient(
      to bottom,
      #0000 10%, 
      #16181cdd, 
      #000
      );
      background-image: linear-gradient(
      to bottom,
      #0000 70%, 
      var( --bg )
      );
      position: absolute;
      }
      #customer_name {
      font-size: 1.5em;
      font-weight: bold;
      color: var( --customer-name, #212329 );
      filter: drop-shadow( #000 0 0 10px ); */
      }

      #customer_address {
      display: flex;
      flex-wrap: wrap;
      width: 90%;
      font-size: .8em;
      font-weight: bold;
      color: var( --customer-address, #fc0 );
      }

      card-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 1em 0;
      border-bottom: #9995 1px solid;
      }
      card-item strong {
      color: var( --card-item-strong, #555 );
      }
      divider {
      color: #555;
      font-weight: bold;
      text-transform: uppercase;
      }

      tile {
      overflow: hidden;
      }
      tile > content {
      align-items: center;
      justify-content: space-between;
      }
      tile i {
      flex: 1;
      }

      tile i::before {
      font-size: 2em;
      color: var( --tile-i, goldenrod );
      }


      /* == [ new service ]
      == == == == == == == == == */
      input#input_serviceName {
      font-size: 1.4em;
      font-weight: bold;
      border: transparent;
      outline: transparent;
      }


      /* == [ receipts ]
      == == == == == == == == == */
      home-page:has( recibos ) {
      background: var( --bg3, #fff );
      }

      recibos {
      min-height: 100vh;
      }

      recibos > content {
      display: grid;
      }
      recibo {
      display: grid !important;
      font-size: clamp( 5px, 3vw, 50px );
      aspect-ratio: 16 / 4;
      background: transparent !important;
      }
      
      recibo > contents {
      filter: drop-shadow( #0000 2px 2px 10px );
      display: grid !important;
      grid-template-columns: 2fr 5fr 3fr;
      aspect-ratio: 16 / 4;
      background: var( --receipt, white ) !important;
      border-radius: 0 !important;
      border-bottom: #e5e5e5 .2em dashed;
      position: relative;
      text-wrap: nowrap;
      } 

      recibo > contents > mask {
      display: grid;
      position: absolute;
      top: 0;
      right: -.25em;
      background: transparent;
      width: 32.01%;
      height: 100%;
      }

      date, main-info, total-price {
      overflow: hidden;
      max-width: 100%;
      }

      desc > *, who > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      }

      calendar {
      display: grid;
      grid-template-rows: .6fr .2fr;
      place-items: center;
      background: var( --calendar, #e5e5e5 );
      border-radius: 9px;
      font-weight: bold;
      font-size: clamp( 5px, 3vw, 50px );
      }

      calendar > calendar-block {
      display: grid;
      grid-template-rows: .2fr .6fr .2fr;
      place-items: center;
      width: 100%;
      background: var( --calendar-block, white );
      border-radius: 9px;
      font-weight: bold;
      padding: 0 5px;
      border: var( --calendar-block-border, #f920 ) 4px solid;
      font-size: clamp( 5px, 3vw, 50px );
      border: #ddd 1px solid;
      }

      calendar month {
      font-size: .875em;
      }

      calendar day {
      font-size: 2em;
      font-weight: bold;
      color: #555;
      }

      calendar year {
      font-size: 1.1em;
      color: var( --calendar-year, #777 );
      }

      recibo [section] > content {
      justify-content: center;
      }

      recibo date {
      min-width: 90.513px;
      }
      recibo date > content {
      padding-left: 1.5em;
      padding-right: 0.5em;
      }

      recibo main-info {
      }

      main-info > * {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      }

      main-info desc > * {
      font-size: 1.2em;
      }

      desc > *, who > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      }

      main-info who {
      color: var( --receipt-who, #777 );
      }
      recibo total-price {
      text-align: center;
      }
      recibo total-price > content {
      gap: 1em;
      padding-left: 0.5em;
      padding-right: 1.5em;
      align-items: flex-end;
      }


      recibo status {
      display: grid;
      place-items: center;
      justify-content: flex-end;
      align-self: flex-end;
      border-radius: 5em;
      padding: .5em;
      color: #27f;
      }

      recibo total {
      font-weight: bold;
      }



      /* == [ AppFooter ]
      == == == == == == == == == */
      appfooter, app-footer {
      background-color: var( --app-footer, #16181c );
      color: var( --app-footer-text, #959595 );
      background-image: url( "../imgs/plasma/w1.jpeg" );
      background-image: url( "../imgs/plasma/eletromagnetico.jpg" );
      background-blend-mode: overlay;
      font-family: "poppins" !important;
      }

      app-footer h1 {
      font-family: thunder;
      color: var( --appbar-title );

      background: radial-gradient(
      at center,
      #daa520, red
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      }
      ea-footer-e {
      color: var( --appbar-title-divider );
      }

      /* == [ classes ]
      == == == == == == == == == */
      .title, [title] {
      color: var( --class-title );
      }



      /* == [ NavBar ]
      == == == == == == == == == */
      navbar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      /* // here */
      height: 0px !important;
      min-height: 0px !important;

      bottom: 0;
      left: 0;
      background: #1b1d22;
      background: #16181c;
      color: #fff;
      }
      navbar > nav-item {
      display: flex;
      flex-direction: column;
      gap: .125em;
      max-width: 72px;
      height: 100%;
      flex: 1;
      align-items: center;
      justify-content: center;
      }
      nav-item > ico {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc( 24px + 1em );
      height: calc( 24px + 1em );
      padding: .4em;
      border-radius: 50vw;
      background: #212329;
      transition: all .3s ease;
      position: relative;
      }
      nav-item > ico:hover {
      width: 100%;
      justify-content: space-between;
      box-shadow: #daa520 0 0 0 3px;
      }

      nav-item > ico > t {
      display: none;
      font-size: .75em;
      position: absolute;
      left: -1000px;
      opacity: 0;
      transition: 5s 10s ease;
      }
      nav-item > ico:hover > t {
      transition: all 1s ease;
      display: flex;
      left: 50%;
      opacity: 1;
      }

      nav-item > ico > i {
      display: grid;
      place-items: center;
      width: 24px;
      height: 24px;
      }
      nav-item > t {
      display: grid;
      place-items: center;
      font-size: .75em;
      }


      /* == [ receipt pdf ]
      == == == == == == == == == */
      #pdf_page {
      background: var( --pdf-page, #fff );
      }
      #form_receipt_pdf {
      display: flex;
      flex-direction: column;
      }

      top-flag {
      padding: 0.245em 0 0;
      background: var( --top-flag, #8cb2e6 );
      background: var( --card-lv4, #19497b77 );
      }

      top-flag label {
      flex: 1;
      text-align: center;
      }

      top-flag label t {
      font-weight: bold;
      color: #19497b;
      padding: 0 !important;
      }

      top-flag input {
      font-size: .625em;
      text-align: center;
      }

      #form_receipt_pdf input {
      border-radius: 0;
      border: transparent;
      outline: transparent;
      padding: 0.4em;
      }


      #form_receipt_pdf customer {

      }

      #form_receipt_pdf badge {
      background: var( --badge, #19497b );
      padding: 0.2em;
      text-align: center;

      }

      #form_receipt_pdf tt {
      font-size: 1em;
      text-transform: capitalize;
      color: var( --receipt-pdf-tt, #fff );
      }

      #form_receipt_pdf table {
      width: 100%;
      }

      table#customer > tbody tr:nth-child( odd ) {
      background: #f5f5f5;
      }
      table#customer > tbody tr:nth-child( even ) {
      background: #e5e6f9;
      background: #e5e5e5bf;
      }

      #form_receipt_pdf tr {
      display: flex;
      }

      #form_receipt_pdf th {
      flex: 1;
      text-align: left;
      text-transform: uppercase;
      font-weight: bolder;
      color: var( --table-customer-th-color, #212329 );
      }

      #form_receipt_pdf td {
      flex: 2;
      }

      table#customer th[nome] {
      flex: 1;
      }
      table#customer td[nome] {
      flex: 5.3;
      }

      table#customer :where( name ) {

      }

      table#customer :where( th ) {
      border-right: #ebe 1px dashed;
      border-left: #ebe 1px dashed;
      max-width: fit-content;
      }
      #form_receipt_pdf td:has( input#input_uf ) {
      max-width: 6ch;
      }

      #form_receipt_pdf :where( th, td ) {
      padding: .4em;
      font-size: .8em;
      }


      #form_receipt_pdf :where( tr, td ) {
      color: #27f;
      font-size: .8em;
      }


      #table-budget thead tr {
      background: var( --receipt-table-thead, #8cb2e6 );
      background: var( --receipt-table-thead, #19497b77 );
      }
      #table-budget thead tr :where( th, td ) {
      background: transparent;
      }

      #form_receipt_pdf th#qt {
      flex: 0 1 20%;
      text-align: center;
      }
      #form_receipt_pdf th#description {
      flex: 0 1 100%;
      text-align: center;
      }
      #form_receipt_pdf th#tot {
      flex: 0 1 20%;
      text-align: center;
      }
      #form_receipt_pdf th#unit {
      flex: 0 1 20%;
      text-align: center;
      }

      #tbody_budget:nth-child( odd ) {
      background: #f5f5f5;
      }
      #tbody_budget > tr > * {
      color: #333;
      }
      #tbody_budget > tr:nth-child( even ) {
      background: #e5e6f9;
      background: #e5e5e5bf;
      }

      #tbody_budget > tr :nth-child( 1 ) {
      background: transparent;
      flex: 0 1 20%;
      text-align: center;
      }
      #tbody_budget > tr :nth-child( 2 ) {
      background: transparent;
      flex: 0 1 100%;
      text-align: center;
      }
      #tbody_budget > tr :nth-child( 3 ), 
      #tbody_budget > tr :nth-child( 4 ) {
      background: transparent;
      flex: 0 1 20%;
      text-align: right;
      padding-right: 16px;
      }
      #tbody_budget > tr :nth-child( 3 ) > *,
      #tbody_budget > tr :nth-child( 4 ) > * {
         text-align: right;
         margin: auto;
         width: 90%;
      }

      #tbody_budget :where( td ) {
      border-right: #ebee 1px dashed;
      }

      #form_receipt_pdf notes {
      padding-top: 0.5em;
      }

      #form_receipt_pdf notes > badge {
      background: transparent !important;
      }
      #form_receipt_pdf notes > badge > tt {
      color: var( --badge, #19497b ) !important;
      }

      #form_receipt_pdf notes > textarea {
      width: 95%;
      max-height: 13ch;
      margin: 0 auto;
      font-size: .8em;
      border: #9999 1px solid;
      }

      #budget_end {
      padding-top: 0.5em;
      }
      #budget_end th {
      text-align: center;
      }

      signatures > row {
      padding: 1.5em ;
      gap: 2em;
      }

      signature sig-name {
      border-top: #16181c 2px solid;
      text-align: center;
      font-size: .8em;
      font-weight: bold;
      }

            </style>
            <link rel="stylesheet" href="../src/fonts/fonts.css">
            <!-- == [ Scripts ] 
            == == == == == == == == == -->
            <script src="../src/scripts/clb.js" defer></script>
            <script src="../src/scripts/global.js" defer></script>
            <script src="../src/scripts/GetInvoiceFile.js" defer></script>
            <!-- == [ includes ]
            == == == == == == == == == -->
            <script src="../src/scripts/widgets/AppBar.js" defer></script>
            <script src="../src/scripts/widgets/Drawer.js" defer></script>
            <script src="../src/scripts/widgets/NavBar.js" defer></script>
            <script src="../src/scripts/widgets/EA-Card.js" defer></script>
            <script src="../src/scripts/Widgets/NavLink.js" defer></script>
            <script src="../src/scripts/Widgets/Button.js" defer></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>
            <style>
               form {
                  gap: 0 !important;
               }
            </style>
         </head>
         <body>
            <home-page>
               <view id="invoice_html">
      <ea-card section="dual">
         <style>
         
         @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Poppins:wght@500;700;800;900&display=swap');
            
         [section="dual"] {
            display: flex;
            flex-direction: row;
         }
         [section="dual"] > * {
            flex: 1;
         }
         
         ea-card {
            background: var( --card-lv1 );
            background: var( --ea-card, #19497b );
            color: var( --appbar-title );
            font-size: 2.5vw;

            display: grid !important;
            grid-template-columns: .35fr .65fr;
            width: 100%;
            aspect-ratio: 3.8/1;
            padding: 1vw;
            inset: 0;
            color: #f5f5f5;
            filter: var( --appbar-filter-shadow );
         }
         ea-card * {
            font-family: "poppins" !important;
         }
         ea-card ea-logo {
            display: flex;
            height: 100%;
            aspect-ratio: 1;
         }
         ea-logo > content {
            align-items: center;
         }
         ea-card ea-logo img {
            width: 100%;
            aspect-ratio: 1;
            border-radius: 100vw;
            border: var( --card-lv3 ) solid .24em;
         }

         ea-card > description {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 2.25vw;
         } 
         ea-card > description h1 {
            margin: 0;
            padding-bottom: 0.5em;
         }
         ea-card > description t {
            display: block;
         }
         </style>
         <ea-logo>
            <content>
               <img src="${ logo.cdn }" alt="ea-logo" />
            </content>
         </ea-logo>
         <description section >
            <h1>ELÉTRICA & ART</h1>
            <t5>
               CNPJ 32.858.892/0001-52 - IM 67358/0001
            </t5>
            <t>
               Rua José Alves Maciel, 40 - Aviação <br />
               Praia Grande - São Paulo - SP - Cep 11702-440
            </t>
            <t>
               <strong>Fone </strong> ( 13 ) 99768-5853 <br />
               <strong>Whatsapp </strong> ( 13 ) 99768-5853 <br />
               <strong>E-mail </strong> rafa.julia.forever@gmail.com <br />
            </t>
         </description>
      </ea-card>
                  <form id="form_receipt_pdf">
                     <top-flag row>
                        <label id="label_">
                           <t>Orçamento</t>
                           <input type="text" name="" id="orcamento-number" value="${ props.budget.id }" />
                        </label>
                        <label id="label_">
                           <t>Emissão</t>
                           <input type="text" name="" id="emissao" value="${ props.budget.dateOfIssue }" />
                        </label>
                        <label id="label_">
                           <t>Validade</t>
                           <input type="text" name="" id="validade" value="${ props.budget.dueDate }" />
                        </label>
                     </top-flag>
                     <customer-info section>
                        <badge section>
                           <tt>Cliente</tt>
                        </badge>

                        <table id="customer"> <!-- cliente body -->
                           <tbody>
                              <tr>
                                 <th nome>nome</th>
                                 <td nome>
                                    <input id="input_nome" type="text" value="${ props.owner.name }" />
                                 </td>
                              </tr>
                              <tr>
                                 <th >telefone </th>
                                 <td ><input id="input_telefone" type="text" value="${ props.owner.whatsapp || props.owner.cellphone || props.owner.phone }"/></td>
                                 <th >email </th>
                                 <td ><input id="input_email" type="text" value="${ props.owner.email }"/></td>
                              </tr>
                              <tr>
                                 <th >cpf/cnpj </th>
                                 <td><input id="input_cpf" type="text" value="${ props.owner.cpf }"/></td>
                                 <th >rg/ie </th>
                                 <td><input id="input_rg" type="text" value="${ props.owner.rg }"/></td>
                              </tr>
                              <tr>
                                 <th >endereço </th>
                                 <td><input id="input_endereço" type="text" value="${ props.owner.logradouro }"/></td>
                                 <th >n° </th>
                                 <td><input id="input_n" type="text" value="${ props.owner.number }"/></td>
                              </tr>
                              <tr>
                                 <th >bairro </th>
                                 <td><input id="input_bairro" type="text" value="${ props.owner.district }"/></td>
                                 <th >cidade </th>
                                 <td><input id="input_cidade" type="text" value="${ props.owner.city }"/></td>
                                 <th id="th_uf">uf </th>
                                 <td ><input id="input_uf" type="text" value="${ props.owner.uf }"/></td>
                                 <th >cep </th>
                                 <td ><input id="input_cep" type="text" value="${ props.owner.cep }"/></td>
                              </tr>
                           </tbody>
                        </table>

                     </customer-info>
                     <budget section>
                        <badge><tt>Orçamento</tt></badge>
                        <table id="table-budget">
                           <thead>
                              <tr>
                                 <th id="qt">Qtd. </th>
                                 <th id="description">Descrição </th>
                                 <th id="unit">R$ Unit.</th>
                                 <th id="tot">R$ Tot.</th>
                              </tr>
                           </thead>
                           <tbody id="tbody_budget"> <!-- orçamento body -->
                              ${ budgetBody }
                           </tbody>
                        </table>
                        <budget-end id="budget_end" row>
                           <table>
                              <tbody> <!-- footer body -->
                                 <tr>
                                    <th id="th_subtotal">Subtotal</th>
                                    <td id="td_subtotal">
                                       <input id="input_subtotal" type="text" value="${ props.budget.subtotal }"/>
                                    </td>
                                    <th id="th_desconto">Desconto</th>
                                    <td id="td_desconto">
                                       <input id="input_desconto" type="text" value="${ Float2Brl( props.budget.discount ) }"/>
                                    </td>
                                    <th id="th_total">Valor Total</th>
                                    <td id="td_total">
                                       <input id="input_total" type="text" value="${ Float2Brl( props.budget.receiptValue ) }"/>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </budget-end>
                     </budget>
                     
                     <notes section>
                        <badge section>
                           <tt>Observações</tt>
                        </badge>
                        <textarea id="input_notes" name="" rows="8">${ props.budget.notes }</textarea>
                     </notes>
                  </form>
                  <signatures section>
                     <row>
                        <signature section>
                           <content>
                              <sig-name>Rafael - Elétrica & ART</sig-name>
                           </content>
                        </signature>
                        <signature section>
                           <content>
                              <sig-name>Cliente</sig-name>
                           </content>
                        </signature>
                     </row>
                  </signatures>
               </view>
            </home-page>
            <!--footer>
               <content>
                  <label>
                     <input type="button" id="btn_createPDF" value="Baixar em pdf">
                  </label>
               </content>
            </footer-->
            
            
            
            
            
            
            
            <navbar></navbar>
            
            <script>
               'use strict';
               /* [ properties ]
               =================================== */
               const 
                  ea = {
                     logoURI: "https://raw.githubusercontent.com/Ceo-js/ea/2e6fdd74866a50968095c8c6942156d1e93e1c34/ea.jpg"
                  }
               ;
               /* -------------------------------- */
               
               
               /* [ events ] 
               =================================== */
               window.addEventListener( "load", () => {

                  Drawer();
                  NavLink();

                  btn_createPDF.addEventListener( "click", () => {
                     /* document.querySelector( "#invoice_html" ).style.padding = "40px";
                     setTimeout( () => { */ // put margin in invoice

                        const invoice = this.document.querySelector( "#invoice_html" );
                        console.log( $( "#invoice_html" ) );
                        console.log( window );
                        var data = {
                           margin: 0,
                           filename: "orçamento.pdf",
                           image: { type: "png", quality: 100 },
                           autoPaging: 'text',
                           x: 0,
                           y: 0,
                           html2canvas: { 
                              width: 792,
                              height: 1120,
                              windowWidth: 792,
                              windowHeight: 1120,
                              // dpi: 300,
                              dpi: 100,
                              letterRendering: true,
                              useCORS: true,
                              // allowTaint: true,
                              imageTimeout: 15000,
                              scale: 1
                           },
                           jsPDF: { 
                              // unit: "in", "pt", "mm", "cm", "m", "in" or "px".
                              unit: "pt", 
                              // format: "letter", a0 - a10, b0 - b10, c0 - c10, dl, letter, government-letter, 
                              // legal, junior-legal, ledger, tabloid, [595.28, 841.89]
                              format: "a4", 
                              orientation: "portrait",
                              precision: 1,
                           }
                        };
                        html2pdf().set( {
                           pagebreak: { mode: "avoid-all", before: "#break-page" }
                        } ); 
                        html2pdf().from( invoice ).set( data ).save();

                        /* setInterval( () => {    // put margin in invoice
                           document.querySelector( "#invoice_html" ).style.padding = "0";
                        }, 500 );
                     }, 500 ); */
                  } );
               } );
            </script>
         </body>
      </html>
   `;
}


export const invoiceFile = `
   <!DOCTYPE html>
   <html lang="pt-br">
      <head>
         <title>Elétrica & Art</title>
      
         <link rel="icon" href="src/pix/logo.svg" type="svg+xml">
         <meta charset="UTF-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <!-- == [ fontawesome ]
         == == == == == == == == == -->
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
         <script src="https://esm.sh/@fortawesome/fontawesome-free"></script>
         <!-- == [ StyleSheets ] 
         == == == == == == == == == -->
         <link rel="stylesheet" href="../src/styles/clb.css">
         <style>


         /* montserrat */
         @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
         /* inter */
         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
         /* poppins */
         @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
         /* roboto */
         @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
         
         /* == [ defaults ]
         == == == == == == == == == */
         @import url( "./globals/defalts.css" );
         *,
         *::before,
         *::after {
            margin:0; 
            padding:0; 
            box-sizing:border-box;
         }
         
         :root {
            font: 1em "inter";
            font-weight: 400;
            /* color: #bbb; */
            
            
            /* color-scheme: light dark; */
            /* vite */
            /* background-color: #242424;  */
            /* dark reader */
            /* background: #1e2021;        */
            /* céo */
            /* background-color: #212329;   */
         
            --appbar-shadow: rgba( 0 0 0 .25 ) 0 4px 8px;
         
            font-synthesis: none;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
         
         
         }
         
         ::-webkit-scrollbar {
            width: 10px;
         }
         ::-webkit-scrollbar-track {
            background: var( --pink );
            border-radius: 5px;
         }
         ::-webkit-scrollbar-thumb {
            background: var( --scrollbar-thumb, #27f );
            border-radius: 5px;
         }
         
         html {
            flex-direction: column;
            /* width: 100vw; */
            min-height: 100vh;
            line-height: 1.15;
            -webkit-text-size-adjust: 100%;
            background: #1b1d22;
         
            background-color: #1b1d22;
            background-image: 
               linear-gradient(
                  0deg, 
                  #00000000 24px, 
                  #313339 25px
               ),
               linear-gradient(
                  90deg, 
                  #00000000 24px, 
                  #313339 25px
               )
            ;
            background-size: 25px 25px;
            scroll-behavior: smooth;
         }
         
         body {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
         }
         
         /* == [ defaults ] 
         == == == == == == == == == */
         h1, h2, h3, h4, h5, h6, 
         t1, t2, t3, t4, t5, t6,
         tt, 
         st, st6,  
         ct1, ct2, ct3, ct4, ct5, ct6 {
            display: block;
            font-family: "Montserrat", sans-serif;
            font-weight: bold;
            font-optical-sizing: auto;
            font-style: normal;
         }
         
         txt {
            display: flex;
            flex-direction: row;
         }
         
         p, t, txt, li {
            font-family: "inter", "Roboto", sans-serif;
            font-weight: normal;
         }
         
         h1, h2, h3, h4, h5, h6,
         p, t, txt, tt, st {
            overflow-wrap: break-word;
         }
         
         t { 
            display: block; 
            font-size: 1em;
         }
         
         st, st6 {
            color: var( --st, #777 );
         }
         
         ct1, ct2, ct3, ct4, ct5, ct6 {
            text-align: center;
         }
         
         p { margin: 1em 0; }
         
         
         h1 {
            font-size: 2em; margin: 0.67em 0; 
         }
         
         h2 {
            font-size: 1.5em; margin: 0.83em 0;
         }
         
         h3 {
            font-size: 1.4em; margin: 1em 0;
         }
         
         h4 {
            font-size: 1.25em; margin: 1.33em 0;
         }
         
         h5 {
            font-size: 1.15em; margin: 1.67em 0;
         }
         
         h6 {
            font-size: 1em; margin: 2.33em 0;
         }
         
         t1, t2, t3, t4, t5, t6, 
         tt, 
         st, st6,  
         ct1, ct2, ct3, ct4, ct5, ct6 { margin: 0; }
         
         tt, t1, ct1 { font-size: 2em; }
         t2, ct2 { font-size: 1.5em; }
         st, t3, ct3 { font-size: 1.4em; }
         t4, ct4 { font-size: 1.25em; }
         t5, ct5 { font-size: 1.15em; }
         t6, ct6, st6 { font-size: 1em; }
         
         ul, ol {
            margin: 1em 0;
            padding-left: 2.2em;
         }
         
         dl {
            display: flex;
            flex-direction: column;
            gap: 1em;
         }
         dt, dt > * {   
            font-weight: bold;
         }
         
         dd {
            padding-left: 2em;
         }
         
         emphasis {
            display: flex;
            padding: 1.5em;
            box-shadow: #9995 -6px 0 0 -1px;
            line-height: 1.75em;
         }
         
         form {
            display: flex;
            flex-direction: column;
            /* gap: 1.5rem; */
         }
         
         content:has( label ), 
         [content]:has( label ) {
            gap: 1.5rem;
         }
         
         label {
            display: flex;
            flex-direction: column;
            gap: 8px;
         }
         
         label > t, lt {
            font: 14px sans-serif;
            padding: 0 1rem;
         }
         
         input, [input], textarea {
            height: 56px;
            width: 100%;
            flex: 1;
            border-radius: 9px;
            border: #fff2 1px solid;
            outline: transparent;
            padding: 1rem;
            font-size: 1rem;
            background: var( --bg );
            color: var( --text-color );
            accent-color: var( --accent, #daa520 );
         }
         
         :is( td, td, th ):has( input[type="text"], input[type="number"] ) {
         }
         
         :is( td, td, th ) :where( input[type="text"], input[type="number"], input[type="tel"], input[type="email"], input[type="date"] ) {
            padding: 0 !important;
            background: transparent !important;
            font-size: inherit !important;
            width: 100% !important;
            height: 100% !important;
            font-family: inherit !important;
         }
         
         /* input type switch */
         label[switch] {
            cursor: default;
            /*
            display: inline-block;
            position: relative;
            width: 60px;
            height: 34px;
            */
            flex-direction: row;
            align-items: center;
         }
         label[switch] input {
            width: 0;
            height: 0;
            opacity: 0;
         }
         slider {
            cursor: pointer;
            /*
            position: absolute;
            top: 0;
            top: 1em;
            left: 0;
            right: 0;
            bottom: 0;
            */
            background-color: var( --input-slider, #ccc );
            border-radius: 34px;
            -webkit-transition: .4s;
            transition: .4s;
         
            /* display: flex; */
            /* align-items: center; */
            width: 3.5em;
            padding: 2px;
         }
         slider > ball {
            content: "";
            /*
            position: absolute;
            left: 4px;
            bottom: 4px;
            */
            display: block;
            width: 26px;
            height: 26px;
            background-color: var( --input-slider-before, white );
            border-radius: 50%;
            -webkit-transition: .4s;
            transition: .4s;
         
            top: 1em;
         }
         /* slider:before {
            content: "";
            position: absolute;
            left: 4px;
            bottom: 4px;
            width: 26px;
            height: 26px;
            background-color: var( --input-slider-before, white );
            border-radius: 50%;
            -webkit-transition: .4s;
            transition: .4s;
         
            top: 1em;
         } */
         input:checked + slider {
            background-color: var( --input-switch, #2196F3 );
            background-color: var( --input-switch, #fc0 );
         }
         input:focus + slider {
            box-shadow: 0 0 1px var( --input-switch, #2196F3 );
         }
         input:checked + slider > ball {
            -webkit-transform: translateX( 26px );
            -ms-transform: translateX( 26px );
            transform: translateX( 26px) ;
         }
         /* input:checked + slider:before {
            -webkit-transform: translateX( 26px );
            -ms-transform: translateX( 26px );
            transform: translateX( 26px) ;
         } */
         
         input[type="submit"],
         input[type="button"],
         btn, button {
            /* border: var( --card-lv2 ) 2px solid; */
            background-color: var( --btn-simp, #27f3 );
            background-image: linear-gradient( to bottom, #fff #fff );
            text-transform: uppercase;
            font-weight: bold;
            color: var( --card-lv2 );
         }
         
         label msg {
            display: flex;
            align-items: center;
            height: 0;
         }
         label msg content {
            display: flex;
            flex-direction: row;
            height: 16px;
            margin-top: 8px;
            gap: 4px;
         }
         label msg content icon {
            display: flex;
            align-items: center;
            width: 16px;
            height: 16px;
            aspect-ratio: 1;
            padding: 0;
         }
         label msg content t {
            display: flex;
            align-items: center;
            font-size: 10px;
         }
         label msg content[error] t {
            color: var( --error, #f55 );
         }
         label msg content[error] t::before {
            content: "🚫";
            display: grid;
            place-items: center;
            width: 16px;
            height: 16px;
            aspect-ratio: 1;
            margin-right: 4px;
            padding: 0;
            font-size: 16px;
         } 
         form > footer,
         form > content > footer {
            display: flex;
            flex-direction: column;
         }
         
         
         
         body {
            min-height: 100vh;
            margin: 0;
         }
         
         
         
         main, [main] {
            display: flex;
            flex-direction: column;
         }
         
         video {
            width: clamp( 100px, 100%, 759.98px );
            aspect-ratio: 16 / 9;
         }
         
         table {
            border-collapse: collapse;
            width: 95%;
            margin: 0 auto;
         }
         td {
            text-align: center;
         }
         th, td {
            padding: 0.5rem;
         }
         
         table[flex] {
            display: flex;
            flex-direction: column;
            /* max-width: 100dvw; */
         }
         
         table[flex] thead,
         table[flex] tbody,
         table[flex] tfoot {
            display: flex;
            flex-direction: column;
         }
         table[flex] tr {
            display: flex;
         }
         table[flex] th,
         table[flex] td {
            display: flex;
            padding: 0;
            flex: 1;
         }
         
         
         
         
         
         @media ( prefers-color-scheme: light ) {
            /* :root {
               color: #213547;
               background-color: #ffffff;
            } */
            /* a:hover {
               color: #747bff;
            }
            button {
               background-color: #27f;
            } button a {
               color: #e9e6e3;
            } */
         
         }
         
         @media ( prefers-color-scheme: dark ) {
            /* :root {
               color: #bbb;
               background-color: #212329;
               background-color: #1b1d22;
            } */
         
            /* a:hover {
               color: #747bff;
            }
            button {
               background-color: #fc0;
            } button a {
               color: #16181c;
            }
         
            code {
               display: block;
               background: #0005;
               padding: .5rem;
               border-radius: 9px;
               white-space: break-spaces;
               backdrop-filter: blur( 12px );
            } */
         }
         
         
         
         
         /* == [ clb ] 
         == == == == == == == == == */
         appbar, app-bar,
         sidebar, side-bar, 
         drawer, main, 
         homepage, home-page,  
         child, [child], 
         section, [section], 
         article, [article], 
         content, [content], 
         page, [page], 
         sheet, [sheet], 
         box, [box], 
         card, [card],
         appfooter, app-footer, 
         placeholder {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin: 0;
            padding: 0;
         }
         
         view, [view] {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            flex: 1;
            margin: 0;
            padding: 0;
         }
         
         appbar {
            position: sticky;
            top: 0;
            left: 0;
         }
         
         homepage, home-page {
            margin: 0 auto;
            flex: 1;
         }
         
         view, [view] {
            margin: auto;
            flex: 1;
         }
         
         section, [section] {
         }
         section[horizontal],
         [section][horizontal] {
            flex-direction: row !important;
         }
         
         [section="dual"] {
            display: flex;
            flex-direction: row;
         }
         
         card, [card] {
            border-radius: 1.1em;
         }
         
         content, [content] {
            padding: 1em;
         }
         [content="mobile"], [mobile] {
            width: clamp( 100px, 95%, 696px );
            margin: 0 auto;
            padding: 3rem !important;
         }
         
         tiles {
            display: flex;
         }
         tiles > content {
            /*
            flex-direction: row !important;
            flex-wrap: wrap;
            justify-content: space-between;
            */
            display: grid !important;
            grid-template-columns: repeat( 2, 1fr );
            gap: 1em;
         }
         tiles > content > tile {
            /*
            */
            flex-shrink: 1;
            flex-grow: 0;
            flex-basis: calc( 50vw - 1.5em );
            aspect-ratio: 1;
         }
         
         tile > content {
            height: 100%;
         }
            
         
         gap, [gap] {
            gap: 1em;
         }
         em, [em] {
            padding: 0.5em;
         }
         
         child, [child] {
         }
         
         
         page, [page] {
            width: clamp( 100px, 100%, 1092px );
            margin: 0 auto;
         }
         
         sheet, [sheet] {
            width: clamp( 100px, 100%, 759.98px );
            margin: 0 auto;
            padding: 1.5em 0;
         }
         
         box, [box] {
            border-radius: 9px;
            border: #9995 1px solid;
            margin: 1em;
            padding: 0 1em;
         }
         
         block, [block] { display: block; }
         flex, [flex], column, [column] {
            display: flex;
            flex-direction: column;
            width: 100%;
         }
         row, [row] {
            display: flex !important;
            flex-direction: row !important;
         }
         
         duo, [duo] {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
         }
         
         center, [center] {
         }
         
         placeholder img {
            display: block;
            width: 100%;
         }
         
         
         
         /* == [ modal ]
         == == == == == == == == == */
         modal::-webkit-scrollbar {
            width: 0px;
         }
         
         
         
         
         /* == [ clb properties ]
         == == == == == == == == == */
         [hidden] { display: none; }
         
         [center] {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
         }
         
         /* [gap] { gap: 2em; } */
         
         [pd="2em"] { padding: 2em; }
         [np] { padding: 0 !important; }
         
         [w-s] { width: clamp( 100px, 100%, 750px ); margin: auto; }
         [w-m] { width: clamp( 100px, 100%, 950px ); margin: auto; }
         [w-l] { width: clamp( 100px, 100%, 1250px ); margin: auto; }
         
         
         
         /* == [ clb colors ]
         == == == == == == == == == */
         [red]    { color: crimson; }
         [blue]   { color: #29f;    }
         [pinklyh]{ color: #fc0fc0; }
         [roselyh]{ color: #905;    }
         [amber]  { color: #fc0;    }
         
         
         /* == [ [link ]
         == == == == == == == == == */
         [link] {
            cursor: pointer;
         }
         
         
         
         /* == [ mídias ]
         == == == == == == == == == */
         pix {
            display: flex;
         } pix > img {
            width: clamp( 100px, 55dvw, 550px );
            margin: auto;
         } pix > img[vertical] {
            height: clamp( 100px, 55dvw, 550px );
            width: auto;
            margin: auto;
         }
         vid {
            display: flex;
            width: clamp( 100px, 100%, 550px );
            aspect-ratio: 16 / 9;
            margin: auto;
         } vid > * {
            width: 100%;
            height: 100%;
            border: transparent;
         }
         
         
         
         
         /* == [ icons ]
         == == == == == == == == == */
         i {
            display: grid !important;
            place-items: center;
            width: 48px;
            height: 48px;
            aspect-ratio: 1;
         }
         
         i[xs] { width: 24px; height: 24px; }
         i[s] { width: 36px; height: 36px; }
         i[m] { width: 48px; height: 48px; }
         i[g] { width: 72px; height: 72px; }
         i[xg] { width: 96px; height: 96px; }
         
         
         </style>
         <link rel="stylesheet" href="../src/styles/globals.css">
         <style>
         

   :root {
   --bg: #e5e5e5;
   --bg2: #f5f5f5;
   --ground: #fff;
   --card-lv1: #00559C;
   --card-lv2: #0075BD;
   --card-lv3: #009ee6;

   --appbar-shadow: #0005 0 0 10px;
   --appbar-logo-shadow: #ffab00 0 0 0 2px;
   --appbar-title: #fff;
   --appbar-title-divider: #daa520;
   --appbar-title-shadow: #0005 3px 0 3px;
   --card: #f5f5f5;

   --text-color: #333;
   --a-hover: #747bff;
   --btn-bg: #27f;
   --btn-bg: var( --card-lv1 );
   --error: #f55;

   --homepage: var( --bg );

   --form-bg: var( --bg2 );

   --customer: #fff;
   --customer-name: #333;
   --customer-address: #777;

   font: 1em "inter";
   font-weight: 400;
   color: var( --text-color );

   --class-title: var( --card-lv2 );
   }

   ::-webkit-scrollbar {
   width: 10px;
   }
   ::-webkit-scrollbar-track {
   background: var( --scrollbar-track, #d5d5d500 );
   border-radius: 5px;
   }
   ::-webkit-scrollbar-thumb {
   background: var( --scrollbar-thumb, #1b1d2200 );
   border-radius: 5px;
   }

   a {
   text-decoration: transparent;
   }

   html {
   }

   body {
   background: var( --bg );
   }

   /* == [ app-fix ]
   == == == == == == == == == */
   body {
   min-height: 100vh !important;
   max-height: 100vh !important;
   }

   homepage, home-page {
   overflow: scroll !important;
   height: 100vh !important;
   }
   homepage::-webkit-scrollbar,
   home-page::-webkit-scrollbar {
   width: 0 !important;
   height: 0 !important;
   }
   /* == == == == == == == == == */

   homepage, home-page {
   /* backdrop-filter: blur( 13px ); */
   background-color: var( --homepage, #fff9 );
   /* background-blend-mode: overlay;
   background-image: radial-gradient(
   circle at center, 
   #fff 80%, #27f5 
   ); */
   /* background-image: url( ../imgs/bgs/2c79b93ca8dbe8e7c3ec4d7152eb0d31.jpg ); */
   }

   content, [content] {
   height: 100%;
   }

   card, [card] {
   background: var( --card, #f5f5f5 );
   }
   card-content {
   padding: 1em;
   }

   appbar {
   display: flex;
   flex-direction: column;
   width: 100%;
   margin: 0;
   padding: 0;
   position: sticky;
   top: 0;
   left: 0;
   z-index: 9;
   box-shadow: #0005 0 0px 6px 2px !important;
   }
   app-bar,
   appbar {
   background: var( --card-lv1 );
   /* background-image: url( ../imgs/bgs/8fb2-h.jpeg ); */
   background-blend-mode: overlay;
   box-shadow: var(--appbar-shadow);
   height: 72px;
   }

   app-bar > content,
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
   /* aspect-ratio: 1; */
   }
   trigram {
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   width: 100%;
   height: 100%;
   aspect-ratio: 1.2 / 1;
   cursor: pointer;
   }
   trigram > bar {
   display: flex;
   width: 100%;
   aspect-ratio: 7 / 1;
   border-radius: 9px;
   background: #fff;
   }

   content:has( > back-btn ) {
   padding: 2px;
   width: 100%;
   height: 100%;
   }
   back-btn {
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   width: 100%;
   height: 100%;
   aspect-ratio: 1.2 / 1;
   cursor: pointer;
   }
   back-btn > bar {
   display: flex;
   width: 100%;
   aspect-ratio: 7 / 1;
   border-radius: 9px;
   background: #fff;
   }
   back-btn > bar#backBtn_topBar {
   transform: rotate(-45deg);
   transform: rotate(-45deg) translate(-5px, 2px);
   width: 70%;
   aspect-ratio: 7 / 1.3;
   }
   bar#backBtn_centerBar {
   background: transparent;
   }
   back-btn > bar#backBtn_bottomBar {
   transform: rotate(45deg) translate(-5px, -2px);
   width: 70%;
   aspect-ratio: 7 / 1.3;
   } 

   fab {
   display: grid;
   place-items: center;
   /* justify-content: center; */
   border: transparent;
   border-radius: 100%;
   background: var( --card-lv1 );
   width: 66px;
   height: 66px;
   aspect-ratio: 1;
   position: fixed;
   bottom: 24px;
   /*bottom: 6%;*/
   right: 1em;
   filter: drop-shadow( 2px 4px 6px #0005 );
   cursor: pointer;
   z-index: 10;
   }

   fab > content {
   color: var( --appbar-title, #fff );
   width: calc( 100% - 2em );
   height: calc( 100% - 2em );
   padding: 0;
   align-items: center;
   justify-content: center;
   }
   fab > content > * {
   font-size: 2.5em;
   font-weight: bold;
   }
   fab a {
   color: var( --appbar-title );
   text-decoration: transparent;
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

   /* img#ea_logoURI {
   background-image: url( "https://raw.githubusercontent.com/Ceo-js/ea/2e6fdd74866a50968095c8c6942156d1e93e1c34/ea.jpg" );
   background-size: cover;
   } */

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

   cadastro > header {
   }


   tt {
   color: var(--text-color);
   }

   a:hover {
   color: var( --a-hover );
   }

   button, input[type="submit"] {
   background-color: var(--btn-bg);
   border: transparent;
   } 
   button a, input[type="submit"] {
   color: var(--ground);
   }


   form {
   background: var( --form-bg );
   border-radius: 1.5rem;
   padding-bottom: 1rem;
   }

   form .divider {
   display: flex;
   align-items: center;
   border-bottom: var( --card-lv3 ) 2px dashed;
   }
   form .divider content {
   padding: 4px 0;
   font-weight: bold;
   }

   whats-copy {
   display: flex;
   align-items: flex-end;
   width: 24px;
   height: 56px;
   }
   whats-copy > img {
   width: 24px;
   height: 24px;
   aspect-ratio: 1;
   }

   .multi {
   flex-direction: row !important;
   gap: 1rem;
   }





   /* == [ drawer ] 
   == == == == == == == == == */
   drawer {
   display: none;
   flex-direction: row;
   width: 100%;
   height: 100dvh;
   position: fixed;
   /* position: sticky; */
   top: 0;
   left: 0;
   z-index: 9;
   background: #0005;
   }
   drawer-inside::-webkit-scrollbar {
   width: 0px;
   }
   drawer-inside::-webkit-scrollbar-track {
   background: #f5f5f5;
   border-radius: 5px;
   }
   drawer-inside::-webkit-scrollbar-thumb {
   background: #f5f5f5;
   border-radius: 5px;
   }
   drawer[opened] { display: flex; }
   drawer[closed] { display: none; }
   drawer-inside {
   display: flex;
   flex-direction: column;
   height: 100dvh;
   overflow-y: scroll;
   background: var( --card-lv5, #fff );
   background-image: url( ../../src/imgs/bgs/2c7.jpg );
   box-shadow: #0005 0 0 5px;
   }
   drawer[opened] > drawer-inside {
   width: clamp( 100px, 95%, 350px );
   }
   drawer[closed] > drawer-inside {
   /* transition: all 5s cubic-bezier(0.68, -0.55, 0, 1.31); */
   width: 0;
   }
   drawer-outside {
   display: flex;
   flex: 2.5;
   }


   drawer-inside > header {
   display: flex;
   width: 100%;
   background: var( --drawer-header, #21232910 );
   background: var( --drawer-header, #225 );
   background-image: url( ../../src/imgs/bgs/8fb-h.jpg );
   background-image: url( ../../src/imgs/bgs/8fb2-h.jpeg );
   background-size: cover;
   backdrop-filter: blur( 13px );
   aspect-ratio: 16 / 9;
   }
   drawer-inside > content {
   background-color: var( --bg2 );
   background-color: var( --drawer-inside, #e5e5e500 );
   }


   drawer main-menu {
   gap: .8em;
   }
   drawer menu-item {  
   display: flex;
   background: var( --drawer-item, #fff1 );
   backdrop-filter: blur( 13px );
   filter: drop-shadow( #0005 5px 6px 10px );
   box-shadow: #0003 0 5px 10px;
   padding: 1em;
   border-radius: 9px;
   align-items: center;
   justify-content: flex-start;
   gap: 1rem;
   font-size: .9em;
   }
   drawer menu-item a {
   text-decoration: none;
   color: var( --menu-item-link, #555 );
   }

   drawer icon {
   display: grid;
   place-items: center;
   width: 36px;
   height: 36px;
   aspect-ratio: 1;
   }

   user-profile {
   display: flex;
   flex-direction: column;
   justify-content: flex-end;
   width: 100%;
   height: 100%;
   aspect-ratio: 16 / 9;
   }
   user-profile > user-pic > picture {
   display: flex;
   width: 60px;
   height: 60px;
   aspect-ratio: 1;
   }
   user-profile > user-pic > picture > img {
   width: 100%;
   height: 100%;
   aspect-ratio: 1;
   border-radius: 100vw;
   box-shadow: var(--appbar-logo-shadow);
   }

   user-info {
   display: flex;
   flex-direction: column;
   gap: .2em;
   background-image: linear-gradient(
   to bottom, transparent, #0009, #0009
   );
   }
   user-name {
   display: flex;
   color: var( --user-name, #fff );
   font-weight: bold;
   }   
   user-phone {
   display: flex;
   font-size: .9em;
   color: var( --user-phone, #fc0 );
   }   

   drawer > drawer-inside > footer {
   display: flex;
   align-items: center;
   justify-content: center;
   background: var( --bg );
   font-size: .9em;
   }

   @keyframes openingDrawer {
   0% {
   display: none;
   opacity: 0;
   width: 0;
   }
   10% {
   display: flex;
   opacity: .1;
   width: 0;
   }
   100% {
   opacity: 1;
   width: 100%;
   }
   }




   /* == [ console ]
   == == == == == == == == == */
   console {
   /* background: var( --bg2 ); */
   }


   /* == [ customers ]
   == == == == == == == == == */
   customers {
   gap: 1em;
   }
   customer {
   display: flex;
   justify-content: center;
   background-color: var( --customer, #21232940 );
   background-color: var( --customer, #bdbebf );
   /* filter: drop-shadow( var( --customer-shadow, #0003 ) 3px 8px 18px ); */
   border: transparent;
   border-radius: 1.25em;
   width: 100%;
   aspect-ratio: 10/2.86; /*452 x 129*/
   /*backdrop-filter: blur( 5px );*/
   /* box-shadow: #0005 3px 6px 15px; */
   }
   customer > header {
   display: flex;
   align-items: center;
   justify-content: center;
   flex: .3;
   }
   customer > contents {
   display: flex;
   justify-content: center;
   gap: 1em;
   flex: .7;
   }

   customer > header > content {
   height: calc( 100% - 0px );
   }
   customer > contents > content {
   height: calc( 100% - 5px );
   }
   customer > header > picture {
   display: flex;
   width: 90%;
   border-radius: 100%;
   }
   customer picture > img {
   border-radius: 100%;
   width: 100%;
   }

   customer name {
   font-size: 1.3em;
   font-weight: bold;
   }
   customer phone {
   font-size: 1em;
   }


   /* == [ customer ]
   == == == == == == == == == */
   #customer_pic {
   position: relative;
   display: flex;
   align-items: flex-end;
   width: 100%;
   aspect-ratio: 16 / 9;
   flex-direction: column;
   background-size: cover;
   background-repeat: no-repeat;
   }
   #customer_pic picture {
   display: flex;
   width: 100%;
   aspect-ratio: 16 / 9;
   overflow: hidden;
   }
   img#customer_pic_uri {
   width: 100%;
   }

   content[name] {
   width: 100%;
   /* aspect-ratio: 10 / 3; */
   justify-content: center;
   background-image: linear-gradient(
   to bottom,
   #0000 10%, 
   #16181cdd, 
   #000
   );
   background-image: linear-gradient(
   to bottom,
   #0000 70%, 
   var( --bg )
   );
   position: absolute;
   }
   #customer_name {
   font-size: 1.5em;
   font-weight: bold;
   color: var( --customer-name, #212329 );
   /* text-shadow: #000 0 0 10px;
   filter: drop-shadow( #000 0 0 10px ); */
   }

   #customer_address {
   display: flex;
   flex-wrap: wrap;
   width: 90%;
   font-size: .8em;
   font-weight: bold;
   color: var( --customer-address, #fc0 );
   }

   card-item {
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 1em 0;
   border-bottom: #9995 1px solid;
   }
   card-item strong {
   color: var( --card-item-strong, #555 );
   }
   divider {
   /* background: var(--divider, #ddd); */
   color: #555;
   font-weight: bold;
   text-transform: uppercase;
   }

   list > li {
   /* padding: 1em 1.5em; */
   /* border-bottom: #0009 1px solid; */
   }


   tile {
   overflow: hidden;
   }
   tile > content {
   align-items: center;
   justify-content: space-between;
   }
   tile i {
   flex: 1;
   }

   tile i::before {
   font-size: 2em;
   color: var( --tile-i, goldenrod );
   }


   /* == [ new service ]
   == == == == == == == == == */
   input#input_serviceName {
   font-size: 1.4em;
   font-weight: bold;
   border: transparent;
   outline: transparent;
   }


   /* == [ receipts ]
   == == == == == == == == == */
   home-page:has( recibos ) {
   /* min-height: calc( 100dvh - 72px ); */
   background: var( --bg3, #fff );
   }

   recibos {
   /* background: var( --bg2 ); */
   min-height: 100vh;
   }

   recibos > content {
   display: grid;
   /* gap: 1em; */
   }
   /* recibo {
   clip-path: polygon( 0 0, 100% 0, 100% 97%, 95% 100%, 90% 97%, 85% 100%, 80% 97%, 75% 100%, 70% 97%, 65% 100%, 60% 97%, 55% 100%, 50% 97%, 45% 100%, 40% 97%, 35% 100%, 30% 97%, 25% 100%, 20% 97%, 15% 100%, 10% 97%, 5% 100%, 0 97% );
   background: #2905 !important;
   min-height: 90px;
   aspect-ratio: 1 / 1.5;
   border-radius: 0 !important;
   backdrop-filter: drop-shadow( #0005 2px 2px 2px );
   } */
   recibo {
   display: grid !important;
   font-size: clamp( 5px, 3vw, 50px );
   aspect-ratio: 16 / 4;
   background: transparent !important;
   }
   /* recibo > contents {
   filter: drop-shadow( #0000 2px 2px 10px );
   clip-path: polygon(
   0 .8em, .8em 0, 67% 0, 69.3% .6em, 71.3% 0, 100% 0, 100% 100%,
   71.3% 100%, 69.3% calc( 100% - .6em ), 67% 100%, 0 100% 
   );
   display: grid !important;
   grid-template-columns: 2fr 5fr 3fr;
   aspect-ratio: 16 / 4;
   background: var( --receipt, #515359 ) !important;
   background: var( --receipt, #e5e5e5 ) !important;
   background: var( --receipt, white ) !important;
   border-radius: 0 !important;
   border-top: #e5e5e5 .125em dashed;
   border-bottom: #e5e5e5 .125em dashed;
   border-left: #e5e5e5 .125em dashed;
   position: relative;
   overflow: hidden;
   text-wrap: nowrap;
   }  */
   recibo > contents {
   filter: drop-shadow( #0000 2px 2px 10px );
   /* clip-path: polygon(
   0 .8em, .8em 0, 67% 0, 69.3% .6em, 71.3% 0, 100% 0, 100% 100%,
   71.3% 100%, 69.3% calc( 100% - .6em ), 67% 100%, 0 100% 
   ); */
   display: grid !important;
   grid-template-columns: 2fr 5fr 3fr;
   aspect-ratio: 16 / 4;
   background: var( --receipt, white ) !important;
   border-radius: 0 !important;
   border-bottom: #e5e5e5 .2em dashed;
   position: relative;
   /* overflow: hidden; */
   text-wrap: nowrap;
   } 

   recibo > contents > mask {
   display: grid;
   position: absolute;
   top: 0;
   right: -.25em;
   background: transparent;
   width: 32.01%;
   height: 100%;
   /* border-left: var( --bg54, #e5e5e599 ) .25em dotted;
   border-right: #e5e5e5 .7em dotted; */
   }

   date, main-info, total-price {
   overflow: hidden;
   max-width: 100%;
   }

   desc > *, who > * {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   }

   calendar {
   display: grid;
   grid-template-rows: .6fr .2fr;
   place-items: center;
   background: var( --calendar, #e5e5e5 );
   border-radius: 9px;
   font-weight: bold;
   font-size: clamp( 5px, 3vw, 50px );
   }

   calendar > calendar-block {
   display: grid;
   grid-template-rows: .2fr .6fr .2fr;
   place-items: center;
   width: 100%;
   background: var( --calendar-block, white );
   border-radius: 9px;
   font-weight: bold;
   padding: 0 5px;
   border: var( --calendar-block-border, #f920 ) 4px solid;
   font-size: clamp( 5px, 3vw, 50px );
   border: #ddd 1px solid;
   }

   calendar month {
   font-size: .875em;
   }

   calendar day {
   font-size: 2em;
   font-weight: bold;
   color: #555;
   }

   calendar year {
   font-size: 1.1em;
   color: var( --calendar-year, #777 );
   }

   recibo [section] > content {
   justify-content: center;
   }

   recibo date {
   min-width: 90.513px;
   }
   recibo date > content {
   padding-left: 1.5em;
   padding-right: 0.5em;
   }

   recibo main-info {
   }

   main-info > * {
   flex: 1;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   }

   main-info desc > * {
   font-size: 1.2em;
   }

   desc > *, who > * {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   }

   main-info who {
   color: var( --receipt-who, #777 );
   }
   recibo total-price {
   text-align: center;
   }
   recibo total-price > content {
   gap: 1em;
   padding-left: 0.5em;
   padding-right: 1.5em;
   align-items: flex-end;
   }


   recibo status {
   display: grid;
   place-items: center;
   justify-content: flex-end;
   align-self: flex-end;
   border-radius: 5em;
   /* background: #27f5; */
   padding: .5em;
   color: #27f;
   }

   recibo total {
   font-weight: bold;
   }



   /* == [ AppFooter ]
   == == == == == == == == == */
   appfooter, app-footer {
   background-color: var( --app-footer, #16181c );
   color: var( --app-footer-text, #959595 );
   background-image: url( "../imgs/plasma/w1.jpeg" );
   background-image: url( "../imgs/plasma/eletromagnetico.jpg" );
   background-blend-mode: overlay;
   /* min-height: 150px; */
   font-family: "poppins" !important;
   }

   app-footer h1 {
   font-family: thunder;
   color: var( --appbar-title );

   background: radial-gradient(
   at center,
   #daa520, red
   );
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   }
   ea-footer-e {
   color: var( --appbar-title-divider );
   }

   /* == [ classes ]
   == == == == == == == == == */
   .title, [title] {
   color: var( --class-title );
   }



   /* == [ NavBar ]
   == == == == == == == == == */
   navbar {
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 66px;
   min-height: 66px;

   bottom: 0;
   left: 0;
   background: #1b1d22;
   color: #fff;
   }
   navbar > nav-item {
   display: flex;
   flex-direction: column;
   gap: .125em;
   max-width: 72px;
   height: 100%;
   flex: 1;
   align-items: center;
   justify-content: center;
   }
   nav-item > ico {
   display: flex;
   align-items: center;
   justify-content: center;
   width: calc( 24px + 1em );
   height: calc( 24px + 1em );
   padding: .4em;
   border-radius: 50vw;
   background: #212329;
   transition: all .3s ease;
   position: relative;
   }
   nav-item > ico:hover {
   width: 100%;
   justify-content: space-between;
   box-shadow: #daa520 0 0 0 3px;
   }

   nav-item > ico > t {
   display: none;
   font-size: .75em;
   position: absolute;
   left: -1000px;
   opacity: 0;
   transition: 5s 10s ease;
   }
   nav-item > ico:hover > t {
   transition: all 1s ease;
   display: flex;
   left: 50%;
   opacity: 1;
   }

   nav-item > ico > i {
   display: grid;
   place-items: center;
   width: 24px;
   height: 24px;
   }
   nav-item > t {
   display: grid;
   place-items: center;
   font-size: .75em;
   }


   /* == [ receipt pdf ]
   == == == == == == == == == */
   #pdf_page {
   background: var( --pdf-page, #fff );
   }
   #form_receipt_pdf {
   display: flex;
   flex-direction: column;
   }

   top-flag {
   padding: 0.245em 0 0;
   background: var( --top-flag, #8cb2e6 );
   background: var( --card-lv4, #19497b77 );
   }

   top-flag label {
   flex: 1;
   text-align: center;
   }

   top-flag label t {
   font-weight: bold;
   color: #19497b;
   padding: 0 !important;
   }

   top-flag input {
   font-size: .625em;
   text-align: center;
   }

   #form_receipt_pdf input {
   border-radius: 0;
   border: transparent;
   outline: transparent;
   padding: 0.4em;
   }


   #form_receipt_pdf customer {

   }

   #form_receipt_pdf badge {
   background: var( --badge, #19497b );
   padding: 0.2em;
   text-align: center;

   }

   #form_receipt_pdf tt {
   font-size: 1em;
   text-transform: capitalize;
   color: var( --receipt-pdf-tt, #fff );
   }

   #form_receipt_pdf table {
   width: 100%;
   }

   table#customer > tbody tr:nth-child( odd ) {
   background: #f5f5f5;
   }
   table#customer > tbody tr:nth-child( even ) {
   background: #e5e6f9;
   background: #e5e5e5bf;
   }

   #form_receipt_pdf tr {
   display: flex;
   }

   #form_receipt_pdf th {
   flex: 1;
   text-align: left;
   text-transform: uppercase;
   font-weight: bolder;
   color: var( --table-customer-th-color, #212329 );
   /* background: var( --receipt-pdf-th, #b5dfef ); */
   }

   #form_receipt_pdf td {
   flex: 2;
   /* background: var( --receipt-pdf-td, #deeff7 ); */
   }

   table#customer th[nome] {
   flex: 1;
   }
   table#customer td[nome] {
   flex: 5.3;
   }

   table#customer :where( name ) {

   }

   table#customer :where( th ) {
   border-right: #ebe 1px dashed;
   border-left: #ebe 1px dashed;
   max-width: fit-content;
   }
   #form_receipt_pdf td:has( input#input_uf ) {
   max-width: 6ch;
   }

   /* table#customer :where( th, td ) { */
   #form_receipt_pdf :where( th, td ) {
   padding: .4em;
   font-size: .8em;
   }


   #form_receipt_pdf :where( tr, td ) {
   color: #27f;
   font-size: .8em;
   }


   #table-budget thead tr {
   background: var( --receipt-table-thead, #8cb2e6 );
   background: var( --receipt-table-thead, #19497b77 );
   }
   #table-budget thead tr :where( th, td ) {
   background: transparent;
   }

   #form_receipt_pdf th#qt {
   flex: 0 1 20%;
   text-align: center;
   }
   #form_receipt_pdf th#description {
   flex: 0 1 100%;
   text-align: center;
   }
   #form_receipt_pdf th#tot {
   flex: 0 1 20%;
   text-align: center;
   }
   #form_receipt_pdf th#unit {
   flex: 0 1 20%;
   text-align: center;
   }

   #tbody_budget:nth-child( odd ) {
   background: #f5f5f5;
   }
   #tbody_budget > tr > * {
   color: #333;
   }
   #tbody_budget > tr:nth-child( even ) {
   background: #e5e6f9;
   background: #e5e5e5bf;
   }

   #tbody_budget > tr :nth-child( 1 ) {
   background: transparent;
   flex: 0 1 20%;
   text-align: center;
   }
   #tbody_budget > tr :nth-child( 2 ) {
   background: transparent;
   flex: 0 1 100%;
   text-align: center;
   }
   #tbody_budget > tr :nth-child( 3 ) {
   background: transparent;
   flex: 0 1 20%;
   text-align: center;
   }
   #tbody_budget > tr :nth-child( 4 ) {
   background: transparent;
   flex: 0 1 20%;
   text-align: center;
   }

   #tbody_budget :where( td ) {
   border-right: #ebee 1px dashed;
   }

   #form_receipt_pdf notes {
   padding-top: 0.5em;
   }

   #form_receipt_pdf notes > badge {
   background: transparent !important;
   }
   #form_receipt_pdf notes > badge > tt {
   color: var( --badge, #19497b ) !important;
   }

   #form_receipt_pdf notes > textarea {
   width: 95%;
   max-height: 13ch;
   margin: 0 auto;
   font-size: .8em;
   border: #9999 1px solid;
   }

   #budget_end {
   padding-top: 0.5em;
   }
   #budget_end th {
   text-align: center;
   }

   signatures > row {
   padding: 1.5em ;
   gap: 2em;
   }

   signature sig-name {
   border-top: #16181c 2px solid;
   text-align: center;
   font-size: .8em;
   font-weight: bold;
   }

   #btn_createPDF {
   /*
   clip-path: circle();
   width: 45px;
   aspect-ratio: 1;
   position: fixed;
   bottom: 12%;
   right: 12%;
   box-shadow: #0005 3px 2px 5px;
   */
   }
         </style>
         <!-- <link rel="stylesheet" href="../src/styles/includes/theme.css"> -->
         <link rel="stylesheet" href="../src/fonts/fonts.css">
         <!-- == [ Scripts ] 
         == == == == == == == == == -->
         <script src="../src/scripts/clb.js" defer></script>
         <script src="../src/scripts/global.js" defer></script>
         <script src="../src/scripts/GetInvoiceFile.js" defer></script>
         <!-- == [ includes ]
         == == == == == == == == == -->
         <script src="../src/scripts/widgets/AppBar.js" defer></script>
         <script src="../src/scripts/widgets/Drawer.js" defer></script>
         <script src="../src/scripts/widgets/NavBar.js" defer></script>
         <!--script src="../src/scripts/widgets/AppFooter.js" defer></script-->
         <script src="../src/scripts/widgets/EA-Card.js" defer></script>
         <script src="../src/scripts/Widgets/NavLink.js" defer></script>
         <script src="../src/scripts/Widgets/Button.js" defer></script>
         <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>
         <style>
            form {
               gap: 0 !important;
            }
         </style>
      </head>
      <body>
         <home-page>
            <view id="invoice_html">
   <ea-card section="dual">
      <style>
      
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Poppins:wght@500;700;800;900&display=swap');
         
      [section="dual"] {
         display: flex;
         flex-direction: row;
      }
      [section="dual"] > * {
         flex: 1;
      }
      
      ea-card {
         background: var( --card-lv1 );
         background: var( --ea-card, #19497b );
         color: var( --appbar-title );
         font-size: 2.5vw;

         display: grid !important;
         grid-template-columns: .35fr .65fr;
         width: 100%;
         aspect-ratio: 3.8/1;
         padding: 1vw;
         inset: 0;
         color: #f5f5f5;
         filter: var( --appbar-filter-shadow );
      }
      ea-card * {
         font-family: "poppins" !important;
      }
      ea-card ea-logo {
         display: flex;
         height: 100%;
         aspect-ratio: 1;
      }
      ea-logo > content {
         align-items: center;
      }
      ea-card ea-logo img {
         width: 100%;
         aspect-ratio: 1;
         border-radius: 100vw;
         border: var( --card-lv3 ) solid .48em;
      }

      ea-card > description {
         display: flex;
         width: 100%;
         align-items: center;
         justify-content: center;
         text-align: center;
         font-size: 2.25vw;
      } 
      ea-card > description h1 {
         margin: 0;
         padding-bottom: 0.5em;
      }
      ea-card > description t {
         display: block;
      }
      </style>
      <ea-logo>
         <content>
            <img src="${ logo.cdn }" alt="ea-logo" />
         </content>
      </ea-logo>
      <description section >
         <h1>ELÉTRICA & ART</h1>
         <t5>
            CNPJ 32.858.892/0001-52 - IM 67358/0001
         </t5>
         <t>
            Rua José Alves Maciel, 40 - Aviação <br />
            Praia Grande - São Paulo - SP - Cep 11702-440
         </t>
         <t>
            <strong>Fone </strong> ( 13 ) 99768-5853 <br />
            <strong>Whatsapp </strong> ( 13 ) 99768-5853 <br />
            <strong>E-mail </strong> rafa.julia.forever@gmail.com <br />
         </t>
      </description>
   </ea-card>
               <form id="form_receipt_pdf">
                  <top-flag row>
                     <label id="label_">
                        <t>Orçamento</t>
                        <input type="number" name="" id="orcamento-number" value="" />
                     </label>
                     <label id="label_">
                        <t>Emissão</t>
                        <input type="number" name="" id="emissao" value="" />
                     </label>
                     <label id="label_">
                        <t>Validade</t>
                        <input type="number" name="" id="validade" value="" />
                     </label>
                  </top-flag>
                  <customer-info section>
                     <badge section>
                        <tt>Cliente</tt>
                     </badge>

                     <table id="customer">
                        <tbody>
                           <tr>
                              <th nome>nome</th>
                              <td nome>
                                 <input id="input_nome" type="text" />
                              </td>
                           </tr>
                           <tr>
                              <th >telefone </th>
                              <td ><input id="input_telefone" type="tel" /></td>
                              <th >email </th>
                              <td ><input id="input_email" type="email" /></td>
                           </tr>
                           <tr>
                              <th >cpf/cnpj </th>
                              <td><input id="input_cpf" type="text" /></td>
                              <th >rg/ie </th>
                              <td><input id="input_rg" type="text" /></td>
                           </tr>
                           <tr>
                              <th >endereço </th>
                              <td><input id="input_endereço" type="text" /></td>
                              <th >n° </th>
                              <td><input id="input_n" type="number" step="1" /></td>
                           </tr>
                           <tr>
                              <th >bairro </th>
                              <td><input id="input_bairro" type="text" /></td>
                              <th >cidade </th>
                              <td><input id="input_cidade" type="text" /></td>
                              <th id="th_uf">uf </th>
                              <td ><input id="input_uf" type="text" /></td>
                              <th >cep </th>
                              <td ><input id="input_cep" type="text" /></td>
                           </tr>
                        </tbody>
                     </table>

                  </customer-info>
                  <budget section>
                     <badge><tt>Orçamento</tt></badge>
                     <table id="table-budget">
                        <thead>
                           <tr>
                              <th id="qt">QT </th>
                              <th id="description">DESCRIÇÃO </th>
                              <th id="unit">UNIT</th>
                              <th id="tot">TOT</th>
                           </tr>
                        </thead>
                        <tbody id="tbody_budget">
                           <tr>
                              <td>
                                 <input id="input_qtd_01" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_01" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_01" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_01" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_02" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_02" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_02" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_02" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_03" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_03" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_03" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_03" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_04" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_04" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_04" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_04" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_05" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_05" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_05" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_05" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_06" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_06" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_06" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_06" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_07" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_07" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_07" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_07" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_08" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_08" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_08" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_08" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_09" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_09" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_09" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_09" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_10" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_10" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_10" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_10" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_11" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_11" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_11" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_11" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_12" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_12" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_12" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_12" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_13" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_13" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_13" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_13" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_14" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_14" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_14" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_14" type="number" step="0.01" />
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <input id="input_qtd_15" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_description_15" type="text" />
                              </td>
                              <td>
                                 <input id="input_unit_15" type="number" step="0.01" />
                              </td>
                              <td>
                                 <input id="input_tot_15" type="number" step="0.01" />
                              </td>
                           </tr>
                        </tbody>
                     </table>
                     <budget-end id="budget_end" row>
                        <table>
                           <tbody>
                              <tr>
                                 <th id="th_subtotal">Subtotal</th>
                                 <td id="td_subtotal">
                                    <input id="input_subtotal" type="number" step="0.01" />
                                 </td>
                                 <th id="th_desconto">Desconto</th>
                                 <td id="td_desconto">
                                    <input id="input_desconto" type="number" step="0.01" />
                                 </td>
                                 <th id="th_total">TOTAL</th>
                                 <td id="td_total">
                                    <input id="input_total" type="number" step="0.01" />
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </budget-end>
                  </budget>
                  
                  <notes section>
                     <badge section>
                        <tt>Observações</tt>
                     </badge>
                     <textarea id="input_notes" name="" rows="8"></textarea>
                  </notes>
               </form>
               <signatures section>
                  <row>
                     <signature section>
                        <content>
                           <sig-name>Rafael - Elétrica & ART</sig-name>
                        </content>
                     </signature>
                     <signature section>
                        <content>
                           <sig-name>Cliente</sig-name>
                        </content>
                     </signature>
                  </row>
               </signatures>
            </view>
         </home-page>
         <!--footer>
            <content>
               <label>
                  <input type="button" id="btn_createPDF" value="Baixar em pdf">
               </label>
            </content>
         </footer-->
         
         
         
         
         
         
         
         <navbar></navbar>
         
         <script>
            'use strict';
            /* [ properties ]
            =================================== */
            const 
               ea = {
                  logoURI: "https://raw.githubusercontent.com/Ceo-js/ea/2e6fdd74866a50968095c8c6942156d1e93e1c34/ea.jpg"
               }
            ;
            /* -------------------------------- */
            
            
            /* [ events ] 
            =================================== */
            window.addEventListener( "load", () => {

               Drawer();
               NavLink();

               btn_createPDF.addEventListener( "click", () => {
                  /* document.querySelector( "#invoice_html" ).style.padding = "40px";
                  setTimeout( () => { */ // put margin in invoice

                     const invoice = this.document.querySelector( "#invoice_html" );
                     console.log( $( "#invoice_html" ) );
                     console.log( window );
                     var data = {
                        margin: 0,
                        filename: "orçamento.pdf",
                        image: { type: "png", quality: 100 },
                        autoPaging: 'text',
                        x: 0,
                        y: 0,
                        html2canvas: { 
                           width: 792,
                           height: 1120,
                           windowWidth: 792,
                           windowHeight: 1120,
                           // dpi: 300,
                           dpi: 100,
                           letterRendering: true,
                           useCORS: true,
                           // allowTaint: true,
                           imageTimeout: 15000,
                           scale: 1
                        },
                        jsPDF: { 
                           // unit: "in", "pt", "mm", "cm", "m", "in" or "px".
                           unit: "pt", 
                           // format: "letter", a0 - a10, b0 - b10, c0 - c10, dl, letter, government-letter, 
                           // legal, junior-legal, ledger, tabloid, [595.28, 841.89]
                           format: "a4", 
                           orientation: "portrait",
                           precision: 1,
                        }
                     };
                     html2pdf().set( {
                        pagebreak: { mode: "avoid-all", before: "#break-page" }
                     } ); 
                     html2pdf().from( invoice ).set( data ).save();

                     /* setInterval( () => {    // put margin in invoice
                        document.querySelector( "#invoice_html" ).style.padding = "0";
                     }, 500 );
                  }, 500 ); */
               } );
            } );
         </script>
      </body>
   </html>
`;


