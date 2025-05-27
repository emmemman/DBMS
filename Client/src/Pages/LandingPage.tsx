import { NavigationBar } from "../Components/NavigationBar";
import { GraphForCountries } from "../Components/GraphForCoutries";
import { GraphForYears } from "../Components/GraphForYears";
import { Col, Divider, Row } from "antd";
const LandingPage = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <NavigationBar />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <GraphForCountries />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <GraphForYears />
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
