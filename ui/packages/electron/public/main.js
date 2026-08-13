const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process');
const fs = require('fs');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 1000
  })

  win.loadFile('../../react/public/index.html');
  win.openDevTools();
}


let server = undefined;
if (process.env['SKIP_SERVER'] !== 'true') {
  const currentPath = __dirname;
  const serverPath = currentPath.replace(/\/+$/, "").split("/").slice(0, -3).join("/") + "/build-a-git-server";
  // const serverPath = '/Users/rgraue/development/build-a-git/dist/Build A Git.app/Contents/build-a-git-server'
  console.log("starting server", serverPath);

  try {
    server = spawn(serverPath);
    fs.writeFileSync('/Users/rgraue/Desktop/start.txt', server);
  // Listen for data streaming from the process standard output
    server.stdout.on('data', (data) => {
        console.log(`server::STDOUT::${data}`);
    });

    // Listen for errors streaming from the process standard error
    server.stderr.on('data', (data) => {
        console.error(`server::STDERR::${data}`);
    });

    // Listen for system/launch errors (e.g., command not found)
    server.on('error', (error) => {
        console.error(`Failed to start server: ${error.message}`);
    });

    // Triggered when the process completely finishes
    server.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
    console.log("server started")
  } catch (e) {
    console.error("unable to start internal server", e);
  }
}

app.whenReady().then(() => {
  createWindow();
});

app.on('before-quit', (event) => {
  if (server) {
    console.log("shutting down internal server");
    server.kill();
  }
});

