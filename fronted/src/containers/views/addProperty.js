import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import debounce from "lodash/debounce";
import size from "lodash/size";
import map from "lodash/map";
import get from "lodash/get";
import styled from "styled-components";
import * as Actions from "../redux/actions";

const ListResult = styled.div``;
const initialState = {
  name: "",
  description: "",
  price: "",
  main_image: "",
  sale_rent: "",
};

const AddProperty = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [propertyData, setPropertyData] = useState(initialState);
  const [addressVal, setAddressVal] = useState("");
  const [countryVal, setCountryVal] = useState("");
  const [pincode, setPincode] = useState("");
  const [latLongData, setLatLongData] = useState({
    longitude: "",
    latitude: "",
  });
  const [previewImage, setPreviewImage] = useState();

  const getAddressFromSearchValue = async (searchVal) => {
    try {
      await props.getAddressFromAPI(searchVal).then((res) => {
        if (res && size(res.features) > 0) {
          setSearchResults(res.features);
        } else {
          setSearchResults([]);
        }
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const debouncedChangeHandler = useMemo(
    () => debounce((userInput) => getAddressFromSearchValue(userInput), 500),
    []
  );

  const handleSearchAdress = (value) => {
    if (value) {
      debouncedChangeHandler(value);
    } else {
      setSearchResults([]);
    }
  };

  const handleGetPincodeAndCountry = (data) => {
    if (size(data) > 0) {
      let pincodeValue = "";
      let countryValue = "";
      map(data, (item, key) => {
        if (item.id.indexOf("postcode") >= 0) {
          pincodeValue = item.text;
        }
        if (item.id.indexOf("country") >= 0) {
          countryValue = item.text;
        }
      });
      setPincode(pincodeValue);
      setCountryVal(countryValue);
    }
  };

  const handleSelectAddress = (item, address) => {
    if (item) {
      setAddressVal(address);
      setLatLongData({
        longitude: get(item, "center[0]"),
        latitude: get(item, "center[1]"),
      });
      handleGetPincodeAndCountry(item.context);
      setSearchResults([]);
    }
  };

  const handleChange = ({ target }) => {
    const name = target && target.name;
    const value = target && target.value;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleImageChange = ({ target }) => {
    const file = target && target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setPropertyData({ ...propertyData, main_image: file });
    }
  };

  const handleChangeSaleRent = (val) => {
    setPropertyData({ ...propertyData, sale_rent: val });
  };

  const handleClearState = (isTrue) => {
    setPropertyData({ ...initialState, main_image: "" });
    setAddressVal("");
    setCountryVal("");
    setPincode("");
    setLatLongData({ longitude: "", latitude: "" });
    setPreviewImage();
    if (isTrue) props.history.push("/admin/properties");
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (addressVal) {
      const reqBody = new FormData();
      const dataObj = {
        ...propertyData,
        address: addressVal,
        country: countryVal,
        pincode: pincode,
        longitude: latLongData.longitude,
        latitude: latLongData.latitude,
      };
      reqBody.append("fileName", propertyData.main_image); // append main_image in fileName
      map(dataObj, (item, index) => reqBody.append(index, item));

      props
        .addPropertyData(reqBody)
        .then((response) => {
          if (response.data && response.status === 200) {
            handleClearState(true);
          }
        })
        .catch((error) => {
          handleClearState(false);
          console.log({ error });
        });
    }
  };

  return (
    <Row>
      <Col md="7" className="m-auto">
        <h4 className="mb-3">Add Property</h4>
        <Form
          className="form-bg"
          onSubmit={handleSubmitForm}
          encType="multipart/form-data"
        >
          <Row>
            <Col md="6" className="m-auto">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={propertyData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md="6" className="m-auto">
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  name="description"
                  value={propertyData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md="12" className="m-auto">
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search address"
                  value={addressVal}
                  onChange={({ target }) => {
                    setAddressVal(target.value);
                    handleSearchAdress(target.value);
                  }}
                />
                {size(searchResults) > 0 &&
                  map(searchResults, (item, index) => (
                    <ListResult
                      key={index}
                      className="form-control"
                      onClick={() => handleSelectAddress(item, item.place_name)}
                    >
                      {item.place_name}
                    </ListResult>
                  ))}
              </Form.Group>
            </Col>
            <Col md="6" className="m-auto">
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter price"
                  name="price"
                  value={propertyData.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md="6" className="m-auto">
              {previewImage && (
                <img className="img-thumbnail preview-img" src={previewImage} />
              )}
              <Form.Group className="mb-3">
                <Form.Label>Main Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Choose File"
                  accept="image/*"
                  name="main_image"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Sale or Rent</Form.Label>
                <div>
                  <label className="me-3">
                    <input
                      type="radio"
                      name="property_radio"
                      onChange={() => handleChangeSaleRent("sale")}
                    />
                    <span className="ms-1">Sale</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="property_radio"
                      onChange={() => handleChangeSaleRent("rent")}
                    />
                    <span className="ms-1">Rent</span>
                  </label>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = {
  getAddressFromAPI: Actions.getAddressFromAPI,
  addPropertyData: Actions.addPropertyData,
};

export default connect(null, mapDispatchToProps)(AddProperty);
