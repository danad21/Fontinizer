const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('fontinizer', {
  version: '0.1.0'
});
