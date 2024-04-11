import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "@routes/routeConfig";
import PrivateRouteValidation from "@routes/privateRouteValidation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@contexts/AuthContext.tsx";
import { EmployeesProvider } from "@contexts/EmployeesContext.tsx";
import { DepartmentsProvider } from "@contexts/DepartmentsContext.tsx";

function App() {
  return (
    <AuthProvider>
      <EmployeesProvider>
        <DepartmentsProvider>
          <Router>
            <ToastContainer />
            <Routes>
              {routes.map((route, index) => {
                const element = route.private ? (
                  <PrivateRouteValidation>
                    {route.element}
                  </PrivateRouteValidation>
                ) : (
                  route.element
                );
                return (
                  <Route key={index} path={route.path} element={element} />
                );
              })}
            </Routes>
          </Router>
        </DepartmentsProvider>
      </EmployeesProvider>
    </AuthProvider>
  );
}

export default App;
