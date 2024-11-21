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

// lấy danh sách sản phẩm trong giỏ hàng
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
        nodeCart.innerText = 'GIỎ HÀNG';
    }
}

// lưu tổng tiền hàng xuống trong localStorage
function saveTotalOrderMoneyInLocal(totalMoney) {
    const totalOrderMoney = { totalOrderMoney: totalMoney };
    localStorage.setItem('TotalOrderMoney', JSON.stringify(totalOrderMoney));
}

// hiển thị danh sách sản phẩm lên giỏ hàng
function showListItemCartInnerID(idHTML) {
    var listItemCart = getListItemCart();
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById(idHTML).innerHTML = listItemCartToHTML(listItemCart);
    });
}

// chuyển một danh sách thành html
function listItemCartToHTML(listItemCart) {
    var allHTML = '';
    for (var i = 0; i < listItemCart.length; i++) {
        allHTML = allHTML + itemCartToHTML(listItemCart[i]);
    }
    return allHTML;
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
        '               <i class="fas fa-minus-circle"></i>\n' +
        '           </a>\n' +
        '           <span class="sl" id="' + itemCart.id + '">' + itemCart.amount + '</span>\n' +
        '           <a class="tang btn-tang" onclick="tang(' + id + ')">\n' +
        '               <i class="fas fa-plus-circle"></i>\n' +
        '           </a>\n' +
        '        </div>\n' +
        '        <div class="col-6 down"><div class="float-right" id="' + idprice + '"><span>' + price + '<small>.000đ</small></span></div></div>\n' +
        '    </div>\n' +
        '</div>';
    return html;
}

// hàm hiển thị giỏ hàng trống
function showEmptyCart() {
    var gioHang = document.getElementsByClassName('cart-content')[0];
    gioHang.innerHTML =
        '<div class="empty-cart-container">\n' +
        '  <div class="empty-cart">\n' +
        '    <h1>Giỏ hàng của bạn đang trống.</h1>\n' +
        '    <h1>Hãy đặt món ngay!</h1>\n' +
        '    <div class="row">\n' +
        '      <div class="form-group">\n' +
        '        <a href="/">\n' +
        '          <button style="width: 40%" class="btn btn-outline-dark btn-lg border-radius-20" type="button">\n' +
        '            Bắt đầu đặt hàng</button>\n' +
        '        </a>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>';
}





