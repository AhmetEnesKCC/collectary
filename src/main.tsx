import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import routes from "./routes.tsx";
import Layout from "./layout.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThirdwebProvider>
      <ChakraProvider>
        <Layout>
          <RouterProvider router={routes} />
        </Layout>
      </ChakraProvider>
    </ThirdwebProvider>
  </Provider>
);
