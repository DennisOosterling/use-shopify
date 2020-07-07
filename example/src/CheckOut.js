import React from "react";
import { useShopify } from "@doosterling/use-shopify";

const CheckOut = () => {
  const { checkout } = useShopify();
  return <pre>{JSON.stringify(checkout, null, 3)}</pre>;
};

export default CheckOut;
