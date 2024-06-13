
import "./lcl.scss";
import NavBar from './NavBar'
import { FlexboxGrid, Accordion, Checkbox, Form, Col,SelectPicker,  Text, DatePicker, ButtonToolbar, ButtonGroup, Button, Message, InputGroup, Input } from 'rsuite'

import { useState } from "react";



const Lcl = () => {
  
   
  return (
    <>
    <NavBar/>
    <div className="parent-lcl">
    <FlexboxGrid className="req-banner" justify="center" align="bottom">
        <FlexboxGrid.Item colspan={20}>
          <Text className="text-white banner-heading fcl-shipment">
            LCL Shipment
          </Text>
        </FlexboxGrid.Item>
      </FlexboxGrid>
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
                  <Form.ControlLabel className="fromLabel">FROM</Form.ControlLabel>
                  <SelectPicker
                    // data={fromList}
                    // loading={isLoading}
                    searchable
                    // {...register("from")}
                    name="from"
                    className="w-100"
                    placeholder="Search by Location"
                    // value={formData.from}
                    // onChange={(value: string) =>
                    //   handleCargoChange("from", value)
                    // }
                  />

                  {/* {formErrors?.from && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.from}
                    </Form.HelpText>
                  )} */}
                </Form.Group>
                <div className="second-checkbox">
               
                </div>
              </FlexboxGrid.Item>

              <FlexboxGrid.Item as={Col} xs={24} sm={12} md={12} lg={8}>
                <Form.Group controlId="to">
                  <Form.ControlLabel className="to">TO</Form.ControlLabel>
                  <SelectPicker
                    // data={fromList}
                    // loading={isLoading}
                    searchable
                    // {...register("to")}
                    name="to"
                    className="w-100"
                    placeholder="Search by Location"
                  />
                  {/* {formErrors?.to && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.to}
                    </Form.HelpText>
                  )} */}
                </Form.Group>
                <div className="first-checkbox">
               
                
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
                    // value={formData.departureDate}
                    // onChange={(value: string) =>
                    //   handleCargoChange("departureDate", value)
                    // }
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
                      "EXW",
                      "FCA",
                      "FOB",
                      "CPT",
                      "CFR",
                      "CIF",
                      "CIP",
                      "DAP",
                      "DDP",
                    ].map((item) => ({ label: item, value: item }))}
                    searchable
                    // {...register("incoterm")}
                    name="incoterm"
                    // error={errors.incoterm?.message}
                    className="w-100"
                    placeholder="Search by incoterm"
                    // value={formData.incoterm}
                    // onChange={(value: string) =>
                    //   handleCargoChange("incoterm", value)
                    // }
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
        </FlexboxGrid>
     

        </div>
    </>
  )
}

export default Lcl;