import * as React from "react"
import Svg, { Path } from "react-native-svg"
const InputIconPass = ({ color, locked }: any) => {
    return locked ? (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 25 25"
        >
            <Path
                fill={color}
                fillRule="nonzero"
                d="M4.8 10.995v8.01c0 .54.403.995.9.995h12.6c.5 0 .9-.446.9-.995v-8.01c0-.54-.403-.995-.9-.995H5.7c-.5 0-.9.446-.9.995Zm-1.8 0C3 9.34 4.208 8 5.7 8h12.6c1.488 0 2.7 1.348 2.7 2.995v8.01C21 20.66 19.792 22 18.3 22H5.7C4.213 22 3 20.652 3 19.005v-8.01ZM23 8h-2a4 4 0 1 0-8 0h-2a6 6 0 1 1 12 0Zm-11 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            />
        </Svg>
    ) : (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 25 25"
        >
            <Path
                fill={color}
                fillRule="nonzero"
                d="M4.8 10.995v8.01c0 .54.403.995.9.995h12.6c.5 0 .9-.446.9-.995v-8.01c0-.54-.403-.995-.9-.995H5.7c-.5 0-.9.446-.9.995Zm-1.8 0C3 9.34 4.208 8 5.7 8h12.6c1.488 0 2.7 1.348 2.7 2.995v8.01C21 20.66 19.792 22 18.3 22H5.7C4.213 22 3 20.652 3 19.005v-8.01ZM18 8h-2a4 4 0 1 0-8 0H6a6 6 0 1 1 12 0Zm-6 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            />
        </Svg>
    )
}
export default InputIconPass