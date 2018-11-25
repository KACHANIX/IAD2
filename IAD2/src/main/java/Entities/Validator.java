package Entities;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.stream.DoubleStream;

public class Validator {
    public boolean validate(HttpServletRequest req) {
        Map<String, String[]> parameterMap = req.getParameterMap();
        for (String k : parameterMap.keySet()) {
            if (parameterMap.get(k).length != 1) return false;
        }

        String strX = req.getParameter("HiddenX");
        String strY = req.getParameter("Y");
        String strR = req.getParameter("HiddenR");
        if (strX == null || strY == null || strR == null) {
            return false;
        }
        double X, Y, R;
        try {

            X = Double.parseDouble(strX);
            Y = Double.parseDouble(strY);
            R = Double.parseDouble(strR);
        } catch (NumberFormatException e) {
            return false;
        }

        double[] validRValues = {1, 1.5, 2, 2.5, 3};
        if (X < -5 || X > 3) {
            return false;
        }
        if (Y < -5 || Y > 3) {
            return false;
        }
        if (DoubleStream.of(validRValues).noneMatch(a -> a == R)) {
            return false;
        }

        return true;
    }
}
