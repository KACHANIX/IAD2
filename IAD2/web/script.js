$('document').ready(function () {
    var
        canv = $('canvas')[0],
        ctx = canv.getContext('2d');

    var xValues = [],
        yValues = [];
    var i = 0;

    $('.previousX').each(function () {
        xValues[i++] = parseFloat($(this).html());
    });

    i = 0;

    $('.previousY').each(function () {
        yValues[i++] = parseFloat($(this).html());
    });


    document.getElementsByName("HiddenR")[0].value = $("#SelectR").val();
    document.getElementsByName("HiddenX")[0].value = $("#SelectX").val();
    clearChart(ctx, canv);
    drawArea($("#SelectR").val(), ctx, canv);
    drawPreviousShoots(xValues, yValues, ctx);
    drawAxis(ctx);
    drawArrows(ctx);
    drawTips(ctx);
    drawXValues(ctx);
    drawYValues(ctx);
    $("#SelectR").change(function () {
        document.getElementsByName("HiddenR")[0].value = $("#SelectR").val();
        clearChart(ctx, canv);
        drawArea($("#SelectR").val(), ctx, canv);
        drawPreviousShoots(xValues, yValues, ctx);
        drawAxis(ctx);
        drawArrows(ctx);
        drawTips(ctx);
        drawXValues(ctx);
        drawYValues(ctx);
    });

    $("#SelectX").change(function () {
        document.getElementById("error_message_X").style = "visibility: hidden";
        document.getElementsByName("HiddenX")[0].value = $("#SelectX").val();
    });

    function getMousePos(canv, e) {
        var rect = canv.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    $('#canv').on('mousedown', function (e) {
        var pos = getMousePos(canv, e);
        x1 = pos.x;
        y1 = pos.y;
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x1, y1, 2, 0, Math.PI * 2);
        ctx.fill();
        document.getElementsByName("HiddenX")[0].value = ((x1 - 150) / 20).toFixed(5);
        $("#Y").val(((75 - y1) / 20).toFixed(5));
        $('input:submit').click();
    });
    $('#form').submit(function () {
        document.getElementById("error_message_Y").style = "visibility: hidden";
        document.getElementById("error_message_X").style = "visibility: hidden";
        var spaces = " ".repeat($("#Y").val().length);
        if ($("#Y").val() == "" ||$("#Y").val() >= 3 || $("#Y").val() <= -5 || isNaN($("#Y").val()) || $("#Y").val() === spaces) {
            document.getElementById("error_message_Y").style = "visibility: visible";
            event.preventDefault();
        }
        xval=document.getElementsByName("HiddenX")[0].value;
        if (xval > 3 || xval < -5){
            document.getElementById("error_message_X").style = "visibility: visible";
            event.preventDefault();
        }
    });
});

function drawAxis(ctx) {
    ctx.beginPath();
    ctx.moveTo(150.5, 0);
    ctx.lineTo(150.5, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 75 - 0.5);
    ctx.lineTo(300, 75 - 0.5);
    ctx.stroke();
}

function drawArrows(ctx) {
    ctx.beginPath();
    ctx.moveTo(150 + 0.5, 0);
    ctx.lineTo(145 + 0.5, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(150 + 0.5, 0);
    ctx.lineTo(155 + 0.5, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 74.5);
    ctx.lineTo(293, 71.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 74.5);
    ctx.lineTo(293, 77.5);
    ctx.stroke();
}

function drawTips(ctx) {
    for (i = 10; i <= 290; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i + 0.5, 72);
        ctx.lineTo(i + 0.5, 77);
        ctx.stroke();
    }
    for (i = 15; i <= 135; i += 20) {
        ctx.beginPath();
        ctx.moveTo(148, i - 0.5);
        ctx.lineTo(153, i - 0.5);
        ctx.stroke();
    }
}

function drawXValues(ctx) {
    ctx.font = "9px Arial";
    var x = -13;
    for (i = -7; i <= 7; ++i) {
        if (i != 0) {
            ctx.fillText(i, x += 20, 72);
        } else x += 20;
    }
}

function drawYValues(ctx) {
    ctx.font = "9px Arial";
    var y = -3;
    for (i = 3; i >= -3; --i) {
        if (i != 0) {
            ctx.fillText(i, 154, y += 20);
        } else y += 20;
    }
}

function drawArea(R, ctx, canv) {
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "#3399FF";
    ctx.beginPath()
    ctx.moveTo(canv.width / 2, canv.height / 2);
    ctx.arc(canv.width / 2, canv.height / 2, R / 2 * 20, Math.PI / 2, Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#3399FF";

    ctx.beginPath();
    ctx.moveTo(canv.width / 2, canv.height / 2);
    ctx.lineTo(canv.width / 2 - R * 20, canv.height / 2);
    ctx.lineTo(canv.width / 2, canv.height / 2 - R * 20);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#3399FF";

    ctx.fillRect(canv.width / 2, canv.height / 2, (R) * 20, (R / 2) * 20);
    ctx.fillStyle = "#000";

    drawAxis(ctx);
    drawArrows(ctx);
    drawTips(ctx);
    drawXValues(ctx);
    drawYValues(ctx);

}

function clearChart(ctx, canv) {
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "#000";
    drawAxis(ctx);
    drawArrows(ctx);
    drawTips(ctx);
    drawXValues(ctx);
    drawYValues(ctx);
}

function drawPreviousShoots(xValues, yValues, ctx) {
    ctx.fillStyle = "red";
    for (i = 0; i < xValues.length; ++i) {
        ctx.beginPath();
        ctx.arc(xValues[i] * 20 + 150 + 0.5, 75 - yValues[i] * 20 - 0.5, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.fillStyle = "#000";
}