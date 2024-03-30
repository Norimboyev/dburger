const products = {
    crazy: {
        name: "Crazy",
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count'),
    btnCard = document.querySelector('.wrapper__navbar-bottom'),
    print_body = document.querySelector('.print__body'),
    print_footer = document.querySelector('.print__footer')


productBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // closest('селектор') - определяет ближайшего родителя дочернего элемента
        plusOrMinus(btn)
    })
})

function plusOrMinus(btn) {
    let parent = btn.closest(".wrapper__list-card"),
        parentId = parent.getAttribute('id')
    products[parentId].amount++
    basket()
}
// дикомпозиция это разбиение одной задачи на много более маленьких задач

function basket() {
    const productsArray = []
    for (const key in products) {
        const po = products[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndicator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productsArray.push(po)
            parentIndicator.classList.add('active')
            parentIndicator.innerHTML = po.amount
        } else {
            parentIndicator.classList.remove('active')
            parentIndicator.innerHTML = 0
        }
    }
    const allCount = totalCountProducts()
    const totalSumm = totalSummProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSumm.toLocaleString() + ' сум'

    basketChecklist.innerHTML = ''
    productsArray.forEach(prod => {
        basketChecklist.innerHTML += cardItem(prod)
    })
}


function totalCountProducts() {
    let total = 0
    for (const key in products) {
        total += products[key].amount
    }
    return total
}
function totalSummProduct() {
    let totalPrice = 0
    for (const key in products) {
        totalPrice += products[key].totalSumm
    }
    return totalPrice
}

function cardItem(prod) {
    const { name, totalSumm: price, amount, img } = prod
    return `
        <div class="wrapper__navbar-product">
            <div class="wrapper__navbar-info">
                <img src="${img}" alt="" class="wrapper__navbar-productImage" />
                <div>
                    <p class="wrapper__navbar-infoName">${name}</p>
                    <p class="wrapper__navbar-infoPrice">${price.toLocaleString()}</p>
                </div>
            </div>
            <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
                <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
                <output class="wrapper__navbar-count">${amount}</output>
                <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
            </div>
        </div>
     `
}



basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})

closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})


// window - обьект окна браузера 


window.addEventListener('click', e => {
    let btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol'),
            parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const parentId = parent.getAttribute('id').split('_')[0]
            if (attr == '-') products[parentId].amount--
            else if (attr == '+') products[parentId].amount++
            basket()
        }
    }
})



btnCard.addEventListener('click', function () {
    print_body.innerHTML = ''
    for (const key in products) {
        const { name, totalSumm, amount } = products[key]
        if (amount) {
            print_body.innerHTML += `
                <div class="print__body-item">
                    <p class="print__body-item_name">
                        <span>${name}</span>
                        <span>${amount}</span>
                    </p>
                    <p class="print__body-item_price">${totalSumm.toLocaleString()} cум</p>
                </div>
            `
        }
    }
    print_footer.innerHTML = totalSummProduct().toLocaleString() + ' cум'
    window.print()
})