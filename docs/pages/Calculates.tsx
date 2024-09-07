


function calculateSheetrockMaterialsNeeded(length: number, width: number): number {
  
   const 
      // Calculate the area of the roof
      area = length * width
      ,
      // Calculate the number of sheetrock panels needed (assuming each panel is 4ft x 8ft)
      sheetrockPanelArea = 4 * 8
      ,
      numPanelsNeeded = Math.ceil(area / sheetrockPanelArea);
      ,
      // Calculate the amount of joint compound needed (assuming 1 gallon covers 100 sq ft)
      jointCompoundNeeded = Math.ceil(area / 100)
      ,
      // Calculate the amount of screws needed (assuming 1 screw per square foot)
      screwsNeeded = area
      ,
      // Calculate the amount of tape needed (assuming 1 roll covers 150 sq ft)
      tapeNeeded = Math.ceil(area / 150)
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

const 
   totalMaterialsNeeded = calculateSheetrockMaterialsNeeded(length, width)
;
console.log( `Total materials needed: ${totalMaterialsNeeded}` );


// This code calculates the materials needed to make a roof of sheetrock based on the length and width of the roof. It calculates the number of sheetrock panels, amount of joint compound, number of screws, and amount of tape needed. The total materials needed is then printed to the console.