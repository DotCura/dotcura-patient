// package com.dotcura.app

// import com.facebook.react.bridge.*

// class LiveActivityModule(private val reactContext: ReactApplicationContext) :
//     ReactContextBaseJavaModule(reactContext) {

//     override fun getName(): String {
//         return "LiveActivityModule"
//     }

//     @ReactMethod
//     fun show(title:String, subtitle:String, status:String){

//         LiveActivityHelper.showLiveActivity(
//             reactContext,
//             title,
//             subtitle,
//             status
//         )

//     }

//     @ReactMethod
//     fun stop(){

//         LiveActivityHelper.stopLiveActivity(reactContext)

//     }
// }

package com.dotcura.app

import android.content.Intent
import com.facebook.react.bridge.*

class LiveActivityModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "LiveActivityModule"
    }

    @ReactMethod
    fun show(title: String, subtitle: String, status: String) {

        val intent = Intent(reactContext, LiveActivityService::class.java)

        intent.putExtra("title", title)
        intent.putExtra("subtitle", subtitle)
        intent.putExtra("status", status)

        reactContext.startService(intent)
    }

    @ReactMethod
    fun stop() {

        val intent = Intent(reactContext, LiveActivityService::class.java)

        reactContext.stopService(intent)

        LiveActivityHelper.stopLiveActivity(reactContext)
    }
}