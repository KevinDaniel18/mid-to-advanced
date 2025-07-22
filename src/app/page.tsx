import RoadMap from "@/components/RoadMap";
import { roadmaps } from "@/roadmaps/roadmaps";

export default function Home() {
  return (
    <div>
      <h1 className=" text-center mt-3 font-bold text-3xl">
        4 weeks of improving my Mid level
      </h1>
      <div className=" mt-3">
        <RoadMap weeks={roadmaps} />
      </div>
    </div>
  );
}
