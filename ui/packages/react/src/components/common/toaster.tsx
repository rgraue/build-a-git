import React from "react";
import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

export let toast: any = {
  create: (_: any) => {
    console.log("toaster not initialized. not toasting");
  },
  skip: true,
};

export const toaster = () => {
  toast = createToaster({
    placement: 'bottom-end',
    pauseOnPageIdle: true,
    offsets: {
      left: "20px",
      top: `20px`,
      right: "20px",
      bottom: "20px",
    },
  });
  return toast;
};

export const Toaster = () => {
  const t = toaster();

  if (t.skip) {
    return <></>;
  }

  return (
    <Portal>
      <ChakraToaster toaster={t} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }}>
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};