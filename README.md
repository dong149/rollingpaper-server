# rollingpaper-server

  <h3><p align="center">
  💻 롤링페이퍼 서비스 ver1.0 서버
  </p></h3>
  <p align="center"><img src="https://github.com/dong149/rollingpaper-server/blob/develop/rollingpaper.gif" width="30%"/></p>
  <h4><p align="center">
  커다란 종이를 혼자 굴릴 수 있나요?<br/>
  친구들과 함께 굴려서 우리만의 롤링페이퍼를 만드세요!
  </p></h4>

  

  ## 😢 Problem

  코로나19 상황으로 인해, 서로 편하게 소통할 수 있는 방법이 필요하다고 판단하였습니다.<br/>

  이에 따라, 오래전부터 가지고 있던 롤링페이퍼를 온라인으로 가져오는 아이디어를 구현시키기로 결정하게 되었습니다.

  

  <br/><br/>


  ## ⭐️ Feature
  
   <p align="center"><img src="https://github.com/dong149/rollingpaper-server/blob/develop/rollingpaper_announc.gif" width="30%"/></p>
  <h3><p align="center">
  1. 공유 기능 && 자랑하기 기능
  </p></h3>
  
  ver1.0 에서는 공유 기능을 카카오 API와의 연동을 통해, 메세지를 커스터마이징하여
  사용자에게 전달되도록 하였습니다.

  ver2.0 에서는 web share api 를 사용하여, 좀 더 자유로운 공유 기능을 활성화 시키게 되었습니다.
    
  실제로 롤링페이퍼의 사용자가 급증한 데에는 많은 사람들이 한 명에게 선물을 주는 개념이 아닌, 자신의 롤링페이퍼를 생성하여 다른 사람에게 공유해서 메세지를 받는 용도로 많이 사용하게 된게 큰 이유가 되었습니다.
  <br/>
  이에 따라, 사용자들이 자신의 롤링페이퍼를 남들에게 링크의 개념이 아닌, 서비스 메인 화면에서 자랑할 수 있는 기능을 제공하게 되었습니다.
  <br/>
  메인 화면으로의 트래픽을 늘려준 기능이기도 합니다.


  <p align="center"><img src="https://github.com/dong149/rollingpaper-server/blob/develop/rollingpaper_main.gif" width="30%"/><img src="https://github.com/dong149/rollingpaper-server/blob/develop/rollingpaper_detail.gif" width="30%"/></p>
  <h3><p align="center">
  2. 받는 사람 Mode & 주는 사람 Mode
  </p></h3>
  
  ver1.0 에서는 두 가지 모드가 존재하였습니다. 개발 의도는 롤링페이퍼 문화의 기본이 되는 받는 사람은 1명 그리고, 주는 사람은 여러 명일 때의 상황이 자연스럽게 사용자들에게 전달 되는 것을 목표했습니다.
  <br/>
  받는 사람에게는 꽃가루가 뿌려지는 등 다양한 이펙트를 제공하였으나,
  결국 두 가지 모드를 UX적으로 표현하기 어려운 점과 SNS 서비스로의 방향성을 수정하게 되면서 ver2.0 에서는 따로 지원하지 않고 있습니다


  <p align="center"><img src="https://github.com/dong149/rollingpaper-server/blob/develop/rollingpaper_template.gif" width="30%"/></p>
  <h3><p align="center">
  4. 템플릿 변환 기능
  </p></h3>
  
  롤링페이퍼에서는 사용자들에게 현재는 3가지의 템플릿을 제공하고 있습니다.
  ver1.0에서는 한 가지의 템플릿만 제공하였지만, 사용자의 요청에 따라
  <br/>템플릿이라는 개념을 만들고, 크리스마스 기념 템플릿을 2종 출시하였고, 이는 많은 사랑을 받은 기능이 되었습니다.

<br/><br/>

## 🔨 Dev stack

- Node.js | Express
- 초기 MongoDB
- AWS RDS ( MariaDB )

<br/><br/>

