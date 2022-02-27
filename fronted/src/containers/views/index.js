import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import mapboxgl from "mapbox-gl";
import size from "lodash/size";
import trim from "lodash/trim";
import styled from "styled-components";
import * as Actions from "../redux/actions";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAP_API_KEY, BACKEND_SERVER_URL } from "../../constants";

mapboxgl.accessToken = MAP_API_KEY;

const WhiteCardSection = styled.div`
  background: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
  padding: 15px;
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const PropertyCard = styled.div`
  background: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;
const PropertyHeader = styled.div`
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`;
const PropertyContent = styled.div`
  background: #fff;
  padding: 5px 10px;
  h1 {
    font-size: 22px;
  }
  h5 {
    font-size: 16px;
    font-weight: 500;
    color: #6e6e6e;
  }
  p {
    font-size: 13px;
    font-weight: 400;
    color: #6e6e6e;
  }
`;

let currentMarkers = [];

const PropertyView = (props) => {
  const [propertyList, setPropertyList] = useState([]);
  const [searchStrVal, setSearchStrVal] = useState();

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [84, 37],
      zoom: 5,
    });
  }, []);

  const renderMapMarkers = (data) => {
    if (data) {
      data.map((item) => {
        const markerIcon = new mapboxgl.Marker({ color: "red" })
          .setLngLat([item.longitude, item.latitude])
          .addTo(map.current);
        currentMarkers.push(markerIcon);
        map.current.flyTo({
          center: [item.longitude, item.latitude],
          zoom: 5,
          essential: true,
          bearing: 0,
          curve: 1,
        });
      });
      let bounds = new mapboxgl.LngLatBounds();
      data.map((item) => {
        bounds.extend([item.longitude, item.latitude]);
      });
      map.current.fitBounds(bounds);
    }
  };

  useEffect(() => {
    if (size(propertyList) > 0) {
      renderMapMarkers(propertyList);
    }
  }, [propertyList]);

  const handleChange = ({ target }) => {
    setSearchStrVal(target.value);
    if (target.value !== searchStrVal && currentMarkers !== null) {
      for (var i = currentMarkers.length - 1; i >= 0; i--) {
        currentMarkers[i].remove();
      }
    }
  };

  const handleGetListBySeachStr = async () => {
    if (trim(searchStrVal)) {
      await props
        .getListOfPropertiesFromSearchStr({ searchStr: searchStrVal })
        .then((response) => {
          if (response.data && response.status === 200) {
            setPropertyList(response.data);
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    } else {
      setPropertyList([]);
    }
  };

  const currencyFormat = (num) => {
    return (
      "$" +
      parseFloat(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };

  return (
    <React.Fragment>
      <Container className="mt-5">
        <Row className="text-start">
          <Col md="4">
            <FormLabel>Search by Pincode/Country</FormLabel>
            <FormControl
              name="pincode"
              placeholder="Enter pincode/country to search"
              onChange={handleChange}
            />
          </Col>
          <Col md="3" className="align-self-end">
            <Button onClick={() => handleGetListBySeachStr()}>Search</Button>
          </Col>
          <Col md="5" className="text-end">
            <Link to="/admin/add">Go to Admin Panel</Link>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md="6">
            <div ref={mapContainer} className="map-container" />
          </Col>
          <Col md="6">
            <WhiteCardSection>
              {size(propertyList) > 0 ? (
                <Row>
                  {propertyList.map((item, index) => (
                    <Col md="6" key={index}>
                      <PropertyCard>
                        <PropertyHeader>
                          <img
                            src={`${BACKEND_SERVER_URL}/upload/${item.main_image}`}
                            alt="property"
                          />
                        </PropertyHeader>
                        <PropertyContent>
                          <h1>
                            {item.price ? currencyFormat(item.price) : "$0"}
                          </h1>
                          <h5>{item.description}</h5>
                          <p className="mb-0">{item.address}</p>
                          <small className="text-uppercase">{item.name}</small>
                        </PropertyContent>
                      </PropertyCard>
                    </Col>
                  ))}
                </Row>
              ) : (
                <h5 className="text-center">No Properties Found.</h5>
              )}
            </WhiteCardSection>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  getListOfPropertiesFromSearchStr: Actions.getListOfPropertiesFromSearchStr,
};
export default connect(null, mapDispatchToProps)(PropertyView);
