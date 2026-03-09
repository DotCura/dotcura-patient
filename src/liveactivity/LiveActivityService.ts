import { NativeModules } from 'react-native'

const { LiveActivityManager } = NativeModules

export const startLiveActivity = (
  bookingId: string,
  title: string,
  subtitle: string,
  progress: number,
) => {

  LiveActivityManager.startActivity(
    bookingId,
    title,
    subtitle,
    progress
  )
}

export const updateLiveActivity = (
  title: string,
  subtitle: string,
  progress: number
) => {

  LiveActivityManager.updateActivity(
    title,
    subtitle,
    progress
  )
}

export const endLiveActivity = () => {

  LiveActivityManager.endActivity()

}