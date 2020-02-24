import KeuzeMenu from "../actionFields/KeuzeMenu";
import React from 'react'
import ChooseImage from "../actionFields/ChooseImage";
import ImageMover from "../actionFields/ImageMover";
import ChangeValue from "../actionFields/ChangeValue";
class actions{

    static CHOOSEIMAGE={text:"Voeg een afbeelding toe door een bestand te kiezen of een afbeelding van het klembord toe te voegen.",
        functie:(context)=>{
            return <ChooseImage itemChange={context.changeItemsValue} currentImage={context.getCurrentFieldValue()}  />
        }
    }
    static MOVEIMAGE ={text:"Gebruik de knoppen om de afbeelding goed te zetten. Of sleep de afbeelding om hem te verplaatsen.",
        functie:(context)=>{
            return <ImageMover itemChange={context.changeItemsValue} />
        }
    }

    static CHOOSETEXT={text:"Voeg een titel toe.",
        functie:(context)=>{
            return <ChangeValue itemChange={context.changeItemsValue} type="text" currentTitle={context.getCurrentFieldValue()} />
        }
    }

    static DOWNLOAD={text:"Als je tevreden bent met de Thumbnail klik op 'Download Thumbnail'.",
        functie:(context)=>{
            return <button onClick={()=>context.dowloaden(context.inputRef.current)} className="downloadButton" ><i className="material-icons">get_app</i> Download Thumbnail</button>
        }
    }

    static CHOOSETEMPLATE={text:"Kies je sjabloom.",
        functie:(context)=>{
            return <KeuzeMenu itemChange={(functie)=>{context.chooseTemplate(functie(""))}} options={context.getTemplateOptions()} currentChoise={context.state.template} />
        }
    }

    static CHOOSENUMBER={text:"Kies een getal.",
        functie:(context)=>{
            return <ChangeValue itemChange={context.changeItemsValue} type="number" currentTitle={context.getCurrentFieldValue()} />
        }
    }

    static CHOOSEDATE={text:"Choose a date.",
        functie:(context)=>{
            return <ChangeValue itemChange={context.changeItemsValue} type="date" currentTitle={context.getCurrentFieldValue()} />
        }
    }

    static CHOOSEMENU={ text:"ChooseMenu",
        functie:(context)=>{
            return <KeuzeMenu itemChange={context.changeItemsValue} options={context.getCurrentField().options} currentChoise={context.getCurrentFieldValue()} />
        }
    }
}
export default actions
