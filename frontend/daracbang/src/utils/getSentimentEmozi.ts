import HappyURL from "../assets/images/happy.png";
import ThinkingURL from "../assets/images/thinking.png";
import AngryURL from "../assets/images/angry.png";

import SunURL from "../assets/images/sun.png";
import CloudURL from "../assets/images/cloud.png";
import TornadoURL from "../assets/images/tornado.png";

export const getSentimentDiaryEmozi = (sentiment: string) => {
  let url = HappyURL;
  if (sentiment === "neutral") {
    url = ThinkingURL;
  }
  if (sentiment === "negative") {
    url = AngryURL;
  }
  return url;
};

export const getSentimentCommentEmozi = (sentiment: string) => {
  let url = SunURL;
  if (sentiment === "neutral") {
    url = CloudURL;
  }
  if (sentiment === "negative") {
    url = TornadoURL;
  }
  return url;
};
