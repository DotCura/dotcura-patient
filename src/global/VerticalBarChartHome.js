import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { getHeight } from '../constants/utils/Dimensions';
import { Colors } from '../constants/Colors';
import { fontsfamily } from '../constants/FontFamily';
import { fontSize } from '../constants/FontSizes';

const { width } = Dimensions.get('window');

// --- Component Definition ---
const VerticalBarChart = ({
  data,
  title = 'Glicemia',
  subtitleText = 'Ultimo valore',
  chartMaxValue, // New Prop
  navigation,
  chartMinValue, // New Prop
}) => {
  // 1. Dynamic Data Preparation
  const updatedData = data.map(item => ({
    ...item,
    pathColor: item.pathColor || item.color,
  }));

  const values = updatedData.map(item => item.value);
  // Calculate Max/Min dynamically
  const dynamicMaxValue = Math.max(...values);
  const dynamicMinValue = Math.min(...values);

  // Use a slight buffer for the max value to keep the top dot from hitting the very top edge
  // const maxValue = dynamicMaxValue * 1.05;
  // const minValue = dynamicMinValue;

  // const maxValue = dynamicMaxValue * 1.05;
  // const minValue = dynamicMinValue;
  // Determine the final chart range: Use props if provided, otherwise use dynamic calculation
  const finalChartMaxValue =
    chartMaxValue !== undefined ? chartMaxValue : dynamicMaxValue * 1.05; // Use 1.05 buffer if dynamic

  const finalChartMinValue =
    chartMinValue !== undefined ? chartMinValue : dynamicMinValue;

  // The values used for normalization calculation
  const maxValue = finalChartMaxValue;
  const minValue = finalChartMinValue;

  // 2. Fixed Dimension Constants
  const chartHeight = 90;
  const chartWidth = width - 125;
  const barWidth = chartWidth / updatedData.length;
  const paddingVertical = 7;

  // Segment Dimensions (Total height: 20 + 40 + 20 = 80px)
  const SEG_HEIGHT_THIN = 20;
  const SEG_HEIGHT_THICK = 40;

  // Margin Calculation: (90 - 80) / 4 = 2.5px
  const MARGIN_HEIGHT = 2.5;

  const SEG_WIDTH_THIN = 4;
  const SEG_WIDTH_THICK = 6;
  const GRAY_COLOR = Colors.grayED;
  const COLOR_OPACITY = 0.3;
  const GRAY_OPACITY = 0.7;

  const lastValue = updatedData[updatedData.length - 1].value;

  // 3. Positioning Function
  // const getPosition = (index, value) => {
  //   // If max and min are the same, prevent division by zero and center the dot
  //   const usableHeight = chartHeight - 2 * paddingVertical;
  //   let normalizedValue;

  //   if (maxValue - minValue === 0) {
  //     normalizedValue = 0.5; // Center vertically if all values are the same
  //   } else {
  //     normalizedValue = (value - minValue) / (maxValue - minValue);
  //   }

  //   // Y position (from top): Min value maps to the bottom, Max value maps to the top
  //   const y = chartHeight - paddingVertical - normalizedValue * usableHeight;
  //   const x = index * barWidth + barWidth / 2;
  //   return { x, y };
  // };

  // 3. Positioning Function
  const getPosition = (index, value) => {
    // --- CLAMPING LOGIC ADDED HERE ---
    // Ensure the value used for positioning is within the defined chart range
    let clampedValue = Math.max(minValue, value); // Cap at minValue
    clampedValue = Math.min(maxValue, clampedValue); // Cap at maxValue

    const usableHeight = chartHeight - 2 * paddingVertical;
    let normalizedValue;

    if (maxValue - minValue === 0) {
      normalizedValue = 0.5; // Center vertically if the range is zero
    } else {
      // Use the clamped value for normalization
      normalizedValue = (clampedValue - minValue) / (maxValue - minValue);
    }

    // Y position (from top): Min value maps to the bottom, Max value maps to the top
    const y = chartHeight - paddingVertical - normalizedValue * usableHeight;
    const x = index * barWidth + barWidth / 2;
    return { x, y };
  };
  // 4. Path Generation (Cubic Bezier)
  const createPathSegments = () => {
    const positions = updatedData.map((item, index) =>
      getPosition(index, item.value),
    );
    const segments = [];

    if (positions.length < 2) return segments;

    for (let i = 1; i < positions.length; i++) {
      const p0 = positions[i - 1];
      const p1 = positions[i];

      const cX1 = p0.x + (p1.x - p0.x) / 2;
      const cY1 = p0.y;
      const cX2 = p1.x - (p1.x - p0.x) / 2;
      const cY2 = p1.y;

      const segmentPath = `M ${p0.x} ${p0.y} C ${cX1} ${cY1}, ${cX2} ${cY2}, ${p1.x} ${p1.y}`;

      segments.push({
        path: segmentPath,
        color: updatedData[i].pathColor,
      });
    }

    return segments;
  };

  // 6. Vertical Line Assembly Component (with coloring logic)
  const VerticalLineAssembly = ({ item, index }) => {
    const { color, value } = item;
    const centerX = index * barWidth + barWidth / 2;
    const { y: dotY } = getPosition(index, value);

    let topColor = GRAY_COLOR;
    let middleColor = GRAY_COLOR;
    let bottomColor = GRAY_COLOR;

    // Define segment visual boundaries from the top (0)
    const topSegStart = MARGIN_HEIGHT;
    const middleSegStart = topSegStart + SEG_HEIGHT_THIN + MARGIN_HEIGHT; // 2.5 + 20 + 2.5 = 25
    const middleSegEnd = middleSegStart + SEG_HEIGHT_THICK; // 25 + 40 = 65
    const bottomSegStart = middleSegEnd + MARGIN_HEIGHT; // 65 + 2.5 = 67.5

    // Logic: Color the segment based on which zone the dotY falls into.
    if (dotY <= middleSegStart) {
      // Dot is in the top zone (y <= 25)
      topColor = color;
    } else if (dotY > middleSegStart && dotY <= bottomSegStart) {
      // Dot is in the middle zone (25 < y <= 67.5)
      middleColor = color;
    } else {
      // Dot is in the bottom zone (y > 67.5)
      bottomColor = color;
    }

    return (
      <View
        style={[
          styles.verticalLineContainer,
          { left: centerX - SEG_WIDTH_THICK / 2 },
        ]}
      >
        {/* Top Spacer/Margin */}
        <View style={{ height: MARGIN_HEIGHT }} />

        {/* Top Thin Segment */}
        <View
          style={[
            styles.verticalSegment,
            {
              height: SEG_HEIGHT_THIN,
              width: SEG_WIDTH_THIN,
              backgroundColor: topColor,
              opacity: topColor === GRAY_COLOR ? GRAY_OPACITY : COLOR_OPACITY,
              borderRadius: 10,
            },
          ]}
        />

        {/* Middle Spacer/Margin */}
        <View style={{ height: MARGIN_HEIGHT }} />

        {/* Middle Thick Segment */}
        <View
          style={[
            styles.verticalSegment,
            {
              height: SEG_HEIGHT_THICK,
              width: SEG_WIDTH_THICK,
              backgroundColor: middleColor,
              opacity:
                middleColor === GRAY_COLOR ? GRAY_OPACITY : COLOR_OPACITY,
              borderRadius: 10,
            },
          ]}
        />

        {/* Bottom Spacer/Margin */}
        <View style={{ height: MARGIN_HEIGHT }} />

        {/* Bottom Thin Segment */}
        <View
          style={[
            styles.verticalSegment,
            {
              height: SEG_HEIGHT_THIN,
              width: SEG_WIDTH_THIN,
              backgroundColor: bottomColor,
              opacity:
                bottomColor === GRAY_COLOR ? GRAY_OPACITY : COLOR_OPACITY,
              borderRadius: 10,
            },
          ]}
        />

        {/* Bottom-most Spacer/Margin */}
        <View style={{ height: MARGIN_HEIGHT }} />
      </View>
    );
  };
  // --------------------------------------------------------

  return (
    <View
      style={styles.container}
      activeOpacity={0.8}
      // onPress={() => navigation.navigate('BottomTab')}
    >
      {/* Chart Container */}
      <View style={styles.chartContainer}>
        {/* Vertical Lines */}
        <View style={styles.backgroundLines}>
          {updatedData.map((item, index) => (
            <VerticalLineAssembly key={index} item={item} index={index} />
          ))}
        </View>

        {/* SVG for curved connecting line with segment colors */}
        <Svg
          height={chartHeight}
          width={chartWidth}
          style={styles.svgContainer}
        >
          {createPathSegments().map((segment, index) => (
            <Path
              key={index}
              d={segment.path}
              stroke={segment.color}
              strokeWidth="5"
              fill="none"
              opacity={0.2}
            />
          ))}
        </Svg>

        {/* Bars/Dots positioned exactly on the line */}
        <View style={styles.barsContainer}>
          {updatedData.map((item, index) => {
            const position = getPosition(index, item.value);

            return (
              <View
                key={index}
                style={[
                  styles.dotContainer,
                  {
                    left: position.x - 12,
                    top: position.y - 6,
                  },
                ]}
              >
                {/* Subtle Outer Glow/Ring */}
                <View
                  style={[
                    styles.glowEffect,
                    {
                      backgroundColor: Colors.white,
                      borderRadius: 100,
                      ...((item.color === '#3182CE' ||
                        item.color === '#D4A928' ||
                        item.color === '#E53E3E') && {
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                      }),
                    },
                  ]}
                />

                {/* The main rounded rectangle bar */}
                <View
                  style={[
                    styles.coloredBar,
                    {
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </View>
            );
          })}
        </View>
      </View>

      {/* Values and Dates */}
      <View style={styles.labelsContainer}>
        {updatedData.map((item, index) => {
          const centerX = index * barWidth + barWidth / 2;
          return (
            <View
              key={index}
              style={[
                styles.labelContainer,
                {
                  position: 'absolute',
                  left: centerX - 25,
                  width: 50,
                },
              ]}
            >
              <Text style={[styles.valueText]}>{item.value}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: -5,
  },
  emptyContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronLine1: {
    width: 8,
    height: 2,
    backgroundColor: '#999999',
    transform: [{ rotate: '45deg' }, { translateY: -2 }],
    position: 'absolute',
  },
  chevronLine2: {
    width: 8,
    height: 2,
    backgroundColor: '#999999',
    transform: [{ rotate: '-45deg' }, { translateY: 2 }],
    position: 'absolute',
  },
  chartContainer: {
    height: 90,
    position: 'relative',
    marginBottom: getHeight(8),
  },
  backgroundLines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  verticalLineContainer: {
    position: 'absolute',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  verticalSegment: {
    alignSelf: 'center',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  barsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  dotContainer: {
    position: 'absolute',
    width: 24,
    height: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coloredBar: {
    width: 24,
    height: 8,
    borderRadius: 6,
    zIndex: 1,
  },
  glowEffect: {
    position: 'absolute',
    width: 30,
    height: 13,
    borderRadius: 4,
    left: -3,
    top: -1,
    zIndex: 0,
  },
  labelsContainer: {
    position: 'relative',
    height: 40,
  },
  labelContainer: {
    alignItems: 'center',
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size12,
  },
  valueText: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size12,
    marginBottom: 4,
  },
  dateText: {
    color: Colors.gray55,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size12,
  },
});

export default VerticalBarChart;
