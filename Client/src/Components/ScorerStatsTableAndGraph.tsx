import React, { useEffect, useState } from "react";
import { Card, Select, Slider, Spin } from "antd";
import {
  useGetAllScorersQuery,
  useGetScorerStatsByIdQuery,
} from "../../../Shared/generated/graphql";
import ReactECharts from "echarts-for-react";

export const ScorerStatsTableAndGraph = () => {
  const [idSelected, SetIdSelected] = useState<number>();

  const { data: allScorers, loading: allScorersLoading } =
    useGetAllScorersQuery();

  const { data, loading } = useGetScorerStatsByIdQuery({
    variables: { scorerId: idSelected! },
    skip: !idSelected,
  });
  const selectedPlayer = data?.getScorerStatsById;
  const years = selectedPlayer?.statsByYear.map((e) => e.year);
  const [yearRange, setYearRange] = useState<[number, number]>();
  console.log(idSelected);
  useEffect(() => {
    if (years && years.length > 0) {
      setYearRange([years[0], years[years.length - 1]]);
    }
  }, [selectedPlayer]);
  const sliderMarks = () => {
    const marks = {};
    selectedPlayer?.statsByYear.forEach((e) => {
      marks[e.year] = e.year.toString();
    });
    return marks;
  };
  const uniqueScorerOptions = Array.from(
    new Map(
      allScorers?.getAllScorers?.scorers.map((s) => [s.scorerName, s])
    ).values()
  ).map((scorer) => ({
    value: scorer.scorerId,
    label: scorer.scorerName,
  }));
  console.log(uniqueScorerOptions);

  const onSelect = (value: number) => {
    SetIdSelected(value);
  };
  const filteredStats = selectedPlayer?.statsByYear.filter(
    (e) => yearRange && e.year >= yearRange[0] && e.year <= yearRange[1]
  );
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {},
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: filteredStats?.map((entry) => entry.year),
        name: "Years",
      },
    ],
    yAxis: [{ type: "value", name: "Total Goals" }],
    dataZoom: [
      { id: "dataZoomX", type: "slider", xAxisIndex: [0] },
      { id: "dataZoomY", type: "inside", xAxisIndex: [0] },
    ],
    series: [
      {
        name: "Total Goals",
        type: "line",
        barGap: 0,
        emphasis: { focus: "series" },
        data: filteredStats?.map((entry) => entry.totalGoals),
      },
    ],
  };

  console.log(yearRange);
  return (
    <>
      {<Spin spinning={loading && !!idSelected} />}
      <Select
        showSearch
        onSelect={onSelect}
        options={uniqueScorerOptions}
        placeholder="Select a Scorer"
        style={{ width: "30%" }}
        optionFilterProp="label"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        loading={allScorersLoading}
      />

      {!!idSelected && selectedPlayer ? (
        <>
          <Card
            title={"Overall Match Stats Per Selected Year"}
            style={{ width: "100%" }}
            loading={loading}
          >
            <p>
              Total Number Of Goals:{" "}
              {filteredStats?.reduce((sum, e) => sum + e.totalGoals, 0)}
            </p>
            <p>
              Most Goals Scored In A Match: {selectedPlayer.mostGoalsScored}
            </p>
            <p>
              Years that {selectedPlayer.scorerName} Scored A Goal:{" "}
              {years && (
                <Slider
                  range
                  min={years[0]}
                  max={years[years.length - 1]}
                  marks={sliderMarks()}
                  value={yearRange}
                  onChange={(val) => setYearRange(val)}
                  draggableTrack
                  step={null}
                />
              )}
            </p>
            <p>
              Average Goals of {selectedPlayer.scorerName} Per{" "}
              {selectedPlayer.teamDetails.displayName}'s Match:{" "}
              {(() => {
                const goals = filteredStats?.reduce(
                  (sum, e) => sum + e.totalGoals,
                  0
                );
                const matches = filteredStats?.reduce(
                  (sum, e) => sum + e.teamTotalMatches,
                  0
                );
                return matches! > 0 ? (goals! / matches!).toFixed(2) : 0;
              })()}
            </p>
          </Card>
          <ReactECharts option={option} loadingOption={loading} />
        </>
      ) : null}
    </>
  );
};
