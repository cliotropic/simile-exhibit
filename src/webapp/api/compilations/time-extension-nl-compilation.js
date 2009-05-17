﻿

/* compile-prolog.js */
window.Exhibit_TimeExtension_isCompiled=true;


/* time-extension.js */
(function(){var G=("Exhibit_TimeExtension_isCompiled" in window)&&window.Exhibit_TimeExtension_isCompiled;
Exhibit.TimeExtension={params:{bundle:true}};
var H=["timeline-view.js"];
var B=["timeline-view.css"];
var F={bundle:Boolean};
if(typeof Exhibit_TimeExtension_urlPrefix=="string"){Exhibit.TimeExtension.urlPrefix=Exhibit_TimeExtension_urlPrefix;
if("Exhibit_TimeExtension_parameters" in window){SimileAjax.parseURLParameters(Exhibit_TimeExtension_parameters,Exhibit.TimeExtension.params,F);
}}else{var D=SimileAjax.findScript(document,"/time-extension.js");
if(D==null){SimileAjax.Debug.exception(new Error("Failed to derive URL prefix for Simile Exhibit Time Extension code files"));
return ;
}Exhibit.TimeExtension.urlPrefix=D.substr(0,D.indexOf("time-extension.js"));
var F={bundle:Boolean};
SimileAjax.parseURLParameters(D,Exhibit.TimeExtension.params,F);
}var A=[];
var C=[];
if(!("Timeline" in window)){A.push("http://api.simile-widgets.org/timeline/2.3.1/timeline-api.js?bundle=true");
}if(Exhibit.TimeExtension.params.bundle){A.push(Exhibit.TimeExtension.urlPrefix+"time-extension-bundle.js");
C.push(Exhibit.TimeExtension.urlPrefix+"time-extension-bundle.css");
}else{SimileAjax.prefixURLs(A,Exhibit.TimeExtension.urlPrefix+"scripts/",H);
SimileAjax.prefixURLs(C,Exhibit.TimeExtension.urlPrefix+"styles/",B);
}for(var E=0;
E<Exhibit.locales.length;
E++){A.push(Exhibit.TimeExtension.urlPrefix+"locales/"+Exhibit.locales[E]+"/time-locale.js");
}if(!G){SimileAjax.includeJavascriptFiles(document,"",A);
SimileAjax.includeCssFiles(document,"",C);
}})();


/* time-extension-bundle.js */
Exhibit.TimelineView=function(E,F){this._div=E;
this._uiContext=F;
this._settings={};
this._accessors={getEventLabel:function(A,B,C){C(B.getObject(A,"label"));
},getProxy:function(A,B,C){C(A);
},getColorKey:null,getIconKey:null};
this._selectListener=null;
this._largestSize=0;
var D=this;
this._listener={onItemsChanged:function(){D._reconstruct();
}};
F.getCollection().addListener(this._listener);
};
Exhibit.TimelineView._intervalChoices=["millisecond","second","minute","hour","day","week","month","year","decade","century","millennium"];
Exhibit.TimelineView._settingSpecs={"topBandHeight":{type:"int",defaultValue:75},"topBandUnit":{type:"enum",choices:Exhibit.TimelineView._intervalChoices},"topBandPixelsPerUnit":{type:"int",defaultValue:200},"bottomBandHeight":{type:"int",defaultValue:25},"bottomBandUnit":{type:"enum",choices:Exhibit.TimelineView._intervalChoices},"bottomBandPixelsPerUnit":{type:"int",defaultValue:200},"timelineHeight":{type:"int",defaultValue:400},"timelineConstructor":{type:"function",defaultValue:null},"colorCoder":{type:"text",defaultValue:null},"iconCoder":{type:"text",defaultValue:null},"selectCoordinator":{type:"text",defaultValue:null},"showHeader":{type:"boolean",defaultValue:true},"showSummary":{type:"boolean",defaultValue:true},"showFooter":{type:"boolean",defaultValue:true}};
Exhibit.TimelineView._accessorSpecs=[{accessorName:"getProxy",attributeName:"proxy"},{accessorName:"getDuration",bindings:[{attributeName:"start",type:"date",bindingName:"start"},{attributeName:"end",type:"date",bindingName:"end",optional:true}]},{accessorName:"getColorKey",attributeName:"marker",type:"text"},{accessorName:"getColorKey",attributeName:"colorKey",type:"text"},{accessorName:"getIconKey",attributeName:"iconKey",type:"text"},{accessorName:"getEventLabel",attributeName:"eventLabel",type:"text"},{accessorName:"getHoverText",attributeName:"hoverText",type:"text"}];
Exhibit.TimelineView.create=function(F,G,H){var E=new Exhibit.TimelineView(G,Exhibit.UIContext.create(F,H));
Exhibit.TimelineView._configure(E,F);
E._internalValidate();
E._initializeUI();
return E;
};
Exhibit.TimelineView.createFromDOM=function(H,I,J){var G=Exhibit.getConfigurationFromDOM(H);
var F=new Exhibit.TimelineView(I!=null?I:H,Exhibit.UIContext.createFromDOM(H,J));
Exhibit.SettingsUtilities.createAccessorsFromDOM(H,Exhibit.TimelineView._accessorSpecs,F._accessors);
Exhibit.SettingsUtilities.collectSettingsFromDOM(H,Exhibit.TimelineView._settingSpecs,F._settings);
Exhibit.TimelineView._configure(F,G);
F._internalValidate();
F._initializeUI();
return F;
};
Exhibit.TimelineView._configure=function(D,E){Exhibit.SettingsUtilities.createAccessors(E,Exhibit.TimelineView._accessorSpecs,D._accessors);
Exhibit.SettingsUtilities.collectSettings(E,Exhibit.TimelineView._settingSpecs,D._settings);
var F=D._accessors;
D._getDuration=function(A,B,C){F.getProxy(A,B,function(H){F.getDuration(H,B,C);
});
};
};
Exhibit.TimelineView.prototype.dispose=function(){this._uiContext.getCollection().removeListener(this._listener);
this._timeline=null;
if(this._selectListener!=null){this._selectListener.dispose();
this._selectListener=null;
}this._toolboxWidget.dispose();
this._toolboxWidget=null;
this._dom.dispose();
this._dom=null;
this._div.innerHTML="";
this._div=null;
this._uiContext.dispose();
this._uiContext=null;
};
Exhibit.TimelineView.prototype._internalValidate=function(){if("getColorKey" in this._accessors){if("colorCoder" in this._settings){this._colorCoder=this._uiContext.getExhibit().getComponent(this._settings.colorCoder);
}if(this._colorCoder==null){this._colorCoder=new Exhibit.DefaultColorCoder(this._uiContext);
}}if("getIconKey" in this._accessors){this._iconCoder=null;
if("iconCoder" in this._settings){this._iconCoder=this._uiContext.getExhibit().getComponent(this._settings.iconCoder);
}}if("selectCoordinator" in this._settings){var D=exhibit.getComponent(this._settings.selectCoordinator);
if(D!=null){var C=this;
this._selectListener=D.addListener(function(A){C._select(A);
});
}}};
Exhibit.TimelineView.prototype._initializeUI=function(){var C=this;
var D={};
D.colorGradient=(this._colorCoder!=null&&"_gradientPoints" in this._colorCoder);
D.iconMarkerGenerator=function(A){elmt=document.createElement("img");
elmt.src=A;
elmt.style.verticalAlign="middle";
return elmt;
};
this._div.innerHTML="";
this._dom=Exhibit.ViewUtilities.constructPlottingViewDom(this._div,this._uiContext,this._settings.showSummary&&this._settings.showHeader,{onResize:function(){C._timeline.layout();
}},D);
this._toolboxWidget=Exhibit.ToolboxWidget.createFromDOM(this._div,this._div,this._uiContext);
this._eventSource=new Timeline.DefaultEventSource();
this._reconstruct();
};
Exhibit.TimelineView.prototype._reconstructTimeline=function(U){var h=this._settings;
if(this._timeline!=null){this._timeline.dispose();
}if(U){this._eventSource.addMany(U);
}var Y=this._dom.plotContainer;
if(h.timelineConstructor!=null){this._timeline=h.timelineConstructor(Y,this._eventSource);
}else{Y.style.height=h.timelineHeight+"px";
Y.className="exhibit-timelineView-timeline";
var b=Timeline.ClassicTheme.create();
b.event.bubble.width=this._uiContext.getSetting("bubbleWidth");
b.event.bubble.height=this._uiContext.getSetting("bubbleHeight");
var f,Z;
if(h.topBandUnit!=null||h.bottomBandUnit!=null){if(Exhibit.TimelineView._intervalLabelMap==null){Exhibit.TimelineView._intervalLabelMap={"millisecond":Timeline.DateTime.MILLISECOND,"second":Timeline.DateTime.SECOND,"minute":Timeline.DateTime.MINUTE,"hour":Timeline.DateTime.HOUR,"day":Timeline.DateTime.DAY,"week":Timeline.DateTime.WEEK,"month":Timeline.DateTime.MONTH,"year":Timeline.DateTime.YEAR,"decade":Timeline.DateTime.DECADE,"century":Timeline.DateTime.CENTURY,"millennium":Timeline.DateTime.MILLENNIUM};
}if(h.topBandUnit==null){Z=Exhibit.TimelineView._intervalLabelMap[h.bottomBandUnit];
f=Z-1;
}else{if(h.bottomBandUnit==null){f=Exhibit.TimelineView._intervalLabelMap[h.topBandUnit];
Z=f+1;
}else{f=Exhibit.TimelineView._intervalLabelMap[h.topBandUnit];
Z=Exhibit.TimelineView._intervalLabelMap[h.bottomBandUnit];
}}}else{var a=this._eventSource.getEarliestDate();
var e=this._eventSource.getLatestDate();
var X=e.getTime()-a.getTime();
var g=this._eventSource.getCount();
if(X>0&&g>1){var S=g/X;
var f=Timeline.DateTime.MILLENNIUM;
while(f>0){var d=Timeline.DateTime.gregorianUnitLengths[f];
var R=S*d/h.topBandPixelsPerUnit;
if(R<0.01){break;
}f--;
}}else{f=Timeline.DateTime.YEAR;
}Z=f+1;
}var V=[Timeline.createBandInfo({width:h.topBandHeight+"%",intervalUnit:f,intervalPixels:h.topBandPixelsPerUnit,eventSource:this._eventSource,theme:b}),Timeline.createBandInfo({width:h.bottomBandHeight+"%",intervalUnit:Z,intervalPixels:h.bottomBandPixelsPerUnit,eventSource:this._eventSource,overview:true,theme:b})];
V[1].syncWith=0;
V[1].highlight=true;
this._timeline=Timeline.create(Y,V,Timeline.HORIZONTAL);
}var W=this;
var T=function(A){if(W._selectListener!=null){W._selectListener.fire({itemIDs:[A]});
}};
for(var c=0;
c<this._timeline.getBandCount();
c++){this._timeline.getBand(c).getEventPainter().addOnSelectListener(T);
}};
Exhibit.TimelineView.prototype._reconstruct=function(){var m=this;
var n=this._uiContext.getCollection();
var p=this._uiContext.getDatabase();
var d=this._settings;
var c=this._accessors;
var AA=n.countRestrictedItems();
var l=[];
this._dom.legendWidget.clear();
this._eventSource.clear();
if(AA>0){var z=n.getRestrictedItems();
var x=(this._accessors.getColorKey!=null);
var y=(this._accessors.getIconKey!=null&&this._iconCoder!=null);
var r=(this._accessors.getHoverText!=null);
var u={mixed:false,missing:false,others:false,keys:new Exhibit.Set()};
var k={mixed:false,missing:false,others:false,keys:new Exhibit.Set()};
var AB=[];
var j=function(A,B,F,D,C){var E;
c.getEventLabel(A,p,function(H){E=H;
return true;
});
var G=new Timeline.DefaultEventSource.Event({id:A,eventID:A,start:B.start,end:B.end,instant:B.end==null,text:E,description:"",icon:D,color:F,textColor:F,hoverText:C});
G._itemID=A;
G.getProperty=function(H){return p.getObject(this._itemID,H);
};
G.fillInfoBubble=function(J,I,H){m._fillInfoBubble(this,J,I,H);
};
AB.push(G);
};
z.visit(function(I){var H=[];
m._getDuration(I,p,function(J){if("start" in J){H.push(J);
}});
if(H.length>0){var F=null;
var B=null;
var G=null;
if(x){var A=new Exhibit.Set();
c.getColorKey(I,p,function(J){A.add(J);
});
F=m._colorCoder.translateSet(A,u);
}var B=null;
if(y){var C=new Exhibit.Set();
c.getIconKey(I,p,function(J){C.add(J);
});
B=m._iconCoder.translateSet(C,k);
}if(r){var E=new Exhibit.Set();
c.getHoverText(I,p,function(J){E.add(J);
});
for(var D in E._hash){G=D;
}}for(var D=0;
D<H.length;
D++){j(I,H[D],F,B,G);
}}else{l.push(I);
}});
if(x){var f=this._dom.legendWidget;
var g=this._colorCoder;
var q=u.keys.toArray().sort();
if(this._colorCoder._gradientPoints!=null){f.addGradient(this._colorCoder._gradientPoints);
}else{for(var h=0;
h<q.length;
h++){var AC=q[h];
var i=g.translate(AC);
f.addEntry(i,AC);
}}if(u.others){f.addEntry(g.getOthersColor(),g.getOthersLabel());
}if(u.mixed){f.addEntry(g.getMixedColor(),g.getMixedLabel());
}if(u.missing){f.addEntry(g.getMissingColor(),g.getMissingLabel());
}}if(y){var f=this._dom.legendWidget;
var v=this._iconCoder;
var q=k.keys.toArray().sort();
if(d.iconLegendLabel!=null){f.addLegendLabel(d.iconLegendLabel,"icon");
}for(var h=0;
h<q.length;
h++){var AC=q[h];
var e=v.translate(AC);
f.addEntry(e,AC,"icon");
}if(k.others){f.addEntry(v.getOthersIcon(),v.getOthersLabel(),"icon");
}if(k.mixed){f.addEntry(v.getMixedIcon(),v.getMixedLabel(),"icon");
}if(k.missing){f.addEntry(v.getMissingIcon(),v.getMissingLabel(),"icon");
}}var t=AA-l.length;
if(t>this._largestSize){this._largestSize=t;
this._reconstructTimeline(AB);
}else{this._eventSource.addMany(AB);
}var o=this._timeline.getBand(0);
var w=o.getCenterVisibleDate();
var s=this._eventSource.getEarliestDate();
var AD=this._eventSource.getLatestDate();
if(s!=null&&w<s){o.scrollToCenter(s);
}else{if(AD!=null&&w>AD){o.scrollToCenter(AD);
}}}this._dom.setUnplottableMessage(AA,l);
};
Exhibit.TimelineView.prototype._select=function(K){var J=K.itemIDs[0];
var H=this._timeline.getBandCount();
for(var L=0;
L<H;
L++){var I=this._timeline.getBand(L);
var G=I.getEventSource().getEvent(J);
if(G){I.showBubbleForEvent(J);
break;
}}};
Exhibit.TimelineView.prototype._fillInfoBubble=function(E,H,G,F){this._uiContext.getLensRegistry().createLens(E._itemID,H,this._uiContext);
};


/* time-locale.js */
if(!("l10n" in Exhibit.TimelineView)){Exhibit.TimelineView.l10n={};
}Exhibit.TimelineView.l10n.viewLabel="Tijdlijn";
Exhibit.TimelineView.l10n.viewTooltip="Bekijk items op een tijdlijn";


/* compile-epilog.js */
(function(){var f=null;
if("SimileWidgets_onLoad" in window){if(typeof SimileWidgets_onLoad=="string"){f=eval(SimileWidgets_onLoad);
SimileWidgets_onLoad=null;
}else{if(typeof SimileWidgets_onLoad=="function"){f=SimileWidgets_onLoad;
SimileWidgets_onLoad=null;
}}}if(f!=null){f();
}})();
