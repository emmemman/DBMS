import { NavigationBar } from "../Components/NavigationBar";
import { Row, Col } from "antd";
import { ScorerStatsTableAndGraph } from "../Components/ScorerStatsTableAndGraph";

const ScorerStatsPage = () => {
  return (
    <>
      <>
        <Row>
          <Col span={24}>
            <NavigationBar />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ScorerStatsTableAndGraph />
          </Col>{" "}
        </Row>
      </>
    </>
  );
};

export default ScorerStatsPage;
