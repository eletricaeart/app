import A from '../../../Dev/Js/Advanced/a';
 />


export interface User {
   id: string;
   name: string;
   email: string;
   role: "admin" | "user";
}


function updateUser( id: number, update: Partial<User> ) {
   const 
      user = getUser( id ),
      newUser = { ...user, ...update }
   ;
   saveUser( id, newUser );
}
 


import * as React from "react";
 
interface UserThumbnailProps {
  img: string;
  alt: string;
  url: string;
}
 
export const UserThumbnail = ( props: UserThumbnailProps ) =>
   <a href={ props.url }>
      <img src={ props.img } alt={ props.alt }/>
   </a>
;


interface Account {
   id: number;
   displayName: string;
}
 
function welcome( user: Account ) {
   console.log( user.id );
}