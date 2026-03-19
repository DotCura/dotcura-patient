//
//  AppIntent.swift
//  OrderStatusLiveActivity
//
//  Created by hyperlink on 09/03/26.
//

import WidgetKit
import AppIntents

@available(iOS 16.2, *)
struct ConfigurationAppIntent: WidgetConfigurationIntent {

    static var title: LocalizedStringResource = "Configuration"
    static var description = IntentDescription("This is an example widget.")

    @Parameter(title: "Favorite Emoji", default: "😃")
    var favoriteEmoji: String

    func perform() async throws -> some IntentResult {
        return .result()
    }
}
