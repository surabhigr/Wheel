// wheel load and sound

function WheelLoad() {
    // var x = data[3];
    //document.getElementById("demo").innerHTML = x;
    data = [];

    data.push([36, document.getElementById("tb0").value, 325]);
    data.push([36, document.getElementById("tb1").value, 289]);
    data.push([36, document.getElementById("tb2").value, 253]);
    data.push([36, document.getElementById("tb3").value, 217]);
    data.push([36, document.getElementById("tb4").value, 181]);
    data.push([36, document.getElementById("tb5").value, 145]);
    data.push([36, document.getElementById("tb6").value, 109]);
    data.push([36, document.getElementById("tb7").value, 73]); // ...
    data.push([36, document.getElementById("tb8").value, 36]); // this arc is from 37 to 72 degrees
    data.push([36, document.getElementById("tb9").value, 0]); // This arc is from 0 to 36 degrees
    //for (var a = 0; a < newData.length; a++) {
    //	var newVal = newData[a];
    //var newValA =newVal.replace("selection", document.getElementById('tb'+a).value;
    //data.splice(a, 1, newValA);
    var newData = new Array();
    for (var g = 0; g < data.length; g++) {
        var reDraw = data[g][1];
        if (reDraw == "") {
            data.splice(g, 1);
        }
    }

    angle = 360 / data.length;

    canvas = document.getElementById("piechart");
    var context = canvas.getContext("2d");
    for (var i = 0; i < data.length; i++) {
        drawSegment(canvas, context, i);
    }
    //}
    var x = data.length;
    document.getElementById("demo").innerHTML = x;
}

function Load2() {
    data = [];
    var data2 = new Array();

    for(var i=0; i<=9; i++){
      data2.push(document.getElementById("tb" + i).value.toString().trim().substring(0, 16));

    }
    /*

    data2.push(document.getElementById("tb0").value.toString().trim().substring(0, 16));
    data2.push(document.getElementById("tb1").value.toString().trim().substring(0, 16));
    data2.push(document.getElementById("tb2").value.toString().trim().substring(0, 16));
    data2.push(document.getElementById("tb3").value.toString().trim().substring(0, 16));
    data2.push(document.getElementById("tb4").value);
    data2.push(document.getElementById("tb5").value);
    data2.push(document.getElementById("tb6").value);
    data2.push(document.getElementById("tb7").value); // ...
    data2.push(document.getElementById("tb8").value); // this arc is from 37 to 72 degrees
    data2.push(document.getElementById("tb9").value); // This arc is from 0 to 36 degrees
    */
    //for (var a = 0; a < newData.length; a++) {
    //	var newVal = newData[a];
    //var newValA =newVal.replace("selection", document.getElementById('tb'+a).value;
    //data.splice(a, 1, newValA);
    var newData = new Array();
    for (var g = 0; g < data2.length; g++) {
        var reDraw = data2[g];
        if (reDraw != "") {
            newData.push(reDraw);
            //data.splice(g,1);
        }
    }

    angle = 360 / newData.length;

var newAngle = 360;
var angleArray = new Array();
for (var sd = 0; sd < newData.length; sd++) {

newAngle = newAngle - angle;
angleArray.push(newAngle);
}

for (var d = 0; d < newData.length; d++) {

newAngle = newAngle + angle;
data.push([angle, newData[d], angleArray[d]])


}

    canvas = document.getElementById("piechart");
    var context = canvas.getContext("2d");
    for (var i = 0; i < data.length; i++) {
        drawSegment(canvas, context, i);
    }
    //}
    var x = data.toString();
    document.getElementById("demo").innerHTML = x;


}



function play(){
var audio = document.getElementById("audio");
audio.play();
         }
