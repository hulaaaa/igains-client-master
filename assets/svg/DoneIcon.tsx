import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const DoneIcon = () => (
  <Svg width={27} height={27} fill="none">
    <Circle
      cx={14.5}
      cy={14.5}
      r={13.5}
      fill="#E0FE10"
      stroke="#000"
      strokeWidth={2}
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.7}
      d="m19 12-6.712 6L10 15.955"
    />
  </Svg>
)
export default DoneIcon
