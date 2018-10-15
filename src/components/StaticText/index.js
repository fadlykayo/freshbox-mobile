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

    shouldComponentUpdate(nextProps,nextState){
        if(this.state.outputText != nextState.outputText){
            return true;
        } else {
            if(this.props.property != nextProps.property){
                this.renderText(nextProps.property,this.props.language,this.props.params);
                return true;
            } else {
                return false;
            }
        }
    }

    renderText(property = 'no_props',lang = 'bahasa',params = {}){
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