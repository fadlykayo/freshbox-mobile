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
                />
                <Button 
                    type={'facebook'}
                />
                <Button 
                    type={'email'}
                />
                <Button 
                    type={'google'}
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