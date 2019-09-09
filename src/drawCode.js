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
function scaleImage(ctx,image,x,y,width) {
    ctx.drawImage(image,x,y,width,(width*image.height)/image.width)
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
        images:["../../logoRtvLang.png"],
        fileName: (object)=>{return("Thumbnail `"+object.title+"`.png")},
        code:(ctx,images,fields,width)=>{



            var normalWidth=1920
            var scale = width/normalWidth
            ctx.scale(scale,scale)

            ctx.fillStyle="white"
            ctx.fillRect(0,0,1920,1080)

            console.log(fields)
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



            fitTextOnCanvas(fields.title,"fira sans",22.5,1045,80,800,ctx);




            var width=375
            ctx.drawImage(images[0],1425,30,width,(width*309)/1317)

            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    De_Waard_Aan_Tafel={
        fields:{achtergrondFoto:new types.Image(),date:new types.Date()},
        images:["../../WATLogo.png"],
        fileName:(object)=>{var date=new Date(object.date)
            var months=['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December']
            return("Thumbnail De Waard Aan Tafel "+date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()+".png")
        },
        code:(ctx,images,fields,width)=>{



            var normalWidth=1920
            var scale = width/normalWidth
            ctx.scale(scale,scale)

            ctx.fillStyle="white"
            ctx.fillRect(0,0,1920,1080)


            drawIncommingImage(ctx,fields.achtergrondFoto)


            ctx.beginPath();
            ctx.arc(1900, 550, 1600/2, 0, 2 * Math.PI);
            ctx.fill();


            ctx.fillStyle="black"

            var date=new Date(fields.date)
            var months=['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December']
            var yPos=250
            fitTextOnCanvas(date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear(),"Open Sans",1250,yPos+575,10000,600,ctx);

            scaleImage(ctx,images[0],1350,yPos,400)

            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }


}

export default drawTemplate