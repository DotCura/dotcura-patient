
// import ActivityKit
// import WidgetKit
// import SwiftUI

// struct OrderStatusLiveActivity: Widget {

//     var body: some WidgetConfiguration {

//         ActivityConfiguration(for: OrderStatusAttributes.self) { context in

//             VStack(alignment: .leading) {

//                 Text(context.state.title)
//                     .font(.headline)

//                 Text(context.state.subtitle)
//                     .font(.subheadline)

//                 ProgressView(value: Float(context.state.progress), total: 4)

//             }
//             .padding()
//         }

//         dynamicIsland: { context in

//             DynamicIsland {

//                 DynamicIslandExpandedRegion(.center) {

//                     VStack {
//                         Text(context.state.title)
//                         Text(context.state.subtitle)
//                     }

//                 }

//             } compactLeading: {

//                 Image(systemName: "heart.fill")

//             } compactTrailing: {

//                 Text("\(context.state.progress)/4")

//             } minimal: {

//                 Image(systemName: "heart")
//             }
//         }
//     }
// }

import ActivityKit
import WidgetKit
import SwiftUI

struct OrderStatusLiveActivity: Widget {

    var body: some WidgetConfiguration {

        ActivityConfiguration(for: OrderStatusAttributes.self) { context in

            VStack(alignment: .leading, spacing: 12) {

                HStack {

                    VStack(alignment: .leading) {

                        Text(context.state.title)
                            .font(.headline)
                            .foregroundColor(.white)

                        Text(context.state.subtitle)
                            .font(.subheadline)
                            .foregroundColor(.gray)
                    }

                    Spacer()

                    
                }

                statusImage(status: context.state.status)
            }
            .padding()
            .background(Color.black)
            .activityBackgroundTint(.black)
            .activitySystemActionForegroundColor(.white)

        } dynamicIsland: { context in

            DynamicIsland {

                DynamicIslandExpandedRegion(.center) {

                    VStack(spacing: 4) {

                        Text(context.state.title)
                            .font(.headline)

                        Text(context.state.subtitle)
                            .font(.caption)
                    }
                }

            } compactLeading: {

                Image(systemName: "clock")

            } compactTrailing: {

                Text("\(context.state.progress)/4")

            } minimal: {

                Image(systemName: "clock")
            }
        }
    }
}

@ViewBuilder
func statusImage(status: String) -> some View {

    switch status {

    case "Request":
        Image("Stepper")
            .resizable()
            .scaledToFit()

    case "Accept":
        Image("visitconfirmstepper")
            .resizable()
            .scaledToFit()

    case "start_visit":
        Image("startvisitstepper")
            .resizable()
            .scaledToFit()

    case "arrived":
        Image("nurseArrived")
            .resizable()
            .scaledToFit()

    case "Modified":
        Image("editorderstepper")
            .resizable()
            .scaledToFit()

    case "Rejected":
        Image("visitcanclestepper")
            .resizable()
            .scaledToFit()

    default:
        Image("Stepper")
            .resizable()
            .scaledToFit()
    }
}