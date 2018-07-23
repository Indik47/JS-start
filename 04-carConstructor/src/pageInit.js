var resetDropDown = function(dropDownID) {
  var dropDownContainer = document.getElementById(dropDownID);

  for (var i = dropDownContainer.options.length - 1; i >= 1; i--) {
    dropDownContainer.remove(i);
  }
  dropDownContainer.options.selectedIndex = 0;
};

var fillDropDown = function (dropDownID, fillValues) {
  var dropDownContainer = document.getElementById(dropDownID);

  for ( var key in Object.keys(fillValues) ) {
    var dropDownItem = document.createElement("option");
    dropDownItem.value = Object.keys(fillValues)[key];
    dropDownItem.text = dropDownItem.value;
    dropDownContainer.appendChild(dropDownItem);
  }
};

var getMenuSelectedItem = function (dropDown) {
  var dropDownMenu = document.getElementById(dropDown);
  return dropDownMenu.options[dropDownMenu.selectedIndex].text;
};

var updateSelection = function () {
  selectedBrand = getMenuSelectedItem('brands');
  selectedModel = getMenuSelectedItem('models');
  selectedColor = getMenuSelectedItem('colors');
};

var updatePrice = function () {
  var price = document.getElementById('price');
  price.value = car.getPrice();
};

var resetPrice = function () {
  var price = document.getElementById('price');
  price.value = '-' ;
};

var disableCreate = function () {
  var button = document.getElementById('create-car');
  button.disabled = true;
};

var enableCreate = function () {
  var button = document.getElementById('create-car');
  button.disabled = false;
};

var initOptions = function () {
  for (var option in Car.OPTIONS) {
    var label = document.createElement('label');
    label.className = `options__item`;
    label.textContent = `${option}`;
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'options__item-checkbox';
    label.appendChild(checkbox);

    var parentContainer = document.getElementById('options');
    parentContainer.appendChild(label);
  }
};

var selectedBrand;
var selectedModel;
var selectedColor;
fillDropDown('brands', Car.UNITS);
initOptions(Car.OPTIONS);
disableCreate();


// event listeners
//on brand change
document.getElementById('brands').addEventListener( "change", function () {
  updateSelection();
  resetPrice();
  disableCreate();
  resetDropDown('colors');
  resetDropDown('models');
  fillDropDown( 'models', Car.UNITS[selectedBrand]);
} );

//on model change
document.getElementById('models').addEventListener( "change", function () {
  updateSelection();
  resetPrice();
  disableCreate();
  resetDropDown('colors');
  fillDropDown('colors', Car.UNITS[selectedBrand][selectedModel]);
} );

//on color change
document.getElementById('colors').addEventListener( "change", function () {
  updateSelection();
  resetPrice();
  enableCreate();
});




