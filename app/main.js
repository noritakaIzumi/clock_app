const {app, BrowserWindow, screen, Menu, Tray} = require('electron');
const path = require('path');

let win = null;
let tray = null;

function createWindow() {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    const width = 200;
    const height = 100;
    win = new BrowserWindow({
        width: width,
        height: height,
        x: workAreaSize.width - width,
        y: workAreaSize.height - height,
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

    win.loadFile(path.join(__dirname, '/index.html')).then(() => {
    });

    win.on("closed", function () {
        win = null;
        tray = null;
    });

    win.once('ready-to-show', () => {
        win.showInactive();
    });
}

app.whenReady().then(() => {
    const iconSize = 16;
    tray = new Tray(path.join(__dirname, `icons/png/${iconSize}x${iconSize}.png`));
    const contextMenu = Menu.buildFromTemplate([
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

    createWindow();

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
