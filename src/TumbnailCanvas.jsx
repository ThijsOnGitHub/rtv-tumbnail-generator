import React from 'react'


class TumbnailCanvas extends React.Component{

    constructor(){
        super()
        if(this.browserGeschikt()){
        this.mouseDown=[]
        this.inputRef = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.imagePaste=this.imagePaste.bind(this)
        this.draw=this.draw.bind(this)
        this.scrollHandler=this.scrollHandler.bind(this)
        this.mouseMoveEvent=this.mouseMoveEvent.bind(this)
        this.dowloaden=this.dowloaden.bind(this)
        this.clearAllInterVals=this.clearAllInterVals.bind(this)

        this.rtvLogo=new Image()
        this.rtvLogo.src='../../logoRtv.png'
        this.rtvLogo.addEventListener('load',()=>{
            this.draw()
        })

        this.imageInfo={x:0,y:0,width:1280,height:720}

        this.uitleg={1:"Voeg een afbeelding toe door een bestand te kiezen of een afbeelding van het klembord toe te voegen.",2:"Gebruik de knoppen om de afbeelding goed te zetten. Of sleep de afbeelding om hem te verplaatsen.",3:"Voeg een titel toe.",4:"Als je tevreden bent met de Thumbnail klik op 'Download Thumbnail'."}
        this.state={
            title:"Verander deze tekst",
            stateImage:null,
            step:1
        }

        this.mouseX=null;
        this.mouseY=null}
    }


    handleInputChange(event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;

        if(name==="stateImage" ){
            if(event.target.files[0].type.includes("image")) {
                var file = document.querySelector('input[type=file]').files[0];
                console.log(file)
                var reader = new FileReader();
                reader.addEventListener("load", () => {
                    this.changeDrawImage(reader.result)
                }, false);
                if (file) {
                    reader.readAsDataURL(file);
                }
            }else{
                alert("Het bestand dat u wilde toevoegen is geen afbeelding")
            }
        }else{
            this.setState({
                [name]: value
            }, this.draw)

        }



    }

    changeDrawImage(url){
        this.setState({stateImage:url},()=>{
            this.Image=new Image()
            this.Image.src=this.state.stateImage
            this.Image.addEventListener('load',()=>{
                this.imageInfo.width=this.Image.width
                this.imageInfo.height=this.Image.height
                this.draw()
            })
        })
    }

    async imagePaste(){
        try {
            const clipboardItems = await navigator.clipboard.read();
            for (const clipboardItem of clipboardItems) {
                try {
                    for (const type of clipboardItem.types) {
                        if(type.includes("image")){
                            console.log(type)
                            const blob = await clipboardItem.getType(type);
                            var url=URL.createObjectURL(blob)
                            this.changeDrawImage(url)
                        }else{
                            alert("U heeft geen geldige afbeelding gekopieërd.")
                        }
                    }
                } catch (e) {
                    console.error(e, e.message);
                }
            }
        } catch (e) {
            console.error(e, e.message);
        }

    }

    draw(){

        function fitTextOnCanvas(text,fontface,xPosition,yPosition,maxSize,context){

            // start with a large font size
            var fontsize=50;

            // lower the font size until the text fits the canvas
            do{
                fontsize--;
                context.font=fontsize+"px "+fontface;
            }while(context.measureText(text).width>maxSize)

            // draw the text
            context.fillText(text,xPosition,yPosition);



        }

        var ctx=this.inputRef.current.getContext('2d')

        ctx.fillStyle="white"
        ctx.fillRect(0,0,1280,720)

        if(this.state.stateImage!==null){
            ctx.drawImage(this.Image,this.imageInfo.x,this.imageInfo.y,this.imageInfo.width,this.imageInfo.height)
        }


        var height=120
        ctx.beginPath()
        ctx.moveTo(1280,0)
        ctx.lineTo(0,0)
        ctx.lineTo(1280,height)
        ctx.lineTo(1280,0)
        ctx.fillStyle="white"
        ctx.fill()


        ctx.beginPath()
        ctx.moveTo(0,720)
        ctx.lineTo(1280,720)
        ctx.lineTo(0,720-height)
        ctx.lineTo(0,720)
        ctx.fillStyle="red"
        ctx.fill()

        ctx.fillStyle="white"
        ctx.font="60px Segoe UI"


        fitTextOnCanvas(this.state.title,"fira sans",15,690,480,ctx);




        var width=250
        ctx.drawImage(this.rtvLogo,950,20,width,(width*206)/878)
    }




    scrollHandler(event){
        var extra=1.01
        if(event.deltaY<0){
            extra=0.99
        }
        this.imageInfo.width *=extra
        this.imageInfo.height*=extra
        this.draw()
    }

    moveButtonHandler(x,y){
        var multiplyer=2
        return((event)=>{
            var interval=setInterval(()=>{
            this.imageInfo.x-=x*multiplyer
            this.imageInfo.y-=y*multiplyer
            this.draw()
            },50)
            this.mouseDown.push(interval)
        })


    }

    scaleButtonHandler(plus){
        return((event)=>{
            var interval=setInterval(()=>
                {
                    console.log("scale")
                    var extra=1.01
                    if(!plus){
                        extra=0.99
                    }
                    this.imageInfo.width *=extra
                    this.imageInfo.height*=extra
                    this.draw()
                },50)
            this.mouseDown.push(interval)
        })
    }


    mouseMoveEvent(event){
       if(event.buttons===1){
           if(this.mouseX!==null){
               this.imageInfo.x-=this.mouseX-event.clientX
               this.imageInfo.y-=this.mouseY-event.clientY
               this.draw()
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

    clearAllInterVals(){
        this.mouseDown.forEach(value => clearInterval(value))
        this.mouseDown=[]
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

    render() {
        return(
            <div className="ThumbnailPage">
                {this.browserGeschikt()?<div>
                <header>
                    <p className="uitleg">{this.uitleg[this.state.step]}</p>
                    <div className="editFields">
                        <label  style={{display:this.state.step!==3 ? "none":""}}>Thumbnail Text: <input className="titleInput" type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/></label>
                        <label style={{display:this.state.step!==1 ? "none":""}} > Kies Afbeelding: <input className="fileInput" type="file" name="stateImage" accept="image/*"  onChange={this.handleInputChange}/></label>
                        <label  style={{display:this.state.step!==1 ? "none":""}}>Plak gekopieërde Afbeelding: <button onClick={this.imagePaste}> <i className="material-icons" style={{fontSize:14}}>content_paste</i>  Afbeedling van klembord</button></label>
                        <button onClick={this.dowloaden} className="downloadButton" style={{display:this.state.step!==4 ? "none":""}} ><i className="material-icons">get_app</i> Download Thumbnail</button>
                    </div>
                    <div className="imageChanger"  style={{display:this.state.step!==2 ? "none":""}}>
                        <div className="imagePosition changeGroup">
                            <p>Verander Positie:</p>
                            <div className="changeButtons">
                                <i className="material-icons" onTouchStart={this.moveButtonHandler(0,1)} onTouchEnd={this.clearAllInterVals} onMouseLeave={this.clearAllInterVals} onMouseDown={this.moveButtonHandler(0,1)} onMouseUp={this.clearAllInterVals} >keyboard_arrow_up</i>
                                <i className="material-icons" onTouchStart={this.moveButtonHandler(0,-1)} onTouchEnd={this.clearAllInterVals} onMouseLeave={this.clearAllInterVals}onMouseDown={this.moveButtonHandler(0,-1)} onMouseUp={this.clearAllInterVals} >keyboard_arrow_down</i>
                                <i className="material-icons" onTouchStart={this.moveButtonHandler(1,0)} onTouchEnd={this.clearAllInterVals} onMouseLeave={this.clearAllInterVals}onMouseDown={this.moveButtonHandler(1,0)} onMouseUp={this.clearAllInterVals}  >keyboard_arrow_left</i>
                                <i className="material-icons" onTouchStart={this.moveButtonHandler(-1,0)} onTouchEnd={this.clearAllInterVals} onMouseLeave={this.clearAllInterVals}onMouseDown={this.moveButtonHandler(-1,0)} onMouseUp={this.clearAllInterVals}  >keyboard_arrow_right</i>
                            </div>
                        </div>
                        <div className="imageScale changeGroup">
                            <p>Verander Grootte:</p>
                            <div className="changeButtons">
                                <i className="material-icons"  onTouchStart={this.scaleButtonHandler(true) } onTouchEnd={this.clearAllInterVals}onMouseLeave={this.clearAllInterVals} onMouseDown={this.scaleButtonHandler(true) } onMouseUp={this.clearAllInterVals} >add</i>
                                <i className="material-icons" onTouchStart={this.scaleButtonHandler(false) } onTouchEnd={this.clearAllInterVals}onMouseLeave={this.clearAllInterVals} onMouseDown={this.scaleButtonHandler(false)} onMouseUp={this.clearAllInterVals} >remove</i>

                            </div>
                        </div>
                    </div>
                    <div className="stepButtons">
                        <button  style={{display:this.state.step===1 ? "none":""}} onClick={()=>this.setState(oldState=>{return({step:oldState.step-1})})} >Stap Terug</button>
                        <button style={{display:this.state.step===4 ? "none":""}} onClick={()=>this.setState(oldState=>{return({step:oldState.step+1})})} >Volgende Stap</button>
                        <button style={{display:this.state.step!==4 ? "none":""}} onClick={()=>this.setState(oldState=>{return({step:1,title: "Verander deze tekst",stateImage:null})},this.draw)} >Opnieuw</button>
                    </div>
                </header>
                <canvas  style={{border: '2px solid black'}} width="1280px" height="720px" onMouseMove={this.mouseMoveEvent} ref={this.inputRef}></canvas>
                </div>:<p>Helaas je internetprogramma is niet geschikt voor deze website, probeer Google Chrome,Safari of Firefox bijvoorbeeld.</p>}
            </div>

        )
    }
}

export default TumbnailCanvas