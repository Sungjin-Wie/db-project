import { styled } from "@mui/system";
import { Loading, MyRankingTable, RankingTable } from "../components";
import { useSelector } from "react-redux";

const Wrapper = styled("div")({
  marginTop: 50,
  alignItems: "center",
});

const Header = styled("h1")({
  margin: 30,
});

const Ranking = () => {
  const global = useSelector((state) => state.global);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { loading } = global;
  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>명예의 전당</Header>
          <RankingTable />
          {isLoggedIn ? (
            <>
              <Header>내 랭킹</Header>
              <MyRankingTable />
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Ranking;
