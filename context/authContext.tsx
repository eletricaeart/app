

import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
   const 
      [ User, setUser ] = useState( null )
      ,
      [ IsAuthenticated, setIsAuthenticated ] = useState( undefined )
   ;
   
   useEffect( () => {
      // onAuthStateChanged

      setTimeout(() => {
         setIsAuthenticated( true );
      }, 3000);
   }, [] );

   const 
      Login = async ( email, password ) => {
         try {

         } catch( err: any ) {
            console.log( "login() err: \n\n\n", err );
         }
      }
      ,
      Logout = async () => {
         try {

         } catch( err: any ) {
            console.log( "Logout() err: \n\n\n", err );
         }
      }
      ,
      Register = async ( email, password, name, profileURL ) => {
         try {

         } catch( err: any ) {
            console.log( "Register() err: \n\n\n", err );
         }
      }
   ;



   return( <>
      <AuthContext.Provider value={{ User, IsAuthenticated, Login, Logout, Register }}>
         { children }
      </AuthContext.Provider>
   </> );
};


export const UseAuth = () => {
   const 
      value = useContext( AuthContext )
   ;

   if( !value ) {
      throw new Error( "UseAuth must be wrapped inside a AuthContextProvider" );
   }
   
   return value;
}