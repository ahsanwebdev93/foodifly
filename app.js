function $(i){return document.getElementById(i)}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function m(n){return formatPKR(n)}
function view(v,preserveHash){["shop","orders"].forEach(function(k){$("v-"+k).classList.toggle("hide",k!==v)});
document.querySelectorAll(".tab[data-v]").forEach(function(t){t.classList.toggle("on",t.dataset.v===v)});
if(v==="orders")rMine();if(!preserveHash)location.hash=v}
document.querySelectorAll(".tab[data-v]").forEach(function(t){t.onclick=function(){view(t.dataset.v)}});
function rMenu(){var c=["All"].concat(items.map(function(i){return i.cat}).filter(function(x,i,a){return a.indexOf(x)===i}));
$("cats").innerHTML=c.map(function(x){return'<button class="'+(x===cat?"on":"")+'" data-c="'+esc(x)+'">'+esc(x)+"</button>"}).join("");
$("cats").querySelectorAll("button").forEach(function(b){b.onclick=function(){cat=b.dataset.c;rMenu()}});
var query=$("menu-search").value.trim().toLowerCase();
var filtered=items.filter(function(i){return(cat==="All"||i.cat===cat)&&(!query||(i.name+" "+i.desc+" "+i.cat).toLowerCase().indexOf(query)>-1)});
$("menu-count").textContent=filtered.length+" delicious "+(filtered.length===1?"dish":"dishes");
$("menu").innerHTML=filtered.map(function(i){
return'<div class="it"><div class="em">'+esc(i.emoji)+'</div><h3>'+esc(i.name)+'</h3><p>'+esc(i.desc)+'</p><div class="row"><span class="pr">'+m(i.price)+'</span><a class="btn" href="item.html?id='+i.id+'">View dish <span aria-hidden="true">→</span></a></div></div>'}).join("")||'<p class="mu">No dishes found. Try another search or category.</p>'}
 $("menu-search").addEventListener("input",rMenu);
var SZ=[["Small",-420],["Regular",0],["Large",560]];
function openItem(id){var i=items.find(function(x){return x.id===id});
var h="<h2>"+esc(i.emoji)+" "+esc(i.name)+"</h2><p class='mu'>"+esc(i.desc)+"</p><b>Size</b>";
SZ.forEach(function(z,k){h+='<div class="opt"><label><input type="radio" name="sz" value="'+k+'"'+(k===1?" checked":"")+" style='width:auto'> "+z[0]+"</label><span>"+(z[1]?(z[1]>0?"+":"-")+m(Math.abs(z[1])):"")+"</span></div>"});
if(i.addons.length){h+="<b style='display:block;margin-top:12px'>Add extras</b>";i.addons.forEach(function(a,k){h+='<div class="opt"><label><input type="checkbox" data-k="'+k+"\" style='width:auto'> "+esc(a.n)+"</label><span>+"+m(a.p)+"</span></div>"})}
h+='<label class="l" style="margin-top:12px">Note for the kitchen</label><input id="nt" placeholder="No onions, extra spicy…">';
h+='<div class="row" style="margin-top:14px"><span class="pr" id="ip"></span><div><button class="btn g" id="ic">Cancel</button> <button class="btn" id="ia">Add to cart</button></div></div>';
$("md").innerHTML=h;$("ov").classList.add("on");
function calc(){var p=i.price+SZ[+document.querySelector('input[name=sz]:checked').value][1];var ex=[];
$("md").querySelectorAll("[data-k]:checked").forEach(function(c){var a=i.addons[+c.dataset.k];p+=a.p;ex.push(a.n)});return{p:Math.max(p,0),ex:ex}}
function up(){$("ip").textContent=m(calc().p)}up();$("md").onchange=up;
$("ic").onclick=function(){$("ov").classList.remove("on")};
$("ia").onclick=function(){var c=calc(),z=SZ[+document.querySelector('input[name=sz]:checked').value][0];
cart.push({name:i.name,opts:[z].concat(c.ex).join(", ")+($("nt").value?" · "+$("nt").value:""),price:c.p,qty:1});$("ov").classList.remove("on");rCart();$("cart").classList.add("on")}}
$("ov").onclick=function(e){if(e.target===$("ov"))$("ov").classList.remove("on")};
function rCart(){$("cc").textContent=cart.reduce(function(a,l){return a+l.qty},0);
$("cl").innerHTML=cart.length?cart.map(function(l,k){return'<div class="opt"><div><b>'+esc(l.name)+'</b><div class="mu" style="font-size:13px">'+esc(l.opts)+'</div></div><div style="text-align:right">'+m(l.price*l.qty)+'<br><button class="btn g" data-q="'+k+'" data-d="-1">−</button> '+l.qty+' <button class="btn g" data-q="'+k+'" data-d="1">+</button></div></div>'}).join(""):'<p class="mu">Your cart is empty. Pick a dish to start.</p>';
$("ck").classList.toggle("hide",!cart.length);$("ct").textContent=m(cart.reduce(function(a,l){return a+l.price*l.qty},0)+(cart.length?deliveryFee:0))+" (incl. "+m(deliveryFee)+" delivery)";
$("cl").querySelectorAll("[data-q]").forEach(function(b){b.onclick=function(){var l=cart[+b.dataset.q];l.qty+=+b.dataset.d;if(l.qty<1)cart.splice(+b.dataset.q,1);rCart()}})}
$("cb").onclick=function(){$("cart").classList.add("on")};$("cx").onclick=function(){$("cart").classList.remove("on")};
$("po").onclick=function(){if(!$("ad").value.trim()){$("ad").focus();$("ad").placeholder="Enter your address to continue";return}
var t=cart.reduce(function(a,l){return a+l.price*l.qty},0)+deliveryFee;var o={id:oid++,customer:$("nm").value||"Guest",address:$("ad").value,lines:cart.slice(),total:t,status:0};
orders.unshift(o);mine.push(o.id);cart=[];save();rCart();$("cart").classList.remove("on");view("orders")};
function rMine(){var l=orders.filter(function(o){return mine.indexOf(o.id)>-1});
$("mine").innerHTML=l.length?l.map(function(o){return'<div class="card" style="margin-bottom:12px"><div class="row"><b>Order #'+o.id+'</b><span class="tag">'+ST[o.status]+'</span></div><div class="mu">'+o.lines.map(function(x){return x.qty+"× "+esc(x.name)}).join(", ")+" · "+m(o.total)+'</div><div class="bar">'+ST.map(function(_,k){return'<i class="'+(k<=o.status?"on":"")+'"></i>'}).join("")+"</div></div>"}).join(""):'<p class="mu">No orders yet. Order something tasty from the menu.</p>'}
function openLinkedItem(){var match=location.hash.match(/^#item-(\d+)$/);if(!match)return false;
var item=items.find(function(i){return i.id===+match[1]});if(!item)return false;
view("shop",true);openItem(item.id);return true}
function routeHash(){var h=location.hash.slice(1);if(!openLinkedItem())view(["shop","orders"].indexOf(h)>-1?h:"shop")}
window.addEventListener("popstate",routeHash);
rMenu();rCart();routeHash();
