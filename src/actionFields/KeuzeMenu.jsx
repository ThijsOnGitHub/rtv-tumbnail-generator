import React from 'react'
import drawTemplate from "../Values/drawCode";

class KeuzeMenu extends React.Component{
    constructor(){
        super()
        this.handleInputChange=this.handleInputChange.bind(this)
        this.state={
            options:[]
        }
    }

    handleInputChange(event) {
        var returnItem=this.state.options[event.target.value].value
        this.props.itemChange(()=>{return returnItem})
    }

    componentDidMount() {
        var options=this.props.options.map(value=>{
            if(typeof value!=='object'){
                return {value:value}
            }
            return value
        })

        this.setState({options:options})
    }

    render() {
        return(<div className="keuzeLijst">

            {this.state.options.map((value,index) => {
                return(<div className="keuzeGroep">
                    {
                        value.item!==undefined ?
                       value.item :
                        <p>{value.value.replace(/_/g," ")}</p>
                    }

                    <input type="radio" style={{display:"inline-block"}} checked={this.props.currentChoise===value.value} name="template" value={index} onClick={this.handleInputChange}/>
                </div>)
            })}
        </div>)
    }
}
export default KeuzeMenu