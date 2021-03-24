import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import styles from '../styles'; 
import Button from '@components/Button';
import StaticText from '@components/StaticText';
import {Svg, Defs, G, Path} from 'react-native-svg';
import actions from '@actions';

const ArrowTooltip = () => {
	return (
	  <Svg width="80" height="132" viewBox="-0.5 -0.5 50 132">
		  <Defs />
        <G>
          <Path
            d="M 0 0 L 0 50 Q 0 50 10 50 L 300 50"
            fill="none"
            stroke="#ffffff"
            strokeMiterlimit="10"
            strokeDasharray={[5, 5]}
            pointerEvents="auto"
            strokeWidth={2}
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
              alignItems: 'flex-start',
              }}>
              <ArrowTooltip />
              <View style={{backgroundColor: 'white', top: 0, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 10}}>
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
                  onPress={() => handleStopTourGuide()}
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