import Footer from '../Footer/footer';
import Contact from '../contactUs/contact';
import Verification from '../Verify/Verify';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Home = () => {
  return (
    <div>
      <div class="containerss" id="section1">
        <section>
          <em>WELCOME TO MEDWIN CARES</em>
          <h1>Take the world's best quality Treatment</h1>
          <h5>
            We have taken great satisfaction and pleasure in providing our
            community with the best care possible for the past 8 years, and we
            look forward to continuing to do so with the support of our many
            thousands of patients.
          </h5>
          <a href="#" class="btn1">
            Learn More
          </a>
        </section>
      </div>

      <section class="about-section" id="section2">
        <div class="container">
          <div class="row">
            <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div class="inner-column">
                <div class="sec-title">
                  <span class="title">
                    WELCOME TO INDIA HOSPITAL The Best Medwin Care
                  </span>
                  <h2>We care for your health every moment</h2>
                </div>
                <div class="text">
                  Welcome to our new website. We encourage you to find out more
                  about the values and vision that guides us, the services and
                  programs we offer, the indicators that ensure our continued
                  accountability and transparency, and the news and events that
                  matter most to you. It is the place where you will find
                  information on career opportunities with HMH and be able to
                  access general healthcare information to keep you well
                  informed.
                </div>
                <div class="text">
                  Medwin Care has a proud tradition of care. For Last so many
                  years, Medwin Care has cared for the people of Lucknow,
                  surrounding communities, and beyond, being a significant
                  player within the District. Residing in the heart of a
                  beautiful cottage country on the shores of the Gomti River, we
                  offer healthcare not only to our community residents but to
                  the many visitors who frequent our beautiful area year round.
                </div>
                <div class="btn-box">
                  <a href="#section5" class="theme-btn btn-style-one">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>

            <div class="image-column col-lg-6 col-md-12 col-sm-12">
              <div class="inner-column wow fadeInLeft">
                <figure class="image-1">
                  <a href="#" class="lightbox-image" data-fancybox="images">
                    <img
                      title="Rahul Kumar Yadav"
                      src="https://tse2.mm.bing.net/th?id=OIP.46pC-KvCYnhywzuhlaPsuQHaDt&pid=Api&P=0&h=180"
                      alt=""
                      style={{ minHeight: '500px' }}
                    />
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Verification />
      </section>

      <section class="section-services" id="section3">
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-md-10 col-lg-8">
              <div class="header-section">
                <h2 class="title">
                  Exclusive <span>Services</span>
                </h2>
                <p class="description">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some injected
                  humour
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <i class="fab fa-500px"></i>
                  <h3 class="title">Primary Health Care</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    The ultimate goal of primary health care is better health
                    for all.The aim is to provide an easily accessible route to
                    care, whatever the patient's problem.
                  </p>
                  <a href="#">
                    <i class="fas fa-arrow-circle-right"></i>Read More
                  </a>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <i class="fab fa-angellist"></i>
                  <h3 class="title">Critical Care</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    Our hospitals have specialized critical care areas as per
                    the specialty requirements. These areas also have support of
                    the super specialists.
                  </p>
                  <a href="#">
                    <i class="fas fa-arrow-circle-right"></i>Read More
                  </a>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <i class="fas fa-award"></i>
                  <h3 class="title">Modern Medical Lab</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    Our Hospital offers patients the best in diagnostic care
                    without diverting their focus from core healthcare services.
                    By sparing them the effort to manage yet another department.
                  </p>
                  <a href="#">
                    <i class="fas fa-arrow-circle-right"></i>Read More
                  </a>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <i class="fab fa-asymmetrik"></i>
                  <h3 class="title">Medicine</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    A medical specialty dedicated to the delivery of
                    comprehensive medical care to hospitalized patients, it is a
                    new standard of excellence by delivering care to
                    high-complexity patients.
                  </p>
                  <a href="#">
                    <i class="fas fa-arrow-circle-right"></i>Read More
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <i class="fas fa-broadcast-tower"></i>
                  <h3 class="title">Neurology</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    India Hospitals are experts at diagnosing and treating more
                    than 500 neurological conditions, including many rare or
                    complex disorders. we have best in diagnosis and treatment
                    of neurological ailments.
                  </p>
                  <a href="#">
                    <i class="fas fa-arrow-circle-right"></i>Read More
                  </a>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="single-service">
                <div class="part-1">
                  <i class="fab fa-canadian-maple-leaf"></i>
                  <h3 class="title">Neuro Surgery</h3>
                </div>
                <div class="part-2">
                  <p class="description">
                    The department of neurosurgery at India Hospital In Lucknow
                    is well equipped to treat all the neurological diseases
                    including stroke, headache, epilepsy, coma, neuropathies,
                    myopathies, Parkinson's disease
                  </p>
                  <a href="#">
                    <i class="fas fa-arrow-circle-right"></i>Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section3">
        <div class="cards">
          <div class="card">
            <section>
              <h1>Laboratory Services</h1>
              <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
            </section>
          </div>
          <div class="card">
            <section>
              <h1>General Treatment</h1>
              <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
            </section>
          </div>
          <div class="card">
            <section>
              <h1>Orthopedician</h1>
              <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
            </section>
          </div>
        </div>
        <div class="content">
          <h1>We are well experienced doctors</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
          </p>
        </div>
      </section>

      <section id="section4" className="testimonial">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="headline text-center mb-5">
                <h2 className="pb-3 position-relative d-inline-block">
                  Testimonials
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-lg-8 offset-lg-2 text-center">
              <div
                id="carouselExampleIndicatorsTwo"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicatorsTwo"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicatorsTwo"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="testimonial-wrapper">
                      <div className="row">
                        <div className="col-sm-12">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRLrO2mqPh3x8tqtU_ltHTiPh5b2sfbpL_Fw&usqp=CAU"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-sm-12">
                          <div className="username">
                            <h3>John Doe, Co-Founder / CEO</h3>
                            <span>IT Ltd.</span>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim
                              veniam, quis nostrud exercitation ullamco laboris
                              nisi ut aliquip ex ea commodo consequat.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="testimonial-wrapper">
                      <div className="row">
                        <div className="col-sm-12">
                          <img
                            src="https://w7.pngwing.com/pngs/990/897/png-transparent-real-estate-estate-agent-business-property-developer-house-business-service-people-formal-wear.png"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-sm-12">
                          <div className="username">
                            <h3>Alexa Smith, Co-Founder / CEO</h3>
                            <span>Company Ltd.</span>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim
                              veniam, quis nostrud exercitation ullamco laboris
                              nisi ut aliquip ex ea commodo consequat.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicatorsTwo"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    style={{ color: 'black' }}
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicatorsTwo"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    style={{ color: 'black' }}
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact />

      <img src="https://i.ibb.co/ZLHbWJz/footer.png" class="footer_image" />
      <Footer />
    </div>
  );
};
export default Home;
