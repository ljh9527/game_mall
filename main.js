const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
let mainWindow = null;
//判断命令行脚本的第二参数是否含--debug
const debug = /--debug/.test(process.argv[2]);
function makeSingleInstance() {
    if (process.mas) return;
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}
function createWindow() {
    const windowOptions = {
        width: 430,
        height: 600,
        frame: false,
        movable: true,//可否移动
        webPreferences: {
            nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
        }
    };
    const urlLocation = isDev ? 'http://localhost:3456/' : 'dummyurl';
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL(urlLocation);
    // mainWindow.loadURL(path.join('file://', __dirname, '/build/index.html'));
    //接收渲染进程的信息
    const ipc = require('electron').ipcMain;
    //接收最大化命令
    ipc.on('window-max', function () {
        if (mainWindow.isMaximized()) {
            mainWindow.restore();
        } else {
            mainWindow.maximize();
        }
    });
    ipc.on('min', function () {
        mainWindow.minimize();
    });
    ipc.on("login", function () {
        mainWindow.setSize(1260, 850);
        mainWindow.center();
    });
    ipc.on("loginOut", function () {
        mainWindow.setSize(430, 600);
        mainWindow.center();
    });
    //如果是--debug 打开开发者工具，窗口最大化，
    if (debug) {
        mainWindow.webContents.openDevTools();
        require('devtron').install();
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    mainWindow.on('maximize', function () {
        mainWindow.webContents.send('main-window-max');
    })
    mainWindow.on('unmaximize', function () {
        mainWindow.webContents.send('main-window-unmax');
    })
}
makeSingleInstance();
//app主进程的事件和方法
app.on('ready', () => {
    createWindow();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
module.exports = mainWindow;