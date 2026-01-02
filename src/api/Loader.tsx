import { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { getHeight } from '../constants/utils/Dimensions';
import { Colors } from '../constants/Colors';
export default class Loader extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return this.state.loading ? (
      <View style={styles.vwMain}>
        {/* <View style={styles.vwWhite}> */}
        <ActivityIndicator size="large" color={Colors.blue1C} />

        {/* </View> */}
      </View>
    ) : null;
  }

  toggleLoader(shouldShow: any) {
    this.setState({ loading: shouldShow }, () => {
      console.log(this.state.loading, 'loading');
    });
  }
}

const styles = StyleSheet.create({
  // View Style
  vwMain: {
    backgroundColor: '#00000030',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
