import Line from'./line';import{pluck,pluckNumber,HUNDREDSTRING,getDashStyle}from'../lib/lib';import{addDep}from'../dependency-manager';import multiaxisAnimation from'../animation-rules/multiaxis-animation';addDep({name:'multiAxislineAnimation',type:'animationRule',extension:multiaxisAnimation});class MultiAxisDataset extends Line{getType(){return'dataset'}getName(){return'multiaxisline'}configure(a){return!!a&&void(this.trimData(a),this.config.JSONData=a,super.configure(a))}parseAttributes(){var a,b,c=this,d=c.config.JSONData,e=c.config,f=c.getFromEnv('chart-attrib'),g=c.getFromEnv('axisData');super.parseAttributes(),e.linethickness=pluckNumber(d.linethickness,g.linethickness,f.linethickness,2),e.lineDashLen=pluckNumber(d.linedashlen,g.linedashlen,f.linedashlen,5),e.lineDashGap=pluckNumber(d.linedashgap,g.linedashgap,f.linedashgap,4),e.alpha=pluckNumber(d.alpha,g.linealpha,f.linealpha,HUNDREDSTRING),e.linecolor=pluck(d.color,g.linecolor,g.color,f.linecolor,e.plotColor),e.legendSymbolColor='line'===c.getName()?e.lineColor:e.plotFillColor,b=pluckNumber(d.dashed,g.linedashed,f.linedashed),a=getDashStyle(e.lineDashLen,e.lineDashGap),e.anchorbordercolor=pluck(d.anchorbordercolor,d.color,g.color,f.anchorbordercolor,e.lineColor,e.plotColor),e.lineDashStyle=b?a:'none'}}export default MultiAxisDataset;