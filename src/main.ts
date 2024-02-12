import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//add this in our main.ts file.
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { UIKitSettingsBuilder } from '@cometchat/uikit-shared';
import {CometChatCalls} from "@cometchat/calls-sdk-javascript";
import {CometChat} from "@cometchat-pro/chat";

if (environment.production) {
  enableProdMode();
}

//create the builder
// const uiKitSettings = new UIKitSettingsBuilder()
//   .setAppId(environment.cometChat.appID)
//   .setRegion(environment.cometChat.region)
//   .setAuthKey(environment.cometChat.apiKey)
//   .subscribePresenceForFriends()
//   .build();
//
// //Initialize CometChat
// CometChatUIKit.init(uiKitSettings)?.then(()=>{
// 		//load your root module
//     platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
// })

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));

let appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(environment.cometChat.region)
    .autoEstablishSocketConnection(true)
    .build();
CometChat.init(environment.cometChat.appID, appSetting).then(
  (initialized: boolean) => {
    console.log("Initialization completed successfully", initialized);

    const callAppSetting = new CometChatCalls.CallAppSettingsBuilder()
      .setAppId(environment.cometChat.appID)
      .setRegion(environment.cometChat.region)
      .build();

    CometChatCalls.init(callAppSetting).then(
      () => {
        console.log('CometChatCalls initialization completed successfully');
        platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
      },
      error => {
        console.log('CometChatCalls initialization failed with error:', error);
      },
    );
  }, (error: CometChat.CometChatException) => {
    console.log("Initialization failed with error:", error);
  }
);

