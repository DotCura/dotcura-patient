import ActivityKit
import SwiftUI
import WidgetKit

struct DynamicData: Codable {
    var text: String?
}

func parseData(_ jsonString: String) -> DynamicData? {
    guard let data = jsonString.data(using: .utf8) else { return nil }
    return try? JSONDecoder().decode(DynamicData.self, from: data)
}

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

        Image(compactLeadingImage(for: context.state.status))
            .resizable()
            .scaledToFit()
            .frame(width: 24, height: 24)

      } compactTrailing: {
//
//        Text("\(context.state.progress)/4")
//          .foregroundColor(.white)
//          .font(.caption)
      

          let parsed = parseData(context.state.data)

            Text(parsed?.text ?? "")
          .font(.system(size: 12, weight: .regular))
          .foregroundStyle(.white)
          .padding(.trailing, 10)

      } minimal: {

//        Image(systemName: "clock.fill")
//          .foregroundColor(.white)
      }
    }
  }
}

//# MARK: LOCK SCREEN VIEW

struct OrderStatusView: View {

  let context: ActivityViewContext<OrderStatusAttributes>

  var body: some View {

//    VStack(alignment: .leading, spacing: 1) {
//      VStack(alignment: .leading, spacing: 4) {
//        Image("lockdotcura")
//          .padding(.bottom, 12)
//        Text(context.state.title)
//          .font(.system(size: 20, weight: .regular))
//          .foregroundStyle(.white)
//          .multilineTextAlignment(.leading)
//            .fixedSize(horizontal: false, vertical: true)
//            .frame(maxWidth: .infinity, alignment: .leading)
//      }
//
//      Spacer()
//
//      StatusImage(status: context.state.status)
//        .frame(height: 50)
//        .padding(.top, 10)
//
//    }
//    .padding()
//    .background(Color.black)
    VStack(alignment: .leading, spacing: 8) {

        Image("lockdotcura")
        .padding(.bottom, 8)
        .padding(.top, 10)

        Text(context.state.title)
            .font(.system(size: 20, weight: .regular))
            .foregroundStyle(.white)
            .lineLimit(2)
            .multilineTextAlignment(.leading)
            .fixedSize(horizontal: false, vertical: true)

        StatusImage(status: context.state.status)
            .frame(height: 40)
            .padding(.top, 10)

    }
    .padding(24)
    .background(Color.black)
  }
}

//# MARK: DYNAMIC ISLAND VIEW
struct DynamicIslandOrderStatusView: View {

  let context: ActivityViewContext<OrderStatusAttributes>

  var body: some View {

    VStack(alignment: .leading, spacing: 6) {

      HStack {
        Text(context.state.title)
        .font(.system(size: 16, weight: .regular))
        .foregroundStyle(.white)
        .lineLimit(2)
        .padding(.trailing, 10)
        Spacer()
        Image("Didotcura")
      }
     

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
      .scaledToFit()  // fill instead of fit
      .frame(height: 50)  // bigger height
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

// MARK: - Compact Leading Image
func compactLeadingImage(for status: String) -> String {
    switch status {
    case "Request":
        return "waveYellowDI"
    case "Accept":
        return "waveBlueDI"
    case "start_visit":
        return "waveGreenDI"
    case "arrived":
        return "waveGreenTickDI"
    case "Modified":
        return "waveEditTickDI"
    case "Rejected":
        return "waveRejectedTickDI"
    default:
        return "clock.fill"
    }
}
