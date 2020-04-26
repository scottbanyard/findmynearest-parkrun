import styled from "styled-components";
import { Typography } from "@material-ui/core"

export const StyledTypography = styled(Typography)`
  text-align: center;
  && {
    font-weight: 300;
    font-size: 35px;
  }
`;
export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const MarginContainer = styled.div`
  margin-left: 20px;
  margin-top: -5px;
  position: absolute;
  width: 100%;
`;
