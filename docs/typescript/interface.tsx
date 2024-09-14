

import React, { useState, } from "react";


export interface $_user {
   displayName: string;
   uid: string;
}

const 
   [ User, setUser ] = useState<$_user>( { displayName: "", uid: "" } )
   ,
   [ Customers, setCustomers ] = useState<any[]>( [] )
;

