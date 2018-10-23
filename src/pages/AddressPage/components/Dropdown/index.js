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
            placeholder: '',
        }
        this.showDropdown = this.showDropdown.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this._renderLabel = this._renderLabel.bind(this);
        this.getPlaceholder = this.getPlaceholder.bind(this);
    }

    componentDidMount(){
        if(this.props.placeholder) this.getPlaceholder();
    }

    showDropdown(){
        let state = this.state;
        state.isOpen = !state.isOpen;
        this.setState(state);
        console.log("lihat data",this.props.data)
    }

    onChangeText(value){
        this.props.onChangeText(this.props.type,value);
    }

    getPlaceholder(){
        language.transformText(this.props.placeholder)
        .then((res) => {
            this.setState({placeholder: res});
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
        if(this.state.isOpen == true){
            return(
                <TouchableOpacity style={styles.container} onPress={this.showDropdown}>
                    {this._renderLabel(this.props)}
                    {
                        this.props.value ? (
                            <Text style={styles.formInput}>{this.props.type == 'zip_code'? this.props.value.place_name : this.props.value.name}</Text>
                        ) : (
                            <Text style={styles.formInput}>{this.state.placeholder}</Text>
                        )
                    }
                    <View style={styles.underline}/>
                    <View style={styles.showPasswordButton}>
                        <Image
                            resizeMode={'contain'} 
                            source={images.icon_dropdown_arrow_down}
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return(
                <View>
                    <TouchableOpacity style={styles.container} onPress={this.showDropdown}>
                        {this._renderLabel(this.props)}
                        {
                            this.props.value ? (
                                <Text style={styles.formInput}>{this.props.type == 'zip_code'? this.props.value.place_name : this.props.value.name}</Text>
                            ) : (
                                <Text style={styles.formInput}>{this.state.placeholder}</Text>
                            )
                        }
                        <View style={styles.underline}/>
                        <View style={styles.showPasswordButton}>
                            <Image
                                resizeMode={'contain'} 
                                source={images.icon_dropdown_arrow_up}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        nestedScrollEnabled={true}
                        style={styles.dropdownPlace}
                        data={this.props.data}
                        keyExtractor={(item, index) => index.toString()}
					    renderItem={({item,index}) => (
                            <TouchableOpacity key={index} style={styles.dropdown} onPress={() => {
                                this.onChangeText(item)
                                this.showDropdown()
                                }
                            }>
                                <Text style={styles.formInput}>{this.props.type == 'zip_code'? item.place_name : item.name}</Text>
                            </TouchableOpacity>
					    )}
                    />
                </View>
            )
        }


    }
}

export default Dropdown;