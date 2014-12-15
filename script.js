var bin;
var bin1;
$( document ).ready(

function()
{
// this is the function for submit the values >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    $('#compile').click( function(){
    
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
                        $('#output').val(data.split(" \n\n")[0]);
						bin = data.split(" \n\n")[1];
						bin1 = data.split(" \n\n")[2];
						
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
 
	for (var i = 0, registers = new Array(16); i < 16; i++) {
			registers[i] = 0;
		}
		
		var count = 0;
        var count1 = 0;    
		
		
	function reg(){
			var ar = bin.split(" ");
			var ar1 = bin1.split("\n");
            
            
            
            function getValue(regNum){
                return registers[regNum];
            }
		
            function setValue(regNum, valSet){
                registers[regNum] = valSet;
            }
			
			var cond = parseInt((ar[count].substring(0,4)),2);
			//alert(ar1[count]);
			//alert("namo");
			
		switch(cond){
			case 14	:
				var format = parseInt((ar[count].substring(4,6)),2);
				
				if(format == 1){
					var opcode = parseInt((ar[count].substring(6,12)),2);
					var rn = parseInt((ar[count].substring(12,16)),2);
					var rd = parseInt((ar[count].substring(16,20)),2);
					var operand = parseInt((ar[count].substring(20,32)),2); 
				}else if(format == 0){
					var im = parseInt((ar[count].substring(6,7)),2);
					var opcode = parseInt((ar[count].substring(7,11)),2);
					var set = parseInt((ar[count].substring(11,12)),2);
					var rn = parseInt((ar[count].substring(12,16)),2);
					var rd = parseInt((ar[count].substring(16,20)),2);
					var operand = parseInt((ar[count].substring(20,32)),2); 
				}else{
					var opcodebr = parseInt((ar[count].substring(6,8)),2);
                        switch(opcodebr){
                            case 2 :	//Branch instruction
                            word = ar1[count].split("\t");
                            num = word[3].split(" ")[0];
                            num1 = num + ":";
			
                            alert(count + " namo");
            
                            for(var i = 0;i<ar1.length;i++){
                                n = ar1[i].indexOf(num1);
                                if(n == -1){
                                    continue;
                                }else{
                                    count = i;
                                    break;
                                }
			
                            } 
                                break; 
                        
                        }
                    
				}
					
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
        {
			var val1 = getValue(rn);
			var val2 = getValue(operand);
            
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
                }
                break;
		}
		
		}
        
        var line = document.getElementsByClassName("ace_line");
        line[count].style.backgroundColor = "red";
        
        if(count1 != 0){
            alert(line[count].textContent);
            line[0].style.backgroundColor = "black";
            line[count1].style.backgroundColor = "black";
        }
        
        //alert(ar1[count]);
		//alert(count);
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
		count++;
		//alert(opcode);
	} 