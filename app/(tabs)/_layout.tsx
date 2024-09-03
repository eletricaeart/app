

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

// const Tab = createBottomTabNavigator();

export default function Layout() {
   const 
      [ ModalMenuVisibility, setModalMenuVisibility ] = useState( false )
      ,
      [ MenuLeftVisibility, setMenuLeftVisibility ] = useState( false )
   ;

  return (
    <Tabs
      initialRouteName="home"  
      screenOptions={{
         headerShown: true,
         tabBarStyle: { 
            backgroundColor: "#16181C",
            height: 78,
            padding: 6,
            alignItems: "center",

         }, 
         tabBarItemStyle: {
            gap: 6,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16,
            // backgroundColor: "#fc0",
            marginLeft: 16,
            marginRight: 16,
         },
         tabBarLabelStyle: {
            // backgroundColor: "#27f",
            fontSize: 13,
         },
         tabBarIconStyle: {
            backgroundColor: "#212329",
            width: 56,
            borderRadius: 100,
            // padding: 4,
         },
         // tabBarButton: ,
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
    >
      <Tabs.Screen
         name="home"
         options={{
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
         name="budgets"
         options={{
            title: 'Orçamentos',
            tabBarIcon: ({ color, size }) => {
               return <Icon i="f" name="file-invoice-dollar" color="#fff"/>;
            },

         }}
      />
      <Tabs.Screen
         name="dev"
         options={{
            title: 'Dev',
            tabBarIcon: ({ color, size }) => {
               return <Icon i="mi" name="devices" color="#ffab00"/>;
            },
         }}
      />
      <Tabs.Screen
         name="invoice"
         options={{
            title: 'Invoice',
            tabBarIcon: ({ color, size }) => {
               return <Icon i="mi" name="devices" color="#ffab00"/>;
            },
         }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create( {
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
} );