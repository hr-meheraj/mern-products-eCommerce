import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
import axios from "axios";
import Loading from "../Shared/Loading";
function OrderList() {
  const [orderLists, setOrderLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const getApi = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://gentle-reaches-08178.herokuapp.com/orders?email=${user.email}`
      );
      setOrderLists(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getApi();
  }, []);
  return (
    <div className="container">
      {loading && <Loading />}
      <h2 className="mt-4 text-info">Order List Here</h2>
      <br />
      <hr />
      <br />
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderLists?.map((order,index) => {
              return (
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{order.name}</td>
                  <td>{order.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
