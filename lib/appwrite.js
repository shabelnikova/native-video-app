import {Account, Avatars, Client, Databases, ID, Query} from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.shabelnikov.aora',
    projectId: '664b24b80035da0a77cf',
    databaseId: '664b2792001874d293d9',
    userCollectionId: '664b28130029f542da97',
    videoCollectionId: '664b28e6002dd13e5b73',
    storageId: '664b2cdf000e9e7566a6'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

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
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
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
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if(!currentUser) throw Error;
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

