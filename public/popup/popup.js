/*global chrome*/

var array=[]
var updatedObj
var trashCan

//------------All Functions-Start-----------------------------

//Creating Windows,Groups and tabs for Displaying on Frontend
const createWindows = (SESSION,createdAt)=>{
  var groupArray = SESSION.groups
  var tabArray = SESSION.tabs
  console.log(SESSION)
  var groups = []
  var tabs = []
  var windows = {}
  var today = new Date(createdAt);
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  for(let p=0;p<groupArray.length;p++){
    let obj = new Object()
    let objArray = []
    for(let q=0;q<tabArray.length;q++){
      if(tabArray[q]){
        if(groupArray[p].id == tabArray[q].groupId){
          objArray.push(tabArray[q])
          delete tabArray[q]
        }
      }
    }
    obj["groupInfo"] = groupArray[p]
    obj["tabs"] = objArray
    groups.push(obj)
  }
  tabs = tabArray.filter(function(e){return e})
  console.log(groups)
  console.log(tabs)
  for(let p=0;p<tabs.length;p++){
    if(tabs[p]){
    if(windows[tabs[p].windowId]){
      windows[tabs[p].windowId]["tabs"].push(tabs[p])
    }
    else{
      let obj = new Object()
      obj["tabs"] = [tabs[p]]
      obj["groups"] = []
      windows[tabs[p].windowId] = obj
    }
  }
  }
  for(let p=0;p<groups.length;p++){
    if(windows[groups[p].groupInfo.windowId]){
      windows[groups[p].groupInfo.windowId]["groups"].push(groups[p])
    }
    else{
      let obj = new Object()
      obj["tabs"] = []
      obj["groups"] = [groups[p]]
      windows[groups[p].groupInfo.windowId] = obj
    }
  }
  return {"windows":windows,"groups":groups,"tabs":tabs,"dateTime":dateTime}
}

///Click on a session Div
const clickSession = (uid,x)=>{
  document.getElementById(uid).addEventListener("click",()=>{
    updatedObj = JSON.parse(JSON.stringify(x[uid]));
    console.log("Clicked index: " + x[uid].sessionName);
    document.getElementById("rightSessionName").innerText =  x[uid].sessionName
    document.getElementById("rightGroups").innerText =  String(x[uid].groups.length) + " groups"
    document.getElementById("rightTabs").innerText =  String(x[uid].tabs.length) + " tabs"
    document.getElementById("rightDate").innerText =  x[uid].date
    document.getElementById("rightUid").innerText =  uid
    if(document.getElementById("dropdown")){
      document.getElementById("dropdown").remove()
    }
    var ul = document.createElement("ul")
    ul.setAttribute('id',"dropdown");
    ul.setAttribute('class', "dropdown");
    
    console.log(x[uid].windows)
    for (const [key, value] of Object.entries(x[uid].windows)) {
      var ul2 = document.createElement("ul")
      var li1 = document.createElement("li");   
      var h2 = document.createElement("h2");
      var div2 = document.createElement("div")
      div2.style.display = "flex"
      // div2.append(h2)
      h2.innerText = "Window"+String(key)
      var i1 = document.createElement("i")
      i1.classList.add("fa","fa-close","cross")
      i1.setAttribute('id',String(key)+":cross"+x[uid].sessionName);
      //Deleting Windows
      document.addEventListener('click',function(e){
        if(e.target && e.target.id== String(key)+":cross"+x[uid].sessionName){
          console.log(e.target.parentNode)
          delete updatedObj.windows[key]
          // e.target.parentNode.parentNode.style.display = "none"
          e.target.parentNode.parentNode.remove()
         }
     });
      div2.appendChild(h2)
      div2.appendChild(i1)
      li1.appendChild(div2)
      // ul.append(li1)
      console.log(value.groups)
      for(let p=0;p<value.groups.length;p++){
        var li2 = document.createElement("li");
        var div3 = document.createElement("div")
        var ul3 = document.createElement("ul")
        div3.style.display = "flex"
        var h22 = document.createElement("h2");
        h22.innerText = String(value.groups[p].groupInfo.title)
        var i2 = document.createElement("i")
        i2.classList.add("fa","fa-close","cross")
        i2.setAttribute('id',String(value.groups[p].groupInfo.id)+":cross"+x[uid].sessionName);
        //Deleting Groups
        document.addEventListener('click',function(e){
          if(value.groups[p]){
          if(e.target && e.target.id== String(value.groups[p].groupInfo.id)+":cross"+x[uid].sessionName){
            console.log(e.target.parentNode)
            const gId = e.target.id.split(":cross")[0]
            for(let m=0;m<updatedObj.windows[key].groups.length;m++){
              if(updatedObj.windows[key].groups[m] && updatedObj.windows[key].groups[m].groupInfo.id == gId){
                delete updatedObj.windows[key].groups[m]
              }
            }


            e.target.parentNode.parentNode.style.display = "none"
           }
          }
       });
        // i2.addEventListener("click",function(){
        //   li2.style.display = "none"
        // })
        div3.appendChild(h22)
        div3.appendChild(i2)
        li2.append(div3)
        
        for(let q=0;q<value.groups[p].tabs.length;q++){
          var li3 = document.createElement("li");
          var a3 = document.createElement("a"); 
          var i3 = document.createElement("i")
          i3.classList.add("fa","fa-close","cross")
          i3.setAttribute('id',String(value.groups[p].tabs[q].id)+":cross"+x[uid].sessionName);
          //Deleting tabs in Groups
          document.addEventListener('click',function(e){
            if(value.groups[p] && value.groups[p].tabs[q]){
            if(e.target && e.target.id== String(value.groups[p].tabs[q].id)+":cross"+x[uid].sessionName){
              console.log(e.target.parentNode.parentNode.children.length)
              const gtabId = e.target.id.split(":cross")[0]
              for(let m=0;m<updatedObj.windows[key].groups.length;m++){
                if(updatedObj.windows[key].groups[m]){
                for(let n=0;n<updatedObj.windows[key].groups[m].tabs.length;n++){
                  if(updatedObj.windows[key].groups[m].tabs[n] && updatedObj.windows[key].groups[m].tabs[n].id == gtabId){
                    delete updatedObj.windows[key].groups[m].tabs[n]
                  }
                  
              }
              }
              if(updatedObj.windows[key].groups[m] && updatedObj.windows[key].groups[m].tabs.every((e)=>!e)){
                delete updatedObj.windows[key].groups[m]
              }
              }
              if(e.target.parentNode.parentNode.children.length == 1){
                e.target.parentNode.parentNode.parentNode.remove()
              }else{
                e.target.parentNode.remove()
              }
              // console.log(e.target.parentNode.parentNode.children)
              // e.target.parentNode.style.display = "none"
             
             }
            }
         });
          a3.href = value.groups[p].tabs[q].url
          a3.innerText = value.groups[p].tabs[q].title
          li3.appendChild(a3);   
          li3.appendChild(i3);   

          ul3.appendChild(li3)
        }
        li2.appendChild(ul3)
        ul2.appendChild(li2)      
      }
      for(let p=0;p<value.tabs.length;p++){
        var li2 = document.createElement("li");
        var a3 = document.createElement("a"); 
        var i3 = document.createElement("i")
        i3.classList.add("fa","fa-close","cross")
        i3.setAttribute('id',String(value.tabs[p].id)+":cross"+x[uid].sessionName);
        //Deleting Tabs
        document.addEventListener('click',function(e){
          if(value.tabs[p]){
          if(e.target && e.target.id== String(value.tabs[p].id)+":cross"+x[uid].sessionName){
            console.log(e.target.parentNode)
            // e.target.parentNode.style.display = "none"
            const tId = e.target.id.split(":cross")[0]
            for(let m=0;m<updatedObj.windows[key].tabs.length;m++){
              if(updatedObj.windows[key].tabs[m] && updatedObj.windows[key].tabs[m].id == tId){
                delete updatedObj.windows[key].tabs[m]
              }
            }
            e.target.parentNode.remove()
           }
          }
       });
        a3.href = value.tabs[p].url
        a3.innerText = value.tabs[p].title
        li2.appendChild(a3);   
        li2.appendChild(i3);   

        ul2.appendChild(li2)
      }
      li1.append(ul2)
      ul.append(li1)
      // ul.appendChild(ul2)
      console.log(ul)
      var rightBottom = document.getElementById("rightBottom")
      rightBottom.parentNode.insertBefore(ul, rightBottom);
      
      console.log(key, value);
    } 
})
}

///Creating Session Div in FrontEnd
const createLeftSessionDiv = (createdAt,uid,title)=>{
  var today = new Date(createdAt);
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log(dateTime)
  var div = document.createElement("div")

  div.setAttribute('id',uid);
  div.setAttribute('class', 'sessionDiv');
  var h4 = document.createElement("h4")
  h4.innerText = title
  var p = document.createElement("p")
  p.innerText = dateTime
  var i = document.createElement("i")
  i.classList.add("fa","fa-trash","delete")
  i.setAttribute('id',String(uid)+"delete");
  div.appendChild(h4)
  div.appendChild(p)
  div.appendChild(i)

  const bottom = document.getElementById("bottom")
  bottom.parentNode.insertBefore(div, bottom);
}

///Deleting a Session
const deleteSession = (uid)=>{
    document.getElementById(String(uid)+"delete").addEventListener("click",function(e){
      console.log("Trash",this.parentNode)
      document.getElementById(this.parentNode.id).remove()
      e.stopPropagation ();
      array = array.filter((item) => Object.keys(item)[0]!== this.parentNode.id);
      
      console.log(this.parentNode.id + document.getElementById("rightUid").innerText)
      if(this.parentNode.id == document.getElementById("rightUid").innerText){
          document.getElementById("rightSessionName").innerText =  "Name of the Session Group"
          document.getElementById("rightTabs").innerText =  "No of tabs"
          document.getElementById("rightGroups").innerText =  "No of groups"
          document.getElementById("rightDate").innerText =  "Date/Time"
          document.getElementById("rightUid").innerText =  "565656565"
          if(document.getElementById("dropdown")){
            document.getElementById("dropdown").remove()
          }
      }
      chrome.runtime.sendMessage({type:"tabsist_session",action:"deleteSession",sessionId:uid}).then((res)=>{
        console.log(res)
      })
      console.log(array)
  })
}


//------------All Functions-End-----------------------------


///Updating a Session
document.getElementById("update").addEventListener("click",()=>{
  const tabs = []
  const groups = []
  for (const [key, value] of Object.entries(updatedObj.windows)){
    if(updatedObj.windows[key].groups.every((e)=>!e)){
      updatedObj.windows[key].groups = []
    }
    if(updatedObj.windows[key].tabs.every((e)=>!e)){
      updatedObj.windows[key].tabs = []
    }
    for(let m=0;m<updatedObj.windows[key].groups.length;m++)
    {
      if(updatedObj.windows[key].groups[m]){
      groups.push(updatedObj.windows[key].groups[m])
      for(let n=0;n<updatedObj.windows[key].groups[m].tabs.length;n++)
      {
        if(updatedObj.windows[key].groups[m].tabs[n]){
        tabs.push(updatedObj.windows[key].groups[m].tabs[n])
        }
      }
    }
    }
    for(let m=0;m<updatedObj.windows[key].tabs.length;m++)
    {
      if(updatedObj.windows[key].tabs[m]){
        tabs.push(updatedObj.windows[key].tabs[m])
      }
    }
  }
const newGroup = []  
for(let m=0;m<groups.length;m++){
  newGroup.push(groups[m].groupInfo)
}  
console.log(newGroup,tabs)
  const session = {
      "title":updatedObj.title,
      "session":{
        "tabs" : tabs,
        "groups": newGroup
      },
      "uid" : updatedObj.uid,
      "shareId": null,
      "sharer": null,
      "createdAt":updatedObj.createdAt
    }
    console.log(session)
  chrome.runtime.sendMessage({type:"tabsist_session",action:"update",session:session}).then((res)=>{
    console.log("updated",res)
    for(let k = 0;k<array.length;k++){
      for(const [key, value] of Object.entries(array[k])){
        if(key === res.uid){
          console.log(array[k])
          const Session = {
            "groups":res.session.groups,
            "tabs":res.session.tabs,
          }
          let retObj = createWindows(Session,res.updatedAt)
          console.log(retObj)
          value.groups = retObj.groups
          value.tabs = retObj.tabs
          value.windows = retObj.windows
          value.dateTime = retObj.dateTime

        }
      }

    }
    console.log(array)
  })
  console.log(updatedObj)

})


///Searching Sessions
document.getElementById("searchInput").addEventListener("keyup",()=>{
    console.log("In searchInput")
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName("sessionDiv");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h4")[0];
        txtValue = a.textContent || a.innerText;
        console.log()
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
})

///Deleting All Sessions
document.getElementById("deleteAll").addEventListener("click",function(){
  chrome.runtime.sendMessage({type:"tabsist_session",action:"deleteAllSessions"}).then((res)=>{
    console.log(res)
    array = []
    let ls = document.getElementById("first")
    while (ls.firstChild) {
      ls.removeChild(ls.firstChild);
    }
    document.getElementById("rightSessionName").innerText =  "Name of the Session Group"
    document.getElementById("rightTabs").innerText =  "No of tabs"
    document.getElementById("rightGroups").innerText =  "No of groups"
    document.getElementById("rightDate").innerText =  "Date/Time"
    document.getElementById("rightUid").innerText =  "565656565"
    if(document.getElementById("dropdown")){
      document.getElementById("dropdown").remove()
    }
    var d = document.createElement("div")
    d.setAttribute("id","bottom")
    ls.appendChild(d)

  })
})

//Opening for first time
chrome.runtime.sendMessage({type:"tabsist_session",action:"getAllSessions"}).then((res)=>{
  console.log(res)
  for (let k=0;k<res.length;k++){
    createLeftSessionDiv(res[k].createdAt,res[k].uid,res[k].title)
    var SESSION =  res[k].session
    let retObj = createWindows(SESSION,res[k].createdAt)
    var tabs = retObj.tabs
    var groups = retObj.groups 
    var windows = retObj.windows
    var dateTime = retObj.dateTime
    console.log(windows)

    const x = {}
    x[res[k].uid]={
    "title":res[k].title,
    "uid":res[k].uid,
    "createdAt": res[k].createdAt,
    "sessionName":res[k].title,  
    "tabs":tabs,
    "groups":groups,
    "windows":windows,
    "date":dateTime
    }
        
    array.push(x)
    deleteSession(res[k].uid)
    clickSession(res[k].uid,x)

  }
})

///Saving Session
document.getElementById("saveSession").addEventListener("click",function(){
    console.log(this.parentNode.firstElementChild.value)
    
    let title = this.parentNode.firstElementChild.value
    chrome.runtime.sendMessage({type:"tabsist_session",action:"add",title:title}).then((res)=>{
      console.log(res)
      for (let k=0;k<res.length;k++){
        createLeftSessionDiv(res[k].createdAt,res[k].uid,res[k].title)
        var SESSION =  res[k].session
        let retObj = createWindows(SESSION,res[k].createdAt)
        var tabs = retObj.tabs
        var groups = retObj.groups 
        var windows = retObj.windows
        var dateTime = retObj.dateTime
        console.log(windows)

        const x = {}
        x[res[k].uid]={
        "title":res[k].title,
        "uid":res[k].uid,
        "createdAt": res[k].createdAt,
        "sessionName":res[k].title,  
        "tabs":tabs,
        "groups":groups,
        "windows":windows,
        "date":dateTime
        }
            
        array.push(x)
        deleteSession(res[k].uid)
        clickSession(res[k].uid,x)

      }
    })
})


///Sorting Sessions
document.getElementById("sort").addEventListener("change",function(){
    console.log("sorted",this.value)
    const parent = document.getElementById('first');
    const comparator = (a, b) => +b.id.match( /\d+/ ) - +a.id.match( /\d+/ )
    if(this.value==="Oldest"){
        parent.replaceChildren(...Array.from(parent.children).sort(comparator));
    }
    else{
        const comparator1 = (a, b) => +a.id.match( /\d+/ ) - +b.id.match( /\d+/ )
        parent.replaceChildren(...Array.from(parent.children).sort(comparator1));
    }
})

// document.getElementById("dropdown").addEventListener("click",function(){
//   console.log(this)
//   document.getElementById("dropdown-content").style.display = "block"
// })

// const li = document.getElementsByTagName("ul")
// console.log(li)
// for(let i=0;i<li.length;i++){
//     li[i].addEventListener("click",function(){
//         this.style.diplay = "block"
//     })
// }
// document.getElementById("dropdown-toggle").addEventListener("mousedown",()=>{
//     const chevron = document.getElementById("dropdown-toggle")
//     if(chevron.classList.contains("fa-chevron-right")){
//         chevron.classList.remove("fa-chevron-right");
//         chevron.classList.add("fa-chevron-down");
//         document.getElementById("dropdown-content").style.display = "block"
//     }
//     else if(chevron.classList.contains("fa-chevron-down")){
//         chevron.classList.remove("fa-chevron-down");
//         chevron.classList.add("fa-chevron-right");
//         document.getElementById("dropdown-content").style.display = "none"
//     }
// })