# @doosterling/use-shopify

> React hooks for the shopify buy sdk

[![NPM](https://img.shields.io/npm/v/@doosterling/use-shopify.svg)](https://www.npmjs.com/package/@doosterling/use-shopify) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @doosterling/use-shopify
```

## Demo
A simple example can be found in the `./example` folder, a more extensive [demo](https://trusting-swirles-fca8d6.netlify.app/) can be found [here](https://trusting-swirles-fca8d6.netlify.app/) 


## Usage

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

## License

MIT © [DennisOosterling](https://github.com/DennisOosterling)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
