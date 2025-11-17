import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Svg, Rect } from 'react-native-svg';
import { fontsfamily } from '../constants/FontFamily';
import { fontSize } from '../constants/FontSizes';
import { Colors } from '../constants/Colors';
import { getHeight, getWidth } from '../constants/utils/Dimensions';
import { activityOpacity } from '../constants/GConstant';

// Bar counts
const LEFT_SMALL_COUNT = 6;
const MIDDLE_COUNT = 30;
const RIGHT_SMALL_COUNT = 6;

// Derived index ranges
const TOTAL_BARS = 1 + LEFT_SMALL_COUNT + MIDDLE_COUNT + RIGHT_SMALL_COUNT;
const LEFT_EXTREME_BAR = 0;
const LEFT_SMALL_BARS_START = 1;
const LEFT_SMALL_BARS_END = LEFT_SMALL_BARS_START + LEFT_SMALL_COUNT - 1;
const MIDDLE_BARS_START = LEFT_SMALL_BARS_END + 1;
const MIDDLE_BARS_END = MIDDLE_BARS_START + MIDDLE_COUNT - 1;
const RIGHT_SMALL_BARS_START = MIDDLE_BARS_END + 1;
const RIGHT_SMALL_BARS_END = RIGHT_SMALL_BARS_START + RIGHT_SMALL_COUNT - 1;

// Base constants
const MAX_HEIGHT = 29;
const SMALL_HEIGHT = 6;
const BAR_WIDTH = 6;
const CHART_WIDTH = 330;
const CHART_HEIGHT = 28;
const RAMP_FRACTION_PER_SIDE = 0.1;

const BarChartComponentDetails = ({
  currentValue = 0,
  minValue = 0,
  maxValue = 100,
  onRangeTypeChange = () => {},
  ...props
}) => {
  // ✅ Safe value handling
  const safeMin = Number.isFinite(minValue) ? minValue : 0;
  const safeMax =
    Number.isFinite(maxValue) && maxValue > safeMin ? maxValue : safeMin + 1;
  const safeValue = Number.isFinite(currentValue) ? currentValue : safeMin;

  // ✅ Bar spacing
  const barSpacing = CHART_WIDTH / TOTAL_BARS;

  // ✅ Color logic variables
  let MAIN_COLOR = '#F5949F';
  let OUT_COLOR = '#F9B6BE';
  let INDICATOR_COLOR = '#CA1C2E';

  // ✅ Determine bar index and range type
  let indicatorIndex;
  let rangeType = 'normal'; // 'normal' | 'moderate' | 'extreme'

  if (safeValue < safeMin) {
    const extremeThreshold = safeMin * 0.3;
    if (safeValue <= extremeThreshold) {
      indicatorIndex = LEFT_SMALL_BARS_START;
      rangeType = 'extreme';
    } else {
      const normalized =
        (safeValue - extremeThreshold) / (safeMin - extremeThreshold);
      indicatorIndex = Math.round(
        LEFT_SMALL_BARS_START +
          normalized * (LEFT_SMALL_BARS_END - LEFT_SMALL_BARS_START),
      );
      rangeType = 'moderate';
    }
  } else if (safeValue > safeMax) {
    const extremeThreshold = safeMax * 1.5;
    if (safeValue >= extremeThreshold) {
      indicatorIndex = RIGHT_SMALL_BARS_END;
      rangeType = 'extreme';
    } else {
      const normalized = (safeValue - safeMax) / (extremeThreshold - safeMax);
      indicatorIndex = Math.round(
        RIGHT_SMALL_BARS_START +
          normalized * (RIGHT_SMALL_BARS_END - RIGHT_SMALL_BARS_START),
      );
      rangeType = 'moderate';
    }
  } else {
    const normalized = (safeValue - safeMin) / (safeMax - safeMin);
    indicatorIndex = Math.round(
      MIDDLE_BARS_START + normalized * (MIDDLE_BARS_END - MIDDLE_BARS_START),
    );
    rangeType = 'normal';
  }

  React.useEffect(() => {
    onRangeTypeChange(rangeType);
  }, [rangeType]);

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

  // ✅ Background color logic based on range type
  let backgroundColor = Colors.white; // default
  switch (rangeType) {
    case 'normal':
      backgroundColor = Colors.greyf324; // light blue
      break;
    case 'moderate':
      backgroundColor = Colors.goldenFD; // light yellow
      break;
    case 'extreme':
      backgroundColor = Colors.redFD; // light red/pink
      break;
  }

  let lablColor = Colors.black; // default
  switch (rangeType) {
    case 'normal':
      lablColor = Colors.gray0F; // light blue
      break;
    case 'moderate':
      lablColor = Colors.gray0F; // light yellow
      break;
    case 'extreme':
      lablColor = Colors.red40; // light red/pink
      break;
  }

  // ✅ Build bars
  const bars = Array.from({ length: TOTAL_BARS }, (_, index) => {
    let height = SMALL_HEIGHT;
    let color = OUT_COLOR;
    let yPosition = CHART_HEIGHT - height - 6;

    if (index >= MIDDLE_BARS_START && index <= MIDDLE_BARS_END) {
      const totalMiddleBars = MIDDLE_BARS_END - MIDDLE_BARS_START + 1;
      const localIndex = index - MIDDLE_BARS_START;
      const t = totalMiddleBars > 1 ? localIndex / (totalMiddleBars - 1) : 0.5;

      const leftRampEnd = RAMP_FRACTION_PER_SIDE;
      const rightRampStart = 1 - RAMP_FRACTION_PER_SIDE;
      const easeOut = x => 1 - Math.pow(1 - x, 2);
      const easeIn = x => Math.pow(x, 2);

      const amplitude = MAX_HEIGHT - SMALL_HEIGHT;
      let factor;

      if (t <= leftRampEnd) {
        factor = easeOut(t / Math.max(leftRampEnd, 1e-6));
      } else if (t >= rightRampStart) {
        factor = easeIn((1 - t) / Math.max(RAMP_FRACTION_PER_SIDE, 1e-6));
      } else {
        factor = 1;
      }

      const bottomPortion = 0.4;
      const bottomAmplitude = amplitude * bottomPortion;
      const topAmplitude = amplitude - bottomAmplitude;
      const topHeight = SMALL_HEIGHT + factor * topAmplitude;
      const bottomHeight = factor * bottomAmplitude;
      const baselineY = CHART_HEIGHT - SMALL_HEIGHT;

      height = topHeight + bottomHeight;
      color = MAIN_COLOR;
      yPosition = baselineY - topHeight;
    }

    const isIndicator = index === indicatorIndex;

    return {
      x: index * barSpacing + (barSpacing - BAR_WIDTH) / 2,
      y: isIndicator ? CHART_HEIGHT - MAX_HEIGHT - -1 : yPosition,
      height: isIndicator ? MAX_HEIGHT + 5 : height,
      color: isIndicator ? INDICATOR_COLOR : color,
    };
  });

  return (
    <TouchableOpacity
      style={{
        // backgroundColor: backgroundColor,
        // padding: 16,
        paddingTop: 16,
        paddingBottom: 10,
        borderRadius: 20,
      }}
      activeOpacity={activityOpacity}
    >
      <View
        // style={{}}
        style={{ marginLeft: getWidth(18), alignSelf: 'center' }}
      >
        <Svg viewBox={`0 0 ${350} ${CHART_HEIGHT}`} {...props}>
          {bars.map((bar, index) => (
            <Rect
              key={index}
              x={bar.x}
              y={bar.y}
              width={BAR_WIDTH}
              height={bar.height}
              rx={3}
              fill={bar.color}
            />
          ))}
        </Svg>
      </View>
    </TouchableOpacity>
  );
};

export default BarChartComponentDetails;

