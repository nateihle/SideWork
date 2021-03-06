//#############################################
//#                                           #                          
//#                  GLOBALS                  #
//#                                           #
//############################################# 

var frameType = 
{
	left: 1,
	right: 2,
	middle: 3,
	full: 4,
}
var unitsType = 
{
	metric: 1,
	standard: 2,
}

var DoorColorArray = 
["gold",
"black",
"silver"];

var ImageRepoStrings = [
["brown_door.jpg", "brown_left.jpg", "brown_right.jpg", "brown_middle.jpg"],
["black_door.jpg", "black_left.jpg", "black_right.jpg", "black_middle.jpg"],
["silver_door.jpg", "silver_left.jpg", "silver_right.jpg", "silver_middle.jpg"]
];

var DoorHeightArray = [
[67, "67\" Tall"],
[75, "75\" Tall"],
[79, "79\" Tall"]
];

var DoorWidthArray = [
[24, "24\" Wide"],
[26, "26\" Wide"],
[28, "28\" Wide"],
[30, "30\" Wide"],
[33, "33\" Wide"],
[36, "36\" Wide"]
];

var DoorInfo = [
[1, [[1, 1, "FULL-FLANGED"]]],
[2, [[1, 2, "FULL-FLANGED"]]],
[3, [[1, 3, "FULL-FLANGED"]]],
[4, [[1, 4, "FULL-FLANGED"]]],
[5, [[1, 5, "FULL-FLANGED"]]],
[6, [	[2, "3,3", "L/R"], 
		[2, "4,2", "L/R"]]],
[7, [[2, "3,4", "L/R"]]],
[8, [[2, "4,4", "L/R"]]],
[9, [[2, "5,4", "L/R"]]],
[10, [	[2, "5,5", "L/R"], 
		[3, "4,4,2", "L/C/R"]]],
[11, [[3, "4,3,4", "L/C/R"]]],
[12, [[3, "4,4,4", "L/C/R"]]],
[13, [[3, "5,4,4", "L/C/R"]]],
[14, [	[3, "5,5,4", "L/C/R"],
		[4, "4,4,4,2", "L/C/C/R"]]],
[15, [	[3, "5,5,5", "L/C/R"],
		[4, "4,4,4,3", "L/C/C/R"]]],
[16, [[4, "4,4,4,4", "L/C/C/R"]]],
[17, [	[4, "5,4,3,5", "L/C/C/R"],
		[4, "4,4,4,5", "L/C/C/R"]]],
[18, [	[4, "5,5,5,3", "L/C/C/R"],
		[5, "4,4,4,4,2", "L/C/C/C/R"]]],
[19, [	[4, "5,5,5,4", "L/C/C/R"],
		[5, "4,4,4,4,3", "L/C/C/C/R"]]],
[20, [	[4, "5,5,5,5", "L/C/C/R"],
		[5, "4,4,4,4,4", "L/C/C/C/R"]]],
[21, [	[5, "5,5,3,3,5", "L/C/C/C/R"],
		[5, "4,4,4,4,5", "L/C/C/C/R"]]],
[22, [	[5, "5,4,4,4,5", "L/C/C/C/R"],
		[6, "4,4,4,4,4,2", "L/C/C/C/C/R"]]],
[23, [	[5, "5,5,3,5,5", "L/C/C/C/R"],
		[6, "4,4,4,4,4,3", "L/C/C/C/C/R"]]],
[24, [	[5, "5,5,4,5,5", "L/C/C/C/R"],
		[6, "4,4,4,4,4,4", "L/C/C/C/C/R"]]],
];

var visualWidth = 0;
var colorSelection = 0;
var ImageRepo = new Array();
var MasterWidth = 1100;
var Units = unitsType.standard;

var NumDoorsArray = [];

function populateDropDown(elementName, array, index)
{
	var elementContainer = document.getElementById(elementName);
	for(i in array) 
	{
		var opt = array[i][index];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		elementContainer.appendChild(el);
	}
}

function populateDropDown2(elementName, array)
{
	var elementContainer = document.getElementById(elementName);
	for(i in array) 
	{
		var opt = array[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		elementContainer.appendChild(el);
	}
}

function populateDNArray()
{
	for(i=0; i<24; i++)
	{
		NumDoorsArray[NumDoorsArray.length] = [NumDoorsArray.length, (NumDoorsArray.length + 1).toString() + " Door" + (i>0?"s":"")];
	}
}

function setTableWidth()
{
	var table = document.getElementById("table1");
	table.width = MasterWidth+"px";
}

//#############################################
//#                                           #                          
//#                  MAIN                     #
//#                                           #
//############################################# 

function main()
{
	setTableWidth();
	populateDNArray();
	populateDropDown("doorHeight", DoorHeightArray, 1);
	populateDropDown("doorWidth", DoorWidthArray, 1);
	populateDropDown("numDoors", NumDoorsArray, 1);
	populateDropDown2("color", DoorColorArray);
	pricingMain();
	numDoorsChanged();
	updateVisuals();
}

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function changeDivStr(element, str)
{
	var elementContainer = document.getElementById(element);
	elementContainer.textContent = str;
	elementContainer.value = str;
}

function colorChanged()
{
	colorSelection = document.getElementById("color").selectedIndex;
	updateVisuals();
}

function numDoorsChanged()
{
	var index = document.getElementById("numDoors").selectedIndex;
	removeOptions(document.getElementById("frameConfig"));
	populateDropDown("frameConfig", DoorInfo[index][1], 1);
	frameTypeChanged();
	
}

function frameTypeChanged()
{
	var i = document.getElementById("numDoors").selectedIndex;
	var j = document.getElementById("frameConfig").selectedIndex;
	changeDivStr("numFrames", DoorInfo[i][1][j][0] + " Frame" + (DoorInfo[i][1][j][0] > 1 ? "s" : ""));
	changeDivStr("frameString", DoorInfo[i][1][j][2]);
	unitsChanged();
}

function getRemStr(rem)
{
	if(rem >= 0.90625) return "15/16";
	else if(rem >= 0.84375) return "7/8";
	else if(rem >= 0.78125) return "13/16";
	else if(rem >= 0.71875) return "3/4";
	else if(rem >= 0.65625) return "11/16";
	else if(rem >= 0.59375) return "5/8";
	else if(rem >= 0.53125) return "9/16";
	else if(rem >= 0.46875) return "1/2";
	else if(rem >= 0.40625) return "7/16";
	else if(rem >= 0.34375) return "3/8";
	else if(rem >= 0.28125) return "5/16";
	else if(rem >= 0.21875) return "1/4";
	else if(rem >= 0.15625) return "3/16";
	else if(rem >= 0.09375) return "1/8";
	else if(rem >= 0.03125) return "1/16";
	else return "";
}

function getFootString(inches)
{
	var ft = Math.floor(inches / 12);
	var str = "";
	var rem_inches = inches - (ft * 12);
	var rem_str = getRemStr(rem_inches - Math.floor(rem_inches));
	var inchesZero = (Math.floor(rem_inches)==0?1:0);
	var remZero = (rem_str==""?1:0);
	if(ft > 0)
	{
		str += ft + "'  " + (inchesZero?"":Math.floor(rem_inches).toString()) + ((!inchesZero && !remZero)?"-":"") + rem_str + "\"";
	}
	return str;
}

function calcFrameWidth(numDoors, type)
{
	var k = document.getElementById("doorWidth").selectedIndex;
	var base = 568 + (k>0?81:0) + (k>1?51:0) + (k>2?38:0) + (k>3?67:0) + (k>4?74:0);
	var total = (numDoors * base) + (35 * numDoors);
	switch(type)
	{
	case frameType.left:
	case frameType.right:
		total += 15 + 35.0/2;
		break;
	case frameType.mid:
		total += 15 + 15;
		break;
	case frameType.full:
		total += 35;
		break;
	}
	if(Units == unitsType.standard)
	{
		var totalInches = total / 25.4;
		return getFootString(totalInches);
	}
	else
	{
		return total.toString()+" mm";
	}
}

function unitsChanged()
{
	var unitsSel = document.getElementById("units").selectedIndex;
	if(unitsSel == 0)
	{
		Units = unitsType.standard;
	}
	else
	{
		Units = unitsType.metric;
	}
	doorWidthChanged();
}

function doorWidthChanged()
{
	var i = document.getElementById("numDoors").selectedIndex;
	var j = document.getElementById("frameConfig").selectedIndex;
	var k = document.getElementById("doorWidth").selectedIndex;
	var numFrames = DoorInfo[i][1][j][0];
	var numDoors = i + 1;
	var base = 568 + (k>0?81:0) + (k>1?51:0) + (k>2?38:0) + (k>3?67:0) + (k>4?74:0);
	var totalWidth = (base * numDoors) + (35.0 * (numDoors + 1)) + (30.0 * (numFrames - 1));
	var totalWidthInches = totalWidth / 25.4;
	if(Units == unitsType.standard)
	{
		changeDivStr("totalWidth", getFootString(totalWidthInches));
	}
	else
	{
		changeDivStr("totalWidth", totalWidth + "mm" );
	}
    updateVisuals();
    updateCost();
}

//#############################################
//#                                           #                          
//#                  VISUALS                  #
//#                                           #
//#############################################  

var globalHeight = 0;

function addImage(filename, isfirst)
{
	var table = document.getElementById("visualSetup");
	var image = document.createElement("img");
	image.src = filename;
	if(isfirst == true)
	{
		image.style.width = (image.naturalWidth * (scale / 100.0)) + "px";
		image.style.height = "auto";
		globalHeight = image.style.height;
	}
	else
	{
		image.style.width = "auto";
		image.style.height = (image.naturalHeight * (scale / 100.0)) + "px";
	}
	table.appendChild(image);
	visualWidth += (image.naturalWidth * (scale / 100.0));
}

function addDoor()
{
	addImage(DoorColorArray[colorSelection] + "_door.jpg", false);
}

function addLeftFrame()
{
	addImage(DoorColorArray[colorSelection] + "_left.jpg", true);
}

function addRightFrame()
{
	addImage(DoorColorArray[colorSelection] + "_right.jpg", false);
}

function addMiddleFrame()
{
	addImage(DoorColorArray[colorSelection] + "_middle.jpg", false);
}

function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

function scaleCanvas() 
{
	if(canvas.width > 1100)
	{
		canvas.style.width = "1100px"
		canvas.style.height = "auto";
	}
}

function calcScale() 
{
	var width;
	var numDoors = document.getElementById("numDoors").selectedIndex + 1;
	var i = document.getElementById("numDoors").selectedIndex;
	var j = document.getElementById("frameConfig").selectedIndex;
	var numFrames = DoorInfo[i][1][j][0];
	width = (numDoors * 201) + ((numFrames - 1) * 7) + 16
	if(width > MasterWidth)
	{
		scale = (MasterWidth / width) * 100.0;
	}
	else
	{
		scale = 100;
	}
	if(scale > 60)
	{
		scale = 60;
	}
}

function updateVisuals()
{
	var numDoors = document.getElementById("numDoors").selectedIndex + 1;
	var table = document.getElementById("visualSetup");
	while(table.hasChildNodes())
	{
		table.removeChild(table.firstChild);
	}
	var i = document.getElementById("numDoors").selectedIndex;
	var j = document.getElementById("frameConfig").selectedIndex;
	var numFrames = DoorInfo[i][1][j][0];
	var frameString1 = DoorInfo[i][1][j][1];
	var frameString2 = DoorInfo[i][1][j][2];
	var frmIdx1 = 0;
	var frmIdx2 = 0;

	visualWidth = 10;
	var lastX = 0;
	clearWidthLines();
	calcScale();
	addLeftFrame();
	
	for(frm = 0; frm < numFrames; frm++)
	{
		var doorsInFrame = numDoors;
		var frameWidth;
		if(frameString2[0] != 'F')
		{
			if(frm == 0)
			{
				frmIdx2 = frameString1.indexOf(",");
				valStr = frameString1.substring(0, frmIdx2);
				doorsInFrame = parseInt(valStr);
				frmIdx1 = frmIdx2 + 1;
			}
			else if(frm < numFrames - 1)
			{
				frmIdx2 = getPosition(frameString1, ",", frm + 1);
				valStr = frameString1.substring(frmIdx1, frmIdx2);
				doorsInFrame = parseInt(valStr);
				frmIdx1 = frmIdx2 + 1;
			}
			else
			{
				valStr = frameString1.substring(frmIdx1, frmIdx1 + 1);
				doorsInFrame = parseInt(valStr);
			}
		}
		for(dr = 0; dr < doorsInFrame; dr++)
		{
			addDoor();
		}

		if(frm < numFrames - 1)
		{
			if(frm == 0)
			{
				frameWidth = calcFrameWidth(doorsInFrame, frameType.left);
			}
			else
			{
				frameWidth = calcFrameWidth(doorsInFrame, frameType.mid);
			}
			var skew = 4 + Math.floor(100.0 / scale);
			console.log("skew: "+skew);
			updateWidthLines(lastX, visualWidth - skew, frameWidth);
			lastX = visualWidth - skew;
			addMiddleFrame();
		}
		else
		{
			if(numFrames == 1)
			{
				frameWidth = calcFrameWidth(doorsInFrame, frameType.full);
			}
			else
			{
				frameWidth = calcFrameWidth(doorsInFrame, frameType.right);
			}
			updateWidthLines(lastX, visualWidth - 5, frameWidth);
			lastX = visualWidth;
		}
	}
	addRightFrame();
	table.width = visualWidth.toString() + "px";
}

function clearWidthLines()
{
	var canvas = document.getElementById("widthLines");
	var context = canvas.getContext("2d");
	canvas.width = MasterWidth + 100;
	canvas.height = 50;
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function updateWidthLines(x1, x2, widthNum)
{
	var canvas = document.getElementById("widthLines");
	var context = canvas.getContext("2d");
	var padding = 1;
	var aW = 11;
	var aH = 4;
	var vH = 10;
	
	if(x1 == 0)
		x1 = 3;
	
	// line -----------
	context.beginPath();
	context.moveTo(x1 + padding, canvas.height/2);
	context.lineTo(x2 - padding, canvas.height/2);
	context.stroke();
	
	// left arrow <
	context.beginPath();
	context.moveTo(x1 + padding, 		canvas.height/2);
	context.lineTo(x1 + padding + aW, 	canvas.height/2 + aH);
	context.lineTo(x1 + padding + aW, 	canvas.height/2 - aH);
	context.fill();
	context.stroke();

	
	// right arrow <
	context.beginPath();
	context.moveTo(x2 - padding, 		canvas.height/2);
	context.lineTo(x2 - padding - aW, 	canvas.height/2 + aH);
	context.lineTo(x2 - padding - aW, 	canvas.height/2 - aH);
	context.fill();
	context.stroke();

	// left vertical line |
	context.beginPath();
	context.moveTo(x1, 		canvas.height/2 + vH);
	context.lineTo(x1, 		canvas.height/2 - vH);
	context.stroke();

	// right vertical line |
	context.beginPath();
	context.moveTo(x2, 		canvas.height/2 + vH);
	context.lineTo(x2, 		canvas.height/2 - vH);
	context.stroke();

	
	context.fillStyle = '#000';
	context.font = '12px sans-serif';
	var textStart = ((x2 - x1) / 2) - 20 + x1;
	context.fillText(widthNum, textStart, (3 * canvas.height) / 4);
}

//#############################################
//#                                           #                          
//#                  COST                     #
//#                                           #
//############################################# 

var DoorCostArray = 
[
	[[1283, 1350, 1409, 1409],
	[1399, 1464, 1556, 1556],
	[1425, 1490, 1615, 1615]],

	[[1448, 1518, 1553, 1553],
	[1543, 1741, 1787, 1787],
	[1587, 1733, 1835, 1835]],

	[[1613, 1686, 1696, 1696],
	[1687, 2018, 2018, 2018],
	[1749, 1976, 2055, 2055]],
]; 

var ShelfDepthArray = [
	[24, "24\" Deep"],
	[26, "27\" Deep"],
	[28, "36\" Deep"],
];

var AddlDepthCost = [
	[0, 109, 359],
	[0, 131, 431]
];

var OLEDLightingCost = [
	[0, 162], 
	[0, 186]
];

var FridgeTypeArray = 
[
	"Normal Temp",
	"Normal Temp, High Humidity",
	"Low Temp"
];

var LightingTypeArray = 
[
	"Normal",
	"OP45 LED"
];


var ShelfNumArray = [];

function pricingMain()
{
	populateShelfNumArray();
	populateDropDown2("fridgeType", FridgeTypeArray);
	populateDropDown("shelves", ShelfNumArray, 1);
	populateDropDown("shelfDepth", ShelfDepthArray, 1);
	populateDropDown2("lighting", LightingTypeArray, 1);
}

function populateFridgeCost()
{
    changeDivStr("totalCost", 12.5348);
}
                                    
function updateCost()
{
	var totalCost = 0;
	var t = document.getElementById("fridgeType").selectedIndex;
	var d = document.getElementById("numDoors").selectedIndex + 1;
	var w = document.getElementById("doorWidth").selectedIndex;
	var h = document.getElementById("doorHeight").selectedIndex;
	var s = document.getElementById("shelves").selectedIndex;
	var sd = document.getElementById("shelfDepth").selectedIndex;
	var l = document.getElementById("lighting").selectedIndex;

	if(w > 3)
		w = 3;

	var addlDepthCost = AddlDepthCost[h>1?1:0][sd];
	var lightingCost = OLEDLightingCost[h>0?1:0][l];

	var costPerDoor = DoorCostArray[t][h][w];
	var totalShelfCost = s * 60.83;
	var totalAddonCost = totalShelfCost + (addlDepthCost + lightingCost) * d;
	var totalBaseCost = (costPerDoor) * d;
	totalCost = totalBaseCost + totalAddonCost;
	changeDivStr("baseCost", "Base: $ " + totalBaseCost.toFixed(2));
	changeDivStr("addOnCost", "Addons: $ " + totalAddonCost.toFixed(2));
    changeDivStr("totalCost", "Total: $ " + totalCost.toFixed(2));
}

function populateShelfNumArray()
{
	for(i=0; i<26; i++)
	{
		ShelfNumArray[ShelfNumArray.length] = [ShelfNumArray.length - 1, (ShelfNumArray.length).toString() + " Shel" + (i!=1?"ves":"f")];
	}
}

function fridgeTypeChanged()
{
	updateCost();
}

function doorHeightChanged()
{
	updateCost();
}

function shelvesChanged()
{
	updateCost();
}

function shelfDepthChanged()
{
	updateCost();
}

function lightingChanged()
{
	updateCost();
}