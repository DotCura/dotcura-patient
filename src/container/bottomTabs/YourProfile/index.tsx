import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import YourProfileComponent from '../../../components/bottomTabs/YourProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { activityOpacity } from '../../../constants/GConstant';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { images } from '../../../constants/Images';
import { Colors } from '../../../constants/Colors';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import VerticalBarChartProfile from '../../../global/VerticalBarChartProfile';
import { ScreenNames } from '../../../constants/AppConstants';
import ProgressBar from '../../../global/ProgressBar';

const YourProfileContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const analysisArray = [
    {
      id: '1',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
    {
      id: '2',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
    {
      id: '3',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
    {
      id: '4',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
    {
      id: '5',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
    {
      id: '6',
      reportdate: 24,
      reportmonth: 'dic',
      reportyear: '2026',
      kitname: 'Diabete',
      testname: 'Cuore',
      kitcount: 6,
      testcount: 2,
    },
  ];

  const userReport = [
    {
      id: '1',
      chartData: [
        { value: 1800, date: 'Set 23' },
        { value: 0.14, date: 'Set 24' },
        { value: 0.1, date: 'Dic 24' },
        { value: 0.26, date: 'Gen 25' },
        { value: 0.37, date: 'Set 25' },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Glicemia',
      reportlastValue: 0.37,
      status: '',
    },
    {
      id: '2',
      chartData: [
        { value: 1800, date: 'Set 23' },
        { value: 0.14, date: 'Set 24' },
        { value: 0.1, date: 'Dic 24' },
        { value: 0.26, date: 'Gen 25' },
        { value: 0.37, date: 'Set 25' },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Emoglobulina A2',
      reportlastValue: 0.37,
      status: 'Nuovo',
    },
    {
      id: '3',
      chartData: [
        { value: 1800, date: 'Set 23' },
        { value: 0.14, date: 'Set 24' },
        { value: 0.1, date: 'Dic 24' },
        { value: 0.26, date: 'Gen 25' },
        { value: 0.37, date: 'Set 25' },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Creatininemia',
      reportlastValue: 0.37,
      status: 'Dati non aggiornati',
    },
    {
      id: '4',
      chartData: [
        { value: 1800, date: 'Set 23' },
        { value: 0.14, date: 'Set 24' },
        { value: 0.1, date: 'Dic 24' },
        { value: 0.26, date: 'Gen 25' },
        { value: 0.37, date: 'Set 25' },
      ],
      maxvalue: 0.54,
      minvalue: 0.14,
      reporttitle: 'Ferritina',
      reportlastValue: 0.37,
      status: 'Nuovo',
    },
  ];

  const appointments = [
    {
      id: '1',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'waiting',
      date: '8/8/2025',
      tags: [
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
      ],
      doctor: {
        name: 'Federica S.',
        rating: 3,
        image: images.imgNurseUser,
      },
    },
    {
      id: '2',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'waiting',
      date: '8/8/2025',
      tags: [
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
      ],
      doctor: {
        name: 'Federica S.',
        rating: 3,
        image: images.imgNurseUser,
      },
    },
    {
      id: '3',
      orderid: '#889900',
      title: 'Diabetes',
      status: 'booked',
      tags: [
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
        'Urine',
        'Blood sugar',
      ],
      appointmentMessage:
        'The appointment is confirmed for Wednesday 10/8 by 10:00',
      totalStatus: 4,
      completedStatus: 2,
    },
  ];

  const familyMember = [
    {
      id: '1',
      familymembername: 'Giovanni (tu)',
    },
    {
      id: '2',
      familymembername: 'Pasquale',
    },
    {
      id: '3',
      familymembername: 'Maria',
    },
  ];

  const testReportList = [
    {
      id: 1,
      reportimage: images.imgHeart,
      totalanalysis: 22,
      currentanalysis: 17,
      testname: 'Cuore',
    },
    {
      id: 2,
      reportimage: images.imgKidney,
      totalanalysis: 22,
      currentanalysis: 0,
      testname: 'Reni',
    },
    {
      id: 3,
      reportimage: images.imgSoda,
      totalanalysis: 22,
      currentanalysis: 12,
      testname: 'Fegato',
    },
    {
      id: 4,
      reportimage: images.imgLolipop,
      totalanalysis: 22,
      currentanalysis: 18,
      testname: 'Diabete',
    },
  ];

  const [latestanalysisData, setLatestanalysisData] = useState(analysisArray);
  const [userReportData, setUserReportData] = useState(userReport);
  const [appointmentsData, setAppointmentsData] = useState(appointments);
  const [familyMembersData, setFamilyMembersData] = useState(familyMember);
  const [testReportData, setTestReportData] = useState(testReportList);
  const [searchVisible, setSearchVisible] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllTagsBooked, setShowAllTagsBooked] = useState(false);
  const [selectedName, setSelectedName] = useState('Giovanni (tu)');
  const [showPopup, setShowPopup] = useState(false);

  const totalStars = 5;
  const limitedData = latestanalysisData.slice(0, 4);
  const modifiedData =
    latestanalysisData.length > 4
      ? [...limitedData, { id: 'see_all', type: 'see_all' }]
      : limitedData;

  const ProgressBarStep = ({ currentStep, totalSteps = 4 }: any) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
      <View style={styles.progressBarContainer}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              index <= currentStep && styles.progressStepActive,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderItemLatestAnalysis = ({ item, index }: any) => {
    // if (item.type === 'see_all') {
    //   return (
    //     <TouchableOpacity
    //       activeOpacity={activityOpacity}
    //       onPress={handleNavigateOrderHistory}
    //       style={[
    //         styles.vwReportDate,
    //         {
    //           flexDirection: 'row',
    //         },
    //       ]}
    //     >
    //       <Text style={[styles.lblReportName]}>{getTranslation('seeall')}</Text>
    //       <Image source={images.imgRightBlack} />
    //     </TouchableOpacity>
    //   );
    // }
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        key={index}
        style={styles.vwReportDate}
        onPress={hanldeNavigateKitAnalysis}
      >
        <View style={styles.vwLightBlue}></View>
        <View>
          <Text style={styles.lblDateyear}>
            {getTranslation('analsisOf')}
            {item.reportdate} {item.reportmonth} {item.reportyear}
          </Text>
          <Text style={styles.lblKitAndTestName}>
            {getTranslation('kitlabeltext')} {item.kitname} ({item.kitcount}),{' '}
            {item.testname} ({item.testcount})
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTestReportData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={styles.btnTestReport}
      >
        <View style={styles.lblTestImage}>
          <Text style={styles.lblTestName} numberOfLines={1}>
            {item.testname}
          </Text>
          <Image source={item.reportimage} />
        </View>
        <View>
          <Text style={styles.lblTotalAnalysis}>
            <Text style={styles.lblCurrentanalysis}>
              {item.currentanalysis}{' '}
            </Text>
            {getTranslation('ditext')} {item.totalanalysis}{' '}
            {getTranslation('analitietext')}
          </Text>
          <ProgressBar
            current={item.currentanalysis}
            total={item.totalanalysis}
            height={6}
            backgroundColor={Colors.blueEF}
            gradientColors={[Colors.blue00250, Colors.blue002]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderUserReportData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={{
          borderWidth: 2,
          borderColor: Colors.grayED,
          borderRadius: 20,
          padding: 16,
          gap: getHeight(6),
          marginHorizontal: getWidth(16),
        }}
        onPress={() => navigation.navigate(ScreenNames.TESTDETAILSCONTAINER)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.lblReportTitle}>{item.reporttitle}</Text>
            <Text style={styles.lblLastValue}>
              {getTranslation('lastvalue')} {item.reportlastValue}
            </Text>
          </View>
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              gap: getWidth(8),
            }}
          >
            {item.status && (
              <View style={styles.vwstatusReport}>
                <Text style={styles.lblStatus}>{item.status}</Text>
              </View>
            )}
            <Image source={images.imgRightBlack} />
          </View>
        </View>
        {/* chartView */}
        <VerticalBarChartProfile
          data={item.chartData}
          chartMaxValue={item.maxvalue}
          chartMinValue={item.minvalue}
        />
      </TouchableOpacity>
    );
  };

  const renderItemAppointment = ({ item, index }: any) => {
    const visibleTags = showAllTags ? item.tags : item.tags.slice(0, 2);
    const extraCount = item.tags.length - 2;

    const visibleTagsAppoint = showAllTagsBooked
      ? item.tags
      : item.tags.slice(0, 2);
    const extraCountAppoint = item.tags.length - 2;
    return (
      <>
        {/* {item.status === 'waiting' ? (
          <Text style={styles.lblWaitingForResult}>
            {getTranslation('waitingforresultof')}
          </Text>
        ) : (
          <Text style={styles.lblWaitingForResult}>
            {getTranslation('appointmentbook')}
          </Text>
        )} */}
        {item.status === 'waiting' && (
          <TouchableOpacity
            activeOpacity={activityOpacity}
            style={{
              backgroundColor: Colors.blue1C04,
              padding: 4,
              borderRadius: 20,
              marginTop: getHeight(3),
            }}
          >
            <View
              style={{
                backgroundColor: Colors.blue1C08,
                padding: 4,
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  gap: getHeight(8),
                  backgroundColor: Colors.white,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: Colors.blue6B,
                  paddingHorizontal: getWidth(16),
                  paddingTop: getHeight(16),
                  paddingBottom: getHeight(12),
                }}
              >
                {/* orderDetailsView */}
                <View style={styles.vwMainOrderDetails}>
                  <View style={{ flex: 1, gap: getHeight(2) }}>
                    <Text style={styles.lblOrderTitle}>{item.title}</Text>
                    <Text style={styles.lblOrderDate}>{item.date}</Text>
                    <Text style={styles.lblOrderID}>{item.orderid}</Text>
                  </View>
                  <TouchableOpacity>
                    <Image source={images.imgRightBlack} />
                  </TouchableOpacity>
                </View>
                {/* tags */}
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: getHeight(5),
                  }}
                >
                  {visibleTags.map((tag: any, index: any) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: Colors.grayF3,
                        paddingHorizontal: getWidth(8),
                        height: getHeight(24),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 999,
                        marginRight: getWidth(2),
                      }}
                    >
                      <Text style={styles.lblTag}>{tag}</Text>
                    </View>
                  ))}

                  {/* Show +count only when collapsed */}
                  {!showAllTags && extraCount > 0 && (
                    <TouchableOpacity
                      onPress={() => setShowAllTags(true)}
                      style={{
                        backgroundColor: Colors.grayF3,
                        paddingHorizontal: getWidth(8),
                        paddingVertical: getHeight(4),
                        borderRadius: 999,
                        marginRight: getWidth(2),
                      }}
                    >
                      <Text style={styles.lblTag}>+{extraCount}</Text>
                    </TouchableOpacity>
                  )}
                </View>
                {/* nurseView */}
                <View style={styles.nurseview}>
                  <Image source={item.doctor.image} />
                  <Text>{item.doctor.name}</Text>

                  <View style={styles.starRow}>
                    {[...Array(totalStars)].map((_, index) => {
                      const isFilled = index < item.doctor.rating; // fill up to ratingStar
                      const iconName = isFilled && images.imgStarFill;

                      return <Image key={index} source={iconName} />;
                    })}
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {item.status === 'booked' && (
          <TouchableOpacity
            activeOpacity={activityOpacity}
            style={{
              marginTop: getHeight(8),
              gap: getHeight(14),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: Colors.black04,
              borderRadius: 20,
              padding: 16,
            }}
          >
            {/* orderDetailsView */}
            <View style={styles.vwMainOrderDetails}>
              <View
                style={{
                  flex: 1,
                  gap: getHeight(2),
                  marginRight: getWidth(15),
                }}
              >
                <Text style={styles.lblOrderTitleBooked}>{item.title}</Text>
                <Text style={styles.lblOrderDesBooked}>
                  {item.appointmentMessage}
                </Text>
              </View>
              <TouchableOpacity>
                <Image source={images.imgRightBlack} tintColor={Colors.white} />
              </TouchableOpacity>
            </View>
            {/* tags */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: getHeight(5),
              }}
            >
              {visibleTagsAppoint.map((tag: any, index: any) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: Colors.white08,
                    paddingHorizontal: getWidth(8),
                    height: getHeight(24),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 999,
                    marginRight: getWidth(2),
                  }}
                >
                  <Text
                    style={[
                      styles.lblTag,
                      {
                        color: Colors.white,
                      },
                    ]}
                  >
                    {tag}
                  </Text>
                </View>
              ))}

              {/* Show +count only when collapsed */}
              {!showAllTagsBooked && extraCountAppoint > 0 && (
                <TouchableOpacity
                  onPress={() => setShowAllTagsBooked(true)}
                  style={{
                    backgroundColor: Colors.white08,
                    paddingHorizontal: getWidth(8),
                    height: getHeight(24),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 999,
                    marginRight: getWidth(2),
                  }}
                >
                  <Text
                    style={[
                      styles.lblTag,
                      {
                        color: Colors.white,
                      },
                    ]}
                  >
                    +{extraCount}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <ProgressBarStep currentStep={1} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  const handlePressProfile = () => {
    navigation.navigate(ScreenNames.PROFILECONTAINER);
  };

  const hanldeNavigateKitAnalysis = () => {
    navigation.navigate(ScreenNames.KITANALYSISCONTAINER);
  };

  const handleNavigateOrderHistory = () => {
    navigation.navigate(ScreenNames.ORDERHISTORYCONTAINER);
  };

  return (
    <YourProfileComponent
      insets={insets}
      latestanalysisData={latestanalysisData}
      renderItemLatestAnalysis={renderItemLatestAnalysis}
      modifiedData={modifiedData}
      userReportData={userReportData}
      renderUserReportData={renderUserReportData}
      renderTestReportData={renderTestReportData}
      testReportData={testReportData}
      setSearchVisible={setSearchVisible}
      searchVisible={searchVisible}
      renderItemAppointment={renderItemAppointment}
      appointmentsData={appointmentsData}
      familyMembersData={familyMembersData}
      selectedName={selectedName}
      setSelectedName={setSelectedName}
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      handlePressProfile={handlePressProfile}
      hanldeNavigateKitAnalysis={hanldeNavigateKitAnalysis}
    />
  );
};

export default YourProfileContainer;
