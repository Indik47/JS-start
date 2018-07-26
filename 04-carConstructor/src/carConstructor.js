'use strict';
var animTimer;

/**Shows error animation if car cannot be created
 * @function
 * */
var makeError = function (error) {
    price.value = error;
    launchScaleAnimation(price, 'anim', 'error-anim');
};

/**Creates new car
 * @class
 * @param {string} brand - Car manufacturer brand
 * @param {string} model - Car model name
 * @param {string} color - Car color
 * */
var Car = function (brand, model, color) {
    this.brand = null;
    this.model = null;
    this.color = null;
    this.options = [];

    if (!(brand in Car.UNITS)) {
        makeError('Brand not selected')
    }

    this.brand = brand;

    if (!(model in Car.UNITS[brand])) {
        makeError('Model not selected')
    }

    this.model = model;

    if (!(color in Car.UNITS[brand][model])) {
        makeError(`Color not selected`);
    }

    this.color = color;
};

Car.UNITS = {
    bmw: {
        series3: {
            black: {
                quantity: 2,
                price: 27880
            },
            silver: {
                quantity: 3,
                price: 29800
            }
        },
        series5: {
            black: {
                quantity: 2,
                price: 36900
            },
            royalBlue: {
                quantity: 1,
                price: 39800
            }
        },
    },
    audi: {
        a3: {
            black: {
                quantity: 1,
                price: 26340
            },
            white: {
                quantity: 2,
                price: 25400
            }
        },
        a4: {
            black: {
                quantity: 2,
                price: 38900
            },
            darkRed: {
                quantity: 1,
                price: 41200
            }
        }
    },
    mercedes: {
        classA: {
            black: {
                quantity: 1,
                price: 28120
            },
            white: {
                quantity: 2,
                price: 29400
            }
        },
        classC: {
            black: {
                quantity: 2,
                price: 39500
            },
            darkRed: {
                quantity: 1,
                price: 45200
            }
        }
    }
};
Car.OPTIONS = {
    panoRoof: {
        price: 4650
    },
    leatherSeats: {
        price: 3700
    },
    chromePaint: {
        price: 1700
    }
};

/**Adds options to created car object. Takes values from selected checkboxes.
 * @function
 * */
Car.prototype.addOptions = function () {
    document.querySelectorAll('.options__item-checkbox').forEach(item => {
        if (item.checked) {
            this.options.push(item.parentNode.textContent);
        }
    });
};

/**Calculates the price of a current car
 * @function
 * @returns {number} price - price of a car
 * */
Car.prototype.getPrice = function () {
    var price = 0;

    price = Car.UNITS[this.brand][this.model][this.color].price;
    price += this.options.reduce((sum, option) => sum += Car.OPTIONS[option].price, 0);

    return price;
};

