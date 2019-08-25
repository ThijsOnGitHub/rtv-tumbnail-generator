import React from 'react'


class TumbnailCanvas extends React.Component{

    constructor(){
        super()

        this.inputRef = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.imagePaste=this.imagePaste.bind(this)
        this.draw=this.draw.bind(this)
        this.scrollHandler=this.scrollHandler.bind(this)

        this.rtvLogo=new Image()
        this.rtvLogo.src='../../logoRtv.png'
        this.rtvLogo.addEventListener('load',()=>{
            this.draw()
        })

        this.imageInfo={x:0,y:0,width:1280,height:720}

        this.state={
            title:"Hallo",
            image:null,
            imageShow:null
        }
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, this.draw)
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
        console.log(this.imageInfo)
    }

    dragHandler(event){
        console.log(event)

    }

    render() {
        return(
            <div>
                <form>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/>
                    <input type="file" name="image" value={this.state.image} onChange={this.handleInputChange}/>
                </form>
                <button onClick={this.imagePaste}>Image van Klembord</button>

                <canvas style={{border: '2px solid black'}} width="1280px" height="720px" onWheel={this.scrollHandler} on ref={this.inputRef}></canvas>
                <button onClick={()=>
                {
                    var canvas=this.inputRef.current

                    var link=document.createElement('a')
                    document.body.appendChild(link)
                    link.href=canvas.toDataURL()
                    link.download=`Banner ${this.state.title}.png`
                    link.click()
                    document.body.removeChild(link)
                }
                }>Download Banner</button>
            </div>

        )
    }
}

export default TumbnailCanvas