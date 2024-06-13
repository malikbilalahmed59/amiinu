/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import { FaFireAlt } from "react-icons/fa";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { RiEqualFill } from "react-icons/ri";
import CargoForm from "../../Components/CargoForm";
import {
  Accordion,
  Col,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Checkbox,
  FlexboxGrid,
  Form,
  Input,
  InputGroup,
  Message,
  Panel,
  RadioGroup,
  RadioTile,
  Uploader,
  SelectPicker,
  DatePicker,
} from "rsuite";
import CustomSelectPicker from "../../Components/SelectPicker";

import { toast } from "react-toastify";
import { FileType } from "rsuite/esm/Uploader";
import { divisionList, servicesLevel } from "../../data/data";
import FormControl from "./FormControl";
import NavBar from "./NavBar";
import { serviceModel } from "./schema";
import "./servicelevel.scss";
import { typeChoices } from "../../data/data";
import { currencyChoices } from "../../data/data";
import axios from "axios";
import { AirCargo } from "../../services/types";
import { axiosInstance } from "../../services/api-client";
import moment from "moment";

const ServiceLevel = () => {
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [insureType, setInsureType] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [insureAgree, setInsureAgree] = useState(false);
  const [from_location, setFromLocation] = useState("");
  const [to_location, setToLocation] = useState("");
  const [selectdate, setselectdate] = useState("");
  const [incoterm, setincoterm] = useState("");
  const [comiditydiscription, setcomiditydiscription] = useState("");
  const [quantity, setquantity] = useState("");
  const [packages, setpackages] = useState("");
  const [weight, setweight] = useState("");
  const [v_weight, set_v_weight] = useState("");
  const [total_weight, settotal_weight] = useState("");
  const [total_volume, settotal_volume] = useState("");
  const [lcm, setlcm] = useState("");
  const [wcm, setwcm] = useState("");
  const [hcm, sethcm] = useState("");
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [amount, setamount] = useState("");
  const [currency, setcurrency] = useState("");
  const [code_character, setcode_character] = useState("");
  const [customer_reference, setcustomer_reference] = useState("");
  const [comment, setcomment] = useState("");
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [subdivision, setsubdivision] = useState("");
  const [temperature_min, setTemperature_min] = useState("");
  const [temperature_max, setTemperature_max] = useState("");
  const [serviceType, setServiceType] = useState<any>(null);
  // According Open/Close States

  console.log("serviceType", serviceType);

  const [activeKey, setActiveKey] = useState("image");
  const [location, setLocation] = useState([]);
  const [selected, setSelected] = useState<string>("KG/CM");
  const [celsiusstate, setcelsiusstate] = useState<string>("CELSIUS");
  const [showPickupAddress, setShowPickupAddress] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [goodsType, setGoodsType] = useState<any>();

  const [dangerous_good_details, setDangerous_good_details] = useState({
    un_number: "",
    proper_shipping_name: "",
    class_division: "",
    subdivision: "",
    packaging_group: "",
    packaging_instructions: "",
    quantity: "",
    total_net_quantity: "",
    type_of_packing: "",
    authorization: "",
  });

  const handleCheckboxChange2 = (value: any, checked2: any) => {
    console.log(value);
    setShowPickupAddress(checked2);
  };
  const handleCheckboxChange = (
    value: ValueType | undefined,
    checked: boolean | ((prevState: boolean) => boolean)
  ) => {
    console.log(value);
    setShowDeliveryAddress(checked);
  };
  const searchParams = new URLSearchParams(window.location.search);
  const method = searchParams.get("method");
  const mode = searchParams.get("mode");

  const initialAirCargo = (): AirCargo[] => [
    {
      id: 1,
      comiditydiscription: "",
      quantity: "",
      packages: "",
      weight: "",
      lcm: "",
      wcm: "",
      hcm: "",
      code_character: "",
      v_weight: "",
      tempearture: false,
      dangerous_good: false,
      temperature_details: {
        min: "",
        max: "",
      },
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
    },
  ];

  const [cargo, setCargo] = useState<AirCargo[]>(initialAirCargo);
  console.log("cargo", cargo);
  const handleCargoChange = (id: number, name: string, value: any) => {
    const updatedCargos = cargo.map((c) => {
      if (c.id === id) {
        const [mainProperty, subProperty] = name.split(".");

        if (subProperty) {
          return {
            ...c,
            [mainProperty]: {
              ...c[mainProperty],
              [subProperty]: value,
            },
          };
        } else {
          return {
            ...c,
            [mainProperty]: value,
          };
        }
      }
      return c;
    });

    setCargo(updatedCargos);
  };

  const handleAddCargo = () => {
    const newId = cargo.length + 1;
    const initialCargo = initialAirCargo()[0];
    const newCargo: AirCargo = {
      id: newId,
      comiditydiscription: initialCargo.comiditydiscription,
      quantity: initialCargo.quantity,
      packages: initialCargo.packages,
      weight: initialCargo.weight,
      lcm: initialCargo.lcm,
      wcm: initialCargo.wcm,
      hcm: initialCargo.hcm,
      code_character: initialCargo.code_character,
      v_weight: initialCargo.v_weight,
      tempearture: initialCargo.tempearture,
      dangerous_good: initialCargo.dangerous_good,
      temperature_details: {
        min: initialCargo.temperature_details.min,
        max: initialCargo.temperature_details.max,
      },
      dangerous_good_details: {
        un_number: initialCargo.dangerous_good_details.un_number,
        proper_shipping_name:
          initialCargo.dangerous_good_details.proper_shipping_name,
        class_division: initialCargo.dangerous_good_details.class_division,
        subdivision: initialCargo.dangerous_good_details.subdivision,
        packaging_group: initialCargo.dangerous_good_details.packaging_group,
        packaging_instructions:
          initialCargo.dangerous_good_details.packaging_instructions,
        DangeriousQuantity:
          initialCargo.dangerous_good_details.DangeriousQuantity,
        total_net_quantity:
          initialCargo.dangerous_good_details.total_net_quantity,
        type_of_packing: initialCargo.dangerous_good_details.type_of_packing,
        authorization: initialCargo.dangerous_good_details.authorization,
      },
    };
    setCargo([...cargo, newCargo]);
  };
  console.log("cargo", cargo);

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

  const transformToApiData = () => {
    const mapServiceTypeToLevel = (serviceType: string | null): number | null => {
      switch (serviceType) {
        case "air-value":
          return 1;
        case "air-premium":
          return 2;
        case "air-now":
          return 3;
        default:
          return null;
      }
    };
    return {
      type: method,
      transport_mode: mode,
      from_location: from_location,
      to_location: to_location,
      departure_date: departureDate
        ? moment(departureDate).format("YYYY-MM-DD")
        : null,
      incoterm: incoterm,
      pickup_service: showPickupAddress,
      delivery_service: showDeliveryAddress,
      pickup_address: showPickupAddress ? pickup : null,
      delivery_address: showDeliveryAddress ? delivery : null,
      cargo: cargo.map((container) => ({
        description: container.comiditydiscription || null,
        container_type: "40ST",
        item_type: null,
        quantity: container.quantity || null,
        weight: container.weight || null,
        length: container.lcm || null,
        width: container.weight || null,
        height: container.hcm || null,
        hs_code: container.code_character || null,
        oversize: null,
        non_stackable: null,
        dangerous_goods: container.dangerous_good,
        dangerous_good_details: container.dangerous_good
          ? {
              un_number: container.dangerous_good_details?.un_number || null,
              proper_shipping_name:
                container.dangerous_good_details?.proper_shipping_name || null,
              class_division:
                container.dangerous_good_details?.class_division || null,
              subdivision:
                container.dangerous_good_details?.subdivision || null,
              packaging_group:
                container.dangerous_good_details.packaging_group || null,
              packaging_instructions:
                container.dangerous_good_details?.packaging_instructions ||
                null,
              quantity:
                container.dangerous_good_details.DangeriousQuantity || null,
              total_net_quantity:
                container.dangerous_good_details?.total_net_quantity || null,
              type_of_packing:
                container.dangerous_good_details?.type_of_packing || null,
              authorization:
                container.dangerous_good_details?.authorization || null,
            }
          : {},
        reefer: container.tempearture,
        reefer_details: container.temperature_details
          ? {
              temperature: null,
              ventilation: null,
              humidity: null,
              temperature_max: container.temperature_details.max,
              temperature_min: container.temperature_details.min,
            }
          : {},
      })),
      service_level: serviceType === "air-value" ? 1 : serviceType === "air-premium" ? 2 : serviceType === "air-now" ? 3 : null,
      insurance_needed: insureAgree || null,
      insurance_value: amount || null,
      insurance_currency: currency || null,
      notes: comment || null,
      customer_reference: customer_reference || null,
    };
  };
  console.log("incoterm", incoterm);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log("submit called ");
      const apiData = transformToApiData();
      console.log("apiData", apiData);
      const response = await axiosInstance.post("quote/shipments/", apiData);
      console.log("response", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  console.log(departureDate);
  return (
    <>
      <NavBar />
      <div className="container-fluid pabel">
        <Form model={serviceModel} fluid onSubmit={handleSubmit}>
          <FlexboxGrid className="req-banner" justify="center" align="bottom">
            <FlexboxGrid.Item
              colspan={22}
              className="testttt"
            ></FlexboxGrid.Item>
          </FlexboxGrid>
          <div className="conatiner ">
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
                    className="from"
                  >
                    {/* Form Input */}
                    <Form.Group controlId="from">
                      {/* <Form.ControlLabel className="departure-date">From</Form.ControlLabel>
                  <FormControl
                     name="from_location"
                    placeholder="Search by Location"
                    value={from_location}
                    onChange={(e: any) => {
                      setFromLocation(e);
                    
                    }}
                    style={{textTransform:"initial"}}
                   
                  /> */}
                      <Form.ControlLabel className="fromLabel">
                        FROM
                      </Form.ControlLabel>
                      <SelectPicker
                        data={transformedLocations}
                        searchable
                        name="from"
                        className="w-100"
                        placeholder="Search by Location"
                        value={from_location}
                        onChange={(e: any) => {
                          setFromLocation(e);
                        }}
                      />
                    </Form.Group>
                    <div className="second-checkbox">
                      <Checkbox
                        onChange={handleCheckboxChange2}
                        className="pickup-services"
                      >
                        Pickup Service
                      </Checkbox>

                      {showPickupAddress && (
                        <div className="input-field">
                          <FormControl
                            type="text"
                            className="form-control"
                            placeholder="Enter Pickup Address"
                            value={pickup}
                            onChange={(e: any) => {
                              setPickup(e);
                            }}
                          />
                          {/* {formErrors?.pickupAddress && (
                        <small className="text-danger">
                          {formErrors?.pickupAddress}
                        </small>
                      )} */}
                        </div>
                      )}
                    </div>
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item as={Col} xs={24} sm={12} md={12} lg={8}>
                    <Form.Group controlId="to">
                      <Form.ControlLabel className="to">TO</Form.ControlLabel>
                      <SelectPicker
                        data={transformedLocations}
                        searchable
                        name="to"
                        className="w-100"
                        placeholder="Search by Location"
                        value={to_location}
                        onChange={(e: any) => {
                          setToLocation(e);
                        }}
                      />
                    </Form.Group>
                    <div className="first-checkbox">
                      <Checkbox
                        className="delivery-services"
                        checked={showDeliveryAddress}
                        onChange={(value, checked) =>
                          handleCheckboxChange(value, checked)
                        }
                      >
                        Delivery Service
                      </Checkbox>

                      {showDeliveryAddress && (
                        <div className="" style={{ marginLeft: "10px" }}>
                          <FormControl
                            type="text"
                            // className="form-control"
                            placeholder="Enter Delivery Address"
                            value={delivery}
                            onChange={(e: any) => {
                              setDelivery(e);
                            }}

                            // value={formData.deliveryAddress}
                            // onChange={(e) =>
                            //   handleCargoChange("deliveryAddress", e.target.value)
                            // }
                          />
                          {/* {formErrors?.deliveryAddress && (
                        <small className="text-danger">
                          {formErrors?.deliveryAddress}
                        </small>
                      )} */}
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
                        // {...register("departureDate")}
                        // error={errors.departureDate?.message}
                        name="departureDate"
                        className="w-100"
                        disabledDate={disablePastDates}
                        value={departureDate}
                        onChange={(value) => setDepartureDate(value)}
                      />
                      {/* {formErrors?.departureDate && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.departureDate}
                    </Form.HelpText>
                  )} */}
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
                        // {...register("incoterm")}
                        name="incoterm"
                        // error={errors.incoterm?.message}
                        className="w-100"
                        placeholder="Search by incoterm"
                        value={incoterm}
                        onChange={(value: string) => setincoterm(value)}
                      />
                      {/* {formErrors?.incoterm && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.incoterm}
                    </Form.HelpText>
                  )} */}
                    </Form.Group>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </FlexboxGrid.Item>

              {/* <div className="col-md-3 mt-2">
                <Form.Group controlId="to">
                  <Checkbox>Label</Checkbox>
                </Form.Group>
              </div> */}
            </FlexboxGrid>
            <div className="container">
              <div
                value={serviceType}
                onChange={(value) => setServiceType(value)}
                className="row flex-row "
              >
                <span className="mt-3 mb-3 ">Choose a service level</span>
                {servicesLevel.map((s, i) => (
                  <div
                    className="col-md-4"
                    key={i}
                    onClick={(e: any) => {
                      setServiceType(e.value);
                    }}
                  >
                    {/* <RadioTile
                    className="serviceCard w-100 "
                    value={s.value}
                    checked={s.value == serviceType}
                  > */}
                    <div
                      value={s.value}
                      style={{
                        cursor: "pointer",
                        border:
                          s.value === serviceType
                            ? "1px solid #0062ff"
                            : "none",
                        borderRadius:
                          s.value === serviceType ? "0.375rem" : "0px",
                      }}
                    >
                      <div className="card p-3">
                        <div className="card-body d-flex flex-column gap-3 justify-content-center align-items-center">
                          <img src={s.icon} alt={s.title} />
                          <h5 className="card-title">{s.title}</h5>
                          <p className="card-text text-center">{s.desc}</p>
                        </div>
                      </div>
                    </div>
                    {/* </RadioTile> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row mt-4">
              <div className="col-md-8">
                <div className="top-section">
                  <div className="leftTop">
                    <span>Cargo</span>
                  </div>
                  <div className="rightTop">
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
                  </div>
                </div>

                <div>
                  {cargo.map((c) => (
                    <CargoForm
                      key={c.id}
                      cargoState={c}
                      handleCargoChange={handleCargoChange}
                    />
                  ))}
                  <Button
                    onClick={handleAddCargo}
                    appearance="primary"
                    style={{ margin: "20px 0px" }}
                  >
                    Add Cargo
                  </Button>
                </div>

                <div className="row mt-3 tt">
                  <div className="col-md-8">
                    <div className="reference">
                      <div className="refer-title">
                        <span>References</span>
                      </div>
                      <div className="referBottom-section mt-2">
                        <div className="reference-section">
                          <FormControl
                            label="CUSTOMER REF.*"
                            name="customer_reference"
                            placeholder="Type something....."
                            value={customer_reference}
                            onChange={(e: any) => {
                              setcustomer_reference(e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3 tt">
                  <div className="col-md-12">
                    <div className="reference">
                      <div className="refer-title">
                        <span>Insurance</span>
                      </div>
                      <div className="referBottom-section mt-2">
                        <div className="reference-section">
                          <span>Do you want to insure your goods?</span>
                          <div className="row">
                            <div className="col-md-4">
                              <Checkbox
                                checked={insureType === "doNotInsure"}
                                onClick={() => setInsureType("doNotInsure")}
                              >
                                Do not insure goods
                              </Checkbox>
                            </div>
                            <div className="col-md-4">
                              <Checkbox
                                checked={insureType === "insureWithValue"}
                                onClick={() => setInsureType("insureWithValue")}
                              >
                                Insure goods for a value of
                              </Checkbox>
                            </div>
                            <div className="col-md-4">
                              <div className="input-group mb-3">
                                <button
                                  className="btn btn-outline-secondary dropdown-toggle"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  {/* Amount  */}
                                  {/* {currencyChoices} */}
                                  {(amount == ""
                                    ? "Amount"
                                    : amount + " " + currency
                                  ).toString()}

                                  {/* setamount */}
                                </button>
                                <ul className="dropdown-menu">
                                  {currencyChoices.map((currency) => {
                                    return (
                                      <li
                                        className="p-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          setcurrency(currency.value)
                                        }
                                      >
                                        {currency.value}
                                      </li>
                                    );
                                  })}
                                </ul>
                                <input
                                  type="number"
                                  className="form-control"
                                  aria-label="Text input with dropdown button"
                                  value={amount}
                                  onChange={(e: any) => {
                                    setamount(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            {insureType === "insureWithValue" && (
                              <div className="col-md-12">
                                <Checkbox
                                  value={insureAgree ? "yes" : "no"}
                                  checked={insureAgree}
                                  onChange={(e) =>
                                    setInsureAgree(e == "yes" ? true : false)
                                  }
                                >
                                  <p>
                                    I have read and accepted the{" "}
                                    <span style={{ color: "#0062ff" }}>
                                      insurance Terms & Conditions
                                    </span>
                                  </p>
                                </Checkbox>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottomlast mt-3">
                  <span className="title-note">Notes</span>
                  <div className="mainParent mt-2">
                    <div className="row">
                      <div className="col-md-8 comment ">
                        <div className="comment-div">
                          <FormControl
                            type="textarea"
                            label="Comments (max. 500 characters)"
                            placeholder=""
                            name="comment"
                            value={comment}
                            onChange={(e: any) => {
                              setcomment(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 comment">
                        <div className="comment-div">
                          {fileList && fileList.length === 0 && (
                            <>
                              <span className="">No attached files</span>
                            </>
                          )}
                          <span className="">Files</span> <br />
                          <Uploader
                            action=""
                            fileList={fileList}
                            onChange={(f: FileType[]) => setFileList(f)}
                            autoUpload={false}
                            className="mt-2"
                          >
                            <Button
                              style={{ background: "#1d3979", color: "white" }}
                            >
                              Select files...
                            </Button>
                          </Uploader>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4"></div>

          <div className="container">
            <Form.Group className="mt-3">
              <ButtonToolbar>
                <Button
                  // onClick={() => {
                  //   if (insureType == "insureWithValue") {
                  //     if (!insureAgree) {
                  //       toast.info(
                  //         "You need to accept the insurance Terms & Conditions."
                  //       );

                  //       const formData = {
                  //         Type: "ServiceLabel",
                  //         Insure_Type: insureType,
                  //         Insure_Agree: insureAgree ,
                  //         From_Location: from_location || "",
                  //         To_Location: to_location || "",
                  //         Select_Date: selectdate || "",
                  //         delivery: delivery || "",
                  //         pickup: pickup || "",
                  //         Incoterm: incoterm || "",
                  //         Commodity_Description: comiditydiscription || "",
                  //         Quantity: quantity || "",
                  //         Packages: packages || "",
                  //         Weight: weight || "",
                  //         volumetric_weight: v_weight || "",
                  //         total_weight: total_weight || "",
                  //         total_volume: total_volume || "",
                  //         Length_CM: lcm || "",
                  //         Width_CM: wcm || "",
                  //         Height_CM: hcm || "",
                  //         amount: amount || "",
                  //         currency: currency || "",
                  //         HS_Code: code_character || "",
                  //         Customer_Reference: customer_reference || "",
                  //         Comment: comment || "",
                  //         File_List: fileList.length > 0 ? fileList.map(file => file.name) : "",
                  //         Subdivision: subdivision || "",
                  //         Temperature_Min: temperature_min || "",
                  //         Temperature_Max: temperature_max || "",
                  //         Service_Type: serviceType || "",
                  //         Measurement_Unit: selected || "",
                  //         Temperature_Unit: celsiusstate || "",
                  //         Show_Delivery_Address: showDeliveryAddress || "",
                  //         Show_Pickup_Address: showPickupAddress || "",
                  //         Dangerous_Goods_Details: {
                  //             UN_Number: dangerous_good_details.un_number || "",
                  //             Proper_Shipping_Name: dangerous_good_details.proper_shipping_name || "",
                  //             Class_Division: dangerous_good_details.class_division || "",
                  //             Subdivision: dangerous_good_details.subdivision || "",
                  //             Packaging_Group: dangerous_good_details.packaging_group || "",
                  //             Packaging_Instructions: dangerous_good_details.packaging_instructions || "",
                  //             Quantity: dangerous_good_details.quantity || "",
                  //             Total_Net_Quantity: dangerous_good_details.total_net_quantity || "",
                  //             Type_Of_Packing: dangerous_good_details.type_of_packing || "",
                  //             Authorization: dangerous_good_details.authorization || ""
                  //         }

                  //       }

                  //       console.log("Form Data:", formData);

                  //       axios.post('http://localhost:3000/api/submit', formData)
                  //       .then(response => {
                  //         console.log('Server response:', response.data);
                  //       })
                  //       .catch(error => {
                  //         console.error('Error sending data:', error);
                  //       });

                  //     }
                  //   }

                  // }}
                  onClick={(e) => handleSubmit(e)}
                  // type="submit"
                  // type={
                  //   insureType == "insureWithValue"
                  //     ? insureAgree
                  //       ? "submit"
                  //       : "button"
                  //     : "submit"
                  // }

                  appearance="primary"
                  color="red"
                  style={{ width: "100px", marginBottom: "20px" }}
                >
                  Submit
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ServiceLevel;
