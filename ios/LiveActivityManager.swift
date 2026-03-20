

import Foundation
import ActivityKit
import React

@objc(LiveActivityManager)
class LiveActivityManager: RCTEventEmitter {

    // Store multiple activities by bookingId
    static var activities: [String: Activity<OrderStatusAttributes>] = [:]

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func supportedEvents() -> [String]! {
        return ["LiveActivityPushToken"]
    }

   
@objc
func startActivity(
    _ bookingId: String,
    title: String,
    subtitle: String,
    progress: NSNumber,
    data: String
) {

    if #available(iOS 16.2, *) {

        let attributes = OrderStatusAttributes(
            bookingId: bookingId
        )

        let state = OrderStatusAttributes.ContentState(
            status: "Request",
            title: title,
            subtitle: subtitle,
            progress: progress.intValue,
            data: data
        )

        let content = ActivityContent(
            state: state,
            staleDate: nil
        )

        do {

            let activity = try Activity.request(
                attributes: attributes,
                content: content,
                pushType: .token
            )

            LiveActivityManager.activities[bookingId] = activity

            print("✅ Live Activity started for booking:", bookingId)

            // capture bookingId for async
            let capturedBookingId = bookingId

            Task { [weak self] in
                for await pushToken in activity.pushTokenUpdates {

                    let token = pushToken.map { String(format: "%02x", $0) }.joined()

                    print("📲 Token:", token)
                    print("📦 BookingId:", capturedBookingId)

                    self?.sendEvent(
                        withName: "LiveActivityPushToken",
                        body: [
                            "token": token,
                            "bookingId": capturedBookingId
                        ]
                    )
                }
            }

        } catch {
            print("❌ Live Activity start error:", error)
        }
    }
}

    // MARK: - Update Activity
    @objc
    func updateActivity(
        _ bookingId: String,
        status: String,
        title: String,
        subtitle: String,
        progress: NSNumber,
        data: String
    ) {

        if #available(iOS 16.2, *) {

            guard let activity = LiveActivityManager.activities[bookingId] else {
                print("❌ No activity found for booking:", bookingId)
                return
            }

            let updatedState = OrderStatusAttributes.ContentState(
                status: status,
                title: title,
                subtitle: subtitle,
                progress: progress.intValue,
                data: data   // 👈 required
            )

            let updatedContent = ActivityContent(
                state: updatedState,
                staleDate: nil
            )

            Task {
                await activity.update(updatedContent)
                print("🔄 Updated activity for booking:", bookingId)
            }
        }
    }

    // MARK: - End Activity
    @objc
    func endActivity(_ bookingId: String) {

        if #available(iOS 16.2, *) {

            guard let activity = LiveActivityManager.activities[bookingId] else {
                print("❌ No activity found for booking:", bookingId)
                return
            }

            let finalState = OrderStatusAttributes.ContentState(
                status: "Completed",
                title: "Visita completata",
                subtitle: "Grazie per aver scelto il nostro servizio.",
                progress: 4,
                data: "{\"text\":\"Fatto!\"}"
            )

            let finalContent = ActivityContent(
                state: finalState,
                staleDate: nil
            )

            Task {

                await activity.end(
                    finalContent,
                    dismissalPolicy: ActivityUIDismissalPolicy.immediate
                )

                // Remove from dictionary
                LiveActivityManager.activities.removeValue(forKey: bookingId)

                print("🛑 Ended activity for booking:", bookingId)
            }
        }
    }
}
