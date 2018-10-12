import CommonSpaceManager from'./commonspacemanager';import{priorityList}from'../_internal/schedular';import{getMouseCoordinate,componentFactory,isIE}from'../_internal/lib/lib';import Toolbox from'../_internal/tool-box/toolbox';import TreeMapDS from'../_internal/datasets/treemap';import _ref from'./treemap.helper';import{getDep}from'../_internal/dependency-manager';import datasetFactory from'../_internal/factories/singleseries-dataset';import{_manageLegendSpace,manageGradientLegendSpace}from'../_internal/common-chart-api/legend-spacemanager.js';import legendItemFactory from'../_internal/factories/legend';import createColorRangeManager from'../_internal/factories/colorrange';import decideLegendCreation from'../_internal/factories/legendmanager';import mousetrackerFactory from'../_internal/factories/mouse-tracker';import raphaelShapesButton from'../_internal/redraphael/redraphael-shapes/redraphael-shapes.button';let Raphael=getDep('redraphael','plugin'),mathRound=Math.round,MOUSEOUT='fc-mouseout',TRACKER_FILL='rgba(255,0,0,'+(isIE?.002:1e-6)+')';raphaelShapesButton(Raphael),Raphael.addSymbol({backIcon:function(a,b,c){var d=c-1,e=a,f=b+d,g=e,h=f-d/2,i=g+d,j=h,k=j-d;return['M',a,b-d,'L',a-d,b,e,f,g,h,i,j,i,k,i-d,k,'Z']},homeIcon:function(a,b,c){var d=c-1,e=2*d,f=a-d,g=b,h=f+e/6,i=h,j=b+d,k=i+e/4,l=j,m=k,n=l-d/2,o=m+e/6,p=n+d/2,q=o+e/4,r=p,s=r-d;return['M',a,b-d,'L',f,g,h,g,i,j,k,l,m,n,o,n,o,p,q,r,q,s,q+e/6,s,'Z']}});class TreeMap extends CommonSpaceManager{static getName(){return'TreeMap'}constructor(){super(),this.hasGradientLegend=!0,this.addToEnv('ref',_ref()),this.registerFactory('legend',legendItemFactory),this.registerFactory('legend',decideLegendCreation,['canvas']),this.registerFactory('colormanager-decider',createColorRangeManager,['legend']),this.registerFactory('mouseTracker',mousetrackerFactory),this.registerFactory('dataset',datasetFactory,['vCanvas'])}getName(){return'TreeMap'}__setDefaultConfig(){super.__setDefaultConfig(),this.config.enablemousetracking=!0,this.config.skipCanvasDrawing=!0,this.config.valuefontbold=0}configureAttributes(a){var b=this;b.config.skipConfigureIteration={},b.config.valuesset=!1,b.parseChartAttr(a),b.createComponent(a),b.setTooltipStyle(),b.configureChildren(),b._createToolBox()}mouseoutHandler(a,b,c){let d=this,e=d.config.datasetOrder||d.getDatasets(),f=d.getChildren('mouseTracker')[0];e[b]._firePlotEvent(MOUSEOUT,c,a),delete f._lastDatasetIndex,delete f._lastPointIndex}_mouseEvtHandler(a,b){let c,d,e,f,g,h=this,k=b.mouseTracker,m=a.originalEvent,n=h.config,o=n.canvasLeft,p=n.canvasRight,q=n.canvasBottom,r=n.canvasTop,s=n.datasetOrder||h.getDatasets(),t=getMouseCoordinate(h.getFromEnv('chart-container'),m,h),u=t.chartX,v=t.chartY,w=!1,x=s.length,y=k._lastDatasetIndex,z=k._lastPointIndex;if(u>o&&u<p&&v>r&&v<q||h.config.plotOverFlow)for(;x--&&!w;)c=s[x],c&&(d=c._getHoveredPlot&&c._getHoveredPlot(u,v),d&&d.hovered&&(w=!0,d.datasetIndex=x,g=k.getMouseEvents(a,d.datasetIndex,d.pointIndex)));if((!w||g&&g.fireOut)&&void 0!==y&&s[y]&&s[y]._firePlotEvent&&(g&&!g.events.length?k.mouseoutTimer=setTimeout(function(){h.mouseoutHandler(a,y,z)},20):(h.mouseoutHandler(a,y,z),clearTimeout(k.mouseoutTimer))),w)for(f=g.events&&g.events.length,f&&(k._lastDatasetIndex=d.datasetIndex,z=k._lastPointIndex=d.pointIndex),e=0;e<f;e+=1)c&&c._firePlotEvent&&c._firePlotEvent(g.events[e],z,a)}_checkInvalidSpecificData(){let a=this.getFromEnv('dataSource');if(!a.data)return!0}addData(){var a=this.getFromEnv('ref'),b=a.algorithmFactory,c=Array.prototype.slice.call(arguments,0);c.unshift('addData'),c.unshift(this._getCleanValue()),b.realTimeUpdate.apply(this,c)}removeData(){var a=this.getFromEnv('ref'),b=a.algorithmFactory,c=Array.prototype.slice.call(arguments,0);c.unshift('deleteData'),c.unshift(this._getCleanValue()),b.realTimeUpdate.apply(this,c)}triggerKDTreePartioning(){var a=this.getDatasets()[0];a.addJob('partitioning',a.kdTreePartioning.bind(a),priorityList.tracker)}resetSingleTracker(){var a=this.getDatasets()[0],b=a&&a.graphics&&a.graphics.singleTracker;b&&b.attr({x:0,y:0,width:0,height:0,stroke:'rgba(255,255,255,0)',"fill-opacity":0})}_manageLegendSpace(){_manageLegendSpace.call(this)}manageGradientLegendSpace(a){return manageGradientLegendSpace.call(this,a)}flushKDTree(){var a=this.getDatasets()[0];a.kdTree={}}_createToolBox(){this.getFromEnv('chartMenuTools').reset(this.getFromEnv('toolbox'),this);var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q=this,r=q.getFromEnv('chartMenuTools'),s=q.getFromEnv('chartInstance').id,t=r.get,u=r.set,v=this.components,w=q.config,x=q.getChildren('chartMenuBar'),y=q.getChildren('actionBar'),z=w.printOption.enabled;x&&x.drawn||y&&y.drawn||(componentFactory(q,Toolbox,'tb',1,[{graphics:q.graphics||(q.graphics={}),chart:q,components:v}]),a=q.getChildren('tb')[0],o=a.getICount(),q.addToEnv('toolbox',a),!q.getFromEnv('toolBoxAPI')&&q.addToEnv('toolBoxAPI',a.getAPIInstances(a.config.ALIGNMENT_HORIZONTAL)),f=q.getFromEnv('toolBoxAPI'),l=f.SymbolWithContext,j=f.SymbolStore,k=f.ComponentGroup,m=f.Toolbar,a.idCount=a.idCount||0,a.pId=o,c=a.getDefaultConfiguration(),j.register('ContextIcon',function(a,b,c){var d=a,e=b,f=2*c,g=mathRound(f/4),h=.7*mathRound(f/2),i=d-h,j=d+h,k=e+g,l=e-g;return['M',i,e,'L',j,e,'M',i,k,'L',j,k,'M',i,l,'L',j,l]}),p=new l,p.configure('ContextIcon',a.idCount++,o,s),p.addToEnv('toolTipController',q.getFromEnv('toolTipController')),b=p,d=b.getListRefernce(),q.addToEnv('chartMenuList',d),z&&u([{Print:{handler:function(a){q.getFromEnv('chartInstance').print(a)},action:'click'}}]),d.appendAsList(t()),e=new k,e.configure(a.idCount++,o,s),e.setConfiguaration({buttons:c,group:{fill:TRACKER_FILL,borderColor:TRACKER_FILL}}),g=f.Symbol,h=new g,h.configure('homeIcon',!1,a.idCount++,a.pId,s),h.addToEnv('toolTipController',q.getFromEnv('toolTipController')),i=new g,i.configure('backIcon',!1,(a.idCount=a.idCount||0,a.idCount++),a.pId,s),i.addToEnv('toolTipController',q.getFromEnv('toolTipController')),e.addSymbol(b),e.addSymbol(h,!0),e.addSymbol(i,!0),'t'===e.config.btnConfig.vAlign?(n=new m,x=q.attachChild(n,'chartMenuBar',!1),n.configure(a.idCount++,a.pId,s),x.addComponent(e)):(n=new m,x=q.attachChild(n,'actionBar',!1),n.configure(a.idCount++,a.pId,s),x.addComponent(e)),q.addToEnv('toolbarBtns',{back:i,home:h}))}_getCleanValue(){let a=this.getFromEnv('number-formatter');return function(b){return a.getCleanValue(b)}}getDSdef(){return TreeMapDS}}export default TreeMap;