package Servlets;

import Entities.Validator;

import javax.servlet.RequestDispatcher;
import java.io.IOException;

public class ControllerServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        Validator validator = new Validator();
        RequestDispatcher requestDispatcher;
        if (validator.validate(request)) {
            requestDispatcher = request.getRequestDispatcher("AreaCheckServlet");
        } else {
            requestDispatcher = request.getRequestDispatcher("index.jsp");
        }
        requestDispatcher.forward(request, response);
    }

}
