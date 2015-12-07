"use strict";var App=React.createClass({displayName:"App",getInitialState:function(){return{}},getPath:function(e){return e=e.replace(/^\/|\/$/g,""),e.split("/")},render:function(){return React.createElement("div",{className:"mod-resource"},React.createElement(Header,{apiUrl:userData.apiUrls.nav,path:this.getPath(this.props.location.pathname),ref:"header"}),React.cloneElement(this.props.children,{ref:"child",parent:this,userData:userData}))}});
"use strict";var Header=React.createClass({displayName:"Header",currentTitle:"",getInitialState:function(){return{nav:[]}},componentDidMount:function(){var t=this.props.apiUrl;this.getNavigations(t)},getNavigations:function(t){var e=this;jQuery.get(t,function(t){if(t)try{t=JSON.parse(t),t.result&&e.setState({nav:t.result})}catch(a){}})},getTitle:function(){return this.currentTitle=$(ReactDOM.findDOMNode(this)).find("li.active > a").text(),this.currentTitle},render:function(){var t=this,e=this.state.nav.map(function(e,a){var n="";return e.url=e.id?"/nest/"+e.id+"/":"/",("nest"==t.props.path[0]||0==a&&!t.props.path[0])&&(n=e.id==t.props.path[1]?"active":"",e.id==t.props.path[1]&&(t.currentTitle=e.name)),React.createElement("li",{key:"category-"+a,className:n},React.createElement(Link,{to:e.url},e.name))});return React.createElement("nav",{className:"category"},React.createElement("ul",null,e,React.createElement("li",{key:"category-setting",className:"setting"==this.props.path[0]?"active":""},React.createElement(Link,{to:"/setting/"},"SETTING")),React.createElement("li",null,React.createElement("a",{href:window.userData.url+"/setting/"},"SETTING ww"))))}});
"use strict";var Index=React.createClass({displayName:"Index",currentNest:"",currentPage:1,count:10,getInitialState:function(){return{loading:!1,items:[],navigation:null,title:""}},getItems:function(e,t){var a=this,n=this.props.userData.apiUrls.article;n+="?format=json",n+="&field=srl,category_srl,nest_srl,title,hit,json,regdate,modate",n+="&count="+this.count,n+="&page="+t,n+=e?"&nest_id="+e:"",jQuery.get(n,function(e){try{e=JSON.parse(e),a.setState({loading:!1,items:e.result,navigation:e.navigation,title:a.props.parent.refs.header.getTitle()})}catch(t){}})},componentDidMount:function(){this.currentNest=this.props.params.nest_id,this.currentPage=this.props.location.query.page?this.props.location.query.page:1,this.setState({loading:!0}),this.getItems(this.currentNest,this.currentPage)},componentWillReceiveProps:function(e){var t=e.location.query.page?e.location.query.page:1,a=this.currentNest==e.params.nest_id;(!a||a&&this.currentPage!=t)&&(this.currentNest=e.params.nest_id,this.currentPage=t,this.setState({loading:!0}),this.getItems(this.currentNest,this.currentPage))},render:function(){var e=this,t=void 0,a=void 0,n=React.createElement("li",{className:"loading-page"},React.createElement("span",{className:"inner-circles-loader"},"loading symbol"),React.createElement("span",{className:"message"},"loading.."));return this.state.loading?t=n:this.state.items.length?(t=this.state.items.map(function(t,a){var n={backgroundImage:"url('"+e.props.userData.url_gooseAdmin+"/"+t.json.thumnail.url+"')"};return React.createElement("li",{key:a},React.createElement(Link,{to:"/article/"+t.srl+"/"},React.createElement("figure",{style:n},"image"),React.createElement("div",{className:"bd"},React.createElement("span",{className:"category-name"},t.category_name),React.createElement("strong",{className:"title"},t.title),React.createElement("div",{className:"inf"},React.createElement("span",null,React.createElement("b",null,"Ver : "+t.json.version)),React.createElement("span",null,"Update : "+t.modate),React.createElement("span",null,"Hit : "+t.hit),React.createElement("span",null,"Like : "+t.json.like)))))}),this.state.navigation&&!function(){var t=e.state.navigation,n=e.currentNest?"/nest/"+e.currentNest+"/":"/",s=e.props.location.query.keyword?"keyword="+e.props.location.query.keyword+"&":"";a=React.createElement("nav",{className:"paginate"},t.prev?React.createElement(Link,{to:n+"?"+s+"page="+t.prev.id,title:t.prev.name,className:"dir"},t.prev.name):null,t.body.map(function(e,t){var a=n+"?"+s+"page="+e.id;return e.active?React.createElement("strong",{key:"pageNav-"+t},e.name):React.createElement(Link,{to:a,key:"pageNav-"+t},e.name)}),t.next?React.createElement(Link,{to:n+"?"+s+"page="+t.next.id,title:t.next.name,className:"dir"},t.next.name):null)}()):t=React.createElement("li",{className:"noitem"},React.createElement("span",{className:"icon-close blades thick"},"loading icon"),React.createElement("span",{className:"message"},"not found item")),React.createElement("section",null,React.createElement("h1",null,this.state.title),React.createElement("ul",{className:"index"},t),a)}});
"use strict";var Setting=React.createClass({displayName:"Setting",getInitialState:function(){return{title:""}},componentDidMount:function(){this.setState({title:this.props.parent.refs.header.getTitle()})},updateFTP:function(){return log("act update ftp"),!1},render:function(){return React.createElement("section",null,React.createElement("h1",null,this.state.title),React.createElement("form",{method:"post",name:"ftpSetting",className:"setting",onsubmit:this.updateFTP},React.createElement("fieldset",null,React.createElement("legend",{className:"blind"},"ftp 설정 폼"),React.createElement("dl",{className:"first"},React.createElement("dt",null,React.createElement("label",{htmlFor:"host_name"},"Host name")),React.createElement("dd",null,React.createElement("input",{type:"text",name:"host_name",id:"host_name",maxLength:"40",size:"24",defaultValue:"",placeholder:"hostname.com"}))),React.createElement("dl",null,React.createElement("dt",null,React.createElement("label",{htmlFor:"host_id"},"ID")),React.createElement("dd",null,React.createElement("input",{type:"text",name:"host_id",id:"host_id",size:"15",maxLength:"20",defaultValue:"",placeholder:"FTP ID"}))),React.createElement("dl",null,React.createElement("dt",null,React.createElement("label",{htmlFor:"host_pw"},"Password")),React.createElement("dd",null,React.createElement("input",{type:"password",name:"host_pw",id:"host_pw",size:"15",maxLength:"20",defaultValue:"",placeholder:"FTP Password"}))),React.createElement("dl",null,React.createElement("dt",null,React.createElement("label",{htmlFor:"host_pwd"},"Location")),React.createElement("dd",null,React.createElement("input",{type:"text",name:"host_pwd",id:"host_pwd",size:"40",maxLength:"100",className:"block",defaultValue:this.props.userData.ftp.pwd,placeholder:"ftp Password"}),React.createElement("p",null,"goose가 설치된 ftp경로를 지정합니다.")))),React.createElement("nav",{className:"btn-group"},React.createElement(Link,{to:"/",className:"ui-button size-large"},"목록"),React.createElement("button",{type:"button",className:"ui-button size-large color-key","data-action":"test_ftp"},"FTP 테스트"),React.createElement("button",{type:"submit",className:"ui-button size-large color-key","data-action":"update_ftp",disabled:!0},"업데이트"))))}});
"use strict";var View=React.createClass({render:function(){return React.createElement("div",null,React.createElement("h1",null,"Hello View"))}});
"use strict";var Router=window.ReactRouter.Router,Link=window.ReactRouter.Link,Route=window.ReactRouter.Route,IndexRoute=window.ReactRouter.IndexRoute,createHashHistory=window.History.createHashHistory;ReactDOM.render(React.createElement(Router,{history:createHashHistory({queryKey:!1})},React.createElement(Route,{path:"/",component:App},React.createElement(IndexRoute,{component:Index}),React.createElement(Route,{path:"nest/:nest_id/",component:Index}),React.createElement(Route,{path:"article/:srl/",component:View}),React.createElement(Route,{path:"setting/",component:Setting}))),document.getElementById("resourceApp"));