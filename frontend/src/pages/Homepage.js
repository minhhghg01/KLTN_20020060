import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled from "styled-components";
import Students from "../assets/students.png";
import { LightPurpleButton } from "../components/buttonStyles";
import { Margin } from "@mui/icons-material";

const Homepage = () => {
  return (
    <StyledContainer>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <img src={Students} alt="students" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <div class="flex justify-center items-center h-full">
            <StyledPaper elevation={3}>
              <StyledTitle>
                Chào mừng bạn đến với
                <br />
                Hệ thống quản lý
                <br />
                Trung tâm dạy học
              </StyledTitle>
              <StyledBox>
                <StyledLink to="/AdminLogin">
                  <LoginButton variant="contained" fullWidth>
                    Đăng nhập
                  </LoginButton>
                </StyledLink>
              </StyledBox>
            </StyledPaper>
          </div>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Homepage;

const LoginButton = styled(Button)`
&& {
  padding: 20px;
  font-size: 30px
  background-color: #7f56da;
  color: #fff;
  &:hover {
    background-color: #7a1ccb;
  }
}
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  justify-content: center;
  // font-family: "Comic Sans MS";
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
