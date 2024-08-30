

import React, { useState, } from "react";


interface Iuser {
   displayName: string;
   uid: string;
}

const 
   [ User, setUser ] = useState<Iuser>( { displayName: "", uid: "" } )
;