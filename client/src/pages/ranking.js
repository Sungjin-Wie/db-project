import { styled } from "@mui/system";
import { RankingTable } from "../components";

const Wrapper = styled("div")({
  marginTop: 50,
});

const Header = styled("h1")({
  margin: 30,
});

const Ranking = () => {
  return (
    <Wrapper>
      <Header>명예의 전당</Header>
      <RankingTable />
    </Wrapper>
  );
};

export default Ranking;
