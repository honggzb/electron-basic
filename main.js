const {app, BrowserWindow, ipcMain} = require('electron')
const path = require("node:path");
const fs = require("node:fs");


// 这里也是关于ready的另一种写法
app.whenReady().then(() => {
    //console.log('Ready!!!!!')
    createWindow()
    // 管理窗口的生命周期   激活窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(__dirname, './preload.js'), // 必须是绝对路径，引入预加载js
        }
    })
    // 不是很理解为啥前面是ipcRenderer，这里就变成了ipcMain
    ipcMain.on('file-save', writeFile)
    ipcMain.handle('file-read', readFile)

    win.loadFile('./pages/index.html')
    setTimeout(() => {
        win.webContents.send('messages', 'hello!')
    }, 6000);
}

function writeFile(event, data) {
    console.log(data)
    fs.writeFileSync("D:/helloworld.txt", data)
}

function readFile(event, data) {
    console.log(data)
    var res = fs.readFileSync("D:/helloworld.txt").toString();
    console.log(res);
    return res;
}

// 管理窗口的生命周期   退出 - apple
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
