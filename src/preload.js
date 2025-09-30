// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // Only expose specific, controlled functionality
  parseMetadata: (filePath) => ipcRenderer.invoke("parse-metadata", filePath),
  // NOT exposing: require, process, fs, etc.
});
