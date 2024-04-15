import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BellAlertIcon = () => (
  <Svg width={20} height={22} fill="none">
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.7}
      d="M7.25 19.99c.846.628 1.963 1.01 3.188 1.01 1.224 0 2.341-.382 3.187-1.01M1.482 16.758c-.504 0-.786-.736-.48-1.145.707-.95 1.39-2.34 1.39-4.016l.028-2.428C2.42 4.657 6.01 1 10.437 1c4.493 0 8.136 3.711 8.136 8.289l-.03 2.308c0 1.687.66 3.086 1.338 4.035.293.41.011 1.126-.487 1.126H1.482Z"
    />
  </Svg>
)
export default BellAlertIcon
