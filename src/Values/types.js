import actions from "./actions";
import textNL from "./textNL";
import React from 'react'

class types{

    static Image=class{
        constructor(functie){
            this.value={info:{x:0,y:0,width:0,height:0},object:null}
            this.steps=[{action:actions.CHOOSEIMAGE,text:textNL.voegAfbeeldingToe},{action:actions.MOVEIMAGE,text: textNL.gebruikKnoppen}]
            if(typeof functie==='function'){
                var uitvoer = functie(this)
                Object.assign(this,uitvoer)
            }
        }
    }

    static Text=class{
        constructor(functie){
            this.value="Verander deze tekst"
            this.steps=[{action:actions.CHOOSETEXT,text:textNL.addTitel}]
            if(typeof functie==='function'){
                var uitvoer = functie(this)
                Object.assign(this,uitvoer)
            }
        }
    }

    static Number=class{
        constructor(functie){
            this.value=0
            this.steps=[{action:actions.CHOOSENUMBER,text:textNL.kiesGetal}]
            if(typeof functie==='function'){
                var uitvoer = functie(this)
                Object.assign(this,uitvoer)
            }
        }
    }

    static Date=class{
        constructor(functie){
            this.value=new Date()
            this.steps=[{action:actions.CHOOSEDATE,text:textNL.choooseDate}]
            if(typeof functie==='function'){
                var uitvoer = functie(this)
                Object.assign(this,uitvoer)
            }
        }
    }
    static ChooseMenu=class {
        constructor(options,functie){
            this.options=options
            this.value=this.options[0]
            this.steps=[{action:actions.CHOOSEMENU,text:"Kies een optie."}]

            if(typeof functie==='function'){
                var uitvoer=functie(this)
                Object.assign(this,uitvoer)
            }
        }
    }

    static ChooseImage=class{
        constructor(imagesSrc,functie){
            this.options=
                imagesSrc.map( (value)=>{
                    var image=new Image()
                    image.src=value
                    var info;
                    info={x:0,y:0,width: 0, height: 0}
                    image.addEventListener('load',()=>{
                        info.width=image.width
                        info.height=image.height
                    })

                    return ({value:{info:info,object:image}, item:<img src={value} width={100}/>})
            })
            this.value=this.options[0].value
            this.steps=[{action:actions.CHOOSEMENU,text:"Kies een optie."},{action: actions.MOVEIMAGE,text:"Beweeg de afbeelding"}]

            if(typeof functie==='function'){
                var uitvoer=functie(this)
                Object.assign(this,uitvoer)
            }
        }
    }
}
export default types