import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//add this in our main.ts file.
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { UIKitSettingsBuilder } from '@cometchat/uikit-shared';

if (environment.production) {
  enableProdMode();
}

//create the builder
const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(environment.cometChat.appID)
  .setRegion(environment.cometChat.region)
  .setAuthKey(environment.cometChat.apiKey)
  .subscribePresenceForFriends()
  .build();

//Initialize CometChat
CometChatUIKit.init(uiKitSettings)?.then(()=>{
		//load your root module
    platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
})

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));
