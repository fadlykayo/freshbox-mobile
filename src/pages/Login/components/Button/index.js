import React, { PureComponent } from 'react';
import { View, Button } from 'react-native';

class ButtonSignIn extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Button
          style={{marginTop: 10}}
          onPress={() => { alert(`${this.props.input.email} => ${this.props.input.password}`) }}
          title="Sign In"
          color="#FF1717"
        />
      </View>
    );
  }
}

export default ButtonSignIn;
