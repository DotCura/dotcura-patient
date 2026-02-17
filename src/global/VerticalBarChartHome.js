


// //latest workign code
// import React from "react";
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// import Svg, { Polyline, Circle, Defs, LinearGradient, Stop, Path } from "react-native-svg";
// import { Colors } from "../constants/Colors";
// import { fontsfamily } from "../constants/FontFamily";
// import { fontSize } from "../constants/FontSizes";

// const VerticalBarChart = ({
//   data = [],
//   chartMinValue,
//   chartMaxValue,
// }) => {
//   if (!data.length) return null;

//   const screenWidth = Dimensions.get("window").width;
//   const cardWidth = screenWidth * 0.85;
//   const horizontalPadding = 12;

//   const values = data.map((i) => Number(i.value));

//   const chartHeight = 90;
//   const SAFE_PADDING = 8;                            // <-- NEW FIX
//   const svgHeight = chartHeight + SAFE_PADDING * 2;   // <-- EXTRA HEIGHT

//   const chartWidth = (cardWidth - 32) - horizontalPadding * 2;
//   const barWidth = chartWidth / (data.length - 1);

//   // --------------------------------------------------------------------
//   // COLOR LOGIC
//   // --------------------------------------------------------------------
//   // const getColor = (value) => {
//   //   const v = Number(value);
//   //   if (v > chartMaxValue) return Colors.redCA;
//   //   if (v < chartMinValue) return Colors.redCA;
//   //   if (v === Math.max(...values)) return Colors.blue1C;
//   //   return Colors.goldenCA;
//   // };
//   const getColor = (value) => {
//     const v = Number(value);
  
//     // EXTREME HIGH / EXTREME LOW
//     if (v > extendedMax) return Colors.redCA;
//     if (v < extendedMin) return Colors.redCA;
  
//     // Slightly above or below
//     if (v > chartMaxValue) return Colors.goldenCA;
//     if (v < chartMinValue) return Colors.goldenCA;
  
//     // Within safe range
//     return Colors.blue1C;
//   };

//   // --------------------------------------------------------------------
//   // EXTENDED RANGE LOGIC (dynamic — no static values)
//   // --------------------------------------------------------------------
//   const span = chartMaxValue - chartMinValue || 1;
//   const extendedMax = chartMaxValue + span; // TOP extra range
//   const extendedMin = chartMinValue - span; // BOTTOM extra range

//   // --------------------------------------------------------------------
//   // POSITION CALCULATION WITH SAFE PADDING
//   // --------------------------------------------------------------------
//   const getPoint = (index, value) => {
//     const v = Number(value);

//     // FIXED Y POSITIONS + SAFE PADDING ADDED
//     const Y_TOP_START = 0 + SAFE_PADDING;
//     const Y_TOP_END = 32 + SAFE_PADDING;
//     const Y_MID_TOP = 32 + SAFE_PADDING;
//     const Y_MID_BOTTOM = 62 + SAFE_PADDING;
//     const Y_BOTTOM_START = 62 + SAFE_PADDING;
//     const Y_BOTTOM_END = 90 + SAFE_PADDING;

//     const clamp = (x, min, max) => Math.min(Math.max(x, min), max);

//     let y;

//     // EXTREME HIGH (above extendedMax)
//     if (v >= extendedMax) {
//       y = Y_TOP_START;
//     }

//     // HIGH ZONE (chartMax → extendedMax)
//     else if (v > chartMaxValue) {
//       const r = (v - chartMaxValue) / (extendedMax - chartMaxValue);
//       y = Y_MID_TOP - r * (Y_MID_TOP - Y_TOP_END);
//     }

//     // MID ZONE (chartMin → chartMax)
//     else if (v >= chartMinValue) {
//       const r = (v - chartMinValue) / (chartMaxValue - chartMinValue);
//       y = Y_MID_BOTTOM - r * (Y_MID_BOTTOM - Y_MID_TOP);
//     }

//     // LOW ZONE (extendedMin → chartMin)
//     else if (v >= extendedMin) {
//       const r = (chartMinValue - v) / (chartMinValue - extendedMin);
//       y = Y_MID_BOTTOM + r * (Y_BOTTOM_END - Y_MID_BOTTOM);
//     }

//     // EXTREME LOW
//     else {
//       y = Y_BOTTOM_END;
//     }

//     const x = horizontalPadding + index * barWidth;
//     return { x, y };
//   };

//   const points = data.map((item, index) => getPoint(index, item.value));

//   return (
//     <View style={styles.container}>

//       <Svg width={chartWidth + horizontalPadding * 2} height={svgHeight}>

//         {/* -----------------------------------------------------
//             GRADIENT DEFINITIONS
//         ------------------------------------------------------ */}
//         <Defs>
//           {points.slice(0, -1).map((p, i) => (
//             <LinearGradient
//               key={`grad-${i}`}
//               id={`grad_${i}`}
//               x1={p.x}
//               y1={p.y}
//               x2={points[i + 1].x}
//               y2={points[i + 1].y}
//               gradientUnits="userSpaceOnUse"
//             >
//               <Stop offset="0%" stopColor={getColor(data[i].value)} />
//               <Stop offset="100%" stopColor={getColor(data[i + 1].value)} />
//             </LinearGradient>
//           ))}
//         </Defs>

//         {/* TOP FADED BARS */}
//         {points.map((p, i) => (
//           <Polyline
//             key={`topbar-${i}`}
//             points={`${p.x},${SAFE_PADDING} ${p.x},${32 + SAFE_PADDING}`}
//             stroke="#E5E5E5"
//             strokeWidth={4}
//             strokeLinecap="round"
//             opacity={0.45}
//           />
//         ))}

//         {/* BOTTOM FADED BARS */}
//         {points.map((p, i) => (
//           <Polyline
//             key={`botbar-${i}`}
//             points={`${p.x},${62 + SAFE_PADDING} ${p.x},${90 + SAFE_PADDING}`}
//             stroke="#E5E5E5"
//             strokeWidth={4}
//             strokeLinecap="round"
//             opacity={0.45}
//           />
//         ))}

//         {/* DASHED MID LINES */}
//         <Polyline
//           points={`0,${32 + SAFE_PADDING} ${(chartWidth + horizontalPadding * 2)},${32 + SAFE_PADDING}`}
//           stroke="#EDEDF0"
//           strokeWidth={2}
//           strokeDasharray="6,6"
//           opacity={0.55}
//         />

//         <Polyline
//           points={`0,${62 + SAFE_PADDING} ${(chartWidth + horizontalPadding * 2)},${62 + SAFE_PADDING}`}
//           stroke="#EDEDF0"
//           strokeWidth={2}
//           strokeDasharray="6,6"
//           opacity={0.55}
//         />

//         {/* GRADIENT CONNECTING LINES */}
//         {points.slice(0, -1).map((p0, i) => (
//           <Path
//             key={`seg-${i}`}
//             d={`M ${p0.x},${p0.y} L ${points[i + 1].x},${points[i + 1].y}`}
//             stroke={`url(#grad_${i})`}
//             strokeWidth={2}
//             fill="none"
//           />
//         ))}

//         {/* DOTS */}
//         {points.map((p, index) => (
//           <Circle
//             key={index}
//             cx={p.x}
//             cy={p.y}
//             r={8}
//             fill={getColor(data[index].value)}
//           />
//         ))}
//       </Svg>

//       {/* LABELS */}
//       <View style={styles.labelsContainer}>
//         {data.map((item, index) => {
//           const left = points[index].x - 22;
//           const isLast = index === data.length - 1;

//           return (
//             <View key={index} style={[styles.labelBox, { left }]}>
//               <Text style={[styles.valueText, isLast && styles.lastValueText]}>
//                 {String(item.value)}
//               </Text>
//               <Text style={styles.dateText}>{item.date}</Text>
//             </View>
//           );
//         })}
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { paddingTop: 10 },
//   labelsContainer: {
//     position: "relative",
//     width: "100%",
//     height: 40,
//     marginTop: 4,
//   },
//   labelBox: { position: "absolute", width: 50, alignItems: "center" },
//   valueText: {
//     fontSize: fontSize.size12,
//     fontFamily: fontsfamily.regular,
//     color: Colors.gray0F,
//   },
//   lastValueText: {
//     color: Colors.black,
//     fontFamily: fontsfamily.bold,
//   },
//   dateText: {
//     marginTop: 2,
//     fontSize: fontSize.size12,
//     fontFamily: fontsfamily.regular,
//     color: Colors.gray55,
//   },
// });

// export default VerticalBarChart;


//latest workign code api
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Polyline,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';
import { Colors } from '../constants/Colors';
import { fontsfamily } from '../constants/FontFamily';
import { fontSize } from '../constants/FontSizes';
import { formatDateToSpanishChart } from '../constants/GConstant';

const VerticalBarChart = ({ data = [], chartMinValue, chartMaxValue }) => {
  if (!data.length) return null;

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.85;
  const horizontalPadding = 12;

  const values = data.map(i => Number(i.value));

  const chartHeight = 90;
  const SAFE_PADDING = 8; // <-- NEW FIX
  const svgHeight = chartHeight + SAFE_PADDING * 2; // <-- EXTRA HEIGHT

  const chartWidth = cardWidth - 32 - horizontalPadding * 2;
  // const barWidth = chartWidth / (data.length - 1);
  const safeLength = Math.max(data.length - 1, 1);
  const barWidth = chartWidth / safeLength;
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
  const getColor = value => {
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
          points={`0,${32 + SAFE_PADDING} ${
            chartWidth + horizontalPadding * 2
          },${32 + SAFE_PADDING}`}
          stroke="#EDEDF0"
          strokeWidth={2}
          strokeDasharray="6,6"
          opacity={0.55}
        />

        <Polyline
          points={`0,${62 + SAFE_PADDING} ${
            chartWidth + horizontalPadding * 2
          },${62 + SAFE_PADDING}`}
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
              <Text style={styles.dateText}>
                {formatDateToSpanishChart(item.date)}
              </Text>
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
    position: 'relative',
    width: '100%',
    height: 40,
    marginTop: 4,
  },
  labelBox: { position: 'absolute', width: 50, alignItems: 'center' },
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
    textAlign: 'center',
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
  },
});

export default VerticalBarChart;





