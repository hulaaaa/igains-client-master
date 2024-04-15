import * as React from "react"
import Svg, { Path } from "react-native-svg"
const InputIconMail = ({color}:any) => (
    <Svg width={16} height={12} fill="none">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M1.813 1.855 7.5 6.557l6.094-4.702m-7.787 4.2-3.995 4.35m11.376-.356L9.191 6.056M2.625 11.11c-.897 0-1.625-.766-1.625-1.71V2.71C1 1.766 1.728 1 2.625 1h9.75C13.273 1 14 1.766 14 2.71v6.691c0 .944-.727 1.71-1.625 1.71h-9.75Z"
        />
    </Svg>
)
export default InputIconMail

