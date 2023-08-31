

const 
   express = require( "express" ),
   app = express(),
   ceo = require( "./src/utils/ceo" );

app.use( "/", ( req, res, next ) => {
   const viewsData = { title: "oi" };
   res.send( viewsData );
} );

app.listen( 7879, console.log( "> server: http://localhost:7879" ) );

