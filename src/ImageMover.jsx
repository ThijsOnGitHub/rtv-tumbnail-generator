import React from 'react'

class ImageMover extends React.Component{
    constructor(){
        super()

        this.clearAllInterVals=this.clearAllInterVals.bind(this)
        this.moveButtonHandler=this.moveButtonHandler.bind(this)
        this.scaleButtonHandler=this.scaleButtonHandler.bind(this)


        this.mouseDown=[]
    }

    clearAllInterVals(){
        this.mouseDown.forEach(value => clearInterval(value))
        this.mouseDown=[]
    }

    moveButtonHandler(x,y){
        var multiplyer=2
        return((event)=>{
            var interval=setInterval(()=>{
                this.props.itemChange(
                    (item)=>{
                        var info = item.info
                        info.x-=x*multiplyer
                        info.y-=y*multiplyer
                        return item
                    }
                )

            },50)
            this.mouseDown.push(interval)
        })
    }

    scaleButtonHandler(plus){
        return((event)=>{
            var interval=setInterval(()=>
            {
                var extra=1.01
                if(!plus){
                    extra=0.99
                }
                this.props.itemChange(item=>{
                    var info=item.info
                    info.width *=extra
                    info.height*=extra
                    return item
                })
            },50)
            this.mouseDown.push(interval)
        })
    }

    render() {
        return(
            <div className="imageChanger" >
                <div className="imagePosition changeGroup">
                    <p>Verander Positie:</p>
                    <div className="changeButtons">
                        <i className="material-icons" onTouchStart={this.moveButtonHandler(0,1)} onTouchEnd={this.clearAllInterVals} onMouseLeave={this.clearAllInterVals} onMouseDown={this.moveButtonHandler(0,1)} onMouseUp={this.clearAllInterVals} >keyboard_arrow_up</i>
                        <i className="material-icons" onTouchStart={this.moveButtonHandler(0,-1)} onTouchEnd={this.clearAllInterVals} onMouseLeave={this.clearAllInterVals}onMouseDown={this.moveButtonHandler(0,-1)} onMouseUp={this.clearAllInterVals} >keyboard_arrow_down</i>
                        <i className="material-icons" onTouchStart={this.moveButtonHandler(1,0)} onTouchEnd={this.clearAllInterVals} onMouseLeave={this.clearAllInterVals}onMouseDown={this.moveButtonHandler(1,0)} onMouseUp={this.clearAllInterVals}  >keyboard_arrow_left</i>
                        <i className="material-icons" onTouchStart={this.moveButtonHandler(-1,0)} onTouchEnd={this.clearAllInterVals} onMouseLeave={this.clearAllInterVals}onMouseDown={this.moveButtonHandler(-1,0)} onMouseUp={this.clearAllInterVals}  >keyboard_arrow_right</i>
                    </div>
                </div>
                <div className="imageScale changeGroup">
                    <p>Verander Grootte:</p>
                    <div className="changeButtons">
                        <i className="material-icons"  onTouchStart={this.scaleButtonHandler(true) } onTouchEnd={this.clearAllInterVals}onMouseLeave={this.clearAllInterVals} onMouseDown={this.scaleButtonHandler(true) } onMouseUp={this.clearAllInterVals} >add</i>
                        <i className="material-icons" onTouchStart={this.scaleButtonHandler(false) } onTouchEnd={this.clearAllInterVals}onMouseLeave={this.clearAllInterVals} onMouseDown={this.scaleButtonHandler(false)} onMouseUp={this.clearAllInterVals} >remove</i>

                    </div>
                </div>
            </div>
        )
    }
}

export default ImageMover