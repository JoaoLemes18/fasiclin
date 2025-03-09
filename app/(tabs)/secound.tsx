import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Profissional {
  cod_prof: string;
  nome_prof: string;
  tipo_prof: string;
  cod_espec: string;
  status_prof: string;
  cons_prof: string;
  email_prof: string;
  motivo_suspensao?: string;
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
      cons_prof: "CRN-12345",
      email_prof: "joao.silva@email.com",
    },
    {
      cod_prof: "2",
      nome_prof: "Maria Oliveira",
      tipo_prof: "2",
      cod_espec: "002",
      status_prof: "2",
      cons_prof: "CRM-67890",
      email_prof: "maria.oliveira@email.com",
    },
    {
      cod_prof: "3",
      nome_prof: "Carlos Souza",
      tipo_prof: "3",
      cod_espec: "003",
      status_prof: "1",
      cons_prof: "CRO-54321",
      email_prof: "carlos.souza@email.com",
    },
    {
      cod_prof: "4",
      nome_prof: "Ana Costa",
      tipo_prof: "1",
      cod_espec: "004",
      status_prof: "3",
      cons_prof: "CRP-09876",
      email_prof: "ana.costa@email.com",
      motivo_suspensao: "Pendências administrativas",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProf, setSelectedProf] = useState<Profissional | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedTipo, setEditedTipo] = useState("");
  const [editedEspecialidade, setEditedEspecialidade] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedConselho, setEditedConselho] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedMotivoSuspensao, setEditedMotivoSuspensao] = useState("");

  const handleEdit = (profissional: Profissional) => {
    setSelectedProf(profissional);
    setEditedName(profissional.nome_prof);
    setEditedTipo(profissional.tipo_prof);
    setEditedEspecialidade(profissional.cod_espec);
    setEditedStatus(profissional.status_prof);
    setEditedConselho(profissional.cons_prof);
    setEditedEmail(profissional.email_prof);
    setEditedMotivoSuspensao(profissional.motivo_suspensao || "");
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (selectedProf) {
      setProfissionais((prev) =>
        prev.map((prof) =>
          prof.cod_prof === selectedProf.cod_prof
            ? {
                ...prof,
                nome_prof: editedName,
                tipo_prof: editedTipo,
                cod_espec: editedEspecialidade,
                status_prof: editedStatus,
                cons_prof: editedConselho,
                email_prof: editedEmail,
                motivo_suspensao: editedMotivoSuspensao,
              }
            : prof
        )
      );
      setModalVisible(false);
    }
  };

  const handleDelete = (cod_prof: string) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir este profissional?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () => {
            setProfissionais((prev) =>
              prev.filter((prof) => prof.cod_prof !== cod_prof)
            );
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Profissional }) => {
    return (
      <View style={styles.profissionalContainer}>
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
            Conselho de Classe: {item.cons_prof}
          </Text>
          <Text style={styles.profissionalDetails}>
            Email: {item.email_prof}
          </Text>
          <Text style={styles.profissionalDetails}>
            Status:{" "}
            {item.status_prof === "1"
              ? "Ativo"
              : item.status_prof === "2"
              ? "Inativo"
              : "Suspenso"}
          </Text>
          {item.status_prof === "3" && item.motivo_suspensao && (
            <Text style={styles.suspensaoText}>
              Motivo da Suspensão: {item.motivo_suspensao}
            </Text>
          )}
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => handleEdit(item)}
            style={[styles.button, styles.editButton]}
          >
            <AntDesign name="edit" size={23} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleDelete(item.cod_prof)}
            style={[styles.button, styles.deleteButton]}
          >
            <MaterialIcons name="delete-outline" size={24} color="white" />{" "}
          </TouchableOpacity>
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

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Profissional</Text>

            <Text style={styles.inputLabel}>Nome</Text>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Nome do profissional"
            />

            <Text style={styles.inputLabel}>Tipo</Text>
            <TextInput
              style={styles.input}
              value={editedTipo}
              onChangeText={setEditedTipo}
              placeholder="Tipo de profissional"
            />

            <Text style={styles.inputLabel}>Especialidade</Text>
            <TextInput
              style={styles.input}
              value={editedEspecialidade}
              onChangeText={setEditedEspecialidade}
              placeholder="Código da especialidade"
            />

            <Text style={styles.inputLabel}>Status</Text>
            <TextInput
              style={styles.input}
              value={editedStatus}
              onChangeText={setEditedStatus}
              placeholder="Status"
            />

            <Text style={styles.inputLabel}>Conselho de Classe</Text>
            <TextInput
              style={styles.input}
              value={editedConselho}
              onChangeText={setEditedConselho}
              placeholder="Número do conselho"
            />

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={editedEmail}
              onChangeText={setEditedEmail}
              placeholder="Email"
            />

            <Text style={styles.inputLabel}>
              Motivo da Suspensão (se houver)
            </Text>
            <TextInput
              style={styles.input}
              value={editedMotivoSuspensao}
              onChangeText={setEditedMotivoSuspensao}
              placeholder="Motivo da suspensão"
            />

            <Button title="Salvar" onPress={handleSaveEdit} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
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
  textContainer: {
    flex: 1,
  },
  profissionalName: {
    fontSize: 18,
    fontWeight: "bold",
    bottom: 5,
    color: "#333",
  },
  profissionalDetails: {
    fontSize: 16,
    paddingBottom: 10,
    color: "#555",
    marginVertical: 2,
  },
  suspensaoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    top: 10,
    right: 10,
  },
  button: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12, // Tornando os botões arredondados
    marginLeft: 10, // Espaçamento entre os botões
  },
  editButton: {
    backgroundColor: "#007BFF", // Azul
  },
  deleteButton: {
    backgroundColor: "#FF4136", // Vermelho
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-start",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginBottom: 15,
  },
});

export default Secound;
