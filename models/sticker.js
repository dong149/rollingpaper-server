module.exports = (sequelize, Sequelize) => {
    return sequelize.define('sticker', {
        // id
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // 스티커 위치 (x 좌표)
        x: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        // 스티커 위치 (y 좌표)
        y: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        // 스티커 url 주소
        url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, {
        // updatedAt열, createdAt열 자동 추가
        timestamps: true,

        // 한글 지원
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    })
};
