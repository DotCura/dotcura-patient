package com.dotcura.app

import android.content.Intent
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {

        val data = remoteMessage.data
        

        if (data["type"] == "live_activity_update") {

            val intent = Intent(this, LiveActivityService::class.java)

            intent.putExtra("title", data["title"])
            intent.putExtra("subtitle", data["subtitle"])
            intent.putExtra("status", data["status"])

           
            startService(intent)
        }

        if (data["type"] == "live_activity_end") {

            LiveActivityHelper.stopLiveActivity(applicationContext)

        }
    }
}