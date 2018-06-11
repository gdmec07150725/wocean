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

};