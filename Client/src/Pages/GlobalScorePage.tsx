import { NavigationBar } from "../Components/NavigationBar";
import { Row, Col } from "antd";
import { GlobalScoringStatsTable } from "../Components/GlobalScoringStatsTable";

const GlobalScorePage = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <NavigationBar />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <GlobalScoringStatsTable />
        </Col>
      </Row>
    </>
  );
};

export default GlobalScorePage;
