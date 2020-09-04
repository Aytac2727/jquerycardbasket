let cart = [];

let btnToCart = $(".btnToCart");
let cartContent = $("#mainCart .modal-body");

btnToCart.on("click", function() {
    let product = {
        name:$(this).parent().find(".productName").text(),
        price: $(this).parent().find(".productPrice").text(),
        image:$(this).parent().find("img").attr("src"),
        quantity:1
    }

    

    const isInCart = cart.filter(cartitem=>cartitem.name === product.name).length > 0;
    if (!isInCart) {

        cartContent.append(
            `
        <div class="cart-item d-flex align-items-center justify-content-between">
            <img width="30%" class="img-fluid" src="${product.image}" alt="">
            <h6 class="productName">${product.name}</h4>
            <p class="productPrice">${product.price}</p>
            <button class="btnCartDecrease btn btn-sm btn-primary">&minus;</button>
            <h6 class="productQuantity">${product.quantity}</h6>
            <button class="btnCartIncrease btn btn-sm btn-primary">&plus;</button>
            <button class="btnCartDelete btn btm-sm btn-danger">&times;</button>
        </div>
            `
        )

        cart.push(product);

        const cartItemsDom = document.querySelectorAll(".cart-item")
        cartItemsDom.forEach(cartItemDom => {
            var proName = cartItemDom.querySelector(".productName").innerText;
            if(proName === product.name) {
                cartItemDom.querySelector(".btnCartDelete").addEventListener("click", function() {
                   cart.forEach(cartItem => {
                       if (cartItem.name === product.name) {
                           cartItemDom.remove();
                           cart = cart.filter(cartItem=>cartItem.name !== product.name)
                       }
                   }) 
               })

               cartItemDom.querySelector(".btnCartDecrease").addEventListener("click", function() {
                cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {
                            if (cartItem.quantity > 1) {
                            cartItemDom.querySelector(".productQuantity").innerText = --cartItem.quantity
                        } else {
                            cartItemDom.remove()
                        }
                    }
                }) 
            })

            cartItemDom.querySelector(".btnCartIncrease").addEventListener("click", ()=>IncreaseBTN (cartItemDom,product) )

            }
        });
    }    

})

function IncreaseBTN (cartItemDom,product) {
        cart.forEach(cartItem => {
                if (cartItem.name === product.name) {
                    cartItemDom.querySelector(".productQuantity").innerText = ++cartItem.quantity
                } 
           }) 
}