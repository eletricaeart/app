import { useEffect, useCallback, useRef } from "react"


/* == [ on mount ]
== == == == == == == == == */
useEffect( () => {
   console.log( "I have been mounted" );
}, [] );


 /* == [ on update ]
 == == == == == == == == == */
 const num = 5

useEffect( () => {
  console.log( "I will only run if my deps change: ", num );
}, [ num ] );


/* == [ after on mount ]
== == == == == == == == == */
useEffect( () => {
   const someFunc = () => {
     console.log( "Function being run after/on mount" );
   }
   someFunc();
}, [] );


 /* == [ use callback ]
 == == == == == == == == == */
 const msg = "some message"

const myFunc = useCallback( () => {
  console.log( msg );
}, [ msg ] );

useEffect( () => {
  myFunc();
}, [ myFunc ] );


/* == [ creative ]
== == == == == == == == == */
export default function useDidMountHook( callback ) {
   const didMount = useRef( null );
 
   useEffect( () => {
      if( callback && !didMount.current ) {
         didMount.current = true;
         callback();
      }
   } );
}

 