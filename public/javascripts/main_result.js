google.load("visualization", "1", {packages: ["corechart"]});
google.setOnLoadCallback(init);
function init() {
    getResult();
    }
function getResult() {
    var s = window.location.pathname;
    s = s.split('/');
    var n = s[1];
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/getResult', true);
    var data = JSON.stringify({id: n});
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var t = JSON.parse(xhr.response);
                parseResult(t);
                span(t.count);
            }
            if (xhr.status == 202) {
                alert(xhr.responseText);
                var url = window.location.pathname;
                url = url.substring(0, url.length - 2);
                document.location.href = "http://localhost:3000" + url;
            }
            if (xhr.status == 203) {
                alert(xhr.responseText);
                document.location.href = "http://localhost:3000";
            }
        }
    }
};

function span(count){
    var obj = document.createElement('div');
    obj.innerHTML = '<span style="color: black; font-size: 22pt; font-family: fantasy; margin-left: 46%;">Всего голосов: '+count+'</span>';
    document.body.appendChild(obj);

    var obj = document.createElement('div');
    obj.innerHTML = '<span style="font-family: cursive; font-style: italic; color: deeppink;">*Если ответ не отображается, значит за него никто ещё не проголосовал</span>';
    document.body.appendChild(obj);
    }
function parseResult(t){
    var temp = t.votes;
    var quest = t.quest;
    var data = [];
    for(i=0;i<temp.length;i++){
    data[i] = [];
    data[i][0] = temp[i][0];
    data[i][1] = temp[i][1];
    }
    drawChart(quest,data);

    }


function drawChart(quest,data) {
    var data = google.visualization.arrayToDataTable(data);
    var options = {
    title: quest
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
    };