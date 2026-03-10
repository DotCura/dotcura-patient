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

//working two time show splash screen
// import React, { ReactNode, memo, useEffect, useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import OrderStatusComponent from './OrderStatusComponent';
// import { Colors } from '../constants/Colors';
// import { navigationRef } from '../constants/utils/navigationRef';
// import { ScreenNames } from '../constants/AppConstants';

// interface AppLayoutProps {
//   children: ReactNode;
//   isOrderPlaced: string;
// }

// const AppLayout = memo(
//   ({ children, isOrderPlaced }: AppLayoutProps) => {
//     console.log('🔄 AppLayout render - orderStatus:', isOrderPlaced);

//     const [currentRouteName, setCurrentRouteName] = useState<string>();

//     useEffect(() => {
//       const initialRoute = navigationRef.current?.getCurrentRoute()?.name;
//       setCurrentRouteName(initialRoute);

//       const unsubscribe = navigationRef.current?.addListener('state', () => {
//         const route = navigationRef.current?.getCurrentRoute();
//         setCurrentRouteName(route?.name);
//       });

//       return () => unsubscribe?.();
//     }, []);

//     // 🔥 List of screens where OrderStatus should be HIDDEN
//     const hideOrderStatusScreens = [ScreenNames.CUSTOMSPLASHCONTAINER];

//     const shouldHideOrderStatus = hideOrderStatusScreens.includes(
//       currentRouteName || '',
//     );

//     console.log('shouldHideOrderStatus', shouldHideOrderStatus);

//     return (
//       <>
//         {/* Header / Order Status - Only show when order exists */}
//         {isOrderPlaced && !shouldHideOrderStatus && (
//           <OrderStatusComponent orderStatus={isOrderPlaced} />
//         )}

//         {/* Main Content */}
//         {children}
//       </>
//     );
//   },
//   (prevProps, nextProps) => {
//     // Custom comparison to prevent unnecessary re-renders
//     // Only re-render if orderStatus actually changes
//     return prevProps.isOrderPlaced === nextProps.isOrderPlaced;
//   },
// );

// AppLayout.displayName = 'AppLayout';

// export default AppLayout;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.black,
//   },
//   content: {
//     flex: 1,
//   },
// });

import React, { ReactNode, memo, useEffect, useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import OrderStatusComponent from './OrderStatusComponent';
import { Colors } from '../constants/Colors';
import { ScreenNames } from '../constants/AppConstants';
import { useNavigationStore } from '../store/NavigationStore';
import { ZustandStores } from '../store';
import {
  endLiveActivity,
  startLiveActivity,
  updateLiveActivity,
} from '../liveactivity/LiveActivityService';
import { getTranslation } from '../localization/i18n/i18n.config';

interface AppLayoutProps {
  children: ReactNode;
  isOrderPlaced: string;
}

const AppLayout = memo(
  ({ children, isOrderPlaced }: AppLayoutProps) => {
    const currentRouteName = useNavigationStore(
      (state: any) => state.currentRoute,
    );

    console.log('🔄 AppLayout render - orderStatus:', isOrderPlaced);
    console.log('📍 Current Route:', currentRouteName);

    // Get order data from store
    const orderData: any = ZustandStores.OrderstatusStore(
      state => state.orderData,
    );
    console.log(
      '🚀 ~ file: index.tsx:75 ~ OrderStatusComponent ~ orderData:',
      orderData,
    );

    // 🔥 Treat NULL as splash
    const shouldHideOrderStatus =
      !currentRouteName ||
      currentRouteName === ScreenNames.CUSTOMSPLASHCONTAINER;

    const hasStartedLiveActivity = useRef(false);

    useEffect(() => {
      if (Platform.OS !== 'ios') return;
      // if (!orderStatus || !orderData?.booking_id) return;

      console.log('📱 Live Activity status update:', orderData?.status);
      console.log('📱 Live Activity status update:data', orderData);

      if (orderData?.status === 'Request' && !hasStartedLiveActivity.current) {
        startLiveActivity(
          orderData.booking_id,
          'Ordine inviato',
          'La tua richiesta è stata registrata. Stiamo cercando un infermiere per te...',
          1,
        );

        hasStartedLiveActivity.current = true;
      }

      if (orderData?.status === 'Accept') {
        updateLiveActivity(
          'Accept',
          'Visita confermata',
          'Ottime notizie! La visita è confermata per oggi alle.',
          2,
        );
      }
      if (orderData?.status === 'Modified') {
        updateLiveActivity(
          'Modified',
          'Visita modificata',
          'L’infermiere ci ha comunicato che verrà a casa tua entro le',
          1,
        );
      }

      if (orderData?.status === 'start_visit') {
        updateLiveActivity(
          'start_visit',
          orderData?.time || '20-30 minuti',
          'L’operatore è quasi da te. Tieni d’occhio il telefono o il citofono.',
          3,
        );
      }

      if (orderData?.status === 'arrived') {
        updateLiveActivity(
          'arrived',
          `${orderData?.name || 'Nurse'} è qui.`,
          'È il momento di farsi visitare.',
          4,
        );
      }

      if (orderData?.status === 'Rejected') {
        endLiveActivity();
        hasStartedLiveActivity.current = false;
      }
      if (orderData?.status === '') {
        endLiveActivity();
        hasStartedLiveActivity.current = false;
      }
    }, [orderData?.status, orderData]);

    return (
      <>
        {isOrderPlaced && !shouldHideOrderStatus && (
          <OrderStatusComponent orderStatus={isOrderPlaced} />
        )}

        {children}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.isOrderPlaced === nextProps.isOrderPlaced,
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
