

import { useState } from "react";
import Button from "../ui/Button";

export default function LoginForm( { onSubmit } ) {
   const 
      [ email, setEmail ] = useState( "" )
      ,
      [ password, setPassword ] = useState( "" )
   ;

   return(
      <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(email, password);
    }}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit">Log In</Button>
    </form>
  );
}