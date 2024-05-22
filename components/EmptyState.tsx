import {View, Text, Image} from "react-native";
import { images } from '../constants'
import CustomButton from "@/components/CustomButton";
import {router} from "expo-router";
interface IProps {
    title: string
    subtitle: string
}
const EmptyState = ({ title, subtitle }: IProps) => {
    return (
        <View className={'justify-center items-center px-4'}>
            <Image
                source={images.empty}
                className={'w-[270px] h-[215px]'}
                resizeMode={'contain'}
            />
            <Text className={'text-white mt-2 text-xl font-psemibold text-center'}>{title}</Text>
            <Text className={'text-gray-100 text-sm font-pmedium'}>{subtitle}</Text>
            <CustomButton
                title={'Create video'}
                containerStyles={'w-full my-5'}
                handlePress={() => router.push('/create')}/>
        </View>
    )
}
export default EmptyState;
//