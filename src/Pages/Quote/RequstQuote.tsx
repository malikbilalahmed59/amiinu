/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {

  Button,
  ButtonGroup,
  ButtonToolbar,
  Checkbox,
  Col,
  DatePicker,
  FlexboxGrid,
  Form,
  Heading,
  SelectPicker,
  Text,
} from "rsuite";
import { z } from "zod";
import { useLocations } from "../../Hooks/useLocations";
import { Cargo } from "../../services/types";
import NavBar from "./NavBar";
import "./requestquote.css";
import schema from "./schema";

import { axiosInstance } from "../../services/api-client";
import ContainerForm from "../../Components/ContainerForm";
import { container_details } from "../../services/types";
import moment from "moment"; 

type FormData = z.infer<typeof schema>;

const RequstQuote = () => {

  const {  isLoading } = useLocations();



  const [formData, setFormData] = useState<Cargo>({
    container: [
      {
        dangerous_good_details: {
          un_number: null,
          proper_shipping_name: "",
          class_division: "",
          subdivision: "",
          packaging_group: "",
          packaging_instructions: "",
          DangeriousQuantity: null,
          total_net_quantity: null,
          type_of_packing: "",
          authorization: "",
        },
        reefer_details: {
          temperature: null,
          ventilation: null,
          humidity: null,
        },
        description: "",
        container_type: "",
        quantity: "",
        weight_per_unit: "",
        hs_code: "",
        oversize: false,
        dangerous_goods: false,
        reefer: false,
        shipment: "",
        id: 1,
      },
    ],
    from: "",
    to: "",
    departureDate: null,
    incoterm: "",
    deliveryAddress: "",
    pickupAddress: "",
    showPickupAddress: false,
    showDeliveryAddress: false,

    customer_reference: ''
  });

  const handleAddContainer = () => {
    // Find the maximum id in the current containers
    const lastId = formData.container.reduce((maxId, container) => Math.max(container.id, maxId), 0);
    const nextId = lastId + 1;
  
    const newContainer: container_details = {
      dangerous_good_details: {
        un_number: null,
        proper_shipping_name: '',
        class_division: '',
        subdivision: '',
        packaging_group: '',
        packaging_instructions: '',
        DangeriousQuantity: null,
        total_net_quantity: null,
        type_of_packing: '',
        authorization: '',
      },
      reefer_details: {
        temperature: null,
        ventilation: null,
        humidity: null,
      },
      description: '',
      container_type: '',
      quantity: '',
      weight_per_unit: '',
      hs_code: '',
      oversize: false,
      dangerous_goods: false,
      reefer: false,
      shipment: '',
      id: nextId,
    };
  
    setFormData((prevState) => ({
      ...prevState,
      container: [...prevState.container, newContainer],
    }));

  };

  const {
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });
  const [formErrors, setFormErrors] = useState<Cargo>();
  const [location, setLocation] = useState([]);

  const searchParams = new URLSearchParams(window.location.search);
  const method = searchParams.get("method");
  const mode = searchParams.get("mode");


  const handleCargoChange = (key: keyof Cargo | string, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleContainerChange = (id: number, name: string, value: any) => {
    setFormData((prevState) => ({
      ...prevState,

      container: prevState.container.map((container) => {
        if (container.id === id) {
          const keys = name.split(".");
          if (keys.length > 1) {
            return {
              ...container,
              [keys[0]]: {
                ...(container as any)[keys[0]],
                [keys[1]]: value,
              },
            };
          }
          return {
            ...container,
            [name]: value,
          };
        }
        return container;
      }),

    }));
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
try {

    // console.log("onSubmit data:", data);
    // const parsedFormData = schema.safeParse(formData);
    // console.log("parsedFormData", parsedFormData);
    // if (!parsedFormData.success) {
    //   const error = parsedFormData.error;
    //   let newErrors = {};
    //   for (const issue of error.issues) {
    //     newErrors = {
    //       ...newErrors,
    //       [issue.path[0]]: issue.message,
    //     };
    //   }
    //   setFormErrors(newErrors);
    // } else {
    //   setFormErrors({});
      
    //   }
        const transformToApiData = (data: Cargo) => {
          return {
            type: method,
            transport_mode: mode,
            from_location: data.from || null,
            to_location: data.to || null,
            departure_date:data.departureDate ? moment(data.departureDate).format('YYYY-MM-DD') : null,
            incoterm: data.incoterm || null,
            pickup_service: data.showPickupAddress,
            delivery_service: data.showDeliveryAddress,
            pickup_address: data.showPickupAddress ? data.pickupAddress : null,
            delivery_address: data.showDeliveryAddress ? data.deliveryAddress : null,
            customer_reference: data.customer_reference, 
            cargo: data.container.map((container) => ({
              description: container.description || null,
              container_type: container.container_type || null,
              item_type: null, // Assuming you need to map this from somewhere
              quantity: container.quantity || null,
              weight: container.weight_per_unit || null,
              length: null, // Assuming you need to map this from somewhere
              width: null, // Assuming you need to map this from somewhere
              height: null, // Assuming you need to map this from somewhere
              hs_code: container.hs_code || null,
              oversize: container.oversize,
              non_stackable: null, // Assuming you need to map this from somewhere
              dangerous_goods: container.dangerous_goods,
              dangerous_good_details: container.dangerous_goods ? {
                un_number: container.dangerous_good_details?.un_number || null,
                proper_shipping_name: container.dangerous_good_details?.proper_shipping_name || null,
                class_division: container.dangerous_good_details?.class_division || null,
                subdivision: container.dangerous_good_details?.subdivision || null,
                packaging_group: container.dangerous_good_details?.packaging_group || null,
                packaging_instructions: container.dangerous_good_details?.packaging_instructions || null,
                quantity: container.dangerous_good_details?.DangeriousQuantity || null,
                total_net_quantity: container.dangerous_good_details?.total_net_quantity || null,
                type_of_packing: container.dangerous_good_details?.type_of_packing || null,
                authorization: container.dangerous_good_details?.authorization || null
              } : {},
              reefer: container.reefer,
              reefer_details: container.reefer ? {
                temperature: container.reefer_details?.temperature || null,
                ventilation: container.reefer_details?.ventilation || null,
                humidity: container.reefer_details?.humidity || null
              } : {}
            })),
            
          };
        }
        const apiData = transformToApiData(formData);
        console.log("apiData", apiData)
     
        const response = await axiosInstance.post("quote/shipments/",apiData );
        console.log("response", response)
} catch (error) {
  console.log(error)
}
        
  };
  console.log("errors", errors);
  console.log("fromData", formData);
  console.log("FormErrors", formErrors);

  const [selected, setSelected] = useState<string>("KG/CM");
  const [celsiusstate, setcelsiusstate] = useState<string>("CELSIUS");


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axiosInstance.get("/quote/locations/");
        console.log("location", response);
        setLocation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocation();
  }, []);

  const transformedLocations = location.map((loc: any) => ({
    label: loc?.name + "," + loc.port_type + "," + loc.country,
    value: loc?.id,
  }));

  const disablePastDates = (date: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  
  return (
    <>
      <NavBar />

      {/* Banner Heading */}
      <FlexboxGrid className="req-banner" justify="center" align="bottom">
        <FlexboxGrid.Item colspan={20}>
          <Text className="text-white banner-heading fcl-shipment">
            FCL Shipment
          </Text>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      {/* Filter Section */}
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <FlexboxGrid justify="center" className="filter-bar first-box">
          <FlexboxGrid.Item
            colspan={20}
            as={Form}
            style={{ background: "", borderRadius: "4px" }}
            className="first-boxitem"
            fluid
          >
            <FlexboxGrid className="p-2" justify="space-between">
              <FlexboxGrid.Item
                as={Col}
                xs={24}
                sm={12}
                md={12}
                lg={8}
                className="from "
              >
                {/* Form Input */}
                <Form.Group controlId="from">
                  <Form.ControlLabel className="fromLabel">
                    FROM
                  </Form.ControlLabel>
                  <SelectPicker
                    data={transformedLocations}
                    loading={isLoading}
                    searchable
                    {...register("from")}
                    name="from"
                    className="w-100"
                    placeholder="Search by Location"
                    value={formData.from}
                    onChange={(value: string) =>
                      handleCargoChange("from", value)
                    }
                  />

                  {formErrors?.from && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.from}
                    </Form.HelpText>
                  )}
                </Form.Group>
                <div className="second-checkbox">
                  <Checkbox
                    onChange={(_, checked) =>
                      handleCargoChange("showPickupAddress", checked)
                    }
                    checked={formData.showPickupAddress}
                    className="pickup-services"
                  >
                    Pickup Service
                  </Checkbox>

                  {formData.showPickupAddress && (
                    <div className="input-field">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Pickup Address"
                        value={formData.pickupAddress}
                        onChange={(e) =>
                          handleCargoChange("pickupAddress", e.target.value)
                        }
                      />
                      {formErrors?.pickupAddress && (
                        <small className="text-danger">
                          {formErrors?.pickupAddress}
                        </small>
                      )}
                    </div>
                  )}
                </div>
              </FlexboxGrid.Item>

              <FlexboxGrid.Item as={Col} xs={24} sm={12} md={12} lg={8}>
                <Form.Group controlId="to">
                  <Form.ControlLabel className="to">TO</Form.ControlLabel>
                  <SelectPicker
                    data={transformedLocations}
                    loading={isLoading}
                    searchable
                    {...register("to")}
                    name="to"
                    className="w-100"
                    placeholder="Search by Location"
                    value={formData.to}
                    onChange={(value: string) => handleCargoChange("to", value)}
                  />
                  {formErrors?.to && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.to}
                    </Form.HelpText>
                  )}
                </Form.Group>
                <div className="first-checkbox">
                  <Checkbox
                    className="delivery-services"
                    checked={formData.showDeliveryAddress}
                    onChange={(_, checked) =>
                      handleCargoChange("showDeliveryAddress", checked)
                    }
                  >
                    Delivery Service
                  </Checkbox>
                  {formData.showDeliveryAddress && (
                    <div className="input-field" style={{ marginLeft: "10px" }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Delivery Address"
                        value={formData.deliveryAddress}
                        onChange={(e) =>
                          handleCargoChange("deliveryAddress", e.target.value)
                        }
                      />
                      {formErrors?.deliveryAddress && (
                        <small className="text-danger">
                          {formErrors?.deliveryAddress}
                        </small>
                      )}
                    </div>
                  )}
                </div>
              </FlexboxGrid.Item>

              <FlexboxGrid.Item as={Col} xs={24} sm={12} md={12} lg={4}>
                <Form.Group controlId="datePicker">
                  <Form.ControlLabel className="departure-date">
                    DEPARTURE DATE*
                  </Form.ControlLabel>
                  <DatePicker
                    oneTap
                    {...register("departureDate")}
                    error={errors.departureDate?.message}
                    name="departureDate"
                    className="w-100"
                    disabledDate={disablePastDates}
                    value={formData.departureDate}
                    onChange={(value: string) =>
                      handleCargoChange("departureDate", value)
                    }
                  />
                  {formErrors?.departureDate && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.departureDate}
                    </Form.HelpText>
                  )}
                </Form.Group>
              </FlexboxGrid.Item>

              <FlexboxGrid.Item
                as={Col}
                xs={24}
                sm={12}
                md={12}
                lg={4}
                className="incoterm-item"
              >
                <Form.Group controlId="incoterm">
                  <Form.ControlLabel className="incoterm">
                    INCOTERM*{" "}
                    <a href="#" className="click-details">
                      Click for details
                    </a>
                  </Form.ControlLabel>
                  <SelectPicker
                    data={[
                      ["EXW", "EXW - Ex Works"],
                      ["FCA", "FCA - Free Carrier"],
                      ["FOB", "FOB - Free On Board"],
                      ["CPT", "CPT - Carriage Paid To"],
                      ["CFR", "CFR - Cost and Freight"],
                      ["CIF", "CIF - Cost, Insurance and Freight"],
                      ["CIP", "CIP - Carriage and Insurance Paid To"],
                      ["DAP", "DAP - Delivered At Place"],
                      ["DDP", "DDP - Delivered Duty Paid"],
                    ].map(([value, label]) => ({ label, value }))}
                    searchable
                    {...register("incoterm")}
                    name="incoterm"
                    error={errors.incoterm?.message}
                    className="w-100"
                    placeholder="Search by incoterm"
                    value={formData.incoterm}
                    onChange={(value: string) =>
                      handleCargoChange("incoterm", value)
                    }
                  />
                  {formErrors?.incoterm && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.incoterm}
                    </Form.HelpText>
                  )}
                </Form.Group>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
        </FlexboxGrid>

        {/* cargo section here  */}
        <FlexboxGrid justify="center" align="bottom" className="cargoLastdiv">
          <FlexboxGrid.Item colspan={18} className="pb-5 lastDiv-item">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={24}>
                <FlexboxGrid>
                  <FlexboxGrid.Item
                    colspan={24}
                    className="d-flex py-4"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Heading level={6} className="cargo">
                      Cargo
                    </Heading>
                    <ButtonToolbar>
                      <ButtonGroup>
                        <Button
                          appearance="primary"
                          onClick={() => setSelected("KG/CM")}
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              selected === "KG/CM" ? "#04205f" : "white",
                            color: selected === "KG/CM" ? "white" : "black",
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          KG/CM
                        </Button>
                        <Button
                          appearance="ghost"
                          onClick={() => setSelected("LB/IN")}
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              selected === "LB/IN" ? "#04205f" : "white",
                            color: selected === "LB/IN" ? "white" : "black",
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          LB/IN
                        </Button>
                      </ButtonGroup>
                      <ButtonGroup>
                        <Button
                          appearance="primary"
                          onClick={() => setcelsiusstate("CELSIUS")}
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              celsiusstate === "CELSIUS" ? "#04205f" : "white",
                            color:
                              celsiusstate === "CELSIUS" ? "white" : "black",
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          CELSIUS
                        </Button>
                        <Button
                          appearance="ghost"
                          onClick={() => setcelsiusstate("FAHRENHEIT")}
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              celsiusstate === "FAHRENHEIT"
                                ? "#04205f"
                                : "white",
                            color:
                              celsiusstate === "FAHRENHEIT" ? "white" : "black",
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          FAHRENHEIT
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </FlexboxGrid.Item>
                  <div>

                  <div>

                    {formData?.container?.map((c: any) => (
                      <ContainerForm
                        key={c.id}
                        containerState={c}
                        handleContainerChange={handleContainerChange}
                        errors={formErrors}
                      />
                    ))}
                    <Button

                      onClick={handleAddContainer}

                      style={{ margin: "20px 0px" }}
                    >
                      Add Container
                    </Button>
                  </div>

                  
                  <div>

                  <Heading level={6} className="py-5">
                    References
                  </Heading>
                  <FlexboxGrid.Item
                    colspan={24}
                    style={{ background: "white", borderRadius: "4px" }}
                    className="p-4"
                  >
                 
                 <input
                        type="text"
                        className="form-control"
                        placeholder="Enter customer_reference"
                        value={formData.customer_reference}
                        onChange={(e) =>
                          handleCargoChange("customer_reference", e.target.value)
                        }
                      />
                       {formErrors?.departureDate && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.departureDate}
                    </Form.HelpText>
                  )}
                  </FlexboxGrid.Item>
                  <Button
                    // disabled={!isValid}
                    appearance="primary"
                    type="submit"
                    className="mt-3"
                  >
                    Submit
                  </Button>
                  </div>
                  </div>
                </FlexboxGrid>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </form>
    </>
  );
};

export default RequstQuote;
