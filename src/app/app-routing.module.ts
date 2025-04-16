import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: AiChatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
