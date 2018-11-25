<%@ page import="Bean.HitHandler" %>
<%@ page import="Bean.Hit" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>IAD 2. Result</title>
    <link href="styles.css" rel="stylesheet">
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
    <div class="block border ">
        <%
            HitHandler handler = (HitHandler) session.getAttribute("previousHits");
            Hit hit = handler.getPreviousHits().getFirst();
        %>
        <table>
            <thead>
            <td>X</td>
            <td>Y</td>
            <td>R</td>
            <td>Is in area</td>
            <td>Now</td>
            </thead>
            <tbody>
            <td><%=hit.getX()%></td>
            <td><%=hit.getY()%></td>
            <td><%=hit.getR()%></td>
            <td><%=hit.isInArea() ? "Да" : "Нет"%></td>
            <td><%=hit.getHitTime()%></td>
            </tbody>
        </table>

        <a href="index.jsp">Try again!</a>
    </div>
</div>
</body>
</html>
