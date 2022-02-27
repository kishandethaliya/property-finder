import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as Actions from "../redux/actions";
import { BACKEND_SERVER_URL } from "../../constants";

const Properties = (props) => {
  const [propertiesData, setPropertiesData] = useState([]);

  const getProperies = async () => {
    await props
      .getListOfProperties()
      .then((response) => {
        if (response.data && response.status === 200) {
          setPropertiesData(response.data);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    getProperies();
  }, []);

  const columns = [
    {
      dataField: "id",
      hidden: true,
    },
    {
      dataField: "name",
      text: "Name",
      headerStyle: { width: "10%" },
      style: { width: "10%" },
    },
    {
      dataField: "description",
      text: "Description",
    },
    {
      dataField: "address",
      text: "Address",
    },
    {
      dataField: "price",
      text: "Price",
    },
    {
      dataField: "main_image",
      text: "Main Image",
      classes: "text-center",
      formatter: (cell, row) =>
        cell && (
          <img
            className="prop-img"
            src={`${BACKEND_SERVER_URL}/upload/${cell}`}
            alt={cell}
          />
        ),
    },
    {
      dataField: "latitude",
      text: "Latitude",
    },
    {
      dataField: "longitude",
      text: "Longitude",
    },
    {
      dataField: "sale_rent",
      text: "Sale/Rent",
    },
  ];

  const options = { sizePerPage: 5 };

  return (
    <Row>
      <Col md="12">
        <div>
          <BootstrapTable
            keyField="id"
            responsive
            bordered
            striped
            data={propertiesData}
            columns={columns}
            pagination={paginationFactory(options)}
          />
        </div>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = {
  getListOfProperties: Actions.getListOfProperties,
};

export default connect(null, mapDispatchToProps)(Properties);
