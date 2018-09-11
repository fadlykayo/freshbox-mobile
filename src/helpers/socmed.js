// import modules
import FBSDK from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

const { LoginManager, GraphRequest, GraphRequestManager } = FBSDK;

const helper = {};

helper.facebookLogin = () => {
	LoginManager.logOut();
	return new Promise((resolve, reject) => {
		LoginManager.logInWithReadPermissions(['public_profile'])
		.then((result) => {
			if (result.isCancelled) {
				alert('Login was cancelled');
			} else {
				const infoRequest = new GraphRequest('/me',null,(error: ?Object, result: ?Object) => {
					if (error) {
						// console.log(error);
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
					reject(err)
				})
				.done();
			})
			.catch((err) => {
			// console.log('error signout',err);
			});
		})
		.catch((err) => {
			// console.log('error revoke',err);
			GoogleSignin.signIn()
			.then((user) => {
				resolve(user);
			})
			.catch((err) => {
				reject(err)
			})
			.done();
		});
	});
}

export default helper;
