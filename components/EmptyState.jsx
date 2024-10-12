import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="justify-center items-center px-4">
            <Image
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode='contain'
            />


            <Text className="text-2xl font-psemibold text-white text-center">
                {title}
            </Text>
            <Text className="font-pmedium text-sm text-gray-100">
                {subtitle}
            </Text>


            <CustomButton
                title="Create video"
                handlePress={()=>router.push('/create')}
                containerStyles="w-full mt-5"
            />

        </View>
    )
}

export default EmptyState

const styles = StyleSheet.create({})