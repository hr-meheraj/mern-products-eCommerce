import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../Shared/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
function Products() {
  const [products, setProducts] = useState([]);
  const [user, authLoading] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [count, setCount ] = useState(0);
  const getApi = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (err) {
      console.log("Err here ", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getApi(
      `https://gentle-reaches-08178.herokuapp.com/products?size=${size}&page=${page}`
    );
  }, [size, page]);

  const handleProductDelate = (id) => {
    if (user) {
      const procced = window.confirm("Do you want to delete this product ?");
      if (procced) {
        axios
          .delete(`https://gentle-reaches-08178.herokuapp.com/products/${id}`)
          .then((res) => {
            console.log(res);
            const remaining = products.filter((product) => product._id !== id);
            setProducts(remaining);
          })
          .catch((err) => console.log(err));
      }
    } else {
      toast.error("You have to Login to delete product");
    }
  };
  const getPageApi = async () => {
      try{
        setLoading(true);
        const res = await axios.get("https://gentle-reaches-08178.herokuapp.com/productsCount");
        const data = await res.data.count;
        const pages = Math.ceil(data / size);
        console.log(pages);
        setCount(pages);
      }catch(err){
          console.log('Err here to count ', err);
      }finally{
          setLoading(false);
      }
  }
  useEffect(() => {
    getPageApi();
  }, [size]);
  const handleProductOrder = (product) => {
    if (user) {
      const { name, price } = product;
      const email = user?.email;
      const orderInfo = {
        name,
        price,
        email,
      };
      axios
        .post("https://gentle-reaches-08178.herokuapp.com/orders", {
          ...orderInfo,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      toast.error("You have to Login to Order product");
    }
  };
  const handleChangeOption = (event) => {
    setSize(event.target.value);
    console.log(size, event.target.value);
  };
  return (
    <div className="container mt-2">
      <Toaster position="top-right" reverseOrder={false} />
      {(loading || authLoading) && <Loading />}
      <br />
      <h2 className="text-center text-primary">
        All Prodcuct {products?.length}
      </h2>
      <hr />
      <br />
      <div className="row g-3">
        {products?.map((product) => {
          return (
            <div key={product._id} className="col-md-6 col-lg-4 col-12 p-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h1>Price : ${product.price}</h1>
                  <button
                    className="btn text-danger shadow-sm"
                    onClick={() => handleProductDelate(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="ml-3 btn btn-primary"
                    onClick={() => handleProductOrder(product)}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div>
         {
             count && [...Array(count).keys()].map(each => {
                 return (
                     <button onClick={() => setPage(each)} className={`btn shadow-sm ${each === page ? "btn-primary" : ""}`}>{each + 1} </button>
                 )
             })
         }
          <select onChange={handleChangeOption}>
            <option value="6">6</option>
            <option default value="10">
              10
            </option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Products;
