import { PermissionsAndroid } from 'react-native';

const permission = {};

permission.requestSaveExternal = () => new Promise((resolve,reject) => {
    PermissionsAndroid.requestMultiple(
        [
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ],
        {
            'title': 'Permission',
            'message': 'need access'
        }
    )
    .then(res => {
        if(res === PermissionsAndroid.RESULTS.GRANTED){
            resolve();
        }
        else{
            resolve();   
        }
    })
    .catch(err => {
        reject()
    })
})

export default permission;