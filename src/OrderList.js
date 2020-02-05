import React from "react";
import "./OrderList.css";

const OrderList = props => {
  return (
    <div id="menu height-group">
      {getCategorySections(props.menu, props.clickHandler)}
    </div>
  );
};

// This performs actions for each category (flavors, toppings, etc)
function getCategorySections(menu, clickHandler) {
  const category = Object.getOwnPropertyNames(menu);
  let sections = [];
  for (let i = 0; i < category.length; i++) {
    sections.push(
      <div className="menu-items" id={category[i]} key={category[i]}>
        <h2>{category[i].charAt(0).toUpperCase() + category[i].slice(1)}</h2>
        {getListItems(menu[category[i]], clickHandler)}
      </div>
    );
  }

  return sections;
}

// return a list of menu items - helper function to getCategorySections
// expects a list (object) that is a collection of items of a type (ex. all flavors, all toppings)
function getListItems(list, clickHandler) {
  let listItems = [];
  let subcategory = Object.getOwnPropertyNames(list);
  for (let i = 0; i < subcategory.length; i++) {
    const currentItem = list[subcategory[i]];
    listItems.push(
      <li
        onClick={clickHandler.bind(this, currentItem.id)}
        key={currentItem.id}
      >
        {currentItem.name}
        <span className="price">{formatCurrency(currentItem.price)}</span>
      </li>
    );
  }
  return listItems;
}

// Formats currency to be appended to the end of each list item.
function formatCurrency(price) {
  if (price === 0) {
    return;
  } else {
    let formattedPrice = "- $" + price.toFixed(2);
    return formattedPrice;
  }
}

export default OrderList;
