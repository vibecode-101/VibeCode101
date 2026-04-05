module.exports = {
  apps: [
    {
      name: "vc-101-api",
      cwd: "./api-server",
      script: "pnpm",
      args: "run start",
      env: {
        PORT: 8080,
        NODE_ENV: "production",
      },
    },
    {
      name: "vc-101-frontend",
      cwd: "./frontend",
      script: "pnpm",
      args: "run serve",
      env: {
        PORT: 4848,
        BASE_PATH: "/",
        NODE_ENV: "production",
      },
    },
  ],
};
