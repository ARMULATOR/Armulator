var bin;
var bin1;
$( document ).ready(
    function() {
    // this is the function for submit the values >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
        $('#compile').click( function(){
        
            
            var lines = document.getElementsByClassName("ace_line");
            var gutters = document.getElementsByClassName("ace_gutter-cell");
            var gutLineNo = parseInt(gutters[0].innerHTML)-1; 
            
            var code = editor.getSession().getValue();
            var input = $('#input').val();
            
            if(code){
                    $.post("ajax.php" , 
                        {
                            text_file: code,
                            input_text : input,
                        },
                        function(data)
                        {
                            var error = data.split("\n");
                            if(error[0] == "text.s: Assembler messages:"){
                                for(var i = 1;i<error.length;i++){
                                    var getErrNum = error[i].split(":");
                                    var errLine = parseInt(getErrNum[1])-1;
                                    var linetxt = editor.session.getLine(errLine);
                                    //lines[errLine-gutterLineNo].innerHTML = linetxt + "\t" + getErrNum;
                                    lines[errLine-gutLineNo].innerHTML += "\t" + getErrNum[3];
                                    lines[errLine-gutLineNo].style.backgroundColor = "red";
                                    
                                     $('#output').val(data);
                                    
                                }
                            }else{
                            $('#output').val(data.split(" \n\n")[0]);
                            
                            }
                        }
                    );
                }   
        }); 

        
        
        $('#clear').click(function(){
            editor.setValue("");
            input.setValue("");	
        });
        
        $('#upload').click(function(){
            var fileToLoad = document.getElementById("file").files[0];

            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) 
            {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                editor.setValue(textFromFileLoaded);
            };
            fileReader.readAsText(fileToLoad, "UTF-8");
        });
        
    }
);

    function getId(id){		//Getting registers from their ID
        intNum = parseInt(id);
        if(intNum == 0){
            var setReg = document.getElementById("R00").value;
               
        }else if(intNum == 1){
            var setReg = document.getElementById("R01").value;
        }else if(intNum == 2){
            var setReg = document.getElementById("R02").value;
        }else if(intNum == 3){
             var setReg = document.getElementById("R03").value;
        }else if(intNum == 4){
             var setReg = document.getElementById("R04").value;
        }else if(intNum == 5){
             var setReg = document.getElementById("R05").value;
        }else if(intNum == 6){
             var setReg = document.getElementById("R06").value;
        }else if(intNum == 7){
             var setReg = document.getElementById("R07").value;
        }else if(intNum == 8){
             var setReg = document.getElementById("R08").value;
        }else if(intNum == 9){
             var setReg = document.getElementById("R09").value;
        }else if(intNum == 10){
             var setReg = document.getElementById("R10").value;
        }else if(intNum == 11){
             var setReg = document.getElementById("R11").value;
        }else if(intNum == 12){
             var setReg = document.getElementById("R12").value;
        }else if(intNum == 13){
             var setReg = document.getElementById("R13").value;
        }else if(intNum == 14){
             var setReg = document.getElementById("R14").value;
        }else{
             var setReg = document.getElementById("R15").value;
        }
        
        setValue(intNum,setReg);
    }
       
    function getValue(regNum){
        return registers[regNum];
    }
		
    function setValue(regNum, valSet){
        registers[regNum] = valSet;
    }
 
for (var i = 0, registers = new Array(16); i < 16; i++) {
    registers[i] = 0;
}
		
var count = 0;
var count1 = 0;    
var num = 0;
var addN = 0;
function getCode(){

        var lines = document.getElementsByClassName("ace_line");
        var gutters = document.getElementsByClassName("ace_gutter-cell");
        var gutLineNo = parseInt(gutters[0].innerHTML)-1; 

      var code = editor.getSession().getValue();
            var input = $('#input').val();
            
            if(code){
                    $.post("ajax.php" , 
                        {
                            text_file: code,
                            input_text : input,
                        },
                        function(data)
                        {
                        
                             var error = data.split("\n");
                            if(error[0] == "text.s: Assembler messages:"){
                                for(var i = 1;i<error.length;i++){
                                    var getErrNum = error[i].split(":");
                                    var errLine = parseInt(getErrNum[1])-1;
                                    var linetxt = editor.session.getLine(errLine);
                                    lines[errLine-gutLineNo].innerHTML += "\t" + getErrNum[3];
                                    lines[errLine-gutLineNo].style.backgroundColor = "red";
                                    
                                     $('#output').val(data);
                                    
                                }
                            }else{
                            lastOut = data.split(" \n\n")[0];
                            bin = data.split(" \n\n")[1];
                            bin1 = data.split(" \n\n")[2];
                            }
                        }
                    );
                }

}            
		
function reg(){		//This function runs when the "Next Step" button is clicked
    if(count == 0){
        getCode();
    }
   
	var ar = bin.split(" ");
	var ar1 = bin1.split("\n");
    
            
	var cond = parseInt((ar[count].substring(0,4)),2); // Cond field
	
	/*Now let's check the fields*/
	switch(cond){		
		case 14	:
			var format = parseInt((ar[count].substring(4,6)),2);
				
			if(format == 1){    //Data transfer instructions
				var opcode = parseInt((ar[count].substring(6,12)),2);
					var rn = parseInt((ar[count].substring(12,16)),2);
					var rd = parseInt((ar[count].substring(16,20)),2);
					var operand = parseInt((ar[count].substring(20,32)),2);
                    var signIm = "0";        
                    
            }else if(format == 0){  //Data processing instructions
                var im = parseInt((ar[count].substring(6,7)),2);
                var opcode = parseInt((ar[count].substring(7,11)),2);
                var set = parseInt((ar[count].substring(11,12)),2);
                var rn = parseInt((ar[count].substring(12,16)),2);
                var rd = parseInt((ar[count].substring(16,20)),2);
                var operand = parseInt((ar[count].substring(20,32)),2); 
                var signIm = "0";
                
            } else {    //Branch Instructions
            
                var opcodebr = parseInt((ar[count].substring(6,8)),2);
                var signIm = parseInt((ar[count].substring(8,32)),2);
                switch(opcodebr){
                    case 2 :	//B instruction
                        word = ar1[count].split("\t");
                        num = word[3].split(" ")[0];
                        num1 = num + ":";
        
                        for(var i = 0;i<ar1.length;i++){
                            n = ar1[i].indexOf(num1);
                            if(n == -1){
                                continue;
                            } else {
                                count = i;
                                break;
                            }
                        } 
                    break;
                    
                    case 3 :    //BL instruction
                        word = ar1[count].split("\t");
                        num = word[3].split(" ")[0];
                        num1 = num + ":";
        
                        for(var i = 0;i<ar1.length;i++){
                            n = ar1[i].indexOf(num1);
                            if(n == -1){
                                continue;
                            } else {
                                count = i;
                                break;
                            }
                        } 
                    break;    
                }
            }	
		}
        if(signIm == 107){
            $('#output').val(lastOut);
        } 
		
		switch(opcode){
            case 4 :	//Add instruction
		
                regVal1 = getValue(rn);
                if (im == 1){
                    var val = regVal1 + operand;
                    setValue(rd, val);
                }else{
                    var regVal2 = getValue(operand);
                    var val = regVal1 + regVal2;
                    setValue(rd, val);
                }
            break;
		
		case 2 :	//Sub instruction
		
            var regVal1 = getValue(rn);
            if(im == 1){
                var val = regVal1 - operand;
                setValue(rd, val);
            }else{
                var regVal2 = getValue(operand);
                var val = regVal1 - regVal2;
                setValue(rd, val);
            }
		break;
		
		case 25 :	//Ldr instruction
			var regVal1 = getValue(rn);
			var val = regVal1 + (operand/4);
			setValue(rd, val);
		break;
            
        case 24 :   //Str instruction
        break;
			
		case 13 :	//Mov instruction
            if(im == 1){
                var val = operand;
            }else{
                var val = getValue(operand);
            }
			setValue(rd, val);
		break;

		case 10	:	//Cmp instruction
        
            var val1 = getValue(rn);
            if(im == 1){
            var val2 = operand;    
            }else{
			var val2 = getValue(operand);
            }
			count++;
			
            var word = ar1[count].split("\t");
			var cond = parseInt((word[1].substring(0,1)),16);
			
			var num = word[3].split(" ")[0];
		
			switch(cond){
				case 0:     //beq instruction
                    if(val1 == val2){
                        var num1 = num + ":";
                        for(var i= 0;i<ar1.length;i++){
                                n = ar1[i].indexOf(num1);
                                if(n == -1){
                                    continue;
                                }else{
                                    count = i;
                                    break;
                                }
                        }
                    }else{
                        count++;
                    }
                    
                break;
				
				case 1 :        //bne instruction
                    if(val1 != val2){
                        var num1 = num + ":";
                        
                        for(var i= 0;i<ar1.length;i++){
                                n = ar1[i].indexOf(num1);
                                if(n == -1){
                                    continue;
                                }else{
                                    count = i;
                                    break;
                                }
                        }
                    }else{
                        count++;
                    }
                break;
                
                case 12:        //bgt instruction
                    if(val1 > val2){
                        var num1 = num + ":";
                        
                        for(var i= 0;i<ar1.length;i++){
                                n = ar1[i].indexOf(num1);
                                if(n == -1){
                                    continue;
                                }else{
                                    count = i;
                                    break;
                                }
                        }
                    }else{
                        count++;
                    }
            }
        break;
		
		
        }
        
    var numOfLines = editor.session.getLength();
    var aceLines = document.getElementsByClassName("ace_line");
 
        for(var i = 0, lines = new Array(numOfLines); i < numOfLines; i++ ){
            lines[i] = editor.session.getLine(i);
        }
        
        function checkFirstChar (number) {
            var words = lines[number].split(" ");
            var firstChar = words[0].trim().charAt(0);          
            
            if (firstChar == "." || firstChar == "#" || firstChar == "") {
                return 0;
            }
            else return 1;
            }
            
        function checkLastChar (number) {
            var words = lines[number].trim().split(" ");
            var lastWordNo = words.length;
            var lastWord = words[lastWordNo - 1];
            var wordLength = lastWord.length;
            var lastChar = lastWord.charAt(wordLength - 1);
            
           
            if (lastChar == ":") {
                return 0;
            }
            else return 1;
            
        }
            
        function isAnInstruction (number) {
            var valid = checkFirstChar(number);
            if (valid == 1) {
               var valid = checkLastChar(number); 
            }
            return valid;
        }
        
        var arNum = new Array();
        
         for(var i = 0; i < numOfLines ; i++){
            if(isAnInstruction(i) == 1){
                arNum.push (i);
            }else{
                continue;
            }
        }  
      
        var gutters = document.getElementsByClassName("ace_gutter-cell");
        var gutLineNo = parseInt(gutters[0].innerHTML)-1;
        
        if(count == 1){
             aceLines[arNum[count1]-gutLineNo].style.backgroundColor = "black";
        }
        
         
        if(count1 != 0){
            aceLines[arNum[count]-gutLineNo].style.backgroundColor = "green";
            aceLines[arNum[count1]-gutLineNo].style.backgroundColor = "black";
           
        }else{
            aceLines[arNum[count]-gutLineNo].style.backgroundColor = "green";
        }   
       
    document.getElementById('R00').value = registers[0];
    document.getElementById('R01').value = registers[1];
    document.getElementById('R02').value = registers[2];
    document.getElementById('R03').value = registers[3];
    document.getElementById('R04').value = registers[4];
    document.getElementById('R05').value = registers[5];
    document.getElementById('R06').value = registers[6];
    document.getElementById('R07').value = registers[7];
    document.getElementById('R08').value = registers[8];
    document.getElementById('R09').value = registers[9];
    document.getElementById('R10').value = registers[10];
    document.getElementById('R11').value = registers[11];
    document.getElementById('R12').value = registers[12];
    document.getElementById('R13').value = registers[13];
    document.getElementById('R14').value = registers[14];
    document.getElementById('R15').value = registers[15];
    
    
    count1 = count;
    if(format==0 || format ==1 ){
    count++;
    }else{
        if(addN != 0){
            count++;
        }
        addN++;
    }
} 