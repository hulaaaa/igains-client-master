import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'
// icon={<RunningIcon/>} title="Running" kcal={450} min={120} time="Sun, 06:00 - 08:00"/
export default function RecentActiv({icon, title, kcal, min, time}:any) {
  return (
    <View style={styles.container}>
      <View style={styles.innerDiv}>
        {icon}
      </View>
      <View style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 6,
      }}>
        <Text style={{
          fontFamily: 'Regular',
          fontSize: 16,
          color:'white'
        }}>
          {title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 7}}>
          <Svg width={12} height={13} fill="none">
            <Path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity={0.5}
              strokeWidth={1.1}
              d="M1.625 4.614h8.75M2.756 1v.943M9.125 1v.943M11 3.593v6.757c0 .911-.746 1.65-1.667 1.65H2.667C1.747 12 1 11.261 1 10.35V3.593c0-.911.746-1.65 1.667-1.65h6.666c.92 0 1.667.739 1.667 1.65Z"
            />
          </Svg>
          <Text style={{
            fontFamily: 'Regular',
            fontSize: 13,
            color:'rgba(255, 255, 255, 0.5)'
          }}>
            {time}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 7}}>
            <Svg width={12} height={18} fill="none">
              <Path
                fill="#E89D3C"
                d="M11.1 11.711a7.959 7.959 0 0 0-.694-2.516 9.669 9.669 0 0 0-1.319-2.103 8.442 8.442 0 0 0-.382-.444l-.182-.199a2.237 2.237 0 0 0-.12-.128l-.054-.055a2.72 2.72 0 0 1-.184-.2 3.18 3.18 0 0 0-.081-.084C8.044 5.943 8 5.9 7.962 5.85l-.016-.018a12.912 12.912 0 0 1-.713-.847 5.655 5.655 0 0 1-.543-.84 3.858 3.858 0 0 1-.358-1.015 6.222 6.222 0 0 1-.126-1.14A9.62 9.62 0 0 1 6.24.95c.017-.2.037-.378.055-.534a.372.372 0 0 0-.463-.405c-.178.047-.36.108-.54.182-.378.155-.75.369-1.106.639-.454.344-.852.77-1.182 1.264a5.518 5.518 0 0 0-.83 2.052 6.517 6.517 0 0 0 .049 2.577 7.85 7.85 0 0 0 .998 2.432c.251.4.492.735.73 1.017.072.088.267.316.27.319l.077.09c.055.061.094.108.134.156.037.043.067.08.101.116l.006.006c.372.445.634.771.85 1.06.24.318.45.627.643.943.206.337.354.632.463.927.124.335.206.699.243 1.082a6.42 6.42 0 0 1 .001 1.153 10.79 10.79 0 0 1-.25 1.52.372.372 0 0 0 .435.446c.175-.034.343-.079.51-.135a5.253 5.253 0 0 0 2.414-1.69c.448-.556.8-1.223 1.014-1.93.24-.784.323-1.66.237-2.527ZM3.806 13.99a4.411 4.411 0 0 0-.774-1.16l-.085-.094a1.492 1.492 0 0 0-.056-.06l-.023-.023a1.334 1.334 0 0 1-.09-.097l-.033-.034c-.019-.02-.037-.038-.053-.058a2.69 2.69 0 0 1-.584-.781 1.767 1.767 0 0 1-.163-.464 2.858 2.858 0 0 1-.057-.52c-.004-.16.004-.311.012-.411a.372.372 0 0 0-.531-.362 2.34 2.34 0 0 0-.942.823c-.129.192-.3.51-.378.935-.072.372-.064.79.021 1.177.082.376.239.76.457 1.113.114.182.224.335.33.46.031.038.098.116.128.15v.001l.033.038a2.399 2.399 0 0 1 .104.121l.006.006c.115.137.262.317.389.485.11.146.205.287.293.43a1.995 1.995 0 0 1 .322.918c.016.154.016.326 0 .524-.01.117-.026.241-.05.379a.372.372 0 0 0 .507.407 2.399 2.399 0 0 0 .962-.72c.205-.254.365-.559.463-.88.108-.355.147-.765.108-1.155a3.646 3.646 0 0 0-.316-1.149Z"
              />
            </Svg>
            <Text style={{
              fontFamily: 'Light',
              fontSize: 12,
              color:'rgba(255, 255, 255, 0.5)'
            }}>
              {kcal} kcal
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 7}}>
            <Svg width={13} height={15} fill="none">
              <Path
                fill="#4086F5"
                d="m11.568 4.258.821-.813a.618.618 0 0 0 .21-.455.59.59 0 0 0-.21-.455.644.644 0 0 0-.479-.195.702.702 0 0 0-.479.195l-.855.78A6.721 6.721 0 0 0 7.19 1.983V1.3h.685a.703.703 0 0 0 .483-.19.634.634 0 0 0 .2-.46.634.634 0 0 0-.2-.46.703.703 0 0 0-.483-.19H5.137a.703.703 0 0 0-.484.19.634.634 0 0 0-.2.46c0 .172.072.338.2.46s.302.19.484.19h.684v.683A6.653 6.653 0 0 0 1.998 3.67a6.077 6.077 0 0 0-1.93 3.562 5.915 5.915 0 0 0 .777 3.937A6.404 6.404 0 0 0 4 13.825a6.82 6.82 0 0 0 4.207.258 6.522 6.522 0 0 0 3.489-2.248 5.972 5.972 0 0 0 1.303-3.81 5.99 5.99 0 0 0-1.43-3.767Zm.069 3.868H6.505V3.25c1.361 0 2.666.514 3.629 1.428a4.755 4.755 0 0 1 1.503 3.448Z"
              />
            </Svg>

            <Text style={{
              fontFamily: 'Light',
              fontSize: 12,
              color:'rgba(255, 255, 255, 0.5)'
            }}>
              {min} min
            </Text>
          </View>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    flex: 1,
    backgroundColor: '#17181B',
    borderRadius: 12,
    padding: 7,
  },
  innerDiv: {
    backgroundColor: '#232326',
    width: 80,
    aspectRatio: 1/1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
})