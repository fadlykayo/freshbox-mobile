import React,{ Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import StaticText from '@components/StaticText';
import { language } from '@helpers';
import images from '@assets';
import styles from './styles';

class Dropdown extends Component {
    constructor(props){
        super(props);
        this.state={
			isOpen: props.isOpen ? props.isOpen : false,
        }
        this.submitSubject = this.submitSubject.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this._renderLabel = this._renderLabel.bind(this);
    }

    showDropdown() {
        this.props.showDropdown(null,this.props.type)
    }

    submitSubject() {
        this.props.submitSubject(this.props.type,this.props.nextValue)
    }

    onChangeText(value){
        language.transformText(value)
        .then((res) => {
            this.props.onChangeText(this.props.type,res);
        });
    }
    
    _renderLabel(props){
        if(this.props.value.length == 0) return null;
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
                <TouchableOpacity style={styles.container} onPress={this.showDropdown}>
                    {this._renderLabel(this.props)}
                    {
                        this.props.value.length == 0 ? (
                            <StaticText
                                style={styles.formInput}
                                property={this.props.placeholder}
                            />
                        ) : (
                            <Text style={styles.formInput}>{this.props.value}</Text>
                        )
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
                                this.onChangeText(item.name);
                                this.submitSubject();
                                }
                            }>
                                <StaticText
                                    style={styles.formInput}
                                    property={item.name}
                                />
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