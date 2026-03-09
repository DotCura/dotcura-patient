//
//  OrderStatusLiveActivityLiveActivity.swift
//  OrderStatusLiveActivity
//
//  Created by hyperlink on 09/03/26.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct OrderStatusLiveActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct OrderStatusLiveActivityLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: OrderStatusLiveActivityAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension OrderStatusLiveActivityAttributes {
    fileprivate static var preview: OrderStatusLiveActivityAttributes {
        OrderStatusLiveActivityAttributes(name: "World")
    }
}

extension OrderStatusLiveActivityAttributes.ContentState {
    fileprivate static var smiley: OrderStatusLiveActivityAttributes.ContentState {
        OrderStatusLiveActivityAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: OrderStatusLiveActivityAttributes.ContentState {
         OrderStatusLiveActivityAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: OrderStatusLiveActivityAttributes.preview) {
   OrderStatusLiveActivityLiveActivity()
} contentStates: {
    OrderStatusLiveActivityAttributes.ContentState.smiley
    OrderStatusLiveActivityAttributes.ContentState.starEyes
}
