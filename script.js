var showBtn = document.querySelector('.show_btn')
var close = document.querySelector('.close')
var productContain = document.querySelector(".product_contain")

showBtn.addEventListener("click",()=>{
    productContain.style.top = "0vh"
})

close.addEventListener("click",()=>{
    productContain.style.top = "-50vh"
})

var add_btn = document.querySelectorAll(".add_btn")
var cartItems = {}
add_btn.forEach((btn,idx)=>{
    btn.addEventListener("click",(e)=>{
        var product = e.target.closest('.product')
        // console.log(product.innerHTML)
        var productName = product.querySelector('h2').textContent
        var productPriceElement = product.querySelector('.price').textContent
        var productPrice =productPriceElement.replace("$"," ")
        var productImage = product.querySelector('.img').src

        if(cartItems[productName]){
            cartItems[productName].quantity++;
        }else{
            cartItems[productName] = {
                quantity:1,
                price: productPrice,
                img:productImage
            }
        }

        updateCart()
    })
})


var cartData = document.querySelector('.cart_data')
function updateCart(){
    cartData.innerHTML =''

    var totalPrice = 0
    var totalItems = 0

    for(var item in cartItems){
        totalPrice += cartItems[item].price * cartItems[item].quantity
        totalItems += cartItems[item].quantity

        var cartItem = document.createElement('div')
        cartItem.classList.add('product_data')
        cartItem.innerHTML = `
        <img class="product_img" src="${cartItems[item].img}" alt="">
        <div>
            <h2>Product Name</h2>
            <h3 class="product_name">${item}</h3>
        </div>
        <div>
            <h2>Quantity <span class="product_quantity">${cartItems[item].quantity}</span> </h2>
            

        </div>
        <h2 class="product_price">$${cartItems[item].price * cartItems[item].quantity}</h2>
        <button class="remove_btn"> <i class="ri-close-line"></i> </button>
        `
        cartData.appendChild(cartItem);
    }

    var totalItemsData = document.querySelector('.items')
    var totalPriceData = document.querySelector('.total')

    totalItemsData.innerHTML = totalItems
    totalPriceData.innerHTML = `$${totalPrice}`
    var removeBtn = document.querySelectorAll('.remove_btn')
    removeBtn.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        var productName = e.target.closest('.product_data').querySelector('.product_name').textContent
        delete cartItems[productName];
        updateCart()
    })
})
}


var clearCart =document.querySelector(".clear_cart")
clearCart.addEventListener("click",()=>{
    cartItems = {}
    updateCart()
})
