import {View, Text, TextInput, Image, Pressable} from "react-native";
import React, {useState} from "react";
import {icons} from '../constants'
interface IFormField {
    title: string
    value: string
    handleChangeText: (e: string) => void
    otherStyles: string
    keyboardType?: string
    placeholder?: string
}
const FormField = ({title, value, handleChangeText, otherStyles, keyboardType, placeholder}: IFormField)  => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View className={"border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row"}>
                <TextInput className="flex-1 text-white font-psemibold text-base"
                           value={value}
                           placeholder={placeholder}
                           placeholderTextColor="#7b7b8b"
                           onChangeText={handleChangeText}
                           secureTextEntry={title === 'Password' && !showPassword}
                />
                {title === 'Password' && (
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide}
                        className={"w-6 h6"}
                        resizeMode={'contain'}/>
                    </Pressable>
                )}
            </View>
        </View>
    )
}
export default FormField;