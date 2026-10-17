/**
*** Problem statement: Order Fulfilment Simulator

Build a JavaScript-only program that checks whether an order can be fulfilled from available inventory.
Each product has:
- Product ID
- Name
- Price
- Available quantity

Each requested order item contains a product ID and requested quantity.

Required behaviour:

1. Reject an empty order. done
2. Check each requested item independently. undone
3. Reject an item if its product does not exist,
its quantity is not a positive integer, or there is insufficient stock. done
4. Accept valid items even when other items fail. done
5. Reduce stock only for accepted items. done
6. Return accepted items with their costs, rejected items with reasons, and the total payable amount. done
7. Assign an overall order status: fulfilled, partially fulfilled, or rejected.

Constraint: The same product can appear multiple times in one order. Your program must never sell more than the available stock.

**/

function inventory(id, productName, quantity, price) {
  //inventorystats
  const inventoryID = id;
  const product_quantity = quantity;
  const product_name = productName;
  const product_price = price;

  return {
    inventoryID,
    product_quantity,
    product_name,
    product_price,
  }
}

const inventoryLive = [];
// inventoryLive.push(inventory(id, productName, quantity, price));

function order(id, quantity) {

  let acceptedItems = [];
  let rejectedItems = [];
  totatlPayable = 0;

  
  //order
  const idVerify = inventoryLive.find((item) => item.inventoryID === id);
  if (idVerify !== undefined) {
    if (idVerify
    if (Number.isInteger(quantity) && quantity > 0) {   
      if (idVerify.product_quantity >= quantity) {
        idVerify.product_quantity -= quantity;
      }

    }
  }
}