import React, { Component, Fragment } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";

const INGREDIENTS_PRICE = {
  meat: 1.3,
  bacon: 0.7,
  cheese: 0.3,
  salad: 0.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      bacon: 0,
      cheese: 0,
      salad: 0,
    },
    totalPrice: 4,
    purchasable: false,
  };

  ingredientsAddHandler = (type) => {
    const oldIngNo = this.state.ingredients[type];
    const updatedIngNo = oldIngNo + 1;

    const newIngredientsState = { ...this.state.ingredients };
    newIngredientsState[type] = updatedIngNo;

    const newPrice = INGREDIENTS_PRICE[type];
    const newTotalPrice = this.state.totalPrice + newPrice;

    this.setState({
      totalPrice: newTotalPrice,
      ingredients: newIngredientsState,
    });
    this.updatePurchasableState(newIngredientsState);
  };

  ingredientsDeleteHandler = (type) => {
    const oldIngNo = this.state.ingredients[type];
    if (oldIngNo <= 0) {
      return;
    }
    const updatedIngNo = oldIngNo - 1;

    const newIngredientsState = { ...this.state.ingredients };
    newIngredientsState[type] = updatedIngNo;

    const oldPrice = INGREDIENTS_PRICE[type];
    const newTotalPrice = this.state.totalPrice - oldPrice;

    this.setState({
      totalPrice: newTotalPrice,
      ingredients: newIngredientsState,
    });
    this.updatePurchasableState(newIngredientsState);
  };

  updatePurchasableState(ingredients) {
    const purchasableItems = Object.values(ingredients).reduce((pv, cv) => {
      return pv + cv;
    }, 0);

    this.setState({ purchasable: purchasableItems > 0 });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Fragment>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.ingredientsAddHandler}
          ingredientRemoved={this.ingredientsDeleteHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
