

import React from "react";


/* ==[ stateless functional ]=============== */
export function ElfLess( props ) {
        
}
/* ---------------------------------------- */


/* ==[ stateless component ]=============== */
export class ElcLess extends React.Component {
   constructor( props ) {
      super( props );
   }

   render() {
      return( <>
         <t1>oi</t1>
         <p>{ this.props.name }</p>
      </> );
   }
}

ElcLess.defaultProps = {
   lastName: "Sammarco",
};
ElcLess.propTypes = {
   lastName: PropTypes.string.isRequired,
};
/* ---------------------------------------- */


/* ==[ statefull component ]=============== */
export class ElcFull extends React.Component {
   constructor( props ) {
      super( props );
      this.state = {
         firstName: "Anselmo", surname: "Sammarco",
      };
      this.handleClick = this.handleClick.bind( this );
   }

   handleClick() {
      this.setState( { name: "React Rocks!" } );
   }

   render() {
      const surname = this.state.surname;
      return( <>
         <t1>oi</t1>
         <p>{ this.state.firstName } { surname }</p>
         <button onClick={ this.handleClick }>Click Me</button>
      </> );
   }
}
/* ---------------------------------------- */
