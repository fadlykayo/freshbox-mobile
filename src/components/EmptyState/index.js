import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { language } from '@helpers';
import styles from './styles';

export default class EmptyState extends Component {
  constructor(props){
    super(props);
    this.state={
      text: '',
    }
    this.renderText = this.renderText.bind(this);
  }

  componentDidMount = () => {
    this.renderText(this.props.property, this.props.language, this.props.params)
  };
  

  renderText(property = 'no_props', lang = 'id', params = {}) {
    language.transformText(property,lang,params).then((res) => this.setState({text: res}))
  }

  render() {
    return (
      <View style={styles.emptyState.container}>
        <Text style={styles.emptyState.text}>{this.state.text}</Text>
      </View>
    )
  }
}

