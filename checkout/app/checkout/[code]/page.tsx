'use client'

import Layout from "@/components/Layout";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import constants from "@/utils/constants";
import { Product } from "@/models/product";
import { Quantity } from "@/models/quantity";
import { User } from "@/models/user";

declare var Stripe: any;

export default function Code({ params }: {
  params: { code: string }
}) {
  const [user, setUser] = useState<User>(new User);
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Quantity[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get(`${constants.endpoint}/links/${params.code}`)
        setUser(data.user)
        setProducts(data.products)
        setQuantities(data.products?.map((p: { id: number; }) => ({
          product_id: p.id,
          quantity: 0
        })));
      }
    )()
  }, [])

  const change = (id: number, quantity: number) => {
    setQuantities(quantities?.map(q => {
      if (q.product_id === id) {
        return {
          ...q,
          quantity
        }
      }
      return q;
    }))
  }

  const total = () => {
    return quantities.reduce((s, q) => {
      const product = products.find(p => p.id === q.product_id) || {} as Product;
      let total = parseFloat((s + product.price * q.quantity).toFixed(2));
      return total;
    }, 0)
  }

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { data } = await axios.post(`${constants.endpoint}/orders`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      address: address,
      country: country,
      city: city,
      zip: zip,
      code: params.code,
      products: quantities
    });

    const stripe = new Stripe(constants.stripeKey);

    stripe.redirectToCheckout({
      sessionId: data.id
    });
  }
  return (
    <Layout>
      <main>
        <div className="py-5 text-center">
          <h2>Welcome</h2>
          <p className="lead">{user?.first_name} {user?.last_name} has invited you to buy these products!</p>
        </div>

        <div className="row g-5 mb-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Products</span>
            </h4>
            <ul className="list-group mb-3">
              {products?.map(product => {
                return (
                  <div key={product.id}>
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">{product.title}</h6>
                        <small className="text-body-secondary">
                          {product.description}
                        </small>
                      </div>
                      <span className="text-body-secondary">${product.price}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">Quantity</h6>
                      </div>
                      <input type="number" min="0" defaultValue="0" className="text-muted form-control" style={{ width: '65px' }}
                        onChange={e => change(product.id, parseInt(e.target.value))} />
                    </li>
                  </div>
                )
              })}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total()}</strong>
              </li>
            </ul>
          </div>

          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Personal Info</h4>
            <form className="needs-validation" onSubmit={submit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First name"
                    required
                    onChange={e => setFirstName(e.target.value)}
                  />
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last name"
                    required
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                    onChange={e => setAddress(e.target.value)}
                  />
                </div>

                <div className="col-md-5">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="Country"
                    onChange={e => setCountry(e.target.value)}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="City"
                    onChange={e => setCity(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder="Zip"
                    onChange={e => setZip(e.target.value)}
                  />
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
