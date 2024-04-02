export const navRoutes = ({
  storeId,
  pathname,
}: {
  storeId: string | string[];
  pathname: string;
}) => [
  {
    href: `/${storeId}`,
    label: "Overview",
    active: pathname === `/${storeId}`,
  },
  {
    href: `/${storeId}/billboards`,
    label: "Billboards",
    active: pathname === `/${storeId}/billboards`,
  },
  {
    href: `/${storeId}/categories`,
    label: "Categories",
    active: pathname === `/${storeId}/categories`,
  },
  {
    href: `/${storeId}/sizes`,
    label: "Sizes",
    active: pathname === `/${storeId}/sizes`,
  },
  {
    href: `/${storeId}/colors`,
    label: "Colors",
    active: pathname === `/${storeId}/colors`,
  },
  {
    href: `/${storeId}/brands`,
    label: "Brands",
    active: pathname === `/${storeId}/brands`,
  },
  {
    href: `/${storeId}/products`,
    label: "Products",
    active: pathname === `/${storeId}/products`,
  },
  {
    href: `/${storeId}/orders`,
    label: "Orders",
    active: pathname === `/${storeId}/orders`,
  },
  {
    href: `/${storeId}/settings`,
    label: "Settings",
    active: pathname === `/${storeId}/settings`,
  },
];
