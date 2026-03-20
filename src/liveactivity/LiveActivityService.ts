import { NativeModules } from 'react-native';

const { LiveActivityManager } = NativeModules;

export const startLiveActivity = (
  bookingId: string,
  title: string,
  subtitle: string,
  progress: number,
  data: string, // 👈 ADD THIS
) => {
  LiveActivityManager.startActivity(bookingId, title, subtitle, progress, data,);
};

export const updateLiveActivity = (
  bookingId: string,
  status: string,
  title: string,
  subtitle: string,
  progress: number,
  data: string, // 👈 ADD THIS
) => {
  LiveActivityManager.updateActivity(
    bookingId,
    status,
    title,
    subtitle,
    progress,
    data, // 👈 PASS IT
  );
};

export const endLiveActivity = (bookingId: string) => {
  LiveActivityManager.endActivity(bookingId);
};
