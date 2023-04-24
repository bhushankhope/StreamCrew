import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebSocketComponent } from './components/websocket/websocket.component';

const routes: Routes = [
  {
    path: 'websocket',
    component: WebSocketComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
