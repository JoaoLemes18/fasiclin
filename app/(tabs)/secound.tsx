import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Profissional {
  cod_prof: string;
  nome_prof: string;
  tipo_prof: string;
  cod_espec: string;
  status_prof: string;
}

const especialidades: Record<string, string> = {
  "001": "Nutrição",
  "002": "Medicina",
  "003": "Odontologia",
  "004": "Psicologia",
};

const Secound = () => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([
    {
      cod_prof: "1",
      nome_prof: "João Silva",
      tipo_prof: "1",
      cod_espec: "001",
      status_prof: "1",
    },
    {
      cod_prof: "2",
      nome_prof: "Maria Oliveira",
      tipo_prof: "2",
      cod_espec: "002",
      status_prof: "2",
    },
    {
      cod_prof: "3",
      nome_prof: "Carlos Souza",
      tipo_prof: "3",
      cod_espec: "003",
      status_prof: "1",
    },
    {
      cod_prof: "4",
      nome_prof: "Ana Costa",
      tipo_prof: "1",
      cod_espec: "004",
      status_prof: "3",
    },
  ]);

  const renderItem = ({ item }: { item: Profissional }) => {
    return (
      <View style={styles.profissionalContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="person" size={24} color="#28A745" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.profissionalName}>{item.nome_prof}</Text>
          <Text style={styles.profissionalDetails}>
            Tipo:{" "}
            {item.tipo_prof === "1"
              ? "Administrativo"
              : item.tipo_prof === "2"
              ? "Estagiário"
              : item.tipo_prof === "3"
              ? "Supervisor"
              : "Master"}
          </Text>
          <Text style={styles.profissionalDetails}>
            Especialidade: {item.cod_espec} -{" "}
            {especialidades[item.cod_espec] || "Desconhecida"}
          </Text>
          <Text style={styles.profissionalDetails}>
            Status:{" "}
            {item.status_prof === "1"
              ? "Ativo"
              : item.status_prof === "2"
              ? "Inativo"
              : "Suspenso"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={profissionais}
        renderItem={renderItem}
        keyExtractor={(item) => item.cod_prof}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  profissionalContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#28A745",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: "#e8f5e9",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  profissionalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profissionalDetails: {
    fontSize: 16,
    color: "#555",
    marginVertical: 2,
  },
});

export default Secound;
