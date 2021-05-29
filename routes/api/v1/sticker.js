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
    Sticker
} = require('../../../models');
const upload = require('../../../config/multer');

// 특정 롤링페이퍼의 스티커 조회
router.get('/', async (req, res) => {
    try {
        const { rollingpaperId } = req.query;
        const rollingPaper = await Rollingpaper.findOne({
            where: {
                id: rollingpaperId
            }
        });

        if (!rollingpaperId) {
            res.status(200).json(response(resMessage.WRONG_PARAMS));
            return;
        }

        const contents = await Sticker.findAll({
            where: {
                rollingpaperId
            }
        });

        res.status(200).json(response(resMessage.READ_SUCCESS, contents));
    } catch (err) {
        console.log(err);
        errorAlarm(err);
        res.status(200).json(response(resMessage.INTERNAL_SERVER_ERROR));
    }
})

// 스티커 생성 
router.post('/', async (req, res) => {
    try {
        // 트랜잭션 처리
        var transaction = await sequelize.transaction();

        const { rollingpaperId, x, y , url } = req.body;

        // receiver나 password가 undefined일 경우 에러 띄워주기
        if (!rollingpaperId || !url) {
            await transaction.rollback();
            return res.status(200).json(response(resMessage.WRONG_PARAMS));
        }

        const rollingPaper = await Rollingpaper.findOne({
            where: { id: rollingpaperId }
        });

        const createSticker = await Sticker.create({
            x, 
            y, 
            url, 
            rollingpaperId
        });
        
        await transaction.commit();
        res.status(200).json(response(resMessage.SAVE_SUCCESS));
    } catch (err) {
        console.log(err);
        errorAlarm(err);
        transaction.rollback();
        res.status(200).json(response(resMessage.INTERNAL_SERVER_ERROR));
    }
})


// 롤링페이퍼 내의 특정 스티커 삭제
router.delete('/', async (req, res) => {
    try {
        // 트랜잭션 처리
        var transaction = await sequelize.transaction();

        const { stickerId } = req.body;
        if (!stickerId) {
            await transaction.rollback();
            res.status(200).json(response(resMessage.WRONG_PARAMS));
            return;
        }

        const content = await Sticker.destroy({
            where: {
                id: stickerId
            }
        });

        await transaction.commit();
        res.status(200).json(response(resMessage.DELETE_SUCCESS));
    } catch (err) {
        console.log(err);
        errorAlarm(err);
        transaction.rollback();
        res.status(200).json(response(resMessage.INTERNAL_SERVER_ERROR));
    }
});

module.exports = router;
