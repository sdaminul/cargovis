import { useState, useEffect } from "react";
import { Button, ProgressBar, Form, Row, Col, Card, Modal, Table } from "react-bootstrap";

function Shipments({ initialFilter = "ALL" }) {
  const [show, setShow] = useState(false);
  const mapModalClose = () => setShow(false);
  const mapModalShow = () => setShow(true);

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedShipment, setExpandedShipment] = useState(null);

  // Update activeFilter when initialFilter prop changes
  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  // Sample shipment data with multiple statuses per location and container numbers
  const shipmentsData = [
    {
      id: 1,
      reference: "MSCU1234567",
      carrier: "MSC",
      shipName: "MSC OSCAR",
      route: "Shanghai, CN - Los Angeles, US",
      status: "DELIVERED",
      eta: "1/15/2026",
      lastUpdated: "29/04/2026,5:04:07 pm",
      containers: 3,
      details: {
        vessel: "MSC",
        atd: "12/20/2025",
        isActual: "YES",
        containerDetails: [
          {
            containerNumber: "MSCU1234567",
            emptyShipper: "12/18/2025",
            gateIn: "12/22/2025",
            loaded: "12/24/2025",
            arrived: "1/15/2026",
            departed: "12/26/2025",
            discharge: "1/16/2026",
            gateOut: "1/17/2026",
            emptyReturned: "1/18/2026"
          },
          {
            containerNumber: "MSCU1234568",
            emptyShipper: "12/19/2025",
            gateIn: "12/23/2025",
            loaded: "12/25/2025",
            arrived: "1/16/2026",
            departed: "12/27/2025",
            discharge: "1/17/2026",
            gateOut: "1/18/2026",
            emptyReturned: "1/19/2026"
          },
          {
            containerNumber: "MSCU1234569",
            emptyShipper: "12/20/2025",
            gateIn: "12/24/2025",
            loaded: "12/26/2025",
            arrived: "1/17/2026",
            departed: "12/28/2025",
            discharge: "1/18/2026",
            gateOut: "1/19/2026",
            emptyReturned: "1/20/2026"
          }
        ],
        tracking: [
          { 
            location: "Shanghai, CN", 
            statuses: [
              { status: "EMPTY TO SHIPPER", container: "MSCU1234567", date: "Dec 18, 2025" },
              { status: "GATE IN", container: "MSCU1234567", date: "Dec 22, 2025" },
              { status: "GATE IN", container: "MSCU1234568", date: "Dec 22, 2025" },
              { status: "GATE IN", container: "MSCU1234569", date: "Dec 22, 2025" }
            ]
          },
          { 
            location: "Yangshan Terminal, Shanghai", 
            statuses: [
              { status: "LOADED ON VESSEL", container: "MSCU1234567", date: "Dec 24, 2025" },
              { status: "LOADED ON VESSEL", container: "MSCU1234568", date: "Dec 24, 2025" },
              { status: "LOADED ON VESSEL", container: "MSCU1234569", date: "Dec 24, 2025" }
            ]
          },
          { 
            location: "Shanghai, CN", 
            statuses: [
              { status: "VESSEL DEPARTED", container: "—", date: "Dec 26, 2025" }
            ]
          },
          { 
            location: "Pacific Ocean", 
            statuses: [
              { status: "IN TRANSIT", container: "—", date: "Dec 27, 2025" }
            ]
          },
          { 
            location: "Los Angeles, US", 
            statuses: [
              { status: "VESSEL ARRIVED", container: "—", date: "Jan 15, 2026" },
              { status: "DISCHARGED", container: "MSCU1234567", date: "Jan 16, 2026" },
              { status: "DISCHARGED", container: "MSCU1234568", date: "Jan 16, 2026" },
              { status: "DISCHARGED", container: "MSCU1234569", date: "Jan 16, 2026" },
              { status: "GATE OUT", container: "MSCU1234567", date: "Jan 17, 2026" },
              { status: "GATE OUT", container: "MSCU1234568", date: "Jan 17, 2026" },
              { status: "GATE OUT", container: "MSCU1234569", date: "Jan 17, 2026" }
            ]
          }
        ]
      }
    },
    {
      id: 2,
      reference: "HLBU9876543",
      carrier: "Hapag-Lloyd",
      shipName: "BERLIN EXPRESS",
      route: "Shenzhen, CN - Long Beach, US",
      status: "DELIVERED",
      eta: "1/8/2026",
      lastUpdated: "04/03/2026,5:16:43 am",
      containers: 2,
      details: {
        vessel: "BERLIN EXPRESS",
        atd: "12/10/2025",
        isActual: "YES",
        containerDetails: [
          {
            containerNumber: "HLBU9876543",
            emptyShipper: "12/08/2025",
            gateIn: "12/12/2025",
            loaded: "12/12/2025",
            arrived: "1/8/2026",
            departed: "12/14/2025",
            discharge: "1/9/2026",
            gateOut: "1/10/2026",
            emptyReturned: "1/11/2026"
          },
          {
            containerNumber: "HLBU9876544",
            emptyShipper: "12/09/2025",
            gateIn: "12/13/2025",
            loaded: "12/13/2025",
            arrived: "1/9/2026",
            departed: "12/15/2025",
            discharge: "1/10/2026",
            gateOut: "1/11/2026",
            emptyReturned: "1/12/2026"
          }
        ],
        tracking: [
          { 
            location: "Shenzhen, CN", 
            statuses: [
              { status: "EMPTY TO SHIPPER", container: "HLBU9876543", date: "Dec 08, 2025" },
              { status: "EMPTY TO SHIPPER", container: "HLBU9876544", date: "Dec 09, 2025" },
              { status: "GATE IN", container: "HLBU9876543", date: "Dec 12, 2025" },
              { status: "GATE IN", container: "HLBU9876544", date: "Dec 13, 2025" }
            ]
          },
          { 
            location: "Shenzhen Terminal", 
            statuses: [
              { status: "LOADED ON VESSEL", container: "HLBU9876543", date: "Dec 12, 2025" },
              { status: "LOADED ON VESSEL", container: "HLBU9876544", date: "Dec 13, 2025" }
            ]
          },
          { 
            location: "Shenzhen, CN", 
            statuses: [
              { status: "VESSEL DEPARTED", container: "—", date: "Dec 14, 2025" }
            ]
          },
          { 
            location: "Pacific Ocean", 
            statuses: [
              { status: "IN TRANSIT", container: "—", date: "Dec 16, 2025" }
            ]
          },
          { 
            location: "Long Beach, US", 
            statuses: [
              { status: "VESSEL ARRIVED", container: "—", date: "Jan 8, 2026" },
              { status: "DISCHARGED", container: "HLBU9876543", date: "Jan 9, 2026" },
              { status: "DISCHARGED", container: "HLBU9876544", date: "Jan 10, 2026" },
              { status: "GATE OUT", container: "HLBU9876543", date: "Jan 10, 2026" },
              { status: "GATE OUT", container: "HLBU9876544", date: "Jan 11, 2026" }
            ]
          }
        ]
      }
    },
    {
      id: 3,
      reference: "CMA CGMANT0NE",
      carrier: "CMA",
      shipName: "CMA CGM ANT0NE",
      route: "Busan, KR - Seattle, US",
      status: "DELIVERED",
      eta: "1/5/2026",
      lastUpdated: "04/03/2026,5:16:17 am",
      containers: 3,
      details: {
        vessel: "CMA CGM ANT0NE",
        atd: "12/15/2025",
        isActual: "YES",
        containerDetails: [
          {
            containerNumber: "CMA1234567",
            emptyShipper: "12/12/2025",
            gateIn: "12/16/2025",
            loaded: "12/18/2025",
            arrived: "1/5/2026",
            departed: "12/20/2025",
            discharge: "1/6/2026",
            gateOut: "1/7/2026",
            emptyReturned: "1/8/2026"
          },
          {
            containerNumber: "CMA1234568",
            emptyShipper: "12/13/2025",
            gateIn: "12/17/2025",
            loaded: "12/18/2025",
            arrived: "1/5/2026",
            departed: "12/20/2025",
            discharge: "1/6/2026",
            gateOut: "1/7/2026",
            emptyReturned: "1/8/2026"
          },
          {
            containerNumber: "CMA1234569",
            emptyShipper: "12/14/2025",
            gateIn: "12/18/2025",
            loaded: "12/19/2025",
            arrived: "1/6/2026",
            departed: "12/21/2025",
            discharge: "1/7/2026",
            gateOut: "1/8/2026",
            emptyReturned: "1/9/2026"
          }
        ],
        tracking: [
          { 
            location: "Busan, KR", 
            statuses: [
              { status: "EMPTY TO SHIPPER", container: "CMA1234567", date: "Dec 12, 2025" },
              { status: "EMPTY TO SHIPPER", container: "CMA1234568", date: "Dec 13, 2025" },
              { status: "EMPTY TO SHIPPER", container: "CMA1234569", date: "Dec 14, 2025" },
              { status: "GATE IN", container: "CMA1234567", date: "Dec 16, 2025" },
              { status: "GATE IN", container: "CMA1234568", date: "Dec 17, 2025" },
              { status: "GATE IN", container: "CMA1234569", date: "Dec 18, 2025" }
            ]
          },
          { 
            location: "Busan Port", 
            statuses: [
              { status: "LOADED ON VESSEL", container: "CMA1234567", date: "Dec 18, 2025" },
              { status: "LOADED ON VESSEL", container: "CMA1234568", date: "Dec 18, 2025" },
              { status: "LOADED ON VESSEL", container: "CMA1234569", date: "Dec 19, 2025" }
            ]
          },
          { 
            location: "Busan, KR", 
            statuses: [
              { status: "VESSEL DEPARTED", container: "—", date: "Dec 20, 2025" }
            ]
          },
          { 
            location: "Pacific Ocean", 
            statuses: [
              { status: "IN TRANSIT", container: "—", date: "Dec 22, 2025" }
            ]
          },
          { 
            location: "Seattle, US", 
            statuses: [
              { status: "VESSEL ARRIVED", container: "—", date: "Jan 5, 2026" },
              { status: "DISCHARGED", container: "CMA1234567", date: "Jan 6, 2026" },
              { status: "DISCHARGED", container: "CMA1234568", date: "Jan 6, 2026" },
              { status: "DISCHARGED", container: "CMA1234569", date: "Jan 7, 2026" },
              { status: "GATE OUT", container: "CMA1234567", date: "Jan 7, 2026" },
              { status: "GATE OUT", container: "CMA1234568", date: "Jan 7, 2026" },
              { status: "GATE OUT", container: "CMA1234569", date: "Jan 8, 2026" }
            ]
          }
        ]
      }
    },
    {
      id: 4,
      reference: "EGLV1122334",
      carrier: "Evergreen",
      shipName: "EVER GIVEN",
      route: "Singapore, SG - Oakland, US",
      status: "DELIVERED",
      eta: "12/28/2025",
      lastUpdated: "08/01/2026,11:34:07 am",
      containers: 1,
      details: {
        vessel: "EVER GIVEN",
        atd: "12/05/2025",
        isActual: "YES",
        containerDetails: [
          {
            containerNumber: "EGLV1122334",
            emptyShipper: "12/02/2025",
            gateIn: "12/06/2025",
            loaded: "12/08/2025",
            arrived: "12/28/2025",
            departed: "12/10/2025",
            discharge: "12/29/2025",
            gateOut: "12/30/2025",
            emptyReturned: "12/31/2025"
          }
        ],
        tracking: [
          { 
            location: "Singapore, SG", 
            statuses: [
              { status: "EMPTY TO SHIPPER", container: "EGLV1122334", date: "Dec 02, 2025" },
              { status: "GATE IN", container: "EGLV1122334", date: "Dec 06, 2025" }
            ]
          },
          { 
            location: "Singapore Port", 
            statuses: [
              { status: "LOADED ON VESSEL", container: "EGLV1122334", date: "Dec 08, 2025" }
            ]
          },
          { 
            location: "Singapore, SG", 
            statuses: [
              { status: "VESSEL DEPARTED", container: "—", date: "Dec 10, 2025" }
            ]
          },
          { 
            location: "Indian Ocean", 
            statuses: [
              { status: "IN TRANSIT", container: "—", date: "Dec 12, 2025" }
            ]
          },
          { 
            location: "Oakland, US", 
            statuses: [
              { status: "VESSEL ARRIVED", container: "—", date: "Dec 28, 2025" },
              { status: "DISCHARGED", container: "EGLV1122334", date: "Dec 29, 2025" },
              { status: "GATE OUT", container: "EGLV1122334", date: "Dec 30, 2025" },
              { status: "EMPTY RETURNED", container: "EGLV1122334", date: "Dec 31, 2025" }
            ]
          }
        ]
      }
    }
  ];

  // Filter shipments based on active filter and search
  const filteredShipments = shipmentsData.filter(shipment => {
    // Filter by type
    if (activeFilter === "OCEAN" && shipment.carrier !== "MSC" && shipment.carrier !== "Hapag-Lloyd" && shipment.carrier !== "CMA" && shipment.carrier !== "Evergreen") return false;
    if (activeFilter === "AIR") return false;
    if (activeFilter === "PENDING") return false;
    if (activeFilter === "DELIVERED") {
      // All are delivered in demo
    }

    // Search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        shipment.reference.toLowerCase().includes(search) ||
        shipment.route.toLowerCase().includes(search) ||
        shipment.carrier.toLowerCase().includes(search) ||
        shipment.status.toLowerCase().includes(search) ||
        shipment.shipName.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const toggleExpand = (id) => {
    setExpandedShipment(expandedShipment === id ? null : id);
  };

  const getStatusTextColor = (status) => {
    switch(status) {
      case "DELIVERED": return "border-success text-success";
      case "IN TRANSIT": return "border-warning text-warning";
      case "PENDING": return "border-danger text-danger";
      default: return "border-danger text-danger";
    }
  };

  const getStatusBorderColor = (status) => {
    switch(status) {
      case "DELIVERED": return "border-success";
      case "IN TRANSIT": return "border-warning";
      case "PENDING": return "border-danger";
      default: return "border-warning";
    }
  };

  return (
    <>
      <Card>
        <Card.Body className="pb-3">
          <div className="page-title d-block d-sm-flex mt-0">
            <h5 className="mb-0 fw-bold">Shipments</h5>
            <div className="shipment-filters mb-lg-0 mt-ms-0 mt-3">
              <div className="filter-tabs">
                <button 
                  className={`filter-tab ${activeFilter === "ALL" ? "active" : ""}`}
                  onClick={() => setActiveFilter("ALL")}
                >
                  All Shipments
                </button>
                <button 
                  className={`filter-tab ${activeFilter === "OCEAN" ? "active" : ""}`}
                  onClick={() => setActiveFilter("OCEAN")}
                >
                  Ocean Shipments
                </button>
                <button 
                  className={`filter-tab ${activeFilter === "AIR" ? "active" : ""}`}
                  onClick={() => setActiveFilter("AIR")}
                >
                  Air Shipments
                </button>
                <button 
                  className={`filter-tab ${activeFilter === "PENDING" ? "active" : ""}`}
                  onClick={() => setActiveFilter("PENDING")}
                >
                  Pending Actions
                </button>
                <button 
                  className={`filter-tab ${activeFilter === "DELIVERED" ? "active" : ""}`}
                  onClick={() => setActiveFilter("DELIVERED")}
                >
                  Delivered (30D)
                </button>
              </div>
            </div>
          </div>

          {/* Shipments List */}
          <div className="shipments-list">
            {/* Header */}
            <div className="shipments-header card">
              <span className="col-actions">ACTIONS</span>
              <span className="col-reference">REFERENCE</span>
              <span className="col-carrier">CARRIER</span>
              <span className="col-ship">SHIP NAME</span>
              <span className="col-route">ROUTE</span>
              <span className="col-route">VESSEL DEPARTED</span>
              <span className="col-route">ETA</span>
              <span className="col-eta">ARRIVED</span>
              <span className="col-eta">IS ACTUAL</span>
              <span className="col-status">STATUS</span>
            </div>

            {/* Shipment Rows */}
            {filteredShipments.map((shipment) => (
              <div key={shipment.id} className={`shipment-item-wrapper ${getStatusBorderColor(shipment.status)}`}>
                <div className={`shipment-item ${expandedShipment === shipment.id ? "expanded" : ""}`}>
                  <div className="shipment-row">
                    <div className="col-actions">
                      <Button 
                        variant="dark" 
                        size="sm" 
                        className="expand-btn"
                        onClick={() => toggleExpand(shipment.id)}
                      >
                        <i className={`ri-arrow-${expandedShipment === shipment.id ? 'up' : 'down'}-s-line`}></i>
                      </Button>
                      <Button 
                        variant="dark" 
                        size="sm" 
                        className="expand-btn" 
                        onClick={mapModalShow}
                      >
                        <i className="ri-map-2-line"></i>
                      </Button>
                      <Button 
                        variant="dark" 
                        size="sm" 
                        className="expand-btn"
                      >
                        <i className="ri-check-double-line"></i>
                      </Button>
                    </div>
                    <span className="col-reference"><i className="ri-ship-line text-muted-foreground me-1"></i> {shipment.reference}</span>
                    <span className="col-carrier">{shipment.carrier}</span>
                    <span className="col-ship">{shipment.shipName}</span>
                    <span className="col-route">{shipment.route}</span>
                    <span className="col-route">-</span>
                    <span className="col-eta">{shipment.eta}</span>
                    <span className="col-updated">{shipment.lastUpdated}</span>
                    <span className="col-route">-</span>
                    <span className={`col-status status ${getStatusTextColor(shipment.status)}`}>
                      {shipment.status}
                    </span>
                  </div>
                </div>

                {/* Expanded Details - Updated with Container Names in Tracking */}
                {expandedShipment === shipment.id && (
                  <div className="shipment-details pb-0">
                    <Card className="mb-3">
                      <Card.Body>
                        {/* Header with Reference and Container Info */}
                        <div className="details-header align-items-start">
                          <div>
                            <div className="d-flex">
                              <h4>{shipment.reference}</h4>
                              <div className="tracking-status-name my-0 ms-2">OCEAN</div>
                            </div>
                            <span className="container-info">{shipment.containers} container{shipment.containers > 1 ? 's' : ''} in this shipment</span>
                          </div>
                          <div className="tracking-status-name">DELIVERED</div>
                        </div>

                        {/* Location and ATD */}
                        <div className="location-atd">
                          <div className="location-info">
                            <i className="ri-map-pin-line"></i>
                            <span className="location-name">{shipment.details.tracking[0]?.location}</span>
                          </div>
                          <div className="location-info">
                            <span className="location-name">
                              {shipment.details.tracking[shipment.details.tracking.length - 1]?.location || "Destination"}
                            </span>
                            <i className="ri-map-pin-line"></i>
                          </div>
                        </div>
                        <ProgressBar animated now={70} className="track-progress" />
                        <div className="d-flex justify-content-between mt-2">
                          <div className="container-info">ATD: {shipment.details.atd}</div>
                          <div className="container-info">ETA: {shipment.eta}</div>
                        </div>
                      </Card.Body>
                    </Card>

                    <Row>
                      <Col lg={12}>
                        {/* Container Details Grid */}
                        <Card className="mb-3">
                          <Card.Body>
                            <Table striped responsive className="mb-0 ship-contanier">
                              <thead>
                                <tr>
                                  <th>CONTAINER #</th>
                                  <th>EMPTY TO SHIPPER</th>
                                  <th>GATE IN</th>
                                  <th>LOADED ON VESSEL</th>
                                  <th>ARRIVED AT T/S PORT</th>
                                  <th>DEPARTED FROM T/S PORT</th>
                                  <th>DISCHARGE</th>
                                  <th>GATE OUT</th>
                                  <th>EMPTY RETURNED</th>
                                </tr>
                              </thead>
                              <tbody>
                                {shipment.details.containerDetails && shipment.details.containerDetails.length > 0 ? (
                                  shipment.details.containerDetails.map((container, index) => (
                                    <tr key={index}>
                                      <td className="text-primary fw-bold">{container.containerNumber}</td>
                                      <td>{container.emptyShipper}</td>
                                      <td>{container.gateIn}</td>
                                      <td>{container.loaded}</td>
                                      <td>{container.arrived}</td>
                                      <td>{container.departed}</td>
                                      <td>{container.discharge}</td>
                                      <td>{container.gateOut}</td>
                                      <td>{container.emptyReturned}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td>{shipment.reference}</td>
                                    <td>{shipment.details.emptyShipper || '—'}</td>
                                    <td>{shipment.details.gateIn || '—'}</td>
                                    <td>{shipment.details.loaded || '—'}</td>
                                    <td>{shipment.details.arrived || '—'}</td>
                                    <td>{shipment.details.departed || '—'}</td>
                                    <td>{shipment.details.discharge || '—'}</td>
                                    <td>{shipment.details.gateOut || '—'}</td>
                                    <td>{shipment.details.emptyReturned || '—'}</td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col lg={12}>
                        {/* Vessel */}
                        <Card className="mb-3">
                          <Card.Body>
                            <div className="vessel-label">VESSEL</div>
                            <div className="vessel-name fw-bold">{shipment.details.vessel}</div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6}>
                        <Card>
                          <Card.Body className="pb-3 poueds">
                            {/* Tracking Timeline - Updated to show container names with status */}
                            <div className="tracking-timeline-detailed">
                              {shipment.details.tracking.map((track, index) => (
                                <div key={index} className="tracking-item">
                                  <div className="tracking-dot"><i className="ri-map-pin-line"></i></div>
                                  <div className="tracking-content-detailed">
                                    <div className="tracking-location-name">{track.location}</div>
                                    {/* Display multiple statuses with container names for this location */}
                                    {track.statuses.map((statusItem, statusIndex) => (
                                      <div key={statusIndex} className="d-flex justify-content-between align-items-center mt-1">
                                        <div className="d-flex align-items-center">
                                          <div className="tracking-status-name">{statusItem.status}</div>
                                          <div className="tracking-container-name text-muted-foreground ms-2">
                                            {statusItem.container !== "—" ? `Container: ${statusItem.container}` : ''}
                                          </div>
                                        </div>
                                        <div className="tracking-date-name">{statusItem.date}</div>
                                      </div>
                                    ))}
                                  </div>
                                  {index < shipment.details.tracking.length - 1 && (
                                    <div className="tracking-line-detailed"></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col lg={6}>
                        {/* Map Preview */}
                        <Card>
                          <Card.Body>
                            <div className="page-title mt-0">
                              <h5 className="mb-0 fw-bold">Live Map</h5>
                            </div>
                            <div className="border border-light border-opacity-10 rounded d-flex align-items-center justify-content-center text-muted-foreground" style={{ height: 400 }}>Add Live Map Here</div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            ))}

            {filteredShipments.length === 0 && (
              <div className="no-results">
                <i className="ri-inbox-line"></i>
                <p>No shipments found matching your criteria</p>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal 
        show={show} 
        onHide={mapModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Live Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border border-light border-opacity-10 rounded d-flex align-items-center justify-content-center text-muted-foreground" style={{ height: 400 }}>Add Live Map Here</div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Shipments;