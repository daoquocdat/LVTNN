
var keyLocalStorageItemCart = 'ListItemCart';

function createItemCart(id, name, description, image, price, amount) {
    var itemCart = new Object()
    itemCart.id = id;
    itemCart.name = name;
    itemCart.description = description;
    itemCart.image = image;
    itemCart.amount = amount;
    itemCart.price = price;
    return itemCart;
}

function getListItemCart() {
    var listItemCart = new Array();
    var jsonListItemCart = localStorage.getItem(keyLocalStorageItemCart);
    if (jsonListItemCart != null) {
        listItemCart = JSON.parse(jsonListItemCart);
    }
    return listItemCart;
}

function saveListItemCartInLocal(listItemCart) {
    var jsonListItemCart = JSON.stringify(listItemCart);
    localStorage.setItem(keyLocalStorageItemCart, jsonListItemCart);
}

function deleteItemCartInLocal(id) {
    var ListItemCart = getListItemCart();
    var idxoa = -1;
    for (var i = 0; i < ListItemCart.length; i++) {
        var itemCart = ListItemCart[i];
        if (itemCart.id == id) {
            idxoa = i;
        }
    }
    for (var i = idxoa; i < ListItemCart.length - 1; i++) {
        ListItemCart[i] = ListItemCart[i + 1];
    }
    if (idxoa != -1) {
        --ListItemCart.length;
    }
    saveListItemCartInLocal(ListItemCart);
}

function addAmountInnerID(idHTML) {
    var nodeCart = document.getElementById(idHTML);
    var ListItemCart = getListItemCart();
    var sl = ListItemCart.length;
    nodeCart.innerText = sl;
    if (sl == 0) {
        var cart = 'GIỎ HÀNG';
        nodeCart.innerText = cart;
    }
}

function saveTotalOrderMoneyInLocal(totalMoney) {
    var keyLocalStorageItemCart = 'TotalOrderMoney';
    var totalOrderMoney = new Object()
    totalOrderMoney.totalOrderMoney = totalMoney;
    console.log(totalOrderMoney);
    var jsonTotalOrderMoney = JSON.stringify(totalOrderMoney);
    localStorage.setItem(keyLocalStorageItemCart, jsonTotalOrderMoney);
}

// hiển thị danh sách sản phẩm lên giỏ hàng
function showListItemCartInnerID(idHTML) {
    var listItemCart = getListItemCart();
    var HTML = listItemCartToHTML(listItemCart);
    var nodeCart = document.getElementById(idHTML);
    nodeCart.innerHTML = HTML;
}

// chuyển một danh sách thành html
function listItemCartToHTML(listItemCart) {
    var allHTML = '';
    for (var i = 0; i < listItemCart.length; i++) {
        allHTML = allHTML + itemCartToHTML(listItemCart[i]);
    }
    return allHTML;
}
// hiển thị giỏ hàng trống
function emptyCartHTML() {
    var HTML = '<div class="cart-item"> giỏ hàng của bạn trống </div>\n';
    return HTML;
}
// chuyển một đối tượng thành html
function itemCartToHTML(itemCart) {
    var price = itemCart.amount * itemCart.price;
    var truoc = '\'';
    var id = truoc + itemCart.id + truoc;
    var idmain = itemCart.id + 'main';
    var idprice = itemCart.id + 'price';
    var html = '<div class="cart-item" id="' + idmain + '">\n' +
        '    <div class="row form-group">\n' +
        '        <div class="col-8"><h3>' + itemCart.name + '</h3></div>\n' +
        '        <div class="col-4">\n' +
        '            <div class="float-right" >\n' +
        '                <a onclick="xoa(' + id + ')"><i class="far fa-times-circle"></i></a>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row form-group">\n' +
        '        <div class="col-3"><img class="cart-item-img" src="/upload/' + itemCart.image + '" alt=""></div>\n' +
        '        <div class="col-9">' + itemCart.description + '</div>\n' +
        '    </div>\n' +
        '    <hr>\n' +
        '    <div class="row form-group">\n' +
        '        <div class="col-6 top">\n' +
        '           <a class="giam btn-giam" onclick="giam(' + id + ')">\n' +
        '               <img class="giam" src="../img/icon/giam.png" alt="giam">\n' +
        '           </a>\n' +
        '           <span class="sl" id="' + itemCart.id + '">' + itemCart.amount + '</span>\n' +
        '           <a class="tang btn-tang" onclick="tang(' + id + ')">\n' +
        '               <img class="tang" src="../img/icon/tang.png" alt="tang">\n' +
        '           </a>\n' +
        '        </div>\n' +
        '        <div class="col-6 down"><div class="float-right" id="' + idprice + '"><span>' + price + '<small>.000đ</small></span></div></div>\n' +
        '    </div>\n' +
        '</div>';
    return html;
}