function displayNone(ele) {
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}

function displayBlock(ele) {
    ele.classList.remove("d-none")
    ele.classList.add("d-block");
}

const config = {
    initialPage : document.getElementById("initialPage"),
    mainPage : document.getElementById("mainPage"),
    burgerInfo : document.getElementById("burgerInfo"),
    userInfo : document.getElementById("userInfo"),
    itemInfo : document.getElementById("displayItems"),
    btnSec : document.getElementById("btnSec"),
}

class User {
    constructor(userName, age, days, money, items) {
        this.userName = userName;
        this.age = age;
        this.days = days;
        this.money = money;
        this.clickCount = 0;
        this.incomePerClick = 25;
        this.incomePerSeconds = 0;
        this.items = items
    }

    addMoney(amount){
        this.money += amount;
    }

    substractMoney(amount){
        this.money -= amount;
    }

    addDay(){
        this.days++;
    }

    increaseAge(){
        this.age++;
    }

    addIncomePerClick(amount){
        this.incomePerClick += amount;
    }

    addIncomePerSeconds(amount){
        this.incomePerSeconds += amount;
    }

    addClickCount() {
        this.clickCount++;
    }
}

class Item {
    constructor(itemName, itemType, imgUrl, price, maxPurchase, incomeType, incomePerClick, incomePerSeconds, quantity) {
        this.itemName = itemName;
        this.itemType = itemType;
        this.imgUrl = imgUrl;
        this.price = price;
        this.maxPurchase = maxPurchase;
        this.incomeType = incomeType;
        this.incomePerClick = incomePerClick;
        this.incomePerSeconds = incomePerSeconds;
        this.quantity = quantity;
    }
    addQuantity(amount) {
        this.quantity += amount;
    }
}

function initializeUserAccount() {
    config.burgerInfo.innerHTML = "";
    config.userInfo.innerHTML = "";
    config.itemInfo.innerHTML = "";
    config.btnSec.innerHTML = "";

    const items = [
        new Item("Flip Machine", "ability", "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", 15000, "500", "click", 25, 0, 0), 
        new Item("ETF Stock", "investment", "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 300000, "∞", "sec",0, 0.1, 0), 
        new Item("ETF Bonds", "investment", "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 300000, "∞", "sec", 0, 0.07, 0), 
        new Item("Lemonade Stand", "realEstate", "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png", 30000, "1000", "sec", 0, 30, 0), 
        new Item("Ice Cream Truck", "realEstate","https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png", 100000, "500", "sec", 0, 120, 0), 
        new Item("House", "realEstate", "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png", 20000000, "100", "sec", 0, 3200, 0), 
        new Item("TownHouse", "realEstate", "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png", 40000000, "100", "sec", 0, 64000, 0), 
        new Item("Mansion", "realEstate", "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png", 250000000, "20", "sec", 0, 500000, 0), 
        new Item("Industrial Space", "realEstate", "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png", 1000000000, "10", "sec", 0, 2200000, 0), 
        new Item("Hotel Skyscraper", "realEstate", "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png", 10000000000, "5", "sec", 0, 25000000, 0), 
        new Item("Sky Railway", "realEstate", "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png", 10000000000000, "1", "sec", 0, 30000000000, 0),
    ];

    let userName = document.getElementById("nameInput").value;
    let userAccount = new User(userName, 20, 0, 50000, items);

    console.log(userAccount);

    config.burgerInfo.append(createBurgerInfo(userAccount));
    config.userInfo.append(createUserInfo(userAccount));
    config.itemInfo.append(createItemInfo(userAccount, items));

    const id = setInterval(() => {
        displayDays(userAccount);
    }, 1000);

    config.btnSec.append(createBtnSec(userAccount, id));
}

function createBurgerInfo(userAccount) {
    let container = document.createElement("div");
    let burgerContainer = document.createElement("div");
    container.append(burgerContainer);

    burgerContainer.innerHTML =
    `
        <div class="bg-blue p-2"">
            <h4 class="col-12" id="numOfBurger">${userAccount.clickCount} Burgers</h4>
            <h5 id="incomePerClick">¥ ${userAccount.incomePerClick} / click</h5>
        </div>
        <div class="p-2 pt-5 d-flex justify-content-center">
            <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width="80%" class="burger-hover img-fluid" id="imgBurger">
        </div>
    `;

    burgerContainer.querySelectorAll("#imgBurger")[0].addEventListener("click", function(){
        userAccount.addClickCount();
        userAccount.addMoney(userAccount.incomePerClick);

        // クリック数の更新
        burgerContainer.querySelectorAll("#numOfBurger")[0].innerHTML = `${userAccount.clickCount} Burgers`;

        config.userInfo.innerHTML = "";
        config.userInfo.append(createUserInfo(userAccount));
    });

    return container;
}

function createUserInfo(userAccount) {
    let container = document.createElement("div");
    let userInfoContainer = document.createElement("div");
    userInfoContainer.classList.add("d-flex", "flex-wrap");

    userInfoContainer.innerHTML =
    `
        <div class="col-12 col-md-6 bg-blue userInfoBorder">
            <p class="m-2">${userAccount.userName}</p>
        </div>
        <div class="col-12 col-md-6 bg-blue userInfoBorder">
            <p class="m-2">${userAccount.age} years-old</p>
        </div>
        <div class="col-12 col-md-6 bg-blue userInfoBorder">
            <p class="m-2">${userAccount.days} days</p>
        </div>
        <div class="col-12 col-md-6 bg-blue userInfoBorder">
            <p class="m-2">¥ ${userAccount.money}</p>
        </div>
    `;

    container.append(userInfoContainer);
    return container;
}

function createItemInfo(userAccount, itemObjArr) {
    let container = document.createElement("div");
    let itemContainer = document.createElement("div");
    container.append(itemContainer);

    for (let i = 0; i < itemObjArr.length; i++) {
        let currentItem = itemObjArr[i];
        let incomeType = currentItem.incomePerClick === 0 ? currentItem.incomePerSeconds : currentItem.incomePerClick;
        let itemType = currentItem.type === "click" ? "click" : "sec";

        itemContainer.innerHTML +=
        `
            <div class="bg-blue col-12 my-1 item-hover">
                <div class="d-flex flex-row align-items-center p-3">
                    <div class="col-6 d-flex flex-row align-items-center">
                        <img src="${currentItem.imgUrl}" class="img-fluid col-5">
                        <div class="col-7 d-flex flex-column text-left">
                            <h4>${currentItem.itemName}</h4>
                            <p>¥ ${currentItem.price}</p>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex flex-column text-right">
                            <h3 id="numOfOwnItem">${currentItem.quantity}</h3>
                            <h6 class="text-success">¥${incomeType} / ${itemType}</h6>
                        </div>
                    </div>
                </di>
            </div>
        `;
    }

    let itemContent = itemContainer.querySelectorAll(".item-hover");

    for (let i = 0; i < itemContent.length; i++) {
        itemContent[i].addEventListener("click", function(){
            itemContainer.innerHTML = "";
            itemContainer.append(createPurchasePage(userAccount ,itemObjArr, i));
        });
    }

    return container;
}

function createPurchasePage(userAccount, itemObjArr, index) {
    let itemObj = itemObjArr[index];

    let container = document.createElement("div");
    let purchasePageContainer = document.createElement("div");

    let incomeType = itemObj.incomePerClick === 0 ? itemObj.incomePerSeconds : itemObj.incomePerClick;
    let itemType = itemObj.type === "click" ? "click" : "sec";

    purchasePageContainer.innerHTML =
    `
    <div class="bg-blue col-12 d-flex flex-column">
        <div class="col-12 d-flex flex-row py-2">
            <div class="col-6 pl-3 text-left d-flex flex-column justify-content-center">
                <h2 class="pb-3">${itemObj.itemName}</h2>
                <p class="pb-3">Max Purchases: ${itemObj.maxPurchase}</p>
                <p class="pb-3">Price: ¥${itemObj.price}</p>
                <p>Get: ¥${incomeType} / ${itemType}</p>
            </div>
            <div class="col-6">
                <img src=${itemObj.imgUrl} class="p-3 img-fluid">
            </div>
        </div>
        <div class="col-12">
            <label for="inputNumOfPurchase" class="col-12 text-left pb-2">How many would you like to buy?</label>
            <input id="numOfItem" type="number" class="col-12 form-control text-right" min="0" placeholder="0">
            <div class="col-12 pt-2">
                <p id="totalBillAmount" class="text-right">Total: ¥0</p>
            </div>
        </div>
        <div class="col-12 d-flex flex-row justify-content-between p-3 pb-4">
            <div class="col-5 pl-0">
                <button id="backBtn" class="btn btn-outline-primary btn-lg bg-white col-12 goBack-hover">Go Back</button>
            </div>
            <div class="col-5 pr-0">
                <button id="purchaseBtn" class="btn btn-primary btn-lg col-12">Purchase</button>
            </div>
        </div>
    </div>
    `;

    let inputNum = purchasePageContainer.querySelectorAll("#numOfItem")[0];

    // 購入数を入力するinput
    inputNum.addEventListener("change", function(){
        let targetP = purchasePageContainer.querySelectorAll("#totalBillAmount")[0];

        targetP.innerHTML = `Total: ¥${billSumtation(itemObj, inputNum.value).toString()}`;
    })

    // 戻るボタン
    purchasePageContainer.querySelectorAll("#backBtn")[0].addEventListener("click", function(){
        purchasePageContainer.innerHTML = "";
        config.itemInfo.append(createItemInfo(userAccount, itemObjArr));
    });
    
    // ユーザーが買うボタンを押したとき
    purchasePageContainer.querySelectorAll("#purchaseBtn")[0].addEventListener("click", function(){
        let userPurchased = inputNum.value;

        if (userPurchased === "0" || userPurchased === "") alert("Invalid Number");
        else if (userAccount.money < billSumtation(itemObj, userPurchased)) alert("You don\'t have enough money.");
        else if (itemObj.maxPurchase !== "∞" && (parseInt(userPurchased) + itemObj.quantity) > itemObj.maxPurchase) alert(`You can\'t buy more than ${itemObj.maxPurchase}.`);
        else {
            let result = confirm(`Buy ${userPurchased} ${itemObj.itemName} for ${billSumtation(itemObj, userPurchased)} ?`);

            if (result) actionWhenPerchased(userAccount, itemObj, userPurchased);
            else return;
        }

        purchasePageContainer.innerHTML = "";
        config.itemInfo.append(createItemInfo(userAccount, itemObjArr));
    });


    container.append(purchasePageContainer);
    return container;
}

function createBtnSec(userAccount, id) {
    let container = document.createElement("div");
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("d-flex", "justify-content-center")
    container.append(btnContainer);

    btnContainer.innerHTML =
    `
        <div class="col-5 pl-0">
            <button class="btn btn-primary col-10" id="resetBtn"><i class="fas fa-rotate-left fa-2x fa-fw"></i><strong>Reset</strong></button>
        </div>
        <div class="col-5 pr-0">
            <button class="btn btn-dark col-10" id="saveBtn"><i class="fas fa-floppy-disk fa-2x fa-fw"></i><strong>Save</strong></button>
        </div>
    `;

    // resetボタン
    btnContainer.querySelectorAll("#resetBtn")[0].addEventListener("click", function(){
        let result = confirm("Reset All Data?");
    
        if (result) {
            clearInterval(id);
            initializeUserAccount();
        } else return;
    });

    // saveボタン
    btnContainer.querySelectorAll("#saveBtn")[0].addEventListener("click", function(){
        // localStorage.setItem("user-data", );
        alert("Saved your data. Please put the same name when you login.");
    });

    return container;
}

function billSumtation(itemObj, quantity) {
    let res = itemObj.price * parseInt(quantity);

    if (itemObj.itemName === "ETF Stock") return billSumtationHelper(itemObj.price, parseInt(quantity));
    else return res;
}

// ここがまだできてない
function billSumtationHelper(price, quantity) {
    if (quantity <= 1) return 300000;
    else return billSumtationHelper(price, quantity - 1) + price * 1.1;
}

// 購入したときの処理まとめ
function actionWhenPerchased(userAccount, itemObj, userPurchased) {
    userAccount.substractMoney(billSumtation(itemObj, userPurchased));
    userAccount.addIncomePerClick(itemObj.incomePerClick * parseInt(userPurchased));
    itemObj.addQuantity(parseInt(userPurchased));

    if (itemObj.itemType === "investment") {
        userAccount.addIncomePerSeconds(Math.floor(billSumtation(itemObj, userPurchased) * (itemObj.incomePerSeconds / 100)));
        console.log(userAccount.incomePerSeconds);
    }
    else {
        userAccount.addIncomePerSeconds(itemObj.incomePerSeconds * parseInt(userPurchased));
        console.log(userAccount.incomePerSeconds);
    }

    config.burgerInfo.innerHTML = "";
    config.burgerInfo.append(createBurgerInfo(userAccount));
}

function displayDays(userAccount) {
    userAccount.addDay();
    userAccount.addMoney(userAccount.incomePerSeconds);
    if (userAccount.days != 0 && userAccount.days % 365 == 0) {
        userAccount.increaseAge();
        config.userInfo.append(createUserInfo(userAccount));
    } else;

    config.userInfo.innerHTML = "";
    config.userInfo.append(createUserInfo(userAccount));
}

// newボタン
document.getElementById("newBtn").addEventListener("click", function(){
    let userName = document.getElementById("nameInput").value;
    if (!userName) {
        alert("Please put your name");
        return false;
    } else {
        initializeUserAccount();
        displayNone(config.initialPage);
        displayBlock(config.mainPage);
    }
});

// loginボタン
document.getElementById("loginBtn").addEventListener("click", function(){
    let userName = document.getElementById("nameInput").value;
    
    if (!userName) {
        alert("Please put your name");
        return false;
    } else if (userName === "!") {
        alert("There is no data");
        return false;
    } else {

    }
});