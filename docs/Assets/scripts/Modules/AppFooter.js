

function AppFooter( props ) {
   return( $( "app-footer" ).outerHTML = `
      <app-footer>
         <style>
            app-footer description strong > duo {
               justify-content: center !important;
               gap: 1em;
               margin: .5em auto;
            }

            ic {
               display: block;
               width: 26px;
               height: 26px;
               aspect-ratio: 1;
               background-size: cover;
            }
            ic[whatsapp] { background-image: url( "../Assets/imgs/icons/whatsapp.png" ); }
            ic[phone] { background-image: url( "../Assets/imgs/icons/phone.png" ); }
         </style>
         <content>
            <header center>
               <h1 center>ELETRICA <ea-footer-e>&</ea-footer-e> ART</h1>
               <t5 center>CNPJ 32.858.892/0001-52 - IM 67358/0001</t5>
            </header>
            <description section center>
               <t>
                  Rua José Alves Maciel, 40 - Aviação <br />
                  Praia Grande - São Paulo - SP - Cep 11702-440
               </t>
               <strong>
                  <duo>
                     <ic phone 24></ic> 
                     ( 13 ) 99768-5853 
                  </duo> 
                  <duo>
                     <ic whatsapp 24></ic> 
                     ( 13 ) 99768-5853 
                  </duo>
                  eletrica.art.ltda@gmail.com <br />
               </strong>
            </description>

         </content>
      </app-footer>      
   `);
               /*</t>
               <strong>
                  Fone: ( 13 ) 99768-5853 <br />
                  Whatsapp: ( 13 ) 99768-5853 <br />
                  E-mail: eletrica.art.ltda@gmail.com <br />
               </strong>
            </description>

         </content>
      </app-footer>      
   `);*/
}

AppFooter();