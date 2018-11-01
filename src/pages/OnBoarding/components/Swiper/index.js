import React, { Component } from 'react';
import {
    ScrollView,
    Platform,
    View,
    Button,
    Text
} from 'react-native';
import styles from './styles';
import { Dimensions } from 'react-native';
import PageComponent from '../PageComponent';

const { width, height } = Dimensions.get('window');


class Swiper extends Component {

    static defaultProps = {
        horizontal: true,
        pagingEnabled: true,
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        bounces: false,
        scrollsToTop: false,
        removeClippedSubviews: true,
        automaticallyAdjustContentInsets: false,
        index: 0
    };

    state = this.initState(this.props);

    initState(props) {

        const total = props.children ? props.children.length || 1 : 0,
            index = total > 1 ? Math.min(props.index, total - 1) : 0,
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

    renderScrollView = pages => {
        return (
            <ScrollView ref={component => { this.scrollView = component; }}
                {...this.props}
                contentContainerStyle={[styles.wrapper, this.props.style]}
                onScrollBeginDrag={this.onScrollBegin}
                onMomentumScrollEnd={this.onScrollEnd}
                onScrollEndDrag={this.onScrollEndDrag}
            >
                {pages.map((page, i) =>
                    <View style={[styles.fullScreen, styles.slide]} key={i}>
                        <Text>{page.title}</Text>
                    </View>
                )}
            </ScrollView>
        );
    }


    renderPagination = () => {
        if (this.state.total <= 1) {
            return null;
        }

        const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
            Dot = <View style={styles.dot} />;

        let dots = [];

        for (let key = 0; key < this.state.total; key++) {
            dots.push(key === this.state.index
                ? React.cloneElement(ActiveDot, { key })
                : React.cloneElement(Dot, { key })
            );
        }

        return (
            <View
                pointerEvents="none"
                style={[styles.pagination, styles.fullScreen]}
            >
                {dots}
            </View>
        );
    }

    renderButton = () => {
        const lastScreen = this.state.index === this.state.total - 1;
        return (
            <View pointerEvents="box-none" style={[styles.buttonWrapper, styles.fullScreen]}>
                {lastScreen
                    ? <Button text="Start Now" onPress={() => console.log('Send me to the app')} />
                    : <Button text="Continue" onPress={() => this.swipe()} />
                }
            </View>
        );
    }

    render = ({ children } = this.props) => {
        console.log(children)
        return (
            <View style={[styles.container, styles.fullScreen]}>
                {this.renderScrollView(children.props.data)}
                {this.renderPagination()}
                {this.renderButton()}
            </View>
        );
    }
}

export default Swiper;