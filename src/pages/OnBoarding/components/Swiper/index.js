import React, { Component } from 'react';
import {
    Platform,
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import styles from './styles';

class Swiper extends Component {

    static defaultProps = {
        horizontal: true,
        pagingEnabled: true,
        showHorizontalScrollIndicator: false,
        showVerticalScrollIndicator: false,
        bounces: false,
        scrollsToTop: false,
        removeClippedSubviews: true,
        automaticallyAdjustContentInsets: false,
        index: 0
    }

    state = this.initState(this.props);

    initState(props) {

        const total = props.children ? props.children.length || 1 : 0,
            // Current index
            index = total > 1 ? Math.min(props.index, total - 1) : 0,
            // Current offset
            offset = width * index;

        const state = {
            total,
            index,
            offset,
            width,
            height,
        };

        this.internals = {
            isScrolling: false,
            offset
        };

        return state;
    }

    onScrollBegin = e => {
        this.internals.isScrolling = true;
    }


    onScrollEnd = e => {
        this.internals.isScrolling = false;


        this.updateIndex(e.nativeEvent.contentOffset
            ? e.nativeEvent.contentOffset.x
            : e.nativeEvent.position * this.state.width
        );
    }

    onScrollEndDrag = e => {
        const { contentOffset: { x: newOffset } } = e.nativeEvent,
            { children } = this.props,
            { index } = this.state,
            { offset } = this.internals;

        if (offset === newOffset &&
            (index === 0 || index === children.length - 1)) {
            this.internals.isScrolling = false;
        }
    }

    updateIndex = (offset) => {
        const state = this.state,
            diff = offset - this.internals.offset,
            step = state.width;
        let index = state.index;

        if (!diff) {
            return;
        }

        index = parseInt(index + Math.round(diff / step), 10);

        this.internals.offset = offset;
        this.setState({
            index
        });
    }

    swipe = () => {
        if (this.internals.isScrolling || this.state.total < 2) {
            return;
        }

        const state = this.state,
            diff = this.state.index + 1,
            x = diff * state.width,
            y = 0;

        this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

        this.internals.isScrolling = true;

        if (Platform.OS === 'android') {
            setImmediate(() => {
                this.onScrollEnd({
                    nativeEvent: {
                        position: diff
                    }
                });
            });
        }
    }

    render() {
        const { children } = this.props;
        return (
            <View style={[styles.container, styles.fullScreen]}>
                <Text>Swiper</Text>
            </View>
        );
    }
}

export default Swiper;
