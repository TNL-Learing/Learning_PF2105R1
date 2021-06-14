//
let mHeight = 500;
let mWidth = 1000;
let mMinX = -500;
let mMaxX = 500;
let mMinY = -250;
let mMaxY = 250;
let mOx = 500;
let mOy = 250;
let mScaleX = 1;
let mScaleY = 1;
let mResolution = 5;
var canvas_frame = document.getElementById('myCanvas');
var frame_2d = undefined;

let mapPolynomialCurve = new Array();   //2 dimention arrary



function initializeDrawingFrame(){
    console.log(">>The function initializeDrawingFrame is called!")
    mHeight = 500;
    mWidth = 1000;
    mMinX = -500;
    mMaxX = 500;
    mMinY = -250;
    mMaxY = 250;
    mOx = 500;
    mOy = 250;
    mScaleX = 0.5;
    mScaleY = 0.5;
    canvas_frame = document.getElementById('myCanvas');
    if (!canvas_frame) return;
    frame_2d = canvas_frame.getContext('2d');
    drawHorizontalLine();
    drawVerticalLine();

}

function updateDrawingFrame(){
    if (!frame_2d){
        console.log(">>Error: Drawing Frame wasn't initialized!")
        return;
    }
    mOx = 0.5*(Number(mWidth) - Number(mMaxX) - Number(mMinX));
    mOy = 0.5*(-Number(mHeight) + Number(mMaxY) + Number(mMinY));
    // if (mMaxX*mMinX < 0 )
    // {
    //     mOx = mWidth*(-mMinX)/(mMaxX - mMinX);
    // }
    // else{
    //     mOx = -mMinX;
    // }
    // if (mMaxY*mMinY < 0){
    //     mOy = mHeight*(-mMinY)/(mMaxY - mMinY);
    // }
    // else{
    //     mOy = mHeight + mMinY;
    // }
    console.log("Ox =" + mOx);
    console.log("Oy =" + mOy);
}

function clearCurrentView(){
    if (!frame_2d){
        frame_2d = canvas_frame.getContext('2d');
    }
    frame_2d.clearRect(0, 0, canvas_frame.width, canvas_frame.height);
}

function drawHorizontalLine(){
    if (!frame_2d) {
        console.log(">>Error: Drawing Frame wasn't initialized!")
        return;
    }
    if (mOy < 0 || mOy> mHeight) return;
    frame_2d.beginPath();
    frame_2d.moveTo(0, mOy);
    frame_2d.lineTo(mWidth, mOy);
    frame_2d.stroke();
    frame_2d.font = "15px Arial";
    frame_2d.strokeText("x", mWidth-10, mOy+15);        
}
function drawVerticalLine(){
    if (!frame_2d){
        console.log(">>Error: Drawing Frame wasn't initialized!")
        return;
    }
    if (mOx < 0 || mOx> mHeight) return;
    frame_2d.beginPath();
    frame_2d.moveTo(mOx, 0);
    frame_2d.lineTo(mOx, mHeight);
    frame_2d.stroke();
    frame_2d.font = "15px Arial";
    frame_2d.strokeText("y", mOx+5, 0+15);       
}
function drawFrame()
{
    drawHorizontalLine();
    drawVerticalLine();
}
function drawLine(a,b,mMinX, mMinY){

}
function drawCurve(X,Y){
    if (!frame_2d){
        console.log(">>Error: Drawing Frame wasn't initialized!")
        return;
    }
    if (mOy < 0 || mOy> mHeight) return;
    length = X.length;
    if (length < 2 || length != Y.length ) return;
    frame_2d.beginPath();
    frame_2d.moveTo(X[0]*mScaleX + mOx, -(Y[0]*mScaleY - mOy));
    for (var i = 1; i<length; i++){
        frame_2d.lineTo(X[i]*mScaleX + mOx, -(Y[i]*mScaleY - mOy));
    }
    frame_2d.stroke();
}

function testDrawParabal(){
    // y = x^2 -40x - 250;
    // x: from -20 -> 20
    //delta_x = 0.5;
    let a = 0.004;
    let b = 0;
    let c = -245;
    let mMaxX = 500;
    let mMinX = -500;
    let range = mMaxX-mMinX;
    let deltaX = mResolution;
    let No_Div = range/deltaX;
    var X = new Array(No_Div + 1);
    var Y = new Array(No_Div + 1);
    var x = 0;
    var y = 0;
    for (var i =0; i<= No_Div; i++)
    {
        x = mMinX + i*deltaX;
        X[i] = x;
        Y[i] = a*x*x + b*x +c;
        //console.log("X =" +X[i] + " Y = "+Y[i]);
    }
    drawCurve(X,Y);
}

function drawAll(){
    drawHorizontalLine();
    drawVerticalLine();
    for (var i = 0; i< mapPolynomialCurve.length; i++){
        drawFunction(mapPolynomialCurve[i]);
    }
}

function drawFunction(listRatio){
    if (listRatio.length == 0) return;
    var X = new Array();
    var Y = new Array();
    if (listRatio.length == 1) //straight line:
    {
        X.push(mMinX);
        X.push(mMaxX);
        Y.push(listRatio[0]);
        Y.push(listRatio[0]);
    }
    else  if (listRatio.length == 2) //straight line:
    {
        X.push(mMinX);
        X.push(mMaxX);
        Y.push(calculate_y(listRatio, mMinX));
        Y.push(calculate_y(listRatio, mMaxX));
    }
    else{
        let range = mMaxX-mMinX;
        let deltaX = mResolution;
        let No_Div = range/deltaX;
        var X = new Array(No_Div + 1);
        var Y = new Array(No_Div + 1);
        var x = 0;
        for (var i =0; i<= No_Div; i++){
            x = Number(mMinX) + Number(i*deltaX);
            X[i] = x;
            Y[i] = calculate_y(listRatio, x);
        }
    }
    drawCurve(X,Y);
}

function calculate_y(listRatio, x){
    var result = 0;
    var maxHat = listRatio.length - 1;
    var hat = 0;
    var value = 0;
    for (var i = 0; i< listRatio.length; i++){
        hat = maxHat-i;
        value = listRatio[i]*(x**hat);
        result = Number(result)+ Number(value);
    }
    return result;
}

//function for right hand side:

function onUpdateDrawingProperties(){
    let newH = document.getElementById("property_height").value;
    let newW = document.getElementById("property_width").value;
    let newS= document.getElementById("property_scale").value;
    let newR= document.getElementById("property_resolution").value;
    var flag = false;
    if (!canvas_frame){
        canvas_frame = document.getElementById('myCanvas');
    }
    if (newH != mHeight){
        flag = true;
        mHeight = newH;
    }
    if (newW != mWidth){
        flag = true;
        mWidth = newW;
    }
    if (newS !=mScaleX){
        flag = true;
        mScaleX = newS;
        mScaleY = newS;
    }
    if (newR != mResolution)
    {
        flag = true;
        mResolution = newR;
    }
    if (!flag) return;
    clearCurrentView();
    canvas_frame.width = newW;
    canvas_frame.height = newH;
    updateDrawingFrame();
    document.getElementById("view_title").textContent = "View "+ canvas_frame.width +"px x "+ canvas_frame.height+"px";

    drawAll();
    //print results:
    // console.log("Framw width = " + canvas_frame.width);
    // console.log("Framw height = " + canvas_frame.height);
    // console.log("Scale X = " + mScaleX);
    // console.log("Scale Y = " + mScaleY);
}

function onResetDrawingProperties(){
    let height = document.getElementById("property_height");
    let width = document.getElementById("property_width");
    let resolution = document.getElementById("property_resolution");
    let scale = document.getElementById("property_scale");
    height.value = 500;
    width.value = 1000;
    resolution.value = 5;
    scale.value =  1;
    clearCurrentView();
    onUpdateDrawingProperties();
    drawAll();
}

function OnUpdateViewSpace(){
    let newFx = document.getElementById("VS_Fx").value;
    //let newTx = document.getElementById("VS_Tx").value;
    let newFy = document.getElementById("VS_Fy").value;
    //let newTy = document.getElementById("VS_Ty").value;
    var flag = false;
    if (newFx != mMinX){
        flag = true;
        mMinX = newFx;
        mMaxX = Number(newFx) + Number(mWidth);
    }
    // if (newTx != mMaxX){
    //     flag = true;
    //     mMaxX = newTx;
    // }
    if (newFy != mMinY){
        flag = true;
        mMinY = newFy;
        mMaxY = Number(newFy) + Number(mHeight);
    }
    // if (newTy != mMaxY){
    //     flag = true;
    //     mMaxY = newTy;
    // }
    if (!flag) return;
    clearCurrentView();
    updateDrawingFrame();
    drawAll();
    //print results:
    console.log("Min X = " + mMinX);
    console.log("Max X = " + mMaxX);
    console.log("Min Y = " + mMinY);
    console.log("Max Y = " + mMaxY);
}
function onResetViewSpace(){
    let FromX = document.getElementById("VS_Fx");
    //let ToX = document.getElementById("VS_Tx");
    let FromY = document.getElementById("VS_Fy");
    //let ToY = document.getElementById("VS_Ty");
    FromX.value = -500;
    //ToX.value = 500;
    FromY.value = -250;
    //ToY.value =  250;
    alert("Sorry! Currently this button is not supported!");
    return;
    clearCurrentView();
    OnUpdateViewSpace();
    drawAll();
    
}

//function for left hand side:

function onChangeSectionType(){
    var all = 5;
    var type = document.getElementById("CurveType").value;
    var id = "";
    var lRatio = ["a", "b", "c", "d", "e"];
    var maxHat = type;
    var text = "This function has form: y = ";
    var hat = 0;
    var subText = "";
    for (var  i =0; i< all; i++){
        id = "row_"+i;
        if (i <=type){      
            document.getElementById(id).style.display = "";
            hat = maxHat-i;
            subText = lRatio[i];
            if (hat == 1){
                subText += "x + ";
            }
            else if (hat > 1){
                subText += "x^"+hat+" + ";
            }
            text +=subText;
        }
        else{
            document.getElementById(id).style.display = "none";
        }
    }
    document.getElementById("func_title").textContent = text;
}

function addFunctionToList(strID){
    let list_element = document.getElementById(strID);
    var li = document.createElement("li");
    var listInputRatio = new Array();
    li.textContent = getFunction(listInputRatio);
    size = list_element.childNodes.length;
    li.setAttribute("id", strID+"_"+size);
    list_element.appendChild(li);
    console.log("Add function has id = "+li.id+" to list");
    mapPolynomialCurve.push(listInputRatio);
    drawFunction(listInputRatio);
}

function getFunction(listInputRatio){
    var id = "";
    var maxHat = document.getElementById("CurveType").value;
    var text = "y = ";
    var hat = 0;
    var subText = "";
    //listInputRatio = new Array();
    var value = 0;
    for (var  i =0; i<= maxHat; i++){
        id = "ratio_"+i;
        value = document.getElementById(id).value;
        listInputRatio.push(value);
        hat = maxHat-i;
        subText = value.toString();
        if (hat == 1){
            subText += "x + ";
        }
        else if (hat > 1){
            subText += "x^"+hat+" + ";
        }
        text +=subText;
    }
    return text;
}

function removeFunctionFromList(strID){
    let temp = document.getElementById("removePos").value;
    if (!temp){
        alert("Error: Can NOT delete because of invalid input!");
        return;
    }
    if (mapPolynomialCurve.length == 0){
        alert("Error: Can NOT delete because list functions is empty.");
        return;
    }
    if (temp <= 0 || temp > (mapPolynomialCurve.length + 1)){
        alert("Error: Input invalid value!");
        return;
    }
    let removePosition = Number(temp) - 1;

    let list_func = document.getElementById("listFunc");
    if (!list_func) return;
    if (!list_func.childNodes) return;
    
    let size = Number(list_func.childNodes.length);
    if (removePosition < 0 || removePosition >= size)
    {
        alert("Error: Can NOT delete because of invalid input!");
        return;
    }
    
    let removeID = strID + "_" + removePosition;
    
    console.log("remove id: " +removeID);
    var removeItem = document.getElementById(removeID);
    if (removeItem)
    {
        list_func.removeChild(removeItem);
    }
    else
    {
        alert("Error: Can NOT delete because of invalid input!");
        return;
    }
    var tempList = mapPolynomialCurve;
    mapPolynomialCurve = new Array();
    for (var i = 0; i< tempList.length; i++)
    {
        if (i != removePosition)
        {
            mapPolynomialCurve.push(tempList[i]);
        }
    }
    resetListChildrenID(strID);
    clearCurrentView();
    drawAll();
}
function resetListChildrenID(strID){
    let list_element = document.getElementById(strID);
    if (!list_element.childNodes) return;
    if (list_element.childNodes.length == 0) return;
    for (var i=0; i<list_element.childNodes.length; i++)
    {
      var li = list_element.childNodes[i];
      li.setAttribute("id", strID+"_"+i);
      console.log(li.id + " has content: " + li.textContent);
    }
    console.log("-----------------------------------------------");
  }