module.exports = {
  apps: [
    // =========================
    // Next.js 16 (Standalone)
    // =========================
    {
      name: "nextjs-app",
      cwd: "./",
      script: ".next/standalone/server.js",
      exec_mode: "cluster",
      instances: "max", // ใช้ทุก CPU core
      watch: false,

      env: {
        NODE_ENV: "production",
        PORT: 3200,
      },

      env_development: {
        NODE_ENV: "development",
        PORT: 3200,
      },

      max_memory_restart: "1G",

      error_file: "./logs/nextjs-error.log",
      out_file: "./logs/nextjs-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },

    // =========================
    // Socket.IO Server
    // =========================
    {
      name: "socket-server",
      cwd: "./server",
      script: "socket.ts",
      interpreter: "node",
      watch: false,

      env: {
        NODE_ENV: "production",
        PORT: 3201,
      },

      env_development: {
        NODE_ENV: "development",
        PORT: 3201,
      },

      max_memory_restart: "500M",

      error_file: "./logs/socket-error.log",
      out_file: "./logs/socket-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};