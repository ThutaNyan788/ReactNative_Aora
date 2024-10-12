import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchInput = ({initialQuery}) => {

  const pathname = usePathname();
  const [query,setQuery] = useState(initialQuery || '');

  return (


      <View className="border-2 border-black-200 rounded-2xl items-center w-full h-16 px-4 bg-black-100
      focus:border-secondary flex-row ">
        <TextInput
          value={query}
          placeholder="Search for a video topic"
          placeholderTextColor="#CDCDE0"
          onChangeText={(e)=>setQuery(e)}
          className="text-base mt-0.5 text-white flex-1 font-pregular" 

        />
        
       <TouchableOpacity
          onPress={()=>{
            if(!query){
              return Alert.alert("Missing Query",
                "Please input something to search from the database"
              )
            }

            if(pathname.startsWith("/search")){
                router.setParams({query});
            }else{
                router.push(`/search/${query}`)
            }
          }}
       >
          <Image 
            source={icons.search}
            className="w-5 h-5"
            resizeMethod='contain'
          />
       </TouchableOpacity>
      </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({})