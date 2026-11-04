function $(id) {
    return document.getElementById(id);
}

function esc(text) {
    return String(text).replace(/[&<>"]/g, function (char) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char];
    });
}

function m(amount) {
    return "$" + amount.toFixed(2);
}

function renderAdmin() {
    var revenue = orders.reduce(function (total, order) { return total + order.total; }, 0);
    var active = orders.filter(function (order) { return order.status < 3; }).length;
    $("stats").innerHTML = [["Orders", orders.length], ["Revenue", m(revenue)], ["Active now", active], ["Menu items", items.length]]
        .map(function (stat) {
            return '<div class="card stat"><b>' + stat[1] + "</b><span>" + stat[0] + "</span></div>";
        }).join("");

    $("ot").innerHTML = orders.length ? orders.map(function (order) {
        return "<tr><td>#" + order.id + "</td><td>" + esc(order.customer) +
            '<div class="mu" style="font-size:12px">' + esc(order.address) + "</div></td><td>" +
            order.lines.map(function (line) { return line.qty + "× " + esc(line.name); }).join(", ") +
            "</td><td>" + m(order.total) + '</td><td><select data-o="' + order.id + '">' +
            ST.map(function (status, index) {
                return '<option value="' + index + '"' + (index === order.status ? " selected" : "") + ">" + status + "</option>";
            }).join("") + "</select></td></tr>";
    }).join("") : '<tr><td colspan="5" class="mu">No orders yet. Orders placed on the shop appear here.</td></tr>';

    $("ot").querySelectorAll("select").forEach(function (select) {
        select.onchange = function () {
            var order = orders.find(function (item) { return item.id === +select.dataset.o; });
            if (order) {
                order.status = +select.value;
                save();
                renderAdmin();
            }
        };
    });

    $("mt").innerHTML = items.map(function (item) {
        return "<tr><td>" + esc(item.emoji) + " " + esc(item.name) + "</td><td>" + esc(item.cat) +
            "</td><td>" + m(item.price) + "</td><td>" +
            (item.addons.map(function (addon) { return esc(addon.n); }).join(", ") || "–") +
            '</td><td style="white-space:nowrap"><button class="btn g" data-e="' + item.id +
            '">Edit</button> <button class="btn d" data-x="' + item.id + '">Delete</button></td></tr>';
    }).join("");

    $("mt").querySelectorAll("[data-e]").forEach(function (button) {
        button.onclick = function () {
            var item = items.find(function (entry) { return entry.id === +button.dataset.e; });
            if (!item) return;
            editId = item.id;
            $("fn").value = item.name;
            $("fc").value = item.cat;
            $("fp").value = item.price;
            $("fe").value = item.emoji;
            $("fd").value = item.desc;
            $("fa").value = item.addons.map(function (addon) { return addon.n + ":" + addon.p; }).join(", ");
            $("fs").textContent = "Save changes";
            $("fx").classList.remove("hide");
            $("fn").focus();
        };
    });

    $("mt").querySelectorAll("[data-x]").forEach(function (button) {
        button.onclick = function () {
            items = items.filter(function (item) { return item.id !== +button.dataset.x; });
            save();
            renderAdmin();
        };
    });
}

function clearForm() {
    editId = null;
    ["fn", "fc", "fp", "fd", "fa"].forEach(function (id) { $(id).value = ""; });
    $("fe").value = "🍽️";
    $("fs").textContent = "Add item";
    $("fx").classList.add("hide");
}

$("fx").onclick = clearForm;
$("fs").onclick = function () {
    var name = $("fn").value.trim();
    var price = parseFloat($("fp").value);
    if (!name || isNaN(price)) {
        $("fn").focus();
        return;
    }

    var addons = $("fa").value.split(",").map(function (entry) {
        var parts = entry.split(":");
        return { n: parts[0].trim(), p: parseFloat(parts[1]) || 0 };
    }).filter(function (addon) { return addon.n; });
    var item = {
        name: name,
        cat: $("fc").value.trim() || "Other",
        price: price,
        emoji: $("fe").value || "🍽️",
        desc: $("fd").value,
        addons: addons
    };

    if (editId) {
        Object.assign(items.find(function (entry) { return entry.id === editId; }), item);
    } else {
        item.id = nid++;
        items.push(item);
    }
    save();
    clearForm();
    renderAdmin();
};

renderAdmin();
