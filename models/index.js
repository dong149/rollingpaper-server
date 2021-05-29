const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/sequelize/dbConfig.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 테이블
db.Rollingpaper = require('./rollingpaper')(sequelize, Sequelize);
db.RollingpaperContent = require('./rollingpaperContent')(sequelize, Sequelize);
db.Sticker = require('./sticker')(sequelize, Sequelize);


// 테이블간 관계 (Association)
// 롤링페이퍼 : 포스트들 = 1 : N
db.Rollingpaper.hasMany(db.RollingpaperContent);
db.RollingpaperContent.belongsTo(db.Rollingpaper);

// 롤링페이퍼 : 스티커들 = 1 : N
db.Rollingpaper.hasMany(db.Sticker);
db.Sticker.belongsTo(db.Rollingpaper);

module.exports = db;
