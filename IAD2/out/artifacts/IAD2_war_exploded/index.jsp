<%@ page import="Bean.Hit" %>
<%@ page import="Bean.HitHandler" %>
<%@ page import="java.util.Deque" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>IAD 2</title>
    <meta charset="utf-8">
    <link href="styles.css" rel="stylesheet">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="script.js"></script>
</head>
<body>
<header>
    <div class="header-text">
        <div>Сергей Кочарян, Александр Артамонов</div>
        <div>P3218</div>
        <div>Вариант 1810</div>
    </div>
    <div class="header-image">
        <img id="VT-img" src="images/VT.jpg">
    </div>
</header>
<div class="content">
    <div>
        <canvas class="border" id="canv">YES)</canvas>
    </div>
    <div class="input">
        <form method="post" action="ControllerServlet" id="form">
            <div>
                <div class="block border">
                    <h1>X:</h1>
                    <div id="X">
                        <select id="SelectX">
                            <option selected value="-5">-5</option>
                            <option value="-4">-4</option>
                            <option value="-3">-3</option>
                            <option value="-2">-2</option>
                            <option value="-1">-1</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div class="error_message" id="error_message_X">
                        Wrong input value X
                    </div>
                </div>
                <div class="block border">
                    <h1>Y:</h1>
                    <input type="text" id="Y" name="Y" placeholder="(-5..3)">
                    <br>
                    <div class="error_message" id="error_message_Y">
                        Wrong input value y
                    </div>
                </div>
                <div class="block border">
                    <h1>R:</h1>
                    <div id="R">
                        <select id="SelectR">
                            <option selected value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div>
                    <input type="submit" value="CHECK">
                    <input type="hidden" name="HiddenR" value="">
                    <input type="hidden" name="HiddenX" value="">
                </div>
            </div>
        </form>
    </div>
    <div class="block border" id="previousHits">
        <table id="t1">
            <thead>
            <td><b>X</b></td>
            <td><b>Y</b></td>
            <td><b>R</b></td>
            <td><b>Is in area</b></td>
            <td><b>Now</b></td>
            </thead>
            <tbody>
            <%
                if (session.getAttribute("previousHits") != null) {
                    HitHandler handler = (HitHandler) session.getAttribute("previousHits");
                    Deque<Hit> previousHits = handler.getPreviousHits();
                    while (previousHits.peek() != null) {
                        Hit currentHit = previousHits.pop();
            %>
            <tr>
                <td class="previousX"><%=currentHit.getX()%>
                </td>
                <td class="previousY"><%=currentHit.getY()%>
                </td>
                <td><%=currentHit.getR()%>
                </td>
                <td><%=currentHit.isInArea() ? "Да" : "Нет"%>
                </td>
                <td><%=currentHit.getHitTime()%>
                </td>
            </tr>
            <%
                    }
                }
            %>
            </tbody>

        </table>
    </div>
</div>
</body>
</html>
