

// https://jasonwatmore.com/post/2022/11/10/angular-fix-for-argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string

interface JSON {
   /**
    * Converts a JavaScript Object Notation (JSON) string into an object.
    * @param text A valid JSON string.
    * @param reviver A function that transforms the results. This function is called for each member of the object.
    * If a member contains nested objects, the nested objects are transformed before the parent object is.
    */
   parse( 
      text: string, 
      reviver?: ( 
         this: any, 
         key: string, 
         value: any 
      ) => any 
   ): any;

   // ...
}


interface Storage {
   // ...

   /** Returns the current value associated with the given key, or null if the given key does not exist. */
   getItem( key: string ): string | null;

   // ...
}