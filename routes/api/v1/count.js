var express = require('express');
var router = express.Router();
const response = require('../../../module/response');
const resMessage = require('../../../module/response/message');
const errorAlarm = require('../../../module/errorAlarm');
const {
    sequelize,
    Sequelize: {
        Op
    },
    Rollingpaper,
    RollingpaperContent
} = require('../../../models');

// 전체 이용자 수 조회
router.get('/', async (req, res) => {
    try {
        const rollingPaper = await Rollingpaper.count();
        const rollingPaperContent = await RollingpaperContent.count();

        res.status(200).json(response(resMessage.READ_SUCCESS, {
            rollingPaper,
            rollingPaperContent
        }));
    } catch (err) {
        console.log('에러 : ', err);
        errorAlarm(err);
        res.status(200).json(response(resMessage.INTERNAL_SERVER_ERROR));
    }
})

module.exports = router;
