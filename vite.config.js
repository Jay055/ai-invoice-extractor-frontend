// Temporary shim to keep JS config working until vite.config.ts is adopted
export default {
  server: {
    proxy: {
      "/v1": "http://localhost:8090",
    },
  },
};
