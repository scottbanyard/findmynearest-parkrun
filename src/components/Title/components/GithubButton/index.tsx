import * as React from "react";
import { IconButton } from "@material-ui/core";
import { Github } from "./styles";

const GithubButton = () => {
  return (
    <div>
      <IconButton
        aria-label="Github"
        target="_blank"
        href="https://github.com/scottbanyard/findmynearest-parkrun"
      >
        <Github />
      </IconButton>
    </div>
  )
}

export default GithubButton;
