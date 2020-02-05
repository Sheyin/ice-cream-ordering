import React, { Component } from "react";
import "./OrderSummary.css";

class OrderSummary extends Component {
  state = {};
  render() {
    return (
      <div className="order-summary">
        <h2>Order Summary</h2>
        Your total cost is:
      </div>
    );
  }
}

export default OrderSummary;
