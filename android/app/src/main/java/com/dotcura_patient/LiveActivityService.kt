package com.dotcura.app

import android.app.Service
import android.content.Intent
import android.os.IBinder

// class LiveActivityService : Service() {

//     override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {

//         val title = intent?.getStringExtra("title") ?: ""
//         val subtitle = intent?.getStringExtra("subtitle") ?: ""
//         val status = intent?.getStringExtra("status") ?: "Request"

//         LiveActivityHelper.showLiveActivity(
//             applicationContext,
//             title,
//             subtitle,
//             status
//         )

//         return START_STICKY
//     }

//     override fun onBind(intent: Intent?): IBinder? {
//         return null
//     }
// }
class LiveActivityService : Service() {

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {

        val bookingId = intent?.getStringExtra("bookingId") ?: return START_NOT_STICKY
        val title = intent.getStringExtra("title") ?: ""
        val subtitle = intent.getStringExtra("subtitle") ?: ""
        val status = intent.getStringExtra("status") ?: ""

        LiveActivityHelper.showLiveActivity(
            this,
            bookingId,
            title,
            subtitle,
            status
        )

        return START_STICKY
    }

    override fun onBind(intent: Intent?) = null
}