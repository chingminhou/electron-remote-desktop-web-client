
## Introduction
When using a browser as the web client for a remote desktop, some shortcuts such as Alt+Tab, Win-key, F11 or Ctrl+W combinations cannot be sent (passthrough). Here are the source codes for two versions — an Electron and a Tampermonkey userscript version—that enable all shortcuts in fullscreen mode.<br>
當使用瀏覽器作為遠端桌面的 Web Client 時, 某些快捷鍵（例如 Alt+Tab, Win-key 組合鍵, F11 或 Ctrl+W）無法傳送。以下提供兩個版本的原始碼——Electron 與 Tampermonkey Userscript 版——可在全螢幕模式下啟用所有快捷鍵。

Remote Desktop Web Client == Web-based Remote Access == Full Keyboard Access with passthrough mode

## Startup of Electron App Version
This repository is Electron source code.
Install Electron, download this repository the line contains "const host" or "const checkPortNum" in main.js, then _npm start_ to run, or _npm run build_ to build an executable file.

## Startup of Tampermonkey Userscript Version
Install [Tampermonkey Extension](https://tampermonkey.net) on Chrome/Chromium-based Browser.

[OrangeMonkey Extension](https://chromewebstore.google.com/detail/orangemonkey/ekmeppjgajofkpiofbebgcbohbmfldaf) is an alternative, as Tampermonkey may display donation prompts.

After installing Tampermonkey, goto 'Manage extension', check 'Allow User Scripts'. See also [this]( https://docs.scriptcat.org/en/docs/use/open-dev).<br>
安裝 Tampermonkey 後, 至 管理擴充功能, 勾選 允許使用者指令碼. (參考[繁中網址](https://docs-scriptcat-org.translate.goog/docs/use/open-dev?_x_tr_sl=en&_x_tr_tl=zh-TW&_x_tr_hl=zh-TW&_x_tr_pto=wapp) [簡中網址](https://docs.scriptcat.org/docs/use/open-dev))

Open the [userscript](https://gist.github.com/chingminhou/ba2621aa76fcfa0e05e7c5afab953de5), click [Raw] button in the right-top corner, then it's prompted to install the userscript, revise the line contain "// @match" in the header of the userscript, then visit the website.

## Compare the Ways to Connect to Remote Desktop Web
| |Electron App | Chrome/Chromium-based<br>Browser + Tampermonkey | Browser |
| :--: | :-- | :-- | :-- |
|Remote Desktop URL|Hard coded|User Input|User Input|
|Enter fullscreen mode, or the <br>mouse pointer reaches the top edge of the screen| No trigger, no dropdown | A fullscreen exit hint will dropdown | The menu/address bar will dropdown|
|Keyboard Passthrough|Yes|Yes, except shortcuts of other extension|No, Alt+Tab, Win-key combinations and<br> system level shortcuts cannot be passthrough to remote desktop|
|1:1 Pixel Mapping<br>while Zoom=100%|Yes|Win11: No (Ratio=1.25)<br>Otherwise: Yes|Win11: No (Ratio=1.25)<br>Otherwise: Yes|
|Exit Remote Desktop|[Right-Ctrl] + [Ctrl+W], or<br><br>Hold [Esc] for 2 sec +<br> [Ctrl+W]|[Right-Ctrl] + [Ctrl+W] (may not work), or<br><br>Hold [Esc] for 2 sec +<br> [Ctrl+W]|[F11] (exit fulscreen) +<br> [Ctrl+W], or<br><br>Hold [Esc] for 2 sec +<br> [Ctrl+W]
## 比較連到 Remote Desktop Web 的方式
| |Electron App | Chrome/Chromium-based<br>瀏覽器 + Tampermonkey | 瀏覽器 |
| :--: | :-- | :-- | :-- |
|Remote Desktop URL|寫死在app|使用者輸入|使用者輸入|
|進入全螢幕時, 或滑鼠<br>游標頂到螢幕上緣時|無動作| 會降下如何退出全螢幕的提示 | 會降下網址列/選單列 |
|全鍵轉發|Yes|Yes, 除了其它Extension的快捷鍵|No,<br>Alt+Tab, Win-key 組合鍵,<br>系統快捷鍵無法轉發到<br>Remote Desktop|
|1:1 像素對應, 當 Zoom=100% 時|Yes|Win11: No (Ratio=1.25)<br>其它: Yes|Win11: No (Ratio=1.25)<br>其它: Yes|
|退出Remote Desktop|[右Ctrl] + [Ctrl+W], or<br><br>長按 [Esc] 2秒 + [Ctrl+W]|[右Ctrl] + [Ctrl+W] (有時無用), 或<br><br>長按 [Esc] 2秒 + [Ctrl+W]|[F11] (退出全螢幕) + [Ctrl+W], 或<br><br>長按 [Esc] 2秒 + [Ctrl+W]

## Connection Steps
| |Electron App | Chrome/Chromium-based<br>Browser + Tampermonkey | Browser |
| :-- | :-- | :-- | :-- |
|1| Connect and select English IME | the same as left | the same as left |
|2| (fullscreen in default) | F11 to fullscreen | the same as left |
|3| Zoom-in/out by Ctrl+add or Ctrl+subtract<br> if it's RDP connection | the same as left | the same as left |
|4| Login to Remote Desktop Web| the same as left | the same as left |
|5| Click the red region in the top-left corner<br> to enable keyboard passthrough | the same as left | n/a |
|6| During the interaction with remote desktop, <br>press Right-Ctrl can temporarily use Alt+Tab to switch window on<br>local machine (client), and mouse click can<br>re-enable keyboard passthrough | the same as left | n/a |
|7| Exit remote desktop connection | the same as left | n/a |

## 連線步驟
| |Electron App | Chrome/Chromium-based<br>瀏覽器 + Tampermonkey | 瀏覽器 |
| :-- | :-- | :-- | :-- |
|1| 連線 & 切換至ENG輸入法 | 同左 | 同左 |
|2| (預設全螢幕) | F11 to fullscreen | 同左 |
|3| 如果是 RDP, 可以按Ctrl+/Ctrl- 去 Zoom-in/out | 同左 | 同左 |
|4| 登入Remote Desktop Web| 同左 | 同左 |
|5| 點擊左上角紅色區域後全鍵轉發 | 同左 | n/a |
|6| 操作期間, 按 右Ctrl 再按 Alt+Tab 是本機(Client)的切換視窗,<br> 之後再點擊滑鼠重啟全鍵轉發 | 同左 | n/a |
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

- The Electron app and the Tampermonkey userscript have been tested on RDP and VNC connections via the Guacamole server.<br>
Web clients such as RustDesk, Splashtop, AnyDesk, TeamViewer, and Chrome Remote Desktop should be supported, though they have not yet been thoroughly tested.

- Shortcuts from other extensions cannot be passthrough. For example, Immersive Translate (沉浸式翻譯) uses Alt+A and Alt+S, which cannot be sent to the remote server.<br>
You may install the Tampermonkey userscript in another Chromium-based browser to avoid shortcut conflicts with Immersive Translate.

- Ctrl+Shift+F, Ctrl_Shift+V and Ctrl+Shift+X cannot be passthrough in Microsoft Edge, but work correctly in Chrome.

- The Electron app checks port 443 by default; modify this setting as needed for your application.

- On Mac, use Control+⌘+F instead of F11.

- On MacBook, use Right-⌘ instead of Right-Ctrl.

- During the interaction with remote desktop, you might<br>
&nbsp;&nbsp;{Right-Ctrl} then Alt+Tab to open Task Switcher on local machine (client)<br>
&nbsp;&nbsp;{Right-Ctrl} then Win+Tab to open Task View on local machine (client)<br>
&nbsp;&nbsp;{Right-Ctrl} then Win-key to open Start Menu on local machine (client)<br>
&nbsp;&nbsp;{Right-Ctrl} then Win-key to show Desktop on local machine (client)<br>
&nbsp;&nbsp;{Right-Ctrl} then Win+Space to toggle IME on local machine (client)<br>
&nbsp;&nbsp;and mouse click can re-enable keyboard passthrough<br>
&nbsp;&nbsp;按一下 右Ctrl, 再按 Alt+Tab → 本機的切換視窗<br>
&nbsp;&nbsp;按一下 右Ctrl, 再按 Win+Tab → 本機的切換視窗<br>
&nbsp;&nbsp;按一下 右Ctrl, 再按 Win-key → 本機的開始選單<br>
&nbsp;&nbsp;按一下 右Ctrl, 再按 Win+D  → 本機的顯示桌面<br>
&nbsp;&nbsp;按一下 右Ctrl, 再按 Win+Space → 忘記切ENG輸入法, 臨時退出全鍵轉發, 切至ENG輸入法<br>
&nbsp;&nbsp;最後再回到遠端桌面視窗用滑鼠點一下, 就又回到遠端桌面的全鍵轉發模式了

- If the web client is running on an East Asian language version of Windows (CJK) and you experience issues while typing, check your IME state.<br>
如果 web client 是中日韓 Windows, 並且在按鍵輸入時遇到問題, 請檢查輸入法狀態

- For East Asian language Windows, the web client requires the English IME to control the remote desktop. However, browsers and Electron apps run in an isolated sandbox and cannot switch the IME automatically.<br>
If the browser or Electron app is not using the English IME, press Right Ctrl, then Win+Space to select the English IME, and click the mouse to re-enable passthrough mode.<br>
在中日韓 Windows 中, web client 用戶端需要切換至 ENG 輸入法才能控制遠端桌面。然而，瀏覽器與 Electron 應用程式運行在隔離的沙盒世界中, 無法幫你切換輸入法。
如果瀏覽器或 Electron app 不是正在 ENG輸入法，先按 右Ctrl，再按 Win+Space 選擇 ENG輸入法, 然後點擊滑鼠再度進入全鍵轉發模式。

- For IME, you might want to <br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Settings > Time & Language > Typing > Advanced keyboard settings<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check "Let me use a different input method for each app window"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;設定 > 時間與語言 > 輸入 > 進階鍵盤設定<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;勾選 "讓我針對每個應用程式視窗使用不同的輸入法"<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;设置 > 时间和语言 > 输入 > 高级键盘设置<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;勾选  "为每个应用窗口使用不同的输入法"<br>

- If the remote server is Linux, the Win-key may be mapped incorrectly due to keyboard mapping issues. Run _xev_ on the remote server to check the keycode of the Win-key, then remap it. For example:
```sh
xmodmap -e 'keycode 250 = Super_L' // Meta_L = Super_L'
```
## Technical Brief
- A browser has two types of fullscreen: browser-level fullscreen and Fullscreen API.<br>
When the Fullscreen API is invoked, the _navigator.keyboard.lock_ API can pass through almost all key combinations to the server.

- Passthrough mode is activated by a mouse click event to avoid triggering the “Deceptive site ahead”(此網站是可疑網站) warning.

- OrangeMonkey currently cannot detect when a WebSocket connection closes.

- There is no auto-reconnect after an unexpected disconnect.

## Refs
- https://issues.apache.org/jira/browse/GUACAMOLE-989?page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel&focusedCommentId=17095828 <br><br>
https://gist.github.com/toff/ab1ba901dc663297af1fb4b8e630d899

- https://chrome.dev/keyboard-lock <br>
https://chrome.dev/keyboard-lock/script.js
