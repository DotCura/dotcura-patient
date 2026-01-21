import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { fontSize } from '../constants/FontSizes';
import { fontsfamily } from '../constants/FontFamily';
import { Colors } from '../constants/Colors';
import { getHeight, getWidth } from '../constants/utils/Dimensions';

export default function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  showPicker,
}: any) {
  const dateScrollRef = useRef<any>(null);
  const timeScrollRef = useRef<any>(null);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = days[date.getDay()];
      const day = date.getDate();
      const month = date.getMonth() + 1;
      dates.push({
        label: i === 0 ? 'Oggi' : `${dayName} ${day}/${month}`,
        fullDate: date.toISOString().split('T')[0],
        display: `${dayName} ${day}/${month}`,
      });
    }
    return dates;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 1; i <= 23; i++) {
      const start = `${i.toString().padStart(2, '0')}:00`;
      const end = `${(i + 1).toString().padStart(2, '0')}:00`;
      slots.push({ display: `${start} - ${end}` });
    }
    return slots;
  };

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

  const itemHeight = 50;
  const containerHeight = 250;

  const handleScroll = (event: any, items: any[], callback: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const index = Math.round(scrollY / itemHeight);
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    callback(items[clampedIndex].display);
  };

  useEffect(() => {
    if (showPicker) {
      setTimeout(() => {
        if (dateScrollRef.current && selectedDate) {
          const index = dates.findIndex(d => d.display === selectedDate);
          if (index !== -1) {
            dateScrollRef.current.scrollTo({
              y: index * itemHeight,
              animated: false,
            });
          }
        }

        if (timeScrollRef.current && selectedTime) {
          const index = timeSlots.findIndex(s => s.display === selectedTime);
          if (index !== -1) {
            timeScrollRef.current.scrollTo({
              y: index * itemHeight,
              animated: false,
            });
          }
        }
      }, 150);
    }
  }, [showPicker]);

  return (
    <View style={styles.pickerContainer}>
      {/* Date Column */}
      <ScrollView
        ref={dateScrollRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={e => handleScroll(e, dates, onDateChange)}
        scrollEventThrottle={16}
        snapToInterval={itemHeight}
        decelerationRate="fast"
      >
        <View style={{ height: containerHeight / 2 - itemHeight / 2 }} />
        {dates.map((date, index) => {
          const isSelected = date.display === selectedDate;
          return (
            <View key={index} style={styles.item}>
              <Text
                style={[
                  styles.itemText,
                  { color: isSelected ? Colors.blue002 : Colors.gray0F },
                ]}
              >
                {date.label}
              </Text>
            </View>
          );
        })}
        <View style={{ height: containerHeight / 2 - itemHeight / 2 }} />
      </ScrollView>

      {/* Time Column */}
      <ScrollView
        ref={timeScrollRef}
        style={[styles.scrollView]}
        showsVerticalScrollIndicator={false}
        onScroll={e => handleScroll(e, timeSlots, onTimeChange)}
        scrollEventThrottle={16}
        snapToInterval={itemHeight}
        decelerationRate="fast"
      >
        <View style={{ height: containerHeight / 2 - itemHeight / 2 }} />
        {timeSlots.map((slot, index) => {
          const isSelected = slot.display === selectedTime;
          return (
            <View key={index} style={styles.item}>
              <Text
                style={[
                  styles.itemText,
                  { color: isSelected ? Colors.blue002 : Colors.gray0F },
                ]}
              >
                {slot.display}
              </Text>
            </View>
          );
        })}
        <View style={{ height: containerHeight / 2 - itemHeight / 2 }} />
      </ScrollView>

      {/* Center Highlight */}
      <View style={styles.highlightBar} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    height: 250,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  scrollView: { flex: 1 },
  item: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray0F,
    letterSpacing: 0.2,
  },
  highlightBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: getHeight(40),
    marginHorizontal: getWidth(16),
    top: 102,
    backgroundColor: 'rgba(59,130,246,0.15)',
    borderRadius: 8,
  },
});
