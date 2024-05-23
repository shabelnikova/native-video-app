import {Account, Avatars, Client, Databases, ID, Query, Storage} from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.shabelnikov.aora',
    projectId: '664b24b80035da0a77cf',
    databaseId: '664b2792001874d293d9',
    userCollectionId: '664b28130029f542da97',
    videoCollectionId: '664b28e6002dd13e5b73',
    storageId: '664b2cdf000e9e7566a6'
}
const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = appwriteConfig;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async (email, password, userName) => {
  try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            userName
        )
      if(!newAccount) throw Error;
      const avatarUrl = avatars.getInitials(userName)
      await signIn(email, password);
      const newUser = await databases.createDocument(
          databaseId,
          userCollectionId,
          ID.unique(),
          {
              accountId: newAccount.$id,
              email,
              userName,
              avatar: avatarUrl
          }
      )
      return newUser;
  } catch(error) {
      console.log(error)
      throw new Error(error)
  }
}
export const signIn = async (email, password) => {
    try {
        return await account.createEmailSession(email, password);
    } catch(error) {
        throw new Error(error);
    }
}
export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if(!currentUser) throw Error;
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts =
            await databases.listDocuments(databaseId, videoCollectionId,
                [Query.orderDesc('$createdAt')]);
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}
export const getLatestPosts = async () => {
    try {
        const posts =
            await databases.listDocuments(databaseId, videoCollectionId,
                [Query.orderDesc('$createdAt'), Query.limit(7)]);
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}
export const searchPosts = async (query) => {
    try {
        const posts =
            await databases.listDocuments(databaseId, videoCollectionId,
                [Query.search('title', query)])
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}
export const getUserPosts = async (userId) => {
    try {
        const posts =
            await databases.listDocuments(databaseId, videoCollectionId,
                [Query.equal('creator', userId), Query.orderDesc('$createdAt')])
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}
export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error)
    }
}
export const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if(type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
        } else {
            throw new Error ('Invalid file type')
        }
        if (!fileUrl) {
            throw Error;
        }
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}
export const uploadFile = async (file, type) => {
    if(!file) return;
    const { mimeType, ...rest} = file;
    const asset = { type: mimeType, ...rest };
    // const asset = {
    //     name: file.fileName,
    //     file: file.fileSize,
    //     uri: file.uri,
    //     type: file.mimeType,
    // };
    try {
        const uploadedFile = await storage.createFile(storageId, ID.unique(), asset);
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
}
export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])
        console.log(thumbnailUrl)
        const newPost = await databases.createDocument(databaseId, videoCollectionId, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            creator: form.userId
        })
        return newPost;
    } catch (error) {
        throw new Error('Hello from here', error.message);
    }
}
