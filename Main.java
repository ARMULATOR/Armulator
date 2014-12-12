import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;

/**
 * Created by Yasas on 04-12-2014.
 */
public class Main {

    public static void main(String [] args){

        String filename = "txt.txt";
        String write = "file.txt";

        try{
            FileReader fileRd = new FileReader(filename);
            BufferedReader bufferRd = new BufferedReader(fileRd);
            String line = null;
            FileWriter fileWr = new FileWriter(write);
            BufferedWriter bufferwr = new BufferedWriter(fileWr);

            while((line = bufferRd.readLine()) != null){

                if(Reg.stringChecker(".*<main>:.*",line)){
                    while((line = bufferRd.readLine()) != null) {

                        if (Reg.stringChecker(".*<atexit>:.*", line)) {
                            return;
                        } else {
							String[] array=line.split("\t");
							if(array.length<=2){
								continue;
							}else{
							
                            long hex=Long.parseLong(array[1].trim(),16);
                            String binary=Long.toBinaryString(hex);
							bufferwr.write(binary + " ");
                            bufferwr.flush();

							}
                        }
                    }
                }

            }
            bufferwr.close();
        }catch(Exception e ){
            System.out.println(e);
        }


    }
}
