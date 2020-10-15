import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";

import mapMaker from "../../images/map-marker.png";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function OrphangesMap() {
  const navigation = useNavigation();

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Ops!",
          "Precisamos de sua permissão para obter a localização."
        );

        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  function handleNavigateToOrphanageDetails() {
    navigation.navigate("OrphanageDetails");
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        loadingEnabled={initialPosition[0] === 0}
        initialRegion={{
          latitude: initialPosition[0],
          longitude: initialPosition[1],
          latitudeDelta: 0.014,
          longitudeDelta: 0.014,
        }}
      >
        <Marker
          icon={mapMaker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: initialPosition[0],
            longitude: initialPosition[1],
          }}
        >
          <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar das meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>
        <TouchableOpacity
          style={styles.createOrphanageButton}
          onPress={() => {}}
        >
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
