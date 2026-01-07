import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./notificationContext";
import { UserContextProvider } from "./userContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={new QueryClient()}>
    <UserContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
