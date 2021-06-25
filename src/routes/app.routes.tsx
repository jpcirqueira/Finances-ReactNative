import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../pages/Dahsboard';
import Register from '../pages/Register';
const { Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes(){
  return(
    <Navigator>
      <Screen
        name="listagem"
        component={Dashboard}
      />
      <Screen
        name="cadastrar"
        component={Register}
      />
    </Navigator>
  );
}