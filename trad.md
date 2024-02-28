

ids:
----------
budget
----------
i_budgetNumber
i_budgetEmission
i_budgetValidity

budget {
   id,
   number,
   emission,
   validity
}

----------
client
----------
i_clientName
i_clientGender
i_clientPhone
i_clientEmail
i_clientCPF
i_clientRG
rua
i_clientAddressNumber
bairro
cidade
uf
cep

390

client {
   id,
   name,
   gender,
   Phone,
   Email,
   CPF,
   RG,
   address: {
      Street,
      Number,
      District,
      City,
      State,
      CEP,
   }
}