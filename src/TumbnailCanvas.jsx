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
        this.handleResize=this.handleResize.bind(this)

        this.changeItem=this.changeItem.bind(this)

        //this.uitleg={test:"Voeg een afbeelding toe door een bestand te kiezen of een afbeelding van het klembord toe te voegen.",moveImage:"Gebruik de knoppen om de afbeelding goed te zetten. Of sleep de afbeelding om hem te verplaatsen.",chooseText:"Voeg een titel toe.",dowload:"Als je tevreden bent met de Thumbnail klik op 'Download Thumbnail'."}

        this.state={
            template:"Standaard",
            steps:[{action:actions.CHOOSETEMPLATE}],
            step:0,
            fields:null,
            images:[],
            fileNameCode:"",
            drawCode:()=>{},
            scale:1
        }



        this.mouseX=null;
        this.mouseY=null
        }
    }

    handleResize(event){
        this.setState({scale:(window.innerWidth*0.6)/1920},(state)=> this.draw(this.state.images,this.state.drawCode,this.state.fields,1920*this.state.scale))
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
        var formatedFields=this.formatFields(template.fields)
        this.setState({template:name,steps:steps,fields:formatedFields,images:images,drawCode:template.code,fileName:template.fileName})
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
                var actionsWithKey=item.actions.map(value1 => {
                    value1.key=value
                    return value1
                })
                steps=steps.concat(actionsWithKey)

            }
        )
        steps.push({action:actions.DOWNLOAD})
        return steps
    }


    formatFields(fields){
        var keys= Object.keys(fields)
        keys.forEach(value => {
                fields[value]=fields[value].value
            })
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
                this.changeItem((item)=>{
                    var info=item.info
                    info.x-=(this.mouseX-event.clientX)/this.state.scale
                    info.y-=(this.mouseY-event.clientY)/this.state.scale
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
        var scale=this.scale
        this.setState({scale:1},()=>{
            this.draw(this.state.images,this.state.drawCode,this.state.fields,1920)
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
            console.log(window.navigator.userAgent);
        }
        return true
    }

    changeItem(functie){
        var currentStepIndex=this.getCurrentStep().key
        var field=this.getCurrentField()
        var res=functie(field)
        this.setState(oldState=>{
            var fields=oldState.fields
            fields[currentStepIndex]=res
            return({fields:fields})
        })
    }




    render() {
        return(
            <div className="ThumbnailPage" onresize={(event)=>console.log(event)}>
                {this.browserGeschikt()?<div>
                <header>
                    <p className="uitleg">{this.getStepAction().text}</p>
                    {this.getStepAction()===actions.CHOOSETEMPLATE && <KeuzeMenu template={this.state.template} keuzeChange={this.chooseTemplate}/>}
                    {this.getStepAction()===actions.CHOOSEIMAGE && <ChooseImage itemChange={this.changeItem} currentImage={this.getCurrentField()}  />}
                    {this.getStepAction()===actions.MOVEIMAGE && <ImageMover itemChange={this.changeItem} />}
                    {this.getStepAction()===actions.CHOOSETEXT &&<ChooseTitle itemChange={this.changeItem} type="text" currentTitle={this.getCurrentField()} />}
                    {this.getStepAction()===actions.CHOOSENUMBER &&<ChooseTitle itemChange={this.changeItem} type="number" currentTitle={this.getCurrentField()} />}
                    {this.getStepAction()===actions.CHOOSEDATE &&<ChooseTitle itemChange={this.changeItem} type="date" currentTitle={this.getCurrentField()} />}
                    <div className="editFields">
                        {this.getStepAction()===actions.DOWNLOAD && <button onClick={()=>this.dowloaden(this.inputRef.current)} className="downloadButton" ><i className="material-icons">get_app</i> Download Thumbnail</button>}
                    </div>
                    <div className="stepButtons">
                        {this.state.step!==0 && <button   onClick={()=>this.setState(oldState=>{return({step:oldState.step-1})})} >Stap Terug</button>}
                        {this.getStepAction()!==actions.DOWNLOAD &&< button  onClick={()=>this.setState(oldState=>{return({step:oldState.step+1})})} >Volgende Stap</button>}
                        {this.getStepAction()===actions.DOWNLOAD && <button onClick={()=>{this.setState(oldState=>{return({step:0})});this.chooseTemplate(this.state.template)}} >Opnieuw</button>}
                    </div>

                </header>
                <canvas  style={{border: '2px solid black',cursor:this.getStepAction()===actions.MOVEIMAGE && "move"}} width={1920*this.state.scale} height={1080*this.state.scale} onMouseMove={this.mouseMoveEvent} ref={this.inputRef}></canvas>
                {this.draw(this.state.images,this.state.drawCode,this.state.fields,1920*this.state.scale)}
                </div>:<p>Helaas je internetprogramma is niet geschikt voor deze website, probeer Google Chrome,Safari of Firefox bijvoorbeeld.</p>}
            </div>

        )
    }
}

export default TumbnailCanvas