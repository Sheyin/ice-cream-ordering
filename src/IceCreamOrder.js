import React, { Component } from "react";
import OrderSummary from "./OrderSummary";
import Cone from "./Cone";
import OrderList from "./OrderList";
import menu from "./data/icecreamdata";

class IceCreamOrder extends Component {
  state = {
    // orderCount: how many total orders there are
    orderCount: 0,
    // currentOrder: the order customer is currently modifying
    currentOrder: 0,
    // order: the total orders and their ingredients.
    order: {
      0: {
        flavors: [],
        toppings: [],
        cone: ""
      }
    }
  };

  // This returns the object / data for an item, given its item ID
  identifyItem(itemID) {
    const category = this.identifyCategory(itemID);
    const types = Object.getOwnPropertyNames(this.state[category]);
    for (let i = 0; i < types.length; i++) {
      if (this.state[category][types[i]].id === itemID) {
        return this.state[category][types[i]];
      }
    }
  }

  // helper function that identifies the category of an item (given an ID)
  // Each ID number has a given prefix that determines its category
  // Flavors: 10000 - 19999, Toppings: 20000-29999, Cone: 30000-39999
  identifyCategory(itemID) {
    if (itemID >= 10000 && itemID < 20000) {
      return "flavors";
    } else {
      if (itemID >= 20000 && itemID < 30000) {
        return "toppings";
      } else {
        return "cones";
      }
    }
  }

  componentDidMount() {
    // Unnecessary really, but doing it this way to emphasize that it would be from an external service / database
    this.setState({ ...menu });
  }

  // if an item is clicked, and theoretically added to the order.
  handleSelection = selectedItemID => {
    // Determine which item this item is
    const category = this.identifyCategory(selectedItemID);
    const itemData = this.identifyItem(selectedItemID);

    // This should be set to order - type - item/price
    const currentOrderNumber = this.state.currentOrder;
    const currentOrder = this.state.order[currentOrderNumber];

    // TODO: this.state.orderCount should be only updated when the user clicks "add to cart" or similar
    // There is nothing in the cart currently

    // Adding to the current order
    // Retrieving existing data since it will be needed to preserve the order
    const oldFlavors = currentOrder.flavors;
    const oldToppings = currentOrder.toppings;
    const oldCone = currentOrder.cone;
    if (category === "cones") {
      const newCone = {
        [currentOrderNumber]: {
          cone: itemData,
          flavors: oldFlavors,
          toppings: oldToppings
        }
      };
      this.setState({ order: newCone });
    } else {
      if (category === "flavors") {
        let newFlavors = oldFlavors.slice();
        newFlavors.push(itemData);

        const newCone = {
          [currentOrderNumber]: {
            cone: oldCone,
            flavors: newFlavors,
            toppings: oldToppings
          }
        };
        this.setState({ order: newCone });
      } else {
        let newToppings = oldToppings.slice();
        newToppings.push(itemData);

        const newCone = {
          [currentOrderNumber]: {
            cone: oldCone,
            flavors: oldFlavors,
            toppings: newToppings
          }
        };
        this.setState({ order: newCone });
      }
    }

    // update state with selection - should update the other components automatically?
  };

  render() {
    return (
      <div className="ice-cream-order height-group">
        <header>
          <OrderSummary />
        </header>
        <div className="main height-group">
          <OrderList menu={menu} clickHandler={this.handleSelection} />
          <Cone />
        </div>
        <footer>Footer here</footer>
      </div>
    );
  }
}

export default IceCreamOrder;
