import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, ForeignObject } from 'react-native-svg';

const BasePath = (props) => {
  return (
    <Path transform="rotate(-90 16 16)" strokeWidth={1} {...props} />
  );
};


const CircleProgress = ({ progress, background, color, remainingColor, style, strokeWidth, children }) => {
  const size = 32;
  const r = size / 2;
  const angle = (360 * progress) / 100;
  return (
    <Svg viewBox={`0 0 ${size} ${size}`} style={style}>
      <BasePath d={describeArc(r, r, r, 0, angle)} fill={color} />
      <BasePath d={describeArc(r, r, r, angle, 0)} fill={remainingColor} />
      <Circle cx={r} cy={r} r={r - strokeWidth} fill={background}/>
      <ForeignObject x={2} y={2} width={size - 4} height={size - 4}>
        <View style={styles.wrapper}>
          { children }
        </View>
      </ForeignObject>
    </Svg>
  );
};

// ref: https://github.com/jcubic/angular.piechart
export const describeArc = (x, y, radius, startAngle, endAngle) => {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", x, y,
        "L", start.x, start.y,
        "Z"
    ].join(" ");

    return d;
};

export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = angleInDegrees * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};



export default function App() {
  return (
    <View style={styles.container}>
      <CircleProgress
        progress={50}
        strokeWidth={3}
        style={{height: 400, width: 400, flex: 1}}
        color="#A9E97E"
        remainingColor="#256089"
        background="#0B2A40"
      >
        <Text style={styles.text}>Fe</Text>
      </CircleProgress>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 300,
    flex: 1
  },
  text: {
    fontSize: 10,
    lineHeight: 10,
    color: 'white'
  }
});
