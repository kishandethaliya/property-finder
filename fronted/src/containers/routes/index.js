import React, { lazy } from "react";

import {
  ROUTE_MAIN,
  ROUTE_ADD_PROPERTY,
  ROUTE_VIEW_PROPERTIES,
} from "../routes/routes";

const PublicLayout = lazy(() => import("../layouts/PublicLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const PropertyView = lazy(() => import("../views"));
const AddProperty = lazy(() => import("../views/addProperty"));
const Properties = lazy(() => import("../views/properties"));

const publicRoutes = [
  {
    path: ROUTE_MAIN,
    component: (props) => (
      <PublicLayout>
        <PropertyView {...props} />
      </PublicLayout>
    ),
  },
];

const adminRoutes = [
  {
    path: ROUTE_ADD_PROPERTY,
    component: (props) => (
      <AdminLayout>
        <AddProperty {...props} />
      </AdminLayout>
    ),
  },
  {
    path: ROUTE_VIEW_PROPERTIES,
    component: (props) => (
      <AdminLayout>
        <Properties {...props} />
      </AdminLayout>
    ),
  },
];

export const indexRoutes = [...publicRoutes, ...adminRoutes];
