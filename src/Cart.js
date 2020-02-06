import React from "react";

const Cart = props => {
  return <div id="cart">{displayCart(props.orders)}</div>;
};

function displayOrder(orderNumber, order) {
  let orderDetails = [];
  const { flavors, toppings, cone } = { ...order };
  orderDetails.push(<h2>Order #{orderNumber + 1}</h2>);
  orderDetails.push(<h3>Ice Cream: </h3>);
  for (let i = 0; i < flavors.length; i++) {
    orderDetails.push(
      <li key={orderNumber + "flavors" + i}>{flavors[i].name}</li>
    );
  }
  orderDetails.push(<h3>Toppings: </h3>);
  for (let i = 0; i < toppings.length; i++) {
    orderDetails.push(
      <li key={orderNumber + "toppings" + i}>{toppings[i].name}</li>
    );
  }
  orderDetails.push(<h3>Cone: </h3>);
  orderDetails.push(<li key={orderNumber + "cone"}>{cone.name} </li>);

  return orderDetails;
}

function displayCart(orders) {
  const numberOrders = Object.getOwnPropertyNames(orders).length;
  let orderInfo = [];
  for (let i = 0; i < numberOrders; i++) {
    orderInfo.push(displayOrder(i, orders[i]));
  }
  return orderInfo;
}

export default Cart;
