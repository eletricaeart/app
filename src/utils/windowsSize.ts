

import { useWindowDimensions } from 'react-native';


const {
   height, width, scale, fontScale
} = useWindowDimensions();

export {
   width, height, fontScale, scale
}