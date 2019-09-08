import React from 'react'

class ChooseTitle extends React.Component{
    constructor(){
        super()
        this.state={
            title:""
        }

        this.handleInputChange=this.handleInputChange.bind(this)
    }



    handleInputChange(event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;

        this.props.titleChange(value)

        this.setState({
            [name]: value
        })

    }

    render() {
        return(
            <div className="editFields">
                <label  >Thumbnail Text: <input className="titleInput" type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/></label>
            </div>
        )
    }
}
export default ChooseTitle