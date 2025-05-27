import React, { useState } from "react";
import { Modal, Table, Select, Spin } from "antd";
import { useGetAllMatchesByCountryIdQuery } from "../../../Shared/generated/graphql";

const { Option } = Select;

interface IProps {
  isModalOpen: boolean;
  countryId: number;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export const AllMatchePerCountryModal = (props: IProps) => {
  const { data, loading } = useGetAllMatchesByCountryIdQuery({
    variables: {
      countryId: props.countryId,
    },
    skip: !props.countryId,
  });

  // State για τα φίλτρα
  const [selectedDeveloped, setSelectedDeveloped] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");

  const rawData = data?.getAllMatchesByCountryId?.matches || [];

  // Φόρτωση μοναδικών επιλογών από τα δεδομένα
  const developedOptions = Array.from(
    new Set(
      rawData.flatMap((match) => [
        match?.homeTeam?.developedStatus,
        match?.awayTeam?.developedStatus,
      ])
    )
  ).filter(Boolean);

  const statusOptions = Array.from(
    new Set(rawData.map((match) => match?.awayTeam.status))
  ).filter(Boolean);

  const regionOptions = Array.from(
    new Set(rawData.map((match) => match?.awayTeam.regionName))
  ).filter(Boolean);

  const filteredData = rawData
    ?.filter((match) => {
      const matchesDeveloped =
        selectedDeveloped === "ALL" ||
        match?.awayTeam?.developedStatus === selectedDeveloped;

      const matchesStatus =
        selectedStatus === "ALL" || match?.awayTeam.status === selectedStatus;

      const matchesRegion =
        selectedRegion === "ALL" ||
        match?.awayTeam.regionName === selectedRegion;

      return matchesDeveloped && matchesStatus && matchesRegion;
    })
    .map((match, index) => ({
      key: index.toString(),
      matchDate: match?.matchDate,
      homeTeam: match?.homeTeam?.displayName,
      awayTeam: match?.awayTeam?.displayName,
      homeScore: match?.homeScore,
      awayScore: match?.awayScore,
      tournament: match?.tournament,
      city: match?.city,
      country: match?.country,
    }));

  // Ορισμός στηλών πίνακα (χωρίς φίλτρα)
  const columns = [
    {
      title: "Match Date",
      dataIndex: "matchDate",
      key: "matchDate",
      sorter: true,
    },
    {
      title: "Home Team",
      dataIndex: "homeTeam",
      key: "homeTeam",
    },
    {
      title: "Away Team",
      dataIndex: "awayTeam",
      key: "awayTeam",
    },
    {
      title: "Home Score",
      dataIndex: "homeScore",
      key: "homeScore",
      sorter: true,
    },
    {
      title: "Away Score",
      dataIndex: "awayScore",
      key: "awayScore",
      sorter: true,
    },
    {
      title: "Tournament",
      dataIndex: "tournament",
      key: "tournament",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
  ];

  return (
    <Modal
      title="Matches By Year"
      closable={{ "aria-label": "Custom Close Button" }}
      open={props.isModalOpen}
      onCancel={() => props.setModalOpen(false)}
      onOk={() => props.setModalOpen(false)}
      width={"200%"}
      loading={props.loading}
    >
      {/* Φίλτρα dropdown */}
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

      {/* Πίνακας */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          showSorterTooltip={true}
        />
      )}
    </Modal>
  );
};
