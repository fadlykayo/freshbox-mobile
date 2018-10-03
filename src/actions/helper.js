import { Alert } from 'react-native';
import { apiInstance } from './config';
import actNetwork from './network/reducer';

const helper = {};

const requestHandler = (type,payload,dispatch) => {
    switch(type){
        case 'get': return helper.get(payload,dispatch);
        case 'post': return helper.post(payload,dispatch);
        case 'put': return helper.put(payload,dispatch);
        default: return helper.get(payload,dispatch);
    }
}

helper.get = (payload,dispatch) => new Promise((resolve,reject) => {
    dispatch(actNetwork.set_loading_status(true));
    apiInstance.get(
        payload.path,
        {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + payload.header.apiToken,
                'X-Player': payload.header.onesignalToken,
            },
            params: payload.params
        })
    .then(response => {
        console.log('http response',response);
        dispatch(actNetwork.set_loading_status(false));
        resolve(response.data);
    })
    .catch(error => {
        console.log('http error',error);
		dispatch(actNetwork.set_loading_status(false));
        if(error.response){
            if(error.response.data.code == 401){
                Alert.alert(
                    'Unauthorized',
                    'You are not allowed to use this application.',
                    [
                        {text: 'OK', onPress: () => null},
                    ],
                    { cancelable: false }
                )
            } else reject(error.response.data);
        } else {
            dispatch(actNetwork.set_network_error_status(true));
        }
    });
});

helper.post = (payload,dispatch) => new Promise((resolve,reject) => {
    dispatch(actNetwork.set_loading_status(true));
    console.log("di helper",payload)
    apiInstance.post(
        payload.path,
        payload.body,
        {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + payload.header.apiToken,
                'X-Player': payload.header.onesignalToken,
            }
        })
    .then(response => {
        console.log('http response',response);
        dispatch(actNetwork.set_loading_status(false));
        resolve(response.data);
    })
    .catch(error => {
        console.log('http error',error);
		dispatch(actNetwork.set_loading_status(false));
        if(error.response){
            if(error.response.data.code == 401){
                Alert.alert(
                    'Unauthorized',
                    'You are not allowed to use this application.',
                    [
                        {text: 'OK', onPress: () => null},
                    ],
                    { cancelable: false }
                )
            } else reject(error.response.data);
        } else {
            dispatch(actNetwork.set_network_error_status(true));
        }
    });
});

helper.put = (payload,dispatch) => new Promise((resolve,reject) => {
    dispatch(actNetwork.set_loading_status(true));
    apiInstance.put(
        payload.path,
        payload.body,
        {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + payload.header.apiToken,
                'X-Player': payload.header.onesignalToken,
            }
    })
    .then(response => {
        console.log('http response',response);
        dispatch(actNetwork.set_loading_status(false));
        resolve(response.data);
    })
    .catch(error => {
        console.log('http error',error);
		dispatch(actNetwork.set_loading_status(false));
        if(error.response){
            if(error.response.data.code == 401){
                Alert.alert(
                    'Unauthorized',
                    'You are not allowed to use this application.',
                    [
                        {text: 'OK', onPress: () => null},
                    ],
                    { cancelable: false }
                )
            } else reject(error.response.data);
        } else {
            dispatch(actNetwork.set_network_error_status(true));
        }
    });
});

export default requestHandler;