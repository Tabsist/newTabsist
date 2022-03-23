

// var array=[]
// // var sessionDiv = document.getElementsByClassName('sessionDiv');
// // var trashCan = document.getElementsByClassName('delete');
// var trashCan

// document.getElementById("searchInput").addEventListener("keyup",()=>{
//     console.log("In searchInput")
//     input = document.getElementById("searchInput");
//     filter = input.value.toUpperCase();
//     li = document.getElementsByClassName("sessionDiv");
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("h4")[0];
//         txtValue = a.textContent || a.innerText;
//         console.log()
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// })


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


// document.getElementById("saveSession").addEventListener("click",()=>{
    
//     const input = document.getElementById("sessionInput").value
//     console.log(document.getElementById("sessionInput").value)
//     var today = new Date();
//     var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var dateTime = date+' '+time;
//     console.log(dateTime)
//     const currentTimeInSeconds=Math.floor(Date.now()/1000); 
//     var div = document.createElement("div")

//     div.setAttribute('id',currentTimeInSeconds);
//     div.setAttribute('class', 'sessionDiv');
//     var h4 = document.createElement("h4")
//     h4.innerText = input
//     var p = document.createElement("p")
//     p.innerText = dateTime
//     var i = document.createElement("i")
//     i.classList.add("fa","fa-trash","delete")
//     i.setAttribute('id',String(currentTimeInSeconds)+"delete");
//     div.appendChild(h4)
//     div.appendChild(p)
//     div.appendChild(i)

//     const bottom = document.getElementById("bottom")
//     bottom.parentNode.insertBefore(div, bottom);
//     const x = {}
//     x[currentTimeInSeconds]={
//     "sessionName":input,  
//     "tabs":["tab1","tab2"],
//     "date":dateTime
//     }
        
//     array.push(x)
//     document.getElementById(currentTimeInSeconds).addEventListener("click",()=>{
//         console.log("Clicked index: " + x[currentTimeInSeconds].sessionName);
//         document.getElementById("rightSessionName").innerText =  x[currentTimeInSeconds].sessionName
//         document.getElementById("rightTabs").innerText =  String(x[currentTimeInSeconds].tabs.length) + " tabs"
//         document.getElementById("rightDate").innerText =  x[currentTimeInSeconds].date
//         document.getElementById("rightUid").innerText =  currentTimeInSeconds
//         document.getElementById("dropdown-content").remove()
//         var ul = document.createElement("ul")
//         ul.setAttribute('id',"dropdown-content");
//         ul.setAttribute('class', "dropdown-content");
//         for(let j = 0; j < x[currentTimeInSeconds].tabs.length; j++)    {
//             var li = document.createElement("li");                
//             var textnode = document.createTextNode(x[currentTimeInSeconds].tabs[j]);  
//             var a = document.createElement("a"); 
//             var i = document.createElement("i")
//             i.classList.add("fa","fa-close","cross")
//             i.setAttribute('id',String(currentTimeInSeconds)+":cross"+String(j));
//             a.href = "https://www.google.com/"
//             a.appendChild(textnode) 
//             li.appendChild(a);   
//             li.appendChild(i);                           
//             // document.getElementById("dropdown-content").appendChild(node);
//             ul.appendChild(li);
//         }
//         const rightBottom = document.getElementById("rightBottom")
//         rightBottom.parentNode.insertBefore(ul, rightBottom);
//         var liList = document.getElementsByTagName('li');
//         for(let j=0;j<liList.length;j++){
//             var liId = document.getElementsByTagName("li")[j].lastElementChild.id
//             document.getElementById(liId).addEventListener("click",function(e){
//                 console.log("Cross",this.parentNode)
//                 e.stopPropagation();
//                 console.log(liId.split(":")[0])
//                 for(let k=0;k<array.length;k++){
//                     if(Object.keys(array[k])[0]===liId.split(":")[0]){
//                         console.log("ITEM",array[k])
//                         var tabName = document.getElementsByTagName("li")[j].innerText
//                         array[k][liId.split(":")[0]].tabs = array[k][liId.split(":")[0]].tabs.filter((item)=>item !== tabName)
//                         break 
//                     }
//                 }
//                 this.parentNode.remove()
//             })
//         }


//     })



//     document.getElementById(String(currentTimeInSeconds)+"delete").addEventListener("click",function(e){
//         console.log("Trash",this.parentNode)
//         document.getElementById(this.parentNode.id).remove()
//         e.stopPropagation ();
//         array = array.filter((item) => Object.keys(item)[0]!== this.parentNode.id);
        
//         console.log(this.parentNode.id + document.getElementById("rightUid").innerText)
//         if(this.parentNode.id == document.getElementById("rightUid").innerText){
//             document.getElementById("rightSessionName").innerText =  "Name of the Session Group"
//             document.getElementById("rightTabs").innerText =  "No of tabs"
//             document.getElementById("rightDate").innerText =  "Date/Time"
//             document.getElementById("rightUid").innerText =  "565656565"
//             document.getElementById("dropdown-content").remove()
//         }
//         console.log(array)
//     })
//     // trashCan = document.getElementsByClassName('delete');
//     // console.log(trashCan)
//     // for(let i = 0; i < trashCan.length; i++) {
//     //     trashCan[i].addEventListener("click", function() {
//     //         console.log("HI trash",this.parentNode)
//     //         document.getElementById(this.parentNode.id).remove()
//     //     })
//     // }
//     // sessionDiv = document.getElementsByClassName('sessionDiv');
//     // for(let i = 0; i < sessionDiv.length; i++) {
//     //     sessionDiv[i].addEventListener("click", function() {
//     //     console.log("Clicked index: " + this.id);
//     //     const val = this.id
//     //     console.log("Before array",array)
//     //     document.getElementById("rightSessionName").innerText =  x[val].sessionName
//     //     document.getElementById("rightTabs").innerText =  String(x[val].tabs.length) + " tabs"
//     //     document.getElementById("rightDate").innerText =  x[val].date
//     //     for(let j = 0; j < x[val].tabs.length; j++)    {
//     //         var node = document.createElement("li");                
//     //         var textnode = document.createTextNode(x[val].tabs[j]);         
//     //         node.appendChild(textnode);                              
//     //         document.getElementById("dropdown-content").appendChild(node);
//     //     }
        
//     //   })
//     // }
//     console.log("Array",array)
// })

// document.getElementById("sort").addEventListener("change",function(){
//     console.log("sorted",this.value)
//     const parent = document.getElementById('first');
//     const comparator = (a, b) => +b.id.match( /\d+/ ) - +a.id.match( /\d+/ )
//     if(this.value==="Oldest"){
//         parent.replaceChildren(...Array.from(parent.children).sort(comparator));
//     }
//     else{
//         const comparator1 = (a, b) => +a.id.match( /\d+/ ) - +b.id.match( /\d+/ )
//         parent.replaceChildren(...Array.from(parent.children).sort(comparator1));
//     }
// })