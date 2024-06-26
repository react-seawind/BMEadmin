import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './common/Loader';
import routes from './routes/index.jsx';
import RequireAuth from './Private/Requiredau';
import NoDataFound from './components/NoFound';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const SignIn = lazy(() => import('./pages/Authentication/SignIn.jsx'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate an asynchronous check for user authentication
    setTimeout(() => {
      // Assuming the user is authenticated, setLoggedIn(true)
      setLoggedIn(true);
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      {loggedIn ? (
        <Routes>
          <Route
            path="/login"
            index
            element={
              <Suspense fallback={<Loader />}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            element={
              <RequireAuth>
                <DefaultLayout />
              </RequireAuth>
            }
          >
            {routes.map((routes, index) => (
              <Route
                key={index}
                path={routes.path}
                element={
                  <Suspense fallback={<Loader />}>
                    <routes.component />
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Routes>
      ) : (
        <Route path="/*" element={<NoDataFound />} />
      )}
    </>
  );
}

export default App;
