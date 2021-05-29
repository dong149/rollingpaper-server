# 1. express-generator을 이용한 프로젝트 폴더 생성 
- express 프로젝트 폴더 생성
- ejs 적용

```$ express --ejs 프로젝트이름```

# 2. .gitignore 파일 추가
- 실제 프로젝트 진행 시에는, .gitignore에 ```#### 직접 설정한 Gitignore ####```로 주석 처리 되어 있는 밑 부분의 코드에 대해 주석처리 해제하기
- .env 주석 처리 되어 있는 부분 해제하기


# 3. 라우팅 관련 폴더 구조 셋팅
- index.js를 활용한 라우팅 폴더 나누기

### 관련 폴더 및 파일
> - app.js 파일
> - routes 폴더

# 4. dotenv 패키지 설치 
- 특정 키를 하드코딩하면 소스 코드가 유출되었을 때 키도 같이 유출되므로 별도로 관리해야 한다. 
이를 위한 패키지가 dotenv이다. 비밀키는 .env라는 파일에 모아두고, dotenv가 .env 파일을 읽어 process.env(환경변수) 객체에 넣는다. 

### 설치 방법

```$ npm i dotenv```

### 관련 폴더 및 파일
> - app.js 파일
> - .env 파일

# 5. 보안 추가 : helmet, hpp 설정

### 설치 방법

```$ npm i helmet hpp```

### 관련 폴더 및 파일

> - app.js 파일

### 참고

- [helmet](https://expressjs.com/ko/advanced/best-practice-security.html)
- [hpp](https://www.npmjs.com/package/hpp)

# 6. morgan, winston을 활용한 로그 기록 남기기
- log/server/combined 폴더에 1시간 단위로 로그 파일이 남을 것이다.
- log/server/error 폴더에 하루 단위로 로그 파일이 남을 것이다.

### 로그 저장 형식
- ```$ npm run production```으로 실행시킬 때, 로그가 기록된다.
- log/server/combined 폴더와 log/server/error 폴더에 로그 파일들이 저장된다.

**a) 일반 라우팅 통신 시 저장되는 로그의 형태**

- 형태 : ${날짜 및 시간} [${로그 종류}] 요청자 ip = ${요청자 ip} || ${HTTP Method 종류} ${HTTP 통신 주소} ${응답 코드} ${응답 시간} || 이전 url = ${이전 url}

```
2020-03-02 11:04:47 [INFO] 요청자 ip = 211.111.111.11:34974 || GET /webview/kakao_map 304 140.744 ms || 이전 url = -
```

**b) 에러 발생 시 저장되는 로그의 형태**
```
2020-02-28 08:38:21 [ERROR] Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (_http_outgoing.js:470:11)
```


### 설치 방법

```$ npm i winston winston-daily-rotate-file```

### 관련 폴더 및 파일
> - app.js 파일
> - module/winston.js 파일

# 7. error_handling 에러 처리 모듈 추가
- 발생한 에러에 대해서 winston을 활용해 로그 파일로 기록
- 일반적인 경우 에러 처리 가능
- sequelize transaction 에러 처리 가능
- axios로 인한 에러 처리 가능
- token에 따른 에러 처리 가능
- GraphQL 통신 에러 처리 가능

### 사용 예시

```
// 파일명 : routes/daly/v2/region/region.js
var express = require('express');
var router = express.Router();
const error_handling = require('../../../../module/error_handling');

router.get('/', async (req, res) => {
    try {
        ...
    } catch (err) {
        error_handling.normal(err, res, transaction);
    }
});
module.exports = router;
```

### 관련 폴더 및 파일
> - module/error_handling.js


# 8. response 모듈
- 클라이언트한테 일관된 형태로 응답 코드와 응답 메시지를 보내기 위한 모듈

### 사용 예시
```
var express = require('express');
var router = express.Router();
const error_handling = require('../../../../module/error_handling');

router.get('/', async (req, res) => {
    try {
        ...
        res.status(200).json(response(resMessage.EXPIRED_TOKEN));
    } catch (err) {
        ...
    }
});
module.exports = router;

```

### 관련 폴더 및 파일
> - module/response/index.js
> - module/response/message.js

# 9. Sequelize 환경 설정 셋팅 및 모델 셋팅 (DB 설계)
### 설치 방법
```$ npm i sequelize```

### 셋팅 해야 할 부분
- config/sequelize/dbConfig.json 파일에서 연결시킬 DB 관련 정보를 입력해야 한다. 
- models 폴더에서 정의할 DB 테이블에 대해서 선언해주어야 한다.

### 사용 예시
```
var express = require('express');
var router = express.Router();
const { Sequelize, Sequelize: { Op }, sequelize, User, Store, Store_img, 
        Product, Product_img, Banner, Payment_history, Category, Category_product, Hashtag, 
        Hashtag_product, Precaution, Banner_btn, Banner_sub_img } = require('../../../../models');

router.delete('/', async(req, res) => {
    try {
        ...
        const result = await Store.destroy({
            where: {
                id
            },
            transaction
        })
        ...
    } catch(err) {
        ...
    }
});

module.exports = router;
```

### 관련 폴더 및 파일
> - app.js 파일
> - models 폴더
> - config/sequelize/dbConfig.json 파일

# 10. multer, AWS S3, AWS IAM

### 셋팅 해야 할 부분
- config/awsconfig.json에 AWS IAM의 access key와 access key secret을 입력해야 한다.
- config/multer.js에 S3 bucket 이름을 입력해야 한다.

### 사용법
- 라우팅에서 multer에 대한 자세한 사용법은 [multer Docs](https://github.com/expressjs/multer/blob/master/doc/README-ko.md)을 참고해라.

### 사용 예시
```
var express = require('express');
var router = express.Router();
const response = require('../../../module/response');
const resMessage = require('../../../module/response/message');
const upload = require('../../../config/multer');
const logger = require('../../../config/winstonConfig');

// 상품 등록
router.post('/', jwt.isLoggedIn, (req, res, next) => {
    upload.array('images', 10)(req, res, function (err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                // 파일 제한 용량을 넘은 경우
                logger.log('error', err.stack);
                res.status(200).json(response(resMessage.LIMIT_FILE_SIZE));
            } else {
                // console.log('multer의 예상치 못한 에러');
                logger.log('error', err.stack);
                res.status(200).json(response(resMessage.INTERNAL_SERVER_ERROR));
            }
        } else {
            next()
        }
})}, async(req, res) => {
    try {
        ...
    } catch(err) {
        ...
    }
});
module.exports = router;
```

### 관련 폴더 및 파일
> - config/awsconfig.json
> - config/multer.js

# 11. JWT 모듈 셋팅

### 셋팅
- module/auth/jwt.js 파일에서 process.env.JWT_SECRET, process.env.JWT_REFRESH_TOKEN_SECRET을 인식할 수 있도록 .env 파일에 변수를 선언해줘야 한다.

### 사용 예시
```
var express = require('express');
var router = express.Router();
const jwt = require('../../../module/auth/jwt');

router.get('/', jwt.isLoggedIn, async(req, res) => {
    try {
        ...
    } catch(err) {
        ...
    }
});

module.exports = router;
```

### 관련 폴더 및 파일
> - module/auth/jwt.js

# 12. crypto 모듈 셋팅 
- 암호화 시키는 데 사용 (주로 비밀번호를 암호화 시키는 데 사용)

### 사용 예시
```
var express = require('express');
var router = express.Router();
const response = require('../../../module/response');
const resMessage = require('../../../module/response/message');
const cryptoPassword = require('../../../module/auth/cryptoPassword');
const jwt = require('../../../module/auth/jwt');
const { sequelize, User, Marketing } = require('../../../models');
const logger = require('../../../config/winstonConfig');
const error_handling = require('../../../module/error_handling');


// 로그인
router.post('/', async(req, res) => {
    try {
        // 트랜잭션 처리
        var transaction = await sequelize.transaction();
        
        let { email, password } = req.body;

        // Params나 Body값에 필수적으로 들어와야 하는 값이 들어오지 않은 경우
        if (!email || !password) {
            res.status(200).json(response.failure(resMessage.NULL_VALUE));
        } else {
            // users의 user_id, email, name 정보 불러오기
            const result = await User.findOne({ 
                where: { 
                    email,
                    provider: 'local'
                },
                attributes: ['id', 'name', 'email', 'birth', 'gender', 'createdAt', 'updatedAt', 'deletedAt', 'salt', 'password', 'role'],
                include: [{
                    model: Marketing,
                    attributes: ['is_third_party_agreement', 'is_event_alarm']
                }],
                transaction
            });
            // console.log('테스트 : ', result);
            
            // 존재하지 않는 아이디의 경우
            if (result === null) {
                res.status(200).json(response.success(resMessage.NULL_USER));

            // 존재하는 아이디인 경우
            } else {
                const salt = result.dataValues.salt;
                const db_hashed_password = result.dataValues.password;
                const hashed_password = await cryptoPassword.hashedPassword(password, salt); 
                // 패스워드가 일치하지 않는 경우
                if (db_hashed_password !== hashed_password) {
                    res.status(200).json(response.success(resMessage.INVALID_PASSWORD));

                // 패스워드가 일치하는 경우 -> 로그인 성공
                } else {
                    const token = jwt.sign(result.dataValues);
                    const refresh_token = jwt.refresh_token_sign(result.dataValues);

                    // 리프레시 토큰 저장         
                    const response_ = await User.update({
                        refresh_token
                    }, {
                        where: { id: result.dataValues.id },
                        transaction
                    });
                    // console.log('리프레시 토큰 저장 여부 : ', response_);

                    // 클라이언트한테 토큰과 리프레시 토큰 전송
                    let data = {
                        token,
                        refresh_token
                    };
                    
                    res.status(200).json(response.success(resMessage.LOGIN_SUCCESS, data));
                }
            }
        }
        await transaction.commit();
    } catch(err) {
        error_handling.normal(err, res, transaction);
    }
});

module.exports = router;
```

### 관련 폴더 및 파일
- module/auth/cryptoPassword.js
