import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//Components
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { ErrorComponent } from "./components/error/error.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { CategoryNewComponent } from "./components/category-new/category-new.component";
import { PostNewComponent } from "./components/post-new/post-new.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { PostEditComponent } from "./components/post-edit/post-edit.component";
import { CategoryDetailComponent } from "./components/category-detail/category-detail.component";
import { ProfileComponent } from "./components/profile/profile.component";
//Services
import { IdentityGuard } from './services/identity.guard';
// Defino las rutas:

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "logout/:sure", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "settings", component: UserEditComponent, canActivate: [IdentityGuard] },
  { path: "create-category", component: CategoryNewComponent , canActivate: [IdentityGuard] },
  { path: "create-post", component: PostNewComponent, canActivate: [IdentityGuard]  },
  { path: "post/:id", component: PostDetailComponent },
  { path: "post-edit/:id", component: PostEditComponent, canActivate: [IdentityGuard]  },
  { path: "category-detail/:id", component: CategoryDetailComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "**", component: ErrorComponent },
];

// Exportar config de rutas:

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
