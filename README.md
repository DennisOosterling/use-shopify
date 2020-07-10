# @doosterling/use-shopify

> React hooks for the shopify buy sdk

> WARNING: This project is still very much in the alpha stage, breaking changes may occur

[![NPM](https://img.shields.io/npm/v/@doosterling/use-shopify.svg)](https://www.npmjs.com/package/@doosterling/use-shopify) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

* [Description](#description)
* [Installation](#install)
* [Example](#example)
* [Usage](#usage)
* [API](#api)
* [License](#license)

## [Description](#description)
This library is a wrapper around shopify's [js-buy-sdk](https://shopify.github.io/js-buy-sdk/). The core functionality is having a reactive checkout. The checkout/cart information will automatically update when modifying your cart and its state can easily be shared throughout your application by the use of react's context api.

## [Installation](#install)

```bash
npm install --save @doosterling/use-shopify
```

## [Example](#example)
A simple example can be found in the `./example` folder, there is also a more extensive [demo](https://trusting-swirles-fca8d6.netlify.app/) and the repo can be found [here](https://github.com/DennisOosterling/use-shopify-example) 


## [Usage](#usage)

Provider
```jsx
import React from "react";
import { ShopifyProvider } from "@doosterling/use-shopify";
import shopify from "shopify-buy";
import CheckOut from "./CheckOut";

const client = shopify.buildClient({
  domain: `graphql.myshopify.com`,
  storefrontAccessToken: "dd4d4dc146542ba7763305d71d1b3d38",
  apiVersion: "2020-04",
});

const App = () => {
  return (
    <ShopifyProvider client={client}>
      <CheckOut />
    </ShopifyProvider>
  );
};
export default App;
```

Hook
```jsx
import React from "react";
import { useShopify } from "@doosterling/use-shopify";

const CheckOut = () => {
  const { checkout } = useShopify();
  return <pre>{JSON.stringify(checkout, null, 3)}</pre>;
};

export default CheckOut;
```


## [API](#api)
- addItem
- removeItem
- resetCart
- updateItem
- checkout
- getAvailableForSale
- client

---

### `addItem({variantId, quantity})`
Adds a certain quantity of a single item to the checkout

### `removeItem(variantId)`
Removes all entries of a single item from the checkout

### `resetCart()`
Removes everything from the checkout

### `updateItem(id, quantity)`
Updates the quantity of a single item in the checkout

### `checkout`
Returns shopify's checkout object

### `getAvailableForSale(shopifyId)`
Returns if a certain product is availabe for sale

### `client`
Returns the shopify client


## Todo
- [ ] Improve the API
- [ ] Add tests


## [License](#license)

MIT © [DennisOosterling](https://github.com/DennisOosterling)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
