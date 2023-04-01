import {useState} from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native'
import { COLORS,SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { useRouter } from 'expo-router'
import useFetch from '../../../hook/useFetch'

import styles from './popularjobs.style'

const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob,setSelectedJob] = useState();
  const {data, error, isLoading, reFetch} = useFetch('search',{
    query:'React Native Developer',
    page:1,
    num_pages:1
  })

  function handleCardPress(item){
    // console.log(item);
    setSelectedJob(item.job_id);
  }
  // console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
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
            <FlatList
              data={data}
              renderItem={({item})=>(
                <PopularJobCard
                  item={item}
                  selectedJob={selectedJob}
                  handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={item=>item?.job_id}
              contentContainerStyle={{columnGap:SIZES.medium}}
              horizontal
            />
          )
        }
      </View>
    </View>
  )
}

export default Popularjobs