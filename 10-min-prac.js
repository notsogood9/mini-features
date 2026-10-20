let product = [
  { name: "mouse", stock: 8 },
  { name: "keyboard", stock: 2 },
  { name: "monitor", stock: 0 },
  { name: "laptop", stock: 5 }
];

function findLowStock(products) {
  const result = [];
  products.forEach((obj) => {     // products.filter((obj)=>obj.stock<2){return obj;}
    if (obj.stock < 5) {
      result.push(obj);
    }
  })
  return result;
}
console.log(findLowStock(product));

