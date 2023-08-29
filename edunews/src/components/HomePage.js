import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe, FaGraduationCap, FaUsers, FaNewspaper, FaTrophy, FaFilm } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';




const HomePage = () => {

  return (  
    <>
       
        <section class="hero bg-cover bg-center" style={{ backgroundImage: "url('http://localhost:4600/images/absolutvision-WYd_PkCa1BY-unsplash.jpg')", height: "400px", backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div class="container text-center">
            <h1 class="text-4xl font-bold mb-4">Breaking News at Your Fingertips</h1>
            <p class="card-text">Stay informed with the latest updates, breaking stories, and in-depth coverage from around the world. Our news portal brings you timely and reliable news that matters most to you. Explore a diverse range of topics, from politics to technology, and be part of the conversation that shapes our world.</p>
          </div>
        </section>

        <section className="bg-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="p-4 bg-white shadow rounded">
              <div className="d-flex justify-content-center align-items-center h-16 w-16 bg-primary text-white rounded-circle mb-4">
                <FaGlobe size={48} />
              </div>
              <h2 className="h5 font-weight-bold mb-2">Global Headlines</h2>
              <p className="text-muted">Stay updated with the latest breaking news from around the world. Get insights into international affairs, politics, economics, and more. Our comprehensive coverage brings you a diverse range of stories that shape the global landscape.</p>
              <Link to="/news" className="btn btn-primary">View More</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white shadow rounded">
              <div className="d-flex justify-content-center align-items-center h-16 w-16 bg-primary text-white rounded-circle mb-4">
                <FaGraduationCap size={48} />
              </div>
              <h2 className="h5 font-weight-bold mb-2">Education Insights</h2>
              <p className="text-muted">Explore the world of education with our in-depth coverage of educational trends, innovations, and challenges. Discover articles about advancements in online learning, classroom technologies, and educational policies that impact students and educators.</p>
              <Link to="/edunews" className="btn btn-primary">View More</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white shadow rounded">
              <div className="d-flex justify-content-center align-items-center h-16 w-16 bg-primary text-white rounded-circle mb-4">
                <FaUsers size={48} />
              </div>
              <h2 className="h5 font-weight-bold mb-2">Community Voices</h2>
              <p className="text-muted">Share your thoughts and ideas with our community! Write about your experiences, interests, and opinions on a variety of topics. Join the conversation by submitting your own articles and engage with fellow readers from different walks of life.</p>
              <Link to="/posts" className="btn btn-primary">View More</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="feature bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="bg-white rounded-lg p-4 mb-4 shadow text-center"> {/* Added text-center class */}
              <FaNewspaper className="text-primary mb-2" size={64} />
              <h2 className="h4 font-weight-bold mb-2">Latest News</h2>
              <p className="text-muted">Stay informed with our up-to-date news articles.</p>
              <Link to="/news" className="btn btn-primary">Read More</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white rounded-lg p-4 mb-4 shadow text-center"> {/* Added text-center class */}
              <FaTrophy className="text-success mb-2" size={64} />
              <h2 className="h4 font-weight-bold mb-2">Sports Updates</h2>
              <p className="text-muted">Get the latest scores, news, and updates from the world of sports.</p>
              <Link to="/news" className="btn btn-primary">Read More</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white rounded-lg p-4 mb-4 shadow text-center"> {/* Added text-center class */}
              <FaFilm className="text-danger mb-2" size={64} />
              <h2 className="h4 font-weight-bold mb-2">Entertainment</h2>
              <p className="text-muted">Stay entertained with celebrity news, movies, and more.</p>
              <Link to="/news" className="btn btn-primary">Read More</Link>
            </div>
          </div>
        </div>
      </div>
    </section>




<section class="py-5">
  <div class="container">
    <h2 class="text-center display-4 mb-5">Recent Blog Posts</h2>
    <div class="row">
      <div class="col-md-4">
        <div class="card shadow p-4 mb-4">
          <h3 class="h4 font-weight-bold mb-2">Unveiling the Tech Trends that Will Shape Tomorrow</h3>
          <p class="text-muted mb-4">Dive into the exciting world of technology as we uncover the trends that are set to revolutionize our lives. From artificial intelligence to blockchain and beyond, we explore the innovations that promise to reshape industries, redefine communication, and push the boundaries of human achievement.</p>
          <Link to="/edunews" className="btn btn-primary">Read More</Link>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow p-4 mb-4">
          <h3 class="h4 font-weight-bold mb-2">Embarking on a Global Cultural Odyssey</h3>
          <p class="text-muted mb-4">oin us on a journey across continents and cultures as we celebrate the rich tapestry of human diversity. From age-old traditions to modern artistry, we delve into the unique customs, festivals, and stories that make our world a vibrant mosaic of experiences and perspectives.</p>
          <Link to="/edunews" className="btn btn-primary">Read More</Link>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow p-4 mb-4">
          <h3 class="h4 font-weight-bold mb-2">Green Actions for a Sustainable Planet</h3>
          <p class="text-muted mb-4">Discover how individual actions can collectively drive positive change for our environment. Explore easy-to-implement eco-friendly practices, innovative conservation projects. Learn how each step you take contributes to the larger effort of safeguarding our planet for future generations.</p>
          <Link to="/edunews" className="btn btn-primary">Read More</Link>
        </div>
      </div>
    </div>
  </div>
</section>

  <div class="container-fluid bg-light py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card w-100">
          <div class="card-body">
            <h2 class="card-title">Newsletter Subscription</h2>
            <p class="card-text">Subscribe to our newsletter for the latest updates and offers.</p>
            <form action="#" method="post">
              <div class="mb-3">
                <input type="email" class="form-control" name="email" placeholder="Enter your email" required></input>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="container my-5">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Contact Us</h2>
            <form action="#" method="post">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name" required></input>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" required></input>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">Message</label>
                <textarea class="form-control" id="message" name="message" rows="4" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Contact Information</h2>
            <p><strong>Address:</strong> 12 Murli, Birgunj, Nepal</p>
            <p><strong>Email:</strong> mehtamithlesh9@gmail.com</p>
            <p><strong>Phone:</strong> +9779824284655</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  <div className="card mt-3">
  <div className="card-body">
    <h2 className="card-title">Location Map</h2>
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.481049153228!2d84.87632097561709!3d27.014961276586348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39935440af3b59e3%3A0x5aa0411733213e6a!2sBirgunj%20GhantaGhar!5e0!3m2!1sen!2snp!4v1692733356723!5m2!1sen!2snp"
        className="embed-responsive-item w-100" // Added w-100 class
        title="Birgunj Location Map"
        style={{ border: '0' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</div>


    </>
        
  )
};

export default HomePage;
