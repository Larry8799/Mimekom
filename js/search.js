// var request = new XMLHttpRequest();
// request.open("GET", "../data.json", false);
// request.send(null)
// var data = JSON.parse(request.responseText);
var nowPage = 1
var pageNum = 1
var showBlock = 5
var lastUpdate = data[data.length - 1].Date
var nowList = []
var keyword = ""

// console.log(lastUpdate)
// add last Update
var last_update_node = document.getElementById("last-update")
last_update_node.innerHTML = "更新日期 | " + lastUpdate

function getUl() {
    return document.getElementById("myUl")
}

function contentPreprocess(s) {
    if (s.Content.includes('<img>')) {
        var str = ""
        var text_arr = s.Content.split('<img>')
        for (var i = 0; i < text_arr.length; i++) {
            str = str.concat(text_arr[i])
        }
        return str
    }
    else {
        return s.Content
    }
}

function addCustomThumb(id) {
    var body = document.getElementById('custom-thumb')
    var css = document.createElement("style")
    css.innerHTML = "#Main .thumbnail.custom-thumb {\
        background-image: url('img/news/" + id + "/thumb.jpeg');\
    }"
    body.appendChild(css)
}

function newLi(s) {
    var node = document.createElement("a")
    node.setAttribute("id", s.Title)
    node.setAttribute("class", "block")
    node.setAttribute("href", "new_page.html?" + s.Id)

    var thumbnail = document.createElement("div")
    if (s.Thumbnail) {
        thumbnail.setAttribute("class", "thumbnail default")
    }
    else {
        thumbnail.setAttribute("class", "thumbnail custom-thumb")
        addCustomThumb(s.Id)
    }
    node.appendChild(thumbnail)

    var texts = document.createElement("div")
    texts.setAttribute("class", "texts")
    node.appendChild(texts)

    var title = document.createElement("p")
    title.setAttribute("class", "md-title block-title")
    title.innerHTML = s.Title
    texts.appendChild(title)
    // mobile-version title demo
    var m_title = document.createElement("p")
    m_title.setAttribute("class", "md-title block-title-m")
    if (s.Title.length > 16) {
        m_title.innerHTML = s.Title.substring(0, 15) + '...'
    } else {
        m_title.innerHTML = s.Title
    }
    texts.appendChild(m_title)

    var date = document.createElement("p")
    date.setAttribute("class", "lg-text block-date")
    date.innerHTML = s.Date
    texts.appendChild(date)

    var content = document.createElement("p")
    content.setAttribute("class", "md-text demo-text")
    content.innerHTML = contentPreprocess(s).substring(0, 120) + '...'
    texts.appendChild(content)
    // mobile-version content demo
    var m_content = document.createElement("p")
    m_content.setAttribute("class", "md-text demo-text-m")
    m_content.innerHTML = contentPreprocess(s).substring(0, 70) + '...'
    texts.appendChild(m_content)
    return node
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId)
    element.parentNode.removeChild(element)
}

function loadPage() {
    var ul = getUl()
    var body = document.getElementById('custom-thumb')
    body.innerHTML = ''
    ul.innerHTML = ''

    var keyData = []
    console.log("now searching " + keyword)
    for (var i = 0; i < data.length; i++) {
        if (data[i].Title.includes(keyword) || data[i].Tags.includes(keyword)) {
            keyData.push(data[i])
            console.log("find" + data[i].Title)
        }
    }

    nowList = []

    // handling page
    for (var i = (nowPage - 1) * showBlock; i < (nowPage) * showBlock && i < keyData.length; i++) {
        nowList.push(keyData[i])
        // adding decorating lines
        var line = document.createElement("div")
        line.setAttribute("class", "top-line line")
        ul.appendChild(line)
        // add content
        ul.appendChild(newLi(keyData[i]))
        // adding decorating lines
        var line = document.createElement("div")
        line.setAttribute("class", "bot-line line")
        ul.appendChild(line)
    }

    // get new page number
    pageNum = Math.ceil(keyData.length / showBlock)
    // remove existing child
    var element = document.getElementById("Change-page");
    element.innerHTML = ''
    // add new child
    for (var i = 1; i <= pageNum; i++) {
        var node = document.createElement("a")
        node.setAttribute("class", "page-btn")
        node.setAttribute("id", i)
        node.setAttribute("href", '#Title')
        node.innerHTML = i
        // node.setAttribute("class", "page-btn")
        element.appendChild(node)
    }
    // add event listener for new added btn
    var elements = document.getElementsByClassName('page-btn');

    Array.from(elements).forEach(function (element) {
        element.addEventListener('click', myFunction);
    });
}

document.getElementById('search').addEventListener('input', function () {
    // console.log("search", this.value)
    if (!this.value) {
        keyword = ""
    }
    else {
        keyword = this.value
    }
    loadPage()
});

var myFunction = function () {
    var pageId = jQuery(this).attr("id");
    // console.log("page", pageId)
    nowPage = pageId
    loadPage()
}
loadPage()
// document.getElementsByClassName('page-btn').addEventListener('click', function () {
//     var pageId = jQuery(this).attr("id");
//     console.log("page", pageId)
//     nowList = pageId
//     loadPage()
// });