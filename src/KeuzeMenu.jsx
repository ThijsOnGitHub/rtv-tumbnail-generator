import React from 'react'
import drawTemplate from "./drawCode";

class KeuzeMenu extends React.Component{
    constructor(){
        super()
        var keuzes= new drawTemplate()
        keuzes=Object.keys(keuzes)
        this.state={
            keuzes:keuzes,
        }
        this.handleInputChange=this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        this.props.keuzeChange(event.target.value)
    }

    render() {
        return(<div className="keuzeLijst">
            {this.state.keuzes.map(value => {
                return(<div className="keuzeGroep">
                    <p>{value.replace(/_/g," ")}</p>
                    <input type="radio" style={{display:"inline-block"}} checked={this.props.template===value} name="template" value={value} onClick={this.handleInputChange}/>
                </div>)
            })}
        </div>)
    }
}
export default KeuzeMenu