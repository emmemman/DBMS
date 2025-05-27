import { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Button, Card, Col, Row, Select } from "antd";
import {
  GetAllCountriesStatsPerYearQuery,
  useGetAllCountriesStatsPerYearQuery,
  useGetAllYearsRegisteredQuery,
  useGetMatchStatsPerYearQuery,
} from "../../../Shared/generated/graphql";

import { AllMatchesPerYearModal } from "./AllMatchesPerYearModal";
import { Typography } from "antd";

export const GraphForYears = () => {
  const { Title } = Typography;
  const [yearSelected, SetYearSelected] = useState<number>();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  //0 for bar 1 for line

  const { data: allYears, loading: allYearsLoading } =
    useGetAllYearsRegisteredQuery({});
  const {
    data: allCountriesStatsPerYear,
    loading: allCountriesStatsPerYearLoading,
  } = useGetAllCountriesStatsPerYearQuery({
    variables: {
      year: yearSelected!,
    },
    skip: !yearSelected,
  });
  const { data: matchStatsByYear, loading: matchStatsByYearLoading } =
    useGetMatchStatsPerYearQuery({
      variables: {
        year: yearSelected!,
      },
      skip: !yearSelected,
    });
  const options = allYears?.getAllYearsRegistered?.years?.map((year) => {
    return { value: parseInt(year!), label: year };
  });

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

  const onSelect = (value: number) => {
    SetYearSelected(value);
  };

  const generateXAxisFromCountries = (
    data: GetAllCountriesStatsPerYearQuery
  ) => {
    return data?.getAllCountriesStatsPerYear?.countriesStats
      ?.map((entry) => entry?.countryDetails?.displayName)
      .sort((a: any, b: any) => parseInt(a) - parseInt(b));
  };

  const calculateWLDStats = (result: GraphCases) => {
    switch (result) {
      case GraphCases.ALL_WINS:
        return allCountriesStatsPerYear?.getAllCountriesStatsPerYear?.countriesStats?.map(
          (entry) => entry?.generalStats?.wins
        );
      case GraphCases.ALL_LOSSES:
        return allCountriesStatsPerYear?.getAllCountriesStatsPerYear?.countriesStats?.map(
          (entry) => entry?.generalStats?.losses
        );
      case GraphCases.ALL_DRAWS:
        return allCountriesStatsPerYear?.getAllCountriesStatsPerYear?.countriesStats?.map(
          (entry) => entry?.generalStats?.draws
        );
      case GraphCases.HOME_WINS:
        return allCountriesStatsPerYear?.getAllCountriesStatsPerYear?.countriesStats?.map(
          (entry) => entry?.homeStats?.wins
        );
      case GraphCases.HOME_LOSSES:
        return allCountriesStatsPerYear?.getAllCountriesStatsPerYear?.countriesStats?.map(
          (entry) => entry?.homeStats?.losses
        );
      case GraphCases.HOME_DRAWS:
        return allCountriesStatsPerYear?.getAllCountriesStatsPerYear?.countriesStats?.map(
          (entry) => entry?.homeStats?.draws
        );
      case GraphCases.AWAY_WINS:
        return allCountriesStatsPerYear?.getAllCountriesStatsPerYear?.countriesStats?.map(
          (entry) => entry?.awayStats?.wins
        );
      case GraphCases.AWAYS_DRAWS:
        return allCountriesStatsPerYear?.getAllCountriesStatsPerYear?.countriesStats?.map(
          (entry) => entry?.awayStats?.draws
        );
      case GraphCases.AWAYLOSSES:
        return allCountriesStatsPerYear?.getAllCountriesStatsPerYear?.countriesStats?.map(
          (entry) => entry?.awayStats?.losses
        );
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
        data: generateXAxisFromCountries(allCountriesStatsPerYear!),
        name: "Countries",
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
        type: "bar",
        barGap: 0,
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.ALL_WINS),
      },
      {
        name: "All Losses",
        type: "bar",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.ALL_LOSSES),
      },
      {
        name: "All Draws",
        type: "bar",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.ALL_DRAWS),
      },
      {
        name: "Home Wins",
        type: "bar",
        barGap: 0,
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.HOME_WINS),
      },
      {
        name: "Home Losses",
        type: "bar",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.HOME_LOSSES),
      },
      {
        name: "Home Draws",
        type: "bar",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.HOME_DRAWS),
      },
      {
        name: "Away Wins",
        type: "bar",
        barGap: 0,
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.AWAY_WINS),
      },
      {
        name: "Away Loses",
        type: "bar",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.AWAYLOSSES),
      },
      {
        name: "Away Draws",
        type: "bar",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: calculateWLDStats(GraphCases.AWAYS_DRAWS),
      },
    ],
  };

  return (
    <>
      <Typography>
        <Title level={3}>Stats Per Year</Title>
      </Typography>

      <Row>
        <Col span={24}>
          <Select
            showSearch={true}
            onSelect={(value) => onSelect(value)}
            options={options}
            placeholder="Select a Year"
            style={{ width: "30%" }}
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            loading={allYearsLoading}
          ></Select>

          {
            <AllMatchesPerYearModal
              year={yearSelected!}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              loading={matchStatsByYearLoading}
            />
          }
          {!!yearSelected ? (
            <Button onClick={() => setModalOpen(true)}>
              Show All Matches For Year : {yearSelected}
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row style={{ paddingTop: "1%" }}>
        <Col span={8}>
          {!!yearSelected ? (
            <Card
              title={"Overall Match Stats Per Selected Year"}
              style={{ width: "100%" }}
              loading={matchStatsByYearLoading}
            >
              <p>
                Total Number Of Matches :
                {matchStatsByYear?.getMatchStatsPerYear?.matchesNumber}
              </p>
              <p>
                Total Number Of Draws :
                {matchStatsByYear?.getMatchStatsPerYear?.draws}
              </p>
              <p>
                Total Number Of Friendly Matches :
                {matchStatsByYear?.getMatchStatsPerYear?.friendlyMatches}
              </p>
              <p>
                Total Number Of Matches With Shootouts :
                {matchStatsByYear?.getMatchStatsPerYear?.matchesWithShootouts}
              </p>
            </Card>
          ) : null}
        </Col>
        <Col span={16}>
          {!!yearSelected ? (
            <>
              <ReactECharts
                option={option}
                loadingOption={allCountriesStatsPerYearLoading}
              />
            </>
          ) : null}
        </Col>
      </Row>
    </>
  );
};
