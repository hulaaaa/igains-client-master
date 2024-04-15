import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const FbAuthSvg = () => (
  <Svg width={52} height={52} fill="none">
    <Rect
      width={51}
      height={51}
      x={0.5}
      y={0.5}
      fill="#1E1E1E"
      stroke="#262626"
      rx={11.5}
    />
    <Path
      fill="#E0FE10"
      d="M36 26c0-5.522-4.478-10-10-10s-10 4.478-10 10c0 4.99 3.656 9.128 8.438 9.88V28.89h-2.54V26h2.54v-2.204c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.239.195 2.239.195v2.46h-1.262c-1.241 0-1.63.771-1.63 1.563V26h2.773l-.442 2.891h-2.33v6.988C32.342 35.13 36 30.992 36 26Z"
    />
  </Svg>
)
export default FbAuthSvg
