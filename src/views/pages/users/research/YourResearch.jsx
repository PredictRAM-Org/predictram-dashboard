import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VisualNoData from "../../../../utils/VisualNoData";
import GridResearchCard from "./GridResearchCard";

import { useSelector } from "react-redux";
import { getUserResearchPaper } from "../../../../api/services/ResearchPaperService";
import Loader from "../Loader";

export default function YourResearch() {
  const id = useSelector((state) => state.user.id);
  const [papers, setPapers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getreasearch() {
    const data = await getUserResearchPaper(setLoading, { id, count });
    setPapers((prevdata) => [...new Set([...prevdata, ...data])]);
    setLoading(false);
  }
  useEffect(() => {
    getreasearch();
  }, [count]);

  return (
    <div className="d-flex-column justify-content-center text-center">
      {count === 0 && (
        <VisualNoData message="Post research papers to view here" />
      )}

      {loading && <Loader />}
      {!loading && (
        <>
          {papers.map((item, idx) => (
            <GridResearchCard
              key={idx}
              data={item}
              link={Link}
              lastCard={idx + 1 === papers.length}
            />
          ))}
        </>
      )}
    </div>
  );
}
