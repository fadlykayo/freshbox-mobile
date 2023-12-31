import React, { Component } from 'react';
import { View, Dimensions, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import PageComponent from './components/PageComponent';
import BubbleComponent from './components/BubbleComponent';
import Button from './components/Button';
import Menu from '../Menu';
import { connect } from 'react-redux';
import styles from './styles';
import images from '@assets';
import actions from '@actions';

const { height, width } = Dimensions.get('window');

class OnBoarding extends Component {
    constructor(props) {
        super(props)
        this.state = {
            information: 
            [
                {
                    type: 'red',
                    title: 'onBoarding.content.first.title',
                    content: 'onBoarding.content.first.info',
                    button: 'onBoarding.button.skip',
                    image: images.icon_onboarding1,
                },
                {
                    type: 'white',
                    title: 'onBoarding.content.second.title',
                    content: ['onBoarding.content.second.info.1','onBoarding.content.second.info.2','onBoarding.content.second.info.3'],
                    button: 'onBoarding.button.skip',
                    image: images.icon_onboarding2,
                },
                {
                    type: 'red',
                    title: 'onBoarding.content.third.title',
                    content: 'onBoarding.content.third.info',
                    button: 'onBoarding.button.finish',
                    image: images.icon_onboarding3,
                },
            ],
            scrollX: 0,
            button: ['0', '1', '2'],
            bubble: 0,
            scrollEnabled: true,
            onLastPage: false,
        }
        this.listRef = null;
        this.navigateToMenu = this.navigateToMenu.bind(this);
        this.navigateToNextPage = this.navigateToNextPage.bind(this);
        this.getPositionIndex = this.getPositionIndex.bind(this);
        this.getPositionBubble = this.getPositionBubble.bind(this);
    }

    navigateToMenu() {
        this.props.on_boarding();
        actNav.reset(navConstant.Dashboard);
    }

    getPositionIndex(e) {
        this.setState({ scrollX: e.nativeEvent.contentOffset.x }, () => {
            this.getPositionBubble();
        })
    }
    
    getPositionBubble() {
        let position = Math.round(this.state.scrollX/width);
        if (this.state.bubble != position) {
            this.setState({ bubble: position })
        }
        if (position == 3) {
            this.setState({
                scrollEnabled: false,
                onLastPage: true
            })
        }
    }

    navigateToNextPage(index) {
        this.listRef.scrollTo({
            x: (index * width),
            y: 0,
            animated: true
        })
    }

    onLastPage () {
        this.props.on_boarding();
        return (
            <>
                <Menu/>
            </>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(e) => { this.listRef = e}}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={(e) => this.getPositionIndex(e)}
                    scrollEventThrottle={0}
                    scrollEnabled={this.state.scrollEnabled}
                >
                    { this.state.information.map((data, index) => {
                        return (
                            <PageComponent
                                key={index}
                                length={this.state.information.length}
                                data={data}
                                index={index+1}
                                navigateToMenu={this.navigateToMenu}
                                navigateToNextPage={this.navigateToNextPage}
                            />
                        )
                    }) }
                    
                    { this.onLastPage() }
                    
                </ScrollView>
                {
                    this.state.onLastPage ? 
                    null :
                    <BubbleComponent
                        bubble={this.state.bubble}
                        button={this.state.button}
                    />
                }
                
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    on_boarding: () => dispatch(actions.utility.reducer.on_boarding())
})

export default connect(null, mapDispatchToProps)(OnBoarding);
