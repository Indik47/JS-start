/**@member {Object} - The Car object that is made in the script */
var car = {};
var selectedBrand;
var selectedModel;
var selectedColor;

/**Resets dropdown menu.
 * @function
 */
var resetDropDown = function (dropDownID) {
    var dropDownContainer = document.getElementById(dropDownID);

    for (var i = dropDownContainer.options.length - 1; i >= 1; i--) {
        dropDownContainer.remove(i);
    }
    dropDownContainer.options.selectedIndex = 0;
};

/**Fills dropdown menu with values
 * @function
 * @param {string} dropDownID - The ID  of the dropdown
 * @param {Object} fillValues - Object which keys will be added as dropdown values
 * */
var fillDropDown = function (dropDownID, fillValues) {
    var dropDownContainer = document.getElementById(dropDownID);

    for (var key in fillValues) {
        var dropDownItem = document.createElement("option");
        dropDownItem.value = key;
        dropDownItem.text = dropDownItem.value;
        dropDownContainer.appendChild(dropDownItem);
    }
};

/**Gets selected value of provided dropDown menu
 * @function
 * @param {string} dropDownID - The ID  of the dropdown
 * */
var getDropdownSelectedValue = function (dropDownID) {
    var dropDownMenu = document.getElementById(dropDownID);
    return dropDownMenu.options[dropDownMenu.selectedIndex].text;
};

/**Updates variables with current dropDowns selection
 * @function
 * */
var updateSelection = function () {
    selectedBrand = getDropdownSelectedValue('brands');
    selectedModel = getDropdownSelectedValue('models');
    selectedColor = getDropdownSelectedValue('colors');
};

/**Apllies animation to a provided html element
 * @function
 * @param {string} element - ID of the element
 * @param {string} animDuration - HTML class name of animation modifier (duration, transition)
 * @param {string} animType - HTML class name of animation modifier (color, transform value)
 * */
var launchScaleAnimation = function (element, animDuration, animType) {
    element.classList.add(animDuration, animType);
    clearTimeout(animTimer);
    animTimer = setTimeout(() => {
        element.classList.remove(animType);
        animTimer = setTimeout(() => {
            element.classList.remove(animDuration);
        }, 1000);
    }, 300);
};

/**Displays the price of a created car object
 * Launches sucess animation
 * @function
 * */
var updatePrice = function () {
    var price = document.getElementById('price');
    price.value = car.getPrice();

    launchScaleAnimation(price, 'anim', 'sucess-anim');
};

/**Resets the price field to an empty value
 * @function
 * */
var resetPrice = function () {
    var price = document.getElementById('price');
    price.value = '';
};

/**Initializes checkbox section of additional options. Takes values from static fields of Car constructor.
 * @function
 * */
var initOptions = function () {
    for (var option in Car.OPTIONS) {
        //parent item
        var listItem = document.createElement('li');
        listItem.textContent = option;
        listItem.className = `check-container`;

        //span for "fake checkbox" overlay
        var span = document.createElement('span');
        span.className = `checkmark`;

        //real checkbox
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'options__item-checkbox';

        listItem.append(checkbox, span);

        var parentContainer = document.getElementById('options');
        parentContainer.appendChild(listItem);
    }
};


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


