(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d32d2"],{"5c3a":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("dashboard-datatable")],1)],1)},r=[],i=a("94ed"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("v-card-title",{staticClass:"align-start"},[a("span",[t._v("All available university programmes ")]),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{staticClass:"table-rounded",attrs:{headers:t.headers,items:t.programmes,"item-key":"id","items-per-page":10,loading:t.loading,search:t.search,"disable-sort":""},scopedSlots:t._u([{key:"item.full_name",fn:function(e){var s=e.item;return[a("div",{staticClass:"d-flex flex-column"},[a("span",{staticClass:"d-block font-weight-semibold text--primary text-truncate"},[t._v(t._s(s.name))])])]}},{key:"item.tuition_fees",fn:function(){return[t._v(" -- ")]},proxy:!0}],null,!0)})],1)},l=[],o=(a("d3b7"),{setup:function(){var t={DAY:"primary",EVENNING:"success",AFTERNOON:"error",EXTERNAL:"warning",SPECIAL:"info"};return{headers:[{text:"PROGRAMME",value:"name"},{text:"CODE",value:"alias_code"},{text:"CAMPUS",value:"campus.name"},{text:"TUITION FEES",value:"tuition_fees"},{text:"DURATION",value:"years"},{text:"STUDY TIME",value:"type"}],status:{1:"DAY",2:"EVENNING",3:"AFTERNOON",4:"EXTERNAL",5:"SPECIAL"},statusColor:t,icons:{mdiSquareEditOutline:i["Kb"],mdiDotsVertical:i["jb"]}}},data:function(){return{programmes:[],loading:!0,search:""}},created:function(){this.fetchProgrammes()},methods:{fetchProgrammes:function(){var t=this;this.$http.get("/courses").then((function(e){console.log(e.data[0]),t.programmes=e.data})).finally((function(){t.loading=!1}))}}}),c=o,u=a("2877"),d=a("6544"),f=a.n(d),m=a("b0af"),h=a("99d9"),p=a("8fea"),b=a("2fa4"),v=a("8654"),g=Object(u["a"])(c,n,l,!1,null,null,null),E=g.exports;f()(g,{VCard:m["a"],VCardTitle:h["d"],VDataTable:p["a"],VSpacer:b["a"],VTextField:v["a"]});var x={components:{DashboardDatatable:E},setup:function(){var t={statTitle:"Total Profit",icon:i["Hb"],color:"success",subtitle:"Weekly Project",statistics:"$25.6k",change:"+42%"},e={statTitle:"Refunds",icon:i["gb"],color:"secondary",subtitle:"Past Month",statistics:"$78",change:"-15%"},a={statTitle:"New Project",icon:i["Bb"],color:"primary",subtitle:"Yearly Project",statistics:"862",change:"-18%"},s={statTitle:"Sales Quries",icon:i["xb"],color:"warning",subtitle:"Last week",statistics:"15",change:"-18%"};return{totalProfit:t,totalSales:e,newProject:a,salesQueries:s}}},T=x,y=a("62ad"),N=a("0fd9"),w=Object(u["a"])(T,s,r,!1,null,null,null);e["default"]=w.exports;f()(w,{VCol:y["a"],VRow:N["a"]})}}]);
//# sourceMappingURL=chunk-2d0d32d2.8b0ba371.js.map