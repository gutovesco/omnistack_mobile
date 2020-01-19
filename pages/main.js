import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native'
import MapView, { Marker, Callout }from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

function Main( { navigation } ){
    const [currentRegion, setCurrentRegion ] = useState(null);

    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();

            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
               const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition();
    }, []);

    if(!currentRegion){
        return null;
    }

    return (
    <MapView initialRegion={currentRegion} style={ styles.map }>
        <Marker coordinate={{latitude: -22.4703614, longitude: -46.6089902}}>
        <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/36611739?s=400&v=4' }}/>
        <Callout onPress={() => {
            navigation.navigate('Profile', { github_username: 'KyleKun' })
        }}>
            <View style={styles.Callout}>
            <Text style={styles.devName}>Caio Farinha</Text>
            <Text style={styles.devBio}>SW Test Intern at Samsung R&D Institute Brazil - SRBR. Student at Unimetrocamp.</Text>
            <Text style={styles.devTechs}>Python, Dart</Text>
            </View>
        </Callout>
        </Marker>
    </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: 'fff'
    },
    callout: {
        width: 260,
    },

    devName: {
        fontWeight: bold,
        fontSize: 16,
    },
    devBio: {
        color: '666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5,
    }

})
export default Main;