import {useEffect, useState} from "react";
import {Alert} from "react-native";
import {IDataItem} from "@/assets/types/types";

const useAppwrite = (fn: any) => {
    const [data, setData] = useState<IDataItem[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async() => {
        setIsLoading(true);
        try {
            const res = await fn();
            setData(res);
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    const refetch = () => fetchData();
    return { data, isLoading, refetch }
}

export default useAppwrite;