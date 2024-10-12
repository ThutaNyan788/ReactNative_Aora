import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants';

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
}) => {

    const [showPassword,setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100
      font-pmedium">
        {title}
      </Text>

      <View className="border-2 border-black-200 rounded-2xl items-center w-full h-16 px-4 bg-black-100
      focus:border-secondary flex-row">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          className="flex-1 text-white font-psemibold" 
          secureTextEntry={title === "Password" && !showPassword}

        />
        
        {title === "Password" && (
            <TouchableOpacity 
            onPress={()=>{
                setShowPassword(!showPassword)
            }}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6 "
                resizeMode='contain'/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({})