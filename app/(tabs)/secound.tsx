import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Profissional {
  cod_prof: string;
  nome_prof: string;
  tipo_prof: string;
  cod_espec: string;
  status_prof: string;
}

const Secound = () => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([
    {
      cod_prof: "1",
      nome_prof: "João Silva",
      tipo_prof: "1", // Administrativo
      cod_espec: "001",
      status_prof: "1", // Ativo
    },
    {
      cod_prof: "2",
      nome_prof: "Maria Oliveira",
      tipo_prof: "2", // Estagiário
      cod_espec: "002",
      status_prof: "2", // Inativo
    },
    {
      cod_prof: "3",
      nome_prof: "Carlos Souza",
      tipo_prof: "3", // Supervisor
      cod_espec: "003",
      status_prof: "1", // Ativo
    },
    {
      cod_prof: "4",
      nome_prof: "Ana Costa",
      tipo_prof: "1", // Administrativo
      cod_espec: "004",
      status_prof: "3", // Suspenso
    },
  ]);

  const handleDelete = (cod_prof: string) => {
    setProfissionais((prevState) =>
      prevState.filter((profissional) => profissional.cod_prof !== cod_prof)
    );
  };

  const renderItem = ({ item }: { item: Profissional }) => {
    return (
      <View style={styles.profissionalContainer}>
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
          Especialidade: {item.cod_espec}
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
    );
  };

  return (
    <FlatList
      data={profissionais}
      renderItem={renderItem}
      keyExtractor={(item) => item.cod_prof}
    />
  );
};

const styles = StyleSheet.create({
  profissionalContainer: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  profissionalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profissionalDetails: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Secound;
