import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Cart from '../screen/cart'
import Login from '../screen/login'
import Table from '../screen/table'
import Menu from '../screen/menu'
import { DrawerContent } from './drawer'
import itemDetail from '../screen/itemDetail'
import dealDetail from '../screen/dealDetail'
import Order from '../screen/order'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function MenuFun() {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Menu" component={Menu} />
            <Drawer.Screen name="Setting" component={Login} />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (

        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="Menu"
                    component={MenuFun}
                />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Order" component={Order} />
                <Stack.Screen name="Table" component={Table} />
                <Stack.Screen name="itemDetail" component={itemDetail} />
                <Stack.Screen name="dealDetail" component={dealDetail} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
});
