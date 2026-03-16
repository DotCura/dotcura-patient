package com.dotcura.app

import android.app.Service
import android.content.Intent
import android.os.IBinder

class LiveActivityService : Service() {

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {

        val title = intent?.getStringExtra("title") ?: ""
        val subtitle = intent?.getStringExtra("subtitle") ?: ""
        val status = intent?.getStringExtra("status") ?: "Request"

        LiveActivityHelper.showLiveActivity(
            applicationContext,
            title,
            subtitle,
            status
        )

        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}