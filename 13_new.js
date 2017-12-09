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
	
	tdItemCount.appendChild(itemCount);
	trItemList.appendChild(tdItemCount);
}
function deleteItem(){
	var itemId = this.parentNode.getAttribute('id');

	//刪除該筆資料之前
	//先將金額扣除
	var itemValue = storage.getItem(itemId);
	subtotal -= parseInt(itemValue.split('|')[2]);
	document.getElementById('subtotal').innerText = subtotal;
	
	//清除storage的資料
	storage.removeItem(itemId);
	storage['addItemList'] = storage['addItemList'].replace(itemId+', ','');	
	
	//再將該筆tr刪除
	this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
	//你在button但是你要找到td,tr,table所以要找到你的爸爸的爸爸的爸爸,找到table才能刪掉tr
	//找到爸爸才能刪小孩
}
function changeItemCount(){
//	alert('Hi~');
}
window.addEventListener('load',doFirst,false);




