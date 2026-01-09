import React, { useCallback, useEffect, useState } from 'react';
import FavouritesComponent from '../../components/Favourites';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../../global/Header';
import { flashMessageBottomSucess } from '../../constants/GConstant';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { getTranslation } from '../../localization/i18n/i18n.config';
import BarChartComponent from '../../global/BloodCountGraph';
import { ScreenNames } from '../../constants/AppConstants';
import { ApiEndPoints } from '../../api/APIConstant';
import { apiPromise } from '../../global/ApiHelper/apiPromise';
import {
  LoadType,
  usePaginatedList,
} from '../../global/ApiHelper/usePaginatedList';

const FavouritesContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const renderFavKitData = ({ item, index }: any) => {
    return (
      <BarChartComponent
        key={index}
        currentValue={item?.latest?.value}
        minValue={item?.latest?.minvalue}
        maxValue={item?.latest?.maxvalue}
        width={ScreenDimensions.screenWidth - getWidth(40)}
        height={getHeight(50)}
        reportName={item?.test?.name}
        reportValue={item?.latest?.value}
        reportItem={item}
        onpressreport={handleNavigateTestDetails}
        isTestCheck={true}
        isUnitShow={true}
      />
    );
  };

  const handlePressUnfav = () => {
    funCloseDeleteModel();
    flashMessageBottomSucess(getTranslation('unfavmessage'));
  };

  const funOpenDeleteModel = () => {
    setShowDeleteModel(true);
  };

  const funCloseDeleteModel = () => {
    setShowDeleteModel(false);
  };

  const handleNavigateTestDetails = () => {
    navigation.navigate(ScreenNames.TESTDETAILSCONTAINER);
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            navigation.goBack();
          }}
          dontShowStartBtn={false}
          showTitle={false}
          showSubTitle={false}
          showEndBtn={false}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  // ========================== API ==========================

  const fetchFavouritesList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.SETTINGS.GETLIKEREPORTLIST,
        method: 'POST',
        showLoader: loadType === LoadType.INITIAL,
        params: {
          page,
        },
      });

      // 🔥 NORMALIZE RESPONSE
      return {
        ...res,
        data: res?.data ?? [],
      };
    },
    [navigation],
  );

  const favourites: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    fetcher: fetchFavouritesList,
  });

  return (
    <FavouritesComponent
      insets={insets}
      navigation={navigation}
      renderFavKitData={renderFavKitData}
      showDeleteModel={showDeleteModel}
      funOpenDeleteModel={funOpenDeleteModel}
      funCloseDeleteModel={funCloseDeleteModel}
      handlePressUnfav={handlePressUnfav}
      isLoading={isLoading}
      favourites={favourites}
    />
  );
};

export default FavouritesContainer;
