

import React from "react";
import "./about.css";


export default class About extends React.Component {
   constructor( props ) {
      super( props );
   }
    
   render() { document.title = "About"; return( <>
      <galerry>
         <t1>About</t1>
         <hr />
         <label>
            <input type="text" placeholder="preço" />
         </label>
         <label>
            <input type="text" placeholder="preço antigo" />
         </label>
         <label>
            <input type="text" placeholder="desconto" />
         </label>
      </galerry>
   </> ); }
}


// export default About;
