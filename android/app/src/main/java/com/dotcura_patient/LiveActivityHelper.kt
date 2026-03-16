


package com.dotcura.app

import android.content.Context
import android.widget.RemoteViews
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat

object LiveActivityHelper {

    private const val notificationId = 999

    fun showLiveActivity(
        context: Context,
        title: String,
        subtitle: String,
        status: String
    ) {

        val layout = RemoteViews(context.packageName, R.layout.live_activity_layout)

        layout.setTextViewText(R.id.title, title)
        layout.setTextViewText(R.id.subtitle, subtitle)

        val image = when(status) {

            "Request" -> R.drawable.stepper
            "Accept" -> R.drawable.visitconfirmstepper
            "start_visit" -> R.drawable.startvisitstepper
            "arrived" -> R.drawable.nursearrived
            "Modified" -> R.drawable.editorderstepper
            "Rejected" -> R.drawable.visitcanclestepper

            else -> R.drawable.stepper
        }

        layout.setImageViewResource(R.id.stepperImage, image)

        val notification = NotificationCompat.Builder(context, "default")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setCustomContentView(layout)
            .setStyle(NotificationCompat.DecoratedCustomViewStyle())
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .build()

        NotificationManagerCompat.from(context)
            .notify(notificationId, notification)
    }

    fun stopLiveActivity(context: Context) {

        NotificationManagerCompat.from(context)
            .cancel(notificationId)

    }
}