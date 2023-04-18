import { ScrollView, Text, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";
import Weather from "./Weather";

export default function Forecasts({ data }) {
  const [forecasts, setForecasts] = useState([]);
  useEffect(() => {
    const forecastData = data?.list.map((f) => {
      const dt = new Date(f.dt * 1000);
      return {
        data: dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        name: format(dt, "EEEE", { locale: fr }),
      };
    });
    // logique pour grouper les éléments par journée
    setForecasts(forecastData);
  }, [data]);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {forecasts &&
        forecasts.map((f, index) => (
          <View
            key={index}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ textAlign: "center" }}>{f.name}</Text>
            <Weather forecast={f} />
          </View>
        ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    height: "40%",
  },
});
