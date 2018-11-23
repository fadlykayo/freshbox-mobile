import React,{ PureComponent } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import StaticText from '@components/StaticText';
import { language } from '@helpers';
import images from '@assets';
import styles from './styles';

class Dropdown extends PureComponent {
    constructor(props){
        super(props);
        this.state={
			isOpen: props.isOpen ? props.isOpen : false,
        }
        this.showDropdown = this.showDropdown.bind(this);
        this.onSpecificChangeText = this.onSpecificChangeText.bind(this);
        this._renderLabel = this._renderLabel.bind(this);
    }

    showDropdown(type){
        this.props.showDropdown(type);
    }

    onSpecificChangeText(value){
        this.props.onSpecificChangeText(this.props.type,value,this.props.nextValue);
    }
    
    _renderLabel(props){
        if(this.props.value.code.length == 0) return null;
        else return (
            <StaticText 
                style={styles.label}
                property={props.label}
            />
        )
    }

    render() {
        return(
            <View>
                <TouchableOpacity style={styles.container} onPress={() => this.showDropdown(this.props.type)}>
                    {this._renderLabel(this.props)}
                    { this.props.value.code.length == 0 
                        ? (<StaticText
                            style={styles.formInput}
                            property={this.props.placeholder}
                        />) 
                        : (<Text style={styles.formInput}>{this.props.type == 'zip_code'? this.props.value.place_name : this.props.value.name}</Text>)
                    }
                    <View style={styles.underline}/>
                    <View style={styles.showPasswordButton}>
                        <Image
                            resizeMode={'contain'} 
                            source={this.props.isOpen ? images.icon_dropdown_arrow_up : images.icon_dropdown_arrow_down}
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
                { this.props.isOpen
                    ? (<FlatList
                            nestedScrollEnabled={true}
                            style={styles.dropdownPlace}
                            data={this.props.data}
                            keyExtractor={(item, index) => index.toString()}
				            renderItem={({item,index}) => (
                                <TouchableOpacity key={index} style={styles.dropdown} onPress={() => {
                                    this.onSpecificChangeText(item)
                                }}>
                                    <Text style={styles.formInput}>{this.props.type == 'zip_code'? item.place_name : item.name}</Text>
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