import { Component } from '@angular/core';
import { ProductsService } from '../../Services/product.service';
import { Icatagory } from '../../Moduels/icatagory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catagorylist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catagorylist.component.html',
  styleUrl: './catagorylist.component.css'
})
export class CatagorylistComponent {
  catagorylist:Icatagory[]=[];
  currentid:number=0
  Image:any;
  base64:string | ArrayBuffer | null='';
  constructor(private prdService :ProductsService ) 
  {
   
  }
  ngOnInit(): void {
   
    this.gettest();
}
gettest()
{      

  this.prdService.getallcat()
  
  .subscribe((res:any)=>{
    console.log(res);

    res.forEach((x:any) => {
      x.imgg ="data:img/jpg;base64,"+x.img;
      this.catagorylist.push(x);


    });
  })

  

 
}
}
