import {TouchableOpacity, Text} from "react-native";
interface ICustomButton {
    title: string,
    containerStyles: string,
    handlePress: () => void,
    textStyles?: string,
    isLoading?: boolean
}
const CustomButton = ({ title, handlePress, containerStyles, isLoading, textStyles }: ICustomButton) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`${containerStyles} ${isLoading ? 'opacity-50' : ''} bg-secondary rounded-xl min-h-[62px] justify-center items-center`}
            disabled={isLoading}
        >
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}
export default CustomButton;