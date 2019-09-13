import React, { useCallback } from 'react';
import { Link, graphql } from 'gatsby';
import { Card, Container, Input } from 'semantic-ui-react';
import Image from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import swicGif from '../images/swic.gif';
import sticGif from '../images/stic.gif';
import wicGif from '../images/wic.gif';
import goticGif from '../images/gotic.gif';

import '../styles/index.styl';

export const query = graphql`
  query Posts {
    allSanityPost(sort: {order: DESC, fields: [publishedAt]}) {
      edges {
        node {
          id
          publishedAt
          title
          slug {
            current
          }
          mainImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const canvas = useCallback((node) => {
    if (node === null) {
      return;
    }

    node.width = window.innerWidth;
    node.height = window.innerHeight;
    const ctx = node.getContext('2d');

    // watch for browser resizing, reinitialize stars
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });


    function Star(x, y, width, speed) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.speed = speed;
      this.color = '#fff';

      this.draw = () => {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, width, width);
      };

      this.update = () => {
        // check bounds
        if (this.x + this.width > innerWidth) {
          this.x = 0;
        }
        this.x += this.speed;

        this.draw();
      };
    }

    // Star dimensions and speed
    const stars = {
      nearStar: {
        width: 3,
        speed: 0.2,
      },
      midStar: {
        width: 2,
        speed: 0.1,
      },
      farStar: {
        width: 1,
        speed: 0.025,
      },
    };

    let starArray = [];

    // clear starArray and generate 3 layers of stars randomly
    function init() {
      starArray = [];
      // nearest stars
      for (let i = 0; i < 50; ++i) {
        const x = Math.random() * (innerWidth - stars.nearStar.width);
        const y = Math.random() * (innerHeight - stars.nearStar.width);
        starArray.push(new Star(x, y, stars.nearStar.width, stars.nearStar.speed));
      }

      // mid-distance stars
      for (let i = 0; i < 100; ++i) {
        const x = Math.random() * (innerWidth - stars.midStar.width);
        const y = Math.random() * (innerHeight - stars.midStar.width);
        starArray.push(new Star(x, y, stars.midStar.width, stars.midStar.speed));
      }

      // farthest stars
      for (let i = 0; i < 350; ++i) {
        const x = Math.random() * (innerWidth - stars.farStar.width);
        const y = Math.random() * (innerHeight - stars.farStar.width);
        starArray.push(new Star(x, y, stars.farStar.width, stars.farStar.speed));
      }
    }

    // loop to call update function on each star
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      for (const star of starArray) {
        star.update();
      }
    }

    init();
    animate();
  }, []);

  return (
    <Layout topRender={(
      <div className="parallax">
        <div className="parallax--overlay" />
        <canvas className="parallax__starscape parallax--overlay" ref={canvas} />
        <Container className="parallax__container">
          <h1 className="parallax__title">
            Our website is being developed, receive news from us when it is complete
          </h1>
          <form
            action="https://kassellabs.us18.list-manage.com/subscribe/post?u=955f23a083dc8aff26326536a&amp;id=3a0fe71a75"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_blank"
          >
            <Input
              id="mce-EMAIL"
              name="EMAIL"
              className="parallax__input"
              type="email"
              autocomplete="email"
              required
              action={{ color: 'blue', content: 'Notify me!' }}
              placeholder="Enter your email..."
              aria-label="Enter your email..."
              size="large"
            />
          </form>
        </Container>
      </div>
    )}
    >
      <SEO />
      <h1>Our mission is to help people express their creativity and imagination.</h1>
      <h2>Check out our websites:</h2>
      <br />
      <Card.Group itemsPerRow="2" stackable>
        <Card
          href="http://starwarsintrocreator.kassellabs.io"
          header="Star Wars Intro Creator"
          image={<img src={swicGif} alt="Star Wars Intro Creator" width="100%" />}
        />
        <Card
          href="https://strangerthingsintrocreator.kassellabs.io/"
          header="Stranger Things Intro Creator"
          image={<img src={sticGif} alt="Stranger Things Intro Creator" width="100%" />}
        />
        <Card
          href="https://westworldintrocreator.kassellabs.io/"
          header="Westworld Intro Creator"
          image={<img src={wicGif} alt="Westworld Intro Creator" width="100%" />}
        />
        <Card
          href="https://gameofthronesintrocreator.kassellabs.io"
          header="Game of Thrones Intro Creator"
          image={<img src={goticGif} alt="Game of Thrones Intro Creator" width="100%" />}
        />
      </Card.Group>
      <br />
      <h1>Stories</h1>
      <div>
        {data.allSanityPost.edges.map(({ node: post }) => (
          <Card
            key={post.slug.current}
            as={Link}
            to={`/blog/${post.slug.current}`}
            header={post.title}
            image={<Image fluid={post.mainImage.asset.fluid} alt={post.title} />}
          />
        ))}
      </div>
      <br />
      <h1>Contact</h1>
      <p>
        Check out the FAQ, we might already have an answer for you:
        {' '}
        <a href="https://help.kassellabs.io">https://help.kassellabs.io</a>
      </p>
      <p>
        Feel free to contact us via the email
        {' '}
        <a href="mailto:support@kassellabs.io">support@kassellabs.io</a>
      </p>
    </Layout>
  );
};

export default IndexPage;
