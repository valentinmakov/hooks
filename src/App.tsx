import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Root from './components/root'

const Stack = createStackNavigator()

const App: React.SFC = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Home'} component={Root}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
