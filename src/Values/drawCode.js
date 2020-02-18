import React from 'react'
import types from "./types";
import actions from "./actions";
import textNL from "./textNL";

/* fields become:
    if type.Image:{info:{x:100,y:20,height:100,width:100},object:IMAGEOBJECT}

    if type.text:"hallo"

    if not transformed: type.<type>
    voorbeeld
    {achtergrondFoto:types.IMAGE,title:types.TEXT}

    Become:
    {achtergrondFoto:{info:{x:100,y:20,height:100,width:100},object:IMAGEOBJECT},title:"test"}


 */
class drawFunctions{

    static drawIncommingImage(ctx,fotoFields) {
       if(fotoFields.object!==null){
            var imageInfo=fotoFields.info
            ctx.drawImage(fotoFields.object,imageInfo.x,imageInfo.y,imageInfo.width,imageInfo.height)
        }
    }

    static scaleImageWidth(ctx, image, x, y, width, center) {
        if(center){
            x=x-width/2
        }
        ctx.drawImage(image,x,y,width,(width*image.height)/image.width)
    }


    static scaleImageHeight(ctx, image, x, y, height, center) {
        var width= (height*image.width)/image.height
        if(center){
            x=x-width/2
            y=y-height/2
        }
        ctx.drawImage(image,x,y,width,height)

    }

    static fitTextOnCanvas(text,fontface,xPosition,yPosition,maxFont,maxSize,context,center){

        // start with a large font size
        var fontsize=maxFont;

        // lower the font size until the text fits the canvas
        do{
            fontsize--;
            context.font=fontsize+"px "+fontface;
        }while(context.measureText(text).width>maxSize)

        if(center){
            xPosition=xPosition-context.measureText(text).width/2
        }


        // draw the text
        context.fillText(text,xPosition,yPosition);

    }

    static updateData(data) {
        return(
            (uitvoer)=>{
                return Object.assign(uitvoer,data)
            }
        )
    }

    static formatFields(fieldsInput){
        var fields={}
        Object.assign(fields,fieldsInput)
        var keys= Object.keys(fields)
        keys.forEach(value => {
            fields[value]=fields[value].value
        })
        return fields
    }
}


class drawTemplate{
    Standaard={
        fields:{achtergrondFoto:new types.Image(),title:new types.Text()},
        images:["../../logoRtvLang.png"],
        downloadWidth:1280,
        verhouding:"16:9",
        fileName: (object)=>{return("Thumbnail `"+object.title.value+"`.png")},
        code:(ctx,images,fields,width)=>{

            var fieldsValue=drawFunctions.formatFields(fields)

            var normalWidth=1920
            var scale = width/normalWidth
            ctx.scale(scale,scale)

            ctx.fillStyle="white"
            ctx.fillRect(0,0,1920,1080)
            drawFunctions.drawIncommingImage(ctx,fieldsValue.achtergrondFoto)




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



            drawFunctions.fitTextOnCanvas(fieldsValue.title,"fira sans",22.5,1045,80,800,ctx);




            var width=375
            ctx.drawImage(images[0],1425,30,width,(width*309)/1317)

            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }



    Studio_Programmas={
        fields:{
            programmaLogo:new types.ChooseImage(["../../WATLogo.png","LogoPolitiekCafe.png"],(object)=>{
                object.steps=[{action:actions.CHOOSEMENU,text:textNL.kiesProgramma}]
                return object
            }),
            achtergrondFoto:new types.Image(object=>{
                object.steps[0].text="Kies een achtergrond foto"
            }),
            date:new types.Date((object)=>{
            object.steps[0].text="Kies de opnamedatum van de Waard aan Tafel Aflevering"
                return object
            })

        },
        images:[],
        downloadWidth:1280,
        verhouding:"16:9",
        fileName:(object)=>{var date=new Date(object.date.value)
            var months=['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December']
            return("Thumbnail De Waard Aan Tafel "+date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()+".png")
        },
        code:(ctx,images,fields,width)=>{
            var fieldsValue=drawFunctions.formatFields(fields)

            var normalWidth=1920
            var scale = width/normalWidth
            ctx.scale(scale,scale)

            ctx.fillStyle="white"
            ctx.fillRect(0,0,1920,1080)


            drawFunctions.drawIncommingImage(ctx,fieldsValue.achtergrondFoto)


            ctx.beginPath();
            ctx.arc(1900, 550, 1600/2, 0, 2 * Math.PI);
            ctx.fill();


            ctx.fillStyle="black"

            var date=new Date(fieldsValue.date)
            var months=['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december']
            var yPos=250
            drawFunctions.fitTextOnCanvas(date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear(),"Open Sans",1550,yPos+575,75,600,ctx,true);

            drawFunctions.scaleImageHeight(ctx,fieldsValue.programmaLogo.object,1550,475,450,true)

            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
    /*
    Test_Versie_1={
        fields:{achtergrondFoto:new types.Image(),title:new types.Text()},
        images:["../../logoRtvLang.png"],
        downloadWidth:1280,
        verhouding:"16:9",
        fileName: (object)=>{return("Thumbnail `"+object.title.value+"`.png")},
        code:(ctx,images,fields,width)=>{

            var fieldsValue=drawFunctions.formatFields(fields)

            var normalWidth=1920
            var scale = width/normalWidth
            ctx.scale(scale,scale)

            ctx.fillStyle="black"
            ctx.fillRect(0,0,1920,1080)
            drawFunctions.drawIncommingImage(ctx,fieldsValue.achtergrondFoto)



            var height=325
            var width=1010
            ctx.beginPath()
            ctx.moveTo(1920,0)
            ctx.lineTo(1920-width,0)
            ctx.lineTo(1920,height)
            ctx.lineTo(1920,0)
            ctx.fillStyle="white"
            ctx.fill()


            ctx.beginPath()
            ctx.moveTo(0,1080)
            ctx.lineTo(width,1080)
            ctx.lineTo(0,1080-height)
            ctx.lineTo(0,1080)
            ctx.fillStyle="red"
            ctx.fill()

            ctx.fillStyle="white"



            drawFunctions.fitTextOnCanvas(fieldsValue.title,"fira sans",22.5,1010,80,800,ctx);




            var width=460
            ctx.drawImage(images[0],1400,60,width,(width*309)/1317)

            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    Test_Versie_2={
        fields:{achtergrondFoto:new types.Image(),title:new types.Text()},
        images:["../../logoRtvLang.png"],
        downloadWidth:1280,
        verhouding:"16:9",
        fileName: (object)=>{return("Thumbnail `"+object.title.value+"`.png")},
        code:(ctx,images,fields,width)=>{

            var fieldsValue=drawFunctions.formatFields(fields)

            var normalWidth=1920
            var scale = width/normalWidth
            ctx.scale(scale,scale)

            ctx.fillStyle="black"
            ctx.fillRect(0,0,1920,1080)
            drawFunctions.drawIncommingImage(ctx,fieldsValue.achtergrondFoto)



            var height=325
            var width=1425
            ctx.beginPath()
            ctx.moveTo(1920,0)
            ctx.lineTo(1920-width,0)
            ctx.lineTo(1920,height)
            ctx.lineTo(1920,0)
            ctx.fillStyle="white"
            ctx.fill()


            ctx.beginPath()
            ctx.moveTo(0,1080)
            ctx.lineTo(width,1080)
            ctx.lineTo(0,1080-height)
            ctx.lineTo(0,1080)
            ctx.fillStyle="red"
            ctx.fill()

            ctx.fillStyle="white"



            drawFunctions.fitTextOnCanvas(fieldsValue.title,"fira sans",22.5,1010,80,800,ctx);




            var width=460
            ctx.drawImage(images[0],1400,60,width,(width*309)/1317)

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
    }
*/

}

export default drawTemplate
