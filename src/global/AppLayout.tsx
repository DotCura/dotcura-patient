import React, { ReactNode, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import OrderStatusComponent from './OrderStatusComponent';
import { Colors } from '../constants/Colors';

interface AppLayoutProps {
  children: ReactNode;
  isOrderPlaced: string;
}

const AppLayout = ({ children, isOrderPlaced }: AppLayoutProps) => {
  console.log("remder app");
  
  return (
    <>
      {/* Header / Order Status */}
      {isOrderPlaced && (
          <OrderStatusComponent orderStatus={isOrderPlaced} />
      )}

      {/* Main Content */}
    
    {children}
    </>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.red40, // Same color as OrderStatusComponent background
  },
  content: {
    flex: 1,
    backgroundColor:Colors.red8C,
    // overflow: 'hidden',
  },
  roundedTop: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
