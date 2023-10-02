import { View, Text, ScrollView, Button, StyleSheet } from 'react-native'
import React, { useContext, useCallback, useState } from 'react';
import { Container } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react';
import axios from 'axios'

import AuthGlobal from '../../Context/store/AuthGlobal'
import { logoutUser } from '../../Context/actions/Auth.actions'

const UserProfile = (props) => {
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState()

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login")
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`http://172.20.10.7:5000/api/v1/users/${context.stateUser.user.userId}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => {
            setUserProfile(user.data);
          })        
      })
      .catch((error)=>console.log(error))

    return () => {
      setUserProfile()
    }

  }, [context.stateUser.isAuthenticated])


  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title={'Sign Out'}
            onPress={async () => {
              await AsyncStorage.removeItem('jwt');
              logoutUser(context.dispatch);
            }}
          />
        </View>
      </ScrollView>

    </Container >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60
  }
})

export default UserProfile;

