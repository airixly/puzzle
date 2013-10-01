(function () {
    var table = document.getElementById("active-table");
    util.e.addEvent(table, "click", changeColor);
    function changeColor(event) {
        var target = util.e.getTarget(util.e.getEvent(event)),
            current = document.getElementsByClassName("current")[0],
            x, y, parent = target.parentNode,
            currentX, currentY, currentParent = current.parentNode;
        if (target.tagName.toLowerCase() !== "td") {
            return;
        }
        x = locate(target, parent.cells);
        y = locate(parent, table.rows);
        currentX = locate(current, currentParent.cells);
        currentY = locate(currentParent, table.rows);
        if (Math.abs(x + y - currentX - currentY) === 1) {
            swap(target, current);
        }
    }

    function locate(element, array) {
        var i = 0, len = array.length, result = -1;
        while (i < len) {
            if (element === array[i]) {
                result = i;
                break;
            }
            i++;
        }
        return result;
    }

    function swap(target, current) {
        var targetColor = document.defaultView.getComputedStyle(target, null).backgroundColor,
            currentColor = document.defaultView.getComputedStyle(current, null).backgroundColor;
        current.style.backgroundColor = targetColor
        current.setAttribute("class", current.getAttribute("class").replace("current", ""));
        target.style.backgroundColor = currentColor;
        target.setAttribute("class", target.getAttribute("class") + " current");
    }
})();
