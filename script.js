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

   /*  editor.session.addMarker (
        new Range(1, 0, 15, 0), "ace_active-line", "fullLine"
    ); */

	for (var i = 0, registers = new Array(16); i < 16; i++) {
			registers[i] = 0;
		}
		
		var count = 0;
		
		
	function reg(){
            var ar = bin.split(" ");
            var ar1 = bin1.split("\n");
            var cond = parseInt((ar[count].substring(0,4)),2);
            var format = parseInt((ar[count].substring(4,6)),2);
        
        if(format == 1){
            var opcode = parseInt((ar[count].substring(6,12)),2);
            var rn = parseInt((ar[count].substring(12,16)),2);
            var rd = parseInt((ar[count].substring(16,20)),2);
            var operand = parseInt((ar[count].substring(20,32)),2); 
        }else{
            var im = parseInt((ar[count].substring(6,7)),2);
            var opcode = parseInt((ar[count].substring(7,11)),2);
            var set = parseInt((ar[count].substring(11,12)),2);
            var rn = parseInt((ar[count].substring(12,16)),2);
            var rd = parseInt((ar[count].substring(16,20)),2);
            var operand = parseInt((ar[count].substring(20,32)),2); 
        }
        
        
         function getValue(regNum){
            return registers[regNum];
        }
        
        function setValue(regNum, valSet){
            registers[regNum] = valSet;
        }
        
        
        
        switch(opcode){
        
        case 4 :	//Add instruction
        regVal1 = getValue(rn);
        if (im == 1){
            val = regVal1 + operand;
            setValue(rd, val);
        }else{
            regVal2 = getValue(operand);
            val = regVal1 + regVal2;
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
            regVal1 = getValue(rn);
            val = regVal1 + (operand/4);
            setValue(rd, val);
            break;
            
        case 13 :	//Mov instruction	
            val = getValue(operand);
            setValue(rd, val);
            break;

        case 21	:
            val1 = getValue(rn);
            val2 = getValue(operand);

            if(val1 == val2){
                
            
            }else{
            
            }	
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
        count++;
}