import { fetchFromIPFS } from "./Ipfs"
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { TYPE_APK } from '../constant/constant'

// export const fetchUserApplication = async (reduxState) => {

//     try {

//         const { contract } = reduxState.contract
//         let currAccount = await contract.web3.eth.getAccounts();
//         let addApplicationResult = await contract.instance.methods.getUserApplications().call({ from: currAccount.toString() });

//         let listOfApps = []

//         const promisesToAwait = [];
//         for (let i in addApplicationResult) {
//             promisesToAwait.push(
//                 contract.instance.methods.getAppDetails(addApplicationResult[i]).call({ from: currAccount.toString() }));
//         }
//         const responses = await Promise.all(promisesToAwait);

//         const newPromisesToAwait = [];
//         for (let i in responses) {
//             newPromisesToAwait.push(fetchFromIPFS(responses[i].appId));
//         }
//         const responses2 = await Promise.all(newPromisesToAwait);


//         for (let i in responses2) {
//             const appData = {
//                 name: responses2[i].name,
//                 tagLine: responses2[i].tagLine,
//                 description: responses2[i].description,
//                 icon: { type: "image/png", hash: responses2[i].icon },
//                 apk: { type: TYPE_APK, hash: responses[i].apkFile },
//                 images: { type: "image/png", hash: responses[i].images[0] }
//             }

//             listOfApps.push(appData)
//         }
//         return listOfApps
//     } catch (err) {
//         throw err
//     }

// }

export const graphQuery = async (appName = "") => {

    const API_URL = "https://api.thegraph.com/subgraphs/name/surajsingla333/de-store-graph";


    const tokensQuery = appName === "" ? `
        query {
            exampleEntities {
            id
            count
            RegisteredApp_appId
            RegisteredApp_name
            RegisteredApp_tagLine
            RegisteredApp_description
            RegisteredApp_icon
            }
        }
        ` : `
        query {
            exampleEntities {
            id
            count
            RegisteredApp_appId
            RegisteredApp_name
            RegisteredApp_tagLine
            RegisteredApp_description
            RegisteredApp_icon
            }
        }
        `
    console.log("tokensQuery ", tokensQuery)

    const client = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache()
    });

    try {
        let listOfApps = []

        const data = await client.query({
            query: gql(tokensQuery)
        })
        console.log("DATA ", data, data.data.exampleEntities)
        let _data = data.data.exampleEntities;

        for (let i in _data) {
            console.log("ipfsResponse ", _data)
            console.log("ipfsResponse i", i)
            const appData = {
                appId: _data[i].RegisteredApp_appId,
                name: _data[i].RegisteredApp_name,
                tagLine: _data[i].RegisteredApp_tagLine,
                description: _data[i].RegisteredApp_description,
                icon: { type: "image/png", hash: _data[i].RegisteredApp_icon }
            }

            listOfApps.push(appData)
        }

        // for (let i in ipfsResponse) {
        //     console.log("ipfsResponse ", ipfsResponse)
        //     console.log("ipfsResponse i", i)
        //     const appData = {
        //         appId: data.data.exampleEntities[i].appId,
        //         name: ipfsResponse[i].name,
        //         tagLine: ipfsResponse[i].tagLine,
        //         description: ipfsResponse[i].description,
        //         icon: { type: "image/png", hash: ipfsResponse[i].icon },
        //     }

        //     listOfApps.push(appData)
        // }
        return listOfApps


    } catch (err) {
        console.log("ERR ", err)
        throw err
    }
}

export const getAppQuery = async (availableData) => {

    const { appId } = availableData

    const API_URL = "https://api.thegraph.com/subgraphs/name/surajsingla333/de-store-graph";

    console.log("API_URL ", API_URL)

    const tokensQuery = `
        query {
            exampleEntities(where: {RegisteredApp_appId: "${appId}"}) {
                id
                count
                RegisteredApp_appId
                RegisteredApp_name
                RegisteredApp_tagLine
                RegisteredApp_description
                RegisteredApp_icon
                RegisteredApp_apkFile
                RegisteredApp_iosFile
                RegisteredApp_images
            }
        }
        `
    console.log("tokensQuery ", tokensQuery)

    const client = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache()
    });

    try {

        const data = await client.query({
            query: gql(tokensQuery)
        })
        const _data = data.data.exampleEntities[0]
        console.log("\nDATA \n", _data)

        const appData = {
            appId: _data.RegisteredApp_appId,
            name: _data.RegisteredApp_name,
            tagLine: _data.RegisteredApp_tagLine,
            description: _data.RegisteredApp_description,
            icon: { type: "image/png", hash: _data.RegisteredApp_icon },
            apk: { type: TYPE_APK, hash: _data.RegisteredApp_apkFile },
            images: { type: "image/png", hash: _data.RegisteredApp_images[0] }
        }

        // const appData = {
        //     appId: availableData.appId,
        //     name: availableData.name,
        //     tagLine: availableData.tagLine,
        //     description: availableData.description,
        //     icon: availableData.icon,
        //     apk: { type: TYPE_APK, hash: data.data.exampleEntities[0].apkFile },
        //     images: { type: "image/png", hash: data.data.exampleEntities[0].images[0] }
        // }
        return appData


    } catch (err) {
        console.log("ERR ", err)
        throw err
    }
}