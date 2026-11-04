var ST = ["New", "Preparing", "On the way", "Delivered"];
var items = [
    { id: 1, name: "Smash burger", cat: "Burgers", price: 9.5, emoji: "🍔", desc: "Two patties, cheddar, house sauce.", addons: [{ n: "Extra cheese", p: 1.5 }, { n: "Bacon", p: 2 }] },
    { id: 2, name: "Margherita pizza", cat: "Pizza", price: 11, emoji: "🍕", desc: "Tomato, mozzarella, fresh basil.", addons: [{ n: "Extra mozzarella", p: 2 }, { n: "Olives", p: 1 }] },
    { id: 3, name: "Chicken biryani", cat: "Rice", price: 10, emoji: "🍛", desc: "Slow-cooked basmati with spiced chicken.", addons: [{ n: "Raita", p: 1 }, { n: "Boiled egg", p: 1 }] },
    { id: 4, name: "Salmon sushi set", cat: "Sushi", price: 14, emoji: "🍣", desc: "Eight pieces with soy and wasabi.", addons: [{ n: "Miso soup", p: 2.5 }] },
    { id: 5, name: "Crispy fries", cat: "Sides", price: 4, emoji: "🍟", desc: "Skin-on, sea salt.", addons: [{ n: "Cheese dip", p: 1 }] },
    { id: 6, name: "Mango lassi", cat: "Drinks", price: 3.5, emoji: "🥭", desc: "Chilled yoghurt drink.", addons: [] },
    { id: 7, name: "Classic cheeseburger", cat: "Burgers", price: 8.5, emoji: "🍔", desc: "Grilled beef, cheddar, lettuce, and house sauce.", addons: [{ n: "Bacon", p: 2 }, { n: "Extra patty", p: 3 }] },
    { id: 8, name: "Crispy chicken burger", cat: "Burgers", price: 9, emoji: "🍗", desc: "Crispy chicken, slaw, and tangy mayo.", addons: [{ n: "Extra pickles", p: 0.5 }, { n: "Cheese", p: 1 }] },
    { id: 9, name: "Mushroom Swiss burger", cat: "Burgers", price: 10, emoji: "🍔", desc: "Beef patty, sauteed mushrooms, and Swiss cheese.", addons: [{ n: "Extra mushrooms", p: 1.5 }, { n: "Bacon", p: 2 }] },
    { id: 10, name: "Veggie garden burger", cat: "Burgers", price: 8, emoji: "🥬", desc: "Plant-based patty with tomato, lettuce, and avocado.", addons: [{ n: "Avocado", p: 1.5 }, { n: "Vegan cheese", p: 1 }] },
    { id: 11, name: "BBQ bacon burger", cat: "Burgers", price: 10.5, emoji: "🍔", desc: "Beef, smoky barbecue sauce, crispy bacon, and cheddar.", addons: [{ n: "Extra bacon", p: 2 }, { n: "Onion rings", p: 1.5 }] },
    { id: 12, name: "Pepperoni pizza", cat: "Pizza", price: 12, emoji: "🍕", desc: "Classic tomato and mozzarella topped with pepperoni.", addons: [{ n: "Extra pepperoni", p: 2 }, { n: "Chili flakes", p: 0.5 }] },
    { id: 13, name: "Four cheese pizza", cat: "Pizza", price: 13, emoji: "🧀", desc: "Mozzarella, cheddar, parmesan, and blue cheese.", addons: [{ n: "Extra mozzarella", p: 2 }, { n: "Mushrooms", p: 1.5 }] },
    { id: 14, name: "BBQ chicken pizza", cat: "Pizza", price: 13, emoji: "🍕", desc: "Barbecue chicken, red onion, and mozzarella.", addons: [{ n: "Extra chicken", p: 2.5 }, { n: "Jalapenos", p: 1 }] },
    { id: 15, name: "Veggie supreme pizza", cat: "Pizza", price: 11.5, emoji: "🍕", desc: "Bell peppers, olives, mushrooms, and red onion.", addons: [{ n: "Extra olives", p: 1 }, { n: "Vegan cheese", p: 1.5 }] },
    { id: 16, name: "Spicy tuna roll", cat: "Sushi", price: 9, emoji: "🍣", desc: "Tuna, cucumber, and spicy mayo in seasoned rice.", addons: [{ n: "Extra spicy mayo", p: 0.75 }, { n: "Avocado", p: 1.5 }] },
    { id: 17, name: "California roll", cat: "Sushi", price: 8.5, emoji: "🍣", desc: "Crab, avocado, and cucumber wrapped in rice.", addons: [{ n: "Extra avocado", p: 1.5 }, { n: "Sesame seeds", p: 0.5 }] },
    { id: 18, name: "Rainbow sushi roll", cat: "Sushi", price: 13, emoji: "🌈", desc: "Crab and avocado roll topped with fresh fish.", addons: [{ n: "Extra ginger", p: 0.5 }, { n: "Miso soup", p: 2.5 }] },
    { id: 19, name: "Vegetable maki", cat: "Sushi", price: 7.5, emoji: "🥒", desc: "Cucumber, avocado, and carrot maki rolls.", addons: [{ n: "Extra avocado", p: 1.5 }, { n: "Edamame", p: 2 }] },
    { id: 20, name: "Teriyaki chicken bowl", cat: "Rice", price: 11, emoji: "🍚", desc: "Steamed rice with glazed chicken and vegetables.", addons: [{ n: "Extra chicken", p: 2.5 }, { n: "Fried egg", p: 1 }] },
    { id: 21, name: "Beef fried rice", cat: "Rice", price: 10.5, emoji: "🥘", desc: "Wok-fried rice with tender beef, egg, and scallions.", addons: [{ n: "Extra beef", p: 2.5 }, { n: "Chili oil", p: 0.5 }] },
    { id: 22, name: "Vegetable curry rice", cat: "Rice", price: 9, emoji: "🍛", desc: "Aromatic vegetable curry served over basmati rice.", addons: [{ n: "Raita", p: 1 }, { n: "Naan", p: 2 }] },
    { id: 23, name: "Garlic naan", cat: "Sides", price: 3, emoji: "🫓", desc: "Warm flatbread brushed with garlic butter.", addons: [{ n: "Extra garlic butter", p: 0.5 }] },
    { id: 24, name: "Onion rings", cat: "Sides", price: 4.5, emoji: "🧅", desc: "Golden battered onion rings with a crisp bite.", addons: [{ n: "Ranch dip", p: 0.75 }, { n: "BBQ dip", p: 0.75 }] },
    { id: 25, name: "Mozzarella sticks", cat: "Sides", price: 5.5, emoji: "🧀", desc: "Crispy mozzarella sticks with marinara sauce.", addons: [{ n: "Extra marinara", p: 0.75 }] },
    { id: 26, name: "Garden side salad", cat: "Sides", price: 5, emoji: "🥗", desc: "Mixed greens, cucumber, tomato, and house dressing.", addons: [{ n: "Add chicken", p: 2.5 }, { n: "Add avocado", p: 1.5 }] },
    { id: 27, name: "Chocolate brownie", cat: "Desserts", price: 5, emoji: "🍫", desc: "Warm chocolate brownie with a soft center.", addons: [{ n: "Vanilla ice cream", p: 1.5 }, { n: "Caramel sauce", p: 0.75 }] },
    { id: 28, name: "New York cheesecake", cat: "Desserts", price: 6, emoji: "🍰", desc: "Creamy baked cheesecake with a buttery crumb base.", addons: [{ n: "Berry sauce", p: 1 }, { n: "Whipped cream", p: 0.75 }] },
    { id: 29, name: "Apple pie", cat: "Desserts", price: 5.5, emoji: "🥧", desc: "Cinnamon-spiced apples in a flaky golden crust.", addons: [{ n: "Vanilla ice cream", p: 1.5 }] },
    { id: 30, name: "Strawberry sundae", cat: "Desserts", price: 5, emoji: "🍨", desc: "Vanilla ice cream with strawberries and strawberry sauce.", addons: [{ n: "Chocolate chips", p: 0.75 }, { n: "Extra cream", p: 0.75 }] },
    { id: 31, name: "Iced latte", cat: "Drinks", price: 4.5, emoji: "🧋", desc: "Chilled espresso with milk over ice.", addons: [{ n: "Vanilla syrup", p: 0.5 }, { n: "Oat milk", p: 0.75 }] },
    { id: 32, name: "Fresh lemonade", cat: "Drinks", price: 3.5, emoji: "🍋", desc: "Freshly squeezed lemons with a hint of sweetness.", addons: [{ n: "Mint", p: 0.5 }, { n: "Sparkling water", p: 0.5 }] },
    { id: 33, name: "Strawberry smoothie", cat: "Drinks", price: 5, emoji: "🍓", desc: "Blended strawberries, banana, and yoghurt.", addons: [{ n: "Protein boost", p: 1.5 }, { n: "Oat milk", p: 0.75 }] },
    { id: 34, name: "Cola", cat: "Drinks", price: 2.5, emoji: "🥤", desc: "Chilled, fizzy cola served over ice.", addons: [{ n: "No ice", p: 0 }] },
    { id: 35, name: "Tomato basil soup", cat: "Sides", price: 6, emoji: "🍅", desc: "Slow-simmered tomato soup finished with fresh basil.", addons: [{ n: "Croutons", p: 0.75 }, { n: "Grilled cheese", p: 2 }] },
    { id: 36, name: "Chicken Caesar wrap", cat: "Sides", price: 8.5, emoji: "🌯", desc: "Grilled chicken, crisp lettuce, parmesan, and Caesar dressing.", addons: [{ n: "Extra chicken", p: 2.5 }, { n: "Avocado", p: 1.5 }] }
];
var orders = [], cart = [], cat = "All", editId = null, mine = [], nid = 37, oid = 1001;
var schemaVersion = 2;

try {
    var saved = JSON.parse(localStorage.getItem("qb"));
    if (saved) {
        if (!saved.schemaVersion || saved.schemaVersion < schemaVersion) {
            var newItems = items.slice(6);
            items = saved.items || items.slice(0, 6);
            var maxItemId = items.reduce(function (max, item) { return Math.max(max, item.id || 0); }, 0);
            nid = Math.max(saved.nid || 1, maxItemId + 1);
            newItems.forEach(function (item) {
                var migratedItem = Object.assign({}, item, { id: nid++ });
                items.push(migratedItem);
            });
            saved.schemaVersion = schemaVersion;
            saved.items = items;
            saved.nid = nid;
            localStorage.setItem("qb", JSON.stringify(saved));
        } else {
            items = saved.items;
            nid = saved.nid || nid;
        }
        orders = saved.orders;
        mine = saved.mine;
        oid = saved.oid;
    }
} catch (e) { }

function save() {
    try {
        localStorage.setItem("qb", JSON.stringify({ schemaVersion: schemaVersion, items: items, orders: orders, mine: mine, nid: nid, oid: oid }));
    } catch (e) { }
}
