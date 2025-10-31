module.exports = {
  apps: [{
    name: "customer-app",
    script: "./server.js",
    env_production: {
      NODE_ENV: "production",
      APP_HOST: 'localhost',
      APP_PORT: 3010,
    },
    env_stagging: {
      NODE_ENV: "production",
      APP_HOST: 'localhost',
      APP_PORT: 3002,
    },
    env_development: {
      NODE_ENV: "development",
      APP_HOST: 'localhost',
      APP_PORT: 3000,
    }
  }]
}
