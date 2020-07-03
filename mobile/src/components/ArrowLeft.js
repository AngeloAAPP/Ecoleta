import React from 'react'
import {Feather as Icon} from '@expo/vector-icons'
import {TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

const ArrowLeft = () => {
    
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress = {() => {
            navigation.goBack()
          }}>
            <Icon name = "arrow-left" color = "#34cb79" size = {20}/>
          </TouchableOpacity>
    )
}

export default ArrowLeft
