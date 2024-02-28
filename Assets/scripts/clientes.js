

"use strict";

addEventListener( "load", () => {
   createData();
} );

form.addEventListener( "submit", () => {
   event.preventDefault();

   validateForm();
} );



/* == [ templates ] 
== == == == == == == == == */
const 
   clientsTemplate = ( target, Data ) => {
      target.innerHTML = "";
      Data.forEach( data => { target.innerHTML += `
         <card>
            <h3>${ data.name }</h3>
            <p>
               <t><b>id: </b>${ data.id }</t>
               <t><b>Gênero: </b>${ data.gender }</t>
               <t><b>RG: </b>${ data.rg }</t>
               <t><b>CPF: </b>${ data.cpf }</t>
               <t><b>E-Mail </b>${ data.email }</t>
               <t><b>Celular: </b>${ data.phone }</t>
            </p>
            <p>
               <t><b>Endereço:</b> ${ data.address.street } ${ data.address.number }, ${ data.address.city }, ${ data.address.district }, ${ data.address.state } - ${ data.address.cep }</t>
            </p>
         </card>
      `;} );
   }
;

