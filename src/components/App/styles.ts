import styled from "styled-components";
import { Typography } from "@material-ui/core"

export const StyledTypography = styled(Typography)`
  text-align: center;
  && {
    font-weight: 300;
    font-size: 35px;
  }
`;

export const Container = styled.div`
  padding: 20px;
`;
