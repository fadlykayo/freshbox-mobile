import React,{ PureComponent } from 'react';
import StaticText from '@components/StaticText';
import styles from './styles';

class VerificationText extends PureComponent {
    constructor(){
        super();
    }

    render(){
        if(this.props.type == 'cart'){
            if(this.props.count > this.props.maxQty){
                if(this.props.maxQty == 0){
                    return(
                        <StaticText 
                            style={styles.text}
                            property={'verification.outOfStock'}
                        />
                    )
                }
                else{
                    return(
                        <StaticText 
                            style={styles.text}
                            property={'verification.maxQuantity'}
                            params={{
                                qty: this.props.maxQty
                            }}
                        />
                    )
                }
            }
            else if(this.props.count == this.props.stock){
                return(
                    <StaticText 
                        style={styles.text}
                        property={'verification.maxQuantity'}
                        params={{
                            qty: this.props.stock
                        }}
                    />
                )
            }
            else return null;
        }
        else{
            if(this.props.count == this.props.stock){
                return(
                    <StaticText 
                        style={styles.text}
                        property={'verification.maxQuantity'}
                        params={{
                            qty: this.props.stock
                        }}
                    />
                )
            }
            else return null;
        }
    }
}

export default VerificationText;