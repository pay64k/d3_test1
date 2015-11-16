function addEventToStorage(counter, eventEntry){

	if (checkEventInStorage(counter)) {
		$.jStorage.set(counter.toString(),eventEntry);
	};

}

function checkEventInStorage(counter){

	var value = $.jStorage.get(counter.toString());
	if(!value){
		return true;
	}else{
		return false;
	}
}