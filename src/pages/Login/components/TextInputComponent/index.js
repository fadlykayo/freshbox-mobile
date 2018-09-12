import React, { PureComponent } from 'react'
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

class TextInputComponent extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text
          style={styles.textstyle}
        >Email</Text>
        <TextInput
          returnKeyType = {"next"}
          onSubmitEditing={() => { this.passwordText.focus(); }}
          autoCapitalize="none"
          style={ styles.textinputstyle }
          onChangeText={(email) => this.props.validate(email)}
          value={this.props.input.email}
        />
        <Text
          style={styles.textstyle}
        >Password</Text>
        <TextInput
          ref={(input) => { this.passwordText = input; }}
          style={styles.textinput}
          secureTextEntry={true}
          style={ styles.textinputstyle }
          onChangeText={(password) => this.props.addPassword(password)}
          value={ this.props.input.password }
        />
      </View>
    )
  }
}

export default TextInputComponent;