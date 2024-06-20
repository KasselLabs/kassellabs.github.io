import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import {
  Card,
  Button,
  Grid,
  Container,
} from 'semantic-ui-react';
import Image from 'gatsby-image';
import ReactPixel from 'react-facebook-pixel';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Section from '../components/Section';
import NewsletterSubscribeForm from '../components/NewsletterSubscribeForm';
import swicGif from '../images/swic.gif';
import sticGif from '../images/stic.gif';
import wicGif from '../images/wic.gif';
import goticGif from '../images/gotic.gif';
import ejectorGif from '../images/ejector.gif';
import breakingBadGif from '../images/breaking-bad.gif';
import theLastOfUsGif from '../images/the-last-of-us.gif';

import '../styles/index.styl';
import { externalPath, internalPath } from '../contants/paths';
import OTHER_INTROS from '../contants/intros.json';

export const query = graphql`
  query {
    headerBackground: file(relativePath: { eq: "background/star-wars-death-star.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    introCreatorsBackground: file(relativePath: { eq: "background/game-of-thrones-buildings.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    customRequestBackground: file(relativePath: { eq: "background/stranger-things-shadow.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    blogBackground: file(relativePath: { eq: "background/westworld-body.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    newsletterBackground: file(relativePath: { eq: "background/star-wars-darth-vader.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    customer1: file(relativePath: { eq: "customerLogo/disney.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    customer2: file(relativePath: { eq: "customerLogo/google.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    customer3: file(relativePath: { eq: "customerLogo/nasa.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    customer4: file(relativePath: { eq: "customerLogo/harvard.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    customer5: file(relativePath: { eq: "customerLogo/red-hat.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    customer6: file(relativePath: { eq: "customerLogo/tesla.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    customer7: file(relativePath: { eq: "customerLogo/harley-davidson.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    helped1: file(relativePath: { eq: "helpedLogo/bcspca.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    helped2: file(relativePath: { eq: "helpedLogo/variety.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    helped3: file(relativePath: { eq: "helpedLogo/designing-dreams.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    helped4: file(relativePath: { eq: "helpedLogo/make-a-wish.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    helped5: file(relativePath: { eq: "helpedLogo/starlight.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    helped6: file(relativePath: { eq: "helpedLogo/unicef.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
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

const IndexPage = ({ data }) => (
  <Layout>
    <SEO meta={[{ property: 'og:url', content: 'https://kassellabs.io' }]} />
    <Section
      title="Our mission is to help people express their creativity and imagination"
      description="Create great experiences with Kassel Labs tools and services. Get your favorite movies and series in your presentations, invites and many other uses."
      isDark
      isCenter
      image={() => <Image fluid={data.headerBackground.childImageSharp.fluid} />}
      fullImage
    />
    <Section
      id="introCreators"
      title="Intro Creators"
      description="Use your texts on intros of movies and series. You can share the intro, request a video for download or start an event or party as a opening."
      image={() => <Image fluid={data.introCreatorsBackground.childImageSharp.fluid} />}
    >
      <Card.Group itemsPerRow="4" doubling stackable>
        <Card
          href={externalPath('starWarsIntroCreator')}
          header="Star Wars Intro Creator"
          image={<img src={swicGif} alt="Star Wars Intro Creator" width="100%" />}
          onClick={() => ReactPixel.track('ViewContent', { content_ids: 'star-wars-intro' })}
        />
        <Card
          href={externalPath('strangerThingsIntroCreator')}
          header="Stranger Things Intro Creator"
          image={<img src={sticGif} alt="Stranger Things Intro Creator" width="100%" />}
          onClick={() => ReactPixel.track('ViewContent', { content_ids: 'stranger-things-intro' })}
        />
        <Card
          href={externalPath('westworldIntroCreator')}
          header="Westworld Intro Creator"
          image={<img src={wicGif} alt="Westworld Intro Creator" width="100%" />}
          onClick={() => ReactPixel.track('ViewContent', { content_ids: 'westworld-intro' })}
        />
        <Card
          href={externalPath('gameOfThronesIntroCreator')}
          header="Game of Thrones Intro Creator"
          image={<img src={goticGif} alt="Game of Thrones Intro Creator" width="100%" />}
          onClick={() => ReactPixel.track('ViewContent', { content_ids: 'game-of-thrones-intro' })}
        />
        <Card
          href={externalPath('ejector')}
          header="Ejector - Among Us"
          image={<img src={ejectorGif} alt="Ejector - Among Us" width="100%" />}
          onClick={() => ReactPixel.track('ViewContent', { content_ids: 'ejector' })}
        />
        <Card
          href={externalPath('breakingBad')}
          header="Breaking Bad Intro Creator"
          image={<img src={breakingBadGif} alt="Breaking Bad Intro Creator" width="100%" />}
          onClick={() => ReactPixel.track('ViewContent', { content_ids: 'breaking-bad' })}
        />
        <Card
          href={externalPath('theLastOfUs')}
          header="The Last of Us Intro Creator"
          image={<img src={theLastOfUsGif} alt="The Last of Us Intro Creator" width="100%" />}
          onClick={() => ReactPixel.track('ViewContent', { content_ids: 'the-last-of-us' })}
        />
      </Card.Group>
      <Container>
        <div
          className="section__text"
          style={{ marginTop: '2rem' }}
        >
          <h1 className="section__title">Other Openings</h1>
          <p className="section__description" style={{ marginTop: '2rem' }}>
            We are also able to make videos from these others shows and movies, these still do
            not have an intro creator that you can play with, but can be done as a comissioned work.
          </p>
        </div>
      </Container>
      <Card.Group itemsPerRow="4" doubling stackable>
        {OTHER_INTROS.map((intro) => (
          <Card
            key={intro.slug}
            href={internalPath(intro.slug)}
            header={intro.title}
            image={(
              <video
                src={intro.quickPreview}
                alt={intro.title}
                muted
                autoPlay
                loop
                style={{
                  width: '100%',
                }}
              />
            )}
            onClick={() => ReactPixel.track('ViewContent', { content_ids: intro.slug })}
          />
        ))}
      </Card.Group>
    </Section>
    <Section
      title="Custom Request"
      description="Have a special request for us? We can work on other intro creators, customizations, or just something new that you have in mind."
      isDark
      isRight
      image={() => <Image fluid={data.customRequestBackground.childImageSharp.fluid} />}
    >
      <Link to={internalPath('contact')}>
        <Button primary>
          Contact us with your request
        </Button>
      </Link>
    </Section>
    <Section
      id="blog"
      title="Blog"
      description="Read our posts and stories to see what others are creating."
      image={() => <Image fluid={data.blogBackground.childImageSharp.fluid} />}
    >
      <Card.Group itemsPerRow="4" doubling stackable>
        {data.allSanityPost.edges.map(({ node: post }) => (
          <Card
            key={post.slug.current}
            as={Link}
            to={`/blog/${post.slug.current}`}
            header={post.title}
            image={<Image fluid={post.mainImage.asset.fluid} alt={post.title} />}
          />
        ))}
      </Card.Group>
    </Section>
    <Section
      id="contact"
      description="Hear from us when we have something new"
      isDark
      isCenter
      image={() => <Image fluid={data.newsletterBackground.childImageSharp.fluid} />}
      fullImage
    >
      <NewsletterSubscribeForm />
    </Section>
    <Section
      title="Some of our most known customers"
      description="Including people from these companies:"
      isCenter
    >
      <Grid doubling centered columns={12}>
        <Grid.Column mobile={4} verticalAlign="middle">
          <Image fluid={data.customer1.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={4} verticalAlign="middle">
          <Image fluid={data.customer2.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={4} verticalAlign="middle">
          <Image fluid={data.customer3.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={4} verticalAlign="middle">
          <Image fluid={data.customer4.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={4} verticalAlign="middle">
          <Image fluid={data.customer5.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={4} verticalAlign="middle">
          <Image fluid={data.customer6.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={4} verticalAlign="middle">
          <Image fluid={data.customer7.childImageSharp.fluid} />
        </Grid.Column>
      </Grid>
      <p className="home__customers-note">Not affiliated with these companies, used by some of their individuals.</p>
      <h1 className="home__customers-helped">NGOs that we helped:</h1>
      <Grid doubling centered columns={12}>
        <Grid.Column mobile={2} verticalAlign="middle">
          <Image fluid={data.helped1.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={2} verticalAlign="middle">
          <Image fluid={data.helped2.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={2} verticalAlign="middle">
          <Image fluid={data.helped3.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={2} verticalAlign="middle">
          <Image fluid={data.helped4.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={2} verticalAlign="middle">
          <Image fluid={data.helped5.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column mobile={2} verticalAlign="middle">
          <Image fluid={data.helped6.childImageSharp.fluid} />
        </Grid.Column>
      </Grid>
    </Section>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;
