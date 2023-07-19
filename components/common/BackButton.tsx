import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from "@expo/vector-icons";


export default function BackButton({onPress, classNames}) {
  return (
    <TouchableOpacity
    onPress= {onPress}
    className= {classNames}
  >
    <AntDesign name="left" size={24} color="white" />
  </TouchableOpacity>
  )
}