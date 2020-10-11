var href = location.href.split('?')
var data_id = href[1] - 1
var img_cnt = 1

function contentPreprocess(s) {
    var body = document.getElementById('img-style')
    var css = document.createElement("style")
    if (s.Content.includes('<img>')) {
        var str = ""
        var style = ""
        var text_arr = s.Content.split('<img>')

        for (var i = 0; i < text_arr.length; i++) {
            str = str.concat(text_arr[i])
            if (i != text_arr.length - 1) {
                str = str.concat("<div class='img img" + img_cnt + "'></div>")
                style = style.concat("#Main .img" + img_cnt + " {background-image: url('img/news/" + s.Id + "/img" + img_cnt + ".jpeg');}")
                img_cnt += 1
            }
        }
        css.innerHTML = style
        console.log(style)
        body.appendChild(css)
        return str
    }
    else {
        return s.Content
    }
}

var content = document.getElementById("Content")
// create content
var node = document.createElement("div")
node.setAttribute("id", data[data_id].Title)
node.setAttribute("class", "block")
// add title
var title = document.createElement("p")
title.setAttribute("class", "lg-title block-title")
title.innerHTML = data[data_id].Title
node.appendChild(title)
// add date
var date = document.createElement("p")
date.setAttribute("class", "xl-text block-date")
date.innerHTML = "發布日期：" + data[data_id].Date
node.appendChild(date)
// add texts
var texts = document.createElement("p")
texts.setAttribute("class", "lg-text")
texts.innerHTML = contentPreprocess(data[data_id])
node.appendChild(texts)

content.appendChild(node)