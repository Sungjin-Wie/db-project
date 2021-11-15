import WarningIcon from "@mui/icons-material/Warning";

const Oops = () => {
  return (
    <div
      style={{
        display: "table",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        marginTop: "50px"
      }}
    >
      <WarningIcon fontSize="large" style={{ width: "30px", margin: "auto" }} />
      <h2 style={{ margin: "10px" }}>모바일에서는 플레이가 불가능합니다.</h2>
    </div>
  );
};

export default Oops;
