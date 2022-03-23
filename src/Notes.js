/*global chrome*/
// import { color } from 'html2canvas/dist/types/css/types/color';
import React,{useState,useEffect} from 'react'
// import Draggable from 'react-draggable'
// import { Resizable, ResizableBox } from 'react-resizable';
// import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
// import { faBeer } from '@fortawesome/free-solid-svg-icons'
// import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FaArrowAltCircleRight } from "react-icons/fa";
// import { Resizable, ResizableBox } from 'react-resizable';
// import DragResizeContainer from 'react-drag-resize';
// import GridLayout from 'react-grid-layout';
// import {Rnd} from 'react-rnd';
// import jqueryui from 'jquery-ui';
import $ from "jquery";
import "jquery-ui-dist/jquery-ui"
// import 'jquery-ui-bundle';
// import 'jquery-ui-bundle/jquery-ui.css';

  
const notesDiv ={
    position:"fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid yellow",
    borderRadius: "2px",
    zIndex:"99999",
    fontFamily:"NONE",
    fontSize:"medium", 
    backgroundColor:"lightseagreen",
    top: "0px",
    left: "0px"
}

const notesHeader={
    display: "flex",
    flexDirection: "row",
    backgroundColor: "yellow",
    height: "22px",
    width:"100%"
    // width: "244px",
    
}

const checkBox={
    display: "flex",
    flex:"1",
    alignSelf: "center"
}

const Label={
    display: "flex",
    flex: "10",
    alignSelf: "center",
    justifyContent: "center"
}

const I ={
    display:"flex",
    flex: "1",
    alignSelf: "center",
    cursor: "pointer",
    
    
}

const Hover ={
    display:"flex",
    flex: "1",
    alignSelf: "center",
    cursor: "pointer",
    color:"green"
    
}



const TextArea={
    border: "none",
    backgroundColor: "lightgoldenrodyellow",
    outline: "none",
    minWidth: "240px"
}

const pTag =  {
    position: "fixed",
    transform: "rotate3d(1, 1, 12, 269deg)",
    fontSize: "20px",
    padding: "10px 5px",
    backgroundColor: "yellowgreen",
    left: "96.3%",
    borderRadius: "10px",
    cursor: "pointer",
    top:"7%",
    zIndex:"99999"
    // display: "none"

}


const Notes = () => {

    const h= document.getElementById("insertion-point").firstChild.shadowRoot
    const [displayNotes, setdisplayNotes] = useState(false)
    const [positions, setpositions] = useState({x:0,y:0,w:0,h:0})
    useEffect(()=>{
        const url = (window.location.href).split('#')[0]

        chrome.storage.sync.get('notes', (notesObject) => {

            if(notesObject.notes && displayNotes){
                    if(notesObject.notes[url]){
                        const notesCheck = h.getElementById("notesCheck")
                        notesCheck.checked = true
                        console.log("notes content is ",notesObject.notes[url])
                        h.getElementById("notesText").value = notesObject.notes[url].value
                }
            }
    
        
        });
    },[])

    function saveNoteFromContextMenu(noteText){
        console.log("here in save")
        const url = (window.location.href).split('#')[0]
        chrome.storage.sync.get('notes', (notesObject) => {
            if(notesObject.notes){
                //notes = JSON.parse(notes_list);
            }
            else{
                notesObject.notes = {}
            }
            if(notesObject.notes[url]){
                notesObject.notes[url] = {"value":notesObject.notes[url].value+noteText}
            }
            else{
                notesObject.notes[url] = {"value":noteText}

            }
            
            
            //const newNotes = JSON.stringify(notes);
            //console.log("final",notes)
            chrome.storage.sync.set(notesObject, function () {
                console.log('Saved');
                
                chrome.storage.sync.get('notes', (notesObject) => {
                    h.getElementById("notesText").value = notesObject.notes[url].value
                    console.log(notesObject)
                })
            });
    
    
        });
    
    
    }
    chrome.runtime.onMessage.addListener(msgObj => {
    console.log("In ContentScript",msgObj)

    if(msgObj.type === "nts" && msgObj.noteText){
        setdisplayNotes(true)
        saveNoteFromContextMenu(msgObj.noteText) 

  }
  });
    // function setNotes(key,obj){
    //     const currentNotes = getNotes('notes')
    //     currentNotes[key] = obj
    //     const newNotes = JSON.stringify(currentNotes);
    //     chrome.storage.sync.set('notes',newNotes);
    // }

    // function getNotes(key){

    //     let notes

    //     chrome.storage.sync.get(key, (data) => {
    //         if(data){
    //             alert("ddd",data)
    //             console.log("s",data)
    //             notes = JSON.parse(data);
    //         }
    //         else{
    //             notes = {}
    //         }


    //         return notes
    //         // console.log("Notes",data)
    //         // h.getElementById("notesText").value = data
    //     });
        

    // }


    useEffect(() => {


        // const h1= document.getElementById("insertion-point").firstChild.shadowRoot
        const e = h.getElementById("notesDiv")
        console.log(positions)
        const textArea = h.getElementById("notesText")
        if(positions.x!==0 && positions.y!==0 || positions.w!==0 && positions.h!==0){
            $(e).css({'top' : positions.x + 'px'});
            $(e).css({'left' : positions.y + 'px'});
            $(textArea).height(positions.h);
            $(textArea).width(positions.w);
        }
        var splits = (window.location.href).split('#')[0]
        console.log("Splits",splits)
        // chrome.storage.sync.get('notes'+splits, (data) => {
        //     console.log("Notes",data)
        //   });

        // $( e ).datepicker();
        
        if(e!=null){
            console.log("Not Null")
            $( e ).resizable({
                stop: function( event, ui ) {
                    alert('resized');
                    console.log("ResizeEvent",event)
                    var width = $(textArea).width()
                    var height = $(textArea).height()
                    const z = {...positions,w:width,h:height}
                    setpositions(z)

                }});
            $( e ).draggable( {
                containment: "window" ,
                stop: function( event, ui ) {

                    var top = $( e ).position().top;
                    var left = $( e ).position().left;
                    var width = $(textArea).width()
                    var height = $(textArea).height()
                    console.log(event)
                    console.log(event.pageX)
                    console.log(event.pageY)
                    console.log("Top",top)
                    console.log("Left",left)
                    $(e).css({'top' : top + 'px'});
                    $(e).css({'left' : left + 'px'});
                    console.log("Width",width)
                    console.log("Height",height)
                    setpositions({x:top,y:left,w:width,h:height})  

                // }
                }});
            
        }
    }, [displayNotes])




    function openNotes(){
        setdisplayNotes(true)
        const url = (window.location.href).split('#')[0]
        chrome.storage.sync.get('notes', (notesObject) => {
            if(notesObject.notes){
                if(notesObject.notes[url]){
                    const notesCheck = h.getElementById("notesCheck")
                    notesCheck.checked = true
                    console.log("notes content on open",notesObject.notes[url])
                    h.getElementById("notesText").value = notesObject.notes[url].value
                }
            }

        });

    }


    function handleChange(){
        
        const notesCheck = h.getElementById("notesCheck")
        // if(notesCheck){
        //     console.log("hh")
        // }
	    notesCheck.checked = false
    }


    function saveNote(){
        const notesCheck = h.getElementById("notesCheck")
        if(notesCheck.checked){
            const url = (window.location.href).split('#')[0]

            const data = h.getElementById('notesText').value;  
            chrome.storage.sync.get('notes', (notesObject) => {
                if(notesObject.notes){
                    //notes = JSON.parse(notes_list);
                }
                else{
                    notesObject.notes = {}
                }
                notesObject.notes[url] = {"value":data}
                
                //const newNotes = JSON.stringify(notes);
                //console.log("final",notes)
                chrome.storage.sync.set(notesObject, function () {
                    console.log('Saved');
                    chrome.storage.sync.get('notes', (notesObject) => {
                        console.log(notesObject)
                    })
                });

    
            });
            //setNotes(splits,data) 
        }
    }

    const setPosAndNotes = ()=>{
        // const h1= document.getElementById("insertion-point").firstChild.shadowRoot
        const e = h.getElementById("notesDiv")
        // console.log(positions)
        const textArea = h.getElementById("notesText")
        var top = $( e ).position().top;
        var left = $( e ).position().left;
        var width = $(textArea).width();
        var height = $(textArea).height();
        setpositions({x:top,y:left,w:width,h:height})  
        setdisplayNotes(false)
    }
    function openNotes(){
        setdisplayNotes(true)
        const url = (window.location.href).split('#')[0]
        chrome.storage.sync.get('notes', (notesObject) => {
            if(notesObject.notes){
                if(notesObject.notes[url]){
                    const notesCheck = h.getElementById("notesCheck")
                    notesCheck.checked = true
                    console.log("notes content on open",notesObject.notes[url])
                    h.getElementById("notesText").value = notesObject.notes[url].value
                }
            }

        });

    }
    // $( function() {
    //     $( "#resizable" ).resizable();
    //   } );
    // setInterval(() => {
    //     const notesDiv = h.getElementById("notesDiv")
    //     if(notesDiv!=null){

    //         notesDiv.resizable()
    //     }
    // }, 9000);

    return (
        <>
         {/* <p>Date: <input type="text" id="datepicker"/></p> */}
            {displayNotes?

            // <ResizableBox width={200} height={200}  minConstraints={[100, 100]} maxConstraints={[300, 300]}>
            // <ResizableBox width={200} height={200}  minConstraints={[100, 100]} maxConstraints={[300, 300]}>
                // <Draggable defaultPosition=
                // {positions}
                // onStop={handleStop}>
                
                    <div id="notesDiv" style={notesDiv} >
                    <div id="notesHeader" style={notesHeader} >

                        <input type="checkbox" id="notesCheck" style={checkBox} onChange={saveNote} />
                        <label for="paragraph_text" style={Label}>Notes</label>
                        <FaArrowAltCircleRight style={I} onClick={setPosAndNotes}/>

                    </div>
                    {/* <h3 id="notesHeader" style={notesHeader}><input type="checkbox" id="notesCheck" style={checkBox} onChange={saveNote} checked />Notes<FaArrowAltCircleRight style={I} onClick={()=>setdisplayNotes(false)}/></h3> */}
                        
                    <textarea name="paragraph_text" id="notesText" cols="30" rows="10" style={TextArea} onChange={handleChange}></textarea>
                    </div>
                
                //  </Draggable>
                
                // </ResizableBox>
               : 

               <p id="pTag" style={pTag} onClick={openNotes}>NOTES</p>

            
        
            }
        </>
    );
}

export default Notes

