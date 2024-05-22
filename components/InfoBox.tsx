import {View, Text} from "react-native";
interface IProps {
    title: string
    containerStyles: string
    titleStyles: string
}
const InfoBox = ({title, containerStyles, titleStyles}: IProps) => {
    return (
        <View>
            <Text>InfoBox</Text>
        </View>
    )
}
export default InfoBox;