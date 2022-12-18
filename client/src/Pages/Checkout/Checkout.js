import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price, img } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const address = form.address.value;
    const postcode = form.postcode.value;
    const currency = form.currency.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      address,
      postcode,
      currency
    };

    // if(phone.length > 10){
    //     alert('Phone number should be 10 characters or longer')
    // }
    // else{

    // }

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.replace(data.url);
      })
      .catch((er) => console.error(er));
  };

  return (
    <div>
      <form onSubmit={handlePlaceOrder} className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl">You are about to order: {title}</h2>
          <h4 className="text-3xl">Price: {price}</h4>
          <img src={img} alt="" />
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="input input-ghost w-full  input-bordered"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="input input-ghost w-full  input-bordered"
            />
            <input
              name="phone"
              type="text"
              placeholder="Your Phone"
              className="input input-ghost w-full  input-bordered"
              required
            />
            <input
              name="email"
              type="text"
              placeholder="Your email"
              defaultValue={user?.email}
              className="input input-ghost w-full  input-bordered"
              readOnly
            />
          <select
            defaultValue="BDT"
            name="currency"
            className="select select-bordered max-w-xs"
          >
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
          </select>

          <input
            type="text"
            name="postcode"
            placeholder="Your Postcode"
            className="input input-ghost w-full  input-bordered"
          />
          </div>


          <textarea
            name="address"
            className="textarea textarea-bordered h-24 w-full my-5"
            placeholder="Your Address"
            required
          ></textarea>

          <input className="btn w-full" type="submit" value="Pay" />
        </div>
      </form>
    </div>
  );
};

export default Checkout;
