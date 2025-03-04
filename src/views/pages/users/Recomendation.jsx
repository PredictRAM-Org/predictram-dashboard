import NoData from "../../../utils/NoData";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CContainer,
  CListGroup,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { CCardTitle } from "@coreui/react-pro";
import TagsList from "../../../config/TagsList";
import TagCard from "../../../components/TagCard";
import { followTags, unfollowTags } from "../../../api/services/TagService";
import { getProfile } from "../../../api/services/ProfileService";

function Recomendation() {
  const [followlist, setFollowlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alltags, setAlltags] = useState([]);

  const handleFollow = async (tag) => {
    await followTags(setLoading, { tag });
    getUserFollowedTags();
  };

  const handleUnFollow = async (tag) => {
    await unfollowTags(setLoading, { tag });
    getUserFollowedTags();
  };

  const getUserFollowedTags = async () => {
    const profileData = await getProfile(setLoading);
    setFollowlist(profileData.profile.followedTags);
  };

  useEffect(() => {
    const result = TagsList.map((tag) => tag.value);
    setAlltags(result);
    getUserFollowedTags();
  }, []);

  return (
    <CContainer fluid>
      <div>
        <h1 className="text-center m-0">Manage your Following</h1>
        <CRow
          xs={{ cols: 1 }}
          sm={{ cols: 1 }}
          md={{ cols: 2 }}
          className="text-center mt-3"
        >
          <CCol>
            <CCard>
              <CCardBody>
                <CCardTitle className="fw-semibold">
                  Recommended topics
                </CCardTitle>
                <hr />
                {loading && <Loader />}
                {!loading && (
                  <>
                    {alltags.length === followlist.length && (
                      <NoData message={"Great You Followed every topic"} />
                    )}
                    {alltags.map((tag) => {
                      return (
                        !followlist.includes(tag) && (
                          <TagCard
                            name={tag}
                            status={"follow"}
                            clickevent={handleFollow}
                          />
                        )
                      );
                    })}
                  </>
                )}
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
            <CCard>
              <CCardBody>
                <CCardTitle className="fw-semibold">
                  Topics you are following
                </CCardTitle>
                <hr />
                {loading && <Loader />}
                {!loading && (
                  <CListGroup flush>
                    {followlist.length === 0 && (
                      <NoData message={"You did not followed any topic"} />
                    )}
                    {followlist.length > 0 &&
                      followlist.map((tag) => {
                        return (
                          <TagCard
                            name={tag}
                            status={"unfollow"}
                            clickevent={handleUnFollow}
                          />
                        );
                      })}
                  </CListGroup>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </CContainer>
  );
}

export default Recomendation;
