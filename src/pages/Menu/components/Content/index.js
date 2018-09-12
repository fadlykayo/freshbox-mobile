import React,{ PureComponent } from 'react';
import { View } from 'react-native';
import StaticText from '@components/StaticText';
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
                    onPress={this.props.getStartedHandler}
                />
                <Button 
                    type={'facebook'}
                    onPress={this.props.facebookHandler}
                />
                <Button
                    navigate={this.props.navigate} 
                    type={'email'}
                    onPress={this.props.emailHandler}
                />
                <Button 
                    type={'google'}
                    onPress={this.props.googleHandler}
                />
                <StaticText 
                    style={styles.termsAndCondition}
                    property={'welcome.content.termsCondition'}
                />
            </View>
        )
    }
}

export default Content;