import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class LogOutButton extends PureComponent {
    constructor() {
        super();
        this.navigateTo = this.navigateTo.bind(this);

    }

    navigateTo() {
        if (this.props.user) {
            this.props.navigateLogOut();
        }
        else {
            this.props.navigateSignIn();
        }
    }

    render() {
        return (
            <TouchableOpacity 
                onPress={this.navigateTo}
                style={styles.container}
            >
                <StaticText
                    style={styles.text.logout}
                    property= { 
                        this.props.user 
                        ? 'drawerPage.content.logOut' 
                        : 'drawerPage.content.login'
                    }
                />
            </TouchableOpacity>
        );
    }
}

export default LogOutButton;
