import { Routes } from '@angular/router';

export const tabRoutes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../features/home/pages/home.page').then(m => m.HomePage)
      },
      {
        path: 'shop',
        loadComponent: () => import('../features/catalog/pages/shop.page').then(m => m.ShopPage)
      },
      {
        path: 'favorites',
        loadComponent: () => import('../features/wishlist/pages/favorites.page').then(m => m.FavoritesPage)
      },
      {
        path: 'cart',
        loadComponent: () => import('../features/cart/pages/cart.page').then(m => m.CartPage)
      },
      {
        path: 'account',
        loadComponent: () => import('../features/account/pages/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];