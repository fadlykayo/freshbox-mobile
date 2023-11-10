import React, { Component } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';

import StaticText from '@components/StaticText';

import styles from './styles';

class AlertDialog extends Component {
    constructor() {
      super();
      this.requestCancel = this.requestCancel.bind(this);
      this.requestHandler = this.requestHandler.bind(this);
    }

    requestCancel(){
      this.props.requestCancel();
    }

    requestHandler(){
      this.props.requestHandler();
    }

    renderLoading () {
      if( this.props.showLoading ) {

        return (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator/>
          </View>
        )
      }

      return null;
    }

    render() {
        if(this.props.modalVisible){
            return (
               <React.Fragment>
                 <View style={styles.container(this.props.showLoading)}>
                    <View style={styles.subcontainer.box}>
                        <View style={styles.subcontainer.text}>
                            <StaticText
                                property={this.props.content}
                                style={styles.text.static}
                                params={this.props.params}
                            />
                        </View>
                        <View style={styles.subcontainer.button}>
                            <TouchableOpacity 
                                style={styles.button.red(this.props.bannerDetail)} 
                                onPress={this.requestCancel}
                            >
                                <StaticText
                                    property={ this.props.bannerDetail ? 'button.close' : 'button.no'}
                                    style={styles.text.white}
                                />
                            </TouchableOpacity>
                            {
                                this.props.bannerDetail ? 
                                null : 
                                <TouchableOpacity 
                                    style={styles.button.white} 
                                    onPress={this.requestHandler}
                                >
                                    <StaticText
                                        property={'button.yes'}
                                        style={styles.text.white}
                                    />
                                </TouchableOpacity>
                                
                            }
                        </View>
                    </View>
                </View>
                { this.renderLoading() }
               </React.Fragment>
            );
        }
        else return null
    }
}

AlertDialog.defaultProps = {
    showLoading: false
}

export default AlertDialog;
