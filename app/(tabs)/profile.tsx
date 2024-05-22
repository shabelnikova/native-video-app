import {View, FlatList, TouchableOpacity, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import {getUserPosts} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import {useGlobalContext} from "@/context/GlobalProvider";
import {icons} from "@/constants";
import InfoBox from "@/components/InfoBox";
const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const { data: posts} = useAppwrite(() => getUserPosts(user.$id));
    const logout = () => {

    }
    console.log(user)
    return (
        <SafeAreaView className={'bg-primary h-full'}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({item}) => (
                    <VideoCard videoItem={item}/>
                )}
                ListHeaderComponent={() => (
                   <View className={'w-full justify-center items-center mt-6 mb-12 px-4'}>
                       <TouchableOpacity
                       className={'w-full items-end mb-10'}
                       onPress={logout}
                       >
                           <Image
                           source={icons.logout}
                           resizeMode={'contain'}
                           className={'w-6 h-6'}
                           />
                       </TouchableOpacity>
                       <View className={'w-16 h-16 border rounded-lg justify-center items-center overflow-hidden'}>
                            <Image
                            source={{uri: user?.avatar}}
                            className={'w-[100%] h-[100%]'}
                            resizeMode={'cover'}
                            />
                       </View>
                       <InfoBox
                       title={user?.userName}
                       containerStyles={'mt-5'}
                       titleStyles={'text-lg'}
                       />
                       <View className={'mt-5 flex-row'}>

                       </View>
                   </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title={'No videos found'}
                        subtitle={'No videos found for this search query'}

                    />
                )}
            />
        </SafeAreaView>
    )
}
export default Profile;


