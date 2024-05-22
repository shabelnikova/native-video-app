import {FlatList, Image, ImageBackground, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {IDataItem} from "@/assets/types/types";
import * as Animatable from 'react-native-animatable';
import {icons} from "@/constants";
import {ResizeMode, Video} from "expo-av";

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1,
    }
}
const zoomOut = {
    0: {
        scale: 1.1
    },
    1: {
        scale: 0.9,
    }
}
interface IProps {
    activeItem: string
    item: IDataItem
}
const TrendingItem = ({activeItem, item}: IProps) => {
    const [play, setPlay] = useState(false)
    return (
        <Animatable.View
            className={'mr-5'}
            animation={activeItem === item.$id ? zoomIn : zoomOut as any}
            duration={500}
        >
            {play ? (
                <Video
                source={{uri: item.video}}
                className={'w-52 h-72 rounded-[35px] mt-3 bg-white/10'}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay={play}
                onPlaybackStatusUpdate={(status: any) => {
                    if(status.didJustFinish) {
                        setPlay(false);
                    }
                    // if (status.isLoaded && status.durationMillis && status.positionMillis) {
                    //     if (status.positionMillis >= status.durationMillis) {
                    //         setPlay(false);
                    //     }
                    // }
                }}
                />
            ) : (
                <TouchableOpacity className={"relative justify-center items-center"}
                activeOpacity={0.7}
                onPress={() => setPlay(true)}>
                    <ImageBackground
                    source={{uri: item.thumbnail}}
                    className={'w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'}
                    resizeMode={'cover'}
                    />
                    <Image
                    source={icons.play}
                    className={'w-12 h-12 absolute'}
                    resizeMode={'contain'}
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}
const Trending: React.FC<{posts: IDataItem[] | [] }> = ({posts}) => {
    const [activeItem, setActiveItem] = useState('')
    const viewableItemsChanged = ({viewableItems}: any) => {
        if(viewableItems.length > 0)
            setActiveItem(viewableItems[0].key)
    }
    return (
        <FlatList
            className={'px-3'}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <TrendingItem activeItem={activeItem} item={item}/>
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
            itemVisiblePercentThreshold: 70
        }}
        contentOffset={{x: 170, y: 0}}
        horizontal
        />
    )
}
export default Trending;