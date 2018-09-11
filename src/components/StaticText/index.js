import React,{ PureComponent } from 'react';
import { Text } from 'react-native';
import lang from '@languages';

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

    renderText(property,language = 'english',params = {}){

        let propertyArray = property.trim().split('.');

        if(lang.translations[language]){

            let langObj = lang.translations[language];

            for(i=0; i<propertyArray.length; i++){

                if(langObj[propertyArray[i]]){

                    langObj = langObj[propertyArray[i]];

                } else {

                    langObj = property;
                    
                    break;

                }

            }

            if(langObj !== property){

                let stringOutput = langObj;
                let keyArray = Object.keys(params);

                if(keyArray.length > 0){

                    keyArray.map((e) => {

                        let regex = new RegExp(`{${e}}`,'g');

                        stringOutput = stringOutput.replace(regex,params[e]);
                        
                    });

                    this.setState({outputText: stringOutput});
                    // return stringOutput;

                } else {

                    this.setState({outputText: stringOutput});
                    // return stringOutput;
                
                };

            } else {

                this.setState({outputText: `${property} not found`});
                // return `${props} not found`;
            
            };

        } else {

            this.setState({outputText: `error: missing language ${language}`});
            // return 'error: missing language';
        
        };
    }

    render(){
        return(
            <Text style={this.props.style}>{this.state.outputText}</Text>
        )
    }
}

export default StaticText;