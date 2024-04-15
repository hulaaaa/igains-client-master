import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const FavHeart = () => (
    <Svg width={53} height={45} fill="none">
        <Path
            fill="url(#a)"
            d="M27 10.498C21.444-2.15 2-.802 2 15.363S27 45 27 45s25-13.472 25-29.637S32.556-2.15 27 10.498Z"
        />
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.2}
            strokeWidth={1.4}
            d="m27 45-.332.616a.7.7 0 0 0 .664 0L27 45Zm0 0 .333.616h0l.005-.003.015-.008.056-.03.214-.12c.187-.104.459-.259.805-.461.691-.405 1.677-1 2.858-1.764 2.362-1.527 5.515-3.735 8.671-6.456 3.154-2.72 6.329-5.966 8.72-9.574 2.39-3.607 4.023-7.613 4.023-11.837 0-4.187-1.262-7.472-3.296-9.817-2.031-2.342-4.795-3.704-7.724-4.114C36.23.671 30.157 3.203 27 8.92 23.843 3.203 17.77.67 12.32 1.432c-2.93.41-5.693 1.772-7.724 4.114C2.562 7.89 1.3 11.176 1.3 15.363c0 4.224 1.632 8.23 4.023 11.837 2.391 3.608 5.566 6.855 8.72 9.574 3.156 2.72 6.309 4.929 8.67 6.456a76.058 76.058 0 0 0 2.86 1.764 51.015 51.015 0 0 0 1.018.58l.056.031.015.008.004.002h.001L27 45Z"
        />
        <Defs>
            <LinearGradient
                id="a"
                x1={57}
                x2={12.5}
                y1={39.5}
                y2={-5}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#565656" stopOpacity={0.9} />
                <Stop offset={1} stopOpacity={0.8} />
            </LinearGradient>
        </Defs>
    </Svg>
)
export default FavHeart
