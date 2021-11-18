import { styled } from "@mui/system";
import { RankingTable } from "../components";

const Wrapper = styled("div")({
  marginTop: 50,
});

const Ranking = () => {
  return (
    <Wrapper>
      <RankingTable />
    </Wrapper>
  );
};

export default Ranking;
