import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Arrow = ({color}:any) => (
  <Svg width={12} height={9} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M7.25 1 11 5m0 0L7.25 9M11 5H1"
    />
  </Svg>
)
export default Arrow
