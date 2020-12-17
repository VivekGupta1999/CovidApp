import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import data from '../componets/map.json';
import { Container, Content } from 'native-base';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';


export default class DetailScreen extends React.Component {

  constructor(props) {
    super(props);
    this.getCurrentLocation();
    this.state = {
      reports: [],
      initialRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  componentDidMount = () => {
    this.setState({ reports: data });
  };

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 5,
          longitudeDelta: 5
        };
        console.log(region)
        this.setState({
          initialRegion: region
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  goToInitialRegion() {
    let that = this;
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 5,
          longitudeDelta: 5
        };
        console.log(region)
        let initialRegion = Object.assign({}, region);
        initialRegion["latitudeDelta"] = 1;
        initialRegion["longitudeDelta"] = 1;
        that.mapView.animateToRegion(initialRegion, 8000);
      })

  }

  mapMarkers() {
    return this.state.reports.map((report, i) => <Marker
      key={i}
      coordinate={{ latitude: report.Latitude, longitude: report.Longitude }}
      image={require("../../images/hospital.png")}
      title={report.City}
      description={report.Name}
    >
    </Marker >)
  }
  render() {
    console.log('enter here list');

    return (
      <Container style={styles.container}>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject, ...styles.map }}
          // region={this.state.mapRegion}
          ref={ref => (this.mapView = ref)}
          zoomEnabled={true}
          showsMyLocationButton={true}
          showsUserLocation={true}
          onMapReady={this.goToInitialRegion.bind(this)}
          initialRegion={this.state.initialRegion}
        >
          {this.mapMarkers()}
        </MapView>
        <View
          style={{
            left: 10,
            flex: 1,
            top: 10,
            position: "absolute"
          }}
        >

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.goBack();
              return;
            }}>
            <Image style={styles.image} source={require('../../images/back.png')} />
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1
  },
  image: {
    width: 30,
    height: 30
  }
});