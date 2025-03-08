import { Text, View, Button } from 'react-native';

export default function third() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Esta é a terceira tela.</Text>
      <Button title="Voltar para a Home" onPress={() => {}} />
    </View>
  );
}
