import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import Signin1 from './views/auth/signin/SignIn1';
import { AuthProvider } from './contexts/authContext';
import { UserDataProvider } from './contexts/userDataContext';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <AuthProvider>
      <UserDataProvider>
        <Routes>
          <Route path='/login' element={<Signin1 />} index />
          {routes.map((route, i) => {
            const Guard = route.guard || Fragment;
            const Layout = route.layout || Fragment;
            const Element = route.element;

            return (
              <Route
                key={i}
                path={route.path}
                element={
                  <Guard>
                    <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
                  </Guard>
                }
              />
            );
          })}
        </Routes>
      </UserDataProvider>
    </AuthProvider>
  </Suspense>
);

const routes = [
  // {
  //   exact: 'true',
  //   path: '/login',
  //   element: lazy(() => import('./views/auth/signin/SignIn1'))
  // },
  // {
  //   exact: 'true',
  //   path: '/auth/signin-1',
  //   element: lazy(() => import('./views/auth/signin/SignIn1'))
  // },
  // {
  //   exact: 'true',
  //   path: '/auth/signup-1',
  //   element: lazy(() => import('./views/auth/signup/SignUp1'))
  // },
  // {
  //   exact: 'true',
  //   path: '/auth/reset-password-1',
  //   element: lazy(() => import('./views/auth/reset-password/ResetPassword1'))
  // },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      // Adding the routes to the different tables and entities
      {
        exact: 'true',
        path: '/prepaStudents',
        element: lazy(() => import('./views/prepaStudents/prepaStudentsList'))
      },
      {
        exact: 'true',
        path: '/prepaStudents/create',
        element: lazy(() => import('./views/prepaStudents/createPrepaStudent'))
      },
      {
        exact: 'true',
        path: '/prepaStudents/update/:id',
        element: lazy(() => import('./views/prepaStudents/updatePrepaStudent'))
      },

      {
        exact: 'true',
        path: '/ingStudents',
        element: lazy(() => import('./views/ingStudents/ingStudentsList'))
      },
      {
        exact: 'true',
        path: '/ingStudents/create',
        element: lazy(() => import('./views/ingStudents/createIngStudent'))
      },
      {
        exact: 'true',
        path: '/ingStudents/update/:id',
        element: lazy(() => import('./views/ingStudents/updateIngStudent'))
      },

      
      {
        exact: 'true',
        path: '/professors',
        element: lazy(() => import('./views/professors/ProfessorList'))
      },
      {
        exact: 'true',
        path: '/professors/create',
        element: lazy(() => import('./views/professors/createProfessor'))
      },
      {
        exact: 'true',
        path: '/professors/update/:id',
        element: lazy(() => import('./views/professors/updateProfessor'))
      },
      {
        exact: 'true',
        path: '/professors/addWants/:id',
        element: lazy(() => import('./views/professors/AddWants'))
      },
      {
        exact: 'true',
        path: '/salles',
        element: lazy(() => import('./views/salles/sallesList'))
      },

      {
        exact: 'true',
        path: '/salles/create',
        element: lazy(() => import('./views/salles/createSalle'))
      },

      {
        exact: 'true',
        path: '/salles/update/:id',
        element: lazy(() => import('./views/salles/updateSalle'))
      },

      {
        exact: 'true',
        path: '/modules',
        element: lazy(() => import('./views/modules/ModulesList'))
      },

      {
        exact: 'true',
        path: '/modules/create',
        element: lazy(() => import('./views/modules/createModule'))
      },

      {
        exact: 'true',
        path: '/modules/update/:id',
        element: lazy(() => import('./views/modules/updateModule'))
      },

      {
        exact: 'true',
        path: '/elements',
        element: lazy(() => import('./views/elements/ElementsList'))
      },

      {
        exact: 'true',
        path: '/elements/create',
        element: lazy(() => import('./views/elements/createElement'))
      },

      {
        exact: 'true',
        path: '/seances/:id',
        element: lazy(() => import('./views/seances/SeancesList'))
      },
      {
        exact: 'true',
        path: '/seances/assign/:id',
        element: lazy(() => import('./views/seances/AssignSeance'))
      },
      {
        exact: 'true',
        path: '/seances/edit/:id',
        element: lazy(() => import('./views/seances/EditSeance'))
      },
      {
        exact: 'true',
        path: '/seances/create/:timeTableIndex/:sectionId/:cellIndex',
        element: lazy(() => import('./views/seances/CreateSeance'))
      },

      {
        exact: 'true',
        path: '/emplois/:fil',
        element: lazy(() => import('./views/emplois/EmploisList'))
      },
      {
        exact: 'true',
        path: '/emplois/timetable/:id/:sectionId',
        element: lazy(() => import('./views/emplois/EmploisShowTimetable'))
      },
      {
        exact: 'true',
        path: '/emplois/timetable/:id',
        element: lazy(() => import('./views/emplois/EmploisShowTimetable'))
      },
      {
        exact: 'true',
        path: '/emplois/optimize/:id',
        element: lazy(() => import('./views/emplois/EmploisOptimize'))
      },
      {
        exact: 'true',
        path: '/elements/edit/:id',
        element: lazy(() => import('./views/elements/EditElement'))
      },

      {
        exact: 'true',
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/pagination',
        element: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
