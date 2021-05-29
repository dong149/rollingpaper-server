module.exports = (sequelize, Sequelize) => {
    return sequelize.define('rollingpaper', {
        // id
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // 롤링페이퍼를 받는 사람 & 롤링페이퍼에 접속하기 위한 아이디
        receiver: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // 패스워드
        password: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    }, {

        // updatedAt열, createdAt열 자동 추가
        timestamps: true,

        /* 
        로우를 삭제하는 시퀄라이즈 명령을 내렸을 때, 
        로우를 제거하는 대신 deletedAt에 제거된 날짜를 입력한다.
        (주의 : timestamps가 true여야만 설정할 수 있다.)
        */
        paranoid: true,

        // 한글 지원
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    })
};
