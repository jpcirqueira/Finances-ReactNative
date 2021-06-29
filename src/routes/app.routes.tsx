import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import Dashboard from '../pages/Dahsboard';
import Register from '../pages/Register';
import Resume from '../pages/Resume';
import { MaterialIcons } from '@expo/vector-icons';

const { Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes(){ 

  const theme = useTheme();
  
  return(
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style: {
          height: 60
        }
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) => (
              <MaterialIcons 
                size={size}
                color={color}
                name="format-list-bulleted"
              />
          ))
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) => (
              <MaterialIcons 
                size={size}
                color={color}
                name="attach-money"
              />
          ))
        }}
      />
      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="pie-chart"
                size={size}
                color={color}
              />
          ))
        }}
      />
    </Navigator>
  );
}