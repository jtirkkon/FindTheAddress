import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker} from'react-native-maps';
//N9Z9QLAWypDUl5H5fX46TfSqeGJxoruG

export default function App() {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(60.200692);
  const [longitude, setLongitude] = useState(24.934302);
  const [position, setPosition] = useState({latitude: 60.200692, longitude: 24.934302})
  const [markerAddress, setMarkerAddress] = useState({street: '', city: ''});

  const getAddressLocation = ({address}) => {
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=N9Z9QLAWypDUl5H5fX46TfSqeGJxoruG&inFormat=kvp&outFormat=json&location=Finland%2C+${address}&thumbMaps=false`
    //console.log(address)
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setPosition({latitude: data.results[0].locations[0].latLng.lat, longitude: data.results[0].locations[0].latLng.lng});
        setMarkerAddress({street: data.results[0].locations[0].street, city: data.results[0].locations[0].adminArea5});
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapViewStyle}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta:0.0032,
          longitudeDelta:0.0021,
        }}>
        <Marker
          coordinate={{
          latitude: position.latitude,
          longitude: position.longitude}}
          title=''
          onPress={() =>
            Alert.alert(
              `${markerAddress.street}, ${markerAddress.city}`,
            )}
        />
      </MapView>

      <TextInput style={styles.textInputStyle} onChangeText={text => setAddress(text)} value={address}
       placeholder='Type address: e.g Hallituskatu 7 Helsinki'></TextInput>
      <View style={styles.buttonStyle}>
        <Button  title="SHOW" onPress={() => {getAddressLocation({address})}}></Button>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapViewStyle: {
    flex: 1,
    height: 300,
    width: 360
  },
  textInputStyle: {
    width: 350,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10
  },
  buttonStyle: {
    marginBottom: 20,
    width: 350,
  }
});
