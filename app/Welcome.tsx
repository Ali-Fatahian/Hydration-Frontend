// Only show this on the first launch,
// Or if user has not finished the set up process,
// Show login afterwards if user is not logged in

import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import WaterIcon from '@/assets/WaterIcon'

type Props = {}

const Welcome = (props: Props) => {
  const router = useRouter()

  return (
    <View className='bg-[#1e1f3f] h-full w-full py-[80px]'>
      <Stack.Screen options={{ headerShown: false }} />
      <View className='flex flex-col justify-between h-[100%]'>
        <View className='flex flex-col justify-center [&>*]:text-center gap-[70px]'>
            <Text className='text-[20px] font-bold text-white'><WaterIcon />HydrationIQ</Text>
            <Text className='text-[20px] font-bold text-white'>Welcome to HydrateIQ</Text>
            <Text className='font-light text-[#C9C9E3]'>Your AI-driven hydration assistant</Text>
        </View>
        <View className='w-full'>
            <Pressable onPress={() => router.navigate('/Login')} className='bg-[#816BFF] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors'>
                <Text className='text-[18px] font-bold text-white text-center'>Get Started</Text>
            </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Welcome
