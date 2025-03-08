import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button"; // Importando o hook useRouter
import Input from "@/components/Input";

const Register = () => {
  const router = useRouter(); // Usando o hook para navegação
  const [formState, setFormState] = useState({
    cod_prof: "",
    nome_prof: "",
    tipo_prof: "1",
    cod_espec: "00",
    senha_prof: "",
    status_prof: "1",
  });

  const [especialidades, setEspecialidades] = useState([
    { cod_especialidade: "01", especialidade: "Nutrição" },
    { cod_especialidade: "02", especialidade: "Medicina" },
    { cod_especialidade: "03", especialidade: "Odontologia" },
  ]);

  const [disableOptions, setDisableOptions] = useState(false);

  useEffect(() => {
    setDisableOptions(formState.tipo_prof === "1");
  }, [formState.tipo_prof]);

  const handleInput = (name: string, value: string | number) => {
    setFormState({ ...formState, [name]: value.toString() });
  };

  const handleSubmit = () => {
    if (
      !formState.cod_prof ||
      !formState.nome_prof ||
      !formState.cod_espec ||
      !formState.tipo_prof ||
      !formState.senha_prof ||
      !formState.status_prof
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Redireciona para a próxima tela após o cadastro
    router.push("/secound"); // Aqui, você define para qual tela deseja navegar após o cadastro
  };

  const handleTipoProf = (tipo: string) => {
    handleInput("tipo_prof", tipo);
  };

  const handleStatusProf = (status: string) => {
    handleInput("status_prof", status);
  };

  const handleEspecialidade = (especialidade: string) => {
    handleInput("cod_espec", especialidade);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/images/fasiclin.png")} // Caminho para a logo
        style={styles.logo}
      />
      <Input
        label="Código"
        placeholder="Código"
        value={formState.cod_prof}
        onChangeText={(text) => handleInput("cod_prof", text)}
      />

      <Input
        label="Nome"
        placeholder="Nome"
        value={formState.nome_prof}
        onChangeText={(text) => handleInput("nome_prof", text)}
      />

      <Input
        label="Senha"
        placeholder="Senha"
        secureTextEntry
        value={formState.senha_prof}
        onChangeText={(text) => handleInput("senha_prof", text)}
      />

      <Text style={styles.label}>Tipo do profissional</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            formState.tipo_prof === "1" && styles.selectedButton,
          ]}
          onPress={() => handleTipoProf("1")}
        >
          <Text style={styles.buttonText}>Administrativo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            formState.tipo_prof === "2" && styles.selectedButton,
          ]}
          onPress={() => handleTipoProf("2")}
        >
          <Text style={styles.buttonText}>Estagiário</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            formState.tipo_prof === "3" && styles.selectedButton,
          ]}
          onPress={() => handleTipoProf("3")}
        >
          <Text style={styles.buttonText}>Supervisor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            formState.tipo_prof === "4" && styles.selectedButton,
          ]}
          onPress={() => handleTipoProf("4")}
        >
          <Text style={styles.buttonText}>Master</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Status do profissional</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            formState.status_prof === "1" && styles.selectedButton,
          ]}
          onPress={() => handleStatusProf("1")}
        >
          <Text style={styles.buttonText}>Ativo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            formState.status_prof === "2" && styles.selectedButton,
          ]}
          onPress={() => handleStatusProf("2")}
        >
          <Text style={styles.buttonText}>Inativo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            formState.status_prof === "3" && styles.selectedButton,
          ]}
          onPress={() => handleStatusProf("3")}
        >
          <Text style={styles.buttonText}>Suspenso</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Especialidade do Profissional</Text>
      <View style={styles.buttonGroup}>
        {especialidades.map((especialidade) => (
          <TouchableOpacity
            key={especialidade.cod_especialidade}
            style={[
              styles.button,
              formState.cod_espec === especialidade.cod_especialidade &&
                styles.selectedButton,
            ]}
            onPress={() => handleEspecialidade(especialidade.cod_especialidade)}
            disabled={disableOptions && formState.tipo_prof === "1"} // Desabilita se o tipo for Administrativo
          >
            <Text style={styles.buttonText}>
              {especialidade.cod_especialidade} - {especialidade.especialidade}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button onPress={handleSubmit} content={"Cadastrar"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 250, // Defina o tamanho da logo
    height: 150,
    alignSelf: "center", // Centraliza a logo
    marginBottom: 20, // Espaço abaixo da logo
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#6C757D", // Cor padrão do botão
    paddingVertical: 12, // Ajuste no espaçamento vertical
    paddingHorizontal: 25, // Ajuste no espaçamento horizontal
    borderRadius: 25, // Borda mais arredondada
    marginBottom: 15, // Margem inferior maior
    marginRight: 15, // Margem direita maior para mais espaçamento
    borderWidth: 1, // Adicionando uma borda sutil
    borderColor: "#6C757D", // Cor da borda combinando com o fundo
    alignItems: "center", // Alinha o conteúdo centralizado
    justifyContent: "center", // Garante que o texto fique no centro
    shadowColor: "#000", // Sombra sutil para dar profundidade
    shadowOffset: { width: 0, height: 4 }, // Deslocamento da sombra
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 6, // Raio da sombra
  },
  selectedButton: {
    backgroundColor: "#28A745", // Cor quando o botão for selecionado
    borderColor: "#28A745", // Borda na cor de seleção
    shadowColor: "#28A745", // Sombra com a mesma cor
    shadowOpacity: 0.2, // Aumentando a opacidade da sombra quando selecionado
  },
  buttonText: {
    color: "#fff", // Cor do texto branca para contraste
    fontSize: 16, // Tamanho da fonte
    fontWeight: "bold", // Peso da fonte mais destacado
  },
});

export default Register;
