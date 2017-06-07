import React from 'react';
import {findNodeHandle} from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView, TextInput,
  Button, Image, FlatList
} from 'react-native';

import * as firebase from 'firebase';
import firebaseApp from '../api/firebaseApp';
import {isEqual} from 'lodash';

export default class UserScreen extends React.Component {
  constructor(props){
    super(props);
    this.user = firebase.auth().currentUser;
    this.state = {dogsList: []}
    this.dogsList = []
  }

  componentDidMount(){
    if (this.user) {
      this.getDogList();
    }

  }

  getDogList(){
    _this = this
    var dogsList = []
    firebaseApp.database().ref(`/users/${this.user.uid}/dogs`).once('value').then(function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
        console.log("HEY");
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        dogsList.push(childData)

        });
        console.log("LIST BEFORE", dogsList)
        _this.setState({dogsList})
    });

    //
  }

  render(){
    console.log("DogsList", this.state)
    if (!isEqual(this.state.dogsList, [])) {
      var list =
      this.state.dogsList.map( (dog, i) => (
        <View key={i}>
          <Text>{dog.dogName}</Text>

        </View>
      )

    )
    }
    // if (!_.isEqual(this.state), {}) {
    //   console.log("not equal")
    //
    // }

    return(
      <View style={styles.container}>
        <Text style={styles.text}>Hi, {this.user.displayName}</Text>
        <View>{list}</View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
  text: {
  fontWeight: 'bold',
  fontSize: 30,
  }
});

// if (this.state.dogsList !== []) {
//   var list =
//   <FlatList
//     data={this.state.dogsList}
//     renderItem={({ item }) => (
//       <View><Text>{item.name}</Text></View>
//     )}
//   />
// console.log("LIST", list);
//
// }
