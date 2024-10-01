

import { Btn } from "@/src/widgets/ui/animated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerView from "@/src/widgets/ui/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Text, View } from "react-native";

export default function DrawerLayout() {
   return(
      // <GestureHandlerRootView>
         <Drawer
            drawerContent={ () => ( 
               <DrawerView /> 
            ) }
            screenOptions={{
               headerShown: false,
               // headerStyle: { height: 0, },
               header: () => <View style={{ backgroundColor:"#00559c", height: 60, }}></View>,
               sceneContainerStyle: {backgroundColor: "#006400", }     

            }}
         >
            <Drawer.Screen 
               name="(tabs)"
               options={{
                  headerShown: false,
                  headerTitle:"DrawerTabs",
                  drawerLabel:"Tabs",
                  
               }}
            />
      </Drawer> 
   );
   {/* </GestureHandlerRootView> */}
}