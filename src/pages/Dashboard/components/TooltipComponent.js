import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import styles from '../styles'; 
import Button from '@components/Button';
import StaticText from '@components/StaticText';
import {Svg, Defs, G, Path} from 'react-native-svg';
import actions from '@actions';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const ArrowTooltip = () => {
	return (
	  <Svg width="66px" height="56px" viewBox="-0.5 -0.5 50 56">
		  <Defs />
        <G>
          <Path
            d="M 7 0 L 7 37 Q 7 47 17 47 L 50.63 47"
            fill="none"
            stroke="#ffffff"
            strokeMiterlimit="10"
            strokeDasharray={[5, 5]}
            pointerEvents="auto"
            strokeWidth={2}
          />
          <Path
          d="M 55.88 47 L 48.88 50.5 L 50.63 47 L 48.88 43.5 Z" fill="#ffffff" stroke="#ffffff" strokeMiterlimit="10"
          />
        </G>
	  </Svg>
	);
  };

class TooltipComponent extends React.PureComponent {
     handleStopTourGuide = () => {
        this.props.handleStop()
        this.props.tourGuide(false)
    }
     render() {
        return (
            <View
                style={{
              display: 'flex',
              flexDirection: 'row',
              }}>
              <ArrowTooltip />
              <View style={{backgroundColor: 'white', top: 0, borderRadius: 5, paddingHorizontal: width * 0.02, paddingVertical: 10, marginTop: 25}}>
            <StaticText
              style={styles.modal.title}
              property={'changesArea.tooltip.title'}
            />
            <StaticText
              style={styles.modal.text}
              property={'changesArea.tooltip.content.tip1'}
            />
            <Text style={styles.modal.text}>
            <StaticText
              style={styles.modal.textBold}
              property={'changesArea.tooltip.content.tip2'}
            />
            <StaticText
              style={styles.modal.text}
              property={'changesArea.tooltip.content.tip3'}
            />
            </Text>
            <Text style={styles.modal.text}>
              <StaticText
                style={styles.modal.text}
                property={'changesArea.tooltip.content.tip4'}
              />
              <StaticText
              style={styles.modal.textBold}
              property={'changesArea.tooltip.content.tip5'}
            />
            </Text>
            <Text style={styles.modal.text}>
              <StaticText
                style={styles.modal.textBold}
                property={'changesArea.tooltip.content.tip6'}
              />
            </Text>
            <View style={styles.modal.buttonWrapper}>
              <View style={styles.modal.button.container}>
                <Button
                  type={'red'}
                  title={'changesArea.tooltip.button.next'}
                  onPress={() => this.handleStopTourGuide()}
                  fontSize={styles.modal.button.fontButton}
                />
              </View>
            </View>
              </View>
            </View>
          );
     }
   };

   const mapStateToProps = (state) => ({

   });
  
  const mapDispatchToProps = (dispatch) => ({
    tourGuide: (payload) =>
      dispatch(actions.utility.reducer.tourGuide(payload)),
  });

   export default (connect(mapStateToProps, mapDispatchToProps)(TooltipComponent));