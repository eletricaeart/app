

import { Stack } from "expo-router";


export default function Layout() {
   return( <>
      <Stack screenOptions={{ headerShown: false, }}>
         <Stack.Screen
            name="(tabs)"
            options={{
               headerShown: false,
            }}
         />
         {/* <Stack.Screen 
            name="/home"
            options={{
               headerShown: false,
            }}
         /> */}
         <Stack.Screen 
            name="getBudgetPdf"
            options={{
               headerShown: false,
               statusBarColor: "#19497b"
            }}
         />
      </Stack>
   </> );
}