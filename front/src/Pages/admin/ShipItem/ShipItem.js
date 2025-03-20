import React from "react";
import { useEffect,useState } from "react";
import './ShipItem.css'
import ReusableInput from "../../../components/ui/ReusableInput/Reusable";
import { toast } from "react-toastify";
import { postData } from "../../../services/NodeServices";



export default function ShipItem({order,listItem}){
    
    const [shippingData,setShippingData]=useState({
        "shipments": [ 
                                            {
                                           "waybill":"", 
                                           "order":"BL000"+order.orderid,
                                           "sub_order":"A", 
                                           "order_date":order.created_at, 
                                           "total_amount":order.amount, 
                                           "name":order.name, 
                                           "company_name":"ABC Company", 
                                           "add":order.add1,  
                                           "add2":order.add2, 
                                           "add3":'', 
                                           "pin":order.zip, 
                                           "city":order.city, 
                                           "state":order.state, 
                                           "country":"India", 
                                           "phone":order.mobileno, 
                                           "alt_phone":"", 
                                           "email":'abc@gmail.com', 
                                           "is_billing_same_as_shipping":"yes", 

                                 /*           "billing_name":"Bharat",
                                           "billing_company_name":"ABC Company", 
                                           "billing_add":"104,Shreeji Sharan", 
                                           "billing_add2":"", 
                                           "billing_add3":"",  
                                           "billing_pin" :"400067", 
                                           "billing_city":"Mumbai", 
                                           "billing_state":"Maharashtra", 
                                           "billing_country":"India", 
                                           "billing_phone":"9876543210", 
                                           "billing_alt_phone":"9876543210", 
                                           "billing_email":"abc@gmail.com",  */
                                           "products":[ 
                                                                         /*   { 
                                                                           "product_name" : "Green color tshirt", 
                                                                           "product_sku" : "GC001-1", 
                                                                           "product_quantity" : "1", 
                                                                           "product_price" : "100", 
                                                                           "product_tax_rate" : "5", 
                                                                           "product_hsn_code" : "91308", 
                                                                           "product_discount" : "0",
                                                                           "product_img_url" : "https://abc.com/image.jpeg"
                                                                           }, 
                                                                           { 
                                                                           "product_name" : "Red color tshirt", 
                                                                           "product_sku" : "GC002-2", 
                                                                           "product_quantity" : "1", 
                                                                           "product_price" : "200", 
                                                                           "product_tax_rate" : "5", 
                                                                           "product_hsn_code" : "91308", 
                                                                           "product_discount" : "0", 
                                                                           "product_img_url" : "https://abc.com/imagejpeg" 
                                                                           }  */
                                                                       ],
                                           "shipment_length" : "10",    
                                           "shipment_width" : "10",    
                                           "shipment_height" : "5",    
                                           "weight" : "1",   
                                           "shipping_charges" : order.shipping?order.shipping:"0",
                                           "giftwrap_charges" : "0", 
                                           "transaction_charges" : "0",
                                           "total_discount" : order.discount?order.discount:"0",
                                           "first_attemp_discount" : "0",
                                           "cod_charges" : "0", 
                                           "advance_amount" : "0", 
                                           "cod_amount" : order.paymentmode=="COD"?order.amount:"0", 
                                           "payment_mode" : order.paymentmode,   
                                           "reseller_name" : "", 
                                           "eway_bill_number" : "", 
                                           "gst_number" : "", 
                                           "what3words" : "",    
                                           "return_address_id" : "1293" ,
                                           "api_source" : "0" ,    
                                           "store_id" : "1"    
                                           } 
                                   ], 
       "pickup_address_id" : "1293",
       "access_token" : "5a7b40197cd919337501dd6e9a3aad9a", 
       "secret_key" : "2b54c373427be180d1899400eeb21aab",
       "logistics" : "Delhivery", 
       "s_type" : "", 
       "order_type" : "" 
       } )

       const handleInputChange = (nam,value) => {
        setShippingData((prevData) => ({
          ...prevData,
          nam: value, // Update pickup_address_id
        }));
      };
      const handleShipmentChange = (field, value, shipmentField = false) => {
        setShippingData((prevData) => {
          if (shipmentField) {
            return {
              ...prevData,
              shipments: [
                {
                  ...prevData.shipments[0],
                  [field]: value,
                },
              ],
            };
          }
          return { ...prevData, [field]: value };
        });
      };
    


      useEffect(() => {
        if (listItem?.length > 0) {
          setShippingData((prevData) => ({
            ...prevData,
            shipments: [
              {
                ...prevData.shipments[0],
                products: listItem.map((item) => ({
                  product_name: item.name,
                  product_sku: item.sku?item.sku:'',
                  product_quantity: 1,
                  product_price: item.price,
                  product_tax_rate: '0',
                  product_hsn_code: item.hsn?item.hsn:'',
                  product_discount: '0',
                  product_img_url:item.image_url,
                })),
              },
            ],
          }));
        }
      }, [listItem]);


  const handleProductChange = (index, field, value) => {
    setShippingData((prevData) => {
      const updatedProducts = [...prevData.shipments[0].products];
      updatedProducts[index] = { ...updatedProducts[index], [field]: value };

      return {
        ...prevData,
        shipments: [
          {
            ...prevData.shipments[0],
            products: updatedProducts,
          },
        ],
      };
    });
  };

  const setGST = (value) => {
    setShippingData((prevData) => ({
      ...prevData,
      shipments: [
        {
          ...prevData.shipments[0],
          gst_number: value,
        },
      ],
    }));
  };




  const handleSubmit = async () => {
    console.log(shippingData)
    let body = {"data":shippingData}
    try {
      const response = await fetch("https://pre-alpha.ithinklogistics.com/api_v3/order/add.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const result = await response.json();
      if (response.ok) {
        if(result.status=='success'){
          
            toast.success("Shipping data submitted successfully!");
            const resultnew = await postData('api/order/addwaybill',{waybill:result.data["1"].waybill,orderid:order.orderid})
        }else{
            toast.warning(result.data["1"].remark)
        }
        console.log("Success:", result);

       
      } else {
        console.log("Error:", result);
        toast.error("Failed to submit shipping data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting.");
    }
  };

    return(
        <div className="shipcont">



<div className="shipping__itm">
        <div>Item Details</div>
        {shippingData.shipments[0].products.map((product, index) => (
          <div key={index} className="product-inputs">
            <ReusableInput
              label={"Product Name"}
              value={product.product_name}
              disabled
            />
            <div style={{display:'flex',width:'99%'}}>
            <ReusableInput
              label={"SKU"}
              value={product.product_sku}
              setValue={(value) => handleProductChange(index, "product_sku", value)}
            />
            <ReusableInput
              label={"HSN Code"}
              value={product.product_hsn_code}
              setValue={(value) => handleProductChange(index, "product_hsn_code", value)}
            />
            </div>
          </div>
        ))}
      </div>



            <div className="Shipping__details">
               <div>
                Shipping Address
               </div>

               <div className="shippingaddress">
               <ReusableInput
            label={"Pickup Address"}
            value={shippingData.pickup_address_id}
            setValue={(value) => handleInputChange('pickup_address_id',value)}
          />
               </div>
                <div className="shippingaddress2">
                <ReusableInput
            label={"Length"}
            value={shippingData.shipments[0].shipment_length}
            setValue={(value) => handleShipmentChange("shipment_length", value, true)}
            
          />
              <ReusableInput
            label={"Width"}
            value={shippingData.shipments[0].shipment_width}
            setValue={(value) => handleShipmentChange("shipment_width", value, true)}
            
          />
              <ReusableInput
            label={"Height"}
            value={shippingData.shipments[0].shipment_height}
  setValue={(value) => handleShipmentChange("shipment_height", value, true)}

            
          />
            <ReusableInput
            label={"Weight"}
            value={shippingData.shipments[0].weight}
            setValue={(value) => handleShipmentChange("weight", value, true)}
            
          />

               </div>
               <div className="shippingaddress2">
                <ReusableInput
            label={"GST Number"}
            value={shippingData.shipments[0].gst_number}
            setValue={(value)=>setGST(value)}
            
          />
           {/*    <ReusableInput
            label={"Shipping Charges"}
            value={shippingData.shipments[0].shipping_charges}
            
          /> */}
         

               </div>
 
            </div>

             
            <div className="submitbutton" style={{width:'100%'}}>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    )
}