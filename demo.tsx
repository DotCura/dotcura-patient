// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { styles } from './styles';
// import OnBoardingComponent from '../../../components/auth/OnBoarding';
// import AppHeader from '../../../global/Header';
// import { getTranslation } from '../../../localization/i18n/i18n.config';
// import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
// import { Colors } from '../../../constants/Colors';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { images } from '../../../constants/Images';

// const OnBoardingContainer = ({ navigation }: any) => {
//   const [signup, setSignUp] = useState([
//     { id: 1, title: 'personalData', screen: 'PersonalData' },
//     { id: 2, title: 'contactDetails', screen: 'ContactDetails' },
//     { id: 3, title: 'superBaby', screen: 'SuperBaby' },
//     { id: 4, title: 'superBaby', screen: 'SuperBaby' },
//     { id: 5, title: 'superBaby', screen: 'SuperBaby' },
//   ]);
//   const insets = useSafeAreaInsets();
//   function TopBar({ array, currentIndex, onClick }: any) {
//     return (
//       // <View style={styles.vwTopBar}>
//       <View style={[styles.vwMain, { paddingTop: insets.top + 10 }]}>
//         {/* Start Button */}

//         <TouchableOpacity style={styles.btnBack}>
//           <Image source={images.imgLeftArrow} />
//         </TouchableOpacity>

//         <View style={{ flexDirection: 'row', gap: getWidth(4) }}>
//           {array.map((item: any, index: any) => {
//             let barBackgroundColor = Colors.grayF3;
//             if (index === currentIndex) {
//               barBackgroundColor = Colors.blue1C;
//             } else if (index < currentIndex) {
//               barBackgroundColor = Colors.blue1C;
//             }

//             let TextColor = Colors.gray0F;
//             if (index === currentIndex) {
//               TextColor = Colors.white;
//             } else if (index < currentIndex) {
//               TextColor = Colors.white;
//             }
//             return (
//               <View
//                 key={index}
//                 style={{
//                   // backgroundColor: 'yellow',
//                   flexDirection: 'row',
//                 }}
//               >
//                 <View
//                   style={{
//                     backgroundColor: barBackgroundColor,
//                     height: getHeight(36),
//                     aspectRatio: 1,
//                     borderRadius: 1000,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                 >
//                   {/* 👇 Show tick for previous, number for current, gray number for next */}
//                 {index < currentIndex ? (
//                   <Image
//                     source={images.imgCheck}
//                     style={{
//                       width: getWidth(16),
//                       height: getWidth(16),
//                       tintColor: Colors.white,
//                     }}
//                     resizeMode="contain"
//                   />
//                 ) : (
//                   <Text style={{ color: TextColor }}>{item.id}</Text>)}
//                 </View>
//               </View>
//             );
//           })}
//         </View>

//         <Image source={images.imgDelete} style={{ opacity: 0 }} />
//       </View>
//     );
//   }

//   const header = () => {
//     navigation.setOptions({
//       header: () => (
//         <AppHeader
//           dontShowStartBtn={false}
//           showTitle={true}
//           centerTitle={getTranslation('selectcar')}
//           centerSubTitle={getTranslation('selectcar')}
//           showSubTitle={false}
//           showEndBtn={true}
//           isSaveIcon={true}
//           isHelpIcon={false}
//         />
//       ),
//     });
//   };

//   useEffect(() => {
//     header();
//   }, []);

//   return (
//     <OnBoardingComponent
//       navigation={navigation}
//       TopBar={TopBar}
//       signup={signup}
//     />
//   );
// };

// export default OnBoardingContainer;


// import { StyleSheet, Text, View } from 'react-native';
// import React, { useRef, useState } from 'react';
// import { styles } from './styles';
// import { ScreenNames } from '../../../constants/AppConstants';
// import { getTranslation } from '../../../localization/i18n/i18n.config';
// import CustomButton from '../../../global/Buttons';
// import { images } from '../../../constants/Images';
// import { Colors } from '../../../constants/Colors';
// import PrimaryTitleTextInput from '../../../global/PrimaryTitleTextInput';
// import PrimaryTitleMoblieNumber from '../../../global/PrimaryTitleMoblieNumber';
// import { formatPhoneNumber, ValidationConstant } from '../../../constants/TextInputConstant';
// import TitleSubtitle from '../../../global/TitleSubtitle';
// import { flashMessageSucess, flashMessageWarning } from '../../../constants/GConstant';
// import TopBar from '../../../global/TopBar/TopBar';

// const OnBoardingComponent = (props: any) => {
//   const [email,setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [callingCode, setCallingCode] = useState<any>('91');
//   const [emailError,setEmailError] = useState("");
//   const [PhonenumberError,setPhonenumberError] = useState("");
//   const emailref = useRef(null);
//   const moblieNoRef = useRef<any>(null);
//   // Set error on button click
// const handleSubmit = () => {
//   if (!email) {
//     setEmailError('Please enter a valid email address');
//     flashMessageSucess('Email is required');
//     return
//   }
//   if(!/^\S+@\S+\.\S+$/.test(email)){
//     setEmailError('Please enter a valid email address');
//     return
//   }
//   if(!phoneNumber){
//     setPhonenumberError('Phone number is required');
//     return
//   }
// };
// const onChangeEmail = (text:any) => {
//   setEmail(text);
//   // Clear error when user starts typing
 
// }
//  //onChange
//  const changeInput = (inputFieldName: any, text: any) => {
//   switch (inputFieldName) {
 
//     case 'Phone Number':
//       setPhoneNumber(formatPhoneNumber(text));
//       break;

    

//     default:
//       break;
//   }
// };

//   return (
//     <View style={{flex:1,backgroundColor:Colors.white}}>
//       <Text
//         onPress={() => props.navigation.navigate(ScreenNames.LOGINCONTAINER)}
//         style={{ marginTop: 100 }}
//       >
//         {getTranslation('name')}
//       </Text>
//       <CustomButton
//         btnPress={handleSubmit}
//         btnTitle={getTranslation('Savechanges')}
//         btnicon={true}
//         btnImage={images.imgDelete}
//       />
//        <TopBar
//           array={props.signup}
//           currentIndex={4}
//         />
//         <View style={{}}>
//          <PrimaryTitleTextInput
//           // editable={props.socialLogin ? false : true}
//           refs={emailref}
//           focusnext={() => moblieNoRef.current?.focus()} // ✅ Now this works
//           inputLabel={getTranslation('help')}
//           blur={false}
//           leftIcon={false}
//           keyaboardType={'email-address'}
//           label={getTranslation('email')}
//           value={email}
//           onChangeFun={onChangeEmail}
//           autoCapitalize={'none'}
//           errorMessage={emailError}
//           setErrorMessage={setEmailError}  // ✅ Just pass this once
//           maxlength={200}
//           isMultiline={false}
//           isBorder={true}
//         />
//          <PrimaryTitleMoblieNumber
//           blur={false}
//           label={getTranslation('mobilenumber')}
//           value={phoneNumber}
//           onChangeFun={(text: any) => changeInput('Phone Number', text)}
//           maxLength={ValidationConstant.maxMobileDigit}
//           callingCode={'91'}
//           setCallingCode={setCallingCode}
//           refs={moblieNoRef}
//           inputLabel={getTranslation('help')}
//           errorMessage={PhonenumberError}
//           setErrorMessage={setPhonenumberError}  // ✅ Just pass this once
//           // focusnext={() => props.emailRef.current.focus()}
//           leftIcon={false}
//           isBorder={true}
//         />
//         </View>

//         <TitleSubtitle
//         title={"Brijesh"}
//         subtitle={"123"}/>
//     </View>
//   );
// };

// export default OnBoardingComponent;
