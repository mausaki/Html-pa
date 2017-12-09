var storage = sessionStorage;
function doFirst(){
	if(storage['addItemList']==null){
	   storage['addItemList'] = '';		//storage.setItem('addItemList','');
	}
   
	//幫每個Add Cart建事件聆聽的功能
	var list = document.querySelectorAll('.addButton');	//list是陣列
	for(var i=0; i<list.length; i++){
	   list[i].addEventListener('click',function(){
		   var teddyInfo = document.querySelector('#'+this.id+' input').value;
		   addItem(this.id,teddyInfo);
	   });
	}
}
function addItem(itemId, itemValue){
//	alert(itemId + ' : ' + itemValue);
	var image = document.createElement('img');
	image.src = 'imgs/' + itemValue.split('|')[1];
	image.id = 'imageSelect';
	
	var title = document.createElement('span');
	title.innerText = itemValue.split('|')[0];
	
	var price = document.createElement('span');
	price.innerText = parseInt(itemValue.split('|')[2]);	
	
	var newItem = document.getElementById('newItem');
	
	//先判斷此處是否已有物件，如果有要先刪除
	if(newItem.hasChildNodes()){
		while(newItem.childNodes.length >= 1){
			newItem.removeChild(newItem.firstChild);
		}
	}		
	
	//再顯示新物件
	newItem.appendChild(image);
	newItem.appendChild(title);
	newItem.appendChild(price);
	
	//存入storage
	if(storage[itemId]){
		alert('You have checked!');
	}else{
		storage[itemId] = itemValue;
		storage['addItemList'] += itemId + ', ';
	}
	
	//計算購買數量和小計
	var itemString = storage.getItem('addItemList');
	var items = itemString.substr(0,itemString.length - 2).split(', ');
//	console.log(items);
//	console.log(items.length);

	subtotal = 0;
	for(var key in items){	//use items[key]
		var itemInfo = storage.getItem(items[key]);
		var itemPrice = parseInt(itemInfo.split('|')[2]);
		
		subtotal += itemPrice;
	}

	document.getElementById('itemCount').innerText = items.length;
	document.getElementById('subtotal').innerText = subtotal;
}
window.addEventListener('load',doFirst);









