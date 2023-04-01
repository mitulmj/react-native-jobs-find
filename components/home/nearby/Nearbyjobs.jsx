import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'

import styles from './nearbyjobs.style'

const Nearbyjobs = () => {
  const router = useRouter()
  const {data, error, isLoading,reFetch} = useFetch('search',{
    query:'React Native Developer',
    page:1,
    num_pages:1
  })
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity onPress={reFetch}>
            <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {
          isLoading ? (
            <ActivityIndicator size="large" colors={COLORS.primary}/>
          ) : error ? (
            <Text>Opps! Somethings went wrong.</Text>
          ) : (
            data?.map((item)=>(
              <NearbyJobCard
                job={item}
                key={`nearby-job-${item.job_id}`}
                handleNavigate={()=>router.push(`/job-details/${item.job_id}`)}
              />
            ))
          )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs