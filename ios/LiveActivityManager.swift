import Foundation
import ActivityKit
import React

@objc(LiveActivityManager)
class LiveActivityManager: RCTEventEmitter {

    static var activity: Activity<OrderStatusAttributes>?
  
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
        progress: NSNumber
    ) {

        if #available(iOS 16.2, *) {

            let attributes = OrderStatusAttributes(
                bookingId: bookingId
            )

            let state = OrderStatusAttributes.ContentState(
                status: "Request",
                title: title,
                subtitle: subtitle,
                progress: progress.intValue
            )

            let content = ActivityContent(
                state: state,
                staleDate: nil
            )

            do {

                LiveActivityManager.activity = try Activity.request(
                    attributes: attributes,
                    content: content,
                    pushType: .token
                )

                print("✅ Live Activity started")

                // 🔴 GET PUSH TOKEN
            Task {
                    print("✅ Live Activity Task Above await")
                for await pushToken in LiveActivityManager.activity!.pushTokenUpdates {
                    print("✅ Live Activity Task below await")
                    let token = pushToken.map { String(format: "%02x", $0) }.joined()
                    print("📲 Live Activity Push Token:", token)
                  
                  // 🔥 Send token to React Native
                  self.sendEvent(
                      withName: "LiveActivityPushToken",
                      body: [
                          "token": token
                      ]
                  )

                    // TODO: send this token to your backend
                    // Example:
                    // sendPushTokenToServer(token)
                }
            }
            
            } catch {
                print("❌ Live Activity start error:", error)
            }
        }
    }

    // @objc
    // func updateActivity(
    //     _ status: String,
    //     _ title: String,
    //     _ subtitle: String,
    //     _ progress: NSNumber
    // ) {

    //     if #available(iOS 16.2, *) {

    //         guard let activity = LiveActivityManager.activity else { return }

    //         let updatedState = OrderStatusAttributes.ContentState(
    //             status: status,
    //             title: title,
    //             subtitle: subtitle,
    //             progress: progress.intValue
    //         )

    //         let updatedContent = ActivityContent(
    //             state: updatedState,
    //             staleDate: Date().addingTimeInterval(60)
    //         )

    //         Task {
    //             await activity.update(updatedContent)
    //            print("📡 Updating Activity:", status, title)
    //         }
    //     }
    // }
//    @objc(updateActivity:title:subtitle:progress:)
  @objc func updateActivity(
    _ status: String,
    title: String,
    subtitle: String,
    progress: NSNumber
) {

    if #available(iOS 16.2, *) {

        guard let activity = LiveActivityManager.activity else {
            print("❌ No active activity")
            return
        }

        let updatedState = OrderStatusAttributes.ContentState(
            status: status,
            title: title,
            subtitle: subtitle,
            progress: progress.intValue
        )

        let updatedContent = ActivityContent(
            state: updatedState,
            staleDate: nil
        )

        Task {
            print("📡 Updating Activity:", status)
            await activity.update(updatedContent)
            print("🔄 Live Activity updated")
        }
    }
}

    @objc
    func endActivity() {

        if #available(iOS 16.2, *) {

            guard let activity = LiveActivityManager.activity else { return }

            let finalState = OrderStatusAttributes.ContentState(
                status: "Completed",
                title: "Visit Completed",
                subtitle: "Thank you!",
                progress: 4
            )

            let finalContent = ActivityContent(
                state: finalState,
                staleDate: nil
            )

            Task {
                await activity.end(
                    finalContent,
                    dismissalPolicy: .immediate
                )
                print("🛑 Live Activity ended")
            }
        }
    }
}
