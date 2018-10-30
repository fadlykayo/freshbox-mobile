import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import PageComponent from './components/PageComponent';
import { connect } from 'react-redux';
import styles from './styles';
import actions from '@actions';

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
            ]
        }
        this.navigateToMenu = this.navigateToMenu.bind(this);
    }

    navigateToMenu() {
        this.props.on_boarding();
        actNav.reset(navConstant.Menu);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.information}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={true}
                    renderItem={({item, index}) => (
                        <View key={index}>
                            <PageComponent
                                length={this.state.information.length - 1}
                                data={item}
                                index={index}
                                navigateToMenu={this.navigateToMenu}
                            />
                        </View>
                    )}
                />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    on_boarding: () => dispatch(actions.utility.reducer.on_boarding())
})

export default connect(null, mapDispatchToProps)(OnBoarding);
