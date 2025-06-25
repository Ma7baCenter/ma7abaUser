import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
   productForm!: FormGroup;
  selectedFiles: File[] = [];
imagePreviews: string[] = []; // holds preview data (base64)

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    // simulate loading existing product from API
    const existingProduct = {
      product_Id: 1,
      name: 'لبن المراعي',
      description: 'وصف المنتج',
      price: 40,
      images: [
        { id: 1, image: 'img1.jpg' },
        { id: 2, image: 'img2.jpg' },
      ],
    };

    this.productForm = this.fb.group({
      product_Id: [existingProduct.product_Id],
      name: [existingProduct.name],
      description: [existingProduct.description],
      price: [existingProduct.price],
      images: this.fb.array([])    });


       existingProduct.images.forEach(img => {
    this.images.push(this.fb.group({ image: img.image }));
    this.imagePreviews.push(img.image); // <-- هنا نضيف الصورة للعرض
  });
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedFiles.push(file);
    this.images.push(this.fb.group({ image: file.name }));

    // لعرض المعاينة
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews.push(reader.result as string); // base64 preview
    };
    reader.readAsDataURL(file);
  }
}


  

  removeImage(index: number) {
  this.selectedFiles.splice(index, 1);
  this.imagePreviews.splice(index, 1);
  this.images.removeAt(index);
}

  onSubmit() {
const formData = new FormData();

    formData.append('product_Id', this.productForm.value.product_Id);
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);

    this.selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    });   
    
    this.http.post('/api/Product/UpdateWithUpload', formData).subscribe({
      next: () => alert('تم تحديث المنتج مع الصور'),
      error: err => console.error(err),
    });
  }
}