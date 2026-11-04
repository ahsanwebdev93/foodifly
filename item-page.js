function $(id){return document.getElementById(id)}
function esc(text){return String(text).replace(/[&<>"]/g,function(char){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]})}
function m(amount){return formatPKR(amount)}

var id=Number(new URLSearchParams(location.search).get("id"));
var item=items.find(function(entry){return entry.id===id});

if(!Number.isInteger(id)||!item){
    document.title="Item not found – QuickBite";
    $("item-detail").innerHTML="<div class='empty-state'><span class='eyebrow'>QUICKBITE MENU</span><h1>Dish not found</h1><p class='mu'>This dish may have been removed from the menu.</p><a class='btn' href='index.html'>Back to menu</a></div>";
}else{
    document.title=item.name+" – QuickBite";
    $("item-detail").innerHTML='<div class="item-layout"><div class="item-art" aria-hidden="true">'+esc(item.emoji)+'</div><div class="item-info"><span class="eyebrow">MADE FRESH, JUST FOR YOU</span><h1>'+esc(item.name)+'</h1><span class="tag">'+esc(item.cat)+'</span><p class="mu" style="margin-top:16px">'+esc(item.desc)+'</p><p class="pr item-price">'+m(item.price)+'</p><div class="item-benefits"><span>✦ Freshly prepared</span><span>◷ Delivered in 30 min</span></div><a class="btn item-cta" href="index.html#item-'+item.id+'">Customise &amp; order <span aria-hidden="true">→</span></a></div></div>';
}
