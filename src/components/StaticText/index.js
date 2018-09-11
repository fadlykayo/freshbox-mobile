import React,{ PureComponent } from 'react';
import { Text } from 'react-native';
import { language } from '@helpers';

class StaticText extends PureComponent {
    constructor(){
        super();
        this.state={
            outputText: ''
        }
        this.renderText = this.renderText.bind(this);
    }

    componentDidMount(){
        this.renderText(this.props.property,this.props.language,this.props.params);
    }

    renderText(property = 'no_props',lang = 'english',params = {}){
        language.transformText(property,lang,params)
        .then((res) => {
            this.setState({outputText: res});
        });
    }

    render(){
        return(
            <Text style={this.props.style}>{this.state.outputText}</Text>
        )
    }
}

export default StaticText;