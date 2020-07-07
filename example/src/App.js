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
