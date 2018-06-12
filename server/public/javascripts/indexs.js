window.onload = function(){
    /*为左侧导航菜单的parentLI元素添加事件处理程序*/
    var EventUtil = {
        addHandler : function(element,type,handler){
            if(element.addEventListener){
                element.addEventListener(type,handler,false);
            }else if(element.attachEvent){
                element.attachEvent("on"+type,handler);
            }else{
                element["on"+type] = handler;
            }
        },
        removeHandler : function(element,type,handler){
            if(element.removeEventListener){
                element.removeEventListener(type,handler,false);
            }else if(element.detachEvent){
                element.detachEvent("on"+type,handler);
            }else{
                element["on"+type] = null;
            }
        },
        getEvent : function(event){
            return event ? event : window.event;
        },
        getTarget:function(event){
            return event.target || event.srcElement;
        },
        preventDefault : function(event){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue  = false;
            }
        },
        stopPropagation : function(event){
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        }

    };
    /*获取parentLI元素,由于IE8以下版本不支持getElementsByClassName,所以要做兼容性处理!*/
    var parentLI = document.getElementsByClassName('parentLI');
    /*var events = EventUtil.getEvent(event);*/
    var currentHeight = 0;
    var changeHeight = function(index){
        var childUL = document.getElementsByClassName('childUL');
        var targetElement = childUL[index];
        /*获取当前元素下所有的li子元素的个数和li的高度,用来计算下拉的高度*/
        var liCount = targetElement.children.length;
        var liElement = targetElement.children[0];
        var liHeight = document.defaultView.getComputedStyle(liElement,null).height || liElement.currentStyle.height;
        var numHeight = liHeight.replace(/[^0-9]/ig, "");
        var sumHeight = numHeight*liCount;
        var targetElementHeight = document.defaultView.getComputedStyle(targetElement,null).height || targetElement.currentStyle.height;
        if(targetElementHeight === "0px"){
            currentHeight = 0;
            setTimeout(function(){
                var InterTime = setInterval(function () {
                    currentHeight+=10;
                    if(currentHeight>sumHeight){
                        currentHeight = sumHeight;
                        clearInterval(InterTime);
                    }
                    childUL[index].style.height = currentHeight+'px';
                },50);
            },100);
        }else{
            currentHeight = sumHeight;
             setTimeout(function(){
                var InterTime = setInterval(function () {
                    currentHeight-=10;
                    if(currentHeight<0){
                        currentHeight = 0;
                        clearInterval(InterTime);
                    }
                    childUL[index].style.height = currentHeight+'px';
                },50);
            },100);
        }
    };
    var handle = function(events){
        /*console.log(events.target.id);*/
        var index = events.target.id;
        /*改变childUL的高度*/
        changeHeight(index);
    };
    /*为parentLI添加事件处理函数*/
    for(var i =0;i<parentLI.length;i++){
        EventUtil.addHandler(parentLI[i],"click",handle);
    }

    //用ajax请求后端页面，实现局部刷新
    function ajaxConstructionObject(method,url,data){
       this.method = method;
       this.url = url;
       this.data = data;
    }
    ajaxConstructionObject.prototype.ajaxHtml = function(){
        var xhr = new XMLHttpRequest();
        xhr.open(this.method,this.url,true);
         xhr.onreadystatechange =  function (){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    return xhr.responseText
                }
            }
        };
        xhr.send(this.data);
    };
        //为childUL中的每一条链接添加事件处理函数;
         var childUL = document.getElementsByClassName('childUL');
         for(var j = 0;j<childUL.length;j++){
             childUL[j].onclick= function(event){
                 //获取当前点击的a标签的链接,然后传给ajax的请求函数
                 event = EventUtil.getEvent(event);
                 console.log(EventUtil.getTarget(event));
                 var elementTarget = EventUtil.getTarget(event);
                 if(elementTarget.dataset.url){
                     var response = new ajaxConstructionObject('GET',elementTarget.dataset.url,null).ajaxHtml();
                     console.log(response);
                 }
                 /*阻止事件冒泡*/
                 EventUtil.stopPropagation(event);
                 /*释放内存*/
                 childUL = null;
             };
         }

};