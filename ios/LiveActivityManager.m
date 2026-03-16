//
//  LiveActivityManager.m
//  dotcura_patient
//
//  Created by hyperlink on 09/03/26.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LiveActivityManager, NSObject)

RCT_EXTERN_METHOD(startActivity:(NSString *)bookingId
                  title:(NSString *)title
                  subtitle:(NSString *)subtitle
                  progress:(nonnull NSNumber *)progress)
                  
RCT_EXTERN_METHOD(updateActivity:(NSString *)bookingId
                  status:(NSString *)status
                  title:(NSString *)title
                  subtitle:(NSString *)subtitle
                  progress:(nonnull NSNumber *)progress)

RCT_EXTERN_METHOD(endActivity:(NSString *)bookingId)

@end
