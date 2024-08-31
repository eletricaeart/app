

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Modal } from 'react-native';
import { Tabs } from "expo-router";

import { CommonActions } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation,
   Button, Menu, Divider, PaperProvider,
} from 'react-native-paper';

import {
   AppBar,
   AppBarLeft,
   AppBarRight,
   PageFooter,
} from "@/src/widgets/clb-widgets";

import {
   HeaderTitle,
} from "@/src/widgets/clb-ea";

import { Icon } from "@/src/widgets/clb-icons";
import Routes from "@/app/routes";

// const Tab = createBottomTabNavigator();

export default function Layout() {
   const 
      [ ModalMenuVisibility, setModalMenuVisibility ] = useState( false )
      ,
      [ MenuLeftVisibility, setMenuLeftVisibility ] = useState( false )
   ;

  return (
    <Tabs
      // initialRouteName="Login" 
      screenOptions={{
         headerShown: true,
         tabBarStyle: { 
            backgroundColor: "#16181C",
            height: 78,

         }, 
         headerShadowVisible: true,
         
         headerBackground: () => ( <>
            <AppBar />
         </> )
         ,
         headerLeft: () => (
            <>
               <AppBarLeft />
            </>
         )
         ,
         headerRight: () => ( <>
            <AppBarRight />
         </> )
         ,
         headerTitle: ( () => <HeaderTitle /> )
         ,
         headerTitleAlign: "center"
         ,
         headerTintColor: "#e5e5e5"
         ,
         headerTitleStyle: {
            // fontFamily: "GodOfThunder",
            fontWeight: "bold",
            color: "#fff",
         }
         ,
         headerStyle: {
            backgroundColor: "#00559C",
         }
      }}
      
      /* tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
         navigationState={state}
         
         sceneAnimationType={ "opacity" }
         shifting={ true }
         labeled={ true }
         compact={ true }
         activeColor={ "#00559C" }
         inactiveColor={ "#fff" }
         keyboardHidesNavigationBar={ true }
         barStyle={ { backgroundColor: "#16181C", } }
         theme={{colors: {secondaryContainer: "#212329"}}}
         safeAreaInsets={insets}
         style={ { backgroundColor: "#16181c" } }
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )} */
    >
      {/* <Tabs.Screen 
         name="Login"
         component={ Login }

      /> */}
      <Tabs.Screen
        name="home"
      //   component={Routes.Home}
        options={{
            // tabBarLabel: 'Home',
            title: 'Home',
            tabBarIcon: ({ color, size }) => {
               return <Icon i="mi" name="electrical-services" color="#27f"/>;
            },
            unmountOnBlur: true,
            headerTitle: () => <HeaderTitle />, 
        }}
      />
      <Tabs.Screen
        name="customers"
      //   component={Routes.Customers}
        options={{
          title: 'Clientes',
          tabBarIcon: ({ color, size }) => {
            return <Icon i="f" name="people-group" color="#fff"/>;
          },
          headerRight: ({}) => {
            return( <>
               <Pressable 
               style={{ 
                  borderRadius: 100,
                  justifyContent: "center", 
                  overflow: "hidden",
                  marginLeft: 8,
                  aspectRatio: 1,
                  width: 45,
               }}
               android_ripple={{ color: "#fff", 
                  radius: 24,
                  foreground: true,
               }}
               onPress={ () => {
                  setMenuLeftVisibility( !MenuLeftVisibility );
               } }
               >
                  <View style={{ 
                     alignItems: "center",
                     justifyContent: "center",
                  }}>
                     <Icon i="mc" name="dots-vertical" color="#fff"/>
                  </View>
               </Pressable>

               {/* <Modal visible={ ModalMenuVisibility } 
                  onRequestClose={ () => { setModalMenuVisibility( false ) } }
                  animationType="slide"
                  presentationStyle="formSheet"
               >
                  <Text>Modal Menu</Text>
               </Modal> */}

               {  MenuLeftVisibility &&
                  <View style={{ flex: 1, position: "absolute", top: 50, left: -50,
                     width: 200, height: 350, backgroundColor: "#f5f5f5",
                     borderRadius: 24, elevation: 10,
                     padding: 16,
                     borderColor: "#7773", borderWidth: 1,
                  }}>
                     <View style={{}}></View>
                  </View>
               }
            </> );
          },
          unmountOnBlur: true,
        }} 
      />
      <Tabs.Screen
        name="receipts"
      //   component={Routes.ReceiptsView}
        options={{
          title: 'Recibos',
          tabBarIcon: ({ color, size }) => {
            return <Icon i="mc" name="receipt" color="#fff"/>;
          },
        }}
      />
      <Tabs.Screen
        name="budgets"
      //   component={Routes.Budgets}
        options={{
          title: 'Orçamentos',
          tabBarIcon: ({ color, size }) => {
            return <Icon i="f" name="file-invoice-dollar" color="#fff"/>;
          },

        }}
      />
      <Tabs.Screen
        name="dev"
      //   component={Routes.Dev}
        options={{
          title: 'Dev',
          tabBarIcon: ({ color, size }) => {
            return <Icon i="mi" name="devices" color="#ffab00"/>;
          },
        }}
      />
      <Tabs.Screen
        name="invoice"
      //   component={Routes.tabs.Invoice}
        options={{
          title: 'Dev',
          tabBarIcon: ({ color, size }) => {
            return <Icon i="mi" name="devices" color="#ffab00"/>;
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});