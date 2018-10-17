import lang from '@languages';

const helper = {};

helper.transformText = (property = 'no_props',language = 'id',params = {}) => new Promise((resolve) => {
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
                resolve(stringOutput);
            } else {
                resolve(stringOutput);
            };
        } else {
            resolve(`${property} not found`);
        };
    } else {
        resolve(`error: missing language ${language}`);
    };
});

export default helper;