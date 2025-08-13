const { app, BrowserWindow, globalShortcut, dialog, session } = require('electron');
const net = require('net'); // Explicitly import net
const path = require('path');
const host = 'REMOTE_DESKTOP_SITE_HERE';
const checkPortNum = 443; // known guacamole server port
const checkPort = true;   // check to avoid blank page caused by unreachable server and confuse user

// Chromium arguments
app.commandLine.appendSwitch('high-dpi-support', '1');
app.commandLine.appendSwitch('force-device-scale-factor', '1');
app.commandLine.appendSwitch('enable-features', 'WebRTCPipeWireCapturer');

// Disable hardware acceleration for faster startup (optional)
app.disableHardwareAcceleration();

// Set portable data path to avoid slow disk I/O
app.setPath('userData', path.join(process.execPath, '../userData'));

let mainWindow;

console.log('Electron version:', process.versions.electron);

function checkPortReachable(callback) {
    const socket = new net.Socket();
    const port = checkPortNum;

    socket.setTimeout(2000);

    socket.on('connect', () => {
        console.log(`${host}:${port} is reachable`);
        socket.destroy();
        callback(true);
    });

    socket.on('timeout', () => {
        console.error(`${host}:${port} timed out`);
        socket.destroy();
        callback(false);
    });

    socket.on('error', (err) => {
        console.error(`${host}:${port} is not reachable: ${err.message}`);
        socket.destroy();
        callback(false);
    });

    socket.connect(port, host);
}

function showErrorDialogAndExit(message) {
    dialog.showMessageBoxSync({
        type: 'error',
        title: 'Error',
        message: message,
        buttons: ['OK']
    });
    app.quit();
}

function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true, // Full-screen mode, not kiosk
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
	    partition: 'persist:guac', // save session for user/passwd
            enableWebRtcAudioCapture: true // Enable WebRTC for audio input
        },
        frame: false, // No frame or address bar
	show: true, // Hide until content loads
	backgroundColor: '#000000', // Prevent white flash
	icon: path.join(__dirname, 'assets', 'icon.ico')
    });

    // Reset zoomFactor to 1 on startup and enforce DPR=1
    mainWindow.webContents.setZoomFactor(1);

    mainWindow.loadURL('https://' + host);
  
    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
      if (permission === 'media') {
        callback(true); // Auto-approve microphone/camera requests
      } else {
        callback(false);
      }
    });

    // Inline logic from preload.js: Adjust zoomFactor and run Tampermonkey script
    mainWindow.webContents.on('did-finish-load', () => {

        mainWindow.webContents.setZoomFactor(1.0); // let devicePixelRatio = 1

        // Execute Tampermonkey script
        mainWindow.webContents.executeJavaScript(`
	(function() {
	    'use strict';

	    window.fullscreenAPIinvoked = false;

	    const isMac = navigator.userAgentData ?
	      navigator.userAgentData.platform === 'macOS' :
	      navigator.platform.toUpperCase().indexOf('MAC') >= 0;
	    const hasTouchpad = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	    const isMacBook = isMac && hasTouchpad;
	    const lang = navigator.language || navigator.userLanguage;

	    // Create a button to go full screen.
	    let fsButtonElem = document.createElement("input");
	    fsButtonElem.type = "button";
	    if (lang === 'zh-TW') {
		    fsButtonElem.value = "點擊此處後, 全螢幕全鍵轉發";
	    } else {
		if (lang === 'zh-CN') {
		    fsButtonElem.value = "单击此处后, 全屏键盘直通";
		} else {
		    fsButtonElem.value = "Click: FullScreen & Keyboard Passthrough";
		}
	    }
	    fsButtonElem.style.position = "absolute";
	    fsButtonElem.style.top = "100px";
	    fsButtonElem.style.left = "20px";
	    fsButtonElem.style.opacity = "33%";
	    fsButtonElem.style.padding = "1px 3px";
	    fsButtonElem.style.zIndex = 10000;
	    fsButtonElem.style.color = "white";
	    fsButtonElem.style.backgroundColor = "red";
	    fsButtonElem.style.fontSize = "200%";
	    fsButtonElem.isMoving = false;
	    fsButtonElem.addEventListener("click", function() {
		if (!fsButtonElem.isMoving) {
		    if (!document.fullscreenElement) {
			document.body.requestFullscreen();
			window.fullscreenAPIinvoked = true;
			if (lang === 'zh-TW') {
				fsButtonElem.value = "全鍵轉發On: {滑鼠點擊}   |   Off: {右Ctrl}   |   退出: {右Ctrl}{Ctrl+W}";
			} else {
			    if (lang === 'zh-CN') {
				fsButtonElem.value = "键盘直通On: {鼠标单击}   |   Off: {右Ctrl}   |   退出: {右Ctrl}{Ctrl+W}";
			    } else {
				fsButtonElem.value = "Passthrough On: {Mouse Click}  |  Off: {Right-Ctrl}  |  Exit: {Right-Ctrl}{Ctrl+W}";
			    }
			}
			fsButtonElem.style.backgroundColor = "green";
			fsButtonElem.style.opacity = "100%";
			setTimeout(() => { fsButtonElem.style.opacity = "95%"; }, 500*1);
			setTimeout(() => { fsButtonElem.style.opacity = "90%"; }, 500*2);
			setTimeout(() => { fsButtonElem.style.opacity = "85%"; }, 500*3);
			setTimeout(() => { fsButtonElem.style.opacity = "80%"; }, 500*4);
			setTimeout(() => { fsButtonElem.style.opacity = "75%"; }, 500*5);
			setTimeout(() => { fsButtonElem.style.opacity = "70%"; }, 500*6);
			setTimeout(() => { fsButtonElem.style.opacity = "65%"; }, 500*7);
			setTimeout(() => { fsButtonElem.style.opacity = "60%"; }, 500*8);
			setTimeout(() => { fsButtonElem.style.opacity = "55%"; }, 500*9);
			setTimeout(() => { fsButtonElem.style.opacity = "50%"; }, 500*10);
			setTimeout(() => { fsButtonElem.style.opacity = "45%"; }, 500*11);
			setTimeout(() => { fsButtonElem.style.opacity = "40%"; }, 500*12);
			setTimeout(() => { fsButtonElem.style.opacity = "35%"; }, 500*13);
			setTimeout(() => { fsButtonElem.remove(); }, 500*14);
		    } else {
			document.exitFullscreen();
		    }
		}
		fsButtonElem.isMoving = false;
	    });
	    document.body.appendChild(fsButtonElem);

	    setTimeout(() => {
		if (fsButtonElem.style.backgroundColor = "red") {
			fsButtonElem.remove();
		}
	    }, 30000)

	    // Make the button draggable.
	    // disabled: this is a bit quirky.
	    /*
	    fsButtonElem.addEventListener("mousedown", startDragButton);

	    function startDragButton() {
		document.addEventListener("mouseup", finishDragButton);
		document.addEventListener("mousemove", moveButton);
	    }

	    function finishDragButton() {
		document.removeEventListener("mouseup", finishDragButton);
		document.removeEventListener("mousemove", moveButton);
	    }

	    function moveButton(event) {
		fsButtonElem.style.top = (fsButtonElem.offsetTop + event.movementY) + "px";
		fsButtonElem.style.left = (fsButtonElem.offsetLeft + event.movementX) + "px";
		fsButtonElem.isMoving = true;
	    }
	    */

	    // Call keyboard lock when going full screen.
	    document.addEventListener("fullscreenchange", event => {
		if (document.fullscreenElement) {
		    if (navigator.keyboard) {
			console.log("Locking keyboard.");
			// NB: lock only work when in real full screen.
			// Using the chrome zoom menu doesn't really go full screen!
			navigator.keyboard.lock();
		    } else {
			console.error("Locking keyboard is NOT supported.");
		    }
		}
	    });

	    document.addEventListener("keyup", async (event) => {
		if (isMacBook ? (event.code === "MetaRight") : (event.code === "ControlRight")) {
		    if (!document.fullscreenElement) {
			// only reached if full-screen, so disable this line and always unlock if ControlRight, similar to VirtualBox
			// document.body.requestFullscreen();
		    } else {
			document.exitFullscreen();
		    }
		}
	    });

	    document.addEventListener('click', function(event) {
		if (window.fullscreenAPIinvoked) {
		    if (!document.fullscreenElement) {
			 document.body.requestFullscreen();
		    }
		}

	    });
	})();
        `).catch(err => console.error('Error executing Tampermonkey script:', err));

        // Listen for zoom adjustment directly in main process
        mainWindow.webContents.on('ipc-message', (event, channel, factor) => {
            if (channel === 'set-zoom-factor') {
                mainWindow.webContents.zoomFactor = factor;
            }
        });

        // Alternative: Execute adjustment directly without IPC
        mainWindow.webContents.executeJavaScript(`
            if (window.mainProcessZoomFactor) {
                document.body.dispatchEvent(new CustomEvent('set-zoom-factor', { detail: window.mainProcessZoomFactor }));
            }
        `).then(() => {
            mainWindow.webContents.zoomFactor = mainWindow.webContents.zoomFactor; // Trigger refresh if needed
        }).catch(err => console.error('Error applying zoom:', err));
    });

    globalShortcut.register('F11', () => {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
        return false;
    });

    globalShortcut.register('Control+=', () => {
        mainWindow.webContents.zoomFactor += 0.1;
        return false;
    });

    globalShortcut.register('Control+numadd', () => {
        mainWindow.webContents.zoomFactor += 0.1;
        return false;
    });

    globalShortcut.register('Control+-', () => {
        mainWindow.webContents.zoomFactor -= 0.1;
        checkZoomFactor();
        return false;
    });

    globalShortcut.register('Control+numsub', () => {
        mainWindow.webContents.zoomFactor -= 0.1;
        checkZoomFactor();
        return false;
    });

    globalShortcut.register('Ctrl+W', () => {
        app.quit();
        return false;
    });

    globalShortcut.register('Alt+F4', () => {
        app.quit();
        return false;
    });

    globalShortcut.register('Control+Shift+I', () => {
        if (mainWindow.webContents.isDevToolsOpened()) {
            mainWindow.webContents.closeDevTools();
        } else {
            mainWindow.webContents.openDevTools();
        }
        return false;
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function checkZoomFactor() {
    if (mainWindow && mainWindow.webContents.zoomFactor <= 0.7) {
            app.quit();
    }
}

app.whenReady().then(() => {
    checkPortReachable((reachable) => {
        if (reachable || !checkPort) {
            createWindow();
        } else {
            showErrorDialogAndExit('Unable to connect to ' + host + ':' + checkPortNum + '. The application will now exit.');
        }
    });
}).catch((err) => {
    console.error('Error during app initialization:', err);
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        checkPortReachable((reachable) => {
	    if (reachable || !checkPort) {
                createWindow();
            } else {
                showErrorDialogAndExit('Unable to connect to ' + host + ':' + checkPortNum + '. The application will now exit.');
            }
        });
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
