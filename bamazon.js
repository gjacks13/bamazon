const mysql = require('mysql');
const inquirer = require('inquirer');

const bamazon = {
  connection : mysql.createConnection({
    host     : '127.0.0.1',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'bamazon'
  }),

  availableProductIds : [],
  productQty : {},

  printAvailableProducts(resultSet) {
    this.availableProductIds = [];
    this.productQty = {};
    console.log("---- Product List ----");
    resultSet.forEach(product => {
      if (product.stock_quantity > 0) {
        this.availableProductIds.push(product.item_id);
        this.productQty[product.item_id] = product.stock_quantity;
        console.log(`
        ID: ${product.item_id},
        Name: ${product.product_name},
        Department: ${product.department},
        Price: ${product.price},
        Quantity: ${product.stock_quantity}
      `);
      }
    });
  },

  connect() {
    return new Promise((resolve, reject) => {
      if (this.connection.state === 'disconnected'){
        this.connection.connect(function(err) {
          if (err) reject(err);
          resolve();
        });
      }
      resolve();
    });
  },

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) reject( err );
        resolve();
      });
    });
  },

  displayAllProducts() {
    return new Promise((resolve, reject) => {
      const queryStmt = "SELECT item_id, product_name, department, price, stock_quantity FROM products";
      const args = [];

      this.connect().then(function() {
        return this.query(queryStmt, args);
      }.bind(this)).then(function(resultSet) {
        this.printAvailableProducts(resultSet);
      }.bind(this)).catch(function(err) {
        this.close();
        throw err;
      }.bind(this));
      return resolve();
    });
  },

  updateProductQuantity(productId, quantity) {
    const queryStmt = "UPDATE products SET stock_quantity=? WHERE item_id=?";
    const args = [quantity, productId];

    this.query(queryStmt, args).then(function(resultSet) {
      console.log(`Successfully placed an order for '${quantity}' products with id: ${productId}.`);
      Promise.resolve();
    }.bind(this)).catch(function(err) {
      this.close();
      throw err;
    }.bind(this));
  },

  submitOrder(productId, quantity) {
    if (quantity < this.productQty[productId]) {
      let updatedQty = this.productQty[productId] - quantity;
      this.updateProductQuantity(productId, updatedQty);
      this.close();
    } else {
      console.log("Insufficient quantity! Please, submit another order.");
      this.startBamazon();
    }
  },

  startBamazon() {
    this.displayAllProducts().then(function() {
      const prompts = [
        {
          type: 'input',
          name: 'id',
          message: 'What product id would you like to order?'
        },
        {
          type: 'input',
          name: 'quantity',
          message: 'What quantity would you like?'
        },
        {
          type: 'confirm',
          name: 'submitOrder',
          message: 'Would you like to submit this order?'
        }
      ];
  
      inquirer.prompt(prompts).then(answers => {
        if (!answers.submitOrder) {
          console.log("You chose not to submit the order.");
          this.startBamazon();
          return;
        }
        if (!answers.quantity || !/^[0-9]+$/.test(answers.quantity)) {
          console.log("The quantity provided was not a number");
          this.startBamazon();
          return;
        }
        if (/^[0-9]+$/.test(answers.id) && this.availableProductIds.indexOf(parseInt(answers.id)) === -1) {
          console.log(`The provided product id '${answers.id}' is not available; or, it is not valid.`);
          this.startBamazon();
          return;
        } else {
          // process order request
          this.submitOrder(answers.id, answers.quantity);
          return;
        }
      }).catch(function(err) {
        throw err;
      });
    }.bind(this)).catch(function(err) {
      throw err;
    });
  }
};

bamazon.startBamazon();