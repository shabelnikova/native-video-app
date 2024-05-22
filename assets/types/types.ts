export interface Creator {
    accountId: string
    avatar: string
    email: string
    userName: string
}
export interface IDataItem {
    title: string
    thumbnail: string
    prompt: string
    video: string
    $id: string
    creator?: Creator
}