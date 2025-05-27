import { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Button, Col, Row, Select, Typography } from "antd";
import {
  GetCountryStatsPerYearQuery,
  useGetAllCountriesQuery,
  useGetCountryStatsPerYearQuery,
} from "../../../Shared/generated/graphql";
import { AllMatchePerCountryModal } from "./AllMatchesPerCountryModal";
export const GraphForCountries = () => {
  const { data: allCountriesData, loading: allCountriesLoading } =
    useGetAllCountriesQuery();
  const [idSelected, SetIdSelected] = useState<number>();
  const [buttonDisplay, SetButtonDisplay] = useState<string>("SHOW BAR CHART");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  //0 for bar 1 for line
  const [graphType, SetGraphType] = useState<number>(1);
  const { Title } = Typography;
  const options = allCountriesData?.getAllCountries?.countries?.map(
    (country) => {
      return { value: country.countryId, label: country.countryName };
    }
  );

  enum GraphCases {
    ALL_WINS,
    ALL_LOSSES,
    ALL_DRAWS,
    HOME_WINS,
    HOME_LOSSES,
    HOME_DRAWS,
    AWAY_WINS,
    AWAYS_DRAWS,
    AWAYLOSSES,
  }
  const { data: countryStatsPerYear, loading: countryStatsPerYearLoading } =
    useGetCountryStatsPerYearQuery({
      variables: {
        countryId: idSelected!,
      },
      skip: !idSelected,
    });

  const onSelect = (value: number) => {
    SetIdSelected(value);
  };

  const generateXAxisFromYears = (data: GetCountryStatsPerYearQuery) => {
    return data?.getCountryStatsPerYear?.years
      ?.map((entry) => entry?.yearDate?.toString())
      .sort((a: any, b: any) => parseInt(a) - parseInt(b));
  };
  const calculateWLDStats = (result: GraphCases) => {
    switch (result) {
      case GraphCases.ALL_WINS:
        return countryStatsPerYear?.getCountryStatsPerYear?.years?.map(
          (entry) => entry?.generalStats?.wins
        );
      case GraphCases.ALL_LOSSES:
        return countryStatsPerYear?.getCountryStatsPerYear?.years?.map(
          (entry) => entry?.generalStats?.losses
        );
      case GraphCases.ALL_DRAWS:
        return countryStatsPerYear?.getCountryStatsPerYear?.years?.map(
          (entry) => entry?.generalStats?.draws
        );
      case GraphCases.HOME_WINS:
        return countryStatsPerYear?.getCountryStatsPerYear?.years?.map(
          (entry) => entry?.homeStats?.wins
        );
      case GraphCases.HOME_LOSSES:
        return countryStatsPerYear?.getCountryStatsPerYear?.years?.map(
          (entry) => entry?.homeStats?.losses
        );
      case GraphCases.HOME_DRAWS:
        return countryStatsPerYear?.getCountryStatsPerYear?.years?.map(
          (entry) => entry?.homeStats?.draws
        );
      case GraphCases.AWAY_WINS:
        return countryStatsPerYear?.getCountryStatsPerYear?.years?.map(
          (entry) => entry?.awayStats?.wins
        );
      case GraphCases.AWAYS_DRAWS:
        return countryStatsPerYear?.getCountryStatsPerYear?.years?.map(
          (entry) => entry?.awayStats?.draws
        );
      case GraphCases.AWAYLOSSES:
        return countryStatsPerYear?.getCountryStatsPerYear?.years?.map(
          (entry) => entry?.awayStats?.losses
        );
    }
  };

  const changeGraphType = () => {
    if (buttonDisplay === "SHOW BAR CHART") {
      SetGraphType(0);
      SetButtonDisplay("SHOW LINE CHART");
    } else {
      SetButtonDisplay("SHOW BAR CHART");
      SetGraphType(1);
    }
  };
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },

    legend: {},
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: generateXAxisFromYears(countryStatsPerYear!),
        name: "Years",
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "W/L/D",
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
        name: "All Wins",
        type: graphType === 0 ? "bar" : "line",
        barGap: 0,
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.ALL_WINS),
      },
      {
        name: "All Losses",
        type: graphType === 0 ? "bar" : "line",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.ALL_LOSSES),
      },
      {
        name: "All Draws",
        type: graphType === 0 ? "bar" : "line",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.ALL_DRAWS),
      },
      {
        name: "Home Wins",
        type: graphType === 0 ? "bar" : "line",
        barGap: 0,
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.HOME_WINS),
      },
      {
        name: "Home Losses",
        type: graphType === 0 ? "bar" : "line",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.HOME_LOSSES),
      },
      {
        name: "Home Draws",
        type: graphType === 0 ? "bar" : "line",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.HOME_DRAWS),
      },
      {
        name: "Away Wins",
        type: graphType === 0 ? "bar" : "line",
        barGap: 0,
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.AWAY_WINS),
      },
      {
        name: "Away Loses",
        type: graphType === 0 ? "bar" : "line",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.AWAYLOSSES),
      },
      {
        name: "Away Draws",
        type: graphType === 0 ? "bar" : "line",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.AWAYS_DRAWS),
      },
    ],
  };
  console.log(generateXAxisFromYears(countryStatsPerYear!));
  console.log(option);
  return (
    <>
      <Typography>
        <Title level={3}>Stats Per Country</Title>
      </Typography>
      <Row>
        <Col span={24}>
          <Select
            showSearch={true}
            onSelect={(value) => onSelect(value)}
            options={options}
            placeholder="Select a Country"
            style={{ width: "30%" }}
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            loading={allCountriesLoading}
          ></Select>

          <AllMatchePerCountryModal
            countryId={idSelected!}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            loading={countryStatsPerYearLoading}
          />
          {!!idSelected ? (
            <Button onClick={() => setModalOpen(true)}>
              Show All{" "}
              {
                allCountriesData?.getAllCountries?.countries?.find(
                  (c) => c.countryId === idSelected
                )?.countryName
              }
              {"'s"} Matches
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {!!idSelected ? (
            <>
              <Button type="primary" onClick={() => changeGraphType()}>
                {buttonDisplay}
              </Button>
              <ReactECharts
                option={option}
                loadingOption={countryStatsPerYearLoading}
              />
            </>
          ) : null}
        </Col>
      </Row>
    </>
  );
};
