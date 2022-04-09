import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "personnes",
    loadChildren: "./person/person.module#PersonModule",
  },
  {
    path: "apropos",
    loadChildren: "./about/about.module#AboutModule",
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "personnes",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
