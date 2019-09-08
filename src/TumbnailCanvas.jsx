import React from 'react'
import ImageMover from './ImageMover'
import drawTemplate from "./drawCode";
import types from "./types";
import actions from "./actions";
import ChooseImage from "./ChooseImage";
import ChooseTitle from "./ChooseTitle";
import KeuzeMenu from "./KeuzeMenu";


class TumbnailCanvas extends React.Component{

    constructor(){
        super()
        if(this.browserGeschikt()){
        this.inputRef = React.createRef();

        this.chooseTemplate = this.chooseTemplate.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.draw=this.draw.bind(this)
        this.scrollHandler=this.scrollHandler.bind(this)
        this.mouseMoveEvent=this.mouseMoveEvent.bind(this)
        this.dowloaden=this.dowloaden.bind(this)
        this.getStepAction=this.getStepAction.bind(this)
        this.executeAfterLoading=this.executeAfterLoading.bind(this)

        this.changeInfo=this.changeInfo.bind(this)
        this.changeImage=this.changeImage.bind(this)
        this.changeTitle=this.changeTitle.bind(this)

        //this.uitleg={test:"Voeg een afbeelding toe door een bestand te kiezen of een afbeelding van het klembord toe te voegen.",moveImage:"Gebruik de knoppen om de afbeelding goed te zetten. Of sleep de afbeelding om hem te verplaatsen.",chooseText:"Voeg een titel toe.",dowload:"Als je tevreden bent met de Thumbnail klik op 'Download Thumbnail'."}

        this.state={
            template:"Standaard",
            steps:[{action:actions.CHOOSETEMPLATE}],
            step:0,
            fields:null,
            images:[],
            drawCode:()=>{}
        }



        this.mouseX=null;
        this.mouseY=null
        }
    }

    componentDidMount() {
        this.chooseTemplate(this.state.template)
    }

    chooseTemplate(name){
        var template=new drawTemplate()
        template=template[name]
        var images=template.images.map((value => {
            var imageObject =new Image()
            imageObject.src=value
            return (imageObject)
        }))

        var steps=this.createSteps(template.fields)
        var formatedFields=this.formatFields(template.fields)
        this.setState({template:name,steps:steps,fields:formatedFields,images:images,drawCode:template.code})
    }

    getStepAction(){
        if(this.state.steps[this.state.step]===undefined){
            return undefined
        }
        return(this.state.steps[this.state.step].action)
     }

    getCurrentStep(){
         return this.state.steps[this.state.step]
     }

    getCurrentField(){
        return this.state.fields[this.getCurrentStep().key]
    }

    createSteps(fields){
        var keys= Object.keys(fields)
        var steps=[]
        steps.push({action:actions.CHOOSETEMPLATE})
        keys.forEach(value => {
                var item=fields[value]
                if(item===types.IMAGE){
                    steps.push({action:actions.CHOOSEIMAGE,key:value})
                    steps.push({action:actions.MOVEIMAGE,key:value})
                }else if(item===types.TEXT){
                    steps.push({action:actions.CHOOSETEXT,key:value})
                }else{
                    throw new Error("Type  doesn't exist")
                }
            }
        )
        steps.push({action:actions.DOWNLOAD})
        return steps
    }

    formatFields(fields){
        var keys= Object.keys(fields)
        keys.forEach(value => {
                var item=fields[value]
                if(item===types.IMAGE){
                    fields[value]={info:{x:0,y:0,width:0,height:0},object:null}
                }else if(item===types.TEXT){
                    fields[value]="Verander deze Tekst"
                }else{
                    throw new Error("Type doesn't exist")
                }
            }
        )
        return fields
    }



    handleInputChange(event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;

        this.setState({
            [name]: value
        })

    }



    draw(images,code,fields){
        if(this.inputRef.current!==null){
            var ctx = this.inputRef.current.getContext('2d')
            this.executeAfterLoading(images.slice(),()=> code(ctx, images, fields) )
        }
    }

    executeAfterLoading(images,func){{
        if(images.length!==0){
            var image= images.pop()
            var afterLoaded= ()=>this.executeAfterLoading(images,func)
            if (!image.complete){
                image.addEventListener('load',() => afterLoaded())
            }else{
                afterLoaded()
            }
        }else{
            func()
        }
    }}

    scrollHandler(event){
        var extra=1.01
        if(event.deltaY<0){
            extra=0.99
        }
        this.imageInfo.width *=extra
        this.imageInfo.height*=extra
        this.draw()
    }

    mouseMoveEvent(event){

        if(event.buttons===1&&this.getStepAction()===actions.MOVEIMAGE){
            if(this.mouseX!==null){
                this.changeInfo((info)=>{
                    info.x-=this.mouseX-event.clientX
                    info.y-=this.mouseY-event.clientY
                    return info
                })


            }
            this.mouseX=event.clientX
            this.mouseY=event.clientY
        }else{
            this.mouseX=null
            this.mouseY=null
        }
    }

    dowloaden(){
        if(window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(this.inputRef.current.msToBlob(),`Banner '${this.state.title}'.png`)
        }else {
            var canvas = this.inputRef.current
            var link = document.createElement('a')
            document.body.appendChild(link)
            link.href = canvas.toDataURL()
            link.download = `Banner '${this.state.title}'.png`
            link.click()
            document.body.removeChild(link)
        }
    }

    browserGeschikt(){
        if (/*@cc_on!@*/false || !!document.documentMode) // If Internet Explorer, return version number
        {
            return false
        }
        else  // If another browser, return 0
        {
            console.log(window.navigator.userAgent);
        }
        return true
    }

    changeInfo(functie){
        var currentStepIndex=this.getCurrentStep().key
        var info=this.state.fields[currentStepIndex].info
        var res=functie(info)
        this.setState(oldState=>{
            var fields=oldState.fields
            fields[currentStepIndex].info=res
            return({fields:fields})
        })
    }

    changeTitle(text){
        var currentStepIndex=this.getCurrentStep().key
        this.setState(oldState=>{
            var fields=oldState.fields
            fields[currentStepIndex]=text
            return({fields:fields})
        })
    }

    changeImage(image){
        var currentStepIndex=this.getCurrentStep().key
        this.setState(oldState=>{
            var fields=oldState.fields
            fields[currentStepIndex].object=image
            return({fields:fields})
        })
    }

    render() {
        return(
            <div className="ThumbnailPage">
                {this.browserGeschikt()?<div>
                <header>
                    <p className="uitleg">{this.getStepAction().text}</p>
                    {this.getStepAction()===actions.CHOOSETEMPLATE && <KeuzeMenu template={this.state.template} keuzeChange={this.chooseTemplate}/>}
                    {this.getStepAction()===actions.CHOOSEIMAGE && <ChooseImage currentImage={this.getCurrentField()} infoChange={this.changeInfo} imageChange={this.changeImage}/>}
                    {this.getStepAction()===actions.MOVEIMAGE && <ImageMover infoChange={this.changeInfo} />}
                    {this.getStepAction()===actions.CHOOSETEXT &&<ChooseTitle currentTitle={this.getCurrentField()} titleChange={this.changeTitle}/>}
                    <div className="editFields">
                        {this.getStepAction()===actions.DOWNLOAD && <button onClick={this.dowloaden} className="downloadButton" ><i className="material-icons">get_app</i> Download Thumbnail</button>}
                    </div>
                    <div className="stepButtons">
                        {this.state.step!==0 && <button   onClick={()=>this.setState(oldState=>{return({step:oldState.step-1})})} >Stap Terug</button>}
                        {this.getStepAction()!==actions.DOWNLOAD &&< button  onClick={()=>this.setState(oldState=>{return({step:oldState.step+1})})} >Volgende Stap</button>}
                        {this.getStepAction()===actions.DOWNLOAD && <button onClick={()=>{this.setState(oldState=>{return({step:0})});this.chooseTemplate(this.state.template)}} >Opnieuw</button>}
                    </div>

                </header>
                <canvas  style={{border: '2px solid black',cursor:this.getStepAction()===actions.MOVEIMAGE && "move"}} width="1280" height="720px" onMouseMove={this.mouseMoveEvent} ref={this.inputRef}></canvas>
                    {this.draw(this.state.images,this.state.drawCode,this.state.fields)}
                </div>:<p>Helaas je internetprogramma is niet geschikt voor deze website, probeer Google Chrome,Safari of Firefox bijvoorbeeld.</p>}
            </div>

        )
    }
}

export default TumbnailCanvas