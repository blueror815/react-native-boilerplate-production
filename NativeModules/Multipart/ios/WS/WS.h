//
//  WS.h
//  WS
//
//  Created by Hau Vo (@Kevin) on 11/1/15.
//  Copyright © 2015 Hau Vo (@Kevin). All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AFNetworking.h"
#import "RCTBridgeModule.h"

@interface WS : NSObject<RCTBridgeModule> {
    RCTResponseSenderBlock _callback;
    NSURLSessionUploadTask* _uploadTask;
}

@end
