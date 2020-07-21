import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SelectionComponent } from './selection/selection.component';

const routes: Routes = [
  { path:'', component: SelectionComponent},
  { path:'chat/:id', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
