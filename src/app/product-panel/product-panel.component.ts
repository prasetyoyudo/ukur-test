import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder,
          FormGroup,
          Validators }                from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss']
})
export class ProductPanelComponent implements OnInit {
  modalRef? : BsModalRef;
  updateModalRef? : BsModalRef;
  productForm?    = new FormGroup({})
  productsData    : any = [];
  dataProductById : any;
  lastData        : boolean = false;
  dataProductId   : any
  
  constructor(
    private modalService  : BsModalService,
    private _fb           : FormBuilder,
    private _product      : ProductService
  ) {}

  async ngOnInit() {
    await this.buildForm()
    this.productsData = await this.getProductData()
  }

  async getProductData() {
    return new Promise((resolve, reject) => {
      this._product.getProductServices(20)
      .subscribe((res: any) =>{
          if(res != null) {
            this.productsData = this.productsData.concat(res)
            resolve(res)
          }
        })
      })
  }

  async buildForm() {
    this.productForm = this._fb.group({
      'title'       : ['',Validators.compose([Validators.required])],
      'price'       : ['',Validators.compose([Validators.required])],
      'category'    : ['',Validators.compose([Validators.required])],
      'image'       : ['',Validators.compose([Validators.required])],
      'description' : ['']
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalUpdate(template: TemplateRef<any>, dataId : any) {
    this.dataProductId = dataId
    this.updateModalRef = this.modalService.show(template);
    if(dataId < 21) {
      console.log("hitttttttttt")
      this._product.getProductByIdService(dataId)
      .subscribe((res: any) =>{
        this.dataProductById = res
        this.productForm = this._fb.group({
          'title'       : [res?.title,Validators.compose([Validators.required])],
          'price'       : [res?.price,Validators.compose([Validators.required])],
          'category'    : [res?.category,Validators.compose([Validators.required])],
          'image'       : [res?.image,Validators.compose([Validators.required])],
          'description' : [res?.description]
        });
      })
    }
  }

  async updateProducts(dataUpdate : any, id : any) {
    await this._product.updateProductServices(dataUpdate, id)
    .subscribe(async(res: any) =>{
      let newProductsData : any = []
      await Promise.all(this.productsData.map((dataMapping : any) => {
        if(dataMapping.id == res.id) {
          dataMapping = res
        }
        newProductsData.push(dataMapping)
        console.log(newProductsData)
      }))
      this.productsData = newProductsData
    })  
    this.updateModalRef?.hide()
  }

  addProduct(data : any) {
    return new Promise((resolve, reject) => {
      this._product.addProductServices(data)
      .subscribe((res: any) =>{
        console.log(res)
        this.productsData.push(res)
      })
      this.modalRef?.hide()
    })
  }

  deleteProduct(dataId : any) {
    return new Promise((resolve, reject) => {
      this._product.deleteProductServices(dataId)
      .subscribe((res: any) =>{
        this.productsData = this.productsData.filter(function (dataProduct : any) {
          if(res != null) {
            if(dataProduct.id == res.id ) {
              return false
            } else {
              return true
            }
          } else {
            if(dataProduct.id == dataId ) {
              return false
            } else {
              return true
            }
          }
          
        })
      })
    })
  }


  onScroll(){
    if(this.lastData == false){
      this.getProductData();
    }
  }

  // getProductsScroll(filter : any){
  //   this._product.getProductServices(filter)
  //   .subscribe((res: any) =>{
  //     if(res['status'] == true){
  //       this.server_validation = false
  //       if(res['data'].length == 0){
  //         this.lastData = true
  //       }else{
  //         this.products = this.products.concat(res['data'])
  //       }
  //     } else {
  //       this.server_validation = true;
  //       this.titleAlert = this._product.htmlToPlaintext(res['message']);
  //     }

  //   },
  //   error =>{
  //     this.server_validation = true;
  //     this.titleAlert = this._product.htmlToPlaintext(error.error.error);
  //   })
  // }

  
}
