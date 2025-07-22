type RoadMapDay = {
  title: string;
  description: string;
};

export type RoadMapWeek = {
  week: string;
  days: RoadMapDay[];
};
export type RoadMapTableProps = {
  weeks: RoadMapWeek[];
};
