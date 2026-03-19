
import ActivityKit
import WidgetKit
import SwiftUI

struct OrderStatusLiveActivity: Widget {

    var body: some WidgetConfiguration {

        ActivityConfiguration(for: OrderStatusAttributes.self) { context in

            // // LOCK SCREEN VIEW
             OrderStatusView(context: context)
                 .activityBackgroundTint(.black)
                 .activitySystemActionForegroundColor(.white)
          
  

        } dynamicIsland: { context in

            DynamicIsland {

                DynamicIslandExpandedRegion(.center) {
                    DynamicIslandOrderStatusView(context: context)
                }

            } compactLeading: {

                Image(systemName: "clock.fill")
                    .foregroundColor(.white)

            } compactTrailing: {

                Text("\(context.state.progress)/4")
                    .foregroundColor(.white)
                    .font(.caption)

            } minimal: {

                Image(systemName: "clock.fill")
                    .foregroundColor(.white)
            }
        }
    }
}

//# MARK: LOCK SCREEN VIEW

struct OrderStatusView: View {

    let context: ActivityViewContext<OrderStatusAttributes>

    var body: some View {

        VStack(alignment: .leading, spacing: 1) {

                VStack(alignment: .leading, spacing: 4) {

                    Text(context.state.title)
                        .font(.headline)
                        .foregroundColor(.white)

                    Text(context.state.subtitle)
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }

                Spacer()
           
       
            StatusImage(status: context.state.status)
                .frame(height: 50)
                .padding(.top, 10)

        }
        .padding()
        .background(Color.black)
    }
}

//# MARK: DYNAMIC ISLAND VIEW
struct DynamicIslandOrderStatusView: View {

    let context: ActivityViewContext<OrderStatusAttributes>

    var body: some View {

        VStack(alignment: .leading, spacing: 6) {

            Text(context.state.title)
                .font(.caption)
                .foregroundColor(.white)
                .lineLimit(1)

            Text(context.state.subtitle)
                .font(.caption2)
                .foregroundColor(.gray)
                .lineLimit(5)

            StatusImage(status: context.state.status)
            .padding(.top, 10)
        }
        .padding(.horizontal, 8)
    }
}

//# MARK: STATUS IMAGE VIEW

struct StatusImage: View {

    let status: String

    var body: some View {
        Image(imageName)
            .resizable()
            .scaledToFit()          // fill instead of fit
            .frame(height: 50)       // bigger height
            .frame(maxWidth: .infinity)
            .clipped()
    }

    var imageName: String {
        switch status {
        case "Request":
            return "Stepper"
        case "Accept":
            return "visitconfirmstepper"
        case "start_visit":
            return "startvisitstepper"
        case "arrived":
            return "nurseArrived"
        case "Modified":
            return "editorderstepper"
        case "Rejected":
            return "visitcanclestepper"
        default:
            return "Stepper"
        }
    }
}
