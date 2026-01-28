// import React, { ReactNode, useCallback } from 'react';
// import { View, StyleSheet } from 'react-native';
// import OrderStatusComponent from './OrderStatusComponent';
// import { Colors } from '../constants/Colors';
// import { ZustandStores } from '../store';

// interface AppLayoutProps {
//   children: ReactNode;
//   isOrderPlaced: string;
// }

// const AppLayout = ({ children, isOrderPlaced }: AppLayoutProps) => {
//   console.log('remder app');

//   return (
//     <>
//       {/* Header / Order Status */}
//       {isOrderPlaced && <OrderStatusComponent orderStatus={isOrderPlaced} />}

//       {/* Main Content */}

//       {children}
//     </>
//   );
// };

// export default AppLayout;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.red40, // Same color as OrderStatusComponent background
//   },
//   content: {
//     flex: 1,
//     backgroundColor: Colors.red8C,
//     // overflow: 'hidden',
//   },
//   roundedTop: {
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//   },
// });

import React, { ReactNode, memo, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OrderStatusComponent from './OrderStatusComponent';
import { Colors } from '../constants/Colors';
import { navigationRef } from '../constants/utils/navigationRef';
import { ScreenNames } from '../constants/AppConstants';

interface AppLayoutProps {
  children: ReactNode;
  isOrderPlaced: string;
}

const AppLayout = memo(
  ({ children, isOrderPlaced }: AppLayoutProps) => {
    console.log('🔄 AppLayout render - orderStatus:', isOrderPlaced);

    const [currentRouteName, setCurrentRouteName] = useState<string>();

    useEffect(() => {
      const initialRoute = navigationRef.current?.getCurrentRoute()?.name;
      setCurrentRouteName(initialRoute);

      const unsubscribe = navigationRef.current?.addListener('state', () => {
        const route = navigationRef.current?.getCurrentRoute();
        setCurrentRouteName(route?.name);
      });

      return () => unsubscribe?.();
    }, []);

    // 🔥 List of screens where OrderStatus should be HIDDEN
    const hideOrderStatusScreens = [ScreenNames.CUSTOMSPLASHCONTAINER];

    const shouldHideOrderStatus = hideOrderStatusScreens.includes(
      currentRouteName || '',
    );

    console.log('shouldHideOrderStatus', shouldHideOrderStatus);

    return (
      <>
        {/* Header / Order Status - Only show when order exists */}
        {isOrderPlaced && !shouldHideOrderStatus && (
          <OrderStatusComponent orderStatus={isOrderPlaced} />
        )}

        {/* Main Content */}
        {children}
      </>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    // Only re-render if orderStatus actually changes
    return prevProps.isOrderPlaced === nextProps.isOrderPlaced;
  },
);

AppLayout.displayName = 'AppLayout';

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  content: {
    flex: 1,
  },
});
