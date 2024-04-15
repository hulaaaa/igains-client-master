import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Tabs_Home = ({color}:any) => (
  <Svg width={20} height={20} fill="none">
    <Path
      stroke={color}
      strokeWidth={1.7}
      d="M1 7.416c0-.37.188-.716.505-.93l7.8-5.275a1.25 1.25 0 0 1 1.39 0l7.8 5.275c.317.214.505.56.505.93v9.872c0 .946-.806 1.712-1.8 1.712H2.8c-.994 0-1.8-.766-1.8-1.712V7.416Z"
    />
    <Path stroke={color} strokeLinecap="round" strokeWidth={1.5} d="M10 10v3" />
  </Svg>
)
export default Tabs_Home


