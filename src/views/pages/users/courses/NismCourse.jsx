import { Box } from "@mui/material";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import YouTube from "react-youtube";
import { cilMediaPause, cilMediaPlay } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const courses = [
  {
    id: "Notes",
    title: "Notes",
    type: "notes",
    notesLink:
      "https://drive.google.com/file/d/1X7sgHBNAmVrLBGCq2hOwrCfR1UK5mljt/preview",
  },
  {
    id: "Introduction Session 1",
    title: "Introduction Session 1",
    type: "video",
    videoId: "T8msaNr2hrM",
  },
  {
    id: "Chapter 1 & 2",
    title: "Chapter 1 & 2",
    type: "video",
    videoId: "80_EV6L8V9s",
  },
  {
    id: "Chapter 4",
    title: "Chapter 4",
    type: "video",
    videoId: "xWzqBnyjyzg",
  },
  {
    id: "Chapter 5 Part 1",
    title: "Chapter 5 Part 1",
    type: "video",
    videoId: "b3SZZhwsLFM",
  },
  {
    id: "Chapter 5 Part 2 & Chapter 12",
    title: "Chapter 5 Part 2 & Chapter 12",
    type: "video",
    videoId: "7S94X07ZH8M",
  },
  {
    id: "Chapter 6 Part 1",
    title: "Chapter 6 Part 1",
    type: "video",
    videoId: "UFyTyPCRRGQ",
  },
  {
    id: "Chapter 7 Part 1",
    title: "Chapter 7 Part 1",
    type: "video",
    videoId: "ue3hULL3uoI",
  },
  {
    id: "Chapter 7 part 2 & Chapter 8 part 1",
    title: "Chapter 7 part 2 & Chapter 8 part 1",
    type: "video",
    videoId: "mng2dVY9dvU",
  },
  {
    id: "Chapter 8 Part 2",
    title: "Chapter 8 Part 2",
    type: "video",
    videoId: "TWukih0-k9s",
  },
  {
    id: "Chapter 9",
    title: "Chapter 9",
    type: "video",
    videoId: "NOKOPdBk7Go",
  },
  {
    id: "Chapter 10",
    title: "Chapter 10",
    type: "video",
    videoId: "fp4iPuA5y2Q",
  },
  {
    id: "Chapter 11",
    title: "Chapter 11",
    type: "video",
    videoId: "ljOOMud3ywE",
  },
  {
    id: "Chapter 13",
    title: "Chapter 13",
    type: "video",
    videoId: "z1A0Zy_jMTo",
  },
];

const NismCourse = () => {
  const [expanded, setExpanded] = useState(courses[0].id);
  const [contentLink, setContentLink] = useState(courses[0].notesLink);
  const [contentType, setContentType] = useState(courses[0].type);
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [playback, setPlayback] = useState(0);

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleContentChange = (link, type) => {
    setContentLink(link);
    setContentType(type);
    setPlayback(0);
  };

  const onReady = (event) => {
    setYoutubePlayer(event.target);
    event.target.pauseVideo();
    // if (youtubePlayer) {
    //   youtubePlayer.pauseVideo();
    // }
  };

  const onPlay = () => {
    if (youtubePlayer) {
      youtubePlayer.playVideo();
      setPlayback(1);
    }
  };

  const onPause = () => {
    if (youtubePlayer) {
      youtubePlayer.pauseVideo();
      setPlayback(0);
    }
  };

  const handleOverlayContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <Box display="flex" marginTop="2%">
      <Box width="25%" marginRight="2%" marginBottom="5%">
        <Typography
          sx={{ textAlign: "center", mb: "0.5em" }}
          variant="h5"
          fontWeight={700}
        >
          NISM Research Analyst July 2023
        </Typography>
        {courses.map((course) => (
          <Accordion
            key={course.id}
            expanded={expanded === course.id}
            onChange={handleChange(course.id)}
            style={{
              backgroundColor:
                contentLink === course.videoId ||
                contentLink === course.notesLink
                  ? "#D9D9D9"
                  : "white",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="h6" fontWeight={700}>
                {course.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {course.videoId && (
                <div
                  onClick={() => handleContentChange(course.videoId, "video")}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    fontWeight:
                      contentLink === course.videoId ? "bold" : "normal",
                  }}
                >
                  Video
                </div>
              )}
              {course.notesLink && course.videoId && <hr />}
              {course.notesLink && (
                <div
                  onClick={() => handleContentChange(course.notesLink, "notes")}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    fontWeight:
                      contentLink === course.notesLink ? "bold" : "normal",
                  }}
                >
                  Notes
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box width="75%">
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            overflow: "hidden",
            maxWidth: "100%",
            background: "#D9D9D9",
          }}
        >
          {contentType === "notes" && (
            <iframe
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
              src={contentLink}
              allowFullScreen
              title="Notes"
            />
          )}
          {contentType === "video" && (
            <>
              <YouTube
                videoId={contentLink}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                }}
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: {
                    enablejsapi: 1,
                    controls: 0,
                    rel: 0,
                    playsinline: 0,
                    disablekb: 0,
                    fs: 1,
                  },
                }}
                onReady={onReady}
              />
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  zIndex: 2,
                  cursor: "default",
                }}
                onContextMenu={handleOverlayContextMenu}
              />
            </>
          )}
        </div>
        {contentType === "video" && (
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {!playback ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={onPlay}
              >
                <CIcon
                  icon={cilMediaPlay}
                  size="xxl"
                  onPlay={onPlay}
                  style={{ marginTop: "10px" }}
                />
                <span>Play</span>
              </div>
            ) : (
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={onPause}
              >
                <CIcon
                  icon={cilMediaPause}
                  size="xxl"
                  onPause={onPause}
                  style={{ marginTop: "10px" }}
                />
                <span>Pause</span>
              </div>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default NismCourse;
