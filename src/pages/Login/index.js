import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './styles';
import TextInputComponent from './components/TextInputComponent';
import ButtonSignIn from './components/Button';
import TextRegister from './components/TextRegisterComponent';

class Login extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
     };
  }

  static navigationOptions = {
    headerMode: 'screen',
    headerTitle: 'Sign In',
  }

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
    console.log("Email is Not Correct");
    this.setState({email:text})
    return false;
      }
    else {
      this.setState({email:text})
      console.log("Email is Correct");
    }
  }

  inputPassword = (input) => {
    this.setState({ password: input })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <TextInputComponent input={this.state} validate={this.validate} addPassword={this.inputPassword} />

          <ButtonSignIn input={this.state} />
          <TextRegister />
        </View>
      </View>
    )
  }
}

export default Login;
