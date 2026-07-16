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
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from './Buttons';
import { getTranslation } from '../localization/i18n/i18n.config';

// Chart constants
const INDICATOR_RADIUS = 9;
const DOT_RADIUS = 2;
const DOT_COUNT = 40;
const HEXAGON_HEIGHT = 17;

const BarChartComponentDetails = ({
  currentValue,
  minValue,
  maxValue,
  width = 330,
  height = 40,
  onRangeTypeChange = () => {},
  ...props
}) => {
  // ✅ Safe value handling
  const safeMin = Number.isFinite(minValue) ? minValue : 0;
  const safeMax =
    Number.isFinite(maxValue) && maxValue > safeMin ? maxValue : safeMin + 1;
  const safeValue = Number.isFinite(currentValue) ? currentValue : safeMin;

  // ✅ Add padding to prevent circle cutoff
  const CHART_PADDING = INDICATOR_RADIUS + 4;
  const CHART_WIDTH = width - CHART_PADDING * 2;
  const centerY = height / 2;

  // Hexagon represents the min-max range
  const rangeWidth = safeMax - safeMin;
  const extremeLeftThreshold = safeMin - rangeWidth * 0.7;
  const extremeRightThreshold = safeMax + rangeWidth * 0.5;
  const totalRange = extremeRightThreshold - extremeLeftThreshold;

  // Calculate position with padding offset
  const getXPosition = value => {
    const normalized = (value - extremeLeftThreshold) / totalRange;
    return CHART_PADDING + Math.max(0, Math.min(1, normalized)) * CHART_WIDTH;
  };

  const minX = getXPosition(safeMin);
  const maxX = getXPosition(safeMax);
  const valueX = getXPosition(safeValue);

  // ✅ Determine range type based on current value
  let rangeType = 'normal';
  if (safeValue < safeMin) {
    const moderateThreshold = safeMin - rangeWidth * 0.3;
    rangeType = safeValue <= moderateThreshold ? 'extreme' : 'moderate';
  } else if (safeValue > safeMax) {
    const moderateThreshold = safeMax + rangeWidth * 0.3;
    rangeType = safeValue >= moderateThreshold ? 'extreme' : 'moderate';
  }

  // ✅ Color logic variables
  let MAIN_COLOR = '#F5949F';
  let OUT_COLOR = '#737373';
  let INDICATOR_COLOR = '#CA1C2E';

  // ✅ Apply color theme based on rangeType
  switch (rangeType) {
    case 'normal': // Within range → Grey + Blue
      MAIN_COLOR = Colors.grayE7;
      OUT_COLOR = Colors.grayE7;
      INDICATOR_COLOR = Colors.blue1C;
      break;
    case 'moderate': // Moderate low/high → Yellow + Dark Yellow
      MAIN_COLOR = Colors.goldeenF5;
      OUT_COLOR = Colors.goldenF9;
      INDICATOR_COLOR = Colors.goldenCA;
      break;
    case 'extreme': // Extreme low/high → Red + Dark Red
      MAIN_COLOR = Colors.redF5;
      OUT_COLOR = Colors.redF9;
      INDICATOR_COLOR = Colors.redCA;
      break;
  }

  let shadowImage = images.imgTopShadow;

  switch (rangeType) {
    case 'normal':
      shadowImage = images.imgTopShadowBlue;
      break;
    case 'moderate':
      shadowImage = images.imgTopShadow;
      break;
    case 'extreme':
      shadowImage = images.imgTopShadowRed;
      break;
  }

  // ✅ Background color logic based on range type
  let backgroundColor = Colors.white;
  switch (rangeType) {
    case 'normal':
      backgroundColor = Colors.greyf324;
      break;
    case 'moderate':
      backgroundColor = Colors.goldenFD;
      break;
    case 'extreme':
      backgroundColor = Colors.redFD;
      break;
  }

  let lablColor = Colors.black;
  switch (rangeType) {
    case 'normal':
      lablColor = Colors.gray0F;
      break;
    case 'moderate':
      lablColor = Colors.gray0F;
      break;
    case 'extreme':
      lablColor = Colors.red40;
      break;
  }

  // ✅ Fixed hexagon calculation - properly centered with extended width
  const hexagonWidth = maxX - minX;
  const hexagonCenterX = (minX + maxX) / 2;

  // Extend the hexagon width by 20% (multiply by 1.2)
  const extendedWidth = hexagonWidth * 1.2;

  // Calculate all points symmetrically from center with extended width
  const leftPoint = hexagonCenterX - extendedWidth / 2;
  const rightPoint = hexagonCenterX + extendedWidth / 2;

  // Flat edge is 80% of the extended width to create proper hexagon shape
  const flatEdgeWidth = extendedWidth * 0.8;
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

  // ✅ Generate dots with padding consideration
  const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
    x: CHART_PADDING + (i / (DOT_COUNT - 1)) * CHART_WIDTH,
    y: centerY,
  }));

  React.useEffect(() => {
    onRangeTypeChange(rangeType);
  }, [rangeType]);
  const isTestedReport = props.reportItem.isTest == true;
  return (
    <View style={{ alignSelf: 'center', marginTop: getHeight(20) }}>
      <Image source={shadowImage} style={{ position: 'absolute', top: -117 }} />
      <Svg width={width} height={height}>
        {/* LINEAR GRADIENT FOR DOTS */}
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

        {/* Hexagon represents min-max range */}
        <Polygon points={hexagonPoints} fill={Colors.white} opacity={0.8} />

        {/* Current value indicator */}
        <Circle
          cx={valueX}
          cy={centerY}
          r={INDICATOR_RADIUS}
          fill={INDICATOR_COLOR}
        />
      </Svg>
    </View>
  );
};

export default BarChartComponentDetails;

const styles = StyleSheet.create({
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '20%', // adjust until it matches your design
    height: '50%', // adjust for vertical gradient coverage
    borderRadius: 1,
  },
  card: {
    height: 100,
    position: 'absolute',
    top: 0,
    width: 180,
    right: 0,
    borderRadius: 20, // Large radius for that bubbly look
    backgroundColor: 'white', // Fallback
  },
});
