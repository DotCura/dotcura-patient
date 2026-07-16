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
      onPress={() => {
        props.onpressreport(props.reportItem);
      }}
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
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: fontSize.size16,
            fontFamily: fontsfamily.gmedium,
            color: Colors.gray0F,
            marginRight: getWidth(10),
            flex: 1,
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
