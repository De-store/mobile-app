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

const getGraphQueryData = async (url, tokensQuery) => {

    const client = new ApolloClient({
        uri: url,
        cache: new InMemoryCache()
    });

    try {
        let listOfApps = []

        const data = await client.query({
            query: gql(tokensQuery)
        })
        let _data = data.data.exampleEntities;

        for (let i in _data) {
            const appData = {
                appId: _data[i].RegisteredApp_appId,
                name: _data[i].RegisteredApp_name,
                tagLine: _data[i].RegisteredApp_tagLine,
                description: _data[i].RegisteredApp_description,
                icon: { type: "image/png", hash: _data[i].RegisteredApp_icon }
            }
            listOfApps.push(appData)
        }
        return listOfApps;
    } catch (e) {
        return listOfApps;
    }

}

export const graphQuery = async (appName = "") => {

    const API_URL = "https://api.thegraph.com/subgraphs/name/surajsingla333/de-store-graph"; // MATIC MUMBAI
    const API_URL_2 = "https://26e8-103-69-24-112.ngrok.io/subgraphs/name/destore/backend"; // EVMOS TESTNT
    const API_URL_3 = "https://26e8-103-69-24-112.ngrok.io/subgraphs/name/destore/backend"; // 5IRE TESTNET

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

    // QUERY FOR MATIC

    let listOfApps = []

    try {
        listOfApps.push(await getGraphQueryData(API_URL, tokensQuery))
        listOfApps.push(await getGraphQueryData(API_URL_2, tokensQuery))
        listOfApps.push(await getGraphQueryData(API_URL_3, tokensQuery))
        return listOfApps
    } catch (e) {
        console.log(e)
        return listOfApps
    }

    // const client = new ApolloClient({
    //     uri: API_URL,
    //     cache: new InMemoryCache()
    // });

    // try {
    //     let listOfApps = []

    //     const data = await client.query({
    //         query: gql(tokensQuery)
    //     })
    //     let _data = data.data.exampleEntities;

    //     for (let i in _data) {
    //         const appData = {
    //             appId: _data[i].RegisteredApp_appId,
    //             name: _data[i].RegisteredApp_name,
    //             tagLine: _data[i].RegisteredApp_tagLine,
    //             description: _data[i].RegisteredApp_description,
    //             icon: { type: "image/png", hash: _data[i].RegisteredApp_icon }
    //         }

    //         listOfApps.push(appData)
    //     }

    //     // QUERY FOR EVMOS
    //     const client_2 = new ApolloClient({
    //         uri: API_URL_2,
    //         cache: new InMemoryCache()
    //     });

    //     try {
    //         const data2 = await client_2.query({
    //             query: gql(tokensQuery)
    //         })
    //         let _data2 = data2.data.exampleEntities;

    //         for (let i in _data2) {
    //             const appData2 = {
    //                 appId: _data2[i].RegisteredApp_appId,
    //                 name: _data2[i].RegisteredApp_name,
    //                 tagLine: _data2[i].RegisteredApp_tagLine,
    //                 description: _data2[i].RegisteredApp_description,
    //                 icon: { type: "image/png", hash: _data2[i].RegisteredApp_icon }
    //             }

    //             listOfApps.push(appData2)
    //         }

    //         // QUERY FOR 5IRE_TESTNET
    //         const client_3 = new ApolloClient({
    //             uri: API_URL_3,
    //             cache: new InMemoryCache()
    //         });

    //         try {
    //             const data3 = await client_3.query({
    //                 query: gql(tokensQuery)
    //             })
    //             let _data3 = data3.data.exampleEntities;

    //             for (let i in _data3) {
    //                 const appData3 = {
    //                     appId: _data3[i].RegisteredApp_appId,
    //                     name: _data3[i].RegisteredApp_name,
    //                     tagLine: _data3[i].RegisteredApp_tagLine,
    //                     description: _data3[i].RegisteredApp_description,
    //                     icon: { type: "image/png", hash: _data3[i].RegisteredApp_icon }
    //                 }

    //                 listOfApps.push(appData3)
    //             }
    //         } catch (e) {
    //             return listOfApps
    //         }
    //     } catch (e) {
    //         return listOfApps
    //     }
    //     return listOfApps


    // } catch (err) {
    //     throw err
    // }
}

const getAppQueryData = async (url, query) => {

    const client = new ApolloClient({
        uri: url,
        cache: new InMemoryCache()
    });

    try {

        const data = await client.query({
            query: gql(query)
        })
        const _data = data.data.exampleEntities[0]

        const appData = {
            appId: _data.RegisteredApp_appId,
            name: _data.RegisteredApp_name,
            tagLine: _data.RegisteredApp_tagLine,
            description: _data.RegisteredApp_description,
            icon: { type: "image/png", hash: _data.RegisteredApp_icon },
            apk: { type: TYPE_APK, hash: _data.RegisteredApp_apkFile },
            images: { type: "image/png", hash: _data.RegisteredApp_images[0] }
        }

        return appData


    } catch (err) {
        throw err
    }
}

export const getAppQuery = async (availableData) => {

    const { appId } = availableData

    const API_URL = "https://api.thegraph.com/subgraphs/name/surajsingla333/de-store-graph"; // MATIC MUMBAI
    const API_URL_2 = "https://26e8-103-69-24-112.ngrok.io/subgraphs/name/destore/backend"; // EVMOS TESTNT
    const API_URL_3 = "https://26e8-103-69-24-112.ngrok.io/subgraphs/name/destore/backend"; // 5IRE TESTNET


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

    try {
        return await getAppQueryData(API_URL, tokensQuery)
    } catch (e1) {
        try {
            return await getAppQueryData(API_URL_2, tokensQuery)
        } catch (e2) {
            try {
                return await getAppQueryData(API_URL_3, tokensQuery)
            } catch (e3) {
                throw e3
            }
        }
    }

    // const client = new ApolloClient({
    //     uri: API_URL,
    //     cache: new InMemoryCache()
    // });

    // try {

    //     const data = await client.query({
    //         query: gql(tokensQuery)
    //     })
    //     const _data = data.data.exampleEntities[0]

    //     const appData = {
    //         appId: _data.RegisteredApp_appId,
    //         name: _data.RegisteredApp_name,
    //         tagLine: _data.RegisteredApp_tagLine,
    //         description: _data.RegisteredApp_description,
    //         icon: { type: "image/png", hash: _data.RegisteredApp_icon },
    //         apk: { type: TYPE_APK, hash: _data.RegisteredApp_apkFile },
    //         images: { type: "image/png", hash: _data.RegisteredApp_images[0] }
    //     }

    //     return appData


    // } catch (err) {
    //     throw err
    // }
}