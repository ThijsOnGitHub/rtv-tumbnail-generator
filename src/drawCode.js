import React from 'react'
import types from "./types";

/* fields become:
    if type.Image:{info:{x:100,y:20,height:100,width:100},object:IMAGEOBJECT}

    if type.text:"hallo"

    if not transformed: type.<type>
    voorbeeld
    {achtergrondFoto:types.IMAGE,title:types.TEXT}

    Become:
    {achtergrondFoto:{info:{x:100,y:20,height:100,width:100},object:IMAGEOBJECT},title:"test"}


 */

function drawIncommingImage(ctx,fotoFields) {
    if(fotoFields.object!==null){
        var imageInfo=fotoFields.info
        ctx.drawImage(fotoFields.object,imageInfo.x,imageInfo.y,imageInfo.width,imageInfo.height)
    }
}
function fitTextOnCanvas(text,fontface,xPosition,yPosition,maxFont,maxSize,context){

    // start with a large font size
    var fontsize=maxFont;

    // lower the font size until the text fits the canvas
    do{
        fontsize--;
        context.font=fontsize+"px "+fontface;
    }while(context.measureText(text).width>maxSize)

    // draw the text
    context.fillText(text,xPosition,yPosition);

}

class drawTemplate{
    Standaard={
        fields:{achtergrondFoto:new types.Image(),title:new types.Text()},
        images:["../../logoRtv.png"],
        fileName:"Thumbnail `!(this.state.fields.title)`.png",
        code:(ctx,images,fields,width)=>{



            var normalWidth=1920
            var scale = width/normalWidth
            ctx.scale(scale,scale)

            ctx.fillStyle="white"
            ctx.fillRect(0,0,1920,1080)


            drawIncommingImage(ctx,fields.achtergrondFoto)



            var height=180
            ctx.beginPath()
            ctx.moveTo(1920,0)
            ctx.lineTo(0,0)
            ctx.lineTo(1920,height)
            ctx.lineTo(1920,0)
            ctx.fillStyle="white"
            ctx.fill()


            ctx.beginPath()
            ctx.moveTo(0,1080)
            ctx.lineTo(1920,1080)
            ctx.lineTo(0,1080-height)
            ctx.lineTo(0,1080)
            ctx.fillStyle="red"
            ctx.fill()

            ctx.fillStyle="white"



            fitTextOnCanvas(fields.title,"fira sans",22.5,1050,80,770,ctx);




            var width=375
            ctx.drawImage(images[0],1425,30,width,(width*309)/1317)

            ctx.setTransform(1, 0, 0, 1, 0, 0);

        }
    }


}

export default drawTemplate