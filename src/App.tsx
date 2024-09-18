import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import RegistrationForm from "./Components/RegistrationForm";
import UserList from "./Components/UserList";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
