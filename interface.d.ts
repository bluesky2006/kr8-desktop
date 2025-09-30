export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
}

declare global {
  interface IElectronAPI {
    parseMetadata: (filePath: string) => Promise<any>;
  }

  interface Window {
    electronAPI: IElectronAPI;
  }
}
