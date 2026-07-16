import React, { ReactNode, memo, useEffect, useRef } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  StyleSheet,
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent';
import { Colors } from '../constants/Colors';
import { ScreenNames } from '../constants/AppConstants';
import { useNavigationStore } from '../store/NavigationStore';
import { ZustandStores } from '../store';
import { APIManager } from '../api/APIManager';
import { navigationRef } from '../constants/utils/navigationRef';
import { ApiEndPoints, MethodType, StatusCode } from '../api/APIConstant';

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

    const { LiveActivityModule } = NativeModules;
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

      const { LiveActivityManager } = NativeModules;
      if (!LiveActivityManager) return;

      const eventEmitter = new NativeEventEmitter(LiveActivityManager);

      const subscription = eventEmitter.addListener(
        'LiveActivityPushToken',
        event => {
          console.log('📲 Live Activity Token from iOS:', event.token);
          console.log('📦 Booking ID for token:', event.bookingId);

          if (!event.bookingId || !event.token) {
            console.log('❌ Missing bookingId or token');
            return;
          }

          _sendLiveActivityToken(event.token, event.bookingId);
        },
      );

      return () => subscription.remove();
    }, []);

    const _sendLiveActivityToken = async (
      liveactivity_token: string,
      bookingId: string,
    ) => {
      try {
        const params = {
          liveactivitytoken: liveactivity_token,
          booking_id: bookingId,
        };

        const callback = async (responseData: any) => {
          if (responseData.code === StatusCode.SUCCESS) {
            console.log('✅ Live Activity token saved');
          } else {
            console.log('❌ Token save failed');
          }
        };

        await APIManager.makeRequest({
          navigation: navigationRef,
          method: MethodType.POST,
          apiEndPoint: ApiEndPoints.LIVEACTIVITYTOKEN.GETLIVEACTIVITYTOKEN,
          callback,
          showLoader: false,
          params,
        });
      } catch (error) {
        console.log('send live activity token error:', error);
      }
    };

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
