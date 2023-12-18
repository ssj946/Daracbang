import { css } from "@emotion/react";

const reset = css`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    margin: 0;
    padding: 0;
  }
  .noscroll {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default reset;
