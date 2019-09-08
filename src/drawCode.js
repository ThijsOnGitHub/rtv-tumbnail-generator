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

class drawTemplate{
    standaard={
        fields:{achtergrondFoto:types.IMAGE,title:types.TEXT},
        images:["../../logoRtv.png"],
        code:(ctx,images,fields)=>{

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



            ctx.fillStyle="white"
            ctx.fillRect(0,0,1280,720)


            if(fields.achtergrondFoto.object!==null){
                var imageInfo=fields.achtergrondFoto.info
                ctx.drawImage(fields.achtergrondFoto.object,imageInfo.x,imageInfo.y,imageInfo.width,imageInfo.height)
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



            fitTextOnCanvas(fields.title,"fira sans",15,690,480,ctx);




            var width=250
            ctx.drawImage(images[0],950,20,width,(width*206)/878)
        }
    }
}

export default drawTemplate