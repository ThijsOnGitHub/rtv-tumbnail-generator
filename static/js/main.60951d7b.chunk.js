(window["webpackJsonprtv-tumbnail-generator"]=window["webpackJsonprtv-tumbnail-generator"]||[]).push([[0],{12:function(e,t,n){e.exports=n(21)},17:function(e,t,n){},18:function(e,t,n){e.exports=n.p+"static/media/logo.ee7cd8ed.svg"},19:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(10),r=n.n(o),s=(n(17),n(18),n(19),n(7)),l=n(2),c=n(3),u=n(5),h=n(4),d=n(1),m=n(6),g=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(h.a)(t).call(this))).clearAllInterVals=e.clearAllInterVals.bind(Object(d.a)(e)),e.moveButtonHandler=e.moveButtonHandler.bind(Object(d.a)(e)),e.scaleButtonHandler=e.scaleButtonHandler.bind(Object(d.a)(e)),e.mouseDown=[],e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"clearAllInterVals",value:function(){this.mouseDown.forEach(function(e){return clearInterval(e)}),this.mouseDown=[]}},{key:"moveButtonHandler",value:function(e,t){var n=this;return function(a){var i=setInterval(function(){n.props.itemChange(function(n){var a=n.info;return a.x-=2*e,a.y-=2*t,n})},50);n.mouseDown.push(i)}}},{key:"scaleButtonHandler",value:function(e){var t=this;return function(n){var a=setInterval(function(){var n=1.01;e||(n=.99),t.props.itemChange(function(e){var t=e.info;return t.width*=n,t.height*=n,e})},50);t.mouseDown.push(a)}}},{key:"render",value:function(){return i.a.createElement("div",{className:"imageChanger"},i.a.createElement("div",{className:"imagePosition changeGroup"},i.a.createElement("p",null,"Verander Positie:"),i.a.createElement("div",{className:"changeButtons"},i.a.createElement("i",{className:"material-icons",onTouchStart:this.moveButtonHandler(0,1),onTouchEnd:this.clearAllInterVals,onMouseLeave:this.clearAllInterVals,onMouseDown:this.moveButtonHandler(0,1),onMouseUp:this.clearAllInterVals},"keyboard_arrow_up"),i.a.createElement("i",{className:"material-icons",onTouchStart:this.moveButtonHandler(0,-1),onTouchEnd:this.clearAllInterVals,onMouseLeave:this.clearAllInterVals,onMouseDown:this.moveButtonHandler(0,-1),onMouseUp:this.clearAllInterVals},"keyboard_arrow_down"),i.a.createElement("i",{className:"material-icons",onTouchStart:this.moveButtonHandler(1,0),onTouchEnd:this.clearAllInterVals,onMouseLeave:this.clearAllInterVals,onMouseDown:this.moveButtonHandler(1,0),onMouseUp:this.clearAllInterVals},"keyboard_arrow_left"),i.a.createElement("i",{className:"material-icons",onTouchStart:this.moveButtonHandler(-1,0),onTouchEnd:this.clearAllInterVals,onMouseLeave:this.clearAllInterVals,onMouseDown:this.moveButtonHandler(-1,0),onMouseUp:this.clearAllInterVals},"keyboard_arrow_right"))),i.a.createElement("div",{className:"imageScale changeGroup"},i.a.createElement("p",null,"Verander Grootte:"),i.a.createElement("div",{className:"changeButtons"},i.a.createElement("i",{className:"material-icons",onTouchStart:this.scaleButtonHandler(!0),onTouchEnd:this.clearAllInterVals,onMouseLeave:this.clearAllInterVals,onMouseDown:this.scaleButtonHandler(!0),onMouseUp:this.clearAllInterVals},"add"),i.a.createElement("i",{className:"material-icons",onTouchStart:this.scaleButtonHandler(!1),onTouchEnd:this.clearAllInterVals,onMouseLeave:this.clearAllInterVals,onMouseDown:this.scaleButtonHandler(!1),onMouseUp:this.clearAllInterVals},"remove"))))}}]),t}(i.a.Component),f=function e(){Object(l.a)(this,e)};f.CHOOSEIMAGE={text:"Voeg een afbeelding toe door een bestand te kiezen of een afbeelding van het klembord toe te voegen."},f.MOVEIMAGE={text:"Gebruik de knoppen om de afbeelding goed te zetten. Of sleep de afbeelding om hem te verplaatsen."},f.CHOOSETEXT={text:"Voeg een titel toe."},f.DOWNLOAD={text:"Als je tevreden bent met de Thumbnail klik op 'Download Thumbnail'."},f.CHOOSETEMPLATE={text:"Kies je sjabloom."},f.CHOOSENUMBER={text:"Kies een getal."},f.CHOOSEDATE={text:"Choose a date."},f.CHOOSEMENU="ChooseMenu";var p=f,v={voegAfbeeldingToe:"Voeg een afbeelding toe door een bestand te kiezen of een afbeelding van het klembord toe te voegen.",gebruikKnoppen:"Gebruik de knoppen om de afbeelding goed te zetten. Of sleep de afbeelding om hem te verplaatsen.",addTitel:"Voeg een titel toe.",dowload:"Als je tevreden bent met de Afbeelding en klik op 'Download Thumbnail'.",kiesTemplate:"Kies je sjabloom.",kiesGetal:"Kies een getal.",choooseDate:"Kies een datum.",kiesProgramma:"Kies het tv programma logo"},b=function e(){Object(l.a)(this,e)};b.Image=function(){return function e(t){if(Object(l.a)(this,e),this.value={info:{x:0,y:0,width:0,height:0},object:null},this.steps=[{action:p.CHOOSEIMAGE,text:v.voegAfbeeldingToe},{action:p.MOVEIMAGE,text:v.gebruikKnoppen}],"function"===typeof t){var n=t(this);Object.assign(this,n)}}}(),b.Text=function(){return function e(t){if(Object(l.a)(this,e),this.value="Verander deze tekst",this.steps=[{action:p.CHOOSETEXT,text:v.addTitel}],"function"===typeof t){var n=t(this);Object.assign(this,n)}}}(),b.Number=function(){return function e(t){if(Object(l.a)(this,e),this.value=0,this.steps=[{action:p.CHOOSENUMBER,text:v.kiesGetal}],"function"===typeof t){var n=t(this);Object.assign(this,n)}}}(),b.Date=function(){return function e(t){if(Object(l.a)(this,e),this.value=new Date,this.steps=[{action:p.CHOOSEDATE,text:v.choooseDate}],"function"===typeof t){var n=t(this);Object.assign(this,n)}}}(),b.ChooseMenu=function(){return function e(t,n){if(Object(l.a)(this,e),this.options=t,this.value=this.options[0],this.steps=[{action:p.CHOOSEMENU,text:"Kies een optie."}],"function"===typeof n){var a=n(this);Object.assign(this,a)}}}(),b.ChooseImage=function(){return function e(t,n){if(Object(l.a)(this,e),this.options=t.map(function(e){var t,n=new Image;return n.src=e,t={x:0,y:0,width:0,height:0},n.addEventListener("load",function(){t.width=n.width,t.height=n.height}),{value:{info:t,object:n},item:i.a.createElement("img",{src:e,width:100})}}),this.value=this.options[0].value,this.steps=[{action:p.CHOOSEMENU,text:"Kies een optie."},{action:p.MOVEIMAGE,text:"Beweeg de afbeelding"}],"function"===typeof n){var a=n(this);Object.assign(this,a)}}}();var w=b,O=function(){function e(){Object(l.a)(this,e)}return Object(c.a)(e,null,[{key:"drawIncommingImage",value:function(e,t){if(null!==t.object){var n=t.info;e.drawImage(t.object,n.x,n.y,n.width,n.height)}}},{key:"scaleImageWidth",value:function(e,t,n,a,i,o){o&&(n-=i/2),e.drawImage(t,n,a,i,i*t.height/t.width)}},{key:"scaleImageHeight",value:function(e,t,n,a,i,o){var r=i*t.width/t.height;o&&(n-=r/2,a-=i/2),e.drawImage(t,n,a,r,i)}},{key:"fitTextOnCanvas",value:function(e,t,n,a,i,o,r,s){var l=i;do{l--,r.font=l+"px "+t}while(r.measureText(e).width>o);s&&(n-=r.measureText(e).width/2),r.fillText(e,n,a)}},{key:"updateData",value:function(e){return function(t){return Object.assign(t,e)}}},{key:"formatFields",value:function(e){var t={};return Object.assign(t,e),Object.keys(t).forEach(function(e){t[e]=t[e].value}),t}}]),e}(),E=function e(){Object(l.a)(this,e),this.Standaard={fields:{achtergrondFoto:new w.Image,title:new w.Text},images:["../../logoRtvLang.png"],downloadWidth:1280,verhouding:"16:9",fileName:function(e){return"Thumbnail `"+e.title.value+"`.png"},code:function(e,t,n,a){var i=O.formatFields(n),o=a/1920;e.scale(o,o),e.fillStyle="white",e.fillRect(0,0,1920,1080),O.drawIncommingImage(e,i.achtergrondFoto);e.beginPath(),e.moveTo(1920,0),e.lineTo(0,0),e.lineTo(1920,180),e.lineTo(1920,0),e.fillStyle="white",e.fill(),e.beginPath(),e.moveTo(0,1080),e.lineTo(1920,1080),e.lineTo(0,900),e.lineTo(0,1080),e.fillStyle="red",e.fill(),e.fillStyle="white",O.fitTextOnCanvas(i.title,"fira sans",22.5,1045,80,800,e);a=375;e.drawImage(t[0],1425,30,a,309*a/1317),e.setTransform(1,0,0,1,0,0)}},this.Studio_Programmas={fields:{programmaLogo:new w.ChooseImage(["../../WATLogo.png","LogoPolitiekCafe.png"],function(e){return e.steps=[{action:p.CHOOSEMENU,text:v.kiesProgramma}],e}),achtergrondFoto:new w.Image(function(e){e.steps[0].text="Kies een achtergrond foto"}),date:new w.Date(function(e){return e.steps[0].text="Kies de opnamedatum van de Waard aan Tafel Aflevering",e})},images:[],downloadWidth:1280,verhouding:"16:9",fileName:function(e){var t=new Date(e.date.value);return"Thumbnail De Waard Aan Tafel "+t.getDate()+" "+["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"][t.getMonth()]+" "+t.getFullYear()+".png"},code:function(e,t,n,a){var i=O.formatFields(n),o=a/1920;e.scale(o,o),e.fillStyle="white",e.fillRect(0,0,1920,1080),O.drawIncommingImage(e,i.achtergrondFoto),e.beginPath(),e.arc(1900,550,800,0,2*Math.PI),e.fill(),e.fillStyle="black";var r=new Date(i.date);O.fitTextOnCanvas(r.getDate()+" "+["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"][r.getMonth()]+" "+r.getFullYear(),"Open Sans",1550,825,75,600,e,!0),O.scaleImageHeight(e,i.programmaLogo.object,1550,475,450,!0),e.setTransform(1,0,0,1,0,0)}},this.Losse_Programma_Items={fields:{programmaLogo:new w.ChooseImage(["../../WATLogo.png","LogoPolitiekCafe.png"],function(e){return e.steps=[{action:p.CHOOSEMENU,text:v.kiesProgramma}],e}),achtergrondFoto:new w.Image(function(e){e.steps[0].text="Kies een achtergrond foto"}),title:new w.Text},images:[],downloadWidth:1280,verhouding:"16:9",fileName:function(e){return"Thumbnail Los Item De Waard Aan Tafel '"+e.title.value+"'.png"},code:function(e,t,n,a){var i=O.formatFields(n),o=a/1920;e.scale(o,o),e.fillStyle="white",e.fillRect(0,0,1920,1080),O.drawIncommingImage(e,i.achtergrondFoto),e.fillRect(0,890,1920,200),O.scaleImageHeight(e,i.programmaLogo.object,175,980,130,!0),e.fillStyle="#c90b0e";O.fitTextOnCanvas(i.title,"Fira Sans",1050,1005,75,1500,e,!0),e.setTransform(1,0,0,1,0,0)}}},k=n(8),I=n.n(k),y=n(11),C=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(h.a)(t).call(this))).state={stateImage:""},e.handleInputChange=e.handleInputChange.bind(Object(d.a)(e)),e.uploadImage=e.uploadImage.bind(Object(d.a)(e)),e.changeDrawImage=e.changeDrawImage.bind(Object(d.a)(e)),e.imagePaste=e.imagePaste.bind(Object(d.a)(e)),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"changeDrawImage",value:function(e){var t=this,n=new Image;n.src=e,n.addEventListener("load",function(){t.props.itemChange(function(e){var t=e.info;return t.width=n.width,t.height=n.height,e}),t.props.itemChange(function(e){return e.object=n,e})})}},{key:"imagePaste",value:function(){var e=Object(y.a)(I.a.mark(function e(){var t,n,a,i,o,r,s,l,c,u,h,d,m,g,f;return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.clipboard.read();case 3:t=e.sent,n=!0,a=!1,i=void 0,e.prev=7,o=t[Symbol.iterator]();case 9:if(n=(r=o.next()).done){e.next=53;break}s=r.value,e.prev=11,l=!0,c=!1,u=void 0,e.prev=15,h=s.types[Symbol.iterator]();case 17:if(l=(d=h.next()).done){e.next=31;break}if(!(m=d.value).includes("image")){e.next=27;break}return e.next=22,s.getType(m);case 22:g=e.sent,f=URL.createObjectURL(g),this.changeDrawImage(f),e.next=28;break;case 27:alert("U heeft geen geldige afbeelding gekopie\xebrd.");case 28:l=!0,e.next=17;break;case 31:e.next=37;break;case 33:e.prev=33,e.t0=e.catch(15),c=!0,u=e.t0;case 37:e.prev=37,e.prev=38,l||null==h.return||h.return();case 40:if(e.prev=40,!c){e.next=43;break}throw u;case 43:return e.finish(40);case 44:return e.finish(37);case 45:e.next=50;break;case 47:e.prev=47,e.t1=e.catch(11),console.error(e.t1,e.t1.message);case 50:n=!0,e.next=9;break;case 53:e.next=59;break;case 55:e.prev=55,e.t2=e.catch(7),a=!0,i=e.t2;case 59:e.prev=59,e.prev=60,n||null==o.return||o.return();case 62:if(e.prev=62,!a){e.next=65;break}throw i;case 65:return e.finish(62);case 66:return e.finish(59);case 67:e.next=72;break;case 69:e.prev=69,e.t3=e.catch(0),console.error(e.t3,e.t3.message);case 72:case"end":return e.stop()}},e,this,[[0,69],[7,55,59,67],[11,47],[15,33,37,45],[38,,40,44],[60,,62,66]])}));return function(){return e.apply(this,arguments)}}()},{key:"handleInputChange",value:function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,a=t.name;this.uploadImage(e),this.setState(Object(s.a)({},a,n))}},{key:"uploadImage",value:function(e){var t=this;if(e.target.files[0].type.includes("image")){var n=document.querySelector("input[type=file]").files[0],a=new FileReader;a.addEventListener("load",function(){t.changeDrawImage(a.result)},!1),n&&a.readAsDataURL(n)}else alert("Het bestand dat u wilde toevoegen is geen afbeelding")}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("div",{className:"editFields"},i.a.createElement("label",null,"Kies Afbeelding: ",i.a.createElement("input",{className:"fileInput",type:"file",name:"stateImage",accept:"image/*",value:this.state.stateImage,onChange:this.handleInputChange})),i.a.createElement("label",null,"Plak gekopie\xebrde Afbeelding: ",i.a.createElement("button",{onClick:this.imagePaste}," ",i.a.createElement("i",{className:"material-icons",style:{fontSize:14}},"content_paste"),"  Afbeedling van klembord"))),null!==this.props.currentImage.object&&i.a.createElement("div",{className:"editFields"},i.a.createElement("button",{style:{marginTop:20},onClick:function(){e.props.itemChange(function(e){return e.object=null,e}),e.setState({stateImage:""})}},i.a.createElement("i",{className:"material-icons",style:{fontSize:14}},"delete")," Verwijder Afbeelding"),i.a.createElement("div",null,i.a.createElement("p",{style:{textAlign:"center"}},"Preview:"),i.a.createElement("img",{src:this.props.currentImage.object.src,style:{objectFit:"cover"},width:100,height:50}))))}}]),t}(i.a.Component),j=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(h.a)(t).call(this))).state={title:""},e.handleInputChange=e.handleInputChange.bind(Object(d.a)(e)),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"handleInputChange",value:function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,a=t.name;this.props.itemChange(function(){return n}),this.setState(Object(s.a)({},a,n))}},{key:"render",value:function(){return i.a.createElement("div",{className:"editFields"},i.a.createElement("label",null,"Thumbnail Text: ",i.a.createElement("input",{className:"titleInput",type:this.props.type,name:"title",value:this.props.currentTitle,onChange:this.handleInputChange})))}}]),t}(i.a.Component),S=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(h.a)(t).call(this))).handleInputChange=e.handleInputChange.bind(Object(d.a)(e)),e.state={options:[]},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"handleInputChange",value:function(e){var t=this.state.options[e.target.value].value;this.props.itemChange(function(){return t})}},{key:"componentDidMount",value:function(){var e=this.props.options.map(function(e){return"object"!==typeof e?{value:e}:e});this.setState({options:e})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"keuzeLijst"},this.state.options.map(function(t,n){return i.a.createElement("div",{className:"keuzeGroep"},void 0!==t.item?t.item:i.a.createElement("p",null,t.value.replace(/_/g," ")),i.a.createElement("input",{type:"radio",style:{display:"inline-block"},checked:e.props.currentChoise===t.value,name:"template",value:n,onClick:e.handleInputChange}))}))}}]),t}(i.a.Component),T=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(h.a)(t).call(this))).browserGeschikt()&&(e.inputRef=i.a.createRef(),e.chooseTemplate=e.chooseTemplate.bind(Object(d.a)(e)),e.handleInputChange=e.handleInputChange.bind(Object(d.a)(e)),e.draw=e.draw.bind(Object(d.a)(e)),e.scrollHandler=e.scrollHandler.bind(Object(d.a)(e)),e.mouseMoveEvent=e.mouseMoveEvent.bind(Object(d.a)(e)),e.dowloaden=e.dowloaden.bind(Object(d.a)(e)),e.getStepAction=e.getStepAction.bind(Object(d.a)(e)),e.executeAfterLoading=e.executeAfterLoading.bind(Object(d.a)(e)),e.handleResize=e.handleResize.bind(Object(d.a)(e)),e.changeItemsValue=e.changeItemsValue.bind(Object(d.a)(e)),e.state={template:"Standaard",steps:[{action:p.CHOOSETEMPLATE}],step:0,fields:null,images:[],fileNameCode:"",drawCode:function(){},canvasWidth:1,verhouding:"16:9"},e.mouseX=null,e.mouseY=null),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"handleResize",value:function(e){var t=this;this.setState({canvasWidth:.6*window.innerWidth},function(e){return t.draw(t.state.images,t.state.drawCode,t.state.fields,t.state.canvasWidth)})}},{key:"componentDidMount",value:function(){this.chooseTemplate(this.state.template),window.addEventListener("resize",this.handleResize),this.handleResize()}},{key:"componentWillUnmount",value:function(){window.addEventListener("resize",null)}},{key:"chooseTemplate",value:function(e){var t=new E,n=(t=t[e]).images.map(function(e){var t=new Image;return t.src=e,t}),a=this.createSteps(t.fields);this.setState({template:e,steps:a,fields:t.fields,images:n,drawCode:t.code,fileName:t.fileName,downloadWidth:t.downloadWidth,verhouding:t.verhouding})}},{key:"createSteps",value:function(e){var t=Object.keys(e),n=[];return n.push({action:p.CHOOSETEMPLATE,text:v.kiesTemplate}),t.forEach(function(t){var a=e[t].steps.map(function(e){return e.key=t,e});n=n.concat(a)}),n.push({action:p.DOWNLOAD,text:v.dowload}),n}},{key:"getStep",value:function(){if(void 0!==this.state.steps[this.state.step])return this.state.steps[this.state.step]}},{key:"getStepAction",value:function(){return this.getStep().action}},{key:"getStepText",value:function(){return this.getStep().text}},{key:"getCurrentStep",value:function(){return this.state.steps[this.state.step]}},{key:"getCurrentField",value:function(){return this.state.fields[this.getCurrentStep().key]}},{key:"getTemplateOptions",value:function(){var e=new E;return e=Object.keys(e)}},{key:"getCurrentFieldValue",value:function(){return this.state.fields[this.getCurrentStep().key].value}},{key:"getVerhoudingObject",value:function(){var e=this.state.verhouding.split(":").map(function(e){return parseInt(e)});return{width:e[0],height:e[1]}}},{key:"handleInputChange",value:function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,a=t.name;this.setState(Object(s.a)({},a,n))}},{key:"draw",value:function(e,t,n,a){if(null!==this.inputRef.current){var i=this.inputRef.current.getContext("2d");this.executeAfterLoading(e.slice(),function(){return t(i,e,n,a)})}}},{key:"executeAfterLoading",value:function(e,t){var n=this;if(0!==e.length){var a=e.pop(),i=function(){return n.executeAfterLoading(e,t)};a.complete?i():a.addEventListener("load",function(){return i()})}else t()}},{key:"scrollHandler",value:function(e){var t=1.01;e.deltaY<0&&(t=.99),this.imageInfo.width*=t,this.imageInfo.height*=t,this.draw()}},{key:"mouseMoveEvent",value:function(e){var t=this;1===e.buttons&&this.getStepAction()===p.MOVEIMAGE?(null!==this.mouseX&&this.changeItemsValue(function(n){var a=n.info;return a.x-=(t.mouseX-e.clientX)/(t.state.canvasWidth/1920),a.y-=(t.mouseY-e.clientY)/(t.state.canvasWidth/1920),n}),this.mouseX=e.clientX,this.mouseY=e.clientY):(this.mouseX=null,this.mouseY=null)}},{key:"dowloaden",value:function(e){var t=this;this.setState({canvasWidth:this.state.downloadWidth},function(){t.draw(t.state.images,t.state.drawCode,t.state.fields,t.state.downloadWidth),e.toBlob(function(e){var n=URL.createObjectURL(e),a=t.state.fileName(t.state.fields);if(window.navigator.msSaveBlob)window.navigator.msSaveBlob(t.inputRef.current.msToBlob(),a);else{var i=document.createElement("a");document.body.appendChild(i),i.href=n,i.download=a,i.click(),document.body.removeChild(i)}})})}},{key:"browserGeschikt",value:function(){return!document.documentMode}},{key:"changeItemsValue",value:function(e){var t=this.getCurrentStep().key,n=e(this.getCurrentField().value);this.setState(function(e){var a=e.fields;return a[t].value=n,{fields:a}})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"ThumbnailPage"},this.browserGeschikt()?i.a.createElement("div",null,i.a.createElement("header",null,i.a.createElement("p",{className:"uitleg"},this.getStepText()),this.getStepAction()===p.CHOOSETEMPLATE&&i.a.createElement(S,{options:this.getTemplateOptions(),currentChoise:this.state.template,itemChange:function(t){e.chooseTemplate(t(""))}}),this.getStepAction()===p.CHOOSEIMAGE&&i.a.createElement(C,{itemChange:this.changeItemsValue,currentImage:this.getCurrentFieldValue()}),this.getStepAction()===p.MOVEIMAGE&&i.a.createElement(g,{itemChange:this.changeItemsValue}),this.getStepAction()===p.CHOOSETEXT&&i.a.createElement(j,{itemChange:this.changeItemsValue,type:"text",currentTitle:this.getCurrentFieldValue()}),this.getStepAction()===p.CHOOSENUMBER&&i.a.createElement(j,{itemChange:this.changeItemsValue,type:"number",currentTitle:this.getCurrentFieldValue()}),this.getStepAction()===p.CHOOSEDATE&&i.a.createElement(j,{itemChange:this.changeItemsValue,type:"date",currentTitle:this.getCurrentFieldValue()}),this.getStepAction()===p.CHOOSEMENU&&i.a.createElement(S,{options:this.getCurrentField().options,currentChoise:this.getCurrentFieldValue(),itemChange:this.changeItemsValue}),i.a.createElement("div",{className:"editFields"},this.getStepAction()===p.DOWNLOAD&&i.a.createElement("button",{onClick:function(){return e.dowloaden(e.inputRef.current)},className:"downloadButton"},i.a.createElement("i",{className:"material-icons"},"get_app")," Download Thumbnail")),i.a.createElement("div",{className:"stepButtons"},0!==this.state.step&&i.a.createElement("button",{onClick:function(){return e.setState(function(e){return{step:e.step-1}})}},"Stap Terug"),this.getStepAction()!==p.DOWNLOAD&&i.a.createElement("button",{onClick:function(){return e.setState(function(e){return{step:e.step+1}})}},"Volgende Stap"),this.getStepAction()===p.DOWNLOAD&&i.a.createElement("button",{onClick:function(){e.setState(function(e){return{step:0}}),e.chooseTemplate(e.state.template)}},"Opnieuw"))),i.a.createElement("canvas",{style:{border:"2px solid black",cursor:this.getStepAction()===p.MOVEIMAGE&&"move"},width:this.state.canvasWidth,height:this.state.canvasWidth*this.getVerhoudingObject().height/this.getVerhoudingObject().width,onMouseMove:this.mouseMoveEvent,ref:this.inputRef}),this.draw(this.state.images,this.state.drawCode,this.state.fields,this.state.canvasWidth)):i.a.createElement("p",null,"Helaas je internetprogramma is niet geschikt voor deze website, probeer Google Chrome,Safari of Firefox bijvoorbeeld."))}}]),t}(i.a.Component);var A=function(){return i.a.createElement(T,null)},x=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function M(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(i.a.createElement(A,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");x?(!function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):M(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):M(t,e)})}}()}},[[12,1,2]]]);
//# sourceMappingURL=main.60951d7b.chunk.js.map