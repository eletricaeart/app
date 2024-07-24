

const 
   cepInputs = [
      input_rua,
      input_bairro,
      input_cidade,
      input_uf,
   ]
;

function ClearCEPInputs() {
   //Limpa valores do formulário de cep.
   cepInputs.forEach( ci => {
      ci.value = "";
   } );
}

function Callback( conteudo ) {
   if( !( "erro" in conteudo ) ) {
      //Atualiza os campos com os valores.
      input_rua.value = conteudo.logradouro;
      input_bairro.value = conteudo.bairro;
      input_cidade.value = conteudo.localidade;
      input_uf.value = conteudo.uf;
      //input_ibge.value = conteudo.ibge;
   } else {
      //O CEP não foi Encontrado.
      ClearCEPInputs();
      alert( "O CEP não foi encontrado." );
   }
}

function SearchForCEP( valor ) {

   //Nova variável "cep" somente com dígitos.
   var cep = valor.replace( /\D/g, "" );

   //Verifica se campo cep possui valor informado.
   if( cep != "" ) {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if( validacep.test( cep ) ) {

         //Preenche os campos com "..." enquanto consulta webservice.
         input_rua.value = "...";
         input_bairro.value = "...";
         input_cidade.value = "...";
         input_uf.value = "...";
         // document.getElementById( "ibge" ).value = "...";

         //Cria um elemento javascript.
         var script = document.createElement( "script" );

         //Sincroniza com o callback.
         script.src = "https://viacep.com.br/ws/" + cep + "/json/?callback=Callback";

         //Insere script no documento e carrega o conteúdo.
         document.body.append( script );

      } else {
         //cep é inválido.
         ClearCEPInputs();
         alert( "Formato de CEP inválido." );
      }
   } else {
      //cep sem valor, limpa formulário.
      ClearCEPInputs();
   }
}

/*window.addEventListener( "load", () => {
   input_cep.onblur = () => {
      SearchForCEP( this.value );
   }
} );*/
_( "== == == == == == == == ==\nGetCEP.js loaded\n\n" );