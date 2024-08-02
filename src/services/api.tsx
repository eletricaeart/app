

import axios from "axios";


export const 
   api_GetCEP = axios.create( {
      baseURL: "https://viacep.com.br/ws",
   } )
;


// export default api_GetCEP;