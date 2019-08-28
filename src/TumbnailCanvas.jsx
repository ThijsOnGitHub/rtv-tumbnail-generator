import React from 'react'


class TumbnailCanvas extends React.Component{

    constructor(){
        super()

        this.inputRef = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.imagePaste=this.imagePaste.bind(this)
        this.draw=this.draw.bind(this)
        this.scrollHandler=this.scrollHandler.bind(this)
        this.mouseMoveEvent=this.mouseMoveEvent.bind(this)

        this.rtvLogo=new Image()
        this.rtvLogo.src='../../logoRtv.png'
        this.rtvLogo.addEventListener('load',()=>{
            this.draw()
        })

        this.imageInfo={x:0,y:0,width:1280,height:720}

        this.state={
            title:"Verander deze tekst",
            image:null,
            imageShow:null
        }

        this.mouseX=null;
        this.mouseY=null
    }


    handleInputChange(event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;

        if(name==="imageShow" &&event.target.files[0].type.includes("image")){
            var preview = document.querySelector('img');
            var file    = document.querySelector('input[type=file]').files[0];
            var reader  = new FileReader();

            reader.addEventListener("load",  ()=> {
                this.changeDrawImage(reader.result)
                value = reader.result;
                this.setState({
                    [name]: value
                })
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }

        }else{
            this.setState({
                [name]: value
            }, this.draw)

        }



    }

    changeDrawImage(url){
        this.setState({imageShow:url},()=>{
            this.imageShow=new Image()
            this.imageShow.src=this.state.imageShow
            this.imageShow.addEventListener('load',()=>{
                this.imageInfo.width=this.imageShow.width
                this.imageInfo.height=this.imageShow.height
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

        if(this.state.imageShow!==null){
            ctx.drawImage(this.imageShow,this.imageInfo.x,this.imageInfo.y,this.imageInfo.width,this.imageInfo.height)
        }


        var height=120
        var path=new Path2D()
        ctx.fillStyle="white"
        path.moveTo(1280,0)
        path.lineTo(0,0)
        path.lineTo(1280,height)
        path.lineTo(1280,0)
        ctx.fill(path)


        var path=new Path2D()
        ctx.fillStyle="red"
        path.moveTo(0,720)
        path.lineTo(1280,720)
        path.lineTo(0,720-height)
        path.lineTo(0,720)
        ctx.fill(path)

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
        var canvas=this.inputRef.current
        var link=document.createElement('a')
        document.body.appendChild(link)
        link.href=canvas.toDataURL()
        link.download=`Banner ${this.state.title}.png`
        link.click()
        document.body.removeChild(link)
    }

    render() {
        return(
            <div className="ThumbnailPage">
                <header>
                    <ol className="uitleg">
                        <li>Kopieër een Afbeelding en klik op "Afbeelding van klembord" of upload een Afbeelding door op de knop 'Bestand Kiezen' te klikken om een achtergrond te kiezen.</li>
                        <li>Scroll over de Afbeelding om hem groter of kleiner te maken en sleep de afbeelding om het te verplaatsen.</li>
                        <li>Vanader de tekst in het vakje "Thumnail Tekst" om een titel toe te voegen</li>
                        <li>Klik op dowload Tumbnail om hem te dowloaden als afbeelding</li>
                    </ol>

                    <div className="editFields">
                        <label>Thumbnail Text: <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/></label>
                        <label>Kies Afbeelding: <input className="fileInput" type="file" name="imageShow" value={this.state.image} onChange={this.handleInputChange}/></label>
                        <label>Plak gekopieërde Afbeelding: <button onClick={this.imagePaste}> <i className="material-icons" style={{fontSize:14}}>content_paste</i>  Afbeedling van klembord</button></label>
                    </div>
                </header>
                <canvas  style={{border: '2px solid black'}} width="1280px" height="720px" onWheel={this.scrollHandler}  onMouseMove={this.mouseMoveEvent} ref={this.inputRef}></canvas>
                <footer>
                    <button onClick={this.dowloaden}><i className="material-icons">
                        get_app
                    </i> Download Thumbnail</button>
                </footer>
            </div>

        )
    }
}

export default TumbnailCanvas