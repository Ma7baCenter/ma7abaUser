import { Routes } from '@angular/router';
import { MasterComponent } from './Component/master/master.component';
import { EditComponent } from './Component/edit/edit.component';
import { CartComponent } from './Component/cart/cart.component';
import { OrdersForUserComponent } from './Component/orders-for-user/orders-for-user.component';
import { ContactUsComponent } from './Component/contact-us/contact-us.component';
import { OfferComponent } from './Component/offer/offer.component';

export const routes: Routes = [
   // {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: 'products', component:MasterComponent},
    {path: 'offer', component:OfferComponent},
    {path:"details/:id" , component:EditComponent},
    {path:"card" , component:CartComponent},
    {path:"order" , component:OrdersForUserComponent},
    {path:"ContactUs" , component:ContactUsComponent},

{ path: '',  component:MasterComponent },
];
