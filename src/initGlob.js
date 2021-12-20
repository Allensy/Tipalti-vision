import ThreeGlobe from "three-globe";
import {getTranactions} from "./globe";

async function init(transactions = []) {
  const res = transactions || await getTranactions();
  const tg  = new ThreeGlobe();
  return tg
    .globeImageUrl("https://unpkg.com/three-globe@2.21.3/example/img/earth-day.jpg")
    .arcsData(res)
    .arcColor((res)=> res.color || ["blue", "blue"])
    .arcDashLength((res) => {
      return res.amount/10000000;
    })
    .arcDashGap((res) => res.amount/100000000)
    .arcDashAnimateTime(2000);
    // .arcDashAnimateTime((res) => Math.random() * 4000 + 500);
}
export { init };
