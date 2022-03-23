import { v4 as uuidv4 } from 'uuid';
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import browser from "webextension-polyfill";
import SessionsDb from "./session.js";

let initValue = false;


function getCurrentSessionTabs(sessionTabsObj){
    console.log('reach')
    return new Promise((resolve, reject) => {
        browser.tabs.query(sessionTabsObj).then((result) => {
            console.log("2sd")
            resolve(result);
        })
      });
}


// //windows.WINDOW_ID_CURRENT
// function getCurrentSessionTabs(sessionTabsObj){
//     return new Promise((resolve, reject) => {
//         browser.tabs.query(sessionTabsObj,(result) => {
//             resolve(result);
//         })
//       });
// }

function getCurrentSessionTabGroups(){
    return new Promise((resolve, reject) => {

        browser.tabGroups.query({}).then(
            (result) => {
                resolve(result);
            }
          )
      });
}


const onMessageListener = async (message, sender, sendResponse) => {
    console.log(message,"dd")
if (message.type == "tabsist_session"){
    console.log("111")
    if(message.action == "add"){
        console.log("222")
        if(!initValue){
            await SessionsDb.init();
            initValue = true;
        }
        /////////////
        let onlyCurrentWindow = false
        console.log("121")
        let sessionTabsObj = {}
        if(onlyCurrentWindow){
            sessionTabsObj.currentWindow = true
        }
        console.log("present")
        const sessionTabs = await getCurrentSessionTabs(sessionTabsObj)
        console.log("hell")
        const groupsToGet = new Set()
        for (let i = 0; i < sessionTabs.length; i++ ){
            groupsToGet.add(sessionTabs[i].groupId)
        }
        console.log("123")
        const allGroups = await getCurrentSessionTabGroups()
        // const groups = allGroups.filter(group=>groupsToGet.has(group))
        console.log("12")
        const session = {
            tabs : sessionTabs,
            groups : allGroups
        }
        const sessionContent = {
            title : message.title,
            session : session,
            uid : uuidv4(),
            createdAt : Date.now(),
            updatedAt : Date.now(),
            shareId : null,
            sharer : null
        }
        const x = await SessionsDb.add(sessionContent)

        console.log("www",x)
        //const result = await SessionsDb.get()
        return Promise.resolve([sessionContent]);
    }
    else if(message.action == "update"){
        if(!initValue){
            await SessionsDb.init();
            initValue = true;
        }
        if ((!message.session)||(!message.session.uid)){
            console.log("invalid update request!!")
            return 0
        }
        message.session.updatedAt = Date.now()
        await SessionsDb.add(message.session)
        const result = await SessionsDb.get(message.session.uid)
        return Promise.resolve(result);
    }
    else if(message.action == "deleteSession"){
        if(!initValue){
            await SessionsDb.init();
            initValue = true;
        }
        if ((!message.sessionId)){
            console.log("invalid delete request!!")
            return 0
        }
        
        await SessionsDb.delete(message.sessionId)
        console.log("dtlete")
        const result = await SessionsDb.get()
        return Promise.resolve(result);
    }
    else if(message.action == "deleteAllSessions"){
        if(!initValue){
            await SessionsDb.init();
            initValue = true;
        }        
        await SessionsDb.delete()
        //initValue = false;
        const result = await SessionsDb.get()
        return Promise.resolve(result);
    }
    else if(message.action == "getAllSessions"){
        console.log("in")
        if(!initValue){
            await SessionsDb.init();
            initValue = true;
        }        
        const result = await SessionsDb.get()
        console.log("rrr",result)
        return Promise.resolve(result);
//sendResponse()
    }
    else if(message.action == "getSession"){
        if(!initValue){
            await SessionsDb.init();
            initValue = true;
        }
        if ((!message.sessionId)){
            console.log("invalid delete request!!")
            return 0
        }
        
        const result = await SessionsDb.get(message.sessionId)
        return Promise.resolve(result);
    }
}
}

browser.runtime.onMessage.addListener(onMessageListener);














///////////////
















chrome.runtime.onMessage.addListener((obj)=>{
    if(obj.type==="FROM_CONTENT_TRUE"){
        console.log("INSIDE BACKGROUND when TRUE")
        // window.onload = ()=>{
        chrome.tabs.query( {
            // gets the window the user can currently see
            active: true, 
            currentWindow: true 
            },function(tabs){
            chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT,
            function(dataurl){
                console.log("POPup",dataurl)
                //   chrome.tabs.sendMessage(tabs[0].id,dataurl);
                // chrome.processes.getProcessIdForTab(tabs[0].id,(processId)=>{
                //     console.log(processId)
                // })
                console.log("tabs",tabs[0])
                chrome.tabs.sendMessage(tabs[0].id,{type:"FROM_BACKGROUND_TRUE",dataurl:dataurl,iconurl:tabs[0].favIconUrl});
            
            })
            })
        // }
    }
    else{
        // console.log(window)
        console.log("INSIDE BACKGROUND when False")
    }
})


chrome.runtime.onMessage.addListener(obj => {
    if(obj.type==="FROM_POPUP"){

    
        if(obj.value){
            // window.onload = ()=>{
                chrome.tabs.query( {
                // gets the window the user can currently see
                active: true, 
                currentWindow: true 
                },function(tabs){
                chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT,
                function(dataurl){
                    console.log("POPup",dataurl)
                    console.log("tabs",tabs[0])
                    //   chrome.tabs.sendMessage(tabs[0].id,dataurl);
                    // chrome.processes.getProcessIdForTab(tabs[0].id,(processId)=>{
                    //     console.log(processId)
                    // })
                    chrome.tabs.sendMessage(tabs[0].id,{type:"FROM_BACKGROUND_TRUE",dataurl:dataurl,iconurl:tabs[0].favIconUrl});
                
                })
                })
            // }
        }
        else{
            // window.onload = ()=>{
            // chrome.runtime.sendMessage({type:"FROM_BACKGROUND_FALSE"});
            chrome.tabs.query( {
                // gets the window the user can currently see
                active: true, 
                currentWindow: true 
            },function(tabs){
            chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT,
                function(dataurl){
                    console.log("POPup",dataurl)
                    console.log("tabs",tabs[0])
                    // chrome.processes.getProcessIdForTab(tabs[0].id,(processId)=>{
                    //     console.log(processId)
                    // })
                    chrome.tabs.sendMessage(tabs[0].id,{type:"FROM_BACKGROUND_FALSE",dataurl:dataurl,iconurl:tabs[0].favIconUrl});
                
                })
            })

        // }
        }
}

})









/////////////





var menuItem = {
    "id": "addNote",
    "title": "Add to note",
    "contexts": ["selection"]
};
console.log("heyas")
// function isInt(value) {
//   return !isNaN(value) && 
//          parseInt(Number(value)) == value && 
//          !isNaN(parseInt(value, 10));
// }



chrome.contextMenus.removeAll( function() {
    chrome.contextMenus.create(menuItem);
    console.log("addedcm")
  });



chrome.contextMenus.onClicked.addListener(function(clickData){  
    console.log("listened context click") 
    console.log(clickData.menuItemId,clickData.selectionText)
    if (clickData.menuItemId == "addNote" && clickData.selectionText){   

        console.log("heyakk")


        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id,{type:"nts",noteText:clickData.selectionText,task:"AddNote"});   

          });


          
        

    }
});