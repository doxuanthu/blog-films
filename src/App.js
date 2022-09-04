import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { publicRoutes } from "~/routes/routes";
import { DefaultLayout } from "~/layouts";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDaK1nr8TOcCAc9biLpyIdvItOey7G2jc8",
    authDomain: "blog-films.firebaseapp.com",
    projectId: "blog-films",
    storageBucket: "blog-films.appspot.com",
    messagingSenderId: "1001292177325",
    appId: "1:1001292177325:web:d87f44f4d023524eea8b24",
    measurementId: "G-YDC9MR9LDG",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  useEffect(() => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const handleScrolling = () => {
      if (
        window.oldScroll <
        (document.documentElement.scrollTop || window.scrollY)
      ) {
        $("header")?.classList.remove("nav-down");
        $("header")?.classList.add("nav-up");

        if ($(".SearchFeature_wrapper__YI0Xl")) {
          $(".SearchFeature_wrapper__YI0Xl").style.marginTop = 0;
        }

        $$(".Slider_progress-bar__Sh5ig").forEach((elm) => (elm.style.top = 0));
      } else {
        $("header")?.classList.remove("nav-up");
        $("header")?.classList.add("nav-down");

        if ($(".SearchFeature_wrapper__YI0Xl")) {
          $(".SearchFeature_wrapper__YI0Xl").style.marginTop = "64px";
        }

        document
          .querySelectorAll(".Slider_progress-bar__Sh5ig")
          .forEach((elm) => (elm.style.top = "64px"));
      }

      window.oldScroll = document.documentElement.scrollTop || window.scrollY;
    };

    window.addEventListener("scroll", handleScrolling);

    return () => window.removeEventListener("scroll", handleScrolling);
  });

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <route.component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
