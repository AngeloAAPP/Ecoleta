import React, { useState, useEffect } from 'react'
import {Text,View, StyleSheet, Image, SafeAreaView, Linking} from 'react-native'
import {Feather as Icon, FontAwesome} from '@expo/vector-icons'
import {useRoute} from '@react-navigation/native'
import {RectButton} from 'react-native-gesture-handler'
import api from '../../config/api'
import * as MailComposer from 'expo-mail-composer';
import BtnBack from '../../components/ArrowLeft'

const Details = () => {
    const route = useRoute()

    const [point, setPoint] = useState([])

    //Obtem os dados do ponto de coleta enviado como parametro na rota
    useEffect(() => {
      const url = `points/${route.params.point_id}`
      api.get(url).then(response => setPoint(response.data.data))
    }, [])

    //Envia email para o endereço eletrônico do ponto de coleta
    const changeMail = () =>{
      MailComposer.composeAsync({
        subject: 'Ecoleta',
        recipients: [point.email]
      })
    }

    //Envia uma mensagem via whatsapp para o número do ponto de coleta
    const changeWhatsapp = () => {
      Linking.openURL(`whatsapp://send?phone=55${point.whatsapp}&text=olá, gostaria de saber mais sobre a coleta de itens através do ecoleta`)
    }

    return (
      <SafeAreaView style = {{flex: 1}}>
        {
          point.length !== 0 && (<><View style = {styles.container}>
            <BtnBack/>
            <Image style = {styles.pointImage} source = {{uri: point.imagem}}/>
          <Text style = {styles.pointName}>{point.nome}</Text>
          <Text style = {styles.pointItems}>{point.itens.map(point => point.titulo).join(', ')}</Text>
            <View style = {styles.address}>
              <Text style = {styles.addressTitle}>Endereço</Text>
              <Text style = {styles.addressContent}>{point.cidade+ '/' + point.uf}</Text>

            </View>
        </View>
        <View style = {styles.footer}>
            <RectButton style = {styles.button} onPress = {changeWhatsapp}>
              <FontAwesome name = "whatsapp" size = {20} color = '#fff'/>
              <Text style = {styles.buttonText}>Whatsapp</Text>
            </RectButton>
            <RectButton style = {styles.button} onPress = {changeMail}>
              <Icon name = "mail" size = {20} color = '#fff'/>
              <Text style = {styles.buttonText}>E-mail</Text>
            </RectButton>
        </View></>)
        }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      //fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
      //fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      //fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      //fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      //fontFamily: 'Roboto_500Medium',
    },
  });

export default Details
