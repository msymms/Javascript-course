//BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = this.value / totalIncome;
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {

        addItem: function (type, desc, val) {
            var newItem, ID;

            // assign new id based on last id in type array
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //create new item and assign to array of type "exp" or "inc"
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else {
                newItem = new Income(ID, desc, val);
            }

            //add new Item to data arrays
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function (type, id) {
            var ids, index;

            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },

        calulateBudget: function () {

            // calc total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            //Calc budget: income - expenses

            data.budget = data.totals.inc - data.totals.exp;

            // Calc percentageg of income spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {

                data.percentage = -1;
            }
        },

        calcPercentage: function () {
            data.allItems.exp.forEach(function (curr) {
                curr.calcPercentage();
            });

        },

        getPercentages: function () {

            var allPer = data.allItems.exp.map(function (curr) {
                return curr.getPercentage();

            });

            return allPer;

        },

        getBudget: function () {

            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage
            }

        },

        testing: function () {
            console.log(data);
        }
    };

})();


//UI CONTROLLER
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetlabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };

    //public methods and properties
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;

            // create an HTmL string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"> \
            <div class="item__value">%value%</div><div class="item__delete"> \
            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div> \
            <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div> \
            <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // replace the placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTMLO into the document
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function (id) {
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);

        },

        clearFields: function () {
            var fields, fieldsArr;

            //select all elements contained in string -- returns a list
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            //convert list to an array
            fieldsArr = Array.prototype.slice.call(fields);

            // loop through the array and clear the values
            fieldsArr.forEach(function (cur) {
                cur.value = "";
            })

            //set the focus back to inital field
            fieldsArr[0].focus();
        },

        getDOMStrings: function () {
            return DOMstrings;
        },

        displayBudget: function (obj) {

            document.querySelector(DOMstrings.budgetlabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalIncome;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExpenses;
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        }

    };
})();


//APPLICATION CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    }
    var updateBudget = function () {

        // calculate the budget
        budgetCtrl.calulateBudget();

        //return the budget
        var budget = budgetCtrl.getBudget();

        // display the budget

        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function () {

        // calc %s
        budgetCtrl.calcPercentages();

        // read % from budget Controller
        var perc = budgetCtrl.getPercentages();
        //update the UI
        console.log(perc);

    };

    var ctrlAddItem = function () {
        var input, newItem;

        // get the input data
        input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            //  add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // add the new item to the user interface
            UICtrl.addListItem(newItem, input.type);

            // clear the fields
            UICtrl.clearFields();

            //calculate and update budget
            updateBudget();

            //calculate and update the percentages
        }

    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, id;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-')
            type = splitID[0];
            id = parseInt(splitID[1]);
        }

        //delete item from data
        budgetCtrl.deleteItem(type, id);

        // delete item from UI
        UICtrl.deleteListItem(itemID);


        //update the budget
        updateBudget();

        //calculate and update the percentages



    };

    return {
        init: function () {
            setupEventListeners();
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentage: 0
            });
        }
    }
})(budgetController, UIController);

controller.init();
