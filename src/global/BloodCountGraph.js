// import React from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import { Svg, Rect } from 'react-native-svg';
// import { fontsfamily } from '../constants/FontFamily';
// import { fontSize } from '../constants/FontSizes';
// import { Colors } from '../constants/Colors';
// import { getHeight, getWidth } from '../constants/utils/Dimensions';
// import { activityOpacity } from '../constants/GConstant';

// // Bar counts
// const LEFT_SMALL_COUNT = 6;
// const MIDDLE_COUNT = 30;
// const RIGHT_SMALL_COUNT = 6;

// // Derived index ranges
// const TOTAL_BARS = 1 + LEFT_SMALL_COUNT + MIDDLE_COUNT + RIGHT_SMALL_COUNT;
// const LEFT_EXTREME_BAR = 0;
// const LEFT_SMALL_BARS_START = 1;
// const LEFT_SMALL_BARS_END = LEFT_SMALL_BARS_START + LEFT_SMALL_COUNT - 1;
// const MIDDLE_BARS_START = LEFT_SMALL_BARS_END + 1;
// const MIDDLE_BARS_END = MIDDLE_BARS_START + MIDDLE_COUNT - 1;
// const RIGHT_SMALL_BARS_START = MIDDLE_BARS_END + 1;
// const RIGHT_SMALL_BARS_END = RIGHT_SMALL_BARS_START + RIGHT_SMALL_COUNT - 1;

// // Base constants
// const MAX_HEIGHT = 22;
// const SMALL_HEIGHT = 6;
// const BAR_WIDTH = 6;
// const CHART_WIDTH = 330;
// const CHART_HEIGHT = 28;
// const RAMP_FRACTION_PER_SIDE = 0.3;

// const BarChartComponent = ({
//   currentValue = 0,
//   minValue = 0,
//   maxValue = 100,
//   ...props
// }) => {
//   // ✅ Safe value handling
//   const safeMin = Number.isFinite(minValue) ? minValue : 0;
//   const safeMax =
//     Number.isFinite(maxValue) && maxValue > safeMin ? maxValue : safeMin + 1;
//   const safeValue = Number.isFinite(currentValue) ? currentValue : safeMin;

//   // ✅ Bar spacing
//   const barSpacing = CHART_WIDTH / TOTAL_BARS;

//   // ✅ Color logic variables
//   let MAIN_COLOR = '#F5949F';
//   let OUT_COLOR = '#F9B6BE';
//   let INDICATOR_COLOR = '#CA1C2E';

//   // ✅ Determine bar index and range type
//   let indicatorIndex;
//   let rangeType = 'normal'; // 'normal' | 'moderate' | 'extreme'

//   if (safeValue < safeMin) {
//     const extremeThreshold = safeMin * 0.3;
//     if (safeValue <= extremeThreshold) {
//       indicatorIndex = LEFT_SMALL_BARS_START;
//       rangeType = 'extreme';
//     } else {
//       const normalized =
//         (safeValue - extremeThreshold) / (safeMin - extremeThreshold);
//       indicatorIndex = Math.round(
//         LEFT_SMALL_BARS_START +
//           normalized * (LEFT_SMALL_BARS_END - LEFT_SMALL_BARS_START),
//       );
//       rangeType = 'moderate';
//     }
//   } else if (safeValue > safeMax) {
//     const extremeThreshold = safeMax * 1.5;
//     if (safeValue >= extremeThreshold) {
//       indicatorIndex = RIGHT_SMALL_BARS_END;
//       rangeType = 'extreme';
//     } else {
//       const normalized = (safeValue - safeMax) / (extremeThreshold - safeMax);
//       indicatorIndex = Math.round(
//         RIGHT_SMALL_BARS_START +
//           normalized * (RIGHT_SMALL_BARS_END - RIGHT_SMALL_BARS_START),
//       );
//       rangeType = 'moderate';
//     }
//   } else {
//     const normalized = (safeValue - safeMin) / (safeMax - safeMin);
//     indicatorIndex = Math.round(
//       MIDDLE_BARS_START + normalized * (MIDDLE_BARS_END - MIDDLE_BARS_START),
//     );
//     rangeType = 'normal';
//   }

//   // ✅ Apply color theme based on rangeType
//   switch (rangeType) {
//     case 'normal': // Within range → Grey + Blue
//       MAIN_COLOR = Colors.grayE7;
//       OUT_COLOR = Colors.grayE7;
//       INDICATOR_COLOR = Colors.blue1C;
//       break;
//     case 'moderate': // Moderate low/high → Yellow + Dark Yellow
//       MAIN_COLOR = Colors.goldeenF5;
//       OUT_COLOR = Colors.goldenF9;
//       INDICATOR_COLOR = Colors.goldenCA;
//       break;
//     case 'extreme': // Extreme low/high → Red + Dark Red
//       MAIN_COLOR = Colors.redF5;
//       OUT_COLOR = Colors.redF9;
//       INDICATOR_COLOR = Colors.redCA;
//       break;
//   }

//   // ✅ Background color logic based on range type
//   let backgroundColor = Colors.white; // default
//   switch (rangeType) {
//     case 'normal':
//       backgroundColor = Colors.greyf324; // light blue
//       break;
//     case 'moderate':
//       backgroundColor = Colors.goldenFD; // light yellow
//       break;
//     case 'extreme':
//       backgroundColor = Colors.redFD; // light red/pink
//       break;
//   }

//   let lablColor = Colors.black; // default
//   switch (rangeType) {
//     case 'normal':
//       lablColor = Colors.gray0F; // light blue
//       break;
//     case 'moderate':
//       lablColor = Colors.gray0F; // light yellow
//       break;
//     case 'extreme':
//       lablColor = Colors.red40; // light red/pink
//       break;
//   }

//   // ✅ Build bars
//   const bars = Array.from({ length: TOTAL_BARS }, (_, index) => {
//     let height = SMALL_HEIGHT;
//     let color = OUT_COLOR;
//     let yPosition = CHART_HEIGHT - height - 6;

//     if (index >= MIDDLE_BARS_START && index <= MIDDLE_BARS_END) {
//       const totalMiddleBars = MIDDLE_BARS_END - MIDDLE_BARS_START + 1;
//       const localIndex = index - MIDDLE_BARS_START;
//       const t = totalMiddleBars > 1 ? localIndex / (totalMiddleBars - 1) : 0.5;

//       const leftRampEnd = RAMP_FRACTION_PER_SIDE;
//       const rightRampStart = 1 - RAMP_FRACTION_PER_SIDE;
//       const easeOut = x => 1 - Math.pow(1 - x, 2);
//       const easeIn = x => Math.pow(x, 2);

//       const amplitude = MAX_HEIGHT - SMALL_HEIGHT;
//       let factor;

//       if (t <= leftRampEnd) {
//         factor = easeOut(t / Math.max(leftRampEnd, 1e-6));
//       } else if (t >= rightRampStart) {
//         factor = easeIn((1 - t) / Math.max(RAMP_FRACTION_PER_SIDE, 1e-6));
//       } else {
//         factor = 1;
//       }

//       const bottomPortion = 0.4;
//       const bottomAmplitude = amplitude * bottomPortion;
//       const topAmplitude = amplitude - bottomAmplitude;
//       const topHeight = SMALL_HEIGHT + factor * topAmplitude;
//       const bottomHeight = factor * bottomAmplitude;
//       const baselineY = CHART_HEIGHT - SMALL_HEIGHT;

//       height = topHeight + bottomHeight;
//       color = MAIN_COLOR;
//       yPosition = baselineY - topHeight;
//     }

//     const isIndicator = index === indicatorIndex;

//     return {
//       x: index * barSpacing + (barSpacing - BAR_WIDTH) / 2,
//       y: isIndicator ? CHART_HEIGHT - MAX_HEIGHT - 1 : yPosition,
//       height: isIndicator ? MAX_HEIGHT + 5 : height,
//       color: isIndicator ? INDICATOR_COLOR : color,
//     };
//   });

//   return (
//     <TouchableOpacity
//       style={{
//         backgroundColor: backgroundColor,
//         // padding: 16,
//         paddingTop: 16,
//         paddingBottom:10,
//         borderRadius: 20,
//       }}
//       activeOpacity={activityOpacity}
//     >
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginHorizontal: getWidth(16),
//         }}
//       >
//         <Text
//           style={{
//             fontSize: fontSize.size16,
//             fontFamily: fontsfamily.medium,
//             color: lablColor,
//           }}
//         >
//           {props.reportName}
//         </Text>
//         <Text
//           style={{
//             fontSize: fontSize.size16,
//             fontFamily: fontsfamily.medium,
//             color: lablColor,
//           }}
//         >
//           {props.reportValue}
//         </Text>
//       </View>
//       <View
//         // style={{}}
//         style={{marginLeft: getWidth(18), alignSelf: 'center' }}
//       >
//         <Svg viewBox={`0 0 ${350} ${CHART_HEIGHT}`} {...props}>
//           {bars.map((bar, index) => (
//             <Rect
//               key={index}
//               x={bar.x}
//               y={bar.y}
//               width={BAR_WIDTH}
//               height={bar.height}
//               rx={3}
//               fill={bar.color}
//             />
//           ))}
//         </Svg>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default BarChartComponent;

//new chart perfection

// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {
//   Svg,
//   Polygon,
//   Circle,
//   Defs,
//   Stop,
//   RadialGradient as SvgGradient,
// } from 'react-native-svg';
// import { fontsfamily } from '../constants/FontFamily';
// import { fontSize } from '../constants/FontSizes';
// import { Colors } from '../constants/Colors';
// import { getHeight, getWidth } from '../constants/utils/Dimensions';
// import { activityOpacity } from '../constants/GConstant';
// import { images } from '../constants/Images';
// import LinearGradient from 'react-native-linear-gradient';
// import CustomButton from './Buttons';
// import { getTranslation } from '../localization/i18n/i18n.config';

// // Chart constants
// const INDICATOR_RADIUS = 9;
// const DOT_RADIUS = 2;
// const DOT_COUNT = 40;
// const HEXAGON_HEIGHT = 17;

// const BarChartComponent = ({
//   currentValue,
//   minValue,
//   maxValue,
//   width = 330,
//   height = 40,
//   ...props
// }) => {
//   // ✅ Safe value handling
//   const safeMin = Number.isFinite(minValue) ? minValue : 0;
//   const safeMax =
//     Number.isFinite(maxValue) && maxValue > safeMin ? maxValue : safeMin + 1;
//   const safeValue = Number.isFinite(currentValue) ? currentValue : safeMin;

//   // ✅ Add padding to prevent circle cutoff
//   const CHART_PADDING = INDICATOR_RADIUS + 4;
//   const CHART_WIDTH = width - CHART_PADDING * 2;
//   const centerY = height / 2;

//   // Hexagon represents the min-max range
//   const rangeWidth = safeMax - safeMin;
//   const extremeLeftThreshold = safeMin - rangeWidth * 0.7;
//   const extremeRightThreshold = safeMax + rangeWidth * 0.5;
//   const totalRange = extremeRightThreshold - extremeLeftThreshold;

//   // Calculate position with padding offset
//   const getXPosition = value => {
//     const normalized = (value - extremeLeftThreshold) / totalRange;
//     return CHART_PADDING + Math.max(0, Math.min(1, normalized)) * CHART_WIDTH;
//   };

//   const minX = getXPosition(safeMin);
//   const maxX = getXPosition(safeMax);
//   const valueX = getXPosition(safeValue);

//   // ✅ Determine range type based on current value
//   let rangeType = 'normal';
//   if (safeValue < safeMin) {
//     const moderateThreshold = safeMin - rangeWidth * 0.3;
//     rangeType = safeValue <= moderateThreshold ? 'extreme' : 'moderate';
//   } else if (safeValue > safeMax) {
//     const moderateThreshold = safeMax + rangeWidth * 0.3;
//     rangeType = safeValue >= moderateThreshold ? 'extreme' : 'moderate';
//   }

//   // ✅ Color logic variables
//   let MAIN_COLOR = '#F5949F';
//   let OUT_COLOR = '#737373';
//   let INDICATOR_COLOR = '#CA1C2E';

//   // ✅ Apply color theme based on rangeType
//   switch (rangeType) {
//     case 'normal': // Within range → Grey + Blue
//       MAIN_COLOR = Colors.grayE7;
//       OUT_COLOR = Colors.grayE7;
//       INDICATOR_COLOR = Colors.blue1C;
//       break;
//     case 'moderate': // Moderate low/high → Yellow + Dark Yellow
//       MAIN_COLOR = Colors.goldeenF5;
//       OUT_COLOR = Colors.goldenF9;
//       INDICATOR_COLOR = Colors.goldenCA;
//       break;
//     case 'extreme': // Extreme low/high → Red + Dark Red
//       MAIN_COLOR = Colors.redF5;
//       OUT_COLOR = Colors.redF9;
//       INDICATOR_COLOR = Colors.redCA;
//       break;
//   }

//   let shadowImage = images.imgTestBlueShadow;

//   switch (rangeType) {
//     case 'normal':
//       shadowImage = images.imgTestBlueShadow;
//       break;
//     case 'moderate':
//       shadowImage = images.imgTestYellowShadow;
//       break;
//     case 'extreme':
//       shadowImage = images.imgTestRedShadow;
//       break;
//   }

//   // ✅ Background color logic based on range type
//   let backgroundColor = Colors.white;
//   switch (rangeType) {
//     case 'normal':
//       backgroundColor = Colors.greyf324;
//       break;
//     case 'moderate':
//       backgroundColor = Colors.goldenFD;
//       break;
//     case 'extreme':
//       backgroundColor = Colors.redFD;
//       break;
//   }

//   let lablColor = Colors.black;
//   switch (rangeType) {
//     case 'normal':
//       lablColor = Colors.gray0F;
//       break;
//     case 'moderate':
//       lablColor = Colors.gray0F;
//       break;
//     case 'extreme':
//       lablColor = Colors.red40;
//       break;
//   }

//   // ✅ Fixed hexagon calculation - properly centered with extended width
//   const hexagonWidth = maxX - minX;
//   const hexagonCenterX = (minX + maxX) / 2;

//   // Extend the hexagon width by 20% (multiply by 1.2)
//   const extendedWidth = hexagonWidth * 1.2;

//   // Calculate all points symmetrically from center with extended width
//   const leftPoint = hexagonCenterX - extendedWidth / 2;
//   const rightPoint = hexagonCenterX + extendedWidth / 2;

//   // Flat edge is 80% of the extended width to create proper hexagon shape
//   const flatEdgeWidth = extendedWidth * 0.8;
//   const topLeftFlat = hexagonCenterX - flatEdgeWidth / 2;
//   const topRightFlat = hexagonCenterX + flatEdgeWidth / 2;

//   const hexagonPoints = `
//     ${topLeftFlat},${centerY - HEXAGON_HEIGHT}
//     ${topRightFlat},${centerY - HEXAGON_HEIGHT}
//     ${rightPoint},${centerY}
//     ${topRightFlat},${centerY + HEXAGON_HEIGHT}
//     ${topLeftFlat},${centerY + HEXAGON_HEIGHT}
//     ${leftPoint},${centerY}
//   `;

//   // ✅ Generate dots with padding consideration
//   const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
//     x: CHART_PADDING + (i / (DOT_COUNT - 1)) * CHART_WIDTH,
//     y: centerY,
//   }));
//   const isTestedReport = props.reportItem.isTest == true;
//   return (
//     <TouchableOpacity
//       onPress={props.onpressreport}
//       style={{
//         backgroundColor: Colors.white,
//         paddingTop: 20,
//         paddingBottom: 15,
//         overflow: 'hidden',
//         borderRadius: 20,
//       }}
//       activeOpacity={activityOpacity}
//     >
//       {/* {isTestedReport && (
//         <LinearGradient

//           colors={['#D1E0FF', '#D1E0FF', '#FFFFFF']}

//           start={{ x: 1, y: 0 }}

//           end={{ x: 0.9, y: 0.5 }}
//           style={styles.card}
//         >
//         </LinearGradient>
//       )} */}
//       {isTestedReport && (
//         <Image
//           source={shadowImage}
//           style={{ position: 'absolute', right: 0 }}
//         />
//       )}
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginHorizontal: getWidth(16),
//         }}
//       >
//         <Text
//           style={{
//             fontSize: fontSize.size16,
//             fontFamily: fontsfamily.gmedium,
//             color: Colors.gray0F,
//           }}
//         >
//           {props.reportName}
//         </Text>
//         {isTestedReport && (
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: getWidth(8),
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: fontSize.size16,
//                 fontFamily: fontsfamily.gregular,
//                 color: Colors.gray75,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: fontSize.size20,
//                   fontFamily: fontsfamily.gregular,
//                   color: Colors.gray0F,
//                 }}
//               >
//                 {' '}
//                 {props.reportValue}
//               </Text>{' '}
//               {props.reportItem.reportunit}
//             </Text>
//             <Image source={images.imgRightCurve} style={{ marginTop: 3 }} />
//           </View>
//         )}
//       </View>
//       {isTestedReport && (
//         <View style={{ alignSelf: 'center', marginTop: 12 }}>
//           <Svg width={width} height={height}>
//             {/* LINEAR GRADIENT FOR DOTS */}
//             <Defs>
//               <SvgGradient id="dotGradient" cx="50%" cy="50%" r="50%">
//                 <Stop offset="0%" stopColor="#737373" />
//                 <Stop offset="100%" stopColor="#737373" stopOpacity="0.2" />
//               </SvgGradient>
//             </Defs>

//             {/* Dotted line */}
//             {dots.map((dot, index) => (
//               <Circle
//                 key={`dot-${index}`}
//                 cx={dot.x}
//                 cy={dot.y}
//                 r={DOT_RADIUS}
//                 fill="url(#dotGradient)"
//               />
//             ))}

//             {/* Hexagon represents min-max range */}
//             <Polygon
//               points={hexagonPoints}
//               fill={Colors.whiteF2}
//               opacity={0.8}
//             />

//             {/* Current value indicator */}
//             <Circle
//               cx={valueX}
//               cy={centerY}
//               r={INDICATOR_RADIUS}
//               fill={INDICATOR_COLOR}
//             />
//           </Svg>
//         </View>
//       )}
//       {!isTestedReport && (
//         <View style={{ marginHorizontal: getWidth(20) }}>
//           <CustomButton
//             style={{ backgroundColor: Colors.blueD1, marginTop: getHeight(13) }}
//             textStyle={{ color: Colors.blue002, fontSize: fontSize.size16 }}
//             btnPress={props.onpressBookNow}
//             btnTitle={getTranslation('booknowtext')}
//           />
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// };

// export default BarChartComponent;

// const styles = StyleSheet.create({
//   gradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     width: '20%', // adjust until it matches your design
//     height: '50%', // adjust for vertical gradient coverage
//     borderRadius: 1,
//   },
//   card: {
//     height: 100,
//     position: 'absolute',
//     top: 0,
//     width: 180,
//     right: 0,
//     borderRadius: 20, // Large radius for that bubbly look
//     backgroundColor: 'white', // Fallback
//   },
// });

// working for small range
// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {
//   Svg,
//   Polygon,
//   Circle,
//   Defs,
//   Stop,
//   RadialGradient as SvgGradient,
// } from 'react-native-svg';
// import { fontsfamily } from '../constants/FontFamily';
// import { fontSize } from '../constants/FontSizes';
// import { Colors } from '../constants/Colors';
// import { getHeight, getWidth } from '../constants/utils/Dimensions';
// import { activityOpacity } from '../constants/GConstant';
// import { images } from '../constants/Images';
// import LinearGradient from 'react-native-linear-gradient';
// import CustomButton from './Buttons';
// import { getTranslation } from '../localization/i18n/i18n.config';

// // Chart constants
// const INDICATOR_RADIUS = 9;
// const DOT_RADIUS = 2;
// const DOT_COUNT = 40;
// const HEXAGON_HEIGHT = 17;

// const BarChartComponent = ({
//   currentValue,
//   minValue,
//   maxValue,
//   width = 330,
//   height = 40,
//   ...props
// }) => {
//   // ✅ Safe value handling
//   const safeMin = Number.isFinite(minValue) ? minValue : 0;
//   const safeMax =
//     Number.isFinite(maxValue) && maxValue > safeMin ? maxValue : safeMin + 1;
//   const safeValue = Number.isFinite(currentValue) ? currentValue : safeMin;

//   // ✅ Add padding to prevent circle cutoff
//   const CHART_PADDING = INDICATOR_RADIUS + 4;
//   const CHART_WIDTH = width - CHART_PADDING * 2;
//   const centerY = height / 2;

//   // Hexagon represents the min-max range
//   const rangeWidth = safeMax - safeMin;
//   const extremeLeftThreshold = safeMin - rangeWidth * 0.7;
//   const extremeRightThreshold = safeMax + rangeWidth * 0.5;
//   const totalRange = extremeRightThreshold - extremeLeftThreshold;

//   // Calculate position with padding offset
//   const getXPosition = value => {
//     const normalized = (value - extremeLeftThreshold) / totalRange;
//     // This inherent clamp (Math.max(0, Math.min(1, normalized))) ensures the indicator
//     // never goes outside the CHART_PADDING to CHART_PADDING + CHART_WIDTH range.
//     return CHART_PADDING + Math.max(0, Math.min(1, normalized)) * CHART_WIDTH;
//   };

//   const minX = getXPosition(safeMin);
//   const maxX = getXPosition(safeMax);

//   // 🟢 FIX: Revert clamping and use the actual safeValue for position.
//   // This allows the indicator to be positioned outside the hexagon's boundaries
//   // (to the left of minX or right of maxX) as long as it's within the overall track bounds.
//   const valueX = getXPosition(safeValue);

//   // ✅ Determine range type based on current value (uses safeValue for color logic)
//   let rangeType = 'normal';
//   if (safeValue < safeMin) {
//     const moderateThreshold = safeMin - rangeWidth * 0.3;
//     rangeType = safeValue <= moderateThreshold ? 'extreme' : 'moderate';
//   } else if (safeValue > safeMax) {
//     const moderateThreshold = safeMax + rangeWidth * 0.3;
//     rangeType = safeValue >= moderateThreshold ? 'extreme' : 'moderate';
//   }

//   // ✅ Color logic variables
//   let MAIN_COLOR = '#F5949F';
//   let OUT_COLOR = '#737373';
//   let INDICATOR_COLOR = '#CA1C2E';

//   // ✅ Apply color theme based on rangeType
//   switch (rangeType) {
//     case 'normal': // Within range → Grey + Blue
//       MAIN_COLOR = Colors.grayE7;
//       OUT_COLOR = Colors.grayE7;
//       INDICATOR_COLOR = Colors.blue1C;
//       break;
//     case 'moderate': // Moderate low/high → Yellow + Dark Yellow
//       MAIN_COLOR = Colors.goldeenF5;
//       OUT_COLOR = Colors.goldenF9;
//       INDICATOR_COLOR = Colors.goldenCA;
//       break;
//     case 'extreme': // Extreme low/high → Red + Dark Red
//       MAIN_COLOR = Colors.redF5;
//       OUT_COLOR = Colors.redF9;
//       INDICATOR_COLOR = Colors.redCA;
//       break;
//   }

//   let shadowImage = images.imgTestBlueShadow;

//   switch (rangeType) {
//     case 'normal':
//       shadowImage = images.imgTestBlueShadow;
//       break;
//     case 'moderate':
//       shadowImage = images.imgTestYellowShadow;
//       break;
//     case 'extreme':
//       shadowImage = images.imgTestRedShadow;
//       break;
//   }

//   // ✅ Background color logic based on range type
//   let backgroundColor = Colors.white;
//   switch (rangeType) {
//     case 'normal':
//       backgroundColor = Colors.greyf324;
//       break;
//     case 'moderate':
//       backgroundColor = Colors.goldenFD;
//       break;
//     case 'extreme':
//       backgroundColor = Colors.redFD;
//       break;
//   }

//   let lablColor = Colors.black;
//   switch (rangeType) {
//     case 'normal':
//       lablColor = Colors.gray0F;
//       break;
//     case 'moderate':
//       lablColor = Colors.gray0F;
//       break;
//     case 'extreme':
//       lablColor = Colors.red40;
//       break;
//   }

//   // ✅ Fixed hexagon calculation - properly centered with extended width
//   const hexagonWidth = maxX - minX;
//   const hexagonCenterX = (minX + maxX) / 2;

//   // Extend the hexagon width by 20% (multiply by 1.2)
//   const extendedWidth = hexagonWidth * 1.2;

//   // Calculate all points symmetrically from center with extended width
//   const leftPoint = hexagonCenterX - extendedWidth / 2;
//   const rightPoint = hexagonCenterX + extendedWidth / 2;

//   // Flat edge is 80% of the extended width to create proper hexagon shape
//   const flatEdgeWidth = extendedWidth * 0.8;
//   const topLeftFlat = hexagonCenterX - flatEdgeWidth / 2;
//   const topRightFlat = hexagonCenterX + flatEdgeWidth / 2;

//   const hexagonPoints = `
//     ${topLeftFlat},${centerY - HEXAGON_HEIGHT}
//     ${topRightFlat},${centerY - HEXAGON_HEIGHT}
//     ${rightPoint},${centerY}
//     ${topRightFlat},${centerY + HEXAGON_HEIGHT}
//     ${topLeftFlat},${centerY + HEXAGON_HEIGHT}
//     ${leftPoint},${centerY}
//   `;

//   // ✅ Generate dots with padding consideration
//   const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
//     x: CHART_PADDING + (i / (DOT_COUNT - 1)) * CHART_WIDTH,
//     y: centerY,
//   }));
//   const isTestedReport = props.reportItem.isTest == true;
//   return (
//     <TouchableOpacity
//       onPress={props.onpressreport}
//       style={{
//         backgroundColor: Colors.white,
//         paddingTop: 20,
//         paddingBottom: 15,
//         overflow: 'hidden',
//         borderRadius: 20,
//       }}
//       activeOpacity={activityOpacity}
//     >
//       {isTestedReport && (
//         <Image
//           source={shadowImage}
//           style={{ position: 'absolute', right: 0 }}
//         />
//       )}
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginHorizontal: getWidth(16),
//         }}
//       >
//         <Text
//           style={{
//             fontSize: fontSize.size16,
//             fontFamily: fontsfamily.gmedium,
//             color: Colors.gray0F,
//           }}
//         >
//           {props.reportName}
//         </Text>
//         {isTestedReport && (
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: getWidth(8),
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: fontSize.size16,
//                 fontFamily: fontsfamily.gregular,
//                 color: Colors.gray75,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: fontSize.size20,
//                   fontFamily: fontsfamily.gregular,
//                   color: Colors.gray0F,
//                 }}
//               >
//                 {' '}
//                 {props.reportValue}
//               </Text>{' '}
//               {props.reportItem.reportunit}
//             </Text>
//             <Image source={images.imgRightCurve} style={{ marginTop: 3 }} />
//           </View>
//         )}
//       </View>
//       {isTestedReport && (
//         <View style={{ alignSelf: 'center', marginTop: 12 }}>
//           <Svg width={width} height={height}>
//             {/* LINEAR GRADIENT FOR DOTS */}
//             <Defs>
//               <SvgGradient id="dotGradient" cx="50%" cy="50%" r="50%">
//                 <Stop offset="0%" stopColor="#737373" />
//                 <Stop offset="100%" stopColor="#737373" stopOpacity="0.2" />
//               </SvgGradient>
//             </Defs>

//             {/* Dotted line */}
//             {dots.map((dot, index) => (
//               <Circle
//                 key={`dot-${index}`}
//                 cx={dot.x}
//                 cy={dot.y}
//                 r={DOT_RADIUS}
//                 fill="url(#dotGradient)"
//               />
//             ))}

//             {/* Hexagon represents min-max range (Always visible) */}
//             <Polygon
//               points={hexagonPoints}
//               fill={Colors.whiteF2}
//               opacity={0.8}
//             />

//             {/* Current value indicator (Now uses actual safeValue for position) */}
//             <Circle
//               cx={valueX}
//               cy={centerY}
//               r={INDICATOR_RADIUS}
//               fill={INDICATOR_COLOR}
//             />
//           </Svg>
//         </View>
//       )}
//       {!isTestedReport && (
//         <View style={{ marginHorizontal: getWidth(20) }}>
//           <CustomButton
//             style={{ backgroundColor: Colors.blueD1, marginTop: getHeight(13) }}
//             textStyle={{ color: Colors.blue002, fontSize: fontSize.size16 }}
//             btnPress={props.onpressBookNow}
//             btnTitle={getTranslation('booknowtext')}
//           />
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// };

// export default BarChartComponent;

// const styles = StyleSheet.create({
//   gradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     width: '20%', // adjust until it matches your design
//     height: '50%', // adjust for vertical gradient coverage
//     borderRadius: 1,
//   },
//   card: {
//     height: 100,
//     position: 'absolute',
//     top: 0,
//     width: 180,
//     right: 0,
//     borderRadius: 20, // Large radius for that bubbly look
//     backgroundColor: 'white', // Fallback
//   },
// });

//gemini valo
// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {
//   Svg,
//   Polygon,
//   Circle,
//   Defs,
//   Stop,
//   RadialGradient as SvgGradient,
// } from 'react-native-svg';
// import { fontsfamily } from '../constants/FontFamily';
// import { fontSize } from '../constants/FontSizes';
// import { Colors } from '../constants/Colors';
// import { getHeight, getWidth } from '../constants/utils/Dimensions';
// import { activityOpacity } from '../constants/GConstant';
// import { images } from '../constants/Images';
// import CustomButton from './Buttons';
// import { getTranslation } from '../localization/i18n/i18n.config';

// // Chart constants
// const INDICATOR_RADIUS = 9;
// const DOT_RADIUS = 2;
// const DOT_COUNT = 40;
// const HEXAGON_HEIGHT = 17;

// const BarChartComponent = ({
//   currentValue,
//   minValue,
//   maxValue,
//   width = 330,
//   height = 40,
//   ...props
// }) => {
//   // ✅ 1. Safe value handling
//   const safeMin = Number.isFinite(minValue) ? minValue : 0;
//   const safeMax = Number.isFinite(maxValue) && maxValue > safeMin ? maxValue : safeMin + 1;
//   const safeValue = Number.isFinite(currentValue) ? currentValue : 0;

//   // ✅ 2. Layout Constants (Hexagon stays in fixed middle zone)
//   const CHART_PADDING = INDICATOR_RADIUS + 4;
//   const AVAILABLE_WIDTH = width - CHART_PADDING * 2;
//   const centerY = height / 2;

//   // We divide the bar into 3 zones:
//   // Left: 0% to 30% | Hexagon (Range): 30% to 70% | Right: 70% to 100%
//   const zoneBoundaryLeft = 0.3;
//   const zoneBoundaryRight = 0.7;
//   const zoneWidthHexagon = zoneBoundaryRight - zoneBoundaryLeft;

//   // ✅ 3. Calculate Indicator Position (valueX)
//   let valueX = 0;
//   const rangeWidth = safeMax - safeMin;

//   if (safeValue < safeMin) {
//     // --- VALUE IS LOW ---
//     // Map the value from 0 up to safeMin into the 0% - 30% zone.
//     // This prevents negative ranges and keeps indicator to the left.
//     const ratio = safeMin === 0 ? 0 : Math.max(0, safeValue / safeMin);
//     valueX = CHART_PADDING + (ratio * zoneBoundaryLeft * AVAILABLE_WIDTH);
//   } else if (safeValue > safeMax) {
//     // --- VALUE IS HIGH ---
//     // Map the value into the 70% - 100% zone.
//     // We use a buffer (same as range width) to define how far right it can go.
//     const highBuffer = rangeWidth || 10;
//     const ratio = Math.min(1, (safeValue - safeMax) / highBuffer);
//     valueX = CHART_PADDING + ((zoneBoundaryRight + (ratio * (1 - zoneBoundaryRight))) * AVAILABLE_WIDTH);
//   } else {
//     // --- VALUE IS NORMAL (Inside Hexagon) ---
//     const ratio = (safeValue - safeMin) / rangeWidth;
//     valueX = CHART_PADDING + ((zoneBoundaryLeft + (ratio * zoneWidthHexagon)) * AVAILABLE_WIDTH);
//   }

//   // ✅ 4. Fixed Hexagon Positions (Always centered regardless of values)
//   const minX = CHART_PADDING + (zoneBoundaryLeft * AVAILABLE_WIDTH);
//   const maxX = CHART_PADDING + (zoneBoundaryRight * AVAILABLE_WIDTH);

//   // ✅ 5. Determine Range Type for Colors
//   let rangeType = 'normal';
//   if (safeValue < safeMin) {
//     const moderateThreshold = safeMin - rangeWidth * 0.3;
//     rangeType = safeValue <= moderateThreshold ? 'extreme' : 'moderate';
//   } else if (safeValue > safeMax) {
//     const moderateThreshold = safeMax + rangeWidth * 0.3;
//     rangeType = safeValue >= moderateThreshold ? 'extreme' : 'moderate';
//   }

//   // ✅ 6. Apply Color Theme
//   let INDICATOR_COLOR = Colors.blue1C;
//   let shadowImage = images.imgTestBlueShadow;

//   switch (rangeType) {
//     case 'normal':
//       INDICATOR_COLOR = Colors.blue1C;
//       shadowImage = images.imgTestBlueShadow;
//       break;
//     case 'moderate':
//       INDICATOR_COLOR = Colors.goldenCA;
//       shadowImage = images.imgTestYellowShadow;
//       break;
//     case 'extreme':
//       INDICATOR_COLOR = Colors.redCA;
//       shadowImage = images.imgTestRedShadow;
//       break;
//   }

//   // ✅ 7. Hexagon Geometry (Symmetric and Fixed)
//   const hexagonWidth = maxX - minX;
//   const hexagonCenterX = (minX + maxX) / 2;

//   // Symmetrical points based on the fixed center
//   const leftPoint = hexagonCenterX - (hexagonWidth / 2);
//   const rightPoint = hexagonCenterX + (hexagonWidth / 2);
//   const flatEdgeWidth = hexagonWidth * 0.8;
//   const topLeftFlat = hexagonCenterX - (flatEdgeWidth / 2);
//   const topRightFlat = hexagonCenterX + (flatEdgeWidth / 2);

//   const hexagonPoints = `
//     ${topLeftFlat},${centerY - HEXAGON_HEIGHT}
//     ${topRightFlat},${centerY - HEXAGON_HEIGHT}
//     ${rightPoint},${centerY}
//     ${topRightFlat},${centerY + HEXAGON_HEIGHT}
//     ${topLeftFlat},${centerY + HEXAGON_HEIGHT}
//     ${leftPoint},${centerY}
//   `;

//   const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
//     x: CHART_PADDING + (i / (DOT_COUNT - 1)) * AVAILABLE_WIDTH,
//     y: centerY,
//   }));

//   const isTestedReport = props.reportItem.isTest === true;

//   return (
//     <TouchableOpacity
//       onPress={props.onpressreport}
//       style={{
//         backgroundColor: Colors.white,
//         paddingTop: 20,
//         paddingBottom: 15,
//         overflow: 'hidden',
//         borderRadius: 20,
//       }}
//       activeOpacity={activityOpacity}
//     >
//       {isTestedReport && (
//         <Image
//           source={shadowImage}
//           style={{ position: 'absolute', right: 0 }}
//         />
//       )}
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginHorizontal: getWidth(16),
//         }}
//       >
//         <Text style={{ fontSize: fontSize.size16, fontFamily: fontsfamily.gmedium, color: Colors.gray0F }}>
//           {props.reportName}
//         </Text>
//         {isTestedReport && (
//           <View style={{ flexDirection: 'row', alignItems: 'center', gap: getWidth(8) }}>
//             <Text style={{ fontSize: fontSize.size16, fontFamily: fontsfamily.gregular, color: Colors.gray75 }}>
//               <Text style={{ fontSize: fontSize.size20, fontFamily: fontsfamily.gregular, color: Colors.gray0F }}>
//                 {props.reportValue}
//               </Text>
//               {' '}{props.reportItem.reportunit}
//             </Text>
//             <Image source={images.imgRightCurve} style={{ marginTop: 3 }} />
//           </View>
//         )}
//       </View>

//       {isTestedReport && (
//         <View style={{ alignSelf: 'center', marginTop: 12 }}>
//           <Svg width={width} height={height}>
//             <Defs>
//               <SvgGradient id="dotGradient" cx="50%" cy="50%" r="50%">
//                 <Stop offset="0%" stopColor="#737373" />
//                 <Stop offset="100%" stopColor="#737373" stopOpacity="0.2" />
//               </SvgGradient>
//             </Defs>

//             {/* Dotted line */}
//             {dots.map((dot, index) => (
//               <Circle key={`dot-${index}`} cx={dot.x} cy={dot.y} r={DOT_RADIUS} fill="url(#dotGradient)" />
//             ))}

//             {/* Fixed Hexagon */}
//             <Polygon points={hexagonPoints} fill={Colors.whiteF2} opacity={0.8} />

//             {/* Indicator Circle */}
//             <Circle cx={valueX} cy={centerY} r={INDICATOR_RADIUS} fill={INDICATOR_COLOR} />
//           </Svg>
//         </View>
//       )}

//       {!isTestedReport && (
//         <View style={{ marginHorizontal: getWidth(20) }}>
//           <CustomButton
//             style={{ backgroundColor: Colors.blueD1, marginTop: getHeight(13) }}
//             textStyle={{ color: Colors.blue002, fontSize: fontSize.size16 }}
//             btnPress={props.onpressBookNow}
//             btnTitle={getTranslation('booknowtext')}
//           />
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// };

// export default BarChartComponent;

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Svg,
  Polygon,
  Circle,
  Defs,
  Stop,
  RadialGradient as SvgGradient,
} from 'react-native-svg';
import { fontsfamily } from '../constants/FontFamily';
import { fontSize } from '../constants/FontSizes';
import { Colors } from '../constants/Colors';
import { getHeight, getWidth } from '../constants/utils/Dimensions';
import { activityOpacity } from '../constants/GConstant';
import { images } from '../constants/Images';
import CustomButton from './Buttons';
import { getTranslation } from '../localization/i18n/i18n.config';

// Chart constants
const INDICATOR_RADIUS = 9;
const DOT_RADIUS = 2;
const DOT_COUNT = 40;
const HEXAGON_HEIGHT = 17;

const BarChartComponent = ({
  currentValue,
  minValue,
  maxValue,
  width = 330,
  height = 40,
  ...props
}) => {
  // ✅ 1. Safe value handling
  const safeMin = Number.isFinite(minValue) ? minValue : 0;
  const safeMax =
    Number.isFinite(maxValue) && maxValue > safeMin ? maxValue : safeMin + 1;
  const safeValue = Number.isFinite(currentValue) ? currentValue : 0;

  // ✅ 2. Layout Constants
  const CHART_PADDING = INDICATOR_RADIUS + 4;
  const AVAILABLE_WIDTH = width - CHART_PADDING * 2;
  const centerY = height / 2;

  // ✅ ADJUST THESE VALUES TO CHANGE WIDTH
  // Left Zone: 0% to 20% | Hexagon: 20% to 80% | Right Zone: 80% to 100%
  // Decreasing zoneBoundaryLeft and increasing zoneBoundaryRight makes the hexagon WIDER.
  const zoneBoundaryLeft = 0.2;
  const zoneBoundaryRight = 0.8;
  const zoneWidthHexagon = zoneBoundaryRight - zoneBoundaryLeft;

  // ✅ 3. Calculate Indicator Position (valueX)
  let valueX = 0;
  const rangeWidth = safeMax - safeMin;

  if (safeValue < safeMin) {
    // --- VALUE IS LOW ---
    const ratio = safeMin === 0 ? 0 : Math.max(0, safeValue / safeMin);
    valueX = CHART_PADDING + ratio * zoneBoundaryLeft * AVAILABLE_WIDTH;
  } else if (safeValue > safeMax) {
    // --- VALUE IS HIGH ---
    const highBuffer = rangeWidth || 10;
    const ratio = Math.min(1, (safeValue - safeMax) / highBuffer);
    valueX =
      CHART_PADDING +
      (zoneBoundaryRight + ratio * (1 - zoneBoundaryRight)) * AVAILABLE_WIDTH;
  } else {
    // --- VALUE IS NORMAL (Inside Hexagon) ---
    const ratio = (safeValue - safeMin) / rangeWidth;
    valueX =
      CHART_PADDING +
      (zoneBoundaryLeft + ratio * zoneWidthHexagon) * AVAILABLE_WIDTH;
  }

  // ✅ 4. Hexagon Positions (Fixed based on new boundaries)
  const minX = CHART_PADDING + zoneBoundaryLeft * AVAILABLE_WIDTH;
  const maxX = CHART_PADDING + zoneBoundaryRight * AVAILABLE_WIDTH;

  // ✅ 5. Color Logic
  let rangeType = 'normal';
  if (safeValue < safeMin) {
    const moderateThreshold = safeMin - rangeWidth * 0.3;
    rangeType = safeValue <= moderateThreshold ? 'extreme' : 'moderate';
  } else if (safeValue > safeMax) {
    const moderateThreshold = safeMax + rangeWidth * 0.3;
    rangeType = safeValue >= moderateThreshold ? 'extreme' : 'moderate';
  }

  let INDICATOR_COLOR = Colors.blue1C;
  let shadowImage = images.imgTestBlueShadow;

  switch (rangeType) {
    case 'normal':
      INDICATOR_COLOR = Colors.blue1C;
      shadowImage = images.imgTestBlueShadow;
      break;
    case 'moderate':
      INDICATOR_COLOR = Colors.goldenCA;
      shadowImage = images.imgTestYellowShadow;
      break;
    case 'extreme':
      INDICATOR_COLOR = Colors.redCA;
      shadowImage = images.imgTestRedShadow;
      break;
  }

  // ✅ 6. Hexagon Geometry (Fixed and Wider)
  const hexagonWidth = maxX - minX;
  const hexagonCenterX = (minX + maxX) / 2;

  const leftPoint = hexagonCenterX - hexagonWidth / 2;
  const rightPoint = hexagonCenterX + hexagonWidth / 2;
  const flatEdgeWidth = hexagonWidth * 0.85; // Increased flat edge for a cleaner look at larger widths
  const topLeftFlat = hexagonCenterX - flatEdgeWidth / 2;
  const topRightFlat = hexagonCenterX + flatEdgeWidth / 2;

  const hexagonPoints = `
    ${topLeftFlat},${centerY - HEXAGON_HEIGHT}
    ${topRightFlat},${centerY - HEXAGON_HEIGHT}
    ${rightPoint},${centerY}
    ${topRightFlat},${centerY + HEXAGON_HEIGHT}
    ${topLeftFlat},${centerY + HEXAGON_HEIGHT}
    ${leftPoint},${centerY}
  `;

  const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
    x: CHART_PADDING + (i / (DOT_COUNT - 1)) * AVAILABLE_WIDTH,
    y: centerY,
  }));

  const isTestedReport =
    props.isTestCheck == true ? true : props.reportItem.has_report === true;

  return (
    <TouchableOpacity
      onPress={props.onpressreport}
      style={{
        backgroundColor: Colors.white,
        paddingTop: 20,
        paddingBottom: 15,
        overflow: 'hidden',
        borderRadius: 20,
      }}
      activeOpacity={activityOpacity}
    >
      {isTestedReport && (
        <Image
          source={shadowImage}
          style={{ position: 'absolute', right: 0 }}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: getWidth(16),
          flex:1,
        }}
      >
        <Text
          style={{
            fontSize: fontSize.size16,
            fontFamily: fontsfamily.gmedium,
            color: Colors.gray0F,
            flex:1,
          }}
          numberOfLines={2}
        >
          {props.reportName}
        </Text>
        {isTestedReport && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: getWidth(8),
            }}
          >
            <Text
              style={{
                fontSize: fontSize.size16,
                fontFamily: fontsfamily.gregular,
                color: Colors.gray75,
              }}
            >
              <Text
                style={{
                  fontSize: fontSize.size20,
                  fontFamily: fontsfamily.gregular,
                  color: Colors.gray0F,
                }}
              >
                {props.reportValue}
              </Text>{' '}
              {props.isUnitShow === true
                ? props.unitName
                : props.reportItem.reportunit}
            </Text>
            <Image source={images.imgRightCurve} style={{ marginTop: 3 }} />
          </View>
        )}
      </View>

      {isTestedReport && (
        <View style={{ alignSelf: 'center', marginTop: 12 }}>
          <Svg width={width} height={height}>
            <Defs>
              <SvgGradient id="dotGradient" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#737373" />
                <Stop offset="100%" stopColor="#737373" stopOpacity="0.2" />
              </SvgGradient>
            </Defs>

            {/* Dotted line */}
            {dots.map((dot, index) => (
              <Circle
                key={`dot-${index}`}
                cx={dot.x}
                cy={dot.y}
                r={DOT_RADIUS}
                fill="url(#dotGradient)"
              />
            ))}

            {/* Fixed Wider Hexagon */}
            <Polygon
              points={hexagonPoints}
              fill={Colors.whiteF2}
              opacity={0.8}
            />

            {/* Indicator Circle */}
            <Circle
              cx={valueX}
              cy={centerY}
              r={INDICATOR_RADIUS}
              fill={INDICATOR_COLOR}
            />
          </Svg>
        </View>
      )}

      {!isTestedReport && (
        <View style={{ marginHorizontal: getWidth(20) }}>
          <CustomButton
            style={{ backgroundColor: Colors.blueD1, marginTop: getHeight(13) }}
            textStyle={{ color: Colors.blue002, fontSize: fontSize.size16 }}
            btnPress={props.onpressBookNow}
            btnTitle={getTranslation('booknowtext')}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BarChartComponent;
