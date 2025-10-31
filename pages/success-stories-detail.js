import {
  Button,
  Col,
  Container,
  Fade,
  Form,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import Pagination from "components/common/pagination";
import { Fragment, useEffect, useState } from "react";
import { commonService, profileService } from "core/services";
import { CONST, utils, reloadAction } from "core";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import moment from "moment";
import { connect, useSelector } from "react-redux";
import SuccessStroryCard from "components/common/success-story-card";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";

const SuccessStoriesDetail = () => {
  const router = useRouter();
  const { storiesId } = router.query;
  console.log('storiesId', storiesId);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (storiesId) {
        try {
          const res = await fetch(`https://webadminback.truefriendmatrimony.com/api/successstories/${storiesId}`);
          const result = await res.json();
          console.log('first', result);
          setData(result.response ? result.response : null);
          // setData(result.response); // Ensure 'result' is an array of items
          console.log('datadatadata', result.response);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [storiesId]);
  // const stripHtmlTags = (htmlContent) => {
  //   const tempDiv = document.createElement('div');
  //   tempDiv.innerHTML = htmlContent;
  //   return tempDiv.textContent || '';
  // };

  const stripHtmlTags = (htmlContent) => {
    if (typeof htmlContent !== 'string') {
      return '';
    }
    return htmlContent.replace(/<[^>]*>/g, '');
  };
  return (
    <>
<Head>
  <title>
    {data
      ? `${data.name} Success Story | True Friend Matrimony - Christian Matrimony Platform`
      : "Christian Matrimony Success Stories | True Friend Matrimony"}
  </title>

  <meta
    name="description"
    content={
      data
        ? `${stripHtmlTags(data.content).slice(0, 147)}... Read the inspiring Christian matrimony success story of ${data.name} on True Friend Matrimony, a trusted platform for faith-based matchmaking.`
        : "Discover real Christian matrimonial success stories on True Friend Matrimony. True couples, real journeys, and meaningful faith-based matches."
    }
  />

  <meta
    name="keywords"
    content="Christian Matrimony Success Stories, True Friend Matrimony, Christian Love Stories, Faith-Based Matchmaking, Real Christian Couples, Marriage Success Stories, Christian Relationship Stories, Trusted Christian Matrimony Platform, Christian Marriage"
  />

  <link
    rel="canonical"
    href={`https://truefriendmatrimony.com/success-stories/${data ? data.slug : ''}`}
  />

  {/* Open Graph */}
  <meta property="og:type" content="article" />
  <meta
    property="og:title"
    content={
      data
        ? `${data.name} Success Story | True Friend Matrimony - Christian Matrimony Platform`
        : "Christian Matrimony Success Stories | True Friend Matrimony"
    }
  />
  <meta
    property="og:description"
    content={
      data
        ? `${stripHtmlTags(data.content).slice(0, 147)}... Read the inspiring Christian matrimony success story of ${data.name} on True Friend Matrimony.`
        : "Discover real Christian matrimonial success stories on True Friend Matrimony. True couples, real journeys, and meaningful faith-based matches."
    }
  />
  <meta
    property="og:url"
    content={`https://truefriendmatrimony.com/success-stories/${data ? data.slug : ''}`}
  />
  <meta property="og:site_name" content="True Friend Matrimony" />


</Head>

      <section>
        <div className="ab-wel mt-5 mb-5">
          <div className="container mb-5">
            <div className="row mb-4">
              {data ? (
                <>
                  <div className="col-lg-6">
                    <div className="ab-wel-lhs">
                      <span className="ab-wel-3"></span>
                      <img
                        // src="/frontend/images/couples/richard.webp"
                        src={`https://webadminback.truefriendmatrimony.com/${data.image_name_large}`}

                        alt={data.image_description || data.title || "Image of a couple or matrimonial success story"}
                        loading="lazy"
                        className="ab-wel-1"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">

                    <div className="ab-wel-rhs">
                      <div className="ab-wel-tit">
                        <h2>
                          <em>{data.name}</em>
                        </h2>
                      </div>
                      <div className="ab-wel-tit-1">
                        <p>
                          {stripHtmlTags(data.content)}
                        </p>
                      </div>
                      <div className="ab-wel-tit-2"></div>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </section>

    </>

  );
};

export default SuccessStoriesDetail;
// export default dynamic(() => Promise.resolve(SuccessStoriesDetail), { ssr: false });

