  //Build an expense managment system where expense is an object ={id,title,amount,category,date}
  // Objectives:    Add an expense; Reject an expense if invalid,missing, id already exists; Delete an expense by id; updating a existing expense; search expenses by title;
  //                filter expense by category; find experience above a given amount; calculate total amount spent;
  // return a object containing: {totalExp; totalSpent; categoryTotals{ food; travel; shopping; highestspentoncategory}}
  // 
  /**{
  
    id: 1,
    title: "Lunch",
    amount: 180,
    category: "Food",
    date: "2026-10-14"
    
  example for an object}**/
  
  let expenses = [];
  
  function expensetracker(paydetails) {
    if (typeof paydetails.amount != "number" || paydetails.amount == null || paydetails.amount == undefined || !Number.isFinite(paydetails.amount)||Number.isNaN(paydetails.amount) ||paydetails.amount <= 0 ) {
      return;
      };
    if (expenses.some((expense)=> expense.id===paydetails.id )) {
      return;
    }
    expenses.push(paydetails);  
  }
  
  // const deletingID = function (id) {
  //   const index = expenses.findIndex(function (expense) {
  //     return expense.id === id;
  //   })
  //   if (index === -1) {
  //     return;
  //   }
  //     expenses.splice(index,1)
  //   return index;
  // }
  // 
  // trying with filter method
  
  const deletingID = function (id) {
    const remainingExpenses = expenses.filter((expense) => expense.id !== id);
     expenses=remainingExpenses ;
    return remainingExpenses;
    
  }
  
  const existingExpenseUpdate = function (id, update) {
    if (!expenses.some((expense) => expense.id === id)) {
      throw new Error(`oops add expense first`)
    }
    const gotit = expenses.find(((expense) => expense.id === id));
    const updatedExpenses = { ...gotit, ...update,id: gotit.id};
    
    const replacingexpense = expenses.findIndex(((expense) => expense.id === id));
    expenses[replacingexpense] = updatedExpenses;
  }
  
  function searchBTitle(title) {
    const word = title.trim().toLowerCase();
    const result = expenses.filter(
      (expense) => expense.title.trim().toLowerCase() === word
    );
    return result;
  }
  
  function filteringCategories(category) {
    const categ= expenses.filter((expense) => expense.category === category)
    return categ;
  }
  
  function fixedAmount(Gamount) {
    if (typeof Gamount !== 'number' || Gamount === null || Gamount === undefined || !Number.isFinite(Gamount) || Gamount < 0) {
      throw new Error (`Oops invalid limit amount: Try again!!!`)
    }
    const upper = expenses.filter((expense) => expense.amount > Gamount);
    return upper;
  }
  
  function totalSpent() {
    const totalamountSpent = expenses.reduce((total, expense) => total + expense.amount, 0)
    return totalamountSpent;
  }
  
  
  function categoryTotal(category) {
    const categoryexpenses= filteringCategories(category)
    const categorytotal= categoryexpenses.reduce((total, expense) => total + expense.amount, 0)
    return categorytotal;
  }
   
  
  function highestCategorySpent(CatTotals) {
    const arr = Object.entries(CatTotals);
    const baddahai= arr.reduce((winner, current) => {
      if (current[1] > winner[1]) {
        return current;
      }
      return winner;
    });
    return baddahai;
  }
  
  function generateSummary() {
    const CatTotals= {
      Travel: categoryTotal("Travel"),
      Food: categoryTotal("Food"),
      Shopping: categoryTotal("Shopping")
    }
    return {
      totalExp: expenses.length,
      totalSpent: totalSpent(),
      CategoryTotals: CatTotals, 
      highestSpentonCategory: highestCategorySpent(CatTotals),
  
    }
  }
  expensetracker({
    id: 101,
    title: "Lunch",
    amount: 250,
    category: "Food",
    date: "2026-10-01"
  });
  
  expensetracker({
    id: 102,
    title: "Uber",
    amount: 450,
    category: "Travel",
    date: "2026-10-02"
  });
  
  expensetracker({
    id: 103,
    title: "lunch",
    amount: 180,
    category: "Food",
    date: "2026-10-03"
  });
  
  expensetracker({
    id: 104,
    title: "Keyboard",
    amount: 2200,
    category: "Shopping",
    date: "2026-10-04"
  });
  
  expensetracker({
    id: 105,
    title: "Train",
    amount: 750,
    category: "Travel",
    date: "2026-10-05"
  });
  
  expensetracker({
    id: 106,
    title: "  LUNCH  ",
    amount: 320,
    category: "Food",
    date: "2026-10-06"
  });
  
  expensetracker({
    id: 107,
    title: "Mouse",
    amount: 800,
    category: "Shopping",
    date: "2026-10-07"
  });
  
  console.log(generateSummary());