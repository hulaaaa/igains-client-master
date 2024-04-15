import * as React from "react"
import Svg, { Path } from "react-native-svg"
const InputIconName = ({color}:any) => (
  <Svg width={15} height={15} fill="none">
    <Path
      stroke={color}
      strokeWidth={1.2}
      d="M1 13.264c0-2.557 2.136-4.63 6.5-4.63s6.5 2.073 6.5 4.63c0 .406-.297.736-.663.736H1.663C1.297 14 1 13.67 1 13.264ZM9.938 3.438a2.438 2.438 0 1 1-4.876 0 2.438 2.438 0 0 1 4.875 0Z"
    />
  </Svg>
)
export default InputIconName


