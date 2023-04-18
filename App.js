import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import axios from "axios";
import CurrentWethear from "./components/CurrentWethear";
import Forecasts from "./components/Forecasts";

const API_URL = (lat, long) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=e8ead9c1629b3125c28b4ff868bcbeb8&lang=fr&units=metric`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, seData] = useState(null);
  useEffect(() => {
    const getCoordoninates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      setLoading(false);
      getWeather(location);
    };
    getCoordoninates();
  }, []);
  const getWeather = async (location) => {
    try {
      const response = await axios.get(
        API_URL(location.coords.latitude, location.coords.longitude)
      );
      seData(response.data);
    } catch (error) {
      console.log("Erreur lors du getWeather");
    }
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {data && <CurrentWethear data={data} />}
      <Forecasts data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E6E1",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
});
