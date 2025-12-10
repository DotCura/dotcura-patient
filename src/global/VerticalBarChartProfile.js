// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import Svg, { Path } from 'react-native-svg';
// import { getHeight } from '../constants/utils/Dimensions';
// import { Colors } from '../constants/Colors';
// import { fontsfamily } from '../constants/FontFamily';
// import { fontSize } from '../constants/FontSizes';


// const { width } = Dimensions.get('window');

// // // --- Component Definition ---
// // const VerticalBarChartProfile = ({
// //   data,
// //   title = 'Glicemia',
// //   subtitleText = 'Ultimo valore',
// //   chartMaxValue, // New Prop
// //   navigation,
// //   chartMinValue, // New Prop
// // }) => {
// //   // 1. Dynamic Data Preparation
// //   const updatedData = data.map(item => ({
// //     ...item,
// //     pathColor: item.pathColor || item.color,
// //   }));

// //   const values = updatedData.map(item => item.value);
// //   // Calculate Max/Min dynamically
// //   const dynamicMaxValue = Math.max(...values);
// //   const dynamicMinValue = Math.min(...values);

// //   // Use a slight buffer for the max value to keep the top dot from hitting the very top edge
// //   // const maxValue = dynamicMaxValue * 1.05;
// //   // const minValue = dynamicMinValue;

// //   // const maxValue = dynamicMaxValue * 1.05;
// //   // const minValue = dynamicMinValue;
// //   // Determine the final chart range: Use props if provided, otherwise use dynamic calculation
// //   const finalChartMaxValue =
// //     chartMaxValue !== undefined ? chartMaxValue : dynamicMaxValue * 1.05; // Use 1.05 buffer if dynamic

// //   const finalChartMinValue =
// //     chartMinValue !== undefined ? chartMinValue : dynamicMinValue;

// //   // The values used for normalization calculation
// //   const maxValue = finalChartMaxValue;
// //   const minValue = finalChartMinValue;

// //   // 2. Fixed Dimension Constants
// //   const chartHeight = 90;
// //   const chartWidth = width - 60;
// //   const barWidth = chartWidth / updatedData.length;
// //   const paddingVertical = 7;

// //   // Segment Dimensions (Total height: 20 + 40 + 20 = 80px)
// //   const SEG_HEIGHT_THIN = 20;
// //   const SEG_HEIGHT_THICK = 40;

// //   // Margin Calculation: (90 - 80) / 4 = 2.5px
// //   const MARGIN_HEIGHT = 2.5;

// //   const SEG_WIDTH_THIN = 4;
// //   const SEG_WIDTH_THICK = 6;
// //   const GRAY_COLOR = Colors.grayED;
// //   const COLOR_OPACITY = 0.3;
// //   const GRAY_OPACITY = 0.7;

// //   const lastValue = updatedData[updatedData.length - 1].value;

// //   // 3. Positioning Function
// //   // const getPosition = (index, value) => {
// //   //   // If max and min are the same, prevent division by zero and center the dot
// //   //   const usableHeight = chartHeight - 2 * paddingVertical;
// //   //   let normalizedValue;

// //   //   if (maxValue - minValue === 0) {
// //   //     normalizedValue = 0.5; // Center vertically if all values are the same
// //   //   } else {
// //   //     normalizedValue = (value - minValue) / (maxValue - minValue);
// //   //   }

// //   //   // Y position (from top): Min value maps to the bottom, Max value maps to the top
// //   //   const y = chartHeight - paddingVertical - normalizedValue * usableHeight;
// //   //   const x = index * barWidth + barWidth / 2;
// //   //   return { x, y };
// //   // };

// //   // 3. Positioning Function
// //   const getPosition = (index, value) => {
// //     // --- CLAMPING LOGIC ADDED HERE ---
// //     // Ensure the value used for positioning is within the defined chart range
// //     let clampedValue = Math.max(minValue, value); // Cap at minValue
// //     clampedValue = Math.min(maxValue, clampedValue); // Cap at maxValue

// //     const usableHeight = chartHeight - 2 * paddingVertical;
// //     let normalizedValue;

// //     if (maxValue - minValue === 0) {
// //       normalizedValue = 0.5; // Center vertically if the range is zero
// //     } else {
// //       // Use the clamped value for normalization
// //       normalizedValue = (clampedValue - minValue) / (maxValue - minValue);
// //     }

// //     // Y position (from top): Min value maps to the bottom, Max value maps to the top
// //     const y = chartHeight - paddingVertical - normalizedValue * usableHeight;
// //     const x = index * barWidth + barWidth / 2;
// //     return { x, y };
// //   };
// //   // 4. Path Generation (Cubic Bezier)
// //   const createPathSegments = () => {
// //     const positions = updatedData.map((item, index) =>
// //       getPosition(index, item.value),
// //     );
// //     const segments = [];

// //     if (positions.length < 2) return segments;

// //     for (let i = 1; i < positions.length; i++) {
// //       const p0 = positions[i - 1];
// //       const p1 = positions[i];

// //       const cX1 = p0.x + (p1.x - p0.x) / 2;
// //       const cY1 = p0.y;
// //       const cX2 = p1.x - (p1.x - p0.x) / 2;
// //       const cY2 = p1.y;

// //       const segmentPath = `M ${p0.x} ${p0.y} C ${cX1} ${cY1}, ${cX2} ${cY2}, ${p1.x} ${p1.y}`;

// //       segments.push({
// //         path: segmentPath,
// //         color: updatedData[i].pathColor,
// //       });
// //     }

// //     return segments;
// //   };

// //   // 6. Vertical Line Assembly Component (with coloring logic)
// //   const VerticalLineAssembly = ({ item, index }) => {
// //     const { color, value } = item;
// //     const centerX = index * barWidth + barWidth / 2;
// //     const { y: dotY } = getPosition(index, value);

// //     let topColor = GRAY_COLOR;
// //     let middleColor = GRAY_COLOR;
// //     let bottomColor = GRAY_COLOR;

// //     // Define segment visual boundaries from the top (0)
// //     const topSegStart = MARGIN_HEIGHT;
// //     const middleSegStart = topSegStart + SEG_HEIGHT_THIN + MARGIN_HEIGHT; // 2.5 + 20 + 2.5 = 25
// //     const middleSegEnd = middleSegStart + SEG_HEIGHT_THICK; // 25 + 40 = 65
// //     const bottomSegStart = middleSegEnd + MARGIN_HEIGHT; // 65 + 2.5 = 67.5

// //     // Logic: Color the segment based on which zone the dotY falls into.
// //     if (dotY <= middleSegStart) {
// //       // Dot is in the top zone (y <= 25)
// //       topColor = color;
// //     } else if (dotY > middleSegStart && dotY <= bottomSegStart) {
// //       // Dot is in the middle zone (25 < y <= 67.5)
// //       middleColor = color;
// //     } else {
// //       // Dot is in the bottom zone (y > 67.5)
// //       bottomColor = color;
// //     }

// //     return (
// //       <View
// //         style={[
// //           styles.verticalLineContainer,
// //           { left: centerX - SEG_WIDTH_THICK / 2 },
// //         ]}
// //       >
// //         {/* Top Spacer/Margin */}
// //         <View style={{ height: MARGIN_HEIGHT }} />

// //         {/* Top Thin Segment */}
// //         <View
// //           style={[
// //             styles.verticalSegment,
// //             {
// //               height: SEG_HEIGHT_THIN,
// //               width: SEG_WIDTH_THIN,
// //               backgroundColor: topColor,
// //               opacity: topColor === GRAY_COLOR ? GRAY_OPACITY : COLOR_OPACITY,
// //               borderRadius: 10,
// //             },
// //           ]}
// //         />

// //         {/* Middle Spacer/Margin */}
// //         <View style={{ height: MARGIN_HEIGHT }} />

// //         {/* Middle Thick Segment */}
// //         <View
// //           style={[
// //             styles.verticalSegment,
// //             {
// //               height: SEG_HEIGHT_THICK,
// //               width: SEG_WIDTH_THICK,
// //               backgroundColor: middleColor,
// //               opacity:
// //                 middleColor === GRAY_COLOR ? GRAY_OPACITY : COLOR_OPACITY,
// //               borderRadius: 10,
// //             },
// //           ]}
// //         />

// //         {/* Bottom Spacer/Margin */}
// //         <View style={{ height: MARGIN_HEIGHT }} />

// //         {/* Bottom Thin Segment */}
// //         <View
// //           style={[
// //             styles.verticalSegment,
// //             {
// //               height: SEG_HEIGHT_THIN,
// //               width: SEG_WIDTH_THIN,
// //               backgroundColor: bottomColor,
// //               opacity:
// //                 bottomColor === GRAY_COLOR ? GRAY_OPACITY : COLOR_OPACITY,
// //               borderRadius: 10,
// //             },
// //           ]}
// //         />

// //         {/* Bottom-most Spacer/Margin */}
// //         <View style={{ height: MARGIN_HEIGHT }} />
// //       </View>
// //     );
// //   };
// //   // --------------------------------------------------------

// //   return (
// //     <View
// //       style={styles.container}
// //       activeOpacity={0.8}
// //       // onPress={() => navigation.navigate('BottomTab')}
// //     >
// //       {/* Chart Container */}
// //       <View style={styles.chartContainer}>
// //         {/* Vertical Lines */}
// //         <View style={styles.backgroundLines}>
// //           {updatedData.map((item, index) => (
// //             <VerticalLineAssembly key={index} item={item} index={index} />
// //           ))}
// //         </View>

// //         {/* SVG for curved connecting line with segment colors */}
// //         <Svg
// //           height={chartHeight}
// //           width={chartWidth}
// //           style={styles.svgContainer}
// //         >
// //           {createPathSegments().map((segment, index) => (
// //             <Path
// //               key={index}
// //               d={segment.path}
// //               stroke={segment.color}
// //               strokeWidth="5"
// //               fill="none"
// //               opacity={0.2}
// //             />
// //           ))}
// //         </Svg>

// //         {/* Bars/Dots positioned exactly on the line */}
// //         <View style={styles.barsContainer}>
// //           {updatedData.map((item, index) => {
// //             const position = getPosition(index, item.value);

// //             return (
// //               <View
// //                 key={index}
// //                 style={[
// //                   styles.dotContainer,
// //                   {
// //                     left: position.x - 12,
// //                     top: position.y - 6,
// //                   },
// //                 ]}
// //               >
// //                 {/* Subtle Outer Glow/Ring */}
// //                 <View
// //                   style={[
// //                     styles.glowEffect,
// //                     {
// //                       backgroundColor: Colors.white,
// //                       borderRadius: 100,
// //                       ...((item.color === '#3182CE' ||
// //                         item.color === '#D4A928' ||
// //                         item.color === '#E53E3E') && {
// //                         shadowColor: '#000',
// //                         shadowOffset: {
// //                           width: 0,
// //                           height: 2,
// //                         },
// //                         shadowOpacity: 0.25,
// //                         shadowRadius: 3.84,

// //                         elevation: 5,
// //                       }),
// //                     },
// //                   ]}
// //                 />

// //                 {/* The main rounded rectangle bar */}
// //                 <View
// //                   style={[
// //                     styles.coloredBar,
// //                     {
// //                       backgroundColor: item.color,
// //                     },
// //                   ]}
// //                 />
// //               </View>
// //             );
// //           })}
// //         </View>
// //       </View>

// //       {/* Values and Dates */}
// //       <View style={styles.labelsContainer}>
// //         {updatedData.map((item, index) => {
// //           const centerX = index * barWidth + barWidth / 2;
// //           return (
// //             <View
// //               key={index}
// //               style={[
// //                 styles.labelContainer,
// //                 {
// //                   position: 'absolute',
// //                   left: centerX - 25,
// //                   width: 50,
// //                 },
// //               ]}
// //             >
// //               <Text style={[styles.valueText]}>{item.value}</Text>
// //               <Text style={styles.dateText}>{item.date}</Text>
// //             </View>
// //           );
// //         })}
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     marginLeft: -5,
// //   },
// //   emptyContainer: {
// //     height: 180,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   chevronLine1: {
// //     width: 8,
// //     height: 2,
// //     backgroundColor: '#999999',
// //     transform: [{ rotate: '45deg' }, { translateY: -2 }],
// //     position: 'absolute',
// //   },
// //   chevronLine2: {
// //     width: 8,
// //     height: 2,
// //     backgroundColor: '#999999',
// //     transform: [{ rotate: '-45deg' }, { translateY: 2 }],
// //     position: 'absolute',
// //   },
// //   chartContainer: {
// //     height: 90,
// //     position: 'relative',
// //     marginBottom: getHeight(8),
// //   },
// //   backgroundLines: {
// //     position: 'absolute',
// //     width: '100%',
// //     height: '100%',
// //   },
// //   verticalLineContainer: {
// //     position: 'absolute',
// //     height: '100%',
// //     flexDirection: 'column',
// //     justifyContent: 'flex-start',
// //     alignItems: 'center',
// //   },
// //   verticalSegment: {
// //     alignSelf: 'center',
// //   },
// //   svgContainer: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //   },
// //   barsContainer: {
// //     position: 'absolute',
// //     width: '100%',
// //     height: '100%',
// //   },
// //   dotContainer: {
// //     position: 'absolute',
// //     width: 24,
// //     height: 11,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   coloredBar: {
// //     width: 24,
// //     height: 8,
// //     borderRadius: 6,
// //     zIndex: 1,
// //   },
// //   glowEffect: {
// //     position: 'absolute',
// //     width: 30,
// //     height: 13,
// //     borderRadius: 4,
// //     left: -3,
// //     top: -1,
// //     zIndex: 0,
// //   },
// //   labelsContainer: {
// //     position: 'relative',
// //     height: 40,
// //   },
// //   labelContainer: {
// //     alignItems: 'center',
// //     fontFamily: fontsfamily.bold,
// //     fontSize: fontSize.size12,
// //   },
// //   valueText: {
// //     color: Colors.gray0F,
// //     fontFamily: fontsfamily.bold,
// //     fontSize: fontSize.size12,
// //     marginBottom: 4,
// //   },
// //   dateText: {
// //     color: Colors.gray55,
// //     fontFamily: fontsfamily.regular,
// //     fontSize: fontSize.size12,
// //   },
// // });

// // export default VerticalBarChartProfile;
// const VerticalBarChartProfile = ({
//   data = [],
//   chartMaxValue,
//   chartMinValue,
// }) => {
//   // -------------------------
//   // Threshold configuration
//   // -------------------------
//   // moderate = max/min ± (span * MODERATE_FACTOR)
//   // extreme  = max/min ± (span * EXTREME_FACTOR)
//   const MODERATE_FACTOR = 0.5; // e.g. if span = 0.4 and max=0.54 -> moderateHigh = 0.54 + 0.4*0.5 = 0.74
//   const EXTREME_FACTOR = 1.5; // used if you need explicit extreme bound (not strictly required to compute color)

//   // -------------------------
//   // 1) compute dynamic min/max first
//   // -------------------------
//   const rawValues = data.length ? data.map(i => Number(i.value) || 0) : [0];
//   const dynamicMaxValue = Math.max(...rawValues);
//   const dynamicMinValue = Math.min(...rawValues);

//   const finalChartMaxValue =
//     chartMaxValue !== undefined ? chartMaxValue : dynamicMaxValue * 1.05;
//   const finalChartMinValue =
//     chartMinValue !== undefined ? chartMinValue : dynamicMinValue;

//   const span = Math.abs(finalChartMaxValue - finalChartMinValue) || 1;

//   // moderate thresholds (upper and lower)
//   const moderateHighThreshold = finalChartMaxValue + span * MODERATE_FACTOR;
//   const moderateLowThreshold = finalChartMinValue - span * MODERATE_FACTOR;

//   // extreme thresholds (optional if you want explicit check)
//   const extremeHighThreshold = finalChartMaxValue + span * EXTREME_FACTOR;
//   const extremeLowThreshold = finalChartMinValue - span * EXTREME_FACTOR;

//   // -------------------------
//   // 2) value -> (color, severity) mapping
//   // severity one of:
//   // 'middle' | 'top-moderate' | 'top-extreme' | 'bottom-moderate' | 'bottom-extreme'
//   // -------------------------
//   const getValueColorAndSeverity = value => {
//     const v = Number(value);

//     // inside range → middle (blue)
//     if (v >= finalChartMinValue && v <= finalChartMaxValue) {
//       return { color: Colors.blue1C, severity: 'middle' };
//     }

//     // above max
//     if (v > finalChartMaxValue) {
//       if (v >= moderateHighThreshold) {
//         // extremely high
//         return { color: Colors.redCA, severity: 'top-extreme' };
//       } else {
//         // moderately high
//         return { color: Colors.goldenCA, severity: 'top-moderate' };
//       }
//     }

//     // below min
//     if (v < finalChartMinValue) {
//       if (v <= moderateLowThreshold) {
//         // extremely low
//         return { color: Colors.redCA, severity: 'bottom-extreme' };
//       } else {
//         // moderately low
//         return { color: Colors.goldenCA, severity: 'bottom-moderate' };
//       }
//     }

//     // fallback
//     return { color: Colors.grayED, severity: 'middle' };
//   };

//   // -------------------------
//   // 3) build updatedData using computed colors
//   // -------------------------
//   const updatedData = data.map(item => {
//     const { color, severity } = getValueColorAndSeverity(item.value);
//     return {
//       ...item,
//       color,
//       pathColor: color,
//       _severity: severity,
//     };
//   });

//   // -------------------------
//   // layout constants
//   // -------------------------
//   const chartHeight = 90;
//   const chartWidth = width - 60;
//   const barWidth = chartWidth / Math.max(updatedData.length, 1);
//   const paddingVertical = 7;

//   const SEG_HEIGHT_THIN = 20;
//   const SEG_HEIGHT_THICK = 40;
//   const MARGIN_HEIGHT = 2.5;
//   const SEG_WIDTH_THIN = 4;
//   const SEG_WIDTH_THICK = 6;

//   const GRAY_COLOR = Colors.grayED;
//   const COLOR_OPACITY = 0.25; // visibility for active segments
//   const INACTIVE_OPACITY = 1;

//   // -------------------------
//   // positioning
//   // -------------------------
//   // const getPosition = (index, value) => {
//   //   const clampedValue = Math.min(
//   //     finalChartMaxValue,
//   //     Math.max(finalChartMinValue, Number(value)),
//   //   );

//   //   const usableHeight = chartHeight - paddingVertical * 2;

//   //   const normalized =
//   //     finalChartMaxValue - finalChartMinValue === 0
//   //       ? 0.5
//   //       : (clampedValue - finalChartMinValue) /
//   //         (finalChartMaxValue - finalChartMinValue);

//   //   const x = index * barWidth + barWidth / 2;
//   //   const y = chartHeight - paddingVertical - normalized * usableHeight;
//   //   return { x, y };
//   // };
//   // const getPosition = (index, value) => {
//   //   const v = Number(value);
  
//   //   // Clamp only inside the middle logical range, not whole chart
//   //   const unclamped = (v - finalChartMinValue) / (finalChartMaxValue - finalChartMinValue);
  
//   //   // clamp between 0–1
//   //   const normalized = Math.max(0, Math.min(1, unclamped));
  
//   //   // MIDDLE SEGMENT POSITION RANGE
//   //   const middleStartY = MARGIN_HEIGHT + SEG_HEIGHT_THIN + MARGIN_HEIGHT;      // start of thick segment
//   //   const middleEndY = middleStartY + SEG_HEIGHT_THICK;                        // end of thick segment
  
//   //   // We want maxValue → middleStartY (top of middle)
//   //   // We want minValue → middleEndY (bottom of middle)
//   //   const y = middleEndY - normalized * (middleEndY - middleStartY);
  
//   //   const x = index * barWidth + barWidth / 2;
//   //   return { x, y };
//   // };
//   const getPosition = (index, value) => {
//     const v = Number(value);
  
//     // SEGMENT Y POSITIONS
//     const topStartY = MARGIN_HEIGHT;                                         // top segment TOP
//     const topEndY = topStartY + SEG_HEIGHT_THIN;                             // top segment BOTTOM
  
//     const middleStartY = topEndY + MARGIN_HEIGHT;                            // middle segment TOP
//     const middleEndY = middleStartY + SEG_HEIGHT_THICK;                      // middle segment BOTTOM
  
//     const bottomStartY = middleEndY + MARGIN_HEIGHT;                         // bottom segment TOP
//     const bottomEndY = bottomStartY + SEG_HEIGHT_THIN;                       // bottom segment BOTTOM
  
//     let y;
  
//     // -----------------------
//     // 1) EXTREME HIGH
//     // -----------------------
//     if (v >= moderateHighThreshold) {
//       y = topStartY;  // stick dot at very top
//     }
  
//     // -----------------------
//     // 2) MODERATE HIGH
//     // -----------------------
//     else if (v > finalChartMaxValue) {
//       // proportional mapping inside top thin segment
//       const ratio = (v - finalChartMaxValue) / (moderateHighThreshold - finalChartMaxValue);
//       y = topEndY - ratio * (topEndY - topStartY);
//     }
  
//     // -----------------------
//     // 3) NORMAL RANGE (middle)
//     // -----------------------
//     else if (v >= finalChartMinValue && v <= finalChartMaxValue) {
//       const ratio = (v - finalChartMinValue) / (finalChartMaxValue - finalChartMinValue);
//       y = middleEndY - ratio * (middleEndY - middleStartY);
//     }
  
//     // -----------------------
//     // 4) MODERATE LOW
//     // -----------------------
//     else if (v >= moderateLowThreshold) {
//       const ratio = (finalChartMinValue - v) / (finalChartMinValue - moderateLowThreshold);
//       y = bottomStartY + ratio * (bottomEndY - bottomStartY);
//     }
  
//     // -----------------------
//     // 5) EXTREME LOW
//     // -----------------------
//     else {
//       y = bottomEndY; // stick dot at very bottom
//     }
  
//     const x = index * barWidth + barWidth / 2;
//     return { x, y };
//   };
  
  

//   // -------------------------
//   // path segments (curved line)
//   // use the color of the target point for each segment (as before)
//   // -------------------------
//   const createPathSegments = () => {
//     const positions = updatedData.map((item, index) =>
//       getPosition(index, item.value),
//     );
//     const segments = [];
//     if (positions.length < 2) return segments;

//     for (let i = 1; i < positions.length; i++) {
//       const p0 = positions[i - 1];
//       const p1 = positions[i];

//       const cX1 = p0.x + (p1.x - p0.x) / 2;
//       const cY1 = p0.y;
//       const cX2 = p1.x - (p1.x - p0.x) / 2;
//       const cY2 = p1.y;

//       const segmentPath = `M ${p0.x} ${p0.y} C ${cX1} ${cY1}, ${cX2} ${cY2}, ${p1.x} ${p1.y}`;

//       segments.push({
//         path: segmentPath,
//         color: updatedData[i].pathColor,
//       });
//     }

//     return segments;
//   };

//   // -------------------------
//   // Vertical segments component
//   // Use severity to decide which part to color and whether yellow/red for moderate/extreme
//   // -------------------------
//   const VerticalLineAssembly = ({ item, index }) => {
//     const { value, color, _severity } = item;
//     const centerX = index * barWidth + barWidth / 2;

//     // default grey
//     let topColor = GRAY_COLOR;
//     let middleColor = GRAY_COLOR;
//     let bottomColor = GRAY_COLOR;

//     // fill according to severity
//     if (_severity === 'middle') {
//       middleColor = color; // blue
//     } else if (_severity === 'top-moderate') {
//       topColor = color; // yellow
//     } else if (_severity === 'top-extreme') {
//       topColor = color; // red
//     } else if (_severity === 'bottom-moderate') {
//       bottomColor = color; // yellow
//     } else if (_severity === 'bottom-extreme') {
//       bottomColor = color; // red
//     }

//     // opacities
//     const topOpacity = topColor === GRAY_COLOR ? INACTIVE_OPACITY : COLOR_OPACITY;
//     const middleOpacity = middleColor === GRAY_COLOR ? INACTIVE_OPACITY : COLOR_OPACITY;
//     const bottomOpacity = bottomColor === GRAY_COLOR ? INACTIVE_OPACITY : COLOR_OPACITY;

//     return (
//       <View
//         style={[
//           styles.verticalLineContainer,
//           { left: centerX - SEG_WIDTH_THICK / 2 },
//         ]}
//       >
//         <View style={{ height: MARGIN_HEIGHT }} />

//         {/* TOP (thin) */}
//         <View
//           style={[
//             styles.verticalSegment,
//             {
//               height: SEG_HEIGHT_THIN,
//               width: SEG_WIDTH_THIN,
//               backgroundColor: topColor,
//               opacity: topOpacity,
//               borderRadius: 10,
//             },
//           ]}
//         />

//         <View style={{ height: MARGIN_HEIGHT }} />

//         {/* MIDDLE (thick) */}
//         <View
//           style={[
//             styles.verticalSegment,
//             {
//               height: SEG_HEIGHT_THICK,
//               width: SEG_WIDTH_THICK,
//               backgroundColor: middleColor,
//               opacity: middleOpacity,
//               borderRadius: 10,
//             },
//           ]}
//         />

//         <View style={{ height: MARGIN_HEIGHT }} />

//         {/* BOTTOM (thin) */}
//         <View
//           style={[
//             styles.verticalSegment,
//             {
//               height: SEG_HEIGHT_THIN,
//               width: SEG_WIDTH_THIN,
//               backgroundColor: bottomColor,
//               opacity: bottomOpacity,
//               borderRadius: 10,
//             },
//           ]}
//         />

//         <View style={{ height: MARGIN_HEIGHT }} />
//       </View>
//     );
//   };

//   // -------------------------
//   // Render
//   // -------------------------
//   return (
//     <View style={styles.container}>
//       <View style={styles.chartContainer}>
//         <View style={styles.backgroundLines}>
//           {updatedData.map((item, idx) => (
//             <VerticalLineAssembly key={idx} item={item} index={idx} />
//           ))}
//         </View>

//         <Svg height={chartHeight} width={chartWidth} style={styles.svgContainer}>
//           {createPathSegments().map((segment, i) => (
//             <Path
//               key={i}
//               d={segment.path}
//               stroke={segment.color}
//               strokeWidth="5"
//               fill="none"
//               opacity={0.25}
//             />
//           ))}
//         </Svg>

//         <View style={styles.barsContainer}>
//           {updatedData.map((item, index) => {
//             const pos = getPosition(index, item.value);

//             // Glow style: stronger for moderate/extreme
//             const glowShadow =
//               item._severity === 'middle'
//                 ? {}
//                 : {
//                     shadowColor: '#000',
//                     shadowOffset: { width: 0, height: 2 },
//                     shadowOpacity: 0.25,
//                     shadowRadius: 3.84,
//                     elevation: 5,
//                   };

//             return (
//               <View
//                 key={index}
//                 style={[
//                   styles.dotContainer,
//                   { left: pos.x - 12, top: pos.y - 6 },
//                 ]}
//               >
//                 <View
//                   style={[
//                     styles.glowEffect,
//                     { backgroundColor: Colors.white, borderRadius: 100 },
//                     glowShadow,
//                   ]}
//                 />
//                 <View
//                   style={[
//                     styles.coloredBar,
//                     { backgroundColor: item.color },
//                   ]}
//                 />
//               </View>
//             );
//           })}
//         </View>
//       </View>

//       {/* labels */}
//       <View style={styles.labelsContainer}>
//         {updatedData.map((item, index) => {
//           const centerX = index * barWidth + barWidth / 2;
//           return (
//             <View
//               key={index}
//               style={[
//                 styles.labelContainer,
//                 { left: centerX - 25, width: 50 },
//               ]}
//             >
//               <Text style={styles.valueText}>{String(item.value)}</Text>
//               <Text style={styles.dateText}>{item.date}</Text>
//             </View>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// // -------------------------
// // Styles
// // -------------------------
// const styles = StyleSheet.create({
//   container: { marginLeft: -5 },
//   chartContainer: { height: 90, position: 'relative', marginBottom: getHeight(8) },
//   backgroundLines: { position: 'absolute', width: '100%', height: '100%' },
//   verticalLineContainer: { position: 'absolute', height: '100%', alignItems: 'center' },
//   verticalSegment: { alignSelf: 'center' },
//   svgContainer: { position: 'absolute', top: 0, left: 0 },
//   barsContainer: { position: 'absolute', width: '100%', height: '100%' },
//   dotContainer: { position: 'absolute', width: 24, height: 11, justifyContent: 'center', alignItems: 'center' },
//   coloredBar: { width: 24, height: 8, borderRadius: 6, zIndex: 1 },
//   glowEffect: { position: 'absolute', width: 30, height: 13, borderRadius: 4, left: -3, top: -1, zIndex: 0 },
//   labelsContainer: { position: 'relative', height: 40 },
//   labelContainer: { position: 'absolute', alignItems: 'center', fontFamily: fontsfamily.bold, fontSize: fontSize.size12 },
//   valueText: { color: Colors.gray0F, fontFamily: fontsfamily.bold, fontSize: fontSize.size12, marginBottom: 4 },
//   dateText: { color: Colors.gray55, fontFamily: fontsfamily.regular, fontSize: fontSize.size12 },
// });

// export default VerticalBarChartProfile;


import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Polyline, Circle, Defs, LinearGradient, Stop, Path } from "react-native-svg";
import { Colors } from "../constants/Colors";
import { fontsfamily } from "../constants/FontFamily";
import { fontSize } from "../constants/FontSizes";

const VerticalBarChart = ({
  data = [],
  chartMinValue,
  chartMaxValue,
}) => {
  if (!data.length) return null;

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.90;
  const horizontalPadding = 15;

  const values = data.map((i) => Number(i.value));

  const chartHeight = 90;
  const SAFE_PADDING = 8;                            // <-- NEW FIX
  const svgHeight = chartHeight + SAFE_PADDING * 2;   // <-- EXTRA HEIGHT

  const chartWidth = (cardWidth - 32) - horizontalPadding * 2;
  const barWidth = chartWidth / (data.length - 1);

  // --------------------------------------------------------------------
  // COLOR LOGIC
  // --------------------------------------------------------------------
  // const getColor = (value) => {
  //   const v = Number(value);
  //   if (v > chartMaxValue) return Colors.redCA;
  //   if (v < chartMinValue) return Colors.redCA;
  //   if (v === Math.max(...values)) return Colors.blue1C;
  //   return Colors.goldenCA;
  // };
  const getColor = (value) => {
    const v = Number(value);
  
    // EXTREME HIGH / EXTREME LOW
    if (v > extendedMax) return Colors.redCA;
    if (v < extendedMin) return Colors.redCA;
  
    // Slightly above or below
    if (v > chartMaxValue) return Colors.goldenCA;
    if (v < chartMinValue) return Colors.goldenCA;
  
    // Within safe range
    return Colors.blue1C;
  };

  // --------------------------------------------------------------------
  // EXTENDED RANGE LOGIC (dynamic — no static values)
  // --------------------------------------------------------------------
  const span = chartMaxValue - chartMinValue || 1;
  const extendedMax = chartMaxValue + span; // TOP extra range
  const extendedMin = chartMinValue - span; // BOTTOM extra range

  // --------------------------------------------------------------------
  // POSITION CALCULATION WITH SAFE PADDING
  // --------------------------------------------------------------------
  const getPoint = (index, value) => {
    const v = Number(value);

    // FIXED Y POSITIONS + SAFE PADDING ADDED
    const Y_TOP_START = 0 + SAFE_PADDING;
    const Y_TOP_END = 32 + SAFE_PADDING;
    const Y_MID_TOP = 32 + SAFE_PADDING;
    const Y_MID_BOTTOM = 62 + SAFE_PADDING;
    const Y_BOTTOM_START = 62 + SAFE_PADDING;
    const Y_BOTTOM_END = 90 + SAFE_PADDING;

    const clamp = (x, min, max) => Math.min(Math.max(x, min), max);

    let y;

    // EXTREME HIGH (above extendedMax)
    if (v >= extendedMax) {
      y = Y_TOP_START;
    }

    // HIGH ZONE (chartMax → extendedMax)
    else if (v > chartMaxValue) {
      const r = (v - chartMaxValue) / (extendedMax - chartMaxValue);
      y = Y_MID_TOP - r * (Y_MID_TOP - Y_TOP_END);
    }

    // MID ZONE (chartMin → chartMax)
    else if (v >= chartMinValue) {
      const r = (v - chartMinValue) / (chartMaxValue - chartMinValue);
      y = Y_MID_BOTTOM - r * (Y_MID_BOTTOM - Y_MID_TOP);
    }

    // LOW ZONE (extendedMin → chartMin)
    else if (v >= extendedMin) {
      const r = (chartMinValue - v) / (chartMinValue - extendedMin);
      y = Y_MID_BOTTOM + r * (Y_BOTTOM_END - Y_MID_BOTTOM);
    }

    // EXTREME LOW
    else {
      y = Y_BOTTOM_END;
    }

    const x = horizontalPadding + index * barWidth;
    return { x, y };
  };

  const points = data.map((item, index) => getPoint(index, item.value));

  return (
    <View style={styles.container}>

      <Svg width={chartWidth + horizontalPadding * 2} height={svgHeight}>

        {/* -----------------------------------------------------
            GRADIENT DEFINITIONS
        ------------------------------------------------------ */}
        <Defs>
          {points.slice(0, -1).map((p, i) => (
            <LinearGradient
              key={`grad-${i}`}
              id={`grad_${i}`}
              x1={p.x}
              y1={p.y}
              x2={points[i + 1].x}
              y2={points[i + 1].y}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor={getColor(data[i].value)} />
              <Stop offset="100%" stopColor={getColor(data[i + 1].value)} />
            </LinearGradient>
          ))}
        </Defs>

        {/* TOP FADED BARS */}
        {points.map((p, i) => (
          <Polyline
            key={`topbar-${i}`}
            points={`${p.x},${SAFE_PADDING} ${p.x},${32 + SAFE_PADDING}`}
            stroke="#E5E5E5"
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.45}
          />
        ))}

        {/* BOTTOM FADED BARS */}
        {points.map((p, i) => (
          <Polyline
            key={`botbar-${i}`}
            points={`${p.x},${62 + SAFE_PADDING} ${p.x},${90 + SAFE_PADDING}`}
            stroke="#E5E5E5"
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.45}
          />
        ))}

        {/* DASHED MID LINES */}
        <Polyline
          points={`0,${32 + SAFE_PADDING} ${(chartWidth + horizontalPadding * 2)},${32 + SAFE_PADDING}`}
          stroke="#EDEDF0"
          strokeWidth={2}
          strokeDasharray="6,6"
          opacity={0.55}
        />

        <Polyline
          points={`0,${62 + SAFE_PADDING} ${(chartWidth + horizontalPadding * 2)},${62 + SAFE_PADDING}`}
          stroke="#EDEDF0"
          strokeWidth={2}
          strokeDasharray="6,6"
          opacity={0.55}
        />

        {/* GRADIENT CONNECTING LINES */}
        {points.slice(0, -1).map((p0, i) => (
          <Path
            key={`seg-${i}`}
            d={`M ${p0.x},${p0.y} L ${points[i + 1].x},${points[i + 1].y}`}
            stroke={`url(#grad_${i})`}
            strokeWidth={2}
            fill="none"
          />
        ))}

        {/* DOTS */}
        {points.map((p, index) => (
          <Circle
            key={index}
            cx={p.x}
            cy={p.y}
            r={8}
            fill={getColor(data[index].value)}
          />
        ))}
      </Svg>

      {/* LABELS */}
      <View style={styles.labelsContainer}>
        {data.map((item, index) => {
          const left = points[index].x - 22;
          const isLast = index === data.length - 1;

          return (
            <View key={index} style={[styles.labelBox, { left }]}>
              <Text style={[styles.valueText, isLast && styles.lastValueText]}>
                {String(item.value)}
              </Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          );
        })}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 10 },
  labelsContainer: {
    position: "relative",
    width: "100%",
    height: 40,
    marginTop: 4,
  },
  labelBox: { position: "absolute", width: 50, alignItems: "center" },
  valueText: {
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    color: Colors.gray0F,
  },
  lastValueText: {
    color: Colors.black,
    fontFamily: fontsfamily.bold,
  },
  dateText: {
    marginTop: 2,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
  },
});

export default VerticalBarChart;