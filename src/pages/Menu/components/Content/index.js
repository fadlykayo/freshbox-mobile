import React,{ PureComponent } from 'react';
import { View, Text } from 'react-native';
import Button from '../Button';
import styles from './styles';

class Content extends PureComponent {
    constructor(){
        super();
    }

    render(){
        return(
            <View style={styles.container}>
                <Button 
                    type={'get_started'}
                />
                <Button 
                    type={'facebook'}
                />
                <Button
                    navigate={this.props.navigate} 
                    type={'email'}
                />
                <Button 
                    type={'google'}
                />
            </View>
        )
    }
}

export default Content;