$(document).ready(() => {

const basePrice = Number($('#base-price').text().trim()) || 0,
	adultPrice = Number($('#adult-price').text().trim()) || 0,
	childPrice = Number($('#kid-price').text().trim()) || 0,
	reserveFormAdults = $('input[type=hidden][name="Adults"]'),
	reserveFormChildren = $('input[type=hidden][name="Children"]'),
    reserveFormQuantity = $('input[type=hidden][name="quantity"]'),
	reserveFormPrice = $('input[type=hidden][name="price"]'),
    reserveFormServiceFee = $('input[type=hidden][name="Service Fee"]');

const updateReserveFormCheckoutValues = (adultCountValue, childCountValue) => { 
    const totalPrice = basePrice + (adultPrice * adultCountValue) 
    + (childPrice * childCountValue);
    
    reserveFormAdults.val(adultCountValue);
    reserveFormChildren.val(childCountValue);
    reserveFormQuantity.val('1');
    reserveFormPrice.val(totalPrice);      
    reserveFormServiceFee.val(basePrice);
}; 

const getReserveFormElements = (e) => {
	const reserveForm = $(e.currentTarget).closest('form'),
     adultCountElem = reserveForm.find("#count-adult"),
     childCountElem = reserveForm.find("#count-child"),
     totalPeopleElem = reserveForm.find("#count-people"),
     adultCountValue = parseInt(adultCountElem.text()),
     childCountValue = parseInt(childCountElem.text());

	return {adultCountElem, childCountElem, adultCountValue, 
  childCountValue, totalPeopleElem};
};

$("[minus-adult]").click((e) => {
    let {adultCountElem, childCountElem, adultCountValue, 
    childCountValue, totalPeopleElem} = getReserveFormElements(e);

    if (adultCountValue > 1) {
    	adultCountValue--;
    	adultCountElem.text(adultCountValue);
    }

    totalPeopleElem.text(adultCountValue + childCountValue);
    updateReserveFormCheckoutValues(adultCountValue, childCountValue); 
});

$("[plus-adult]").click((e) => {
    let {adultCountElem, childCountElem, adultCountValue, 
    childCountValue, totalPeopleElem} = getReserveFormElements(e);

    if (adultCountValue < 30) {
        adultCountValue++;
        adultCountElem.text(adultCountValue);
    }

    totalPeopleElem.text(adultCountValue + childCountValue);
    updateReserveFormCheckoutValues(adultCountValue, childCountValue); 
});

$("[minus-child]").click((e) => {
    let {adultCountElem, childCountElem, adultCountValue, 
    childCountValue, totalPeopleElem} = getReserveFormElements(e);

    if (childCountValue > 0) {
        childCountValue--;
        childCountElem.text(childCountValue);
    }

    totalPeopleElem.text(adultCountValue + childCountValue);
    updateReserveFormCheckoutValues(adultCountValue, childCountValue); 
});

$("[plus-child]").click((e) => {
    let {adultCountElem, childCountElem, adultCountValue, 
    childCountValue, totalPeopleElem} = getReserveFormElements(e);

    if (childCountValue < 30) {
        childCountValue++;
        childCountElem.text(childCountValue);
        if(!Number(adultCountElem.text().trim())) {
            adultCountElem.text(1);
            adultCountValue++;
        }
    }

    totalPeopleElem.text(adultCountValue + childCountValue);
    updateReserveFormCheckoutValues(adultCountValue, childCountValue); 
});

});