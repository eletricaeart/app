

import React from "react";


export default function Video( { video } ) {
   return( <video>
      <Thumbnail video={ video } />
      <a href={ video.url }>
         <h3>{ video.title }</h3>
         <p>{ video.description }</p>
      </a>
      <LikeButton video={ video } />
   </video> );
}

