// アプリケーション作成用のモジュールを読み込み
const {app, BrowserWindow, screen} = require('electron');

// メインウィンドウ
let mainWindow;

function createWindow() {
    // メインウィンドウを作成します
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    const width = 250;
    const height = 150;
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        x: workAreaSize.width - width,
        y: workAreaSize.height - height,
        transparent: true,
    });
    mainWindow.removeMenu();

    // メインウィンドウに表示するURLを指定します
    // （今回はmain.jsと同じディレクトリのindex.html）
    mainWindow.loadFile('index.html');

    // デベロッパーツールの起動
    // mainWindow.webContents.openDevTools();

    // メインウィンドウが閉じられたときの処理
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

//  初期化が完了した時の処理
app.on('ready', createWindow);

// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
    // macOSのとき以外はアプリケーションを終了させます
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', () => {
    // メインウィンドウが消えている場合は再度メインウィンドウを作成する
    if (mainWindow === null) {
        createWindow();
    }
});
