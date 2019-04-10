import React,{ PureComponent } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, Animated } from 'react-native';
import StaticText from '@components/StaticText';
import images from '@assets';
import styles from './styles';

class Dropdown extends PureComponent {
    constructor(props){
        super(props);
        this.state={
			isOpen: props.isOpen ? props.isOpen : false,
            height: new Animated.Value(0)
        }
        this.showDropdown = this.showDropdown.bind(this);
        this.onSpecificChangeText = this.onSpecificChangeText.bind(this);
        this._renderLabel = this._renderLabel.bind(this);
    }

    componentDidUpdate() {
        if(this.props.isOpen) {
            this.startAnimation();
        };
    };
    

    showDropdown(type){
        this.props.showDropdown(type);
    }

    onSpecificChangeText(value){
        this.props.onSpecificChangeText(this.props.type,value,this.props.nextValue);
    }
    
    _renderLabel(props){
        if(this.props.value.code.length == 0) return null;
        else return (
            <Text style={styles.text.label}>
                <StaticText
                    property={props.label}
                />
                { props.required.length == 0
                    ? null
                    : <StaticText
                    property={props.required}
                />
                }
            </Text>
        )
    }

    startAnimation () {

        Animated.spring(
            this.state.height,
            {
                toValue: 200,
                duration: 500
            }
        ).start();

    };

    render() {
        return(
            <View>
                <TouchableOpacity style={styles.container} onPress={() => this.showDropdown(this.props.type)}>
                    {this._renderLabel(this.props)}
                    { this.props.value.code.length == 0 
                        ? (<StaticText
                            style={styles.text.placeholder}
                            property={this.props.placeholder}
                        />) 
                        : (<Text style={[styles.text.placeholder,styles.text.content]}>{this.props.type == 'zip_code'? this.props.value.place_name : this.props.value.name}</Text>)
                    }
                    <View style={styles.underline}/>
                    <View style={styles.arrow.place}>
                        <Image
                            resizeMode={'contain'} 
                            source={this.props.isOpen ? images.icon_arrow_up_red : images.icon_arrow_down_red}
                            style={styles.arrow.icon}
                        />
                    </View>
                </TouchableOpacity>
                { this.props.isOpen
                    ? (<FlatList
                            nestedScrollEnabled={true}
                            style={styles.dropdown.place(this.state.height)}
                            data={this.props.data}
                            keyExtractor={(item, index) => index.toString()}
				            renderItem={({item,index}) => (
                                <TouchableOpacity key={index} style={styles.dropdown.part} onPress={() => {
                                    this.onSpecificChangeText(item)
                                }}>
                                    <Text style={[styles.text.placeholder,styles.text.content]}>{this.props.type == 'zip_code'? item.place_name : item.name}</Text>
                                </TouchableOpacity>
				            )}
                        />)
                    : null
                }
            </View>
        )
    }
}

export default Dropdown;