import React, { useState, useEffect } from "react";
import axios from "axios";
import {Toaster, toast} from 'react-hot-toast'
import Loading from "../Shared/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
function Products() {
  const [products, setProducts] = useState([]);
  const [user, authLoading] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const getApi = async (url) => {
        try{
            setLoading(true);
            const response = await axios.get(url);
            setProducts(response.data);
        }catch(err){
            console.log("Err here ", err);
        }finally{
            setLoading(false)
        }
  }
  useEffect(() => {
       getApi("https://crud-e-commerce.hrmeheraj.repl.co/products");
  }, []);

  const handleProductDelate = (id) => {
      if(user){
        const procced = window.confirm("Do you want to delete this product ?");
        if(procced){
            axios.delete(`https://crud-e-commerce.hrmeheraj.repl.co/products/${id}`)
            .then( res => {
              console.log(res);
              const remaining = products.filter(product => product._id !== id);
              setProducts(remaining);
            })
            .catch(err => console.log(err));
        }
      }else{
        toast.error("You have to Login to delete product");
      }
  }

  const handleProductOrder = (product) => {
    if(user){
        const {name, price} = product;
        const email = user?.email
      const orderInfo = {
          name, price, email
      }
      axios.post('https://crud-e-commerce.hrmeheraj.repl.co/orders', { ...orderInfo})
      .then( res => console.log(res))
      .catch( err => console.log(err));
    }else{
        toast.error("You have to Login to Order product");
      }
  }
  return (
    <div className="container mt-2">
        <Toaster
             position="top-right"
             reverseOrder={false}
        />
        {(loading || authLoading )&& <Loading/>}
      <br/>
      <h2 className='text-center text-primary'>All Prodcuct {products?.length}</h2>
      <hr/>
      <br/>
      <div className="row g-3">
         {
             products?.map(product => {
                 return(
                    <div key={product._id} className="col-md-6 col-lg-4 col-12 p-2">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{product.name}</h5>
                        <h1>Price : ${product.price}</h1> 
                        <button  class="btn text-danger shadow-sm" onClick={() => handleProductDelate(product._id)}>
                           Delete
                        </button>
                        <button className='ml-3 btn btn-primary' onClick={() => handleProductOrder(product)}>Order</button>
                      </div>
                    </div>
                  </div>
                 )
             })
         }
      </div>
    </div>
  );
}

export default Products;
