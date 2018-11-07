import React, { Component } from 'react';
import { View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import PageComponent from './components/PageComponent';
import BubbleComponent from './components/BubbleComponent';
import Button from './components/Button';
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
                    button: 'onBoarding.button.skip'
                },
                {
                    type: 'white',
                    title: 'onBoarding.content.second.title',
                    content: 'onBoarding.content.second.info',
                    button: 'onBoarding.button.skip'
                },
                {
                    type: 'red',
                    title: 'onBoarding.content.third.title',
                    content: 'onBoarding.content.third.info',
                    button: 'onBoarding.button.finish'
                },
            ],
            scrollX: 0,
            button: ['0', '1', '2'],
            bubble: 0,
        }
        this.listRef = null;
        this.navigateToMenu = this.navigateToMenu.bind(this);
        this.navigateToNextPage = this.navigateToNextPage.bind(this);
        this.getPositionIndex = this.getPositionIndex.bind(this);
        this.getPositionBubble = this.getPositionBubble.bind(this);
    }

    navigateToMenu() {
        this.props.on_boarding();
        actNav.reset(navConstant.Menu);
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
    }

    navigateToNextPage() {
        this.listRef.scrollToOffset({y:width, animated: true})
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ref={(e) => { this.listRef = e}}
                    data={this.state.information}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={(e) => this.getPositionIndex(e)}
                    scrollEventThrottle={0}
                    renderItem={({item, index}) => (
                        <View key={index}>
                            <PageComponent
                                length={this.state.information.length - 1}
                                data={item}
                                index={index}
                                navigateToMenu={this.navigateToMenu}
                                navigateToNextPage={this.navigateToNextPage}
                            />
                        </View>
                    )}
                />
                <BubbleComponent
                    bubble={this.state.bubble}
                    button={this.state.button}
                />
                <Button
                    bubble={this.state.bubble}
                    length={this.state.information.length - 1}
                    navigateToNextPage={this.navigateToNextPage}
                />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    on_boarding: () => dispatch(actions.utility.reducer.on_boarding())
})

export default connect(null, mapDispatchToProps)(OnBoarding);
