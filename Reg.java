//package sew1;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Yasas on 04-12-2014.
 */
public class Reg {

    public static boolean stringChecker(String patternString,String line){
        Pattern pattern = Pattern.compile(patternString);
        Matcher matcher = pattern.matcher(line);
        boolean matches = matcher.matches();
        return matches;
    }
}

