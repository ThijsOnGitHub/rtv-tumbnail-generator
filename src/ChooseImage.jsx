import React from 'react'

class ChooseImage extends React.Component{
    constructor(){
        super()

        this.handleInputChange=this.handleInputChange.bind(this)
        this.uploadImage=this.uploadImage.bind(this)
        this.changeDrawImage=this.changeDrawImage.bind(this)
        this.imagePaste=this.imagePaste.bind(this)
    }

    changeDrawImage(url){
            var image= new Image()
            image.src=url
            image.addEventListener('load',()=>{
                this.props.infoChange((info)=>{
                    info.width=image.width
                    info.height=image.height
                    return info
                })

                this.props.imageChange(image)
            })
    }

    async imagePaste(){
        try {
            const clipboardItems = await navigator.clipboard.read();
            for (const clipboardItem of clipboardItems) {
                try {
                    for (const type of clipboardItem.types) {
                        if(type.includes("image")){
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

    handleInputChange(event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;

        this.uploadImage(event)

        this.setState({
            [name]: value
        })

    }

    uploadImage(event){
        if(event.target.files[0].type.includes("image")) {
            var file = document.querySelector('input[type=file]').files[0];

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
    }

    render() {
        return(
            <div className="editFields">
                <label  >Kies Afbeelding: <input className="fileInput" type="file" name="stateImage" accept="image/*"  onChange={this.handleInputChange}/></label>
                <label  >Plak gekopieërde Afbeelding: <button onClick={this.imagePaste}> <i className="material-icons" style={{fontSize:14}}>content_paste</i>  Afbeedling van klembord</button></label>
            </div>
        )
    }
}

export default ChooseImage