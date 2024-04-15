import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Tabs_Calendar = ({color}:any) => (
  <Svg width={18} height={20} fill="none">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M2 6.914h14M3.81 1v1.543M14 1v1.543m3 2.7V16.3c0 1.491-1.194 2.7-2.667 2.7H3.667C2.194 19 1 17.791 1 16.3V5.243c0-1.491 1.194-2.7 2.667-2.7h10.666c1.473 0 2.667 1.209 2.667 2.7Z"
      />
    </Svg>
)
export default Tabs_Calendar
