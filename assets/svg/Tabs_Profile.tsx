import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Tabs_Profile = ({color}:any) => (
  <Svg width={20} height={20} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.7}
      d="M17.8 20.2v-3.6a3.6 3.6 0 0 0-3.6-3.6H4.6A3.6 3.6 0 0 0 1 16.6v3.6M13 4.6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0Z"
    />
  </Svg>
)
export default Tabs_Profile