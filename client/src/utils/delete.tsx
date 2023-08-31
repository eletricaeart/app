

import ceo from "../utils/ceo";
import React from "react";
import axios from "axios";


export default function Delete( props ) {
   function deleteReview() {
      axios.delete( `http://localhost:${ ceo.serverGate }/reviews/${ props.id }` ).then( res => {
         props.setReviews( props.reviews.filter( item => {
            return item.id !== props.id;
         } ) );
      } );
   }

   return (
      <button className="del-btn" onClick={ deleteReview }>
            Delete Review
      </button>
   );
}
