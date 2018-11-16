import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import StaticText from '@components/StaticText';
import InnerContent from '../InnerContent';
import styles from './styles';

class Content extends Component {
    constructor() {
        super()
    }

    render() {
        console.log(this.props.bank)
        return (
            <View style={styles.container}>
                <View style={styles.subcontainer.top}>
                    <View style={styles.subcontainer.bank}>
                        <Image
                            style={styles.icon.bank(this.props.bank.name)}
                            source={this.props.bank.image}
                            resizeMode={'stretch'}
                        />
                    </View>
                    <View style={styles.subcontainer.desc}>
                        <StaticText
                            style={styles.text.bank}
                            property={this.props.bank.name}
                        />
                    </View>
                </View>
                <View style={styles.subcontainer.bottom}>
                    { 
                        this.props.bank.types.map((type,index) => (
                            <InnerContent
                                key={index}
                                index={index}
                                type={type}
                                bank={this.props.bank}
                                openSpecificData={this.props.openSpecificData}
                            />
                            // <View 
                            //     key={index} 
                            //     style={styles.subcontainer.instruction.main}
                            // >
                            //     <View style={styles.subcontainer.instruction.left}>
                            //         <View style={styles.icon.circle}>
                            //             <Text style={styles.text.index}>{index+1}</Text>
                            //         </View>
                            //     </View>
                            //     <View style={styles.subcontainer.instruction.right}>
                            //         <Text style={styles.text.instruction}>{content.name}</Text>
                            //     </View>
                            // </View>
                        )) 
                    }       
                </View>
            </View>
        );
    }
}

export default Content;
