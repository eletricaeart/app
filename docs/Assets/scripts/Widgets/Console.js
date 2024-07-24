

function Console( props ) {
   let 
      template = `
         <console section>
            <header>
            </header>
            <content gap>
               <h2>console</h2>
   
               <button btn="showUsers" id="btn_showUsers">
                  Show users
               </button>
               <button btn="showLocalStorageEA.Users" id="btn_showLS">
                  show localStorage ea.users
               </button>
               <button btn="eraseEA.Users" id="btn_eraseLS">
                  erase ea.users
               </button>
            </content>
         </console>
      `
      ,
      tag = document.createElement( "console" )
   ;
   
   tag.innerHTML = template;
   
   document.body.append( tag );
}

Console();