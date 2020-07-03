import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

import Home from './pages/home'
import Points from './pages/points'
import Details from './pages/details'

const routes = () => {
    return (
        <NavigationContainer>
           <Stack.Navigator initialRouteName = "Home" headerMode = "none" screenOptions = {{
               cardStyle: {
                   backgroundColor: "#f0f0f5"
               }
           }}>
               <Stack.Screen name = "Home" component = {Home} />
               <Stack.Screen name = "Points" component = {Points}/>
               <Stack.Screen name = "Details" component = {Details}/>
            </Stack.Navigator>    
        </NavigationContainer>
    )
}

export default routes
