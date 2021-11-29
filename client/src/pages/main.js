import { styled } from "@mui/system";

const Wrapper = styled("div")({
  marginTop: 50,
  alignItems: "center",
});

const Header = styled("h1")({
  marginTop: 30,
});

const SubHeader = styled("h3")({});

// const Title = styled("h6")({});

const Main = () => {
  return (
    <Wrapper>
      <Header>DB 온라인</Header>
      <pre>
        {`
DB온라인에 오신 것을 환영합니다. 
본 페이지는 2021-2 데이터베이스 프로젝트로 만들어졌습니다.
게임 플레이는 모바일에서 지원하지 않습니다. 

`}
      </pre>
      <SubHeader>사용된 기술</SubHeader>
      <pre>
        {`
- Node.js (Express-generator)
  
  * mysql2 (connection.promise() 사용 및 
            DB 질의를 위한 라이브러리)
  * bcrypt (암호화 라이브러리)
  * pm2 (무중단 서비스를 위한 Node.js 서비스 관리자)

- MySQL (오픈소스 RDBMS)

- React.js (Create-React-App)
  
  * react-redux, redux (전역 상태 관리 라이브러리)
  * redux-thunk (DB 연동 간 비동기 처리를 위한 미들웨어)
  * redux-persist (새로고침 등의 상황에서 
                    state 유지를 위한 미들웨어)
  * axios (promise 기반 http 요청을 위한 라이브러리)
  * mui (material-ui 라이브러리)

- 내도메인.한국의 db-online.kro.kr 도메인

- ZeroSSL 인증서 (https 사용)



`}
      </pre>
      <SubHeader>현재까지 구현된 기능</SubHeader>
      <pre>
        {`
- 회원가입

  * 아이디(이메일) 중복 여부 질의를 통해 확인
  * 닉네임(이름) 중복 여부 질의를 통해 확인

- 로그인

  * 아이디(이메일), 비밀번호 입력 여부 확인
  * 아이디(이메일) 존재 여부 질의
  * bcrypt.compare를 통한 비밀번호 매치 여부 확인

- 랭킹

  * 레벨 (동일할 시 경험치) 내림차순으로 순위 표시

- 게임 플레이

  * 캐릭터 생성 / 삭제


`}
      </pre>
      <SubHeader>구현 예정 기능</SubHeader>
      <pre>
        {`
- 게임 플레이

  * 상호작용 (몬스터, 상점 구매/판매 등)

- 랭킹

  * 자신의 캐릭터 랭킹 순위 표기
  



`}
      </pre>
    </Wrapper>
  );
};

export default Main;
