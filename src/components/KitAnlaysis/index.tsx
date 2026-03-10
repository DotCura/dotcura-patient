import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { ZustandStores } from '../../store';
import { constnatStyles } from '../../constants/Styles';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';
import { getTranslation } from '../../localization/i18n/i18n.config';
import BarChartComponent from '../../global/BloodCountGraph';
import { Colors } from '../../constants/Colors';
import {
  activityOpacity,
  currency,
  formatDateToSpanish,
  formatSampleDate24,
} from '../../constants/GConstant';
import CustomButton from '../../global/Buttons';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

const KitAnalysisComponent = (props: any) => {
  const { orderStatus } = ZustandStores.OrderstatusStore();
  const KitAnalysisProps = props?.KitAnalysisData;
  const totalStars = 5;

  // const formatKits = (kits: any[]) => {
  //   return kits
  //     .map(item => {
  //       const kitName = item?.kitname || '';
  //       const count = item?.kittest?.length || 0;
  //       const label =
  //         item.kitype === 'kit' ? getTranslation('kitlabeltextcheckout') : '';
  //       return `${label}${kitName} (${count})`;
  //     })
  //     .join(' , ');
  // };
  const formatKits = (kits: any[]) => {
    if (!kits?.length) return '';

    return kits
      .map(kit => {
        const kitName = kit?.kit?.name ?? '';
        const count = kit?.total_tests ?? 0;
        return `${kitName} (${count})`;
      })
      .join(' + ');
  };

  const RenderHeader = ({ KitAnalysisProps, totalStars }: any) => {
    return (
      <>
        {/* PRICE + ANALYSIS BACKGROUND */}
        <ImageBackground
          source={images.imgKitAnalysisback}
          style={styles.imgKitAnalysisBack}
        >
          <Text style={styles.lblCurrency}>
            {currency} {KitAnalysisProps?.booking_details?.total}
          </Text>

          <View style={styles.vwAnlysisOfAndDate}>
            <Text style={styles.lblAnalysisOf}>
              {getTranslation('analsisOf')}
            </Text>
            {KitAnalysisProps?.booking_details?.test_date && (
              <Text style={styles.lblOrderPlaceDate}>
                {formatDateToSpanish(
                  KitAnalysisProps?.booking_details?.test_date,
                )}
              </Text>
            )}
          </View>
        </ImageBackground>

        {/* ORDER ID + KIT DETAILS */}
        <View style={styles.veOrderIdKitDetails}>
          <Text style={styles.lblOrderId}>
            {getTranslation('orderidlabel')} #
            {KitAnalysisProps?.booking_details?.booking_number}
          </Text>

          <Text style={styles.kitandtestdetails}>
            {formatKits(KitAnalysisProps?.kits)}
          </Text>
        </View>

        {/* REBOOK BUTTON */}
        <View style={{ marginHorizontal: getWidth(16) }}>
          <CustomButton
            btnImage={images.imgCycle}
            btnicon={true}
            style={{
              backgroundColor: Colors.blueD1,
              marginTop: getHeight(12),
            }}
            textStyle={{ color: Colors.blue002, fontSize: fontSize.size16 }}
            btnPress={props.handlePressCheckout}
            btnTitle={getTranslation('rebookinglabel')}
          />
        </View>
      </>
    );
  };

  const RenderFooter = ({ KitAnalysisProps, totalStars }: any) => {
    return (
      <>
        {/* INFORMATION SECTION */}
        <View
          style={{ marginTop: getHeight(24), marginHorizontal: getWidth(16) }}
        >
          <Text style={styles.lblInformation}>
            {getTranslation('information')}
          </Text>

          <View style={{ marginTop: getHeight(12), gap: getHeight(16) }}>
            {/* Lab */}
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  gap: getWidth(12),
                }}
              >
                <Image source={images.imgLebo} />
                <View>
                  <Text style={styles.lblTitle}>
                    {getTranslation('samplecollectedon')}
                  </Text>
                  <Text style={styles.lblSubtitle}>
                    {formatSampleDate24(
                      KitAnalysisProps?.booking_details?.sample_collected_on,
                    )}
                  </Text>
                </View>
              </View>
            </View>

            {/* Nurse */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: getWidth(12),
              }}
            >
              <Image
                source={images.imgNurseUser}
                style={{
                  height: getHeight(24),
                  width: getHeight(24),
                  borderRadius: 999,
                }}
              />
              <View>
                <Text style={styles.lblTitle}>
                  {getTranslation('samletakeuser')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: getWidth(8),
                  }}
                >
                  <Text style={styles.lblSubtitle}>
                    {KitAnalysisProps?.booking_details?.nurse?.name}
                  </Text>

                  {/* <View style={styles.starRow}>
                    {[...Array(totalStars)].map((_, index) => {
                      const filled = index < KitAnalysisProps.nurse.rating;
                      return (
                        <Image
                          key={index}
                          source={filled ? images.imgStarFill : null}
                        />
                      );
                    })}
                  </View> */}
                </View>
              </View>
            </View>

            {/* Diagnose */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: getWidth(12),
              }}
            >
              <Image source={images.imgCalender} />
              <View>
                <Text style={styles.lblTitle}>
                  {getTranslation('diagnose')}
                </Text>
                <Text style={styles.lblSubtitle}>
                  {formatSampleDate24(
                    KitAnalysisProps?.booking_details?.latest_report_created_on,
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* INVITE DETAILS */}
        <View style={styles.vwInviteDetails}>
          <View style={styles.vwInBank}>
            <Text style={styles.txtinvitefriendTitle} numberOfLines={1}>
              {getTranslation('viewdocumenttitle')}
            </Text>

            <Text style={styles.txtInvoteFriendSubtitle} numberOfLines={5}>
              {getTranslation('viewdocumentsubtitle')}{' '}
            </Text>
            <TouchableOpacity
              style={styles.btnInviteFriend}
              onPress={props.handleOpenPDF}
            >
              <Text style={styles.lblOpenMap}>
                {getTranslation('viewpdflebel')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}>
            <Image source={images.imgfolder} tintColor={Colors.blue0019} />
          </View>
        </View>

        <View style={[styles.vwInviteDetails, { marginTop: getHeight(12) }]}>
          <View style={styles.vwInBank}>
            <Text style={styles.txtinvitefriendTitle} numberOfLines={1}>
              {getTranslation('needpaper')}
            </Text>

            <Text style={styles.txtInvoteFriendSubtitle} numberOfLines={5}>
              {getTranslation('collectondes')}{' '}
              <Text style={styles.lblLeboName}>
                {KitAnalysisProps?.lab_details?.name},{' '}
              </Text>
              {KitAnalysisProps?.lab_details?.address}
            </Text>
            <TouchableOpacity style={styles.btnInviteFriend}>
              <Text style={styles.lblOpenMap}>
                {getTranslation('comearrive')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}>
            <Image
              source={images.imgApartmentAnalysis}
              tintColor={Colors.black12}
            />
          </View>
        </View>
        {/* <View style={{ marginHorizontal: getWidth(16) }}>
          <CustomButton
            style={{ marginTop: getHeight(24) }}
            btnPress={props.handleOnPressSaveAddress}
            btnTitle={getTranslation('storeanalysis')}
          />
        </View> */}
      </>
    );
  };

  return (
    // <View
    //   style={[
    //     constnatStyles.vwContainer,
    //     {
    //       paddingHorizontal: 0,
    //     },
    //   ]}
    // >
    //   {/* vwHeader */}
    //   <View style={{}}>
    //     <View
    //       style={[
    //         styles.vwMain,
    //         {
    //           paddingTop:
    //             orderStatus == '' ? props.insets.top + 10 : getHeight(25),
    //         },
    //       ]}
    //     >
    //       <TouchableOpacity
    //         style={styles.btnBack}
    //         onPress={props.handleNavigationGoBack}
    //       >
    //         {/* <Image source={images.imgLeftArrow} /> */}
    //         <Text style={styles.lblseefullpicture}>
    //           {getTranslation('seethefullpicture')}
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>

    //   {/* analysisOfBack */}
    //   <ImageBackground
    //     source={images.imgKitAnalysisback}
    //     style={styles.imgKitAnalysisBack}
    //   >
    //     <Text style={styles.lblCurrency}>
    //       {currency} {KitAnalysisProps.price}
    //     </Text>
    //     <View style={styles.vwAnlysisOfAndDate}>
    //       <Text style={styles.lblAnalysisOf}>
    //         {getTranslation('analsisOf')}
    //       </Text>
    //       <Text style={styles.lblOrderPlaceDate}>
    //         {formatDateToSpanish(KitAnalysisProps.date)}
    //       </Text>
    //     </View>
    //   </ImageBackground>

    //   <View style={styles.veOrderIdKitDetails}>
    //     <Text style={styles.lblOrderId}>
    //       {getTranslation('orderidlabel')} {KitAnalysisProps.orderid}
    //     </Text>
    //     <Text style={styles.kitandtestdetails}>
    //       {formatKits(KitAnalysisProps.kits)}
    //     </Text>
    //   </View>
    //   <View style={{ marginHorizontal: getWidth(16) }}>
    //     <CustomButton
    //       btnImage={images.imgCycle}
    //       btnicon={true}
    //       style={{
    //         backgroundColor: Colors.blueD1,
    //         marginTop: getHeight(12),
    //       }}
    //       textStyle={{ color: Colors.blue002, fontSize: fontSize.size16 }}
    //       btnPress={props.handlePressDeleteAccount}
    //       btnTitle={getTranslation('rebookinglabel')}
    //     />
    //   </View>

    //   {/* scrollContent */}
    //   <ScrollView
    //     contentContainerStyle={[
    //       constnatStyles.keyboardContainer,
    //       {
    //         paddingHorizontal: getWidth(16),
    //         paddingBottom: getHeight(110),
    //       },
    //     ]}
    //     showsVerticalScrollIndicator={false}
    //     nestedScrollEnabled={true}
    //     style={{ flex: 1 }}
    //   >
    //     {/* testDetails */}
    //     <View style={{ marginTop: getHeight(24), gap: getHeight(32) }}>
    //       {KitAnalysisProps?.kits?.map((kit: any, kitIndex: any) => (
    //         <View key={kitIndex}>
    //           {/* Kit Name */}
    //           <Text style={styles.kitnamearray}>
    //             {kit.kitype === 'kit' && getTranslation('kitlabeltext')}{' '}
    //             {kit.kitname}
    //           </Text>
    //           <View style={{ gap: getHeight(12) }}>
    //             {/* Tests inside kit */}
    //             {kit.kittest.map((reportItem: any, reportIndex: any) => (
    //               <BarChartComponent
    //                 key={`${kitIndex}-${reportIndex}`}
    //                 currentValue={reportItem.currentvalue}
    //                 minValue={reportItem.minValue}
    //                 maxValue={reportItem.maxvalue}
    //                 width={ScreenDimensions.screenWidth - getWidth(40)}
    //                 height={getHeight(50)}
    //                 reportName={reportItem.reportname}
    //                 reportValue={reportItem.reportValue}
    //                 reportItem={reportItem}
    //               />
    //             ))}
    //           </View>
    //         </View>
    //       ))}
    //     </View>

    //     {/* NurseandOrderInformation */}
    //     <View style={{ marginTop: getHeight(24) }}>
    //       <Text style={styles.lblInformation}>
    //         {getTranslation('information')}
    //       </Text>
    //       <View style={{ marginTop: getHeight(12), gap: getHeight(16) }}>
    //         {/* leboview */}
    //         <View style={{ flexDirection: 'row' }}>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               flex: 1,
    //               alignItems: 'center',
    //               gap: getWidth(12),
    //             }}
    //           >
    //             <Image source={images.imgLebo} />
    //             <View>
    //               <Text style={styles.lblTitle}>
    //                 {getTranslation('samplecollectedon')}
    //               </Text>
    //               <Text style={styles.lblSubtitle}>
    //                 {KitAnalysisProps.dateandtime}
    //               </Text>
    //             </View>
    //           </View>
    //         </View>
    //         {/* nurseview */}
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             gap: getWidth(12),
    //           }}
    //         >
    //           <Image
    //             source={images.imgNurseUser}
    //             style={{
    //               height: getHeight(24),
    //               width: getHeight(24),
    //               borderRadius: 999,
    //             }}
    //           />
    //           <View>
    //             <Text style={styles.lblTitle}>
    //               {getTranslation('samletakeuser')}
    //             </Text>
    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 alignItems: 'center',
    //                 gap: getWidth(8),
    //               }}
    //             >
    //               <Text style={styles.lblSubtitle}>
    //                 {KitAnalysisProps.nurse.name}
    //               </Text>
    //               <View style={styles.starRow}>
    //                 {[...Array(totalStars)].map((_, index) => {
    //                   const isFilled = index < KitAnalysisProps.nurse.rating; // fill up to ratingStar
    //                   const iconName = isFilled && images.imgStarFill;

    //                   return <Image key={index} source={iconName} />;
    //                 })}
    //               </View>
    //             </View>
    //           </View>
    //         </View>
    //         {/* calenderDeliver */}
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             gap: getWidth(12),
    //           }}
    //         >
    //           <Image source={images.imgCalender} />
    //           <View>
    //             <Text style={styles.lblTitle}>
    //               {getTranslation('diagnose')}
    //             </Text>
    //             <Text style={styles.lblSubtitle}>
    //               {KitAnalysisProps.deliverdatetime}
    //             </Text>
    //           </View>
    //         </View>
    //       </View>
    //     </View>

    //     {/* vwInviteDetails */}
    //     <View style={styles.vwInviteDetails}>
    //       <View style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}>
    //         <Image source={images.imgfolder} tintColor={Colors.black12}></Image>
    //       </View>
    //       <View style={styles.vwInBank}>
    //         <Text style={styles.txtinvitefriendTitle} numberOfLines={1}>
    //           {getTranslation('needpaper')}
    //         </Text>
    //         <Text style={styles.txtInvoteFriendSubtitle} numberOfLines={5}>
    //           {getTranslation('collectondes')}{' '}
    //           <Text style={styles.lblLeboName}>
    //             {KitAnalysisProps.leboname},{' '}
    //           </Text>
    //           {KitAnalysisProps.address}
    //         </Text>
    //         <TouchableOpacity
    //           style={styles.btnInviteFriend}
    //           activeOpacity={activityOpacity}
    //         >
    //           <Text style={styles.lblOpenMap}>{getTranslation('openmap')}</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>

    //     {/* savepdfbtn */}
    //     <View style={{ marginTop: getHeight(24), gap: getHeight(24) }}>
    //       <CustomButton
    //         btnTitle={getTranslation('savepdf')}
    //         style={{ backgroundColor: Colors.grayED }}
    //         textStyle={{
    //           color: Colors.gray0F,
    //           fontFamily: fontsfamily.bold,
    //           fontSize: fontSize.size16,
    //         }}
    //       />
    //       <Text style={styles.lblDataSaveDes}>
    //         {getTranslation('datasavedes1')}
    //         <Text style={{ fontFamily: fontsfamily.heavy }}>
    //           {getTranslation('datasavedes2')}
    //         </Text>
    //       </Text>
    //     </View>
    //   </ScrollView>

    //   {/* btnsaveData */}
    //   <View
    //     style={{
    //       marginBottom:
    //          props.insets.bottom + getHeight(10),
    //       marginHorizontal: getWidth(16),
    //     }}
    //   >
    //     <CustomButton
    //       btnTitle={getTranslation('savedata')}
    //       btnPress={props.handleNavigationGoBack}
    //       // style={{ backgroundColor: Colors.grayED }}
    //       // textStyle={{
    //       //   color: Colors.gray0F,
    //       //   fontFamily: fontsfamily.bold,
    //       //   fontSize: fontSize.size16,
    //       // }}
    //     />
    //   </View>
    // </View>
    <>
      {/* vwHeader */}
      <View
        style={[
          styles.vwMain,
          {
            paddingTop:
              orderStatus == '' ? props.insets.top + 10 : getHeight(25),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.btnBackLeft}
          onPress={props.handleNavigationGoBack}
          activeOpacity={activityOpacity}
        >
          <Image source={images.imgLeftArrow} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={activityOpacity}
          style={styles.btnBack}
          onPress={props.handleGotoYourProfile}
        >
          {/* <Image source={images.imgLeftArrow} /> */}
          <Text style={styles.lblseefullpicture}>
            {getTranslation('seethefullpicture')}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={KitAnalysisProps?.kits}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingBottom: getHeight(50),
          backgroundColor: Colors.whiteF2,
        }}
        style={{
          backgroundColor: Colors.whiteF2,
        }}
        ListHeaderComponent={
          <RenderHeader
            KitAnalysisProps={KitAnalysisProps}
            totalStars={totalStars}
          />
        }
        renderItem={({ item: kit, index: kitIndex }) => (
          <View style={{ marginHorizontal: getWidth(16) }}>
            <Text style={styles.kitnamearray} numberOfLines={1}>
              {kit?.kit?.kit_type === 'CHECKUP' &&
                getTranslation('kitlabeltext')}
              {kit?.kit?.kit_type === 'CHECKUP' && ' '}
              {kit?.kit?.name}
            </Text>

            <View style={{ gap: getHeight(12) }}>
              {kit.results.map((reportItem: any, reportIndex: any) => (
                // <BarChartComponent
                //   key={`${kitIndex}-${reportIndex}`}
                //   currentValue={reportItem?.value}
                //   minValue={reportItem?.minvalue}
                //   maxValue={reportItem?.maxvalue}
                //   width={ScreenDimensions.screenWidth - getWidth(40)}
                //   height={getHeight(50)}
                //   reportName={reportItem.reportname}
                //   reportValue={reportItem.reportValue}
                //   reportItem={reportItem}
                //   onpressreport={props.handleNavigationTestDetails}
                // />
                <BarChartComponent
                  key={reportItem?.test_id}
                  currentValue={reportItem?.value}
                  minValue={reportItem?.minvalue}
                  maxValue={reportItem?.maxvalue}
                  width={ScreenDimensions.screenWidth - getWidth(40)}
                  height={getHeight(50)}
                  reportName={reportItem?.test?.name}
                  reportValue={reportItem?.value}
                  reportItem={reportItem}
                  // onpressBookNow={props.handleNavigateBookNow}
                  onpressreport={props.handleNavigationTestDetails}
                  isTestCheck={false}
                  isUnitShow={true}
                  unitName={reportItem?.unit}
                />
              ))}
            </View>
          </View>
        )}
        ListFooterComponent={
          <RenderFooter
            KitAnalysisProps={KitAnalysisProps}
            totalStars={totalStars}
          />
        }
      />
      {KitAnalysisProps?.booking_details?.is_save === 0 && (
        <View
          style={{
            marginHorizontal: getWidth(16),
            marginBottom: getHeight(40),
          }}
        >
          <CustomButton
            btnPress={props._saveReport}
            btnTitle={getTranslation('storeanalysis')}
          />
        </View>
      )}
    </>
  );
};

export default KitAnalysisComponent;
