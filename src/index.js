import React, { useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

const ShopifyContext = React.createContext({});
const { Provider } = ShopifyContext;

const persistedStateId = "shopifyCheckout";

const shopifyActions = {
  setLoading: "set_loading",
  setCheckout: "set_checkout",
};

function shopifyCheckoutReducer(_, action) {
  switch (action.type) {
    case shopifyActions.setLoading:
      return { loaded: false };
    case shopifyActions.setCheckout:
      const { lineItems = [], subtotalPrice = 0, webUrl = "" } = action.payload;
      return { lineItems, subtotalPrice, webUrl, loaded: true };
    default:
      throw new Error(`Action of type ${action.type} does not exist.`);
  }
}

const useShopify = () => {
  const context = useContext(ShopifyContext);
  if (context === undefined) {
    throw new Error("ShopifyContext must be used within a ShopifyProvider");
  }
  return context;
};

const ShopifyProvider = ({ client, children }) => {
  const [shopifyCheckoutId, setShopifyCheckoutId] = useLocalStorage(
    persistedStateId,
    ""
  );
  const [checkout, dispatch] = useReducer(shopifyCheckoutReducer, {
    loaded: false,
    subtotalPrice: 0,
    lineItems: [],
    webUrl: "",
  });

  async function addItem({ variantId, quantity }) {
    const temporalCheckout = await client.checkout.addLineItems(
      shopifyCheckoutId,
      [{ variantId, quantity }]
    );
    dispatch({
      type: shopifyActions.setCheckout,
      payload: temporalCheckout,
    });
  }

  async function removeItem(variantId) {
    const temporalCheckout = await client.checkout.removeLineItems(
      shopifyCheckoutId,
      [variantId]
    );

    dispatch({
      type: shopifyActions.setCheckout,
      payload: temporalCheckout,
    });
  }

  function getAvailableForSale(shopifyId) {
    return client.product.fetch(shopifyId).then((product) => {
      return product ? product.availableForSale : false;
    });
  }

  function resetCart() {
    setShopifyCheckoutId("");

    dispatch({
      type: shopifyActions.setLoading,
    });
  }

  async function updateItem({ id, quantity }) {
    const temporalCheckout = await client.checkout.updateLineItems(
      shopifyCheckoutId,
      [
        {
          id,
          quantity,
        },
      ]
    );

    dispatch({
      type: shopifyActions.setCheckout,
      payload: temporalCheckout,
    });
  }

  useEffect(() => {
    if (!client || !client.checkout) return;

    async function createNewCheckout() {
      const checkout = await client.checkout.create();
      setShopifyCheckoutId(checkout.id);
      return checkout;
    }

    async function checkCartExistance() {
      let temporalCheckout = null;
      if (shopifyCheckoutId === "") {
        temporalCheckout = createNewCheckout();
      } else {
        temporalCheckout = await client.checkout.fetch(shopifyCheckoutId);
        if (temporalCheckout === null) {
          temporalCheckout = createNewCheckout();
        } else if (temporalCheckout.completedAt) {
          // If the saved checkout is already completed
          // create a new checkout
          temporalCheckout = createNewCheckout();
        }
      }

      dispatch({
        type: shopifyActions.setCheckout,
        payload: temporalCheckout,
      });
    }

    checkCartExistance();
  }, [shopifyCheckoutId, setShopifyCheckoutId, client]);

  return (
    <Provider
      value={{
        addItem,
        removeItem,
        resetCart,
        updateItem,
        checkout,
        getAvailableForSale,
        client,
      }}
    >
      {children}
    </Provider>
  );
};

export { ShopifyProvider, useShopify };
