
## Introduction
When using a browser as the web client for a remote desktop, some shortcuts such as Alt+Tab or Win-key combinations cannot be sent (passthrough). Here are the source codes for two versions — an Electron and a Tampermonkey userscript version—that enable all shortcuts in fullscreen mode.<br>
當使用瀏覽器作為遠端桌面的 Web Client 時, 某些快捷鍵（例如 Alt+Tab 或 Win-key 組合鍵）無法傳送。以下提供兩個版本的原始碼——Electron 與 Tampermonkey Userscript 版——可在全螢幕模式下啟用所有快捷鍵。

Remote Desktop Web Client == Web-based Remote Access == Full Keyboard Access with passthrough mode

## Startup of Electron App Version
This repository is Electron source code.
Install Electron, download this repository the line contains "const host" or "const checkPortNum" in main.js, then _npm start_ to run, or _npm run build_ to build an executable file.

## Startup of Tampermonkey Userscript Version
Install [Tampermonkey Extension](https://tampermonkey.net) on Chrome/Chromium-based Browser.

[OrangeMonkey Extension](https://chromewebstore.google.com/detail/orangemonkey/ekmeppjgajofkpiofbebgcbohbmfldaf) is an alternative, as Tampermonkey may display donation prompts.

After installing Tampermonkey, goto 'Manage extension', check 'Allow User Scripts'. See also [this]( https://docs.scriptcat.org/en/docs/use/open-dev).<br>
安裝 Tampermonkey 後, 至 管理擴充功能, 勾選 允許使用者指令碼. (參考[這網址](https://docs.scriptcat.org/docs/use/open-dev))

Open the [userscript](https://gist.github.com/chingminhou/ba2621aa76fcfa0e05e7c5afab953de5), click \[Raw\] button in the right-top corner, then it's prompted to install the userscript, revise the line contain "// @match" in the header of this userscript, then vist the website.

## Compare the Ways to Connect to Remote Desktop Web
| |Electron App | Chrome/Chromium-based<br>Browser + Tampermonkey | Browser |
| :--: | :-- | :-- | :-- |
|Remote Desktop URL|Hard coded|User Input|User Input|
|Enter fullscreen mode, or the <br>mouse pointer reaches the top edge of the screen| Nothing triggered | A fullscreen exit hint will dropdown | The menu/address bar will dropdown|
|Keyboard Passthrough|Yes|Yes, except shortcuts of other extension|No,<br>Alt+Tab, Win-key combination,<br> and system-level shortcuts cannotbe passthrough to remote desktop|
|1:1 Pixel Mapping<br>while Zoom=100%|Yes|Win11, No (ratio=1.25)<br>Otherwise, Yes|Win11, No (ratio=1.25)<br>Otherwise, Yes|
|Exit Remote Desktop|\[Right-Ctrl\] + \[Ctrl+W\], or<br><br>Press \[Esc\] for 2 seconds + \[Ctrl+W\]|\[Right-Ctrl\] + \[Ctrl+W\] (may not work), or<br><br>Press \[Esc\] for 2 seconds + \[Ctrl+W\]|\[F11\] (exit fulscreen) + \[Ctrl+W\], or<br><br>Press \[Esc\] for 2 seconds + \[Ctrl+W\]

## 比較連到 Remote Desktop Web 的方式
| |Electron App | Chrome/Chromium-based<br>瀏覽器 + Tampermonkey | 瀏覽器 |
| :--: | :-- | :-- | :-- |
|Remote Desktop URL|寫死在app|使用者輸入|使用者輸入|
|進入全螢幕時, 或滑鼠<br>游標頂到螢幕上緣時|無動作| 會降下如何退出全螢幕的提示 | 會降下網址列/選單列 |
|全鍵轉發|Yes|Yes, 除了其它Extension的快捷鍵|No,<br>Alt+Tab, Win-key 組合鍵,<br>系統快捷鍵無法轉發到<br>Remote Desktop|
|1:1 像素對應, 當 Zoom=100% 時|Yes|Win11, No (ratio=1.25)<br>其它, Yes|Win11, No (ratio=1.25)<br>其它, Yes|
|退出Remote Desktop|\[右Ctrl\] + \[Ctrl+W\], or<br><br>長按 \[Esc\] 2秒 + \[Ctrl+W\]|\[右Ctrl\] + \[Ctrl+W\] (有時無用), 或<br><br>長按 \[Esc\] 2秒 + \[Ctrl+W\]|\[F11\] (退出全螢幕) + \[Ctrl+W\], 或<br><br>長按 \[Esc\] 2秒 + \[Ctrl+W\]

## Technical Brief
A browser has two types of fullscreen: browser-level fullscreen and Fullscreen API.
When the Fullscreen API is invoked, the navigator.keyboard.lock API can pass through almost all key combinations to the server.

Passthrough mode is activated by a mouse click event to avoid triggering the “Deceptive site ahead”(此網站是可疑網站) warning.

## Connection Steps
| |Electron App | Chrome/Chromium-based<br>Browser + Tampermonkey | Browser |
| :-- | :-- | :-- | :-- |
|1| Connect and select English IME | the same as left | the same as left |
|2| (fullscreen in default) | F11 to fullscreen | the same as left |
|3| Zoom-in/out by Ctrl+add or Ctrl+subtract<br> if it's RDP connection | the same as left | the same as left |
|4| Login to Remote Desktop Web| the same as left | the same as left |
|5| Click the red region in the top-left corner<br> to enable keyboard passthrough | the same as left | n/a |
|6| During the interaction with remote desktop, <br>press Right-Ctrl can temporarily use Alt+Tab on<br>local machine (client), and mouse click can<br>re-enable keyboard passthrough | the same as left | n/a |
|7| Exit remote desktop connection | the same as left | n/a |

## 連線步驟
| |Electron App | Chrome/Chromium-based<br>瀏覽器 + Tampermonkey | 瀏覽器 |
| :-- | :-- | :-- | :-- |
|1| 連線 & 切換至ENG輸入法 | 同左 | 同左 |
|2| (預設全螢幕) | F11 to fullscreen | 同左 |
|3| 如果是 RDP, 可以按Ctrl+/Ctrl- 去 Zoom-in/out | 同左 | 同左 |
|4| 登入Remote Desktop Web| 同左 | 同左 |
|5| 點擊左上角紅色區域後全鍵轉發 | 同左 | n/a |
|6| 操作期間, 按 右Ctrl 暫時按本機(Client )的 Alt+Tab, 之後再點擊滑鼠重啟全鍵轉發 | 同左 | n/a |
|7| 退出連線 | 同左 | n/a |

### Note
- The red region in the top-left corner will disappear after 30 seconds.
- Only RDP connections require 1:1 pixel mapping to achieve true pixel-to-pixel resolution on the client. Without 1:1 mapping, fonts will appear blurry.
- The remote desktop server can adjust its desktop size based on the window size in fullscreen mode reported by the web client.<br>
For example, you can get a 1920×1080 desktop if your browser zoom is set to 100% and your display resolution is 1920×1080.<br>
In Windows 11, however, devicePixelRatio may be 1.25, which results in a 1536×864 desktop even when browser zoom is 100%.<br>
To solve this, press Win+R and run the following command to start Chrome (or create a shortcut with this command on the desktop):<br>
```sh
"C:\Program Files\Google\Chrome\Application\chrome.exe" --high-dpi-support=1 --force-device-scale-factor=1
```
- Run this powershell command on remote desktop can report the client resolution.
```sh
Get-CimInstance -ClassName Win32_VideoController | Select-Object CurrentHorizontalResolution, CurrentVerticalResolution
```
- For RDP connections, the client can use NVIDIA Surround, AMD Eyefinity, or Intel Extended Desktop Mode to treat two 1920×1080 screens as a single 3840×1080 display in fullscreen mode.

- In VNC connections, the resolution is independent of the zoom factor or pixel ratio.

- Both the Electron app and the Tampermonkey userscript have been tested on RDP and VNC connections to the Guacamole server.

- Shortcuts from other extensions cannot be passthrough. For example, Immersive Translate (沉浸式翻譯) uses Alt+A and Alt+S, which cannot be sent to the remote server.<br>
You may install the Tampermonkey userscript in another Chromium-based browser to avoid shortcut conflicts with Immersive Translate.

- Ctrl+Shift+F and Ctrl+Shift+V cannot be passthrough in Microsoft Edge, but work correctly in Chrome.

- The Electron app checks port 443 by default; modify this setting as needed for your application.

- On MacBook, use Right-⌘ instead of Right-Ctrl.

- The web client requires the English IME to control the remote desktop. However, browsers and Electron apps run in a sandbox and cannot change the IME automatically.<br>
If the browser/Electron app is not using the English IME, press Right-Ctrl, then Win+Space to select the English IME, and click the mouse to re-enable passthrough mode.

- For IME, you might want to <br>

Settings > Time & Language > Typing > Advanced keyboard settings<br>
  Check "Let me use a different input method for each app window"<br>
設定 > 時間與語言 > 輸入 > 進階鍵盤設定<br>
  勾選 "讓我針對每個應用程式視窗使用不同的輸入法"<br>
设置 > 时间和语言 > 输入 > 高级键盘设置<br>
  勾选  "为每个应用窗口使用不同的输入法"<br>

- If the remote server is Linux, the Win-key may be mapped incorrectly due to keyboard mapping issues. Run _xev_ on the remote server to check the keycode of the Win-key, then remap it. For example:
```sh
xmodmap -e 'keycode 250 = Super_L' // Meta_L = Super_L'
```
