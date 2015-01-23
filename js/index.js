$( document ).ready(function() {

	decDisplay = $("#decDisplay")[0];
	hexDisplay = $("#hexDisplay")[0];
	modeDisplay = $("#modeSwap")[0];
	counterValue = 0;
	bitArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mode = 0; //0 is unsigned, 1 signed

	shiftModeDisplay = $("#shiftMode")[0];
	shiftDirectionDisplay = $("#shiftDirection")[0];
	shiftMode = 0; //0 is logic, 1 is arithmetic
	shiftDirection = 0;//0 is left, 1 is right
	numshifts = $("#numShifts")[0];

	$(".bit").click(function(event) {
		var id = event.target.id.slice(6);
		var target = event.target;
		if (bitArray[id-1] === 0) {
			bitArray[id-1] = 1;
			refreshDisplay();
		} else {
			bitArray[id-1] = 0;
			refreshDisplay();
		}
	});

	$("#shiftLeft").click(function() {
		logicalShiftLeft();
	});

	$("#shiftRight").click(function() {
		if (counterValue < 0){
			arithmeticShiftRight();
		} else {
			logicalShiftRight();
		}
	});

	$("#clear").click(function() {
		clear();
	});

	$("#ones").click(function() {
		ones();
	});

	$("#modeSwap").click(function() {
		if (mode) {
			mode = 0;
			modeDisplay.textContent = "Mode: Unsigned";
		}
		else {
			mode = 1;
			modeDisplay.textContent = "Mode: Signed";
		}
		refreshDisplay();
	});

	$("#shiftMode").click(function() {
		if (shiftMode) {
			shiftMode = 0;
			shiftModeDisplay.textContent = "Logical Shift";
		}
		else {
			shiftMode = 1;
			shiftModeDisplay.textContent = "Arithmetic Shift";
		}
	});

	$("#shiftDirection").click(function() {
		if (shiftDirection) {
			shiftDirection = 0;
			shiftDirectionDisplay.textContent = "Direction: Left";
		}
		else {
			shiftDirection = 1;
			shiftDirectionDisplay.textContent = "Direction: Right";
		}
	});

	$("#nShift").click(function() {
		var i = numShifts.value;
		while (i > 0){
			if (shiftMode) {
				if (shiftDirection) {
					if (bitArray[0]){
						arithmeticShiftRight();
					} else {
						logicalShiftRight();
					}
				} else {
					logicalShiftLeft();
				}
			} else {
				if (shiftDirection){
					logicalShiftRight();
				} else {
					logicalShiftLeft();
				}
			}
			i--;
		}
	});

	function logicalShiftRight() {
		for (i = (bitArray.length)-1; i > 0; i--){
			bitArray[i] = bitArray[i-1];
		}
			bitArray[0] = 0;
		refreshDisplay();
	}

	function arithmeticShiftRight() {
		for (i = (bitArray.length)-1; i > 0; i--){
			bitArray[i] = bitArray[i-1];
		}
		bitArray[0] = 1;
		refreshDisplay();
	}


	function logicalShiftLeft() {
		for (i = 0; i < (bitArray.length)-1; i++){
			bitArray[i] = bitArray[i+1];
		}
		bitArray[(bitArray.length)-1] = 0;
		refreshDisplay();
	}

	function arithmeticShiftLeft() {
		for (i = 0; i < (bitArray.length)-1; i++){
			bitArray[i] = bitArray[i+1];
		}
		bitArray[(bitArray.length)-1] = 1;
		refreshDisplay();
	}

	function clear() {
		for (i = 0; i < bitArray.length; i++){
			bitArray[i] = 0;
		}
		refreshDisplay();
	}

	function ones() {
		for (i = 0; i < bitArray.length; i++){
			bitArray[i] = 1;
		}
		refreshDisplay();
	}

	function refreshDisplay(){
		refreshBinDisplay();
		refreshDecDisplay();
		refreshHexDisplay();
	}

	function refreshHexDisplay(){
		var num = 0;
		if (mode) {

			for (i = 0;i < bitArray.length; i++){
				num += Math.pow(2,32-1-i) * bitArray[i];
			}
		} else {
			num  = counterValue;
		}
		var hex = num.toString(16).toUpperCase();
		while (hex.length < 8){
			hex = "0"+hex;
		}
		hex = "0x"+hex;
		hexDisplay.textContent = hex;
	}

	function refreshBinDisplay(){
		for (i = 0; i < bitArray.length; i++){
			$("#button" + (i+1))[0].textContent = bitArray[i];
		}
	}

	function refreshDecDisplay(){
		counterValue = 0;
		var i = mode;
		if (i) {
			counterValue -= Math.pow(2, 32-1) * bitArray[0];
		}
		for (i = i;i < bitArray.length; i++){
			counterValue += Math.pow(2,32-1-i) * bitArray[i];
		}
		decDisplay.textContent = counterValue;
	}

});