import {View, Text} from "react-native";
import React from 'react'
import {Link} from "expo-router";

const Profile = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-medium">Profile</Text>
            <Link href='' className="text-blue-800 font-psemibold">Back</Link>
        </View>
    )
}
export default Profile;
