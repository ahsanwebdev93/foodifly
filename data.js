var ST = ["New", "Preparing", "On the way", "Delivered"];
var items = [
    { id: 1, name: "Smash burger", cat: "Burgers", price: 9.5, emoji: "🍔", desc: "Two patties, cheddar, house sauce.", addons: [{ n: "Extra cheese", p: 1.5 }, { n: "Bacon", p: 2 }] },
    { id: 2, name: "Margherita pizza", cat: "Pizza", price: 11, emoji: "🍕", desc: "Tomato, mozzarella, fresh basil.", addons: [{ n: "Extra mozzarella", p: 2 }, { n: "Olives", p: 1 }] },
    { id: 3, name: "Chicken biryani", cat: "Rice", price: 10, emoji: "🍛", desc: "Slow-cooked basmati with spiced chicken.", addons: [{ n: "Raita", p: 1 }, { n: "Boiled egg", p: 1 }] },
    { id: 4, name: "Salmon sushi set", cat: "Sushi", price: 14, emoji: "🍣", desc: "Eight pieces with soy and wasabi.", addons: [{ n: "Miso soup", p: 2.5 }] },
    { id: 5, name: "Crispy fries", cat: "Sides", price: 4, emoji: "🍟", desc: "Skin-on, sea salt.", addons: [{ n: "Cheese dip", p: 1 }] },
    { id: 6, name: "Mango lassi", cat: "Drinks", price: 3.5, emoji: "🥭", desc: "Chilled yoghurt drink.", addons: [] }
];
var orders = [], cart = [], cat = "All", editId = null, mine = [], nid = 7, oid = 1001;

try {
    var saved = JSON.parse(localStorage.getItem("qb"));
    if (saved) {
        items = saved.items;
        orders = saved.orders;
        mine = saved.mine;
        nid = saved.nid;
        oid = saved.oid;
    }
} catch (e) { }

function save() {
    try {
        localStorage.setItem("qb", JSON.stringify({ items: items, orders: orders, mine: mine, nid: nid, oid: oid }));
    } catch (e) { }
}
