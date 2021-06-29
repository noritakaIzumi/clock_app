const {app, BrowserWindow, screen, Menu, Tray} = require('electron');
const path = require('path');

let win = null;
let tray = null;

function createWindow(width, height, workAreaSize) {
    win = new BrowserWindow({
        width: width,
        height: height,
        show: false,
        alwaysOnTop: true,
        transparent: true,
        resizable: false,
        frame: false,
        skipTaskbar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });
    win.removeMenu();

    win.webContents
        .executeJavaScript('JSON.parse(localStorage.getItem("windowPosition"));', true)
        .then(result => {
            if (result !== null) {
                win.setPosition(result[0], result[1], false);
            } else {
                win.setPosition(workAreaSize.width - width, workAreaSize.height - height, false);
            }
        });

    win.loadFile(path.join(__dirname, '/index_default.html')).then(() => {
    });

    win.on('closed', function () {
        win = null;
        tray = null;
    });

    win.once('ready-to-show', () => {
        win.showInactive();
    });
}

app.whenReady().then(() => {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    const width = 200;
    const height = 100;

    const iconSize = 16;
    tray = new Tray(path.join(__dirname, `icons/png/${iconSize}x${iconSize}.png`));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '表示位置', type: 'submenu', submenu: [
                {
                    label: '左上', click: () => {
                        win.setPosition(0, 0, false);
                    }
                },
                {
                    label: '右上', click: () => {
                        win.setPosition(workAreaSize.width - width, 0, false);
                    }
                },
                {
                    label: '左下', click: () => {
                        win.setPosition(0, workAreaSize.height - height, false);
                    }
                },
                {
                    label: '右下', click: () => {
                        win.setPosition(workAreaSize.width - width, workAreaSize.height - height, false);
                    }
                },
            ]
        },
        {
            label: '隠す', click: () => {
                win.setAlwaysOnTop(false);
                win.hide();
            }
        },
        {
            label: '終了', click: () => {
                win.close();
            }
        }
    ]);
    tray.on('click', () => {
        win.setAlwaysOnTop(true);
        win.showInactive();
    });
    tray.setToolTip(app.getName());
    tray.setContextMenu(contextMenu);

    createWindow(width, height, workAreaSize);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
