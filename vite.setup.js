import indexeddb from 'fake-indexeddb'

const mockNavigator = {
  userAgent: 'Mozilla/5.0 (Test Environment)',
  mediaDevices: {
    getUserMedia: () => Promise.resolve(),
    enumerateDevices: () => Promise.resolve([]),
    ondevicechange: async () => {}
  },
  permissions: {
    query: (permission) => {
      // Mock different permission types
      if (permission.name === 'notifications') {
        return Promise.resolve({
          state: 'granted',
          onchange: null
        })
      }
      if (permission.name === 'microphone') {
        return Promise.resolve({
          state: 'granted',
          onchange: null
        })
      }
      return Promise.resolve({
        state: 'granted',
        onchange: null
      })
    }
  }
}

// Use Object.defineProperty to override read-only properties
Object.defineProperty(global, 'navigator', {
  value: mockNavigator,
  writable: true,
  enumerable: true,
  configurable: true
})

global.window = {
  navigator: mockNavigator,
  indexedDB: indexeddb,
  localStorage: {
    clear: () => {},
    setItem: () => {},
    getItem: () => {}
  },
  location: {
    protocol: 'https:',
    hostname: 'localhost'
  }
}

// Mock other browser APIs that might be needed
global.screen = {
  width: 1920,
  height: 1080
}

global.HTMLCanvasElement = class {
  getContext() {
    return {
      drawImage: () => {},
      getImageData: () => ({ data: new Uint8ClampedArray(4) })
    }
  }
}

global.HTMLVideoElement = class {}
global.HTMLAudioElement = class {}

// Export the setup function
export async function setup() {}

export async function teardown() {}
