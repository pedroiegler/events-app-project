import React from 'react';
import { View, TextInput, Text, Picker, StyleSheet } from 'react-native';

const Filters = ({ searchName, searchDate, searchCategory, onNameChange, onDateChange, onCategoryChange }) => (
  <View style={styles.container}>
    <View style={styles.filterWrapper}>
      <Text style={styles.label}>Filtrar por nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={searchName}
        onChangeText={onNameChange}
      />
    </View>
    <View style={styles.filterWrapper}>
      <Text style={styles.label}>Filtrar por Data</Text>
      <TextInput
        style={styles.input}
        placeholder="Escolha a data"
        value={searchDate}
        onChangeText={onDateChange}
      />
    </View>
    <View style={styles.filterWrapper}>
      <Text style={styles.label}>Filtrar por Categoria</Text>
      <Picker
        selectedValue={searchCategory}
        style={styles.picker}
        onValueChange={onCategoryChange}
      >
        <Picker.Item label="Todas" value="" />
        <Picker.Item label="Música" value="música" />
        <Picker.Item label="Esporte" value="esporte" />
      </Picker>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 1,
    margin: 15
  },
  filterWrapper: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    marginBottom: 8,
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
  },
  picker: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 13,
    width: '100%',
    fontSize: 12,
  },
});

export default Filters;