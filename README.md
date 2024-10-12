```
npm install
```

```
export const config = {
    endpoint: "",
    platform: "",
    projectId: "",
    databaseId: "",
    userCollectionId: "",
    videoCollectionId: "",
    storageId:"",
}

This config file is needed for appwrite 

```

```
I use docker for local development 

docker run -it --rm ^
    --volume //var/run/docker.sock:/var/run/docker.sock ^
    --volume "%cd%"/appwrite:/usr/src/code/appwrite:rw ^
    --entrypoint="install" ^
    appwrite/appwrite:1.6.0
    


```

You should catch up the documentation

[https://appwrite.io/docs/advanced/self-hosting]


