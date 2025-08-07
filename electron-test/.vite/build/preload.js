"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  // Only expose specific, controlled functionality
  parseMetadata: (filePath) => ipcRenderer.invoke("parse-metadata", filePath)
  // NOT exposing: require, process, fs, etc.
});
