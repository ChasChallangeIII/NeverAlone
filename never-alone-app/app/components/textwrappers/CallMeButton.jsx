import { StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MyText from './MyText';
import PhoneCall from '../PhoneCall';


const CallMeButton = ({props}) => {
    const [isModalShown, setIsModalShown] = useState(false)

  return (
      <>
          
          <Pressable
              {...props}
              onPress={() => {
                  // handleFakeCall();
                  setIsModalShown(true)
              }}
          >
              <MaterialIcons name="phone" size={24} color={"hotpink"} />
              <MyText>RING MIG</MyText>
          </Pressable>
          <PhoneCall visible={isModalShown} onClose={() => setIsModalShown(false)} />
    </>
  )
}

export default CallMeButton

const styles = StyleSheet.create({})