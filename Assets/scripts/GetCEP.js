

let cepInputs = [
   cep, logradouro, complemento, bairro, 
   localidade, uf, ibge, gia, ddd, siafi
];

function clearCEP_inputs() {
   [ 
      rua, bairro, cidade, uf
   ].forEach( v => v.value = "" );
}

function CallBack( conteudo ) {
   if( !( "erro" in conteudo ) ) {
      rua.value = conteudo.logradouro;
      bairro.value = conteudo.bairro;
      cidade.value = conteudo.localidade;
      uf.value = conteudo.uf;
   } else {
      clearCEP_inputs();
      alert( "O CEP não foi encontrado." );
   }
}

function SearchForCEP( valor ) {

   //Nova variável "cep" somente com dígitos.
   var cep = valor.replace( /\D/g, "" );

   //Verifica se o campo cep possui um valor informado.
   if( cep != "" ) {
      //Expressão regular para validar o CEP.
      var validateCEP = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if( validateCEP.test( cep ) ) {
         [ //Preenche os campos com "..." enquanto consulta o webservice.
            rua, bairro, cidade, uf
         ].forEach( v => v.value = ".....");

         var scriptCB = document.createElement( "script" );
         //Sincroniza com o callback.
         scriptCB.src = `https://viacep.com.br/ws/${ cep }/json/?callback=CallBack`;
         //Insere o script no documento e carrega o conteúdo.
         document.body.append( scriptCB );
      } else { //cep é inválido.
         clearCEP_inputs();
         alert( "Formato de CEP inválido." );
      }
   } else { //cep sem valor, limpa os inputs dos campos.
      clearCEP_inputs();
   }
};