var resetDropDown = function (dropDownID) {
    var dropDownContainer = document.getElementById(dropDownID);

    for (var i = dropDownContainer.options.length - 1; i >= 1; i--) {
        dropDownContainer.remove(i);
    }
    dropDownContainer.options.selectedIndex = 0;
};

var fillDropDown = function (dropDownID, fillValues) {
    var dropDownContainer = document.getElementById(dropDownID);

    for (var key in Object.keys(fillValues)) {
        var dropDownItem = document.createElement("option");
        dropDownItem.value = Object.keys(fillValues)[key];
        dropDownItem.text = dropDownItem.value;
        dropDownContainer.appendChild(dropDownItem);
    }
};

var getDropdownSelectedItem = function (dropDown) {
    var dropDownMenu = document.getElementById(dropDown);
    return dropDownMenu.options[dropDownMenu.selectedIndex].text;
};

var updateSelection = function () {
    selectedBrand = getDropdownSelectedItem('brands');
    selectedModel = getDropdownSelectedItem('models');
    selectedColor = getDropdownSelectedItem('colors');
};

var launchScaleAnimation = function (element, anim, animColor) {
    element.classList.add(anim);
    element.classList.add(animColor);
    clearTimeout(animTimer);
    animTimer = setTimeout(() => {
        element.classList.remove(animColor);
        animTimer = setTimeout(() => {
            element.classList.remove(anim);
        }, 1000);
    }, 300);
};

var updatePrice = function () {
    var price = document.getElementById('price');
    price.value = car.getPrice();

    launchScaleAnimation(price, 'anim', 'sucess-anim');
};

var resetPrice = function () {
    var price = document.getElementById('price');
    price.value = '';
};

var initOptions = function () {
    for (var option in Car.OPTIONS) {
        //parent item
        var listItem = document.createElement('li');
        listItem.textContent = `${option}`;
        listItem.className = `check-container`;

        //span for "fake checkbox" overlay
        var span = document.createElement('span');
        span.className = `checkmark`;

        //real checkbox
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'options__item-checkbox';

        listItem.appendChild(checkbox);
        listItem.appendChild(span);

        var parentContainer = document.getElementById('options');
        parentContainer.appendChild(listItem);
    }
};

var car = {};
var selectedBrand;
var selectedModel;
var selectedColor;

fillDropDown('brands', Car.UNITS);
initOptions(Car.OPTIONS);

// event listeners
//on brand change
document.getElementById('brands').addEventListener("change", function () {
    updateSelection();
    resetPrice();
    resetDropDown('colors');
    resetDropDown('models');
    fillDropDown('models', Car.UNITS[selectedBrand]);
});

//on model change
document.getElementById('models').addEventListener("change", function () {
    updateSelection();
    resetPrice();
    resetDropDown('colors');
    fillDropDown('colors', Car.UNITS[selectedBrand][selectedModel]);
});

//on color change
document.getElementById('colors').addEventListener("change", function () {
    updateSelection();
    resetPrice();
});

//on create car click
document.getElementById('create-car').addEventListener('click', function () {
    try {
        updateSelection();
        car = new Car(selectedBrand, selectedModel, selectedColor);
        car.addOptions();
        console.log(car);
        updatePrice();
    } catch (e) {
        console.log(e);
    }
});


