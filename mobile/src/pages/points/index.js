import React, {useState, useEffect} from 'react'
import Constants from 'expo-constants'
import {Text,View, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import Map, {Marker} from 'react-native-maps'
import {SvgUri} from 'react-native-svg'
import api from '../../config/api'
import * as Location from 'expo-location'
import BtnBack from '../../components/ArrowLeft'



const Points = () => {
    const navigation = useNavigation()
    const route = useRoute()

    const [itens, setItens] = useState([])
    const [points, setPoints] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [inicialPosition, setInicialPosition] = useState([0,0])

    //Obtem permissão e seta a localização do usuário
    useEffect(() => {
      const loadPosition = async () => {

        const {status} = await Location.requestPermissionsAsync()

        if(status !== "granted"){
          Alert.alert("Opssss ...", "Você precisa dar permissão de acesso a sua localização")
          return;
        }

        const location = await Location.getCurrentPositionAsync()
        const {latitude, longitude} = location.coords

        setInicialPosition([latitude, longitude])
      }
      loadPosition()
    }, [])

    //Obtem os itens de coleta
    useEffect(() => {
      api.get('itens').then(response => {setItens(response.data)})
    }, [])

    //Obtem os pontos de coleta
    useEffect(() => {
      api.get('/points', {
        params: {
          cidade: route.params.cidade,
          uf: route.params.uf,
          itens: selectedItems.toLocaleString()
        }
      }).then(response => setPoints(response.data.data))
    }, [selectedItems])

    //Controla os itens selecionados
    const handleItens = id =>{
      //Verifica se o item ja está selecionado
      const isSelected = selectedItems.findIndex(item => item === id)
      
      if(isSelected === -1) 
          setSelectedItems([
              ...selectedItems, id
          ])
      else
      {
          const filteredItens = selectedItems.filter(item => item !== id)
          setSelectedItems(filteredItens)
      }
  }
  

    return (
        <SafeAreaView style = {{flex: 1}}>
          <View style = {styles.container}>
              <BtnBack/>
              <Text style = {styles.title}>Bem Vindo.</Text>
              <Text style = {styles.description}>Encontre no mapa um ponto de coleta.</Text>

              <View style = {styles.mapContainer}>
                
                {inicialPosition[0] !== 0 && (
                  <Map style = { styles.map} initialRegion = {{
                  latitude: inicialPosition[0],
                  longitude: inicialPosition[1],
                  latitudeDelta: 0.014,
                  longitudeDelta: 0.014
                }}>
                  {points.map(point => (
                    <Marker key = {point.id} coordinate = {{
                      latitude: point.latitude,
                      longitude: point.longitude
                    }} onPress = {() => {navigation.navigate("Details", {point_id: point.id})}}>
                      <View style = {styles.mapMarkerContainer}>
                        <Image style = {styles.mapMarkerImage} source = {{uri: point.imagem}}/>
                  <Text style = {styles.mapMarkerTitle}>{point.nome}</Text>
                      </View>
                    </Marker>
                  ))}
                </Map>
                )}
              </View>
          </View>
          <View style = {styles.itemsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator = {false} contentContainerStyle = {{
              paddingHorizontal: 20
            }}>
              {itens.map(item => (
                <TouchableOpacity 
                  activeOpacity = {0.7} 
                  key = {item.id} 
                  style = {[styles.item, 
                            selectedItems.includes(item.id) ? styles.selectedItem : {}]
                          } 
                  onPress = {() => {handleItens(item.id)}}
                >
                  <SvgUri uri = {item.url_imagem} width = {42} height = {42}/>
              <Text style = {styles.itemTitle}>{item.titulo}</Text>
              </TouchableOpacity>
              ))}

            </ScrollView>
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      //fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      //fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
     // fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
      textAlign: 'center'
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      //fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });

export default Points