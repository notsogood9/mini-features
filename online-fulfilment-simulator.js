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

function order(orderItems) {

  
  let acceptedItems = [];
  let rejectedItems = [];
  let totalPayable = 0;
  let overallStatus;
  let reason;

  //empty-order-handling
  if (orderItems.length === 0) {
    return {
      acceptedItems: [],
      rejectedItems: [],
      totalPayable: 0,
      overallStatus: "rejected",
      reason: "No Information about order!",
    };
  }

  
  //order
  for (const i of orderItems) {
    const idVerify = inventoryLive.find((item) => item.inventoryID === i.id);
    if (idVerify !== undefined) {
      if (Number.isInteger(i.quantity) && i.quantity > 0) {
        if (idVerify.product_quantity >= i.quantity) {
          idVerify.product_quantity -= i.quantity;
          const itemCost = idVerify.product_price * i.quantity;
          acceptedItems.push({
            item: i,
            cost: itemCost
            }); 
          totalPayable += itemCost;
        } else {
          rejectedItems.push({
            item: i,
            reason: "insufficient stock"
          })
        }
      } else {
        rejectedItems.push({
          item: i,
          reason: "Invalid Product Details",
        })
      }
    } else {
      rejectedItems.push({
        item: i,
        reason:"productID doesn't exist",
      })
    }
  }
  if (acceptedItems.length > 0 && rejectedItems.length === 0) {
    overallStatus = "fulfilled";
  }
  if (acceptedItems.length > 0 && rejectedItems.length > 0) {
    overallStatus = "partially fulfilled";
  }
  if (acceptedItems.length === 0 && rejectedItems.length>0) {
    overallStatus="rejected"
  }
  return {
    acceptedItems,
    rejectedItems,
    overallStatus,
    totalPayable
  }
}

inventoryLive.push(inventory(101, "Laptop", 5, 50000));
inventoryLive.push(inventory(102, "Mouse", 10, 1000));
inventoryLive.push(inventory(103, "Keyboard", 4, 2000));
inventoryLive.push(inventory(104, "Monitor", 2, 15000));

console.log(inventoryLive);

const testOrder = [
  { id: 101, quantity: 2 },     // valid
  { id: 102, quantity: 4 },     // valid
  { id: 999, quantity: 2 },     // product doesn't exist
  { id: 103, quantity: 0 },     // invalid quantity
  { id: 104, quantity: 3 },     // insufficient stock
  { id: 101, quantity: 3 },     // valid: uses remaining laptops exactly
  { id: 101, quantity: 1 },     // insufficient: laptops now 0
  { id: 102, quantity: 2.5 },   // invalid decimal quantity
  { id: 103, quantity: -2 },    // invalid negative quantity
  { id: 102, quantity: 6 },     // valid: uses remaining mice exactly
  { id: 102, quantity: 1 },     // insufficient: mice now 0
  { id: 103, quantity: 4 },     // valid: uses keyboard stock exactly
  { id: 103, quantity: 1 },     // insufficient: keyboards now 0
];

console.dir(order(testOrder), { depth: null });