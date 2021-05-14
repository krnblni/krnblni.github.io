import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Card } from "react-bootstrap"
import { FaGithub, FaInstagram, FaGooglePlay } from "react-icons/fa"
import { IconContext } from "react-icons"

const Projects = () => {
  const data = useStaticQuery(
    graphql`
      query {
        projectsJson {
          projects {
            name
            description
            url
            logo
            icon
          }
        }

        placeholderImage: file(relativePath: { eq: "placeholder.png" }) {
          childImageSharp {
            fixed(width: 120, height: 120) {
              ...GatsbyImageSharpFixed
            }
          }
        }

        images: allImageSharp {
          edges {
            node {
              fixed(width: 120, height: 120) {
                ...GatsbyImageSharpFixed
                originalName
              }
            }
          }
        }
      }
    `
  )

  const getIconAndText = icon => {
    switch (icon) {
      case "FaInstagram":
        return (
          <>
            <FaInstagram /> Instagram
          </>
        )
      case "FaGithub":
        return (
          <>
            <FaGithub /> GitHub
          </>
        )
      case "FaGooglePlay":
        return (
          <>
            <FaGooglePlay /> Google Play
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="projectsDiv" id="projectsSectionId">
      <div className="projectsHeading">
        Projects{" "}
        <span role="img" aria-label="projects">
          ⚗️
        </span>
      </div>
      <div className="projectsGrid">
        {data.projectsJson.projects.map(project => {
          var imageFixed = data.images.edges.find(
            edge => edge.node.fixed.originalName === project.logo
          )

          if (imageFixed === undefined) {
            imageFixed = data.placeholderImage.childImageSharp.fixed
          } else {
            imageFixed = imageFixed.node.fixed
          }

          return (
            <Card key={project.url}>
              <div className="projectCard">
                <div className="projectCardImgDiv">
                  <Img fixed={imageFixed}></Img>
                </div>
                <Card.Body>
                  <Card.Title className="projectTitleText">
                    {project.name}
                  </Card.Title>
                  <Card.Text className="projectDescriptionText">
                    {project.description}
                  </Card.Text>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.url}
                    className="btn btn-outline-dark"
                  >
                    <IconContext.Provider value={{ size: "1.5rem" }}>
                      {getIconAndText(project.icon)}
                    </IconContext.Provider>
                  </a>
                </Card.Body>
              </div>
            </Card>
          )
        })}
      </div>
      <div className="projectsGithubLinkButtonDiv">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/krnblni"
          className="btn btn-outline-dark btn-block"
        >
          <IconContext.Provider value={{ size: "1.5rem" }}>
            Explore more of my experiments on my <FaGithub /> GitHub profile
          </IconContext.Provider>
        </a>
      </div>
    </div>
  )
}

export default Projects
