import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image, Platform, Text, TouchableOpacity } from "react-native";
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
        };
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

        } else {
            if (this.props.updateMessage == "Up To Date") {
                this.checkOnBoarding();
            }
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

    checkOnBoarding = () => {
        setTimeout(() => {
            if (this.props.on_boarding) {
                actNav.reset(navConstant.Dashboard);
            } else {
                actNav.navigate(navConstant.OnBoarding);
            }
        }, 2000);
    };

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
});

const mapDispatchToProps = (dispatch) => ({
    version_checker: (req, res, err) =>
        dispatch(actions.utility.api.version_checker(req, res, err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
