import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Carousel } from "react-bootstrap"; 
import Image from "next/image";
import { Container, Row } from "react-bootstrap";
import { CONST } from "core/helper";
import { LANGUAGE_FILTER, masterService, usersService, RELIGION_FILTER } from "core/services";

// Import banner images
import banner from "public/frontend/images/banner/banner.jpg";
import banner_1 from "public/frontend/images/banner/banner_1.jpg";
import banner_2 from "public/frontend/images/banner/banner_2.jpg";
import banner_6 from "public/frontend/images/banner/banner_6.jpg";
import banner_4 from "public/frontend/images/banner/banner_4.jpg";
import banner_5 from "public/frontend/images/banner/banner_5.jpg";

const bannerList = [
  { id: 0, src: banner },
  { id: 1, src: banner_1 },
  { id: 2, src: banner_2 },
  { id: 3, src: banner_6 },
  { id: 4, src: banner_4 },
  { id: 5, src: banner_5 },
];

// Form validation schema using Yup
const validationSchema = Yup.object().shape({
  gender: Yup.string().required("Gender is required"),
  age: Yup.string().required("Age is required"),
  religion: Yup.string().required("Religion is required"),
  city: Yup.string().required("City is required"),
});

const Banner = () => {
  const router = useRouter();
  // const [religionOptions, setReligionOptions] = useState([]);
  const [religion, setReligion] = useState([]);
  const [cityOptions, setCityOptions] = useState([
    "Chennai",
    "New York",
    "Perth",
    "London",
  ]);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [religionFilter] = useState({
    ...CONST.RELIGION_FILTER,
});

const loadReligion = async (religionFilter) => {
  const resp = await masterService.getAll(RELIGION_FILTER, religionFilter);
  if (resp && resp?.meta?.code === 200) {
      setReligion(resp?.data);
  }
};


  // Load religion options (this could be replaced with an API call)
  // useEffect(() => {
  //   setReligionOptions(["Hindu", "Muslim", "Jain", "Christian"]);
  // }, []);

  // Handle form submission
  const onSubmit = async (values) => {
    const query = new URLSearchParams(values).toString();
    router.push(`/register?${query}`);
  };

  useEffect(() => {
    loadReligion(religionFilter);
}, []);

  return (
    <>
      <section>
        <div className="str">
          <div className="hom-head">
            <div class="container">
              <div class="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span>
                      <i className="no1">#1</i> Matrimony
                    </span>
                    <h1>
                      Find your
                      <br />
                      <b>Right Match</b> here
                    </h1>
                    <p>
                      An Authentic Christian Matrimony Site that Unites Two
                      Beautiful Hearts
                    </p>
                  </div>
                  <div className="ban-search chosenini">
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <ul className="srch">
                        <li className="sr-look">
                          <div className="form-group">
                            <label>I'm looking for</label>
                            <select
                              className="chosen-select"
                              {...register("gender")}
                            >
                              <option value="">I'm looking for</option>
                              <option value="Men">Men</option>
                              <option value="Women">Women</option>
                            </select>
                            {errors.gender && <p>{errors.gender.message}</p>}
                          </div>
                        </li>
                        <li className="sr-age">
                          <div className="form-group">
                            <label>Age</label>
                            <select
                              className="chosen-select"
                              {...register("age")}
                            >
                              <option value="">Select Age Range</option>
                              <option value="18-30">18 to 30</option>
                              <option value="31-40">31 to 40</option>
                              <option value="41-50">41 to 50</option>
                              <option value="51-60">51 to 60</option>
                              <option value="61-70">61 to 70</option>
                              <option value="71-80">71 to 80</option>
                              <option value="81-90">81 to 90</option>
                              <option value="91-100">91 to 100</option>
                            </select>
                            {errors.age && <p>{errors.age.message}</p>}
                          </div>
                        </li>
                        <li className="sr-reli">
                          <div className="form-group">
                            <label>Religion</label>
                            <select
                              className="chosen-select"
                              {...register("religion")}
                            >
                              <option value="">Select Religion</option>
                              {religion &&
                                                religion.map((ele, idx) => (
                                                    <option key={idx} value={ele._id}>
                                                        {ele.name}
                                                    </option>
                                                ))}
                              {/* {religionOptions.map((religion, index) => (
                                <option key={index} value={religion}>
                                  {religion}
                                </option>
                              ))} */}
                            </select>
                            {errors.religion && (
                              <p>{errors.religion.message}</p>
                            )}
                          </div>
                        </li>
                        <li className="sr-cit">
                          <div className="form-group">
                            <label>City</label>
                            <select
                              className="chosen-select"
                              {...register("city")}
                            >
                              <option value="">Select City</option>
                              {cityOptions.map((city, index) => (
                                <option key={index} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                            {errors.city && <p>{errors.city.message}</p>}
                          </div>
                        </li>
                        <li className="sr-btn">
                          <input type="submit" value="Search" />
                        </li>
                      </ul>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="hom-ban-sli">
          <Carousel>
            {bannerList.map((banner) => (
              <Carousel.Item key={banner.id}>
                <Image
                  src={banner.src}
                  alt={`Banner ${banner.id}`}
                  loading="lazy"
                  layout="responsive"
                  width={1920}
                  height={1080}
                  className="d-block w-100" // Bootstrap class for full width
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Banner;
