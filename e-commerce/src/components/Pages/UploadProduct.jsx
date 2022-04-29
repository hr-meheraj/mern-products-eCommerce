import React from "react";
import {Toaster, toast} from 'react-hot-toast'
import axios from 'axios'
function UploadProduct() {
    const handleProductSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const price = event.target.price.value;
        const product = {name, price};
        axios.post('https://crud-e-commerce.hrmeheraj.repl.co/products',{
          ...product
        }).then( data => {
            if(data.status === 200){
                toast.success('Successfully Product Uploaded!')
            }
        }).catch(err => {
            toast.success('Something went wrong to upload product')
        })
    }
  return (
    <div className="container  mt-5 d-flex justify-content-center">
        <Toaster
             position="top-right"
             reverseOrder={false}
        />
      <form onSubmit={handleProductSubmit} className='w-75'>
        <div class="mb-3">
          <label htmlFor="name" class="form-label">
             Product Name
          </label>
          <input
            type="text"
            name='name'
            required
            class="form-control"
            id="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="price" class="form-label">
            Price
          </label>
          <input
            type="number"
            required
            name='price'
            class="form-control"
            id="price"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadProduct;