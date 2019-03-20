import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, FlatList, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      date: '',
      sex: '',
      address: '',
      postalCode: '',
      height: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> 1React </Text>
        </View>

        <ScrollView style={styles.scollContainer}>
          <TextInput style={styles.textInput}
            placeholder="Type your name"
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}>
          </TextInput>
          <TextInput style={styles.textInput}
            placeholder="Type your pesel"
            onChangeText={(surname) => this.setState({ surname })}
            value={this.state.surname}>
          </TextInput>
          <Picker
            selectedValue={this.state.sex}
            style={{height: 50, width: 200}}
            onValueChange={(sex) => this.setState({sex})
            }>
            <Picker.Item label="M" value="M" />
            <Picker.Item label="F" value="F" />
          </Picker>
          <TextInput style={styles.textInput}
            placeholder="Type your address"
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address}>
          </TextInput>
          <DatePicker
          style={{width: 200}}
          date={this.state.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
          value={this.state.date}
        />
          <TextInput style={styles.textInput}
            placeholder="Type your postal code"
            onChangeText={(postalCode) => this.setState({ postalCode })}
            value={this.state.postalCode}>
          </TextInput>
          <TextInput style={styles.textInput}
            placeholder="Type your height"
            onChangeText={(height) => this.setState({ height })}
            value={this.state.height}>
          </TextInput>
          <TextInput style={styles.textInput}
            placeholder="Type your name2">
          </TextInput>
          <TextInput style={styles.textInput}
            placeholder="Type your name3">
          </TextInput>
          <TextInput style={styles.textInput}
            placeholder="Type your name4">
          </TextInput>
          <TextInput style={styles.textInput}
            placeholder="Type your name5">
          </TextInput>
          <TextInput style={styles.textInput}
            placeholder="Type your name6">
          </TextInput>
          <TextInput style={styles.textInput}
            placeholder="Type your name7">
          </TextInput>
          <TextInput style={styles.textInput}
            placeholder="Type your name8">
          </TextInput>
        </ScrollView>
        <View style={styles.footer}>
          <Button
            onPress={() => {
              if(isValid(this.state.height) == true && isValidPostal(this.state.postalCode) == true && isValid(this.state.surname) 
              && isNamePesel(this.state.name,this.state.surname,this.state.sex) == true){
              this.props.navigation.navigate('Details', {
                name: this.state.name,
                surname: this.state.surname,
                date: this.state.date,
                sex: this.state.sex,
                address: this.state.address,
                postalCode: this.state.postalCode,
                height: this.state.height,
              });
            } else alert("Niewłaściwe dane");}}
            title="Learn More"
            color="#841584"
            accessibilityLabel="purple button"
          />
        </View>

      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation}) => {
    const { params } = navigation.state;

  };

  render() {
    const { params } = this.props.navigation.state;
    const name = params ? params.name : null;
    const surname = params ? params.surname : null;
    const date = params ? params.date : null;
    const sex = params ? params.sex : null;
    const address = params ? params.address : null;
    const postalCode = params ? params.postalCode : null;
    const height = params ? params.height : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>name: {JSON.stringify(name)}</Text>
        <Text>surname: {JSON.stringify(surname)}</Text>
        <Text>date: {JSON.stringify(date)}</Text>
        <Text>sex: {JSON.stringify(sex)}</Text>
        <Text>address: {JSON.stringify(address)}</Text>
        <Text>postalCode: {JSON.stringify(postalCode)}</Text>
        <Text>height: {JSON.stringify(height)}</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

function isValid(height) {
  if (height.match(/^\d*$/)) {
    return true
  } else return false
}

function isValidPostal(postalCode) {
  if (postalCode.match(/^\d*-\d*$/)) {
    return true
  } else return false
}


function isNamePesel(name, pesel, sex) {
  if (sex == 'F'){
    if (name.match(/a$/) && pesel.match(/^\d*[13579].$/)) {
      return true
  } else {
    return false
  }}
  else return true
}


const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
  },
  {
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    //backgroundColor: '#4c4cff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 32,
    padding: 50,
    //color: "white",
  },
  footer: {
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textInput: {
    padding: 5,
    fontSize: 20,
  }
});
