import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../lib/actions";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function PrimarySearchAppBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, name } = user;

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button variant="text" onClick={() => navigate("/")}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="white"
              sx={{ display: { xs: "flex", sm: "block" } }}
            >
              DB 온라인
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <Button variant="text" onClick={() => navigate("/play")}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="white"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                게임 시작
              </Typography>
            </Button>
            <Button variant="text" onClick={() => navigate("/ranking")}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="white"
                sx={{ display: { xs: "flex", sm: "block" } }}
              >
                랭킹
              </Typography>
            </Button>
            {isLoggedIn ? (
              <Button variant="text" disabled onClick={() => {}}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  color="white"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  {name}님, 환영합니다.
                </Typography>
              </Button>
            ) : (
              <></>
            )}
            {isLoggedIn ? (
              <Button variant="text" onClick={() => handleLogout()}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  color="white"
                  sx={{ display: { xs: "flex", sm: "block" } }}
                >
                  로그아웃
                </Typography>
              </Button>
            ) : (
              <Button variant="text" onClick={() => navigate("/signin")}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  color="white"
                  sx={{ display: { xs: "flex", sm: "block" } }}
                >
                  로그인
                </Typography>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* <pre onClick={() => console.log(user)}>{JSON.stringify(user, null, 2)}</pre> */}
    </Box>
  );
}
