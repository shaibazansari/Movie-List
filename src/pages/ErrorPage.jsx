import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import Header from "../components/Header";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <Header />
      <main className="main error-page">
        <h2>Oops</h2>
        <p>{isRouteErrorResponse(error) ? "This page does not exist." : "An unexpected error occurred."}</p>
      </main>
    </>
  );
};

export default ErrorPage;
