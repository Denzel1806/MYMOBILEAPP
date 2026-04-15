import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./features/splash/pages/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'welcome',
    loadComponent: () => import('./features/onboarding/pages/onboarding.page').then((m) => m.OnboardingPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/pages/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/pages/forgot-password.page').then((m) => m.ForgotPasswordPage),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/info/pages/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'shop',
        loadComponent: () => import('./features/catalog/pages/shop.page').then((m) => m.ShopPage),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./features/wishlist/pages/favorites.page').then((m) => m.FavoritesPage),
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/pages/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'account',
        loadComponent: () => import('./features/account/pages/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'car/:id',
    loadComponent: () => import('./features/product/pages/car-details.page').then((m) => m.CarDetailsPage),
  },
  {
    path: 'search',
    loadComponent: () => import('./features/catalog/pages/search-results.page').then((m) => m.SearchResultsPage),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/pages/checkout.page').then((m) => m.CheckoutPage),
  },
  {
    path: 'order-success',
    loadComponent: () => import('./features/checkout/pages/order-success.page').then((m) => m.OrderSuccessPage),
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/checkout/pages/checked-out.page').then((m) => m.CheckedOutPage),
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/account/pages/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'support',
    loadComponent: () => import('./features/info/pages/contact-support.page').then((m) => m.ContactSupportPage),
  },
];
