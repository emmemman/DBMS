import React, { useState } from "react";
import { Table, Spin, Switch, Space, Select } from "antd";
import { useGetGlobalScoringStatsQuery } from "../../../Shared/generated/graphql";
import { GraphForGlobalScoringStats } from "./GraphForGlobalScoringStats";
const { Option } = Select;
enum SwitchCases {
  TOTAL_WINS,
  SCORE,
  AVERAGE_WINS_PER_YEAR,
  AVERAGE_SCORE_PER_YEAR,
  NULL,
}
const switchOptions = [
  { key: SwitchCases.TOTAL_WINS, label: "Total Wins", field: "totalWins" },
  { key: SwitchCases.SCORE, label: "Score", field: "score" },
  {
    key: SwitchCases.AVERAGE_WINS_PER_YEAR,
    label: "Avg Wins/Year",
    field: "averageWinsPerYear",
  },
  {
    key: SwitchCases.AVERAGE_SCORE_PER_YEAR,
    label: "Avg Score/Year",
    field: "averageScorePerYear",
  },
];

export const GlobalScoringStatsTable = () => {
  const { data, loading } = useGetGlobalScoringStatsQuery();

  const rawData = data?.getGlobalScoringStats?.scoringStats || [];
  const [selectedDeveloped, setSelectedDeveloped] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");

  const [activeSwitch, setActiveSwitch] = useState<SwitchCases>(
    SwitchCases.SCORE
  );
  const developedOptions = Array.from(
    new Set(
      data?.getGlobalScoringStats?.scoringStats?.flatMap((countryStats) => [
        countryStats?.countryDetails?.developedStatus,
      ])
    )
  ).filter(Boolean);

  const statusOptions = Array.from(
    new Set(
      data?.getGlobalScoringStats?.scoringStats?.flatMap((countryStats) => [
        countryStats?.countryDetails?.status,
      ])
    )
  ).filter(Boolean);

  const regionOptions = Array.from(
    new Set(
      data?.getGlobalScoringStats?.scoringStats?.flatMap((countryStats) => [
        countryStats?.countryDetails?.regionName,
      ])
    )
  ).filter(Boolean);

  const handleSwitchChange = (key: number, checked: boolean) => {
    if (activeSwitch === key) {
      setActiveSwitch(SwitchCases.NULL); // κλείνει αν ξαναπατηθεί
    } else {
      setActiveSwitch(key); // ανοίγει μόνο αυτός
    }
  };

  const filteredData = rawData
    ?.filter((countryStat) => {
      const matchesDeveloped =
        selectedDeveloped === "ALL" ||
        countryStat?.countryDetails?.developedStatus === selectedDeveloped;

      const matchesStatus =
        selectedStatus === "ALL" ||
        countryStat?.countryDetails?.status === selectedStatus;

      const matchesRegion =
        selectedRegion === "ALL" ||
        countryStat?.countryDetails?.regionName === selectedRegion;

      return matchesDeveloped && matchesStatus && matchesRegion;
    })
    .sort((a, b) => {
      const sortField = switchOptions.find(
        (opt) => opt.key === activeSwitch
      )?.field;
      if (!sortField) return 0;
      return (b[sortField] ?? 0) - (a[sortField] ?? 0);
    })
    .map((countryStats, index) => ({
      key: index.toString(),
      countryName: countryStats?.countryDetails.displayName,
      developedStatus: countryStats?.countryDetails?.developedStatus,
      region: countryStats?.countryDetails?.regionName,
      status: countryStats?.countryDetails?.status,
      totalWins: countryStats?.totalWins,
      score: countryStats?.score,
      averageWinsPerYear: countryStats?.averageWinsPerYear.toFixed(3),
      averageScorePerYear: countryStats?.averageScorePerYear.toFixed(3),
      population: countryStats?.countryDetails?.population,
    }));

  const columns = [
    { title: "Country Name", dataIndex: "countryName", key: "countryName" },
    { title: "Region", dataIndex: "region", key: "region" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Developed",
      dataIndex: "developedStatus",
      key: "developedStatus",
    },
    { title: "Total Wins", dataIndex: "totalWins", key: "totalWins" },
    { title: "Score", dataIndex: "score", key: "score" },
    {
      title: "Avg Wins/Year",
      dataIndex: "averageWinsPerYear",
      key: "averageWinsPerYear",
    },
    {
      title: "Avg Score/Year",
      dataIndex: "averageScorePerYear",
      key: "averageScorePerYear",
    },
  ];
  console.log(filteredData);
  return (
    <div style={{ padding: 24 }}>
      <h2>Global Scoring Stats</h2>

      <Space style={{ marginBottom: 16 }}>
        {switchOptions.map((opt) => (
          <div key={opt.key}>
            <Switch
              checked={activeSwitch === opt.key}
              onChange={(checked) => handleSwitchChange(opt.key, checked)}
            />
            <span style={{ marginLeft: 8 }}>{opt.label}</span>
          </div>
        ))}
      </Space>

      <div
        style={{
          marginBottom: 16,
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Select
          value={selectedDeveloped}
          onChange={(value) => setSelectedDeveloped(value)}
          style={{ width: 180 }}
        >
          <Option value="ALL">Developed/Developing</Option>
          {developedOptions.map((dev) => (
            <Option key={dev} value={dev}>
              {dev}
            </Option>
          ))}
        </Select>
        <Select
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value)}
          style={{ width: 180 }}
        >
          <Option value="ALL">All Statuses</Option>
          {statusOptions.map((s) => (
            <Option key={s} value={s}>
              {s}
            </Option>
          ))}
        </Select>
        <Select
          value={selectedRegion}
          onChange={(value) => setSelectedRegion(value)}
          style={{ width: 180 }}
        >
          <Option value="ALL">All Regions</Option>
          {regionOptions.map((r) => (
            <Option key={r} value={r}>
              {r}
            </Option>
          ))}
        </Select>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="key"
        loading={loading}
        size="small"
      />
      {activeSwitch !== SwitchCases.NULL && (
        <GraphForGlobalScoringStats
          dataSource={filteredData.slice(0, 10)}
          filterSelectedId={activeSwitch}
          loading={loading}
        />
      )}
    </div>
  );
};
