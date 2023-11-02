import './index.scss'
import {Wheel} from "react-custom-roulette";

const data = [
  { option: '0', style: {backgroundColor: '#267819'} },
  { option: 32 },
  { option: 15 },
  { option: 19 },
  { option: 4 },
  { option: 21 },
  { option: 2 },
  { option: 25 },
  { option: 17 },
  { option: 34 },
  { option: 6 },
  { option: 27 },
  { option: 13 },
  { option: 36 },
  { option: 11 },
  { option: 30 },
  { option: 8 },
  { option: 23 },
  { option: 10 },
  { option: 5 },
  { option: 24 },
  { option: 16 },
  { option: 33 },
  { option: 1 },
  { option: 20 },
  { option: 14 },
  { option: 31 },
  { option: 9 },
  { option: 22 },
  { option: 18 },
  { option: 29 },
  { option: 7 },
  { option: 28 },
  { option: 12 },
  { option: 35 },
  { option: 3 },
  { option: 26 },
];

const backgroundColors = ['#a30a03', '#1d211e'];
const textColors = ['#ffffff'];
const outerBorderColor = '#30261a';
const outerBorderWidth = 10;
const innerBorderColor = '#30261a';
const innerBorderWidth = 20;
const innerRadius = 40;
const radiusLineColor = '#f5ce92';
const radiusLineWidth = 2;
// const fontFamily = 'Nunito';
const fontWeight = '500';
const fontSize = 20;
const fontStyle = 'normal';
const textDistance = 79;
const spinDuration = .7;

const Roulette = ({value, mustSpin, setMustSpin}) => {
  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={value}
        data={data}
        backgroundColors={backgroundColors}
        textColors={textColors}
        // fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        outerBorderColor={outerBorderColor}
        outerBorderWidth={outerBorderWidth}
        innerRadius={innerRadius}
        innerBorderColor={innerBorderColor}
        innerBorderWidth={innerBorderWidth}
        radiusLineColor={radiusLineColor}
        radiusLineWidth={radiusLineWidth}
        spinDuration={spinDuration}
        // startingOptionIndex={0}
        textDistance={textDistance}
        perpendicularText
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
    </div>
  );
};

export {Roulette};