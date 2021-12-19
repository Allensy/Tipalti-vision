import ThreeGlobe from "three-globe";
import {getTranactions} from "./globe";

const N = 10;
// const data = getTranactions().map(async trans =>{

// });
// const arcsData = [...Array(N).keys()].map(() => ({
//   startLat: (Math.random() - 0.5) * 180,
//   startLng: (Math.random() - 0.5) * 360,
//   endLat: (Math.random() - 0.5) * 180,
//   endLng: (Math.random() - 0.5) * 360,
//   color: [
//     ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
//     ["red", "white", "blue", "green"][Math.round(Math.random() * 3)]
//   ]
//));
async function init() {
  const res = await getTranactions();
  console.log(res)
  const tg  = new ThreeGlobe();
  return tg
    .globeImageUrl("https://unpkg.com/three-globe@2.21.3/example/img/earth-day.jpg")
    .arcsData(res)
    .arcColor("color")
    .arcDashLength(() => Math.random())
    .arcDashGap(() => Math.random())
    .arcDashAnimateTime(() => Math.random() * 4000 + 500);
}
export { init };
