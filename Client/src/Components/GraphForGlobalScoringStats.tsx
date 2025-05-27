import ReactECharts from "echarts-for-react";
import { Col, Row, Typography } from "antd";

enum SwitchCases {
  TOTAL_WINS,
  SCORE,
  AVERAGE_WINS_PER_YEAR,
  AVERAGE_SCORE_PER_YEAR,
}
interface IProps {
  dataSource: {
    key: number;
    countryName: string;
    totalWins: number;
    score: number;
    averageWinsPerYear: number;
    averageScorePerYear: number;
    region: string;
    status: string;
    developedStatus: string;
    population: number;
  }[];
  filterSelectedId: SwitchCases | null;
  loading: boolean;
}
export const GraphForGlobalScoringStats = (props: IProps) => {
  const { Title } = Typography;

  const generateXAxisFromYears = (
    dataSource: {
      key: number;
      countryName: string;
      totalWins: number;
      score: number;
      averageWinsPerYear: number;
      averageScorePerYear: number;
      region: string;
      status: string;
      developedStatus: string;
    }[]
  ) => {
    return dataSource?.map((entry) => entry?.countryName);
  };
  const YaxisNameFromFilter = () => {
    switch (props.filterSelectedId) {
      case 0:
        return "Total Wins";
      case 1:
        return "Score";
      case 2:
        return "Avg Wins / Year";
      case 3:
        return "Avg Score/Year";
    }
  };
  const generateDataForSelectedFilter = (filterSelected: SwitchCases) => {
    switch (filterSelected) {
      case SwitchCases.TOTAL_WINS:
        return props.dataSource?.map((entry) => entry?.totalWins);
      case SwitchCases.SCORE:
        return props.dataSource?.map((entry) => entry?.score);
      case SwitchCases.AVERAGE_SCORE_PER_YEAR:
        return props.dataSource?.map((entry) => entry?.averageScorePerYear);
      case SwitchCases.AVERAGE_WINS_PER_YEAR:
        return props.dataSource?.map((entry) => entry?.averageWinsPerYear);
    }
  };
  const generateDataForScatterGraph = () => {
    return props.dataSource?.map((entry) => {
      return [entry?.population, entry?.score];
    });
  };
  const optionForScatterChart = {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        const country = props.dataSource?.[params.dataIndex]?.countryName;
        const population = params.value[0].toLocaleString();
        const score = params.value[1].toLocaleString();
        return `
      <div style="font-size: 14px">
        <strong>${country}</strong><br/>
        <span><strong>Population:</strong> ${population}</span><br/>
        <span><strong>Score:</strong> ${score}</span>
      </div>
    `;
      },
    },

    legend: {
      show: false,
    },
    xAxis: [
      {
        type: "value",
        axisTick: { show: false },
        data: generateXAxisFromYears(props.dataSource),

        name: "Population",
        interval: 0,
        axisLabel: {
          fontSize: 11,
          overflow: "break",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Score",
        nameTextStyle: { align: "right" },
      },
    ],

    dataZoom: [
      {
        id: "dataZoomX",
        type: "slider",
        xAxisIndex: [0],
      },
      {
        id: "dataZoomY",
        type: "inside",
        xAxisIndex: [0],
      },
    ],
    series: [
      {
        type: "scatter",
        symbolSize: 15,
        data: generateDataForScatterGraph(),
        emphasis: {
          focus: "series",
        },
        label: {
          show: true,
          formatter: (params) => props.dataSource[params.dataIndex].countryName,
          position: "top",
          fontSize: 10,
        },
      },
    ],
  };
  const optionForBarChart = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },

    legend: {
      show: false,
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: generateXAxisFromYears(props.dataSource),

        name: "Countries",
        interval: 0,
        axisLabel: {
          fontSize: 11,
          overflow: "break",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: YaxisNameFromFilter(),
        nameTextStyle: { align: "right" },
      },
    ],

    dataZoom: [
      {
        id: "dataZoomX",
        type: "slider",
        xAxisIndex: [0],
      },
      {
        id: "dataZoomY",
        type: "inside",
        xAxisIndex: [0],
      },
    ],
    series: [
      {
        name: `${props.filterSelectedId}`,
        type: "bar",
        barGap: 0,
        barWidth: "15%",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: generateDataForSelectedFilter(props.filterSelectedId!),
      },
    ],
  };
  console.log(optionForScatterChart);
  return (
    <>
      <Typography>
        <Title level={3}>Stats Per Country</Title>
      </Typography>
      <Row>
        <Col span={24}>
          <ReactECharts
            option={optionForBarChart}
            loadingOption={props.loading}
          />
        </Col>
      </Row>
      <Row>
        <Typography>
          <Title level={3}>Score X Population</Title>
        </Typography>
        <Col span={24}>
          <ReactECharts
            option={optionForScatterChart}
            loadingOption={props.loading}
          />
        </Col>
      </Row>
    </>
  );
};
