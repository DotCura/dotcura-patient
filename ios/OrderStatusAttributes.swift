//
//  OrderStatusAttributes.swift
//  dotcura_patient
//
//  Created by hyperlink on 09/03/26.
//

import ActivityKit

struct OrderStatusAttributes: ActivityAttributes {

    public struct ContentState: Codable, Hashable {

        var status: String
        var title: String
        var subtitle: String
        var progress: Int
        var data: String   // 👈 ADD THIS (JSON string from backend)
    }

    var bookingId: String
}
