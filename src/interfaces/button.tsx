

import { Pressable, Text, TouchableOpacity } from "react-native";


interface ButtonProps {
   title: string;
   onPress: () => void;
   disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false }) => {
   return( <>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
         <Text>{title}</Text>
      </TouchableOpacity>



      <Pressable>
         { 
            ( { pressed } ) => (
               <Text>
                  { pressed ? 'Pressed!' : 'Press Me' }
               </Text>
            ) 
         }
      </Pressable>

      <Pressable
         style={ 
            ( { pressed } ) => [
               {
                  backgroundColor: pressed ? 
                     'rgb( 210, 230, 255 )'
                     : 
                     'white'
               },
            ] 
         }>
      </Pressable>
   </> );
};