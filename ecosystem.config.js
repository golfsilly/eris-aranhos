module.exports = {
  apps: [
    // =========================
    // NEXT.JS APP (STABLE MODE)
    // =========================
    {
      name: "nextjs-app",
      cwd: "./",
      script: "npm",
      args: "run start -p 3200",
      exec_mode: "cluster",
      instances: 2,

      env: {
        NODE_ENV: "production",
        PORT: 3200,
      },

      max_memory_restart: "1G",
    },

    // =========================
    // SOCKET.IO SERVER
    // =========================
    {
      name: "socket-server",
      cwd: "./src/server/socket",
      script: "socket.ts",
      interpreter: "node",
      exec_mode: "fork",

      env: {
        NODE_ENV: "production",
        PORT: 3201,
      },

      max_memory_restart: "500M",
    },
  ],
};