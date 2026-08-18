import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { KiaraLayout } from "~/layouts/KiaraLayout";
import { HomePage } from "~/pages/HomePage";
import { ChatPage } from "~/pages/ChatPage";
import { CasesPage } from "~/pages/CasesPage";
import { CaseDetailPage } from "~/pages/CaseDetailPage";
import { TechnologyPage } from "~/pages/TechnologyPage";
import { FaqPage } from "~/pages/FaqPage";
import { NotFoundPage } from "~/pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: KiaraLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "chat", Component: ChatPage },
      { path: "cases", Component: CasesPage },
      { path: "cases/:id", Component: CaseDetailPage },
      { path: "technology", Component: TechnologyPage },
      { path: "faq", Component: FaqPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
