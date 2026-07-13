import React from "react";
import App from "./App";
import { createRoot, Root as ReactRoot } from "react-dom/client";

export interface CaasInitOption {
  containerElementId: string;
  price: string;
  merchantName?: string;
  currency?: string;
  merchantId?: string;
  returnUrl?: string;
  noForwardingPath?: boolean;
  [key: string]: any;
}

declare global {
  interface Window {
    renderReactWidget: (config: string) => void;
    unmountReactWidget: (id: string) => void;
  }
}

const widgetRoots: Record<string, ReactRoot> = {};

function Root({ options }: { options: CaasInitOption }) {
  return <App options={options} />;
}

//
// 🔥 Read data-* attributes
//
const getOptionsFromDataAttributes = (
  el: HTMLElement
): Partial<CaasInitOption> => {
  return {
    price: el.dataset.price || "",
    merchantName: el.dataset.merchantName,
    currency: el.dataset.currency,
    merchantId: el.dataset.merchantId,
    returnUrl: el.dataset.returnUrl,
    noForwardingPath: el.dataset.noForwardingPath === "true",
  };
};

window.renderReactWidget = (config: string) => {
  let parsedOptions: Partial<CaasInitOption> = {};

  try {
    parsedOptions = JSON.parse(config);
  } catch {
    console.warn("No JSON config passed, using data attributes only");
  }

  const containerId =
    parsedOptions.containerElementId || config;

  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container "${containerId}" not found`);
    return;
  }

  // 🔥 Read data attributes
  const dataOptions = getOptionsFromDataAttributes(container);

  // 🔥 Merge (JSON overrides data attributes)
  const finalOptions: CaasInitOption = {
    ...dataOptions,
    ...parsedOptions,
    containerElementId: containerId,
  } as CaasInitOption;

  if (!finalOptions.price) {
    console.error("Missing required field: price");
    return;
  }

  // 🔄 Unmount existing
  if (widgetRoots[containerId]) {
    widgetRoots[containerId].unmount();
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Root options={finalOptions} />
    </React.StrictMode>
  );

  widgetRoots[containerId] = root;
};

window.unmountReactWidget = (containerElementId: string) => {
  const root = widgetRoots[containerElementId];
  if (root) {
    root.unmount();
    delete widgetRoots[containerElementId];
  }
};
