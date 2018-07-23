'use strict';

var makeError = function (error) {
  throw new Error(error);
};

var Car = function (brand, model, color) {
  this.brand = null;
  this.model = null;
  this.color = null;
  this.options = [];

  if ( !(brand in Car.UNITS) ) {
    makeError('Wrong brand')
  };
  this.brand = brand;

  if ( !(model in Car.UNITS[brand]) ) {
    makeError('Wrong model')
  };
  this.model = model;

  if ( !(color in Car.UNITS[brand][model]) ) {
    makeError(`Color ${color} not available`);
  };
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
    },
  },

};
Car.OPTIONS = {
  panoRoof: {
    price: 4650
  },
  leatherSeats: {
    price: 3700
  }
};

Car.prototype.addOptions = function (option) {
  if ( !(option in Car.OPTIONS) ) {
    makeError('No such option');
  }
  if ( (!this.options.includes(option)) ) {
    this.options.push(option);
  };
};

Car.prototype.getPrice = function () {
  var price = 0;

  price = Car.UNITS[this.brand][this.model][this.color].price;
  price += this.options.reduce( (sum, option) => sum += Car.OPTIONS[option].price, 0);

  return price;
};

var audiA4 = new Car('audi','a4','black');
audiA4.addOptions('panoRoof');
console.log(audiA4);
console.log(audiA4.getPrice());
