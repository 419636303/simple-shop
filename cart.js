function Cart() {
    if (getCookie("cart")) {
        this.cartData = JSON.parse(getCookie('cart'))
    } else {
        this.cartData = {}
    }
}

Cart.prototype.addData = function (id, num, tm) {
    if (!this.cartData[id] || tm) {
        this.cartData[id] = num;
    } else {
        this.cartData[id] = Number(this.cartData[id]) + num
    }
    setCookie("cart", JSON.stringify(this.cartData), 7)
}

Cart.prototype.showData = function (domID) {
    var str = '';
    var data = JSON.parse(localStorage.getItem('data'));
    for (var id in this.cartData) {
        //console.log(id)
        str += `<li data-id=${id}><input class="cko" type = "checkbox">
                                <img src = "${data[id].imgSrc}">
                                <span>${data[id].title}</span>
                                <span class="perprice">${data[id].price}</span>
                                <span class="minus">-</span>
                                <input type="text" class="anums" value = "${this.cartData[id]}">
                                <span class="plus">+</span>
                                <span class = "totalprice">${data[id].price * this.cartData[id]}</span>
                                <input type="button" class="delBtn" value = "删除商品"><li>`
    }

    this.oCartList = document.getElementById(domID)
    this.oCartList.innerHTML = str
    this.aCko = document.getElementsByClassName('cko')
    var aMinus = document.getElementsByClassName('minus')
    var aNums = document.getElementsByClassName('anums')
    this.aTotalPrice = document.getElementsByClassName('totalprice')
    var aPerprice = document.getElementsByClassName('perprice')
    var aPlus = document.getElementsByClassName('plus')
    var aDelbtn = document.getElementsByClassName('delBtn')
    this.aCka = document.getElementById('checkall')
    for (let i = 0; i < aMinus.length; i++) {
        aMinus[i].onclick = () => {
            let id = aMinus[i].parentNode.getAttribute('data-id');
            if (aNums[i].value < 2) {
                alert('请至少添加一件商品');
                return;
            }
            aNums[i].value--;
            this.aTotalPrice[i].innerHTML = aNums[i].value * aPerprice[i].innerHTML;

            this.addData(id, -1, false)
        }
        aPlus[i].onclick = () => {
            let id = aMinus[i].parentNode.getAttribute('data-id');

            aNums[i].value++;
            this.aTotalPrice[i].innerHTML = aNums[i].value * aPerprice[i].innerHTML;

            this.addData(id, 1, false)
        }
        aNums[i].onchange = () => {
            let id = aMinus[i].parentNode.getAttribute('data-id');
            this.aTotalPrice[i].innerHTML = aNums[i].value * aPerprice[i].innerHTML;

            this.addData(id, 1, true)
        }
        aDelbtn[i].onclick = () => {
            let id = aMinus[i].parentNode.getAttribute('data-id');
            this.removeData(id,aDelbtn[i].parentNode);
            
        }
        this.aCko[i].onclick = () => {
            var count = 0
            console.log(this.aCko.length)
            for (var i = 0; i < this.aCko.length; i++) {
                if (this.aCko[i].checked) {
                    count++
                    console.log(count)
                }
                if (count == this.aCko.length) {
                    document.getElementById('checkall').checked = true
                } else {
                    document.getElementById('checkall').checked = false

                }

            }
            this.getTotalprice()
        }
        this.aCka.onclick = () => {
            console.log(this.aCko.length)
            for (var i = 0; i < this.aCko.length; i++) {
                this.aCko[i].checked = this.aCka.checked;
                this.getTotalprice()
            }
        }


    }


}
Cart.prototype.removeData= function (id,dom) {
    delete this.cartData[id];
    this.oCartList.removeChild(dom)
    setCookie("cart", JSON.stringify(this.cartData), 7)
}
Cart.prototype.getTotalprice = function () {

    //console.log(this.sums)
    var sum = 0;
    for (let i = 0; i < this.aCko.length; i++) {
        if (this.aCko[i].checked == true) {
            sum += Number(this.aTotalPrice[i].innerHTML)
        }
    }
    this.sums = document.getElementById('sums');
    this.sums.innerHTML = sum;
}

