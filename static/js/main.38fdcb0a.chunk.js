(this.webpackJsonp3b1b_chess=this.webpackJsonp3b1b_chess||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(3),l=a.n(i),o=(a(14),a(4)),s=a(5),c=a(6),u=a(1),h=a(8),d=a(7),b=(a(15),function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;Object(s.a)(this,a),(n=t.call(this,e)).state={board:[],bits:[],target_bits:[],selection:!1};for(var r=0;r<8;r++)for(var i=0;i<8;i++)n.state.board.push({x:i,y:r,color:Boolean((9*r+i+1)%2),flipped:Boolean(Math.floor(2*Math.random())),greenHighlight:!1,orangeHighlight:!1,blueHighlight:!1});return n.registerClick=n.registerClick.bind(Object(u.a)(n)),n.getCurrentValue=n.getCurrentValue.bind(Object(u.a)(n)),n.selectGroup=n.selectGroup.bind(Object(u.a)(n)),n.handleChange=n.handleChange.bind(Object(u.a)(n)),n.calculate=n.calculate.bind(Object(u.a)(n)),n.clearHighlights=n.clearHighlights.bind(Object(u.a)(n)),n.enterSelectionMode=n.enterSelectionMode.bind(Object(u.a)(n)),n.randomizeTiles=n.randomizeTiles.bind(Object(u.a)(n)),n.setAllCoins=n.setAllCoins.bind(Object(u.a)(n)),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.getCurrentValue()}},{key:"registerClick",value:function(e,t){if(this.state.selection)this.setState({selection:!1,target_bits:(8*t+e).toString(2).padStart(6,"0")}),setTimeout(this.calculate,50);else{var a=this.state.board;a[8*t+e].flipped=!a[8*t+e].flipped,this.setState({board:a}),this.getCurrentValue()}}},{key:"getParity",value:function(e){return e.reduce((function(e,t){return e+(t.flipped?1:0)}),0)%2}},{key:"selectGroup",value:function(e,t){switch(e){case 0:return t.filter((function(e){return(8*e.y+e.x)%2===1}));case 1:return t.filter((function(e){return[2,3,6,7].includes((8*e.y+e.x)%8)}));case 2:return t.filter((function(e){return(8*e.y+e.x)%8>=4}));case 3:return t.filter((function(e){return(e.y+8*e.x)%2===1}));case 4:return t.filter((function(e){return[2,3,6,7].includes((e.y+8*e.x)%8)}));case 5:return t.filter((function(e){return(e.y+8*e.x)%8>=4}));default:return[]}}},{key:"getCurrentValue",value:function(){for(var e=[],t=0;t<6;t++)e.unshift(this.getParity(this.selectGroup(t,this.state.board)));this.setState({bits:e}),setTimeout(this.calculate,25)}},{key:"calculate",value:function(){if(6===this.state.target_bits.length){this.clearHighlights();for(var e=[],t=0;t<6;t++)this.state.bits[t].toString()===this.state.target_bits[t]?e.push(0):e.push(1);var a=parseInt(e.join(""),2),n=parseInt(this.state.target_bits,2),r=this.state.board;console.log(a),console.log(n),r[a].greenHighlight=!0,r[n].blueHighlight=!0,this.setState({board:r})}}},{key:"clearHighlights",value:function(){var e=this.state.board;e.forEach((function(e){return e.greenHighlight=!1})),e.forEach((function(e){return e.orangeHighlight=!1})),e.forEach((function(e){return e.blueHighlight=!1})),this.setState(e)}},{key:"enterSelectionMode",value:function(){this.setState({selection:!0})}},{key:"setAllCoins",value:function(){for(var e=this.state.board,t=0;t<64;t++)e[t].flipped=0;this.setState({board:e}),setTimeout(this.getCurrentValue,50)}},{key:"randomizeTiles",value:function(){for(var e=this.state.board,t=0;t<64;t++)e[t].flipped=Math.floor(2*Math.random());this.setState({board:e}),setTimeout(this.getCurrentValue,50)}},{key:"handleChange",value:function(e){this.setState(Object(o.a)({},e.target.id,e.target.value)),setTimeout(this.getCurrentValue,50)}},{key:"getBackgroundColor",value:function(e){return e.blueHighlight?"#5555ff":e.color?"#555555":"#333333"}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"sidebar"},r.a.createElement("h2",null,"3Blue1Brown Chessboard Puzzle"),r.a.createElement("hr",null),r.a.createElement("br",null),r.a.createElement("button",{onClick:this.randomizeTiles},"Randomize Coins"),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(){e.setAllCoins()}},"Set All Coins to Heads"),r.a.createElement("h3",null,"Current Encoded Position"),r.a.createElement("div",{className:"textarea-container"},r.a.createElement("textarea",{rows:1,cols:6,maxLength:6,disabled:!0,value:this.state.bits.join(""),id:"current-position"})),r.a.createElement("hr",null),r.a.createElement("br",null),r.a.createElement("h3",null,"Position to Encode"),r.a.createElement("button",{onClick:this.enterSelectionMode,id:"selection-mode-button"},"Select Tile"),r.a.createElement("div",{className:"textarea-container"},r.a.createElement("textarea",{id:"target_bits",rows:1,cols:6,maxLength:6,onChange:this.handleChange,value:this.state.target_bits})),r.a.createElement("hr",null),r.a.createElement("h3",null,"Explanation"),r.a.createElement("p",null,"The tile in ",r.a.createElement("span",{style:{color:"orange"}},"orange")," is the tile that is currently encoded by the state of the board. When you input a position to encode, either by typing in the binary or by clicking the button then a tile, that position will show in ",r.a.createElement("span",{style:{color:"#5555ff"}},"blue")," a coin will show up in ",r.a.createElement("span",{style:{color:"green"}},"green.")," When you flip that coin, the state of the board will change to the requested position."),r.a.createElement("hr",null),r.a.createElement("h3",null,"Videos"),r.a.createElement("iframe",{src:"https://www.youtube.com/embed/as7Gkm7Y7h4",frameBorder:"0",allow:"accelerometer; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,title:"standupmaths"}),r.a.createElement("iframe",{src:"https://www.youtube.com/embed/wTJI_WuZSwE",frameBorder:"0",allow:"accelerometer; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,title:"3b1b"})),r.a.createElement("div",{id:"board-container"},r.a.createElement("div",{id:"board"},this.state.board.map((function(t){return r.a.createElement("div",{className:"tile",onClick:function(){return e.registerClick(t.x,t.y)},style:{backgroundColor:e.getBackgroundColor(t),outline:8*t.y+t.x===parseInt(e.state.bits.join(""),2)&&"3px solid orange"},key:8*t.y+t.x},r.a.createElement("div",{className:"coin",style:{backgroundColor:t.flipped?"#222222":"#999999",border:t.greenHighlight&&"3px dashed green"}}))})))))}}]),a}(r.a.Component));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root"))},9:function(e,t,a){e.exports=a(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.38fdcb0a.chunk.js.map