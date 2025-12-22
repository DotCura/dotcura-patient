import React, { ReactNode, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import OrderStatusComponent from './OrderStatusComponent';
import { Colors } from '../constants/Colors';

interface AppLayoutProps {
  children: ReactNode;
  isOrderPlaced: string;
}

const AppLayout = ({ children, isOrderPlaced }: AppLayoutProps) => {
  const rendercChild = useCallback(() => {
    console.log("render child");
    
    return <View style={[styles.content, styles.roundedTop]}>{children}</View>;
  }, []);

  return (
    <View style={styles.container}>
      {/* Header / Order Status */}
      {isOrderPlaced && (
        <View>
          <OrderStatusComponent orderStatus={isOrderPlaced} />
        </View>
      )}

      {/* Main Content */}
      {/* {rendercChild()} */}
      <View style={[styles.content, styles.roundedTop]}>{children}</View>
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black, // Same color as OrderStatusComponent background
  },
  content: {
    flex: 1,
    backgroundColor:Colors.black,
    overflow: 'hidden',
  },
  roundedTop: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
