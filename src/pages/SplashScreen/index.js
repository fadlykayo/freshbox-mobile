import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image, Platform, Text, TouchableOpacity, Linking } from "react-native";
import ProgressBar from "@components/ProgressBar";
import { actNav, navConstant } from "@navigations";
import images from "@assets";
import config from "@config";
import styles from "./styles";
import actions from "@actions";
import codePush from "react-native-code-push";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateType: "",
            isError: false,
            linking: ''
        };
        this.InMemoryData = {
            appLoaded: false
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.updateMessage == "Update installed. Restarting app..") {
    //         setTimeout(() => {
    //             codePush.restartApp();
    //         }, 1000);

    //         return true;
    //     } else {
    //         if (nextProps.updateMessage == "Up To Date") {
    //             this.checkOnBoarding();
    //             return true;
    //         }
    //     }
    //     return true;
    // }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.updateMessage !== this.props.updateMessage && this.props.updateMessage == "Update installed. Restarting app..") {
            setTimeout(() => {
                codePush.restartApp();
            }, 1000);

        } 
        if (this.props.updateMessage === "Up To Date") {
            setTimeout(() => {
                this.checkOnBoarding();
            }, 2500);
        }

        if (prevProps.codePushErr !== this.props.codePushErr && this.props.codePushErr) {
            this.setState({
                isError: true
            })
        }
    }

    componentDidMount() {
        this.versionChecker();
        // this.checkOnBoarding();
        if (Platform.OS === 'android') {
            if(!this.InMemoryData.appLoaded) {
                Linking.getInitialURL().then(url => {
                    this.handleDeepLink(url);
                    this.InMemoryData.appLoaded = true;
                });
            }
            } else {
              Linking.addEventListener('url', this.handleDeepLink);
            }
    }
    handleDeepLink = (e) => {
        if(e) {
            this.setState({
                linking: e
            })
        }
        // const route = e.url.replace(/.*?:\/\//g, '')
        // use route to navigate
        // ...
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleDeepLink)
    }

    versionChecker = () => {
        if (Platform.OS == "ios") {
            version = config.version.ios.split("-");
        } else {
            version = config.version.android.split("-");
        }

        let payload = {
            header: {
                apiToken: this.props.user ? this.props.user.authorization : "",
            },
            body: {
                version: version[0],
                key: "versioning",
            },
        };

        this.props.version_checker(
            payload,
            () => { },
            (err) => {
                if (err.data.current_version.active > 0) {
                    if (err.data.error_status !== "notrelease") {
                        let state = JSON.parse(JSON.stringify(this.state));

                        state.updateType = err.data.current_version.type;

                        this.setState(state);
                    }
                }
            }
        );
    };
    setDetailProduct = (product_code) => {
        let payload = {
                header: {
                    apiToken: this.props.user ? this.props.user.authorization : ''
                },
                body: {},
                params: {
                    product_code: product_code
                }
            };
        
            this.props.get_product_detail(payload,
                (res) => {
					if(res.code === 200) {
						this.props.set_modal_visible(true)
					}
                    // if(res) {
                    //     actNav.navigate(navConstant.BannerDetail, {
                    //         onbackground: true
                    //     })
                    // }
                },
                (err) => {
                    actNav.reset(navConstant.Dashboard);
                }
            )
    }

    checkOnBoarding = () => {
        if(this.state.linking !== '') {
            this.navigateWithDeepLink()
        } else {
            if (this.props.on_boarding) {
                actNav.reset(navConstant.Dashboard);
            } else {
                actNav.navigate(navConstant.OnBoarding);
            }
        } 
    };

    navigateWithDeepLink = () => {
        const url = this.state.linking.replace(/.*?:\/\//g, '');
        const id = url.match(/\/([^\/]+)\/?$/)[1]
        const routname = url.split('/')[0]
        if(routname === "0" ) {
            actNav.reset(navConstant.Dashboard);
        } else if(routname === '1' && id) {
            let payload = {
                header: {
                    apiToken: this.props.user ? this.props.user.authorization : ''
                },
                body: {},
                params: {
                    bannerID: id
                }
                };
            
                this.props.get_detail_banner(payload,
                (res) => {
                    if(res) {
                        actNav.reset(navConstant.BannerDetail, {
                            fromSplashScreen: true
                        })
                    }
                },
                (err) => {
                    actNav.reset(navConstant.Dashboard);
                }
                )
            Linking.removeEventListener('url', this.handleDeepLink)
        } else  if(routname === '2' && id){
            actNav.reset(navConstant.Dashboard,{
                id: id
            });
            this.setDetailProduct(id)
        }
        else {
            actNav.reset(navConstant.Dashboard);
        }
    }

    _renderVersion() {
        if (Platform.OS == "ios") {
            return config.version.ios;
        } else {
            return config.version.android;
        }
    }

    _onPressCheckOnBoarding = () => {
        if (this.props.on_boarding) {
            actNav.reset(navConstant.Dashboard);
        } else {
            actNav.navigate(navConstant.OnBoarding);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    resizeMode={"contain"}
                    source={images.icon_logo}
                    style={styles.logo}
                />

                <View style={styles.update.container}>
                    <Text style={styles.update.text}>{this.props.updateMessage}</Text>
                    {this.props.updateMessage == "Downloading Updates..." ? (
                        <>
                            <Text style={styles.update.text}>
                                {Number.isNaN(Math.round(
                                    (this.props.receivedBytes / this.props.totalBytes) * 100
                                ) ? 0 : Math.round(
                                    (this.props.receivedBytes / this.props.totalBytes) * 100
                                ))}
                            </Text>
                            <ProgressBar
                                progress={
                                    Number.isNaN(this.props.recievedBytes == 0
                                        ? 1 / this.props.totalBytes
                                        : this.props.receivedBytes / this.props.totalBytes) ? 0 :
                                        this.props.recievedBytes == 0
                                            ? 1 / this.props.totalBytes
                                            : this.props.receivedBytes / this.props.totalBytes
                                }
                                color="white"
                                borderColor="white"
                                useNativeDriver={true}
                            />

                            {this.state.updateType == "optional" ? (
                                <Text style={styles.update.skip}>Skip</Text>
                            ) : null}
                        </>
                    ) : null}

                    {this.state.isError === true ? (
                        <TouchableOpacity
                            onPress={this._onPressCheckOnBoarding}
                            style={styles.skip.container}
                        >
                            <Text style={styles.update.text}>Skip</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>

                <Text style={styles.version}>V{this._renderVersion()}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    on_boarding: state.utility.on_boarding,
    updateMessage: state.network.updateMessage,
    receivedBytes: state.network.receivedBytes,
    totalBytes: state.network.totalBytes,
    codePushErr: state.network.codePushErr,
    setModalVisible: state.product.setModalVisible

});

const mapDispatchToProps = (dispatch) => ({
    version_checker: (req, res, err) =>
        dispatch(actions.utility.api.version_checker(req, res, err)),
        get_detail_banner: (req, res, err) => dispatch(actions.banner.api.get_detail_banner(req, res, err)),
        set_modal_visible: (payload) => dispatch(actions.product.reducer.set_modal_visible(payload)),
        get_product_detail: (req, res, err) => dispatch(actions.product.api.get_product_detail(req, res, err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
