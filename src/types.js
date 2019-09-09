import actions from "./actions";

class types{

    static Image=class{
        value={info:{x:0,y:0,width:0,height:0},object:null}
        actions=[{action:actions.CHOOSEIMAGE},{action:actions.MOVEIMAGE}]
    }
    static Text=class{
        value="Verander deze tekst"
        actions=[{action:actions.CHOOSETEXT}]
    }

    static Number=class{
        value=0
        actions=[{action:actions.CHOOSENUMBER}]
    }

    static Date=class{
        value=new Date()
        actions=[{action:actions.CHOOSEDATE}]
    }
}
export default types