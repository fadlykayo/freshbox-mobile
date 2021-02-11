// import modules
import FBSDK from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';

const { LoginManager, GraphRequest, GraphRequestManager } = FBSDK;

const helper = {};

helper.facebookLogin = () => {
	LoginManager.logOut();
	return new Promise((resolve, reject) => {
		LoginManager.logInWithPermissions(['public_profile','email'])
		.then((result) => {
			if (result.isCancelled) {
				alert('Login was cancelled');
			} else {
				const infoRequest = new GraphRequest('/me',{
					parameters: {
						'fields': {
							'string' : 'id,email,name'
						}
					}
				},(error,result) => {
					if (error) {
						reject(error)
					} else {
						resolve(result)
					}
				});
				new GraphRequestManager().addRequest(infoRequest).start();
			}
		},
		(error) => {
			alert('Login failed with error: ' + error);
		});
	});
}

helper.googleLogin = () => {
	return new Promise((resolve,reject) => {
		GoogleSignin.revokeAccess()
		.then(() => {
			
			GoogleSignin.signOut()
			.then(() => {
				
				GoogleSignin.signIn()
				.then((user) => {
					
					resolve(user);
				})
				.catch((err) => {
					// console.warn('error signout',err);
					reject(err)
				})
				.done();
			})
			.catch((err) => {
			// console.warn('error signout',err);
			});
		})
		.catch((err) => {
			GoogleSignin.signIn()
			.then((user) => {
				resolve(user);
			})
			.catch((err) => {
				// console.warn('error >>:',err);
				reject(err)
			})
			.done();
		});
	});
}

export default helper;
