module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5433',
  username: 'postgres',
  password: 'admin',
  database: 'meetapp',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
