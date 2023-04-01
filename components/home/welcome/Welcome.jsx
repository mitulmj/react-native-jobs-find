import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { View, Text, TextInput, TouchableOpacity,FlatList  } from 'react-native'
import { icons, SIZES } from '../../../constants'
import styles from './welcome.style'

const jobType = ['Full-Time','Part-Time','Contractor']

const Welcome = ({searchTerm,setSearchTerm,handleClick}) => {
  const router = useRouter()
  const [activeJobType,setActiveJobType] = useState('Full-Time')
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}> Hello Mitul</Text>
        <Text style={styles.welcomeMessage}> Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text)=>setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobType}
          renderItem={({item})=>(
            <TouchableOpacity
              style={styles.tab(activeJobType,item)}
              onPress={()=>{
                setActiveJobType(item)
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType,item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item=>item}
          contentContainerStyle={{columnGap:SIZES.small}}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome