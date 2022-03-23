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

chrome.contextMenus.create(menuItem);
console.log("addedcm")





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


