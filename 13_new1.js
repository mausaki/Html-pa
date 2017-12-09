var storage = sessionStorage;
function doFirst(){
    var itemString = storage.getItem('addItemList');
	var items = itemString.substr(0,itemString.length - 2).split(', ');
	
	newSection = document.createElement('section');
	newTable = document.createElement('table');
	
	subtotal = 0;
	//每購買一個品項就新增一個tr
	for(var key in items){	//use items[key]
		var itemInfo = storage.getItem(items[key]);		
		createCartList(items[key],itemInfo);
		
		var price = parseInt(itemInfo.split('|')[2]);		
		subtotal += price;
		//每個id裡面的2,加等於由檔案10來控制 直接丟過來,把變數塞進來
	}	
	document.getElementById('subtotal').innerText = subtotal;
	//最後將table放進section中，再將section放進cartList
	newSection.appendChild(newTable);
	document.getElementById('cartList').appendChild(newSection);
}
function createCartList(itemKey,itemInfo){
//	alert(itemKey + ' : ' + itemInfo);
	var itemTitle = itemInfo.split('|')[0];
	var itemImage = 'imgs/'+itemInfo.split('|')[1];
	var itemPrice = parseInt(itemInfo.split('|')[2]);
//	alert(itemPrice)
	//建立每個品項的清單區域--tr
	var trItemList = document.createElement('tr');
	trItemList.className = 'item';		//trItemList.setAttribute('class','item');
	
	newTable.appendChild(trItemList);	
	
	//建立商品圖片--第一個td
	var tdImage = document.createElement('td');
	tdImage.style.width = '120px';
	
	var image = document.createElement('img');
	image.src = itemImage;
	image.width = 100;
	
	tdImage.appendChild(image);
	trItemList.appendChild(tdImage);	
	
	//建立商品名稱和刪除按鈕--第二個td
	var tdTitle = document.createElement('td');
	tdTitle.style.width = '260px';
	tdTitle.id = itemKey;
	
	var pTitle = document.createElement('p');
	pTitle.innerText = itemTitle;
	
	var button = document.createElement('button');
	button.innerText = 'Delete';
	button.addEventListener('click',deleteItem,false);
	
	tdTitle.appendChild(pTitle);
	tdTitle.appendChild(button);
	trItemList.appendChild(tdTitle);
	//把t放進td裡把P放進td裡再把button放進td裡
	
	//建立商品價格--第三個td
	var tdPrice = document.createElement('td');
	tdPrice.style.width = '170px';
	tdPrice.innerText = itemPrice;
	
	trItemList.appendChild(tdPrice);
	
	//建立商品數量--第四個td
	var tdItemCount = document.createElement('td');
	tdItemCount.style.width = '60px';
	
	var itemCount = document.createElement('input');
	itemCount.type = 'number';
	itemCount.value = 1;
	itemCount.min = 0;
	itemCount.addEventListener('input',changeItemCount,false);
	//input放進td裡
	//td放進tr裡
	//用按上下鍵來修改的 稱為change, 
	//但是要
	//1直接改他 
	//2按上下鍵改
	可以用input
	tdItemCount.appendChild(itemCount);
	trItemList.appendChild(tdItemCount);
	//內容放進去把它放進tr裡就好了
}
function deleteItem(){
	var itemId = this.parentNode.getAttribute('id');

	//刪除該筆資料之前
	//先將金額扣除
	var itemValue = storage.getItem(itemId);
	//1 id要找到爸爸的屬性值不是在button-而是在td上
	subtotal -= parseInt(itemValue.split('|')[2]);
	//2 找到itemvalue2把它刪了(你把KEY給我我給你value)然後我把value刪掉,這個數字是字串
	//所以要用parseint(錢要先處理,再塞storage)
	document.getElementById('subtotal').innerText = subtotal;
	//---------------------以上還沒有處理storage,沒儲存
	//清除storage的資料
	
	
	
	你在button但是你要找到td,tr,table所以要找到你的爸爸的爸爸的爸爸,找到table才能刪掉tr
	找到爸爸才能刪小孩
	
	
	
	
	
	
	storage.removeItem(itemId);
	storage['addItemList'] = storage['addItemList'].replace(itemId+', ','');
	//找到A1005,空白,把它用'沒東西'取代
	
	
	
	//再將該筆tr刪除
}
function changeItemCount(){
//	alert('Hi~');
}
window.addEventListener('load',doFirst,false);




