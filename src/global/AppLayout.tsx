import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import OrderStatusComponent from './OrderStatusComponent';
import { Colors } from '../constants/Colors';

interface AppLayoutProps {
  children: ReactNode;
  isOrderPlaced: string;
}

const AppLayout = ({ children, isOrderPlaced }: AppLayoutProps) => {
  return (
    <View style={styles.container} >
      {/* Header / Order Status */}
      {isOrderPlaced && (
        <View>
          <OrderStatusComponent orderStatus={isOrderPlaced}/>
        </View>
      )}

      {/* Main Content */}
      <View style={[styles.content, isOrderPlaced && styles.roundedTop]}>
        {children}
      </View>
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black04, // Same color as OrderStatusComponent background
  },
  content: {
    flex: 1,
    // overflow: 'hidden',
  },
  roundedTop: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
