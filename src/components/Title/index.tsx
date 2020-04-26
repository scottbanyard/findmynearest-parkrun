import * as React from "react";
import { StyledTypography, TitleContainer, MarginContainer } from "./styles";
import GithubButton from "./components/GithubButton";

const Title = () => (
  <div>
    <TitleContainer>
      <StyledTypography>findmynearest parkrun</StyledTypography>
      <MarginContainer>
        <GithubButton/>
      </MarginContainer>
    </TitleContainer>
  </div>
);

export default Title;
