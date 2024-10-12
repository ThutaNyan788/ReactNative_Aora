import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';


/*
______________On Localhost____________________
endpoint=http://192.168.100.67/v1
platform=com.thuta.aora
projectId=6707948e00216d918a02
databaseId=670794ec000d122e7506
userCollectionId=670795170019ff2f9b24
videoCollectionId=6707952a0001f92f7cd5
storageId=6707953c0015b0a27194
*/


/*
________________On Cloud______________________
 endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.thuta.aora",
    projectId: "6706938900146af5e40d",
    databaseId: "67069527002fdad959a0",
    userCollectionId: "6706953f0019b9797184",
    videoCollectionId: "6706956f0028c346e825",
    storageId: "6706975500397de64e76"
*/

export const config = {
    endpoint: "http://192.168.100.67/v1",
    platform: "com.thuta.aora",
    projectId: "6707948e00216d918a02",
    databaseId: "670794ec000d122e7506",
    userCollectionId: "670795170019ff2f9b24",
    videoCollectionId: "6707952a0001f92f7cd5",
    storageId: "6707953c0015b0a27194",
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw new Error('Failed to create account');

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }

        )
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);


        return session;
    } catch (error) {
        throw new Error(error);
    }
}


export const getCurrentUser = async () => {

    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error('Failed to get current account');

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );


        if (!currentUser) throw new Error('Failed to get current user');

        return currentUser.documents[0];

    } catch (error) {
        throw new Error(error);
    }
}


export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc("$createdAt")]

        )

        return posts.documents;
    } catch (error) {
        throw new Error(error.message);
    }
}



export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]

        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title',query)]

        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}


export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator',userId)]

        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}


export const signOut = async ()=>{
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        throw new Error(error);
    }
}


export const getFilePreview = async (fileId,type)=>{  
    let fileUrl;

    try {
        if(type === "image"){
            fileUrl = storage.getFilePreview(storageId,fileId);
        }else if(type === "video"){
            fileUrl = storage.getFilePreview(storageId,fileId,2000,2000,'top',100);
        }else{
            throw new Error("Invalid file type");
        }

        if(!fileUrl) throw new Error("Failed to get file preview");

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }

}

export const uploadFile = async (file,type)=>{
    if(!file) return;

  
    const asset ={
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    };

    

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        );

        

        const fileUrl = await getFilePreview(uploadedFile.$id,type);

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export const createVideo= async (form)=>{
    try {
        const [thumbnailUrl,videoUrl] = await Promise.all([
            uploadFile(form.thumbnail,"image"),
            uploadFile(form.video,"video")
        ]);

        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title:form.title,
                thumbnail:thumbnailUrl,
                video:videoUrl,
                prompt:form.prompt,
                creator:form.userId
            }
        )
    } catch (error) {
        throw new Error(error);
    }
}