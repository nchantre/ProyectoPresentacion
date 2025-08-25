// src/setupTests.ts
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import 'web-streams-polyfill/dist/polyfill'; // TransformStream

// Polyfill TextEncoder / TextDecoder
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  (global as any).TextEncoder = TextEncoder;
  (global as any).TextDecoder = TextDecoder;
}

// Polyfill AbortController
if (typeof global.AbortController === 'undefined') {
  const { AbortController } = require('abort-controller');
  (global as any).AbortController = AbortController;
}

// Polyfill BroadcastChannel
if (typeof global.BroadcastChannel === 'undefined') {
  (global as any).BroadcastChannel = class {
    constructor() {}
    postMessage() {}
    close() {}
    onmessage = null;
  };
}

// Mocks de fetch simples
global.fetch = global.fetch || jest.fn();

// Opcional: mocks simples de Response y Request
global.Response = global.Response || class { constructor() {} } as any;
global.Request = global.Request || class { constructor() {} } as any;
