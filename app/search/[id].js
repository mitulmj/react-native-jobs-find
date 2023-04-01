import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../../styles/search";
import { useSearchParams, useRouter, Stack } from "expo-router";
import axios from "axios";

import { ScreenHeaderBtn, NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import { RAPID_API_KEY } from "react-native-dotenv";

const rapidApiKey = RAPID_API_KEY;
const JobSearch = () => {
  const param = useSearchParams();
  const router = useRouter();

  const [searchData, setSearchData] = useState([]);
  const [searchError, setSearchError] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setSearchLoading(true);
    setSearchData([]);

    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        url: `https://jsearch.p.rapidapi.com/search`,
        params: {
          query: param.id,
          page: page.toString(),
        },
      };

      const res = await axios.request(options);
      setSearchData(res.data.data);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleDirection = (dir) => {
    if (dir === "left") {
      setPage(page - 1);
      handleSearch();
    } else if (dir === "right") {
      setPage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.white },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <FlatList
        data={searchData}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
            key={item.id}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{param.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text> Opps! Somethings went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <>
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handleDirection("left")}>
                <Image
                  source={icons.chevronLeft}
                  resizeMode="contain"
                  style={styles.paginationImage}
                />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handleDirection("right")}>
                <Image
                  source={icons.chevronRight}
                  resizeMode="contain"
                  style={styles.paginationImage}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default JobSearch;
