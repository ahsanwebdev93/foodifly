function $(id) {
    return document.getElementById(id);
}

function esc(text) {
    return String(text).replace(/[&<>"]/g, function (char) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char];
    });
}

function m(amount) {
    return formatPKR(amount);
}

function renderAdmin() {
    var revenue = orders.reduce(function (total, order) { return total + order.total; }, 0);
    var active = orders.filter(function (order) { return order.status < 3; }).length;
    $("stats").innerHTML = [
        ["📦", "Total orders", orders.length, "Orders received"],
        ["↗", "Total revenue", m(revenue), "Across all orders"],
        ["◷", "In the kitchen", active, "Orders not yet delivered"],
        ["✦", "Menu favourites", items.length, "Dishes on your menu"]
    ].map(function (stat) {
            return '<div class="card admin-stat"><div class="admin-stat-top"><span class="admin-stat-label">' +
                stat[1] + '</span><span class="admin-stat-icon" aria-hidden="true">' + stat[0] +
                '</span></div><b class="admin-stat-value">' + stat[2] +
                '</b><span class="admin-stat-note">' + stat[3] + "</span></div>";
        }).join("");

    $("ot").innerHTML = orders.length ? orders.map(function (order) {
        return '<tr><td class="admin-order-id">#' + order.id + "</td><td><span class='admin-customer'>" + esc(order.customer) +
            '</span><span class="admin-customer-address">' + esc(order.address) + "</span></td><td>" +
            order.lines.map(function (line) { return line.qty + "× " + esc(line.name); }).join(", ") +
            '</td><td class="admin-price">' + m(order.total) + '</td><td><select aria-label="Status for order ' + order.id + '" data-o="' + order.id + '">' +
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

    var menuQuery = $("menu-filter").value.trim().toLowerCase();
    var visibleItems = items.filter(function (item) {
        return (item.name + " " + item.cat + " " + item.desc).toLowerCase().indexOf(menuQuery) > -1;
    });
    $("menu-total").textContent = items.length + (items.length === 1 ? " dish" : " dishes");
    $("mt").innerHTML = visibleItems.length ? visibleItems.map(function (item) {
        return '<tr><td><div class="admin-dish"><span class="admin-dish-emoji" aria-hidden="true">' + esc(item.emoji) +
            '</span><span class="admin-dish-name">' + esc(item.name) + '</span></div></td><td><span class="admin-category">' + esc(item.cat) +
            '</span></td><td class="admin-price">' + m(item.price) + '</td><td><span class="admin-options">' +
            (item.addons.map(function (addon) { return esc(addon.n); }).join(", ") || "No extras") +
            '</span></td><td class="admin-actions"><button class="btn g" data-e="' + item.id +
            '">Edit</button> <button class="btn d" data-x="' + item.id + '">Delete</button></td></tr>';
    }).join("") : '<tr><td colspan="5" class="mu">' + (items.length ? "No dishes match your search." : "Your menu is empty. Add your first dish above.") + "</td></tr>";

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
            $("menu-management").scrollIntoView({ behavior: "smooth" });
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
    $("fs").textContent = "＋ Add dish";
    $("fx").classList.add("hide");
}

$("fx").onclick = clearForm;
$("menu-filter").addEventListener("input", renderAdmin);
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
