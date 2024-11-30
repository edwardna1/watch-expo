import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";



export default function BackButton({ icon, onPress, SectionName}) {
    return (

        <View className="flex justify-between items-center flex-row mx-[5%]">
            <View className="flex mr-[10%]">
                <Ionicons name={icon} size={30} color="white" />
                <AntDesign name={icon} size={30} color="white" />
            </View>
            <View className="flex mr-auto">
                <Text className="text-white text-base">{SectionName}</Text>
            </View>

            <TouchableOpacity
                onPress={onPress}
                className="flex"
            >
                <AntDesign name="right" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}