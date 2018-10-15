import React,{ Component } from 'react';
import { Text } from 'react-native';
import { language } from '@helpers';

class StaticText extends Component {
    constructor(props){
        super(props);
        this.state={
            outputText: '',
        }
        this.renderText = this.renderText.bind(this);
    }

    componentDidMount(){
        this.renderText(this.props.property,this.props.language,this.props.params);
    }

    renderText(property = 'no_props',lang = 'id',params = {}){
        language.transformText(property,lang,params)
        .then((res) => {
            this.setState({outputText: res});
        });
    }

    render(){
        if(this.props.numberOfLines && this.props.ellipsizeMode) return(
            <Text
                style={this.props.style}
                numberOfLines={this.props.numberOfLines}
                ellipsizeMode={this.props.ellipsizeMode}
            >
                {this.state.outputText}
            </Text>
        )
        else return(
            <Text style={this.props.style}>{this.state.outputText}</Text>
        )
    }
}

export default StaticText;