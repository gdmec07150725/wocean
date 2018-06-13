//用ajax请求后端页面，实现局部刷新
function Ajax(obj) {
    /*做兼容性处理*/
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var str = '';
    for (var attr in obj['data']) {
        //遍历传入的数据data：{}
        str += attr + '=' + obj['data'][attr] + '&';//属性=属性值 并以&连接
    }
    str = str.replace(/&$/, "");//把最后一个&替换为空

    if (obj['type'].toLowerCase() === 'get') {
        if (obj['data'] === undefined) {
            xhr.open('get', obj['url'], true);
        } else {
            xhr.open('get', obj['url'] + "?" + str, true);
        }
        xhr.send();
    } else {
        xhr.open('post', obj['url'], true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');//post类型要加这句话，数据转换为form格式，死记
        xhr.send(str);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = xhr.responseText;
                obj['success'](data);
            } else {
                obj['error']();
            }
        }
    }
}