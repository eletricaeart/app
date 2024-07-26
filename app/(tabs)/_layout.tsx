

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation, } from 'react-native-paper';

import {
   AppBar,
   AppBarLeft,
   AppBarRight,
   BottomNavigationBar,
   PageFooter,
} from "@/assets/modules/clb-modules";

import {
   HeaderTitle,
} from "@/assets/modules/clb-ea";

import { Icon } from "@/assets/modules/clb-icons";
import Routes from "@/app/routes";
import Login from "./login";

const Tab = createBottomTabNavigator();

export default function MyComponent() {
  return (
    <Tab.Navigator
      // initialRouteName="Login"
      screenOptions={{
         headerShown: true,
         tabBarStyle: { backgroundColor: "#27f" },
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
         ,
         title: "Eletrica & Art"
         ,
         
         statusBarColor: "#00559C"
         // ,
         // headerBlurEffect: "light"
         // ,
         // headerShadowVisible: true
         // ,
         // headerShown: true
         ,
         headerSearchBarOptions: {
            barTintColor: "#fff0",
            tintColor: "#fff",
            headerIconColor: "#fff",
            hintTextColor: "#eee",
            textColor: "#eee",

         }
         // ,
         // navigationBarColor: "#16181c"
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
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
      )}
    >
      {/* <Tab.Screen 
         name="Login"
         component={ Login }

      /> */}
      <Tab.Screen
        name="Home"
        component={Routes.Home}
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => {
               return <Icon i="mi" name="electrical-services" color="#27f"/>;
            },
            unmountOnBlur: true,
            headerTitle: () => <HeaderTitle />, 
        }}
      />
      <Tab.Screen
        name="Customers"
        component={Routes.Customers}
        options={{
          tabBarLabel: 'Clientes',
          tabBarIcon: ({ color, size }) => {
            return <Icon i="f" name="people-group" color="#fff"/>;
          },
          unmountOnBlur: true,
        }} 
      />
      <Tab.Screen
        name="Receipts"
        component={Routes.Receipts}
        options={{
          tabBarLabel: 'Recibos',
          tabBarIcon: ({ color, size }) => {
            return <Icon i="mc" name="receipt" color="#fff"/>;
          },
        }}
      />
      <Tab.Screen
        name="Budgets"
        component={Routes.Budgets}
        options={{
          tabBarLabel: 'Orçamentos',
          tabBarIcon: ({ color, size }) => {
            return <Icon i="f" name="file-invoice-dollar" color="#fff"/>;
          },

        }}
      />
      <Tab.Screen
        name="Dev"
        component={Routes.Dev}
        options={{
          tabBarLabel: 'Dev',
          tabBarIcon: ({ color, size }) => {
            return <Icon i="mi" name="devices" color="#ffab00"/>;
          },
        }}
      />
      <Tab.Screen
        name="NewCustomer"
        component={Routes.NewCustomer}
        options={{
          tabBarLabel: 'Cadastrar Cliente',
          tabBarIcon: ({ color, size }) => {
            return <Icon i="mi" name="people" color="#ffab00"/>;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});