

// https://www.trevodrywall.com.br/calculadoras
// https://www.artesana.com.br/forro-de-gesso-calcular-art?gad_source=1&gclid=CjwKCAjwufq2BhAmEiwAnZqw8vKI2p49FW-Jexp9Z1I7p9iUTEwS_ecsYfcBezA5DSEyIt2GT75EpRoCxygQAvD_BwE


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
// const 
//    totalMaterialsNeeded = calculateSheetrockMaterialsNeeded( length, width )
// ;
// console.log( `Total materials needed: ${totalMaterialsNeeded}` );


// This code calculates the materials needed to make a roof of sheetrock based on the length and width of the roof. It calculates the number of sheetrock panels, amount of joint compound, number of screws, and amount of tape needed. The total materials needed is then printed to the console.


/**
 * forro
 * 
 * https://www.youtube.com/watch?v=SLB0TG4DAG8&t=436s
 * comprimento: 3,10m
 * largura: 2,75m
 * area: 
 * linear: 11,70m
 * 
 * cantoneiras: 4 barras
 * tabicas: 4 barras
 * 
 * // com canaleta
 * // ( ( ( largura - 1,20 ) / 1,20 ): arredondado pra baixo + 2 ) * cantoneiras
 * // -- 
 * // com tabica
 * // ( ( ( largura - ,60 ) / 1,20 ): arredondado pra baixo + 2 ) * tabicas
 * tirante: 15 un: com-canaleta / 18 un: com-tabicas
 * 
 * // igual o tirante
 * regulador: 15un / 18un
 * 
 * canaleta: 5 barras / 6 barras
 * chapa: 5 chapas
 * gn25: 2 centos
 *  1 cento
 *  1 saco 5 kg
 *  1 rolo
 *  não  
 * 
 */
export async function CalculateDryWallRoof(
   length: number, width: number, rebaixo?: number
) {
   try {
      const 
         panelArea = 1.8 * 1.2
         ,
         roofArea = ( length * width ) * 1.05
         ,
         roofPerimetro = ( length * 2 ) + ( width * 2 )
         ,
         panelsNeeded = Math.ceil( ( ( length * width ) / panelArea ) * 1.05 )
         ,
         cantoneirasNeeded = Math.ceil( roofPerimetro / 3 )
         ,
         tabicasNeeded = Math.ceil( roofPerimetro / 3 )
         ,
         perfis_cantoneirasNeeded = Math.ceil( width / .60 )
         ,
         perfis_tabicasNeeded = Math.ceil( width / .60 ) + 1 
         ,
         // reguladoresForCantoneirasNeeded = Math.floor( ( ( Math.floor( width - 1.20 ) / 1.20 ) + 2 ) * cantoneirasNeeded )
         reguladoresForCantoneirasNeeded = Math.ceil( ( ( width - .60 ) / 1.20 ) + 1 ) * perfis_cantoneirasNeeded
         ,
         // reguladoresForTabicasNeeded = Math.floor( ( ( Math.floor( width - .60 ) / 1.20 ) + 2 ) * tabicasNeeded )
         reguladoresForTabicasNeeded = Math.round( ( ( width - .30 ) / 1.20 ) + 1 ) * perfis_tabicasNeeded
         ,



         tirantesNeeded = {
            qtd: { cantoneiras: reguladoresForCantoneirasNeeded, tabicas: reguladoresForTabicasNeeded },
            metros: {
               cantoneiras: rebaixo ? (
                  ( ( reguladoresForCantoneirasNeeded * rebaixo ) / 14 ) * cantoneirasNeeded
               ) : (
                  ( ( reguladoresForCantoneirasNeeded * 1 ) / 14 ) * cantoneirasNeeded
               ),
               tabicas: rebaixo ? (
                  ( ( reguladoresForTabicasNeeded * rebaixo ) / 14 ) * tabicasNeeded
               ) : (
                  ( ( reguladoresForTabicasNeeded * 1 ) / 14 ) * tabicasNeeded
               ),
            }
         }
         ,
         // massaNeeded = Math.ceil( roofArea / 10 ) * 5
         massaNeeded = Math.ceil( .5 * roofArea )
         ,
         // tapeNeeded = Math.ceil( roofArea / 150 )
         tapeNeeded = Math.ceil( 1.5 * roofArea )
         ,


         gn25Needed = panelsNeeded * 30
         ,
         welifixNeeded = {
            cantoneiras: reguladoresForCantoneirasNeeded,
            tabicas: reguladoresForTabicasNeeded,
         }
         ,
         screwMMNeeded = {
            cantoneiras: perfis_cantoneirasNeeded * 4,
            tabicas: perfis_tabicasNeeded * 4,
         }
         ,
         pregosNeeded = tabicasNeeded * 8
         ,
         uniãoNeeded = {
            cantoneiras: Math.floor( width / 3 ) * perfis_cantoneirasNeeded,
            tabicas: Math.floor( width / 3 ) * perfis_tabicasNeeded,
         }
         ,
         bandaAcústicaNeeded = 0.9 * roofArea
         ,
         lãDeVidroNeeded = 1 * roofArea
      ;

      const 
         calc = {
            area: ( length: number, width: number ): number => {
               // const value = Math.ceil( length * width );
               const value = length * width;
               console.log( "area : \n\n\n", value );
               return value;
            }
            ,
            perimetro: ( length: number, width: number ): number => {
               const value = ( length * 2 ) + ( width * 2 );
               console.log( "perimetro : \n\n\n", value );
               return value;
            }
            ,
            cantoneiras_ou_tabicas: ( length: number, width: number ): number => {
               const value = Math.ceil( calc.perimetro( length, width ) / 3 );
               console.log( "cantoneiras_ou_tabicas : \n\n\n", value );
               return value;
            }
            ,
            perfisF530: {
               paraCantoneiras: ( width: number ): number => {
                  const 
                     value = (
                        Math.ceil( width / .60 ) 
                     )
                  ;
                  console.log( "perfis paraCantoneiras : \n\n\n", value );
                  return value;
               },
               paraTabicas: ( width: number ): number => {
                  const 
                     value = (
                        Math.ceil( width / .60 ) + 1 
                     )
                  ;
                  console.log( "perfis paraTabicas : \n\n\n", value );
                  return value;
               },
            }
            ,
            tirantes: {
               paraCantoneiras: ( width: number ): number => {
                  const 
                     value = (
                        Math.ceil( ( ( width - .60 ) / 1.20 ) + 1 ) * ( calc.perfisF530.paraCantoneiras( width ) )
                     )
                  ;
                  console.log( "tirantes paraCantoneiras : \n\n\n", value );
                  return value;
               },
               paraTabicas: ( width: number ): number => {
                  const 
                     value = (
                        Math.round( ( ( width - .30 ) / 1.20 ) + 1 ) * ( calc.perfisF530.paraTabicas( width ) )
                     )
                  ;
                  console.log( "tirantes paraTabicas : \n\n\n", value );
                  return value;
               },
            }
            ,
            massa: ( length: number, width: number ): number => {
               const value = (
                  Math.ceil( .5 * calc.area( length, width ) )
               );
               console.log( "massa : \n\n\n", value );
               return value;
            }
            ,
            fita: ( length: number, width: number ): number => {
               const value = (
                  Math.ceil( 1.5 * calc.area( length, width ) )
               );
               console.log( "fita : \n\n\n", value );
               return value;
            }
            ,
         }
      ;
      
      calc.area( length, width );
      calc.cantoneiras_ou_tabicas( length, width );
      calc.fita( length, width );
      calc.massa( length, width );
      calc.perfisF530.paraCantoneiras( width );
      calc.perfisF530.paraTabicas( width );
      calc.perimetro( length, width );
      calc.tirantes.paraCantoneiras( width );
      calc.tirantes.paraTabicas( width );

      return {
         roofArea,
         roofPerimetro,
         panelsNeeded,
         tabicasNeeded,
         cantoneirasNeeded,
         perfis_cantoneirasNeeded,
         perfis_tabicasNeeded,
         tirantesNeeded,
         reguladoresForCantoneirasNeeded,
         reguladoresForTabicasNeeded,
         welifixNeeded,
         gn25Needed,
         screwMMNeeded,
         pregosNeeded,
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
         // wallArea = ( width * height ).toFixed( 2 )
         wallArea = ( width * height ) * 1.05
         ,
         // 
         wallPerimetro = ( width * 2 ) + ( height * 2 )
         ,
         // área de parede / área da chapa + 5% de desperdício do material = número de chapas
         panelsNeeded = Math.ceil( ( wallArea / panelArea * 1.05 ) ) * 2
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
         gn25Needed = Math.ceil( wallArea * 25 )
         ,
         welifixNeeded = Math.ceil( wallPerimetro / .6 )
         ,
         screwMMNeeded = montantesNeeded * 6
         ,
         // 0,5 * wallArea
         // massaNeeded = Math.ceil( roofArea / 10 ) * 5
         massaNeeded = Math.ceil( 0.5 * ( wallArea * 2 ) )
         ,
         // 1,4 kg * wallArea
         // tapeNeeded = Math.ceil( roofArea / 150 )
         // tapeNeeded = Math.ceil( 1.4 * panelsAreaNeeded )
         tapeNeeded = Math.ceil( 3 * wallArea )
         ,
         // 0,9 * wallArea
         bandaAcústicaNeeded = wallPerimetro
         ,
         // 1 * wallArea
         lãDeVidroNeeded = 1 * wallArea
      ;
      
      return {
         wallArea,
         wallPerimetro,
         panelsNeeded,
         guiasNeeded,
         montantesNeededFor,
         montantesNeeded,
         gn25Needed,
         welifixNeeded,
         screwMMNeeded,
         massaNeeded,
         tapeNeeded,
         bandaAcústicaNeeded,
         lãDeVidroNeeded,
      }
   } catch( err: any ) { console.error( "CalculateDrywall() err: ", err ); }
}



export async function CalculateDryWallRoof_bkp(
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
         panelsNeeded = Math.ceil( ( ( length * width ) / panelArea ) * 1.05 )
         ,
         // perimetro / 3 : arredondado pra cima
         cantoneirasNeeded = Math.ceil( roofPerimetro / 3 )
         ,
         // perimetro / 3 : arredondado pra cima
         tabicasNeeded = Math.ceil( ( roofPerimetro / 3 ) )
         ,
         // ( ( comprimento / ,60 : arredondado pra baixo ) * ( largura / 3 ) ) : arredondado pra cima
         // perfisNeeded = Math.floor( width / .6 )
         // perfis for cantoneiras
         perfis_cantoneirasNeeded = Math.floor( width / .6 ),
         // perfis for tabicas 
         perfis_tabicasNeeded = Math.floor( ( width / .6 ) + 2 )
         ,
         
         // ( ( ( largura - 1,20 ) / 1,20 ): arredondado pra baixo + 2 ) * cantoneiras
         reguladoresForCantoneirasNeeded = Math.floor( ( ( Math.floor( width - 1.20 ) / 1.20 ) + 2 ) * cantoneirasNeeded )
         ,
         // ( ( ( largura - ,60 ) / 1,20 ): arredondado pra baixo + 2 ) * tabicas
         reguladoresForTabicasNeeded = Math.floor( ( ( Math.floor( width - .60 ) / 1.20 ) + 2 ) * tabicasNeeded )
         ,
         // 1 kg de arame 10: 14 metros
         // ( ( ( largura - 1,20 ) / 1,20 ): arredondado pra baixo + 2 ) * cantoneiras
         tirantesNeeded = {
            qtd: { cantoneiras: reguladoresForCantoneirasNeeded, tabicas: reguladoresForTabicasNeeded },
            metros: {
               cantoneiras: rebaixo ? (
                  // Math.ceil( ( ( reguladoresForCantoneirasNeeded * rebaixo ) / 14 ) )
                  ( ( reguladoresForCantoneirasNeeded * rebaixo ) / 14 ) * cantoneirasNeeded
               ) : (
                  // Math.ceil( ( ( reguladoresForCantoneirasNeeded * 1 ) / 14 ) )
                  ( ( reguladoresForCantoneirasNeeded * 1 ) / 14 ) * cantoneirasNeeded
               ),
               tabicas: rebaixo ? (
                  // Math.ceil( ( ( reguladoresForTabicasNeeded * rebaixo ) / 14 ) )
                  ( ( reguladoresForTabicasNeeded * rebaixo ) / 14 ) * tabicasNeeded
               ) : (
                  // Math.ceil( ( ( reguladoresForTabicasNeeded * 1 ) / 14 ) )
                  ( ( reguladoresForTabicasNeeded * 1 ) / 14 ) * tabicasNeeded
               ),
            }
         }
         ,
         gn25Needed = panelsNeeded * 30
         ,
         welifixNeeded = {
            // cantoneiras: ( tabicasNeeded / .5 ) * 2,
            // tabicas: ( tabicasNeeded / .5 ) * 2,
            cantoneiras: reguladoresForCantoneirasNeeded,
            tabicas: reguladoresForTabicasNeeded,
         }
         ,
         screwMMNeeded = {
            cantoneiras: perfis_cantoneirasNeeded * 4,
            tabicas: perfis_tabicasNeeded * 4,
         }
         ,
         pregosNeeded = tabicasNeeded * 8
         ,
         massaNeeded = Math.ceil( roofArea / 10 ) * 5
         ,
         uniãoNeeded = {
            cantoneiras: ( width / 3 ) * perfis_cantoneirasNeeded,
            tabicas: ( width / 3 ) * perfis_tabicasNeeded,
         }
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
         perfis_cantoneirasNeeded,
         perfis_tabicasNeeded,
         tirantesNeeded,
         reguladoresForCantoneirasNeeded,
         reguladoresForTabicasNeeded,
         welifixNeeded,
         gn25Needed,
         screwMMNeeded,
         pregosNeeded,
         uniãoNeeded,
         tapeNeeded,
         massaNeeded,
         bandaAcústicaNeeded,
         lãDeVidroNeeded,
      }
   } catch( err: any ) { console.error( "CalculateDrywallRoof() err: ", err ); }
}



export async function CalculateDryWall_bkp(
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
         welifixNeeded = ( guiasNeeded / .5 )
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
         welifixNeeded,
         screwMMNeeded,
         massaNeeded,
         tapeNeeded,
         bandaAcústicaNeeded,
         lãDeVidroNeeded,
      }
   } catch( err: any ) { console.error( "CalculateDrywall() err: ", err ); }
}


/* 
suite: 3.7 * 3:: 11.1 {
   chapas: 6
   canaleta: 7
   tabica: 5
   regulador: 14
   união: 5
   tirante: 14
   gn25: 200
   ta13: 100
}
sala: 3 * 3::  {
   chapas: 5
   canaleta: 6
   tabica: 4
   regulador: 12
   união: 5
   tirante: 12
   gn25: 200
   ta13: 100
}
area: 3.5 * 2 {
   chapas: 4
   canaleta: 4
   tabica: 3
   regulador: 9
   união: 4
   tirante: 9
   gn25: 100
   ta13: 100
}
cozinha:  {
   chapas: 
   canaleta: 
   tabica: 
   regulador: 
   união: 
   tirante: 
   gn25: 
   ta13: 
}
corredor: 2 *  {
   chapas: 
   canaleta: 
   tabica: 
   regulador: 
   união: 
   tirante: 
   gn25: 
   ta13: 
}
quarto 1: 
quarto 2: 
parte: [
	3 * 1.5, {
      chapas: 3
      canaleta: 3
      tabica: 2
      regulador: 6
      união: 3
      tirante: 6
      gn25: 100
      ta13: 100
   }
   2.5 *  {
      chapas: 
      canaleta: 
      tabica: 
      regulador: 
      união: 
      tirante: 
      gn25: 
      ta13: 
   }
]
*/