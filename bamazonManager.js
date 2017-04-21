var mysql = require("mysql");
var inquirer = require("inquirer");
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "emilykeen711",
    // Your password
    password: "password123",
    database: "Bamazon_db"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
});

var runSearch = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory",
            "Add to Inventory", "Add New Product"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
                allProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                newProduct();
                break;
        }
    });
};

var allProducts = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + "|| Product name: " + res[i].product_name +
                "|| Department Name: " +
                res[i].department_name + "|| Price: " +
                res[i].price + "|| Stock Quanity: " +
                res[i].stock_quanity);
        }
        runSearch();
    });
};

// If a manager selects View Low Inventory, then it should list all items with a inventory count lower than five.
var lowInventory = function() {
    connection.query("SELECT * FROM products where stock_quanity < 5", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + "|| Product name: " + res[i].product_name +
                "|| Department Name: " +
                res[i].department_name + "|| Price: " +
                res[i].price + "|| Stock Quanity: " +
                res[i].stock_quanity);
        }
        runSearch();
    });
};

var addInventory = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([{
            name: "choice",
            type: "input",
            message: "What item would you like to update?"
        }, {
            name: "quantity",
            type: "input",
            message: "How many items would you like to add to stock?"
        }]).then(function(answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id == answer.choice) {
                    chosenItem = results[i];
                    var quantity = +chosenItem.stock_quanity + +answer.quantity;
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quanity: quantity
                    }, {
                        item_id: answer.choice
                    }], function(err, res) {
                        console.log("you set ID# " + chosenItem.item_id + "'s quanity to " + quantity);
                        runSearch();

                    });

                }
            }

        });
    });

};

var newProduct = function() {
    inquirer.prompt([{
            name: "item",
            type: "input",
            message: "What is the name of the item you would like to add?"
        }, {
            name: "department",
            type: "input",
            message: "What is the department of the item you would like to add?"
        }, {
            name: "price",
            type: "input",
            message: "What is the price per unit of the new product?",

        }, {
            name: "starting_quantity",
            type: "input",
            message: "What is your starting quantity?",

        }



    ]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.item,
            department_name: answer.department,
            price: answer.price,
            stock_quanity: answer.starting_quantity
        }, function(err) {
            if (err) throw err;
            console.log("Your item was created successfully!");
            runSearch();
        });
    });
};



runSearch();