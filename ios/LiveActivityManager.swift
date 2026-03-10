import Foundation
import ActivityKit

@objc(LiveActivityManager)
class LiveActivityManager: NSObject {

    static var activity: Activity<OrderStatusAttributes>?

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
                    pushType: nil
                )

                print("✅ Live Activity started")

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
    @objc(updateActivity:title:subtitle:progress:)
func updateActivity(
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
