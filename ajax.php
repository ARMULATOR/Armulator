<?php
	
	 session_name('Private');
    session_start();
    $private_id = session_id();
    session_write_close(); 
	
	//get data and write to the file
	$text_file = $_POST['text_file'];
	$input_text = $_POST['input_text'];
	
	$handle1 = fopen('input.txt','w');
	fwrite($handle1,$input_text);
	fclose($handle1);
	
	$handle2 = fopen('text.s', 'w'); 
	fwrite($handle2,$text_file);
	fclose ($handle2);
		 
	  $descriptorspec = array(
   0 => array("pipe", "r"),  // stdin
   1 => array("pipe", "w"),  // stdout
   2 => array("pipe", "w"),  // stderr
);
	 
$process = proc_open("arm-elf-gcc -Wall -o text text.s", $descriptorspec, $pipes, dirname(__FILE__), null);


$stderr = stream_get_contents($pipes[2]);
fclose($pipes[2]);

//echo $stderr;

if($stderr == ''){
$process = proc_open("arm-elf-objdump -d -j .text text >txt.txt", $descriptorspec, $pipes, dirname(__FILE__), null);

 //shell_exec("javac Main.java");
 //shell_exec("java Main"); 

$process = proc_open("arm-elf-run text < input.txt", $descriptorspec, $pipes, dirname(__FILE__), null);


$stdout = stream_get_contents($pipes[1]);
fclose($pipes[1]);

$stderr = stream_get_contents($pipes[2]);
fclose($pipes[2]);

//echo $stderr;
    $instructions = file_get_contents("./file.txt");
    $instructions1 = file_get_contents("./file1.txt");
	
	if(!(file_exists("text"))){
		echo "$stderr \n\n";
	}else{
		echo "$stdout \n\n$instructions \n\n$instructions1";
	}


	if (file_exists("text")) {unlink("text");}
	if (file_exists("text.s")) {unlink("text.s");}
	if (file_exists("input.txt")) {unlink("input.txt");}
	//if (file_exists("Reg.class")) {unlink("Reg.class");}
	//if (file_exists("Main.class")) {unlink("Main.class");}

}
?>