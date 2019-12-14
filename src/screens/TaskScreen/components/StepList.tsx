import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { Step } from 'src/models/task';
import { color } from 'src/config/theme';
import StepItem from './StepItem';

interface Props {
  steps: Step[];
}

const StepList: React.FC<Props> = ({ steps }) => {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <View
      style={{
        ...styles.contentContainer,
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <TouchableWithoutFeedback onPress={() => setIsExpand(!isExpand)}>
        <View style={styles.stepsTitle}>
          <Icon
            name={isExpand ? 'chevron-up-outline' : 'chevron-down-outline'}
            width={19}
            height={19}
            fill={color.secondary}
          />
          <Text category='s2' style={{ color: color.secondary, marginLeft: 5 }}>
            Steps
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ ...styles.stepsContainer }}>
        {isExpand && steps.map(step => (
          <StepItem key={step.id} step={step} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  stepsTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  stepsContainer: {
    display: 'flex'
  },
  title: {
    marginLeft: 5,
    maxWidth: '80%'
  }
});

export default StepList;
