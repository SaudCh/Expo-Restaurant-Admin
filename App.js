import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { Container, Content, Header, Body, Title, Button } from 'native-base';

import * as FireBase from 'firebase';
import { firebaseConfig } from './components/config'
import { COLORS } from './const/color';

if (!FireBase.apps.length) {
  FireBase.initializeApp(firebaseConfig);
}

const fire = FireBase.firestore().collection('Order');



export default function App() {
  const [data, setData] = useState('')

  var newArray = [];

  fire
    .where('status', '==', 1)
    .get()
    .then(querySnapshot => {
      //console.log('Total users: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
        //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        newArray.push(documentSnapshot.data());
      });
      setData(newArray);
    });

  const marksasComplete = (value) => {
    //console.log(value)
    fire.doc(value).set({
      table: value,
      status: 0
    })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });



  }


  return (
    <Container>
      <Header style={{ backgroundColor: COLORS.primary, marginTop: 35 }}>
        <Body>
          <Text style={{ color: '#fff', fontSize: 22 }}>Orders</Text>
        </Body>
      </Header>
      <Content>
        <FlatList
          data={data}
          keyExtractor={(item) => item.table}
          renderItem={({ item }) => (
            <View style={{ ...styles.card }}>
              <Text style={{ fontSize: 18 }}>Table No: {item.table}</Text>
              <Text style={{ fontSize: 18 }}>Items</Text>
              {item.item.map((item, key) => (
                <Text key={item.id} style={{ fontSize: 18 }}>{'\u2B24'} {item.name}   <Text style={{ color: 'red', fontWeight: 'bold' }}>x{item.quantity}</Text> </Text>)
              )}
              <Text style={{ fontSize: 18 }}>Time: {item.time}</Text>
              <Text style={{ fontSize: 18 }}>Total: {item.total}</Text>

              <View>
                <Button small rounded
                  onPress={() => marksasComplete(item.table)}
                  style={{ alignSelf: 'flex-end', backgroundColor: COLORS.primary }}>
                  <Text style={{ color: '#fff' }}>  Marks as Complete  </Text>
                </Button>
              </View>
            </View>
          )}
        />
        <StatusBar style="light" />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 30,
    padding: 10,
    elevation: 10,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
