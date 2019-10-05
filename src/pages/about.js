import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Container } from 'semantic-ui-react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import CardPhoto from '../components/CardPhoto';
import { externalPath } from '../contants/paths';

export const query = graphql`
  query {
    brunoPhoto: file(relativePath: { eq: "photos/bruno.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 768) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    luanPhoto: file(relativePath: { eq: "photos/luan.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 768) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    niheyPhoto: file(relativePath: { eq: "photos/nihey.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 768) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const About = ({ data }) => (
  <Layout>
    <SEO title="About" />
    <br />
    <br />
    <br />
    <br />
    <Container>
      <Title>About</Title>
      <Paragraph>
        Kassel Labs is a project to deliver the tools to help people create content,
        express their ideas and imagination.
      </Paragraph>
      <Paragraph>
        There are many ways to use these tools. Our customers can use our services
        to create an invite, present an event or anything that will be people be
        amazed when they see it.
        Currently we are focused on intro creators and customized orders for even better results.
      </Paragraph>
      <Paragraph>
        This website is not related or to Lucasfilm Ltd., Walt Disney, or Twentieth Century Fox.
      </Paragraph>
      <br />
      <br />
      <Title>The Team</Title>
      <CardPhoto
        name="Bruno Orlandi"
        linkedin={externalPath('brunoLinkedin')}
        description="Created Star Wars Intro Creator in December 2015 when The Force Awakens was about to release in cinema, starting a new series of movies. With the great success of the website, Bruno dedicated himself to developing more websites and helping people to create personalized videos."
        image={() => <Image fluid={data.brunoPhoto.childImageSharp.fluid} />}
      />
      <CardPhoto
        name="Nihey Takizawa"
        linkedin={externalPath('niheyLinkedin')}
        description="He joined Bruno shortly after the release of Star Wars Intro Creator and developed the functionality most desired by users: download videos created on the site. Nihey also made it possible for advanced video editing, such as customizing the Death Star image in Star Wars videos."
        image={() => <Image fluid={data.niheyPhoto.childImageSharp.fluid} />}
        isRight
      />
      <CardPhoto
        name="Luan Orlandi"
        linkedin={externalPath('luanLinkedin')}
        description="With his knowledge of video editing, we made it possible for the creation of Westworld Intro Creator and Game of Thrones Intro Creator. In addition to helping users get the best videos, Luan also produces custom videos on demand for the best customers."
        image={() => <Image fluid={data.luanPhoto.childImageSharp.fluid} />}
      />
    </Container>
  </Layout>
);

About.propTypes = {
  data: PropTypes.object,
};

export default About;
