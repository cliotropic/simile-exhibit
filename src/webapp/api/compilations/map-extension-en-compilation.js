﻿

/* compile-prolog.js */
window.Exhibit_MapExtension_isCompiled=true;


/* map-extension.js */
(function(){var G=("Exhibit_MapExtension_isCompiled" in window)&&window.Exhibit_MapExtension_isCompiled;
Exhibit.MapExtension={params:{bundle:true,service:"google"}};
var H=["map-view.js","vemap-view.js"];
var B=["map-view.css"];
var F={bundle:Boolean};
if(typeof Exhibit_MapExtension_urlPrefix=="string"){Exhibit.MapExtension.urlPrefix=Exhibit_MapExtension_urlPrefix;
if("Exhibit_MapExtension_parameters" in window){SimileAjax.parseURLParameters(Exhibit_MapExtension_parameters,Exhibit.MapExtension.params,F);
}}else{var D=SimileAjax.findScript(document,"/map-extension.js");
if(D==null){SimileAjax.Debug.exception(new Error("Failed to derive URL prefix for Simile Exhibit Map Extension code files"));
return ;
}Exhibit.MapExtension.urlPrefix=D.substr(0,D.indexOf("map-extension.js"));
SimileAjax.parseURLParameters(D,Exhibit.MapExtension.params,F);
}var A=[];
var C=[];
if(Exhibit.MapExtension.params.service=="google"){if(Exhibit.params.gmapkey){A.push("http://maps.google.com/maps?file=api&v=2&key="+Exhibit.params.gmapkey);
}else{if(Exhibit.MapExtension.params.gmapkey){A.push("http://maps.google.com/maps?file=api&v=2&key="+Exhibit.MapExtension.params.gmapkey);
}else{if(!("GMap2" in window)){A.push("http://maps.google.com/maps?file=api&v=2");
}}}}else{A.push("http://dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=5");
}if(Exhibit.MapExtension.params.bundle){A.push(Exhibit.MapExtension.urlPrefix+"map-extension-bundle.js");
C.push(Exhibit.MapExtension.urlPrefix+"map-extension-bundle.css");
}else{SimileAjax.prefixURLs(A,Exhibit.MapExtension.urlPrefix+"scripts/",H);
SimileAjax.prefixURLs(C,Exhibit.MapExtension.urlPrefix+"styles/",B);
}for(var E=0;
E<Exhibit.locales.length;
E++){A.push(Exhibit.MapExtension.urlPrefix+"locales/"+Exhibit.locales[E]+"/map-locale.js");
}if(!G){SimileAjax.includeJavascriptFiles(document,"",A);
SimileAjax.includeCssFiles(document,"",C);
}})();


/* map-extension-bundle.js */
Exhibit.MapView=function(E,F){Exhibit.MapView._initialize();
this._div=E;
this._uiContext=F;
this._settings={};
this._accessors={getProxy:function(A,B,C){C(A);
},getColorKey:null,getSizeKey:null,getIconKey:null,getIcon:null};
this._colorCoder=null;
this._sizeCoder=null;
this._iconCoder=null;
this._selectListener=null;
this._itemIDToMarker={};
var D=this;
this._listener={onItemsChanged:function(){D._reconstruct();
}};
F.getCollection().addListener(this._listener);
};
Exhibit.MapView._settingSpecs={"latlngOrder":{type:"enum",defaultValue:"latlng",choices:["latlng","lnglat"]},"latlngPairSeparator":{type:"text",defaultValue:";"},"center":{type:"float",defaultValue:[20,0],dimensions:2},"zoom":{type:"float",defaultValue:2},"scrollWheelZoom":{type:"boolean",defaultValue:true},"size":{type:"text",defaultValue:"small"},"scaleControl":{type:"boolean",defaultValue:true},"overviewControl":{type:"boolean",defaultValue:false},"type":{type:"enum",defaultValue:"normal",choices:["normal","satellite","hybrid"]},"bubbleTip":{type:"enum",defaultValue:"top",choices:["top","bottom"]},"mapHeight":{type:"int",defaultValue:400},"mapConstructor":{type:"function",defaultValue:null},"color":{type:"text",defaultValue:"#FF9000"},"colorCoder":{type:"text",defaultValue:null},"sizeCoder":{type:"text",defaultValue:null},"iconCoder":{type:"text",defaultValue:null},"selectCoordinator":{type:"text",defaultValue:null},"iconSize":{type:"int",defaultValue:0},"iconFit":{type:"text",defaultValue:"smaller"},"iconScale":{type:"float",defaultValue:1},"iconOffsetX":{type:"float",defaultValue:0},"iconOffsetY":{type:"float",defaultValue:0},"shape":{type:"text",defaultValue:"circle"},"shapeWidth":{type:"int",defaultValue:24},"shapeHeight":{type:"int",defaultValue:24},"shapeAlpha":{type:"float",defaultValue:0.7},"pin":{type:"boolean",defaultValue:true},"pinHeight":{type:"int",defaultValue:6},"pinWidth":{type:"int",defaultValue:6},"borderOpacity":{type:"float",defaultValue:0.5},"borderWidth":{type:"int",defaultValue:1},"borderColor":{type:"text",defaultValue:null},"sizeLegendLabel":{type:"text",defaultValue:null},"colorLegendLabel":{type:"text",defaultValue:null},"iconLegendLabel":{type:"text",defaultValue:null},"markerScale":{type:"text",defaultValue:null},"showHeader":{type:"boolean",defaultValue:true},"showSummary":{type:"boolean",defaultValue:true},"showFooter":{type:"boolean",defaultValue:true},"showToolbox":{type:"boolean",defaultValue:true}};
Exhibit.MapView._accessorSpecs=[{accessorName:"getProxy",attributeName:"proxy"},{accessorName:"getLatlng",alternatives:[{bindings:[{attributeName:"latlng",types:["float","float"],bindingNames:["lat","lng"]},{attributeName:"maxAutoZoom",type:"float",bindingName:"maxAutoZoom",optional:true}]},{bindings:[{attributeName:"lat",type:"float",bindingName:"lat"},{attributeName:"lng",type:"float",bindingName:"lng"},{attributeName:"maxAutoZoom",type:"float",bindingName:"maxAutoZoom",optional:true}]}]},{accessorName:"getPolygon",attributeName:"polygon",type:"text"},{accessorName:"getPolyline",attributeName:"polyline",type:"text"},{accessorName:"getColorKey",attributeName:"marker",type:"text"},{accessorName:"getColorKey",attributeName:"colorKey",type:"text"},{accessorName:"getSizeKey",attributeName:"sizeKey",type:"text"},{accessorName:"getIconKey",attributeName:"iconKey",type:"text"},{accessorName:"getIcon",attributeName:"icon",type:"url"}];
Exhibit.MapView._initialize=function(){var L=[];
var H=document.documentElement.getElementsByTagName("head");
for(var K=0;
K<H.length;
K++){var I=H[K].getElementsByTagName("link");
for(var G=0;
G<I.length;
G++){var J=I[G];
if(J.rel.match(/\bexhibit\/map-painter\b/)){Exhibit.MapView._markerUrlPrefix=J.href+"?";
}}}Exhibit.MapView._initialize=function(){};
};
Exhibit.MapView.create=function(F,G,H){var E=new Exhibit.MapView(G,Exhibit.UIContext.create(F,H));
Exhibit.MapView._configure(E,F);
E._internalValidate();
E._initializeUI();
return E;
};
Exhibit.MapView.createFromDOM=function(H,I,J){var G=Exhibit.getConfigurationFromDOM(H);
var F=new Exhibit.MapView(I!=null?I:H,Exhibit.UIContext.createFromDOM(H,J));
Exhibit.SettingsUtilities.createAccessorsFromDOM(H,Exhibit.MapView._accessorSpecs,F._accessors);
Exhibit.SettingsUtilities.collectSettingsFromDOM(H,Exhibit.MapView._settingSpecs,F._settings);
Exhibit.MapView._configure(F,G);
F._internalValidate();
F._initializeUI();
return F;
};
Exhibit.MapView._configure=function(D,E){Exhibit.SettingsUtilities.createAccessors(E,Exhibit.MapView._accessorSpecs,D._accessors);
Exhibit.SettingsUtilities.collectSettings(E,Exhibit.MapView._settingSpecs,D._settings);
var F=D._accessors;
D._getLatlng=F.getLatlng!=null?function(A,B,C){F.getProxy(A,B,function(H){F.getLatlng(H,B,C);
});
}:null;
};
Exhibit.MapView.lookupLatLng=function(S,Q,O,U,R,N){if(N==undefined){N=4;
}var T=Exhibit.ExpressionParser.parse(Q);
var L=[];
S.visit(function(B){var A=T.evaluateSingle({"value":B},{"value":"item"},"value",R).value;
if(A!=null){L.push({item:B,address:A});
}});
var V=[];
var M=new GClientGeocoder();
var P=function(){if(L.length>0){var A=L.shift();
M.getLocations(A.address,function(D){if("Placemark" in D){D.Placemark.sort(function(G,H){return H.AddressDetails.Accuracy-G.AddressDetails.Accuracy;
});
}if("Placemark" in D&&D.Placemark.length>0&&D.Placemark[0].AddressDetails.Accuracy>=N){var C=D.Placemark[0].Point.coordinates;
var B=C[1];
var E=C[0];
V.push("\t{ id: '"+A.item+"', "+O+": '"+B+","+E+"' }");
}else{var F=A.address.split(",");
if(F.length==1){V.push("\t{ id: '"+A.item+"' }");
}else{A.address=F.slice(1).join(",").replace(/^\s+/,"");
L.unshift(A);
}}P();
});
}else{U.value=V.join(",\n");
}};
P();
};
Exhibit.MapView.prototype.dispose=function(){this._uiContext.getCollection().removeListener(this._listener);
this._map=null;
if(this._selectListener!=null){this._selectListener.dispose();
this._selectListener=null;
}this._itemIDToMarker={};
if(this._settings.showToolbox){this._toolboxWidget.dispose();
this._toolboxWidget=null;
}this._dom.dispose();
this._dom=null;
this._uiContext.dispose();
this._uiContext=null;
this._div.innerHTML="";
this._div=null;
GUnload();
};
Exhibit.MapView.prototype._internalValidate=function(){var F=this._uiContext.getExhibit();
if(this._accessors.getColorKey!=null){if(this._settings.colorCoder!=null){this._colorCoder=F.getComponent(this._settings.colorCoder);
}if(this._colorCoder==null){this._colorCoder=new Exhibit.DefaultColorCoder(this._uiContext);
}}if(this._accessors.getSizeKey!=null){if(this._settings.sizeCoder!=null){this._sizeCoder=F.getComponent(this._settings.sizeCoder);
if("markerScale" in this._settings){this._sizeCoder._settings.markerScale=this._settings.markerScale;
}}}if(this._accessors.getIconKey!=null){if(this._settings.iconCoder!=null){this._iconCoder=F.getComponent(this._settings.iconCoder);
}}if("selectCoordinator" in this._settings){var E=F.getComponent(this._settings.selectCoordinator);
if(E!=null){var D=this;
this._selectListener=E.addListener(function(A){D._select(A);
});
}}};
Exhibit.MapView.prototype._initializeUI=function(){var F=this;
var E={};
E.colorGradient=(this._colorCoder!=null&&"_gradientPoints" in this._colorCoder);
E.colorMarkerGenerator=this._createColorMarkerGenerator();
E.sizeMarkerGenerator=this._createSizeMarkerGenerator();
E.iconMarkerGenerator=this._createIconMarkerGenerator();
this._div.innerHTML="";
this._dom=Exhibit.ViewUtilities.constructPlottingViewDom(this._div,this._uiContext,this._settings.showSummary&&this._settings.showHeader,{onResize:function(){F._map.checkResize();
}},E);
if(this._settings.showToolbox){this._toolboxWidget=Exhibit.ToolboxWidget.createFromDOM(this._div,this._div,this._uiContext);
}var D=this._dom.plotContainer;
D.style.height=this._settings.mapHeight+"px";
D.className="exhibit-mapView-map";
this._map=this._constructGMap(D);
this._reconstruct();
};
Exhibit.MapView.prototype._constructGMap=function(D){var F=this._settings;
if(F.mapConstructor!=null){return F.mapConstructor(D);
}else{var E=new GMap2(D);
E.setCenter(new GLatLng(F.center[0],F.center[1]),F.zoom);
E.addControl(F.size=="small"?new GSmallMapControl():new GLargeMapControl());
if(F.overviewControl){E.addControl(new GOverviewMapControl);
}if(F.scaleControl){E.addControl(new GScaleControl());
}E.enableDoubleClickZoom();
E.enableContinuousZoom();
if(F.scrollWheelZoom){E.enableScrollWheelZoom();
}E.addControl(new GMapTypeControl());
switch(F.type){case"normal":E.setMapType(G_NORMAL_MAP);
break;
case"satellite":E.setMapType(G_SATELLITE_MAP);
break;
case"hybrid":E.setMapType(G_HYBRID_MAP);
break;
}GEvent.addListener(E,"click",function(){SimileAjax.WindowManager.cancelPopups();
});
return E;
}};
Exhibit.MapView.prototype._createColorMarkerGenerator=function(){var B=this._settings.shape;
return function(A){return SimileAjax.Graphics.createTranslucentImage(Exhibit.MapView._markerUrlPrefix+"?renderer=map-marker&shape="+B+"&width=20&height=20&pinHeight=5&background="+A.substr(1),"middle");
};
};
Exhibit.MapView.prototype._createSizeMarkerGenerator=function(){var B=this._settings.shape;
return function(A){return SimileAjax.Graphics.createTranslucentImage(Exhibit.MapView._markerUrlPrefix+"?renderer=map-marker&shape="+B+"&width="+A+"&height="+A+"&pinHeight=0","middle");
};
};
Exhibit.MapView.prototype._createIconMarkerGenerator=function(){return function(B){elmt=document.createElement("img");
elmt.src=B;
elmt.style.verticalAlign="middle";
elmt.style.height="40px";
return elmt;
};
};
Exhibit.MapView.prototype._reconstruct=function(){this._map.clearOverlays();
this._dom.legendWidget.clear();
this._itemIDToMarker={};
var D=this._uiContext.getCollection().countRestrictedItems();
var C=[];
if(D>0){this._rePlotItems(C);
}this._dom.setUnplottableMessage(D,C);
};
Exhibit.MapView.prototype._rePlotItems=function(AC){var AD=this;
var k=this._uiContext.getCollection();
var AW=this._uiContext.getDatabase();
var AO=this._settings;
var AN=this._accessors;
var t=k.getRestrictedItems();
var AV={};
var z=(AN.getColorKey!=null);
var v=(AN.getSizeKey!=null);
var AI=(AN.getIconKey!=null);
var AM=(AN.getIcon!=null);
var x=(this._getLatlng!=null);
var AK=(AN.getPolygon!=null);
var w=(AN.getPolyline!=null);
var AH=AO.latlngOrder=="latlng"?function(A,B){return new GLatLng(A,B);
}:function(A,B){return new GLatLng(B,A);
};
t.visit(function(C){var E=[];
var H=[];
var L=[];
if(x){AD._getLatlng(C,AW,function(N){if(N!=null&&"lat" in N&&"lng" in N){E.push(N);
}});
}if(AK){AN.getPolygon(C,AW,function(N){if(N!=null){H.push(N);
}});
}if(w){AN.getPolyline(C,AW,function(N){if(N!=null){L.push(N);
}});
}if(E.length>0||H.length>0||L.length>0){var K=AD._settings.color;
var G=null;
if(z){G=new Exhibit.Set();
AN.getColorKey(C,AW,function(N){G.add(N);
});
K=AD._colorCoder.translateSet(G,i);
}if(E.length>0){var M=null;
if(v){M=new Exhibit.Set();
AN.getSizeKey(C,AW,function(N){M.add(N);
});
}var I=null;
if(AI){I=new Exhibit.Set();
AN.getIconKey(C,AW,function(N){I.add(N);
});
}for(var A=0;
A<E.length;
A++){var B=E[A];
var F=B.lat+","+B.lng;
if(F in AV){var J=AV[F];
J.items.push(C);
if(z){J.colorKeys.addSet(G);
}if(v){J.sizeKeys.addSet(M);
}if(AI){J.iconKeys.addSet(I);
}}else{var J={latlng:B,items:[C]};
if(z){J.colorKeys=G;
}if(v){J.sizeKeys=M;
}if(AI){J.iconKeys=I;
}AV[F]=J;
}}}for(var D=0;
D<H.length;
D++){AD._plotPolygon(C,H[D],K,AH);
}for(var D=0;
D<L.length;
D++){AD._plotPolyline(C,L[D],K,AH);
}}else{AC.push(C);
}});
var i={mixed:false,missing:false,others:false,keys:new Exhibit.Set()};
var q={mixed:false,missing:false,others:false,keys:new Exhibit.Set()};
var AE={mixed:false,missing:false,others:false,keys:new Exhibit.Set()};
var p,u=Infinity;
var AJ=function(C){var F=C.items.length;
if(!p){p=new GLatLngBounds();
}var B=AD._settings.shape;
var E=AD._settings.color;
if(z){E=AD._colorCoder.translateSet(C.colorKeys,i);
}var A=AD._settings.iconSize;
if(v){A=AD._sizeCoder.translateSet(C.sizeKeys,q);
}var I=null;
if(F==1){if(AM){AN.getIcon(C.items[0],AW,function(J){I=J;
});
}}if(AI){I=AD._iconCoder.translateSet(C.iconKeys,AE);
}var I=Exhibit.MapView._makeIcon(B,E,A,F==1?"":F.toString(),I,AD._settings);
var G=new GLatLng(C.latlng.lat,C.latlng.lng);
var D=new GMarker(G,I);
if(u>C.latlng.maxAutoZoom){u=C.latlng.maxAutoZoom;
}p.extend(G);
GEvent.addListener(D,"click",function(){D.openInfoWindow(AD._createInfoWindow(C.items));
if(AD._selectListener!=null){AD._selectListener.fire({itemIDs:C.items});
}});
AD._map.addOverlay(D);
for(var H=0;
H<C.items.length;
H++){AD._itemIDToMarker[C.items[H]]=D;
}};
for(var AP in AV){AJ(AV[AP]);
}if(z){var o=this._dom.legendWidget;
var AQ=this._colorCoder;
var s=i.keys.toArray().sort();
if(AO.colorLegendLabel!==null){o.addLegendLabel(AO.colorLegendLabel,"color");
}if(AQ._gradientPoints!=null){var AA=this._dom.legendWidget;
AA.addGradient(this._colorCoder._gradientPoints);
}else{for(var AT=0;
AT<s.length;
AT++){var y=s[AT];
var r=AQ.translate(y);
o.addEntry(r,y);
}}if(i.others){o.addEntry(AQ.getOthersColor(),AQ.getOthersLabel());
}if(i.mixed){o.addEntry(AQ.getMixedColor(),AQ.getMixedLabel());
}if(i.missing){o.addEntry(AQ.getMissingColor(),AQ.getMissingLabel());
}}if(v){var o=this._dom.legendWidget;
var AG=this._sizeCoder;
var s=q.keys.toArray().sort();
if(AO.sizeLegendLabel!==null){o.addLegendLabel(AO.sizeLegendLabel,"size");
}if(AG._gradientPoints!=null){var AX=AG._gradientPoints;
var AR=(AX[AX.length-1].value-AX[0].value)/5;
s=[];
for(var AS=0;
AS<6;
AS++){s.push(Math.floor(AX[0].value+AR*AS));
}for(var AT=0;
AT<s.length;
AT++){var y=s[AT];
var AF=AG.translate(y);
o.addEntry(AF,y,"size");
}}else{for(var AT=0;
AT<s.length;
AT++){var y=s[AT];
var AF=AG.translate(y);
o.addEntry(AF,y,"size");
}if(q.others){o.addEntry(AG.getOthersSize(),AG.getOthersLabel(),"size");
}if(q.mixed){o.addEntry(AG.getMixedSize(),AG.getMixedLabel(),"size");
}if(q.missing){o.addEntry(AG.getMissingSize(),AG.getMissingLabel(),"size");
}}}if(AI){var o=this._dom.legendWidget;
var AL=this._iconCoder;
var s=AE.keys.toArray().sort();
if(AO.iconLegendLabel!=null){o.addLegendLabel(AO.iconLegendLabel,"icon");
}for(var AT=0;
AT<s.length;
AT++){var y=s[AT];
var AB=AL.translate(y);
o.addEntry(AB,y,"icon");
}if(AE.others){o.addEntry(AL.getOthersIcon(),AL.getOthersLabel(),"icon");
}if(AE.mixed){o.addEntry(AL.getMixedIcon(),AL.getMixedLabel(),"icon");
}if(AE.missing){o.addEntry(AL.getMissingIcon(),AL.getMissingLabel(),"icon");
}}if(p&&typeof AO.zoom=="undefined"){var AU=Math.max(0,AD._map.getBoundsZoomLevel(p)-1);
AU=Math.min(AU,u,AO.maxAutoZoom);
AD._map.setZoom(AU);
}if(p&&typeof AO.center=="undefined"){AD._map.setCenter(p.getCenter());
}};
Exhibit.MapView.prototype._plotPolygon=function(M,K,I,L){var N=this._parsePolygonOrPolyline(K,L);
if(N.length>1){var O=this._settings;
var J=O.borderColor!=null?O.borderColor:I;
var P=new GPolygon(N,J,O.borderWidth,O.borderOpacity,I,O.opacity);
return this._addPolygonOrPolyline(M,P);
}return null;
};
Exhibit.MapView.prototype._plotPolyline=function(M,J,P,L){var N=this._parsePolygonOrPolyline(J,L);
if(N.length>1){var O=this._settings;
var K=O.borderColor!=null?O.borderColor:P;
var I=new GPolyline(N,K,O.borderWidth,O.borderOpacity);
return this._addPolygonOrPolyline(M,I);
}return null;
};
Exhibit.MapView.prototype._addPolygonOrPolyline=function(F,G){this._map.addOverlay(G);
var E=this;
var H=function(A){E._map.openInfoWindow(A,E._createInfoWindow([F]));
if(E._selectListener!=null){E._selectListener.fire({itemIDs:[F]});
}};
GEvent.addListener(G,"click",H);
this._itemIDToMarker[F]=G;
return G;
};
Exhibit.MapView.prototype._parsePolygonOrPolyline=function(K,H){var J=[];
var G=K.split(this._settings.latlngPairSeparator);
for(var L=0;
L<G.length;
L++){var I=G[L].split(",");
J.push(H(parseFloat(I[0]),parseFloat(I[1])));
}return J;
};
Exhibit.MapView.prototype._select=function(F){var E=F.itemIDs[0];
var D=this._itemIDToMarker[E];
if(D){D.openInfoWindow(this._createInfoWindow([E]));
}};
Exhibit.MapView.prototype._createInfoWindow=function(B){return Exhibit.ViewUtilities.fillBubbleWithItems(null,B,this._uiContext);
};
Exhibit.MapView._iconData=null;
Exhibit.MapView._markerUrlPrefix="http://service.simile-widgets.org/painter/painter?";
Exhibit.MapView._defaultMarkerShape="circle";
Exhibit.MapView._makeIcon=function(a,f,Z,X,b,h){var R=X.length*3;
var d=Math.ceil(h.shapeWidth/2)+R;
var V=h.shapeHeight;
var T=d*2;
var W=V;
if(Z>0){T=Z;
d=Math.ceil(Z/2);
W=Z;
V=Z;
h.pin=false;
}var Y=new GIcon();
var e=["renderer=map-marker","shape="+a,"alpha="+h.shapeAlpha,"width="+T,"height="+V,"background="+f.substr(1),"label="+X];
var U=["renderer=map-marker-shadow","shape="+a,"width="+T,"height="+V];
var c=[];
if(b!=null){e.push("icon="+b);
if(h.iconFit!="smaller"){e.push("iconFit="+h.iconFit);
}if(h.iconScale!=1){e.push("iconScale="+h.iconScale);
}if(h.iconOffsetX!=1){e.push("iconX="+h.iconOffsetX);
}if(h.iconOffsetY!=1){e.push("iconY="+h.iconOffsetY);
}}if(h.pin){var g=h.pinHeight;
var S=Math.ceil(h.pinWidth/2);
W+=g;
c.push("pinHeight="+g);
c.push("pinWidth="+(S*2));
Y.iconAnchor=new GPoint(d,W);
Y.imageMap=[0,0,0,V,d-S,V,d,W,d+S,V,T,V,T,0];
Y.shadowSize=new GSize(T*1.5,W-2);
Y.infoWindowAnchor=(h.bubbleTip=="bottom")?new GPoint(d,W):new GPoint(d,0);
}else{c.push("pin=false");
Y.iconAnchor=new GPoint(d,Math.ceil(W/2));
Y.imageMap=[0,0,0,V,T,V,T,0];
Y.infoWindowAnchor=new GPoint(d,0);
}Y.image=Exhibit.MapView._markerUrlPrefix+e.concat(c).join("&")+"&.png";
if(Z==0){Y.shadow=Exhibit.MapView._markerUrlPrefix+U.concat(c).join("&")+"&.png";
}Y.iconSize=new GSize(T,W);
Y.shadowSize=new GSize(T*1.5,W-2);
return Y;
};
Exhibit.VEMapView=function(E,F){this._div=E;
this._uiContext=F;
this._settings={};
this._accessors={getProxy:function(A,B,C){C(A);
},getColorKey:null,getIcon:null};
this._colorCoder=null;
var D=this;
this._listener={onItemsChanged:function(){D._reconstruct();
}};
F.getCollection().addListener(this._listener);
};
Exhibit.VEMapView._id=1;
Exhibit.VEMapView._settingSpecs={"center":{type:"float",defaultValue:[20,0],dimensions:2},"zoom":{type:"float",defaultValue:2},"size":{type:"text",defaultValue:"small"},"scaleControl":{type:"boolean",defaultValue:true},"overviewControl":{type:"boolean",defaultValue:false},"type":{type:"enum",defaultValue:"normal",choices:["normal","satellite","hybrid"]},"bubbleTip":{type:"enum",defaultValue:"top",choices:["top","bottom"]},"mapHeight":{type:"int",defaultValue:400},"mapConstructor":{type:"function",defaultValue:null},"color":{type:"text",defaultValue:"#FF9000"},"colorCoder":{type:"text",defaultValue:null},"iconScale":{type:"float",defaultValue:1},"iconOffsetX":{type:"float",defaultValue:0},"iconOffsetY":{type:"float",defaultValue:0},"shape":{type:"text",defaultValue:"circle"},"bodyWidth":{type:"int",defaultValue:24},"bodyHeight":{type:"int",defaultValue:24},"pin":{type:"boolean",defaultValue:true},"pinHeight":{type:"int",defaultValue:6},"pinWidth":{type:"int",defaultValue:6}};
Exhibit.VEMapView._accessorSpecs=[{accessorName:"getProxy",attributeName:"proxy"},{accessorName:"getLatlng",alternatives:[{bindings:[{attributeName:"latlng",types:["float","float"],bindingNames:["lat","lng"]},{attributeName:"maxAutoZoom",type:"float",bindingName:"maxAutoZoom",optional:true}]},{bindings:[{attributeName:"lat",type:"float",bindingName:"lat"},{attributeName:"lng",type:"float",bindingName:"lng"},{attributeName:"maxAutoZoom",type:"float",bindingName:"maxAutoZoom",optional:true}]}]},{accessorName:"getColorKey",attributeName:"marker",type:"text"},{accessorName:"getColorKey",attributeName:"colorKey",type:"text"},{accessorName:"getIcon",attributeName:"icon",type:"url"}];
Exhibit.VEMapView.create=function(F,G,H){var E=new Exhibit.VEMapView(G,Exhibit.UIContext.create(F,H));
Exhibit.VEMapView._configure(E,F);
E._internalValidate();
E._initializeUI();
return E;
};
Exhibit.VEMapView.createFromDOM=function(H,I,J){var G=Exhibit.getConfigurationFromDOM(H);
var F=new Exhibit.VEMapView(I!=null?I:H,Exhibit.UIContext.createFromDOM(H,J));
Exhibit.SettingsUtilities.createAccessorsFromDOM(H,Exhibit.VEMapView._accessorSpecs,F._accessors);
Exhibit.SettingsUtilities.collectSettingsFromDOM(H,Exhibit.VEMapView._settingSpecs,F._settings);
Exhibit.VEMapView._configure(F,G);
F._internalValidate();
F._initializeUI();
return F;
};
Exhibit.VEMapView._configure=function(D,E){Exhibit.SettingsUtilities.createAccessors(E,Exhibit.VEMapView._accessorSpecs,D._accessors);
Exhibit.SettingsUtilities.collectSettings(E,Exhibit.VEMapView._settingSpecs,D._settings);
var F=D._accessors;
D._getLatlng=function(A,B,C){F.getProxy(A,B,function(H){F.getLatlng(H,B,C);
});
};
};
Exhibit.VEMapView.prototype.dispose=function(){this._uiContext.getCollection().removeListener(this._listener);
this._map=null;
this._toolboxWidget.dispose();
this._toolboxWidget=null;
this._dom.dispose();
this._dom=null;
this._uiContext.dispose();
this._uiContext=null;
this._div.innerHTML="";
this._div=null;
};
Exhibit.VEMapView.prototype._internalValidate=function(){if("getColorKey" in this._accessors){if("colorCoder" in this._settings){this._colorCoder=this._uiContext.getExhibit().getComponent(this._settings.colorCoder);
}if(this._colorCoder==null){this._colorCoder=new Exhibit.DefaultColorCoder(this._uiContext);
}}};
Exhibit.VEMapView.prototype._initializeUI=function(){var H=this;
var G=this._settings;
var F="_gradientPoints" in this._colorCoder?"gradient":{markerGenerator:function(A){var B="square";
return SimileAjax.Graphics.createTranslucentImage(Exhibit.MapView._markerUrlPrefix+"?renderer=map-marker&shape="+Exhibit.MapView._defaultMarkerShape+"&width=20&height=20&pinHeight=0&background="+A.substr(1),"middle");
}};
this._div.innerHTML="";
this._dom=Exhibit.ViewUtilities.constructPlottingViewDom(this._div,this._uiContext,true,{},F);
this._toolboxWidget=Exhibit.ToolboxWidget.createFromDOM(this._div,this._div,this._uiContext);
var E=this._dom.plotContainer;
E.style.height=G.mapHeight+"px";
E.className="exhibit-mapView-map";
E.style.position="relative";
E.id="map-"+Exhibit.VEMapView._id++;
var G=this._settings;
if(G._mapConstructor!=null){this._map=G._mapConstructor(E);
}else{this._map=new VEMap(E.id);
this._map.LoadMap(new VELatLong(G.center[0],G.center[1]),G.zoom);
}this._reconstruct();
};
Exhibit.VEMapView.prototype._reconstruct=function(){var i=this;
var j=this._uiContext.getCollection();
var k=this._uiContext.getDatabase();
var a=this._settings;
var Y=this._accessors;
var t=j.countAllItems();
var s=j.countRestrictedItems();
var h=[];
this._map.DeleteAllShapeLayers();
this._dom.legendWidget.clear();
if(s>0){var q=j.getRestrictedItems();
var Z={};
var o=(this._accessors.getColorKey!=null);
var g=(this._accessors.getIcon!=null);
q.visit(function(A){var G=[];
i._getLatlng(A,k,function(H){if(H!=null&&"lat" in H&&"lng" in H){G.push(H);
}});
if(G.length>0){var C=null;
if(o){C=new Exhibit.Set();
Y.getColorKey(A,k,function(H){C.add(H);
});
}for(var E=0;
E<G.length;
E++){var F=G[E];
var D=F.lat+","+F.lng;
if(D in Z){var B=Z[D];
B.items.push(A);
if(o){B.colorKeys.addSet(C);
}}else{var B={latlng:F,items:[A]};
if(o){B.colorKeys=C;
}Z[D]=B;
}}}else{h.push(A);
}});
var m={mixed:false,missing:false,others:false,keys:new Exhibit.Set()};
var n,p=Infinity;
var f=function(J){var C=J.items.length;
var H=i._settings.shape;
var B=i._settings.color;
if(o){B=i._colorCoder.translateSet(J.colorKeys,m);
}var G=null;
if(C==1){if(g){Y.getIcon(J.items[0],k,function(K){G=K;
});
}}var G=Exhibit.VEMapView._makeIcon(H,B,C==1?"":C.toString(),G,i._settings);
var I=new VEShapeLayer();
var E=new VELatLong(J.latlng.lat,J.latlng.lng);
var A=new VEShape(VEShapeType.Pushpin,E);
var F=J.items[0];
var D=i._createDescription(J.items);
A.SetCustomIcon(G);
A.SetTitle(F);
A.SetDescription(D);
A.SetIconAnchor(E);
i._map.AddShapeLayer(I);
I.AddShape(A);
};
for(var r in Z){f(Z[r]);
}if(o){var b=this._dom.legendWidget;
var c=this._colorCoder;
var l=m.keys.toArray().sort();
if(this._colorCoder._gradientPoints!=null){b.addGradient(this._colorCoder._gradientPoints);
}else{for(var d=0;
d<l.length;
d++){var X=l[d];
var e=c.translate(X);
b.addEntry(e,X);
}}if(m.others){b.addEntry(c.getOthersColor(),c.getOthersLabel());
}if(m.mixed){b.addEntry(c.getMixedColor(),c.getMixedLabel());
}if(m.missing){b.addEntry(c.getMissingColor(),c.getMissingLabel());
}}}this._dom.setUnplottableMessage(s,h);
};
Exhibit.VEMapView.prototype._createDescription=function(F){var E=Exhibit.ViewUtilities.fillBubbleWithItems(null,F,this._uiContext);
var D=document.createElement("div");
D.appendChild(E);
return D.innerHTML;
};
Exhibit.VEMapView._iconData=null;
Exhibit.VEMapView._markerUrlPrefix="http://simile.mit.edu/painter/painter?";
Exhibit.VEMapView._defaultMarkerShape="circle";
Exhibit.VEMapView._makeIcon=function(X,c,V,Y,P){var Q=V.length*3;
var a=Math.ceil(P.bodyWidth/2)+Q;
var T=P.bodyHeight;
var S=a*2;
var U=T;
var W=new VECustomIconSpecification;
var b=["renderer=map-marker","shape="+X,"width="+S,"height="+T,"background="+c.substr(1),"label="+V];
var Z=[];
if(Y!=null){b.push("icon="+Y);
if(P.iconScale!=1){b.push("iconScale="+P.iconScale);
}if(P.iconOffsetX!=1){b.push("iconX="+P.iconOffsetX);
}if(P.iconOffsetY!=1){b.push("iconY="+P.iconOffsetY);
}}if(P.pin){var d=P.pinHeight;
var R=Math.ceil(P.pinWidth/4);
U+=d;
Z.push("pinHeight="+d);
Z.push("pinWidth="+(R*2));
}else{Z.push("pin=false");
}W.TextContent=" ";
W.Image=Exhibit.MapView._markerUrlPrefix+b.concat(Z).join("&");
W.ImageHeight=U;
W.ImageWidth=S;
return W;
};


/* map-locale.js */
if(!("l10n" in Exhibit.MapView)){Exhibit.MapView.l10n={};
}Exhibit.MapView.l10n.viewLabel="Map";
Exhibit.MapView.l10n.viewTooltip="View items on a map";


/* compile-epilog.js */
(function(){var f=null;
if("SimileWidgets_onLoad" in window){if(typeof SimileWidgets_onLoad=="string"){f=eval(SimileWidgets_onLoad);
SimileWidgets_onLoad=null;
}else{if(typeof SimileWidgets_onLoad=="function"){f=SimileWidgets_onLoad;
SimileWidgets_onLoad=null;
}}}if(f!=null){f();
}})();
