import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "./register"; // Tela de cadastro
import Secound from "./secound"; // Próxima tela após cadastro
import { Ionicons } from "react-native-vector-icons"; // Importando ícones

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Definindo ícones para cada aba
          if (route.name === "Cadastro de Profissional") {
            iconName = focused ? "person-add" : "person-add-outline"; // Ícone para "Cadastro de Profissional"
          } else if (route.name === "Profissionais Cadastrados") {
            iconName = focused ? "people" : "people-outline"; // Ícone para "Profissionais Cadastrados"
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Definindo cores para as abas
        tabBarActiveTintColor: "#28A745", // Cor verde para o ícone ativo
        tabBarInactiveTintColor: "gray", // Cor do ícone inativo
      })}
    >
      <Tab.Screen name="Cadastro de Profissional" component={RegisterScreen} />
      <Tab.Screen name="Profissionais Cadastrados" component={Secound} />
    </Tab.Navigator>
  );
};

export default Tabs;
