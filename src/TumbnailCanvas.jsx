import React from 'react'
import ImageMover from './actionFields/ImageMover'
import drawTemplate from "./Values/drawCode";
import types from "./Values/types";
import actions from "./Values/actions";
import ChooseImage from "./actionFields/ChooseImage";
import ChangeValue from "./actionFields/ChangeValue";
import KeuzeMenu from "./actionFields/KeuzeMenu";
import textNL from "./Values/textNL";



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
        this.handleResize=this.handleResize.bind(this)

        this.changeItemsValue=this.changeItemsValue.bind(this)

        //this.uitleg={test:"Voeg een afbeelding toe door een bestand te kiezen of een afbeelding van het klembord toe te voegen.",moveImage:"Gebruik de knoppen om de afbeelding goed te zetten. Of sleep de afbeelding om hem te verplaatsen.",chooseText:"Voeg een titel toe.",dowload:"Als je tevreden bent met de Thumbnail klik op 'Download Thumbnail'."}

        this.state={
            template:"Standaard",
            steps:[{action:actions.CHOOSETEMPLATE}],
            step:0,
            fields:null,
            images:[],
            fileNameCode:"",
            drawCode:()=>{},
            canvasWidth:1,
            verhouding:"16:9"
        }

        this.mouseX=null;
        this.mouseY=null
        }
    }

    handleResize(event){
        this.setState({canvasWidth:window.innerWidth*0.6},(state)=> this.draw(this.state.images,this.state.drawCode,this.state.fields,this.state.canvasWidth))
    }

    componentDidMount() {
        this.chooseTemplate(this.state.template)
        window.addEventListener("resize", this.handleResize);
        this.handleResize()
    }

    componentWillUnmount() {
        window.addEventListener("resize", null);
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
        this.setState({template:name,steps:steps,fields:template.fields,images:images,drawCode:template.code,fileName:template.fileName,downloadWidth:template.downloadWidth,verhouding:template.verhouding})
    }

    createSteps(fields){
        var keys= Object.keys(fields)
        var steps=[]
        steps.push({action:actions.CHOOSETEMPLATE,text:textNL.kiesTemplate})
        keys.forEach(value => {
                var item=fields[value]
                var actionsWithKey=item.steps.map(value1 => {
                    value1.key=value
                    return value1
                })
                steps=steps.concat(actionsWithKey)
            }
        )
        steps.push({action:actions.DOWNLOAD,text:textNL.dowload})
        return steps
    }

    getStep(){
        if(this.state.steps[this.state.step]===undefined){
            return undefined
        }
        return(this.state.steps[this.state.step])
    }

    getStepAction(){
        return this.getStep().action
     }

    getStepText(){
         return this.getStep().text
     }

    getCurrentStep(){
         return this.state.steps[this.state.step]
     }

    getCurrentField(){
        return this.state.fields[this.getCurrentStep().key]
    }

    getTemplateOptions(){
        var keuzes= new drawTemplate()
       keuzes=Object.keys(keuzes)
        return keuzes
    }

    getCurrentFieldValue(){
        return this.state.fields[this.getCurrentStep().key].value
    }


    getVerhoudingObject(){

        var splitText=this.state.verhouding.split(":")
        var numbers=splitText.map(value=>parseInt(value))
        return {width:numbers[0],height:numbers[1]}
    }



    handleInputChange(event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;

        this.setState({
            [name]: value
        })

    }

    draw(images,code,fields,width){
        if(this.inputRef.current!==null){
            var ctx = this.inputRef.current.getContext('2d')
            this.executeAfterLoading(images.slice(),()=> code(ctx, images, fields,width) )
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
                this.changeItemsValue((item)=>{
                    var info=item.info
                    info.x-=(this.mouseX-event.clientX)/(this.state.canvasWidth/1920)
                    info.y-=(this.mouseY-event.clientY)/(this.state.canvasWidth/1920)
                    return item
                })


            }
            this.mouseX=event.clientX
            this.mouseY=event.clientY
        }else{
            this.mouseX=null
            this.mouseY=null
        }
    }

    dowloaden(canvas){
        this.setState({canvasWidth:this.state.downloadWidth},()=>{
            this.draw(this.state.images,this.state.drawCode,this.state.fields,this.state.downloadWidth)
            canvas.toBlob(blob => {
                var url=URL.createObjectURL(blob)
                var name=this.state.fileName(this.state.fields)
                if(window.navigator.msSaveBlob){
                    window.navigator.msSaveBlob(this.inputRef.current.msToBlob(),name)
                }else {
                    var link = document.createElement('a')
                    document.body.appendChild(link)
                    link.href = url
                    link.download = name
                    link.click()
                    document.body.removeChild(link)}
                }
            )
        })
    }

    browserGeschikt(){
        if (/*@cc_on!@*/false || !!document.documentMode) // If Internet Explorer, return version number
        {
            return false
        }
        else  // If another browser, return 0
        {
        }
        return true
    }

    changeItemsValue(functie){
        var currentStepIndex=this.getCurrentStep().key
        var field=this.getCurrentField()
        var res=functie(field.value)
        this.setState(oldState=>{
            var fields=oldState.fields
            fields[currentStepIndex].value=res
            return({fields:fields})
        })
    }


    render() {
        return(
            <div className="ThumbnailPage" >
                {this.browserGeschikt()?<div>
                <header>
                    <p className="uitleg">{this.getStepText()}</p>

                        {this.getStepAction()===actions.CHOOSETEMPLATE && <KeuzeMenu options={this.getTemplateOptions()} currentChoise={this.state.template} itemChange={(functie)=>{this.chooseTemplate(functie(""))}}/>}
                        {this.getStepAction()===actions.CHOOSEIMAGE && <ChooseImage itemChange={this.changeItemsValue} currentImage={this.getCurrentFieldValue()}  />}
                        {this.getStepAction()===actions.MOVEIMAGE && <ImageMover itemChange={this.changeItemsValue} />}
                        {this.getStepAction()===actions.CHOOSETEXT &&<ChangeValue itemChange={this.changeItemsValue} type="text" currentTitle={this.getCurrentFieldValue()} />}
                        {this.getStepAction()===actions.CHOOSENUMBER &&<ChangeValue itemChange={this.changeItemsValue} type="number" currentTitle={this.getCurrentFieldValue()} />}
                        {this.getStepAction()===actions.CHOOSEDATE &&<ChangeValue itemChange={this.changeItemsValue} type="date" currentTitle={this.getCurrentFieldValue()} />}
                        {this.getStepAction()===actions.CHOOSEMENU && <KeuzeMenu options={this.getCurrentField().options} currentChoise={this.getCurrentFieldValue()} itemChange={this.changeItemsValue}/>}

                    <div className="editFields">

                        {this.getStepAction()===actions.DOWNLOAD && <button onClick={()=>this.dowloaden(this.inputRef.current)} className="downloadButton" ><i className="material-icons">get_app</i> Download Thumbnail</button>}

                    </div>
                    <div className="stepButtons">

                        {this.state.step!==0 && <button   onClick={()=>this.setState(oldState=>{return({step:oldState.step-1})})} >Stap Terug</button>}
                        {this.getStepAction()!==actions.DOWNLOAD &&< button  onClick={()=>this.setState(oldState=>{return({step:oldState.step+1})})} >Volgende Stap</button>}
                        {this.getStepAction()===actions.DOWNLOAD && <button onClick={()=>{this.setState(oldState=>{return({step:0})});this.chooseTemplate(this.state.template)}} >Opnieuw</button>}

                    </div>
                </header>

                <canvas  style={{border: '2px solid black',cursor:this.getStepAction()===actions.MOVEIMAGE && "move"}} width={this.state.canvasWidth} height={(this.state.canvasWidth*this.getVerhoudingObject().height)/this.getVerhoudingObject().width} onMouseMove={this.mouseMoveEvent} ref={this.inputRef}></canvas>
                {this.draw(this.state.images,this.state.drawCode,this.state.fields,this.state.canvasWidth)}
                </div>:<p>Helaas je internetprogramma is niet geschikt voor deze website, probeer Google Chrome,Safari of Firefox bijvoorbeeld.</p>}
            </div>

        )
    }
}

export default TumbnailCanvas