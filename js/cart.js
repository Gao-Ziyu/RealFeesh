$(document).ready(function () {
    let cart = [];
    let cartTotal = 0;

    // get cart from local storage
    if (localStorage.getItem("cart") != null) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    // get cart total from local storage
    if (localStorage.getItem("cartTotal") != null) {
        cartTotal = JSON.parse(localStorage.getItem("cartTotal"));
    }

    updatecart();
    
    function updatecart() {
        for (i = 0; i < cart.length; i++) {
            $("#items").append(`
                <div class="checkout-product">
                        <div class="item">
                            <div class="product-images">
                                <img src="` + cart[i].image + `" alt="Placholder Image 2" class="product-frame">
                            </div>
                            <div class="product-details">
                                <h1 style="text-align: left">` + cart[i].name + `</h1>
                                <p><strong>Navy, Size 18</strong></p>
                            </div>
                        </div>
                        <div class="itm-price">$` + cart[i].price + `</div>
                        <div class="item-quantity">
                            <input type="number" value="1" min="1" class="quantity-field">
                        </div>
                        <div class="subtotal">` + cart[i].price + `</div>
                        <div class="remove">
                            <button class="remove-from-cart" data-id="` + cart[i].id + `">Remove</button>
                        </div>
                </div>
            `);
        }

        $("#checkout-subtotal").html("$" + cartTotal);
        $("#checkout-total").html("$" + cartTotal);
    }

    // add to cart
    $("#add-to-cart").on("click", function (e) {
        e.preventDefault();

        let id = Math.floor(Math.random() * 1000000000);
        let name = $(this).attr("data-name");
        let price = $(this).attr("data-price");
        let image = $(this).attr("data-image");

        let cartItem = {
            "id": id,
            "name": name,
            "price": price,
            "image": image
        };

        cart.push(cartItem);
        cartTotal += parseInt(price);

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cartTotal", JSON.stringify(cartTotal));

        alert("Item added to cart");
        console.log("item added to cart");
    }
    );

    // remove from cart base on id
    $(".remove-from-cart").on("click", function (e) {
        e.preventDefault();

        let id = $(this).attr("data-id");

        for (i = 0; i < cart.length; i++) {
            if (cart[i].id == id) {
                cartTotal -= parseInt(cart[i].price);
                cart.splice(i, 1);
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    
        $(this).parent().parent().remove();

        console.log("item removed from cart");
        $("#checkout-subtotal").html("$" + cartTotal);
        $("#checkout-total").html("$" + cartTotal);
    }
    );

    // price-display
    $("#price-display").html("$" + cartTotal);
});