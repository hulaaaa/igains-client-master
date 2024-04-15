import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Tabs_Stats = ({color}:any) => (
  <Svg width={20} height={21}  fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.7}
      d="M12.944 19.176V2a1 1 0 0 0-1-1H7.885a1 1 0 0 0-1 1v17.176m6.059 0-.002-10.32a1 1 0 0 1 1-1H18a1 1 0 0 1 1 1v9.32a1 1 0 0 1-1 1h-5.056Zm0 0H6.885m0 0v-5a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4.885Z"
    />
  </Svg>
)
export default Tabs_Stats

