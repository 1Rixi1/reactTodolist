import { action } from "@storybook/addon-actions";
import AppWithRedux from "../Apps/AppWithRedux";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { ReduxProviderDecorator } from "./ReduxProviderDecorator";

export default {
  title: "AppWithRedux Component",
  component: AppWithRedux,
  decorators: [ReduxProviderDecorator],
};

export const Example1 = () => {
  return <AppWithRedux />;
};
