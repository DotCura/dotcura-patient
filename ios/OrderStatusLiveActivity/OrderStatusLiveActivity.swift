//
//  OrderStatusLiveActivity.swift
//  OrderStatusLiveActivity
//
//  Created by hyperlink on 09/03/26.
//

//import WidgetKit
//import SwiftUI
//
//struct Provider: AppIntentTimelineProvider {
//    func placeholder(in context: Context) -> SimpleEntry {
//        SimpleEntry(date: Date(), configuration: ConfigurationAppIntent())
//    }
//
//    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
//        SimpleEntry(date: Date(), configuration: configuration)
//    }
//    
//    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
//        var entries: [SimpleEntry] = []
//
//        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
//        let currentDate = Date()
//        for hourOffset in 0 ..< 5 {
//            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
//            let entry = SimpleEntry(date: entryDate, configuration: configuration)
//            entries.append(entry)
//        }
//
//        return Timeline(entries: entries, policy: .atEnd)
//    }
//
////    func relevances() async -> WidgetRelevances<ConfigurationAppIntent> {
////        // Generate a list containing the contexts this widget is relevant in.
////    }
//}
//
//struct SimpleEntry: TimelineEntry {
//    let date: Date
//    let configuration: ConfigurationAppIntent
//}
//
//struct OrderStatusLiveActivityEntryView : View {
//    var entry: Provider.Entry
//
//    var body: some View {
//        VStack {
//            Text("Time:")
//            Text(entry.date, style: .time)
//
//            Text("Favorite Emoji:")
//            Text(entry.configuration.favoriteEmoji)
//        }
//    }
//}
//
//struct OrderStatusLiveActivity: Widget {
//    let kind: String = "OrderStatusLiveActivity"
//
//    var body: some WidgetConfiguration {
//        AppIntentConfiguration(kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()) { entry in
//            OrderStatusLiveActivityEntryView(entry: entry)
//                .containerBackground(.fill.tertiary, for: .widget)
//        }
//    }
//}
//
//extension ConfigurationAppIntent {
//    fileprivate static var smiley: ConfigurationAppIntent {
//        let intent = ConfigurationAppIntent()
//        intent.favoriteEmoji = "😀"
//        return intent
//    }
//    
//    fileprivate static var starEyes: ConfigurationAppIntent {
//        let intent = ConfigurationAppIntent()
//        intent.favoriteEmoji = "🤩"
//        return intent
//    }
//}
//
//#Preview(as: .systemSmall) {
//    OrderStatusLiveActivity()
//} timeline: {
//    SimpleEntry(date: .now, configuration: .smiley)
//    SimpleEntry(date: .now, configuration: .starEyes)
//}
import ActivityKit
import WidgetKit
import SwiftUI

struct OrderStatusLiveActivity: Widget {

    var body: some WidgetConfiguration {

        ActivityConfiguration(for: OrderStatusAttributes.self) { context in

            VStack(alignment: .leading) {

                Text(context.state.title)
                    .font(.headline)

                Text(context.state.subtitle)
                    .font(.subheadline)

                ProgressView(value: Float(context.state.progress), total: 4)

            }
            .padding()
        }

        dynamicIsland: { context in

            DynamicIsland {

                DynamicIslandExpandedRegion(.center) {

                    VStack {
                        Text(context.state.title)
                        Text(context.state.subtitle)
                    }

                }

            } compactLeading: {

                Image(systemName: "heart.fill")

            } compactTrailing: {

                Text("\(context.state.progress)/4")

            } minimal: {

                Image(systemName: "heart")
            }
        }
    }
}
