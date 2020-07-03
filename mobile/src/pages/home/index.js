import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ImageBackground, Image, Picker, SafeAreaView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
const Background = require('../../assets/home-background.png')
const Logo = require('../../assets/logo.png')
import axios from 'axios'

const Home = () => {
  const navigation = useNavigation()

  const [ufs, setufs] = useState([]) //UF's disponiveis
  const [cities, setCities] = useState([]) //Cidades disponiveis

  const [selectedUF, setSelectedUF] = useState("0") //UF atualmente selecionada
  const [selectedCity, setSelectedCity] = useState("0") //Cidade atualmente
  const [enabled, setEnabled] = useState(false) // Controla o combobox de cidades

  //Preenche as UF's disponiveis 
  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => setufs(response.data))

  }, [])


  //Preenche as cidades
  useEffect(() => {

    //Reseta a cidade selecionada
    setSelectedCity("0")

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`

    axios.get(url)
      .then(response => setCities(response.data))


    selectedUF !== "0" ?
      setEnabled(true)
      :
      setEnabled(false)
  }, [selectedUF])

  return (
    <SafeAreaView style = {{flex: 1}}>
      <ImageBackground style={styles.container} source={Background} imageStyle={{ width: 264, height: 368 }}>
        <View style={styles.main}>
          <Image source={Logo} />
          <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
          <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
        </View>
        <View>
          <Picker
            selectedValue={selectedUF}
            style={styles.input}
            onValueChange={setSelectedUF}
            mode='dropdown'
          >
            <Picker.Item label="Selecione a UF" value="0" />
            {ufs.map(uf => (
              <Picker.Item key={uf.id} label={uf.sigla} value={uf.sigla} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedCity}
            style={[styles.input, !enabled && styles.inputDisabled]}
            onValueChange={setSelectedCity}
            mode='dropdown'
            enabled={enabled}

          >
            <Picker.Item label="Selecione a Cidade" value="0" />
            {cities.map(city => (
              <Picker.Item key={city.id} label={city.nome} value={city.nome} />
            ))}
          </Picker>
          <RectButton style={styles.button} onPress={() => {
            navigation.navigate("Points", {uf: selectedUF, cidade: selectedCity})
          }}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#fff" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    maxWidth: 260,
    lineHeight: 24,
  },

  containerInput: {
    borderTopLeftRadius: 10
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  inputDisabled: {
    opacity: 0.6,
    color: '#6C6C80'
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  }
});

export default Home

