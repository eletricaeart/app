




export function calculateSheetrockMaterialsNeeded(
   length: number, width: number ): number {
  
   const 
      // Calculate the area of the roof
      area = length * width
      ,
      // Calculate the number of sheetrock panels needed (assuming each panel is 4ft x 8ft)
      sheetrockPanelArea = 1.8 * 1.2
      ,
      numPanelsNeeded = Math.ceil( area / sheetrockPanelArea )
      ,
      // Calculate the amount of joint compound needed (assuming 1 gallon covers 100 sq ft)
      jointCompoundNeeded = Math.ceil( area / 100 )
      ,
      // Calculate the amount of screws needed (assuming 1 screw per square foot)
      screwsNeeded = area
      ,
      // Calculate the amount of tape needed (assuming 1 roll covers 150 sq ft)
      tapeNeeded = Math.ceil( area / 150 )
   ;

   console.log(
      `Materials needed to make a roof of sheetrock:`,
      `Number of sheetrock panels needed: ${numPanelsNeeded}`,
      `Amount of joint compound needed (in gallons): ${jointCompoundNeeded}`,
      `Number of screws needed: ${screwsNeeded}`,
      `Amount of tape needed (in rolls): ${tapeNeeded}`
   );

   return numPanelsNeeded + jointCompoundNeeded + screwsNeeded + tapeNeeded;
}

let 
   length = 10 // in feet
   ,
   width = 20 // in feet
;

// const 
//    totalMaterialsNeeded = calculateSheetrockMaterialsNeeded( length, width )
// ;
// console.log( `Total materials needed: ${totalMaterialsNeeded}` );


// This code calculates the materials needed to make a roof of sheetrock based on the length and width of the roof. It calculates the number of sheetrock panels, amount of joint compound, number of screws, and amount of tape needed. The total materials needed is then printed to the console.


/**
 * forro
 */
export async function CalculateDryWallRoof(
   length: number, width: number, rebaixo?: number
) {
   try {
      const 
         panelArea = 1.8 * 1.2
         ,
         roofArea = length * width
         ,
         roofPerimetro = ( length * 2 ) + ( width * 2 )
         ,
         panelsNeeded = Math.ceil( ( ( length * width ) / panelArea * 1.05 ) )
         ,
         tabicasNeeded = Math.ceil( roofPerimetro / 3 )
         ,
         cantoneirasNeeded = Math.ceil( roofPerimetro / 3 )
         ,
         perfisNeeded = Math.floor( width / .6 )
         ,
         reguladoresNeeded = perfisNeeded * 3
         ,
         lfixNeeded = reguladoresNeeded
         ,

         // 1 kg de arame 10: 14 metros
         tirantesNeeded = rebaixo ? (
            Math.ceil( ( reguladoresNeeded * rebaixo ) / 14 )
         ) : (
            Math.ceil( ( reguladoresNeeded ) / 14 )
         )
         ,
         gn25Needed = panelsNeeded * 30
         ,
         lfixForTabicasNeeded = ( tabicasNeeded / .5 ) * 2
         ,
         screwMMNeeded = perfisNeeded * 4
         ,
         pregosNeeded = tabicasNeeded * 8
         ,
         massaNeeded = Math.ceil( roofArea / 10 ) * 5
         ,
         uniõesNeeded = ( width / 3 ) * perfisNeeded
         ,
         uniãoNeeded = ( width / 3 ) * perfisNeeded
         ,
         tapeNeeded = Math.ceil( roofArea / 150 )
         ,
         // 0,9 * roofArea
         bandaAcústicaNeeded = 0.9 * roofArea
         ,
         // 1 * roofArea
         lãDeVidroNeeded = 1 * roofArea
      ;
      
      return {
         roofArea,
         roofPerimetro,
         panelsNeeded,
         tabicasNeeded,
         cantoneirasNeeded,
         perfisNeeded,
         reguladoresNeeded,
         lfixNeeded,
         tirantesNeeded,
         gn25Needed,
         lfixForTabicasNeeded,
         screwMMNeeded,
         pregosNeeded,
         uniõesNeeded,
         uniãoNeeded,
         tapeNeeded,
         massaNeeded,
         bandaAcústicaNeeded,
         lãDeVidroNeeded,
      }
   } catch( err: any ) { console.error( "CalculateDrywallRoof() err: ", err ); }
}


/**
 * divisoriA
 */
export async function CalculateDryWall(
   width: number, height: number
) {
   try {
      const 
         // comprimento x altura = área da placa
         panelArea = 1.8 * 1.2
         ,
         // comprimento x altura = área da parede
         wallArea = ( width * height ).toFixed( 2 )
         ,
         // 
         // wallPerimetro = ( width * 2 ) + ( height * 2 )
         wallPerimetro = width
         ,
         // área de parede / área da chapa + 5% de desperdício do material = número de chapas
         panelsNeeded = Math.ceil( ( wallArea / panelArea * 1.05 ) ) * 2
         ,
         panelsAreaNeeded = panelsNeeded * panelArea
         ,
         // comprimento x altura da parede = tamanho da parede / tamanho da guia = número de peças
         guiasNeeded = Math.ceil( ( width * 2 ) / 3 )
         ,
         // comprimento da parede / distância entre montantes + montantes das extremidades = número de montantes
         montantesNeededFor = Math.ceil( ( width / .4 ) + 2 ),
         montantesNeeded = Math.ceil( ( width / .6 ) + 2 )
         ,
         // 15 * wallArea ou wallArea * 2 * panelArea * 15
         // gn25Needed = ( panelsNeeded * panelArea ) * 15
         gn25Needed = Math.ceil( panelsAreaNeeded * 15 )
         ,
         lfixNeeded = ( guiasNeeded / .5 )
         ,
         screwMMNeeded = montantesNeeded * 4
         ,
         // 0,5 * wallArea
         // massaNeeded = Math.ceil( roofArea / 10 ) * 5
         massaNeeded = Math.ceil( 0.5 * panelsAreaNeeded )
         ,
         // 1,4 kg * wallArea
         // tapeNeeded = Math.ceil( roofArea / 150 )
         tapeNeeded = Math.ceil( 1.4 * panelsAreaNeeded )
         ,
         // 0,9 * wallArea
         bandaAcústicaNeeded = 0.9 * wallArea
         ,
         // 1 * wallArea
         lãDeVidroNeeded = 1 * wallArea
      ;
      
      return {
         wallArea,
         wallPerimetro,
         panelsNeeded,
         panelsAreaNeeded,
         guiasNeeded,
         montantesNeededFor,
         montantesNeeded,
         gn25Needed,
         lfixNeeded,
         screwMMNeeded,
         massaNeeded,
         tapeNeeded,
         bandaAcústicaNeeded,
         lãDeVidroNeeded,
      }
   } catch( err: any ) { console.error( "CalculateDrywall() err: ", err ); }
}