import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { fontSize } from '../constants/FontSizes';
import { fontsfamily } from '../constants/FontFamily';
import { Colors } from '../constants/Colors';
import { getHeight, getWidth } from '../constants/utils/Dimensions';
import { getTranslation } from '../localization/i18n/i18n.config';

type AvailabilitySlot = {
  date: string;
  day_name: string;
  slots: string[];
};

export default function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  showPicker,
  availabilitySlots,
  isLoadingSlots,
}: {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  showPicker: boolean;
  availabilitySlots?: AvailabilitySlot[];
  isLoadingSlots?: boolean;
}) {
  const dateScrollRef = useRef<any>(null);
  const timeScrollRef = useRef<any>(null);

  // ─── Static fallback generators ────────────────────────────────────────────

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
        display: i === 0 ? 'Oggi' : `${dayName} ${day}/${month}`,
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

  // ─── Derive dates & time slots from API data or static fallback ─────────────

  const hasApiData = availabilitySlots && availabilitySlots.length > 0;

  const dates: { label: string; display: string }[] = hasApiData
    ? availabilitySlots!.map(item => ({
        label: item.day_name,
        display: item.day_name,
      }))
    : generateDates();

  // Collect time slots for the currently selected date
  const timeSlotsForDate: { display: string }[] = hasApiData
    ? (() => {
        // Use matching date, or fall back to first entry if no match yet
        const found =
          availabilitySlots!.find(item => item.day_name === selectedDate) ??
          availabilitySlots![0];
        return (found?.slots ?? []).map(s => ({ display: s }));
      })()
    : generateTimeSlots();

  // Final time slots list
  const timeSlots = hasApiData ? timeSlotsForDate : generateTimeSlots();

  // ─── Scroll helpers ──────────────────────────────────────────────────────────

  const itemHeight = 50;
  const containerHeight = 250;

  const handleDateScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const index = Math.round(scrollY / itemHeight);
    const clampedIndex = Math.max(0, Math.min(index, dates.length - 1));
    const chosen = dates[clampedIndex].display;
    if (chosen !== selectedDate) {
      onDateChange(chosen);
      // When date changes via scroll reset time to first available slot for new date
      if (hasApiData) {
        const found = availabilitySlots!.find(item => item.day_name === chosen);
        const firstSlot = found?.slots?.[0] ?? '';
        if (firstSlot) {
          onTimeChange(firstSlot);
        }
      }
    }
  };

  const handleTimeScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const index = Math.round(scrollY / itemHeight);
    const clampedIndex = Math.max(0, Math.min(index, timeSlots.length - 1));
    if (timeSlots[clampedIndex]) {
      onTimeChange(timeSlots[clampedIndex].display);
    }
  };

  // ─── Auto-scroll to current selection when picker opens ─────────────────────

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

  // ─── Also re-scroll time column when selected date changes ──────────────────
  useEffect(() => {
    if (showPicker && timeScrollRef.current) {
      setTimeout(() => {
        const index = timeSlots.findIndex(s => s.display === selectedTime);
        const targetIndex = index !== -1 ? index : 0;
        timeScrollRef.current?.scrollTo({
          y: targetIndex * itemHeight,
          animated: true,
        });
      }, 100);
    }
  }, [selectedDate]);

  // ─── Loading state ───────────────────────────────────────────────────────────

  if (isLoadingSlots) {
    return (
      <View style={[styles.pickerContainer, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.blue002} />
      </View>
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <View style={styles.pickerContainer}>
      {/* Date Column */}
      <ScrollView
        ref={dateScrollRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleDateScroll}
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
      {timeSlots.length === 0 ? (
        // No slots for this date — show message but keep date column scrollable
        <View style={[styles.scrollView, styles.centered]}>
          <Text style={styles.noSlotsText} numberOfLines={2}>
            {getTranslation('noslotavailble')}
          </Text>
        </View>
      ) : (
        <ScrollView
          ref={timeScrollRef}
          style={[styles.scrollView]}
          showsVerticalScrollIndicator={false}
          onScroll={handleTimeScroll}
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
      )}

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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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
  noSlotsText: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray75,
    textAlign: 'center',
    marginLeft: -40,
  },
});
