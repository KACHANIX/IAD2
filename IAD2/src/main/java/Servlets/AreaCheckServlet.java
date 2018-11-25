package Servlets;

import Bean.Hit;
import Bean.HitHandler;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayDeque;
import java.util.Calendar;

public class AreaCheckServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        double X, Y, R;

        X = Double.parseDouble(request.getParameter("HiddenX"));
        Y = Double.parseDouble(request.getParameter("Y"));
        R = Double.parseDouble(request.getParameter("HiddenR"));

        boolean isInArea = true;

        if (X > 0 && Y > 0) isInArea = false;
        else if (X <= 0 && Y >= 0 && Y <= X + R) isInArea = true;
        else if (X <= 0 && Y <= 0 && X * X + Y * Y <= R / 2) isInArea = true;
        else if (X >= 0 && Y <= 0 && X <= R && Y >= -R / 2) isInArea = true;
        else isInArea = false;

        Hit hit = new Hit(X, Y, R, isInArea, new SimpleDateFormat("yyyy.MM.dd_HH.mm.ss").format(Calendar.getInstance().getTime()));
        HttpSession session = request.getSession();

        HitHandler handler;
        ArrayDeque<Hit> previousHits;

        if (session.getAttribute("previousHits") == null) {
            handler = new HitHandler();
            previousHits = new ArrayDeque<>();
        } else {
            handler = (HitHandler) session.getAttribute("previousHits");
            previousHits = handler.getPreviousHits();
        }
        previousHits.push(hit);
        handler.setPreviousHits(previousHits);
        session.setAttribute("previousHits", handler);


        RequestDispatcher requestDispatcher = request.getRequestDispatcher("ViewResult.jsp");
        requestDispatcher.forward(request, response);
    }
}
